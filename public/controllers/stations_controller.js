(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("StationsController", StationsController)

  StationsController.$inject = ["$state", "userDataService", "$log", "$http", "$stateParams", "authService", "stationService", "$scope"];

  function StationsController($state, userDataService, $log, $http, $stateParams, authService, stationService, $scope) {
    var vm = this;

		// === CONTROLLER OBJ/ARR/BOOL === //
    vm.currentUser        = userDataService.user;
		vm.stationService     = stationService;
		vm.loopOn             = false;

		// === CONTROLLER FUNCTIONS === //
    vm.getStation         = getStation;
    vm.updateStation      = updateStation;
    vm.updateStation      = updateStation;
		vm.setStepPromises    = setStepPromises;
		vm.playStep           = playStep;
		vm.loopToggle         = loopToggle;
		
		
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
		
		console.log("socket: ", vm.socket);
		
    function updateStation() {
      $http.put('/api/stations/' + vm.stationService.station._id, vm.stationService.station).then(function(response) {
				// Socket emits the new state of the station after updating the database:
				vm.socket.emit('station_update', response.data);
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
		
		vm.stepOnOff = function(step) {
			if (step.instrument === "KICK" || step.instrument === "SNARE" || step.instrument === "HIHAT") {
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
		
		function loopToggle() {
			vm.loopOn = !vm.loopOn;
		};

		vm.i = -1
		function setStepPromises() {
			Promise.all(vm.stationService.station.stationInstruments.map(instr => {
				var x = new Promise((res, rej) => {
					setTimeout(() => {
							vm.i += 0.16666666666667;
							res();
					}, 100)
				})
				return x;
			}))
				.then(() => {
					vm.stationService.station.stationInstruments.forEach((instr) => {
						playStep(instr)
					})
					if (vm.loopOn) { // eventual breakpoint for global pause
						if (Math.floor(vm.i) < 63) {
							setStepPromises();
						}
						else {
								vm.i = -1;
								setStepPromises();
						}
					}
					else {
						vm.i = -1;
					}
				})
				.catch((reason) => {
					console.log(reason)
				})
		}

		function playStep(instr) {
			if (!instr.muted) {	
				if (instr.steps[Math.floor(vm.i)].on || instr.name != "KICK" && instr.name != "SNARE" && instr.name != "HIHAT" && instr.steps[Math.floor(vm.i)].pressCount > -1) {
					if (instr.name === "KICK") { 
						kick.play({pitch: 80}) 
					}
					else if (instr.name === "SNARE") { snare.play() }
					else if (instr.name === "HIHAT") { hihat.play() }
					else if (instr.name === "PLUNK") { 
						if      (instr.steps[Math.floor(vm.i)].pressCount === 0) { plunk.play({pitch: 82.41}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 1) { plunk.play({pitch: 87.30}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 2) { plunk.play({pitch: 98.00}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 3) { plunk.play({pitch: 123.5}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 4) { plunk.play({pitch: 130.8}) }
					}
					else if (instr.name === "HANDPAN") { 
						if      (instr.steps[Math.floor(vm.i)].pressCount === 0) { handpan.play({pitch: 329.6}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 1) { handpan.play({pitch: 349.2}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 2) { handpan.play({pitch: 392.0}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 3) { handpan.play({pitch: 493.9}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 4) { handpan.play({pitch: 523.3}) }plunk
					}
					else if (instr.name === "STINGRAY") { 
						if      (instr.steps[Math.floor(vm.i)].pressCount === 0) { stingray.play({pitch: 329.6}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 1) { stingray.play({pitch: 349.2}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 2) { stingray.play({pitch: 392.0}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 3) { stingray.play({pitch: 493.9}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 4) { stingray.play({pitch: 523.3}) }
					}
				}
			}
		}
		
    vm.$state = $state;
  }

})();
