const faker = require('faker');
const mongoose = require('mongoose');
let router = require('express').Router();
let Song = mongoose.model('Song');
let Comment = mongoose.model('Comment');
let utilsUser = require('../../utils/users.utils');

router.post('/songs/:qty', async (req, res) => {
    try {
        let user = await utilsUser.createTesting();

        for (let i = 0; i < req.params.qty; i++) {
            let song = new Song();

            song.title = faker.fake('{{lorem.words}}');
            song.group = faker.fake('{{company.companyName}}');
            song.duration = parseInt(faker.fake('{{random.number}}'));
            song.releaseDate = faker.fake('{{random.word}}');
            song.tagList = [faker.fake('{{random.word}}'), faker.fake('{{random.word}}'), faker.fake('{{random.word}}')];
            song.uploaded = user.toJSON();

            await song.save()
        }// end_for

        return res.json({ res: 'Songs added.' });
    } catch (e) {
        console.log(e);
    }// end_catch
});

router.post('/comments/:song/:qty', async (req, res) => {
    try {
        let user = await utilsUser.createTesting();
        let song = await Song.findOne({slug: req.params.song})

        for (let i = 0; i < req.params.qty; i++) {
            let comment = new Comment({body: faker.fake('{{lorem.sentence}}')});
            comment.author = user;
            comment.song = song
            await comment.save();

            song.comments = song.comments.concat([comment]);
            await song.save();

        }// end_for
        return res.json({res: 'Comments added.'})
    }catch(e) {
        console.log(e);
    }// end_catch
});

module.exports = router;