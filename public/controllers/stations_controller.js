(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("StationsController", StationsController)
//			.config(['$locationProvider', function($locationProvider) 
//				{ $locationProvider.html5Mode({ enabled: true, requireBase: false }); }])

  StationsController.$inject = ["$state", "userDataService", "$log", "$http", "$stateParams"];

  function StationsController($state, userDataService, $log, $http, $stateParams) {
    var vm = this;

    vm.user = userDataService.user;

    vm.stations = [];
		vm.station = {};

    vm.newStation = {
      name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10
    };

    vm.editStation = {
      name: "",
      category: ""
    };

//    vm.getStations        = getStations;
    vm.getStation         = getStation;
    vm.deleteStation      = deleteStation;
    vm.updateStation      = updateStation;
    vm.updateStation      = updateStation;
    vm.postStation        = postStation;
    vm.resetEditForm 		  = resetEditForm;
		vm.setStepPromises    = setStepPromises;
		vm.playStep           = playStep;
		vm.checkParams        = checkParams;
//		vm.addStationToUser   = addStationToUser;  
		
		console.log("vm.user.stations = ", vm.user.stations)
		
		// Pull in list of stations upon loading home page (need to hide within conditional):
//    vm.getStations();
		
		// Pull in specific station for show route:
		if ($stateParams.id) {
			vm.getStation($stateParams.id);
		}

//    function getStations() {
//      $http.get('/api/stations').then(function(response) {
//        vm.stations = response.data;
//      }, function(errRes) {
//        console.error('Error retrieving stations.', errRes);
//      });
//    }
		
//		function getStations() {
//      $http.post('/api/grabStations', vm.user).then(function(response) {
////				console.log(response.data)
//        vm.stations = response.data;
//      }, function(errRes) {
//        console.error('Error retrieving stations.', errRes);
//      });
//    }
		
		// Initiate station show route:
		function getStation(stationId) {
      $http.get('/api/stations/' + stationId).then(function(response) {
        vm.station = response.data;
        console.log(vm.station);
				$state.go('station', { id: response.data._id })
      }, function(errRes) {
        console.error('Error retrieving station.', errRes);
      });
    }

    function deleteStation(id) {
      $http.delete('/api/stations/' + id).then(function(response) {
      }, function(errRes) {
        console.error('Error deleting station.', errRes);
      })
				.then(() => {
					vm.user = userDataService.user;
				});
    }

    function postStation() {
      $http.post('/api/stations', vm.newStation)
				.then(function(response) {
					$http.put('/api/users/' + vm.user._id, {stationId: response.data._id})
//						.then(getStations)
						.then(function() {
							vm.newStation = {
								name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10
							};
							$state.go('station');
						});
				})
    }

    function updateStation(id) {
      $http.put('/api/stations/' + id, vm.editStation).then(function(response) {
        vm.editStation = {
          name: "",
          category: ""
        };
      }, function(errRes) {
        console.log('Error updating station.', errRes);
      }).then(getStations);
    }

    function resetEditForm() {
      vm.stationCategory = '';
      vm.stationName = '';
      vm.editStation = {
        name: "",
        category: ""
      };
    }
		
		vm.stepOnOff = function(step) {
			step.on = !step.on;
		};
		
		vm.stepPressed = function(step) {
			step.pressed = !step.pressed;
		};

		vm.i = -1
		function setStepPromises() {
			Promise.all(vm.station.stationInstruments.map(instr => {
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
					vm.station.stationInstruments.forEach((instr) => {
						playStep(instr)
					})
					if (true) { // breakpoint for global pause
						setStepPromises();
					}
				})
				.catch((reason) => {
					console.log(reason)
				})
		}

		function playStep(instr) {
			if (!instr.muted) {	
				if (instr.steps[Math.floor(vm.i)].on) {
					if (instr.name === "KICK") { 
						kick.play() 
					}
					else if (instr.name === "SNARE") { snare.play() }
				}
			}
		}
		
		function checkParams() {
			if ($stateParams.id) {
				console.log($stateParams.id)
				return true
			}
		}
		
    vm.$state = $state;
  }

})();
