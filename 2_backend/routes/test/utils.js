let mongoose = require('mongoose');
let User = mongoose.model('User');

exports.SearchUser = async function (email) {
    let user = await User.findOne(email);

    return user;
}// end_SearchUser