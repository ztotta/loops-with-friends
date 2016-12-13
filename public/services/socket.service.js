//(function() {
//
//  angular.module('loopsApp')
//         .factory('socketService', socketService);
//
//  socketService.$inject = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];
//
//  //||||||||||||||||||||||||||--
//  // Socket SERVICE FACTORY
//  //||||||||||||||||||||||||||--
//  function socketService($http, $q, authToken, userDataService, $state, $window) {
//
//    // create station factory object
//    var socketFactory = {};
//		
//		socketFactory.on = function (eventName, callback) {
//			socket.on(eventName, function () {  
//				var args = arguments;
//				$rootScope.$apply(function () {
//					callback.apply(socket, args);
//				});
//			});
//		}
//		
//		
//
//    // return station factory object
//    return socketFactory;
//  }
//
//})();