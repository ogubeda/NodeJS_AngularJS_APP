var router = require("express").Router();
var mongoose = require("mongoose");
var Song = mongoose.model("Song");
var auth = require('../auth');
var User = mongoose.model('User');

router.param('song', function(req, res, next, slug) {
  Song.findOne({ slug: slug})
    .then(function (song) {
      if (!song) { return res.sendStatus(404); }
      req.song = song;
      return next();
    }).catch(next);
});

router.get("/",auth.optional, function(req, res, next) {
  Promise.resolve(
    req.payload ? User.findById(req.payload.id): null
  ).then(
  (user)=>{
      Song.find()
      .then(function(song) {
        return res.json({ song: song.map(song => song.toJSONFor(user)) });
      })
      .catch(next);
    }
  )
 
});

router.get("/:slug", function(req, res, next) {
  Song.findOne({ slug: req.params.slug })
    .then(function(songs) {
      if (!songs) {
        return res.sendStatus(401);
      }
      return res.json({ song: songs });
    })
    .catch(next);
});

router.get('/:hotel/category', function(req, res, next) {
  Hotels.find().distinct('category').then(function(category){
    return res.json({category: category});
  }).catch(next);
});

router.post("/", auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if (!user) { return res.sendStatus(401); }
    var song = new Song(req.body.song);
    song.uploaded = user;

  return song
    .save()
    .then(function() {
      res.json({ song: song.toJSONFor(user) });
    })
    .catch(next);
  });
  
});

router.delete("/:slug", function(req, res, next) { //search by slug
  Hotels.findOne({ slug: req.params.slug }) //delete
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

router.post('/:hotels/favorite', auth.required, function(req, res, next) {
  var hotelId = req.hotels._id;
  
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(hotelId).then(function(){
      return req.hotels.updateFavoriteCount().then(function(hotel){
        return res.json({hotel: hotel.toJSONFor(user)});
      });
    });
  }).catch(next);
});

router.delete('/:hotels/favorite', auth.required, function(req, res, next) {
  var hotelId = req.hotels._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(hotelId).then(function(){
      return req.hotels.updateFavoriteCount().then(function(hotel){
        return res.json({hotel: hotel.toJSONFor(user)});
      });
    });
  }).catch(next);
});

module.exports = router;