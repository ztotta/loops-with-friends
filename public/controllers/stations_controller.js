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

		// === CONTROLLER FUNCTIONS === //
    vm.getStation         = getStation;
    vm.updateStation      = updateStation;
    vm.updateStation      = updateStation;
		vm.setStepPromises    = setStepPromises;
		vm.playStep           = playStep;
		vm.loopToggle         = loopToggle;
		vm.clearMetronome     = clearMetronome;
		
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
		
		// ============================= //
		// ========== SOCKETS ========== //
		// ============================= //
		vm.socket = io();
		
		// Updates station whenever the state of a station is altered:
    function updateStation() {
			// Socket emits the new state of the station after updating the database:
			vm.socket.emit('station_update', vm.stationService.station);
      $http.put('/api/stations/' + vm.stationService.station._id, vm.stationService.station).then(function(response) {
//				vm.socket.emit('station_update', response.data);
      }, function(errRes) {
        console.log('Error updating station.', errRes);
      })
    }
		
		// Listening for station_update's from socket:
		vm.socket.on('station_update', function (uppedStation) {
			if (uppedStation._id === $stateParams.id) {
				// Sets the state of the station to the updated state:
				vm.stationService.station = uppedStation;
				$scope.$apply();
			}
		});
		// ============================= //
		// ============================= //
		// ============================= //
		
		vm.stepOnOff = function(step) {
			// For percussion instruments, toggle step On/Off:
			if (step.instrument === "KICK" || step.instrument === "SNARE" || step.instrument === "HIHAT") {
				step.on = !step.on;
			}
			else {
				// For melodic instruments, cycle through Off > On(E) > On(F) > On(G) > On(B) > On(C) > Off:
				if (step.pressCount <= 3) { step.pressCount ++ }
				else { step.pressCount = -1 }
			}
		};
		
		// Toggle stepPressed On/Off for CSS pushed-in effect:
		vm.stepPressed = function(step) {
			step.pressed = !step.pressed;
		};
		
		// Toggle loop On/Off:
		function loopToggle() {
			vm.stationService.loopOn = !vm.stationService.loopOn;
				clearMetronome();
		};
		
		function clearMetronome() {
			setTimeout(() => {
					// Clear the metronome from the panels:
					vm.stationService.station.stationInstruments.forEach((instr) => {
						for (var k = 0; k < 64; k++) {
							instr.steps[k].metronome = false;	
						};	
					});
					$scope.$apply();
				}, 400)
		};

		// Set initial state of vm.i:
		vm.i = -1
		// Create a Promise.all for the i-th step of each instrument:
		function setStepPromises() {
			Promise.all(vm.stationService.station.stationInstruments.map(instr => {
				var x = new Promise((res, rej) => {
					setTimeout(() => {
							// Adds 1/6th of 1 to each instrument so that i increases by 1 every cycle:
							vm.i += 0.16666666666667;
							res();
					}, 100)
				})
				return x;
			}))
				.then(() => {
					// Cycle through the instruments and play i-th step for each:
					vm.stationService.station.stationInstruments.forEach((instr) => {
						playStep(instr);
						// Remove the metronome 'light' from the previous step (if it has been set):
						if (instr.steps[Math.floor(vm.i - 1)]) { instr.steps[Math.floor(vm.i - 1)].metronome = false;} // remove previous metronome class
						// Add the metronome 'light to the i-th step so the user can follow the beat:
						instr.steps[Math.floor(vm.i)].metronome = true; 
						// Apply the changes:
						$scope.$apply();
					})
					// If the loop is still On, call the Promise.all function again:
					if (stationService.loopOn) { 
						if (Math.floor(vm.i) < 63) {
							setStepPromises();
						}
						// if all of the steps have been cycled through, reset the count and
						// remove metronome 'light' from final step before starting the next loop:
						else {
							vm.i = -1;
							vm.stationService.station.stationInstruments.forEach((instr) => {
								instr.steps[63].metronome = false; 
								$scope.$apply(); // Apply the changes
							})	
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
		
		// Play the i-th step for each instrument that is not muted:
		function playStep(instr) {
			if (!instr.muted) {	
				// If the step is On, or if it is above 0 for melodic instruments (i.e. a note has been selected)
				if (instr.steps[Math.floor(vm.i)].on || instr.name != "KICK" && instr.name != "SNARE" && instr.name != "HIHAT" && instr.steps[Math.floor(vm.i)].pressCount > -1) {
					// Find out which instrument it is and trigger the appropriate tone:
					if (instr.name === "KICK") { 
						kick.play({pitch: 82.41}) 
					}
					else if (instr.name === "SNARE") { snare.play() }
					else if (instr.name === "HIHAT") { hihat.play({panning: (Math.random() - 1)}) }
					// For melodic instruments: determine which note is intended and trigger that pitch:
					else if (instr.name === "PLUNK") { 
						if      (instr.steps[Math.floor(vm.i)].pressCount === 0) { plunk.play({pitch: 82.41}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 1) { plunk.play({pitch: 87.30}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 2) { plunk.play({pitch: 98.00}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 3) { plunk.play({pitch: 123.5}) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 4) { plunk.play({pitch: 130.8}) }
					}
					else if (instr.name === "HANDPAN") { 
						if      (instr.steps[Math.floor(vm.i)].pressCount === 0) { handpan.play({pitch: 329.6, panning: Math.random() }) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 1) { handpan.play({pitch: 349.2, panning: Math.random() }) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 2) { handpan.play({pitch: 392.0, panning: Math.random() }) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 3) { handpan.play({pitch: 493.9, panning: Math.random() }) }
						else if (instr.steps[Math.floor(vm.i)].pressCount === 4) { handpan.play({pitch: 523.3, panning: Math.random() }) }
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

  }

})();
