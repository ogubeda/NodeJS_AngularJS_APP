const faker = require('faker');
const boom = require('boom');
const fastify = require('fastify')({
    logger: true
});
const mongoose = require('mongoose');

// Connect to Mongo
mongoose.connect('mongodb://localhost/conduit_nodejs')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));



    
require('../models/Comment.js');
require('../models/Song.js');
require('../models/User.js');

let Song = mongoose.model('Song');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');

const generateSongs = (num) => {
    let songs = [];
    let i = 0;

    while (i < num) {
        let title = faker.fake('{{lorem.words}}');
        let group = faker.fake('{{company.companyName}}');
        let duration = faker.fake('{{random.number}}');
        let releaseDate = faker.fake('{{random.word}}');
        let tagList = [faker.fake('{{music.genre}}'), faker.fake('{{music.genre}}'), faker.fake('{{music.genre}}')];

        const song = {
            title,
            group,
            duration,
            releaseDate,
            tagList
        };

        if (songs.filter(value => value.title == song.title).length == 0) {
            songs.push(song);
            i++;
        }// end_if
    }// end_while
}// end_generateSongs
