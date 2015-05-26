angular.module('wodapp.services', [])
	.factory('Exercises', function($resource) {
		
		// localhost: Local
		// 79.148.230.240: server

		return $resource('http://79.148.230.240:3000/wodapp/users/:idUser/exercises/:idExercise', 
			{ idUser: '55357c898aa778b657adafb4', idExercise: '@_id' }, 
			{
    			update: { method: 'PUT' }
  			});
	});