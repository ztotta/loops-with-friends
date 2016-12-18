// Require the model/s you're controlling
var Station = require("../models/station");

// ========================== //
// === GET STATION (SHOW) === //
// ========================== //
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

// ============================ //
// === GET STATIONS (INDEX) === //
// ============================ // 
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

// ====================== //
// === CREATE STATION === //
// ====================== //
var stationCreate = function(req, res) {
  
	// Instantiate arrays:
	var instruments = [];
	var instrumentsList = ["KICK", "SNARE", "HIHAT", "PLUNK", "HANDPAN", "STINGRAY"];

	instrumentsList.forEach(instrument => {
		createInstruments(instrument);   // Create each instrument
	});

	function createInstruments(instrument) {
		instruments.push({
			name: instrument,
			steps: [],        // Will hold the 64 steps/pads created below
			muted: false,     // Should the instrument be heard?
			show: true        // Should the instrument be displayed?
		});
	}

	// For each instrument, call createSteps to populate its panel:
	instruments.forEach((instrument, index) => {
		createSteps(instrument, index); 
	});

	function createSteps(instrument, index) {
		for (var i = 0; i < 64; i++) {         // Create 64 steps per instrument panel.
			if (i === 0 || i % 4) {
				var quarterNote = true;            // Every 4 steps should be a quarter note.
			} else {
				var quarterNote = false;
			}

			instrument.steps.push(
				{
					id: `${instrument.name}${i}`,
					on: false,                        // Is the note On/Off ?
					pressed: false,                   // Used for the 'pressing' button effect
					pressCount: -1,                   // Tallied to know what note the melodic instrument is on
					quarterNote: quarterNote,         // Quarter notes are a different color for easier panel clarity
					metronome: false,                 // Used to toggle On/Off the red metronome 'light'
					instrument: `${instrument.name}`  // Used to easily access which instrument a step belongs to
				}
			);
		};
	};
	
	var station                    = new Station();   // Create a new instance of the Station model

  station.name                   = req.body.name;   // Name it
	station.stationInstruments     = instruments;     // Insert the freshly built instruments

  station.save(function(err, savedStation) {
    if (err) {
      res.send(err)
    }

    // Return the new station:
    res.json(savedStation);
  });
};

// ====================== //
// === UPDATE STATION === //
// ====================== //
var stationUpdate = function(req, res) {
  var id = req.body._id;

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

// ====================== //
// === DELETE STATION === //
// ====================== //
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
