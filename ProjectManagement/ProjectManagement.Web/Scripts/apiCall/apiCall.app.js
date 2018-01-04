(function (angular) {

    'use strict';
    var apiEndPoints = {
        usersApi: 'api/users',
        projectsApi: 'api/projects',
    }

    angular.module('apiCall', [])
        .constant('apiEndPoints', apiEndPoints);

})(angular);