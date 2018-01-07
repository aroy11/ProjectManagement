(function (angular) {
    'use strict';

    angular
        .module('app.viewtask', ['projectManagement'])
        .controller('viewtaskController', ['$scope', 'apiUrl', 'dataFetcher', '$filter', '$uibModal', '$rootScope', '$location',

    function ($scope, apiUrl, dataFetcher, $filter, $uibModal, $rootScope, $location) {
        $scope.tasks = [];
        $scope.task = {};

        $scope.GetAllTasks = function () {
            var url = apiUrl.getApiUrl('tasksApi');
            dataFetcher._getData(url)
                       .then(function (data) {
                           $scope.allTasks = data;
                           $scope.allTasks.forEach(function (task) {
                               task.startDate = new Date(task.startDate);
                               task.endDate = new Date(task.endDate);
                           });
                       });
        }

        $scope.GetAllProjects = function () {
            var url = apiUrl.getApiUrl('projectsApi');
            dataFetcher._getData(url)
                       .then(function (data) {
                           $scope.projects = data;
                           $scope.projects.forEach(function (project) {
                               project.startDate = new Date(project.startDate);
                               project.endDate = new Date(project.endDate);
                           });
                       });
        }


        $scope.EditTask = function (selectedTask) {
            $rootScope.$broadcast('updatedTask', 'test');
            $location.path('/tasks');
        }

        $scope.Order = function (order) {

            if (order == '0') {
                $scope.tasks = $filter('orderBy')($scope.tasks, 'start_Date');
            }
            else if (order == '1') {
                $scope.tasks = $filter('orderBy')($scope.tasks, 'end_Date');
            }
            else if (order == '2') {
                $scope.tasks = $filter('orderBy')($scope.tasks, 'priority');
            }
        }

        $scope.GetAllProjects();
        $scope.GetAllTasks();

        $scope.animationsEnabled = true;

        $scope.open = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'selectProjectModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    items: function () {
                        var projectDescriptions = $scope.projects.map(function (v) {
                            return v.project_Name;
                        });
                        return projectDescriptions;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.tasks = $filter('filter')($scope.allTasks, { 'project': { 'project_Name': selectedItem } });
            });
        };
    }])

    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };
    })

})(angular);