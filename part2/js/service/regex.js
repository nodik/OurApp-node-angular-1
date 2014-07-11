'use strict';

angular.module('App')
	.factory('Regex', function($resource) {
		return $resource('/:regex/g/:url', {
			regex: '@id', url: '@id'
		}, {
			get: {
				method: 'GET',
				params: {
					regex: 0,
					url: 0
				}				
			}
		});
	});