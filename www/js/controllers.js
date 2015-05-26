angular.module('wodapp.controllers', [])

/**
 * 
 */
.controller('SlideController', function($scope, $state) {

	// go to login
	$scope.dashboard = function() {
    	$state.go('login');
  	};
})

/**
 * 
 */
.controller('DashboardController', function($scope, $state, Exercises){

	// go to exercise
	$scope.exercise = function(){
		$state.go('exercise');
	}
})

/**
 * 
 */
.controller('ExerciseController', function($scope, $state, Exercises){
	// console.log(JSON.stringify(data, null, 4))

	// initializate
	$scope.exercises = [];

	// reload exercises every time  when we enter in the controller
	Exercises.query(function (data){
		$scope.exercises = data;
	});

	// refresh the list of exercises
	$scope.doRefresh = function() {

		// reload exercises
		Exercises.query(function(data) {
		    $scope.exercises = data;
		});

		// control refresh element 
		$scope.$broadcast('scroll.refreshComplete'); 
		$scope.$apply();
    }    

	// create a new execersie template
	$scope.newExercise = function(){
		$state.go('newExercise');
	};

	// delete a exercise
	$scope.deleteExercise = function (i){

		// we access to the element using index param
		var exerciseDelete = $scope.exercises[i];

       	// delete exercise calling Rest API and later remove to the scope
		exerciseDelete.$delete(function (data){
			$scope.exercises.splice(i, 1);
		});
	};

	// show percent table
	$scope.showPercent = function (i){

		// we access to the element using index param
		var exerciseDelete = $scope.exercises[i];

		// go to percents controll passing params
		$state.go('Percents', { exerciseId:exerciseDelete._id });
	}
})

/**
 * 
 */
.controller('NewExerciseController', function($scope, $state, Exercises){

	// create new exercise
	$scope.exercise = new Exercises();

	// add new exercises in to scope and save
	$scope.addNewExercise = function(){
    	$scope.exercise.$save(function(){
    		$state.go('exercise');
    	});
    };
})

/**
 * 
 */
.controller('ExercisesPercentController', function($scope, $state, $stateParams, Exercises){

	// access specific exercise
	$scope.exercise = Exercises.get(
		{ idExercise: $stateParams.exerciseId }, 
		function (data){
		
			// inject value
			$scope.exercise = data;
		   
			// percent array
			percents = [];

			// calculate percent table ca
			percent = 95;
			for (i = 2; i <= 20; i++) { 

				var pr = parseFloat($scope.exercise.pr);
				var rest = (pr * percent) / 100;
				var w = Math.round((pr - rest) * 100) / 100;
		    	percents.push({ value: percent, weight: pr - w });

		    	percent -= 5;
			}
			$scope.percents = percents;
		});
})

/**
 * 
 */
.controller('LoginController', function($scope, $state) {

	// go to login
	$scope.login = function() {
		$state.go('dashboard');
  	};
});