(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("StationsController", StationsController)
//			.config(['$locationProvider', function($locationProvider) 
//				{ $locationProvider.html5Mode({ enabled: true, requireBase: false }); }])

  StationsController.$inject = ["$state", "userDataService", "$log", "$http", "$stateParams", "authService"];

  function StationsController($state, userDataService, $log, $http, $stateParams, authService) {
    var vm = this;

    vm.currentUser = userDataService.user;
		
    vm.stations   = [];
		vm.station    = {};

    vm.newStation = {
      name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10
    };

    vm.editStation = {
      name: "",
      category: ""
    };

    vm.getStations        = getStations;
    vm.getStation         = getStation;
    vm.deleteStation      = deleteStation;
    vm.updateStation      = updateStation;
    vm.updateStation      = updateStation;
    vm.postStation        = postStation;
    vm.resetEditForm 		  = resetEditForm;
		vm.setStepPromises    = setStepPromises;
		vm.playStep           = playStep;
		vm.checkParams        = checkParams;
		
		// Pull in specific station for show route:
		if ($stateParams.id) {
			vm.getStation($stateParams.id);
			console.log("home screen getStation...")
		}

		// Pull in list of stations upon loading home page (need to hide within conditional):
		console.log("WTF DUDES!", userDataService.user)
    if (userDataService.user._id)	{
			vm.user = userDataService.user;
			console.log(vm.user);
			console.log('getStations...')
			getStations();
		}
		
		function getStations() {
			 $http.get('/api/users/' + userDataService.user._id).then(function(response) {
					vm.stations = response.data.userStations
      	}, function(errRes) {
        	console.error('Error retrieving station.', errRes);
      	});
		}
		
		// Initiate station show route:
		function getStation(stationId) {
      $http.get('/api/stations/' + stationId).then(function(response) {
        vm.station = response.data;
				$state.go('station', { id: response.data._id })
      }, function(errRes) {
        console.error('Error retrieving station.', errRes);
      });
    }

    function deleteStation(id) {
			console.log("user pre-DELETE: ", vm.user)
      $http.delete('/api/stations/' + id).then(function(response) {
					getStations();
      }, function(errRes) {
        console.error('Error deleting station.', errRes);
      })
    }

    function postStation() {
      $http.post('/api/stations', vm.newStation)
				.then(function(response) {
					$http.put('/api/users/' + vm.user._id, {stationId: response.data._id})
						.then(function() {
							vm.newStation = {
								name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10
							};
							getStations();
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
				return true
			}
		}
		
    vm.$state = $state;
  }

})();
