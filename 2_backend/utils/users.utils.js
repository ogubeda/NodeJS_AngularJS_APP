let mongoose = require('mongoose');
var User = mongoose.model('User');

exports.addUser = async function(values) {
    var user = new User();

      user.username = values.username;
      user.email = values.email;
      user.setPassword(values.password);
      user.idsocial = values.email;

      await user.save();

      return user;
}// end_addUser

exports.createTesting = async function() {
    let user = await User.findOne({ username: 'testing' });

    if (!user) {
        user = await addUser({ username: 'testing', email: 'testing@gmail.com', password: 'testing1', idsocial: 'testing@gmail.com' });
    }// end_if

    return user;
}// end_createTesting

exports.moreReputation = async function(user, num) {
    user.addRep(num);
}// end_moreReputation

exports.lessReputation = async function(user, num) {
    num = (user.reputation < num) ? user.reputation : num;

    user.lessRep(num);
}// end_lessReputation