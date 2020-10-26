var router = require("express").Router();
var mongoose = require("mongoose");
var Song = mongoose.model("Song");
var auth = require('../auth');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
let songUtils = require('../../utils/songs.utils');

let deleteSong = require('../../utils/songs.utils.js');



router.param('song', function (req, res, next, slug) {
  Song.findOne({ slug: slug })
    .then(function (song) {
      if (!song) { return res.sendStatus(404); }
      req.song = song;
      return next();
    }).catch(next);
});

router.param('comment', function(req, res, next, id) {
  Comment.findById(id).then(function(comment){
    if(!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});

router.get("/", auth.optional, function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  let order = req.query.order ? {[req.query.order[0]]: req.query.order[1]} : {createdAt: 'desc'};

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
    req.query.uploaded ? User.findOne({username: req.query.uploaded}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var uploaded = results[0];
    var favoriter = results[1];

    if(uploaded){
      query.uploaded = uploaded._id;
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
        .sort(order)
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

router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Song.find({ uploaded: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('uploaded')
        .exec(),
      Song.count({ uploaded: {$in: user.following}})
    ]).then(function(results){
      var songs = results[0];
      var songsCount = results[1];

      return res.json({
        songs: songs.map(function(song){
          return song.toJSONFor(user);
        }),
        songsCount: songsCount
      });
    }).catch(next);
  });
});

router.get("/taglist", function (req, res, next) {
  Song.distinct('tagList')
    .then(function (tagList) {
      return res.json({ tagList: tagList })
    }).catch(next);
});

router.get("/:song", auth.optional,function (req, res, next) {

  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.song.populate('uploaded').execPopulate()
  ]).then(function(results) {
    let user = results[0];

    return res.json({song: req.song.toJSONFor(user)});
  }).catch(next);
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


router.delete("/:song", auth.required, function (req, res, next) { //search by slug
  Promise.all([
    User.findById(req.payload.id),
    Song.findOne({slug: req.params.song}).populate('uploaded')
  ]).then(function(results) {
    let user = results[0];
    let userUpload = results[1].toJSONFor().uploaded;

    if (user.username === userUpload.username) {
      
      if (songUtils.deleteSong(req.song)) {
          return res.sendStatus(204);
      }
    }else return res.sendStatus(403);
  }).catch(next);
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

router.get('/:song/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.song.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(song) {
      return res.json({comments: req.song.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

router.post('/:song/comments', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.song = req.song;
    comment.author = user;

    return comment.save().then(function(){
      req.song.comments = req.song.comments.concat([comment]);

      return req.song.save().then(function(song) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});

router.delete('/:song/comments/:comment', auth.required, function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    req.song.comments.remove(req.comment._id);
    req.song.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;