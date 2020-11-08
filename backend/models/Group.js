var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var GroupSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  singers: [{type: String}],
  creationDate: String,
  albums: [{type: String}],
  image: String,
  favoritesCount: {type: Number, default: 0},
}, {timestamps: true});

GroupSchema.plugin(uniqueValidator, {message: 'is already taken'});

GroupSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

GroupSchema.methods.slugify = function() {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

GroupSchema.methods.updateFavoriteCount = function() {
  var song = this;

  return User.count({favorites: {$in: [song._id]}}).then(function(count){
    song.favoritesCount = count;

    return song.save();
  });
};

GroupSchema.methods.toJSONFor = function(){
  return {
    slug: this.slug,
    name: this.name,
    singers: this.singers,
    creationDate: this.creationDate,
    albums: this.albums,
    image: this.image ? this.image : 'images/songs/default-group.jpeg',  
    favoritesCount: this.favoritesCount,
    favorited: user ? user.isFavorite(this._id) : false,
  };
};

mongoose.model('Group', GroupSchema);
