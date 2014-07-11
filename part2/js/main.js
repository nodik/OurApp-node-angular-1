'use strict'
angular.module('App',[
  'ngRoute',
  'ngResource',
  'ngTable',
  'ui.bootstrap'
  ])
   .config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'views/main.html',
		controller:'MainCtrl'
	})
})