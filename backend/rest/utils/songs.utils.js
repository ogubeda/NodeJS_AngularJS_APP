var mongoose = require("mongoose");
let Comment = mongoose.model('Comment');
let userUtils = require('./users.utils');


exports.deleteSong = async function(song, user) {

    song.comments.forEach(async function(element) {
        await Comment.findById(element).remove().exec();
        // await userUtils.lessReputation(user, 40);
    });
    song.save();

    return song.remove();
}// end_deleteSong