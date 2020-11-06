var mongoose = require("mongoose");
let Comment = mongoose.model('Comment');
let userUtils = require('./users.utils');
const axios = require('axios');

exports.deleteSong = async function(song, user) {

    song.comments.forEach(async function(element) {
        await Comment.findById(element).remove().exec();
        // await userUtils.lessReputation(user, 40);
    });
    song.save();

    return song.remove();
}// end_deleteSong

exports.requestGroup = async function(slug) {
    axios({
        url: "http://192.168.0.182:3002/api/graphql",
        method: 'post',
        data: {
            query: `
            query {
                group(slug: "${slug}") {
                    id
                    slug
                    name
                    singers
                    creationDate
                    image
                    favoritesCount
                }
            }
        `
        }
    }).then((res) => {
        return res.data.data.group;
    })
}// end_requestGrouop