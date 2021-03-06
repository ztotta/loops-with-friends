(function() {
  "use strict";

  angular
    .module("loopsApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/home.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
			.state("login", {
        url: "/login",
        templateUrl: "/templates/login.html",
			  controller: "LoginController",
        controllerAs: "vm"
      })
			.state("hello", {
        url: "/hello",
        templateUrl: "/templates/hello.html",
        controller: "HelloController",
        controllerAs: "hel"
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl:  "/templates/about.html"
      })
      .state("register", {
        url: "/register",
        templateUrl: "/templates/register.html",
        controller: "UsersController",
        controllerAs: "vm"
      })
			.state("station", {
        url: "/station/:id",
        templateUrl: "/templates/station.html",
        controller: "StationsController",
        controllerAs: "sta",
			  params: {
					id: null
				}
      });

    $urlRouterProvider.otherwise("/");
  }

})();
