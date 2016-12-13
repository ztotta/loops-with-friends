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
// GET STATIONS (INDEX)
//||||||||||||||||||||||||||--
var stationIndex = function(req, res) {
	
	console.log(req)
	
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
  
		//// Assign arrays:
	var instruments = [];
	var instrumentsList = ["KICK", "SNARE", "HIHAT-CLOSED", "HIHAT-OPEN", "RIMSHOT", "CLAP"];

	instrumentsList.forEach(instrument => {
		createInstruments(instrument);
	});

	function createInstruments(instrument) {
		instruments.push({
			name: instrument,
			steps: [],
			muted: false,
			mutePressed: false,
			show: false
		});
	}

	// For each instrument, call the steps to populate its panel:
	instruments.forEach((instrument, index) => {
		createSteps(instrument, index);
	});

	function createSteps(instrument, index) {
		for (var i = 0; i < 64; i++) {
			if (i === 0 || i % 4) {
				var quarterNote = true;
			} else {
				var quarterNote = false;
			}

			instrument.steps.push(
				{
					id: `${instrument.name}${i}`,
					on: false,
					pressed: false,
					quarterNote: quarterNote
				}
			);
		};
	};
	
	var globalControls = [
				{ 
					name: "GLOBAL I/O",
					on: false
				},
				{ 
					name: "TEMPO",
					on: true
				},
				{ 
					name: "KEY",
					on: true
				}
			];
	
	var station                    = new Station();   // create a new instance of the Station model

  station.name                   = req.body.name;
//  station.user              		 = req.body.user;
	station.stationInstruments     = instruments;
	station.globalControls         = globalControls;

  station.save(function(err, savedStation) {
    if (err) {
      res.send(err)
    }

    // log a message
    console.log("Created a station!")
    // return the station
    res.json(savedStation);
  });
};

//||||||||||||||||||||||||||--
// UPDATE STATION
//||||||||||||||||||||||||||--
var stationUpdate = function(req, res) {
  var id = req.body._id;
//	console.log("var id: ", id)

  Station.findById(id, function(err, station) {

    if (err) { 
      res.send(err);
    }

		if (req.body.globalControls) 			station.globalControls 		  = req.body.globalControls;
    if (req.body.stationInstruments)  station.stationInstruments  = req.body.stationInstruments;
		
    // save the station
    station.save(function(err, updatedStation) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Updated the station!");
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
