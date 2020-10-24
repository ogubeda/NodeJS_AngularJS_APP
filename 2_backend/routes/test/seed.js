const faker = require('faker');
const boom = require('boom');
const mongoose = require('mongoose');
let router = require('express').Router();
let Song = mongoose.model('Song');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let utilsUser = require('../../utils/users.utils');




router.post('/songs/:qty', async (req, res, next) => {
    try {
        let songs = [];

        let user = await User.findOne({ username: 'testing' });

        if (!user) {
            user = await utilsUser.addUser({ username: 'testing', email: 'testing@gmail.com', password: 'testing1', idsocial: 'testing@gmail.com' });
        }// end_if

        // console.log(user.toJSON());

        for (let i = 0; i < req.params.qty; i++) {
            let song = new Song();

            song.title = faker.fake('{{lorem.words}}');
            song.group = faker.fake('{{company.companyName}}');
            song.duration = parseInt(faker.fake('{{random.number}}'));
            song.releaseDate = faker.fake('{{random.word}}');
            song.tagList = [faker.fake('{{random.word}}'), faker.fake('{{random.word}}'), faker.fake('{{random.word}}')];
            song.uploaded = user.toJSON();

            songs.push(song.toJSONFor(user));
        }// end_for

        // await Song.insertMany(songs);

        return res.json({ test: 'hola' })
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;