// Require mongoose to create a model.
var mongoose = require('mongoose'),
    User     = require('./user.js');

var instruments = [];

// Create a schema of your model
var stationSchema = new mongoose.Schema({
  name:   		    			 String,
  user:   		    			 { type: mongoose.Schema.Types.ObjectId, ref:'User' },
	stationInstruments:    [],
	globalControls:        []
});

// Create the model using your schema.
var Station = mongoose.model('Station', stationSchema);

// Export the model of the Station.
module.exports = Station;


//// HARDCODING FAILURE:
//	instruments:    			 [
//		{
//			name: 					String,
//			steps: 					[
//											{
//												id: "KICK0",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "KICK1",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK2",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK3",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK4",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "KICK5",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK6",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK7",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK8",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "KICK9",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK10",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK11",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK12",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "KICK13",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK14",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "KICK15",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											}
//			],
//			muted: 					false,
//			mutePressed: 		false,
//			show: 					false
//		},
//		{
//			name: 					String,
//			steps: 					[
//											{
//												id: "SNARE0",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "SNARE1",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE2",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE3",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE4",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "SNARE5",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE6",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE7",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE8",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "SNARE9",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE10",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE11",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE12",
//												on: false,
//												pressed: false,
//												quarterNote: true
//											},
//											{
//												id: "SNARE13",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE14",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											},
//											{
//												id: "SNARE15",
//												on: false,
//												pressed: false,
//												quarterNote: false
//											}
//			],
//			muted: 					false,
//			mutePressed: 		false,
//			show: 					false
//		},
//	]