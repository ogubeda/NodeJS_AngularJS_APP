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