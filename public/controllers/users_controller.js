(function() {
  angular.module('loopsApp')
         .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'userDataService', '$log', 'authToken'];

  function UsersController($state, authService, userDataService, $log, authToken) {
    var vm = this;

    vm.currentUser = userDataService.user;
    // attaching functions to controller
    vm.createUser = createUser;


    // defining function declarations
    function createUser() {
      vm.message = '';
      // use the create function in the userService
      userDataService.create(vm.userData)
        .then(function(data) {
          vm.userData = {};
          vm.message = data.data.message;
          authToken.setToken(data.data.token);
          userDataService.user = data.data.user;
          $state.go('homePage');
        }, function(err) {
          $log.error(err);
          $state.go('homePage');
        });

    };
  };
})();
