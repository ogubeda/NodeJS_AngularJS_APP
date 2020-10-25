var mongoose = require("mongoose");
let Comment = mongoose.model('Comment');

exports.deleteSong = async function(song) {
    song.comments.forEach(async function(element) {
        await Comment.findById(element).remove().exec();
    });
    song.save();

    return song.remove();
}// end_deleteSong