// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ngMap', ['ionic', 'ngRoute','ngResource', 'ngCordova', 'igTruncate']);

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



  app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider


      .state('inicio', {
        url: "/inicio",
        abstract: true,
        templateUrl: "templates/inicio.html",
        controller: 'inicioController'
      })

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'MapController'
      })

      .state('app.map', {
        url: "/map",
        views: {
          'menuContent' :{
            templateUrl: "templates/map.html"
          }
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
          }
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
        }
      })



    $urlRouterProvider.otherwise('/app/map');

  });