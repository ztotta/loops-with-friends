// Require the model/s you're controlling
var Station = require("../models/station");

//||||||||||||||||||||||||||--
//  GET STATION (SHOW)
//||||||||||||||||||||||||||--
var stationShow = function(req, res, next){
  var id = req.params.id;

  Station.findById(id, function(err, station){
    if (err) {
      res.send(err);
    }

    // return that station as JSON
    res.json(station);
  });
};

//||||||||||||||||||||||||||--
// GET STATION (INDEX)
//||||||||||||||||||||||||||--
var stationIndex = function(req, res) {
  Station.find({}, function(err, stations) {
    if (err) {
      res.send(err);
    }

    // return the stations
    res.json(stations);
  });
}

//||||||||||||||||||||||||||--
// CREATE STATION
//||||||||||||||||||||||||||--
var stationCreate = function(req, res) {
  var station       = new Station();   // create a new instance of the Station model

  station.name      = req.body.name;
  station.category  = req.body.category;

  station.save(function(err, savedStation) {
    if (err) {
      res.send(err)
    }

    // log a message
    console.log("What a station!")
    // return the station
    res.json(savedStation);
  });
};

//||||||||||||||||||||||||||--
// UPDATE STATION
//||||||||||||||||||||||||||--
var stationUpdate = function(req, res) {
  var id = req.params.id;

  Station.findById(id, function(err, station) {

    if (err) {
      res.send(err);
    }

    // set the new station information if it exists in the request
    if (req.body.name) station.name = req.body.name;
    if (req.body.category) station.category = req.body.category;

    // save the station
    station.save(function(err, updatedStation) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Oh, that's the station!");
      // return the station
      res.json(updatedStation);
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE STATION
//||||||||||||||||||||||||||--
var stationDelete = function(req, res) {

  var id = req.params.id;

  Station.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Forget that Station!' });
  });
}

// Export the function/s as JSON
module.exports = {
  stationShow:   stationShow,
  stationIndex:  stationIndex,
  stationCreate: stationCreate,
  stationUpdate: stationUpdate,
  stationDelete: stationDelete
}
