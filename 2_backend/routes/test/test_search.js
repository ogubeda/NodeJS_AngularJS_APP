let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let utils = require('./utils');

router.get('/test1/:email', async function (req, res) {
    let user = await utils.SearchUser(req.params);

    if (user) return res.json({user: user.toAuthJSON()})
    else return res.status(422).json('error');
});

module.exports = router;