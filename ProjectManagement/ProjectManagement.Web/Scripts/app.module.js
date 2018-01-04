(function () {
    'use strict';

    var projectManagementApp = angular.module('projectManagement', ['ngRoute', 'apiCall', 'app.project', 'app.task', 'app.user', 'app.viewtask']);

    projectManagementApp.config(function ($routeProvider) {
        $routeProvider

			.when('/projects', {
			    templateUrl: 'templates/add-edit-project.html',
			    controller: 'projectController'
			})
			.when('/tasks', {
			    templateUrl: 'templates/add-edit-task.html',
			    controller: 'taskController'
			})
            .when('/users', {
                templateUrl: 'templates/add-edit-user.html',
                controller: 'userController'
            })
			.when('/viewtask', {
			    templateUrl: 'templates/view-task.html',
			    controller: 'viewtaskController'
			})
			.otherwise({
			    redirectTo: '/projects',
			});
    });

})();