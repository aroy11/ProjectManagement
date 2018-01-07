(function (angular) {

    'use strict';
    var apiEndPoints = {
        usersApi: 'api/users',
        projectsApi: 'api/projects',
        tasksApi: 'api/tasks',
        parenttasksApi: 'api/parenttasks'
    }

    angular.module('apiCall', [])
        .constant('apiEndPoints', apiEndPoints);

})(angular);