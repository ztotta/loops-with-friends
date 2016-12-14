var User        = require('../models/user.js'),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;

// =================== //
// === CREATE USER === //
// =================== //
var userCreate = function(req, res) {
    var user          = new User();   // create a new instance of the User model
    user.name         = req.body.name;  // set the users name (comes from the request)
    user.email  			= req.body.email;  // set the users email (comes from the request)
    user.password     = req.body.password;  // set the users password (comes from the request)
		user.userStations   = [];
		console.log(user);


    user.save(function(err, newUser) {
				console.log(err);
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

// ======================= //
// === GET USER (SHOW) === //
// ======================= //
var userShow = function(req, res) {
  User.findById(req.params.id).populate('userStations').exec(function(err, user) {
        if (err) res.send(err);

        // return that user
        res.json(user);
  });
};

// ========================= //
// === GET USERS (INDEX) === //
// ========================= //
var usersAll = function(req, res) {
  User.find({}, function(err, users) {
        if (err) res.send(err);

        // return the users
        res.json(users);
  });
}

var userUpdate = function(req, res) {
  User.findById(req.params.id, function(err, user) {

        if (err) res.send(err);

        // set the new user information if it exists in the request
        if (req.body.stationId)    	user.userStations.push(req.body.stationId);

        // save the user
        user.save(function(err, user) {
          if (err) res.json(err);
					User.populate(user, {path: "userStations"}, function(err, uppedUser){
						if (err) res.json(err);
          	res.json({ message: 'User updated!', userStations: uppedUser.userStations});
					});
        });
  });
}

// =================== //
// === INVITE USER === //
// =================== //
var userInvite = function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
		
        if (err) res.json({message: "Couldn't find that user...invite them to register!"});

				// If the stationId has been sent, and a matching user has been found:	
        if (req.body.stationId && user)  {
        	
					// Add the shared station's ID to the user's stationIds array:
					user.userStations.push(req.body.stationId);
					
					// Save the updated user:
					user.save(function(err, user) {
						if (err) res.json(err);
						User.populate(user, {path: "userStations"}, function(err, uppedUser){
							if (err) res.json(err);
							res.json({message: 'invited ' + user.email});
						});
					});
				} else {
					res.json({message: "couldn't find that user..."});
				}
  });
}


// =================== //
// === DELETE USER === //
// =================== //
var userDelete = function(req, res) {
  User.remove({
        _id: req.params.id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}

// ===================== //
// === EXPORT MODULE === //
// ===================== //
module.exports = {
  userCreate:   userCreate,
  userShow:     userShow,
  usersAll:     usersAll,
  userUpdate:   userUpdate,
	userInvite:   userInvite,
  userDelete:   userDelete
};
