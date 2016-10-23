// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ngMap', ['ionic', 'ngRoute','ngResource', 'ngCordova', 'igTruncate','satellizer', 'base64', 'pdf']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }


    });
  })



  app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {


        $authProvider.loginUrl = "http://node-territorios.herokuapp.com/auth/login";
        $authProvider.signupUrl = "http://node-territorios.herokuapp.com/auth/signup";

        //$authProvider.loginUrl = "http://"+ server +":5000/auth/login";
        //$authProvider.signupUrl = "http://"+ server +":5000/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "app";

  //  $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider

      .state('inicio', {
        url: "/inicio",
        templateUrl: "templates/inicio.html",
        controller: "LoginController",
        controllerAs: "login",
        cache: false
      })

      .state('registrarse', {
        url: "/registrarse",
        templateUrl: "templates/registarse.html",
        controller: "SignupController",
        controllerAs: "signup",
        cache: false
      })

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: "LogoutController",
        controllerAs: "logOut",
         cache: false

      })

      .state('app.map', {
        url: "/map",
        views: {
          'menuContent' :{
            templateUrl: "templates/map.html", 
            controller: 'MapController'
          },
          cache: false
        }
      })

      .state('app.territorios', {
        url:"/territorios",
        views:{
          'menuContent' :{
            templateUrl: "templates/territorios.html",
            controller:'territoriosController',
          },
          cache: false
        }
      })

      .state('app.territoriosDetalles', {
        url:"/territorios/:idTerritorios",
        views:{
          'menuContent' :{
            templateUrl: "templates/territoriosDetalles.html",
           controller:'territoriosDetallesController'
          },
          cache: false
        }
      })

       .state('app.nuevoTerritorio', {
        url:"/nuevoTerritorio",
        views:{
          'menuContent' :{
            templateUrl: "templates/nuevoTerritorio.html",
            controller:'nuevoTerritorioController'
          }
        }
      })
       .state('app.territoriosDirecciones', {
        url:"/territoriosDirecciones/:idTerritorios",
        views:{
          'menuContent' :{
            templateUrl: "templates/territoriosDirecciones.html",
            controller:'territoriosDireccionesController'
          },
          cache: false
        }
      })

       .state('app.territoriosMapa', {
        url:"/territoriosMapa",
        views:{
          'menuContent' :{
            templateUrl: "templates/territoriosMapa.html",
            controller:'territoriosMapaController'
          },
          cache: false
        }
      })


      .state('app.zonas', {
        url:"/zonas",
        views:{
          'menuContent' :{
            templateUrl: "templates/zonas.html",
            controller:'zonasController'
          }
        },
        cache: false
      })

      .state('app.zonasDetalles', {
        url:"/zonas/:idZona",
        views:{
          'menuContent' :{
            templateUrl: "templates/zonasDetalles.html",
           controller:'zonasDetallesController'
          }
        }
      })

       .state('app.nuevaZona', {
        url:"/nuevaZona",
        views:{
          'menuContent' :{
            templateUrl: "templates/nuevaZona.html",
            controller:'nuevaZonaController'
          }
        },
         cache: false
      })

      .state('app.usuarios', {
        url:"/usuarios",
        views:{
          'menuContent' :{
            templateUrl: "templates/usuarios.html",
            controller:'usuariosController'
          }
        },
        cache: false
      })

      .state('app.usuariosDetalles', {
        url:"/usuarios/:idUsuario",
        views:{
          'menuContent' :{
            templateUrl: "templates/usuariosDetalles.html",
           controller:'usuariosDetallesController'
          }
        },
        cache: false
     
      })

    .state('app.direcciones', {
        url:"/direcciones",
        views:{
          'menuContent' :{
            templateUrl: "templates/todasDirecciones.html",
           controller:'direccionesController'
          }
        },
        cache: false
      })

.state('app.direccionesDetalles', {
        url:"/direcciones/:idDireccion",
        views:{
          'menuContent' :{
            templateUrl: "templates/todasDireccionesDetalles.html",
           controller:'direccionesDetallesController'
          }
        },
        cache: false
      })

.state('app.perfil', {
        url:"/perfil",
        views:{
          'menuContent' :{
            templateUrl: "templates/miPerfil.html",
           controller:'miPerfilController'
          }
        },
        cache: false
      })

    $urlRouterProvider.otherwise('/inicio');

  });