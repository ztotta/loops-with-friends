var User        = require('../models/user.js'),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;

//||||||||||||||||||||||||||--
// CREATE USER
//||||||||||||||||||||||||||--
var userCreate = function(req, res) {
    var user          = new User();   // create a new instance of the User model
    user.name         = req.body.name;  // set the users name (comes from the request)
    user.email  			= req.body.email;  // set the users email (comes from the request)
    user.password     = req.body.password;  // set the users password (comes from the request)


    user.save(function(err, newUser) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false, message: 'A user with that email already exists'});
          else
            return res.json(err);
        }

          var token = jwt.sign({
            email: 			 newUser.email,
            name:        newUser.name,
            _id:         newUser._id
          }, superSecret, {
            expiresIn: '30d' // expires in 30 days
          });

        // return a message
        res.json({
          message: "Let's get loopin'!",
          user: newUser,
          token: token
        });
      });

};

//||||||||||||||||||||||||||--
// GET USER
//||||||||||||||||||||||||||--
var userShow = function(req, res) {
  User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);

        // return that user
        res.json(user);
  });
};

//||||||||||||||||||||||||||--
// GET USERS
//||||||||||||||||||||||||||--
var usersAll = function(req, res) {
  User.find({}, function(err, users) {
        if (err) res.send(err);

        // return the users
        res.json(users);
  });
}

//||||||||||||||||||||||||||--
// UPDATE USER
//||||||||||||||||||||||||||--
var userUpdate = function(req, res) {
  User.findById(req.params.id, function(err, user) {

        if (err) res.send(err);

        // set the new user information if it exists in the request
        if (req.body.name)        user.name        = req.body.name;
        if (req.body.email) 			user.email 			 = req.body.email;
        if (req.body.password)    user.password    = req.body.password;
//        if (req.body.station)    	user.stations.push(req.body.station);

        // save the user
        user.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'User updated!' });
        });
  });
}

//||||||||||||||||||||||||||--
// DELETE USER
//||||||||||||||||||||||||||--
var userDelete = function(req, res) {
  User.remove({
        _id: req.params.id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}

//||||||||||||||||||||||||||--
// EXPORT MODULE
//||||||||||||||||||||||||||--
module.exports = {
  userCreate:   userCreate,
  userShow:     userShow,
  usersAll:     usersAll,
  userUpdate:   userUpdate,
  userDelete:   userDelete
};
