var router = require("express").Router();
var mongoose = require("mongoose");
var Song = mongoose.model("Song");
var auth = require('../auth');
var User = mongoose.model('User');

router.param('song', function (req, res, next, slug) {
  Song.findOne({ slug: slug })
    .then(function (song) {
      if (!song) { return res.sendStatus(404); }
      req.song = song;
      return next();
    }).catch(next);
});

router.get("/", auth.optional, function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Song.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('uploaded')
        .exec(),
      Song.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){

      var songs = results[0];
      var songsCount = results[1];
      var user = results[2];

      return res.json({
        songs: songs.map(function(song){
          return song.toJSONFor(user);
        }),
        songsCount: songsCount
      });
    });
  }).catch(next);

});

router.get("/taglist", function (req, res, next) {
  Song.distinct('tagList')
    .then(function (tagList) {
      return res.json({ tagList: tagList })
    }).catch(next);
});

router.get("/:slug", function (req, res, next) {
  Song.findOne({ slug: req.params.slug })
    .then(function (songs) {
      if (!songs) {
        return res.sendStatus(401);
      }
      return res.json({ song: songs });
    })
    .catch(next);
});

router.post("/", auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var song = new Song(req.body.song);

    song.uploaded = user;

    return song
      .save()
      .then(function () {
        res.json({ song: song.toJSONFor(user) });
      })
      .catch(next);
  })
});


router.delete("/:slug", function (req, res, next) { //search by slug
  Hotels.findOne({ slug: req.params.slug }) //delete
    .then(function (hotels) {
      if (!hotels) { //id it doesn't exist, show error 401
        return res.sendStatus(401);
      } else {
        return hotels.remove().then(function () { //if it exists, remove
          return res.sendStatus(204);
        });
      }
    })
    .catch(next);
});

//update hotel
/*router.put("/:slug", function(req, res, next) { //search by slug
  Hotels.update({ slug: req.params.slug }) //delete
    .then(function(hotels) {
      if (!hotels) { //id it doesn't exist, show error 401
        return res.sendStatus(401);
      } else {
        return hotels.remove().then(function() { //if it exists, remove
          return res.sendStatus(204);
        });
      }
    })
    .catch(next);
});*/

router.post('/:song/favorite', auth.required, function (req, res, next) {
  var songId = req.song._id;

  console.log(songId);

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.favorite(songId).then(function () {
      return req.song.updateFavoriteCount().then(function (song) {
        return res.json({ song: song.toJSONFor(user)});
        // return res.json({ song: song });
      });
    });
  }).catch(next);
});

router.delete('/:song/favorite', auth.required, function (req, res, next) {
  var songId = req.song._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(songId).then(function () {
      return req.song.updateFavoriteCount().then(function (song) {
        return res.json({ song: song.toJSONFor(user)});
      });
    });
  }).catch(next);
});

module.exports = router;