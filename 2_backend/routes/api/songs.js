var router = require("express").Router();
var mongoose = require("mongoose");
var Song = mongoose.model("Song");
var auth = require('../auth');
var User = mongoose.model('User');


// Preload hotels objects on routes with ':hotels'
router.param('song', function(req, res, next, slug) {
  Song.findOne({ slug: slug})
    .then(function (song) {
      if (!song) { return res.sendStatus(404); }
      req.song = song;
      return next();
    }).catch(next);
});


//obtenim tots el hotels
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

//obtenim un hotel per el slug get(http://localhost:3001/api/hotels/vernissa)
router.get("/:slug", function(req, res, next) {
  Hotels.findOne({ slug: req.params.slug })
    .then(function(hotels) {
      if (!hotels) {
        return res.sendStatus(401);
      }
      return res.json({ hotel: hotels });
    })
    .catch(next);
});

//obtenim les categories
router.get('/:hotel/category', function(req, res, next) {
  Hotels.find().distinct('category').then(function(category){
    return res.json({category: category});
  }).catch(next);
 });

//insertem un hotel
router.post("/", function(req, res, next) {
  var song = new Song(req.body.song);
  console.log(song);
  return song
    .save()
    .then(function() {
      res.json({ song: song.toJSONFor() });
    })
    .catch(next);
});

//delete an hotel
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

// Agregar como favorito

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

// // Desagregar como favorito
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