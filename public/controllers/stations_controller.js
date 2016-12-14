(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("StationsController", StationsController)

  StationsController.$inject = ["$state", "userDataService", "$log", "$http", "$stateParams", "authService", "stationService", "$scope"];

  function StationsController($state, userDataService, $log, $http, $stateParams, authService, stationService, $scope) {
    var vm = this;

		// === CONTROLLER OBJ/ARR === //
    vm.currentUser        = userDataService.user;
		vm.stationService     = stationService;

		// === CONTROLLER FUNCTIONS === //
    vm.getStation         = getStation;
    vm.updateStation      = updateStation;
    vm.updateStation      = updateStation;
		vm.setStepPromises    = setStepPromises;
		vm.playStep           = playStep;
		
		
		// Pull in specific station for show route:
		if ($stateParams.id) {
			vm.getStation($stateParams.id);
		}
		
		// Initiate station show route:
		function getStation(stationId) {
      $http.get('/api/stations/' + stationId).then(function(response) {
        stationService.station = response.data;
      }, function(errRes) {
        console.error('Error retrieving station.', errRes);
      });
    }
		
		// === SOCKETS === //
		vm.socket             = io();
//		vm.stationNSP         = $stateParams.id;
		
		console.log("socket: ", vm.socket);
		
    function updateStation() {
      $http.put('/api/stations/' + vm.stationService.station._id, vm.stationService.station).then(function(response) {
				
				// Socket emits the new state of the station after updating the database:
				vm.socket.emit('station_update', response.data);
//				
//				// Trying new NSP methodology:
//				vm.socket.emit('station_update', vm.stationNSP);
//				var nsp;
//				setTimeout(function() {
//					socket = io.connect()
//				})
				
      }, function(errRes) {
        console.log('Error updating station.', errRes);
      })
    }
		
		// Listening for station_update from server:
		vm.socket.on('station_update', function (uppedStation) {
			if (uppedStation._id === $stateParams.id) {
				vm.stationService.station = uppedStation;
				$scope.$apply();
			}
		});
		// =================== //
		
//		vm.stepOnOff = function(step) {
//			if (inst)
//			step.on = !step.on;
//			if (step.pressCount <= 3) { step.pressCount ++ }
//			else { step.pressCount = 0 }
//			console.log(step.pressCount)
//		};
		vm.stepOnOff = function(step) {
			if (step.instrument === "KICK" || step.instrument === "SNARE") {
				step.on = !step.on;
			}
			else {
				if (step.pressCount <= 3) { step.pressCount ++ }
				else { step.pressCount = -1 }
			}
		};
		
		
		
		vm.stepPressed = function(step) {
			step.pressed = !step.pressed;
		};

		vm.i = -1
		function setStepPromises() {
			Promise.all(vm.stationService.station.stationInstruments.map(instr => {
				var x = new Promise((res, rej) => {
					setTimeout(() => {
						if (Math.floor(vm.i) < 63) {
							vm.i += 0.16666666666667;
							res();
						} else {
							setTimeout(() => {
								vm.i = -1;
							}, 115.38)
							rej("reject");
						}
					}, 100)
				})
				return x;
			}))
				.then(() => {
					vm.stationService.station.stationInstruments.forEach((instr) => {
						playStep(instr)
					})
					if (true) { // eventual breakpoint for global pause
						setStepPromises();
					}
				})
				.catch((reason) => {
					console.log(reason)
				})
		}

		function playStep(instr) {
			if (!instr.muted) {	
				if (instr.steps[Math.floor(vm.i)].on || instr.name != "KICK" && instr.name != "SNARE" && instr.steps[Math.floor(vm.i)].pressCount > -1) {
					if (instr.name === "KICK") { 
						kick.play({pitch: 80}) 
					}
					else if (instr.name === "SNARE") { snare.play() }
					else if (instr.name === "HANDPAN") { 
						if      (instr.steps[Math.floor(vm.i)].pressCount === 0) { handpan.play({pitch: 329.6}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 1) { handpan.play({pitch: 349.2}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 2) { handpan.play({pitch: 392.0}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 3) { handpan.play({pitch: 493.9}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 4) { handpan.play({pitch: 523.3}) }
					}
				}
			}
		}
		
		
		
		
    vm.$state = $state;
  }

})();
