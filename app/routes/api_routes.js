var express = require('express'),
    router = express.Router();

// Require fishes controller
var		StationsCtrl = require('../controllers/stations'),
    	UsersCtrl  = require('../controllers/users'),
    	AuthsCtrl  = require('../controllers/auths');


// GET CURRENT USER - WE'RE DOING THIS IN THE BROWSER THOUGH!
// apiRouter.get('/me', function(req, res) {
//   res.send(req.decoded);
// });

//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
router.post('/login',                               AuthsCtrl.userAuth);
router.get('/users',                                UsersCtrl.usersAll);
router.post('/users',                               UsersCtrl.userCreate);
router.get('/users/:id',     AuthsCtrl.tokenVerify, UsersCtrl.userShow);
router.put('/users/:id',     AuthsCtrl.tokenVerify, UsersCtrl.userUpdate);
router.delete('/users/:id',  AuthsCtrl.tokenVerify, UsersCtrl.userDelete);

//||||||||||||||||||||||||||--
// STATIONS CRUD SERVICES
//||||||||||||||||||||||||||--
router.get('/stations/:id',    AuthsCtrl.tokenVerify, StationsCtrl.stationShow);
router.get('/stations',        AuthsCtrl.tokenVerify, StationsCtrl.stationIndex);
router.post('/stations',       AuthsCtrl.tokenVerify, StationsCtrl.stationCreate);
router.post('/grabStations',   AuthsCtrl.tokenVerify, StationsCtrl.grabStations);
router.put('/stations/:id',    AuthsCtrl.tokenVerify, StationsCtrl.stationUpdate);
router.delete('/stations/:id', AuthsCtrl.tokenVerify, StationsCtrl.stationDelete);

module.exports = router;
