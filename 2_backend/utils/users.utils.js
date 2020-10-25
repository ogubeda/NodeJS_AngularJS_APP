let mongoose = require('mongoose');
var User = mongoose.model('User');

exports.addUser = async function(values) {
    var user = new User();

      user.username = values.username;
      user.email = values.email;
      user.setPassword(values.password);
      user.idsocial = values.email;

      user.save().then(function(){
        return user;
      }).catch(function() {
          return false
      });
}// end_addUser

exports.deleteUser = async function(user) {

}// end_deleteUser

exports.createTesting = async function() {
    let user = await User.findOne({ username: 'testing' });

    if (!user) {
        user = await addUser({ username: 'testing', email: 'testing@gmail.com', password: 'testing1', idsocial: 'testing@gmail.com' });
    }// end_if

    return user;
}// end_createTesting