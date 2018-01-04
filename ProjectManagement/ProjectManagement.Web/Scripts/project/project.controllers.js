(function (angular) {
    'use strict';

    angular
        .module('app.project', ['projectManagement'])
        .controller('projectController', ['$scope', 'apiUrl', 'dataFetcher', '$filter',

    function ($scope, apiUrl, dataFetcher, $filter) {
        $scope.projects = [];
        $scope.project = {};
        $scope.project.priority = 0;
        $scope.project.submitLabel = 'Add';


        $scope.GetAllProjects = function () {
            var url = apiUrl.getApiUrl('projectsApi');
            dataFetcher._getData(url)
                       .then(function (data) {
                           $scope.projects = data;
                       });
        }

        $scope.AddUpdateProject = function () {
            var url = apiUrl.getApiUrl('projectsApi');

        }

        $scope.ResetClick = function () {
            $scope.project.submitLabel = 'Add';
        }

        $scope.EditProject = function (selectedProject) {
            $scope.project.projectDescription = selectedProject.project_Name;
            $scope.project.startDate = new Date(selectedProject.start_Date);
            $scope.project.endDate = new Date(selectedProject.end_Date);
            $scope.project.priority = selectedProject.priority;
            $scope.project.manager = selectedProject.manager;
            $scope.project.submitLabel = 'Update';
        }

        $scope.GetAllProjects();

    }]);

})(angular);