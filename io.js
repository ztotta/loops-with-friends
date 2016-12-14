//// Station updates:
var io = require('socket.io')();

// Listen for new connections here
io.on('connection', function(socket) {
  console.log('Client connected to socket.io!');

	socket.on('station_update', function(uppedStation) {
		
		console.log('entered server socket.on station_update');
		
		io.emit('station_update', uppedStation);
		
	});
	
//	socket.on('station_connect', function(station) {
//		var station_nsp = io.of('/' + station);
//	})
//	
//	socket.on('station_update', function(data) {
//		var update  = data.stationUpdate;
//		var nsp     = data.nsp;
//		io.of(nsp).emit('station_update', update)
//	})
	
});

module.exports = io;




















//	socket.on('station_update_ack', function (data, callback) {
//    callback(data);
//	});