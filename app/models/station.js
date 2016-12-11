// Require mongoose to create a model.
var mongoose = require('mongoose'),
    User     = require('./user.js');

// Create a schema of your model
var stationSchema = new mongoose.Schema({
  name:   		    String,
  user:   		    { type: mongoose.Schema.Types.ObjectId, ref:'User' },
	instruments:    []
});

// Create the model using your schema.
var Station = mongoose.model('Station', stationSchema);

// Export the model of the Station.
module.exports = Station;
