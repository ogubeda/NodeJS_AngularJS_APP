var router = require("express").Router();
var mongoose = require("mongoose");
var Song = mongoose.model("Song");
var auth = require('../auth');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
let songUtils = require('../../utils/songs.utils');
let userUtils = require('../../utils/users.utils');


router.param('song', async function (req, res, next, slug) {
  try {
    song = await Song.findOne({slug: slug});
    if (!song) return res.sendStatus(404);
    req.song = song;

    return next();
  }catch(e) {
    next();
  }// end_catch
});

router.param('comment', async function(req, res, next, id) {
  try {
    let comment = await Comment.findById(id);

    if (!comment) return res.sendStatus(404); 
    req.comment = comment;

    return next();
  }catch(e) {
    next();
  }// end_catch
});

router.get("/", auth.optional, async function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  let order = req.query.order ? {[req.query.order[0]]: req.query.order[1]} : {createdAt: 'desc'};

  if(typeof req.query.limit !== 'undefined') limit = req.query.limit;

  if(typeof req.query.offset !== 'undefined') offset = req.query.offset;

  if( typeof req.query.tag !== 'undefined' ) query.tagList = {"$in" : [req.query.tag]};
  
  try {
    let uploaded = req.query.uploaded ? await User.findOne({username: req.query.uploaded}) : null;
    let favoriter = req.query.favorited ? await User.findOne({username: req.query.favorited}) : null;

    if(uploaded) query.uploaded = uploaded._id;

    if(favoriter) query._id = {$in: favoriter.favorites};
    else if(req.query.favorited) query._id = {$in: []};

    let songs = await Song.find(query).limit(Number(limit)).skip(Number(offset)).sort(order).populate('uploaded').populate('group').exec();
    let songsCount = await Song.count(query).exec();
    let user = req.payload ? await User.findById(req.payload.id) : null;

    return res.json({
      songs: songs.map(function(song) {
        return song.toJSONFor(user);
      }), songsCount: songsCount
    })
  }catch(e) {
    next();
  }// end_catch
});

router.get('/feed', auth.required, async function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined') limit = req.query.limit;

  if(typeof req.query.offset !== 'undefined') offset = req.query.offset;

  try {
    let user = await User.findById(req.payload.id);

    if (!user) return res.sendStatus(401);

    let songs = await Song.find({ uploaded: {$in: user.following}}).limit(Number(limit)).skip(Number(offset)).populate('uploaded').populate('group').exec();
    let songsCount = await Song.count({ uploaded: {$in: user.following}});

    return res.json({
      songs: songs.map(function(song){
        return song.toJSONFor(user);
      }),
      songsCount: songsCount
    });
  }catch(e) {
    next();
  }// end_catch
});

router.get("/taglist", async function (req, res, next) {
  try {
    let tagList = await Song.distinct('tagList');
    return res.json({tagList: tagList});
  }catch(e) {
    next();
  }// end_catch
});

router.get("/:song", auth.optional, async function (req, res, next) {
  try {
    let user = req.payload ? await User.findById(req.payload.id) : null;
    await req.song.populate('uploaded').execPopulate();

    return res.json({song: req.song.toJSONFor(user)});
  }catch(e) {
    next();
  }// end_catch
});

router.post("/", auth.required, async function (req, res, next) {
  try {
    let user = await User.findById(req.payload.id);
    
    if (!user) return res.sendStatus(401);
    let group = await songUtils.requestGroup(req.body.song.group);

    let song = new Song(req.body.song);
    song.uploaded = user;
    song.group = group.id;

    await song.save();

    return res.json({song:song.toJSONFor(user)})
  }catch(e) {
    next();
  }// end_catch
});


router.delete("/:song", auth.required, async function (req, res, next) { //search by slug
  try {
    let user = await User.findById(req.payload.id);
    let userUpload = await Song.findOne({slug: req.params.song}).populate('uploaded').toJSONFor().uploaded;

    if (user.username === userUpload.username) {
      if (songUtils.deleteSong(req.song, user)){
        return res.sendStatus(204);
      }// end_if
    }else return res.sendStatus(403);
  }catch(e) {
    next();
  }// end_catch
});

router.post('/:song/favorite', auth.required, async function (req, res, next) {
  var songId = req.song._id;

  try {
    let user = await User.findById(req.payload.id);
    if (!user) return res.sendStatus(401);

    await user.favorite(songId);
    await userUtils.moreReputation(user, 20);
    let song = await req.song.updateFavoriteCount();

    return res.json({song: song.toJSONFor(user)})
  }catch(e) {
    next()
  }// end_catch
});

router.delete('/:song/favorite', auth.required, async function (req, res, next) {
  var songId = req.song._id;

  try {
    let user = await User.findById(req.payload.id);
    if (!user) return res.sendStatus(401);

    await user.unfavorite(songId);
    await userUtils.lessReputation(user, 20);
    let song = await req.song.updateFavoriteCount();

    return res.json({song: song.toJSONFor(user)});
  }catch(e) {
    next();
  }// end_catch
});

router.get('/:song/comments', auth.optional, async function(req, res, next) {
  try {
    let user = req.payload ? await User.findById(req.payload.id) : null;
    let song = await req.song.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate();
    return res.json({comments: req.song.comments.map(function(comment){
        return comment.toJSONFor(user)})});
  }catch(e) {
    next();
  }// end_catch
});

router.post('/:song/comments', auth.required, async function(req, res, next) {
  try {
    let user = await User.findById(req.payload.id);
    if (!user) res.sendStatus(401);

    let comment = new Comment(req.body.comment);
    comment.song = req.song;
    comment.author = user;
    await comment.save();

    req.song.comments = req.song.comments.concat([comment]);

    await req.song.save();
    await userUtils.moreReputation(user, 40);

    return res.json({comment: comment.toJSONFor(user)});
  }catch(e) {
    next();
  }// end_catch
});

router.delete('/:song/comments/:comment', auth.required, async function(req, res, next) {
  if(req.comment.author.toString() === req.payload.id.toString()){
    await req.song.comments.remove(req.comment._id);

    user = await User.findById(req.payload.id);

    await userUtils.lessReputation(user, 40);
    await req.song.save();
    await Comment.find({_id: req.comment._id}).remove().exec();

    res.sendStatus(204);
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;