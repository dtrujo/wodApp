angular.module('wodapp', ['ionic', 'ngResource', 'wodapp.controllers', 'wodapp.services'])

// Run
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // ionic is loaded
  });
})

// Config
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('slide', {
      url: '/',
      templateUrl: 'templates/slides.html',
      controller: 'SlideController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardController'
    })
    .state('exercise', {
      url: '/exercise',
      templateUrl: 'templates/exercises.html',
      controller: 'ExerciseController',
      cache: false
    })
    .state('newExercise',{
      url: '/newExercise',
      templateUrl: 'templates/newExercise.html',
      controller: 'NewExerciseController'
    })
    .state('Percents',{
      url: '/exercisesPercent/:exerciseId',
      templateUrl: 'templates/exercisesPercent.html',
      controller: 'ExercisesPercentController'
    });
  $urlRouterProvider.otherwise('/');
});