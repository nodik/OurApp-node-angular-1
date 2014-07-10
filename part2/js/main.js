'use strict'
angular.module('App',[
  'ngRoute',
  'ngResource'
  ])
   .config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'views/main.html',
		controller:'MainCtrl'
	})
})