var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var SongSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  group: String,
  duration: Number,
  favoritesCount: {type: Number, default: 0},
  releaseDate: String,
  tagList: [{ type: String }],
}, {timestamps: true});

SongSchema.plugin(uniqueValidator, {message: 'is already taken'});

SongSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

SongSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

SongSchema.methods.updateFavoriteCount = function() {
  var song = this;

  return User.count({favorites: {$in: [song._id]}}).then(function(count){
    song.favoritesCount = count;

    return song.save();
  });
};

SongSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    group: this.group,
    duration: this.duration,
    favoritesCount: this.favoritesCount,
    releaseDate: this.releaseDate,
    favorited: user ? user.isFavorite(this._id) : false,
    tagList: this.tagList,
  };
};

mongoose.model('Song', SongSchema);
