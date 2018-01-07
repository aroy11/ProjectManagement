(function (angular) {
    'use strict';

    angular
        .module('app.task', ['projectManagement'])
        .controller('taskController', ['$scope', 'apiUrl', 'dataFetcher', '$filter', '$uibModal',

    function ($scope, apiUrl, dataFetcher, $filter, $uibModal) {
        $scope.tasks = [];
        $scope.task = {};
        $scope.task.priority = 0;
        $scope.task.submitLabel = 'Add';

        $scope.$on('updatedTask', function (events, args) {
            console.log('subscribed');
            $scope.task = args;
        })

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

        $scope.GetAllUsers = function () {
            var url = apiUrl.getApiUrl('usersApi');
            dataFetcher._getData(url)
                       .then(function (data) {
                           $scope.users = data;
                       });
        }

        

        $scope.GetAllParentTasks = function () {
            var url = apiUrl.getApiUrl('parenttasksApi');
            dataFetcher._getData(url)
                       .then(function (data) {
                           $scope.parentTasks = data;
                       });
        }

        $scope.ResetForm = function () {
            $scope.addEditTaskForm.$setPristine();
            $scope.addEditTaskForm.$setUntouched();
            $scope.task = {};
            $scope.task.priority = 0;
            $scope.task.submitLabel = 'Add';
        }

        $scope.AddUpdateTask = function () {
            if ($scope.task.isParentTask) {
                var url = apiUrl.getApiUrl('parenttasksApi');
                var task = {
                    Parent_Task: $scope.task.taskDescription,
                };
            }
            else {
                var url = apiUrl.getApiUrl('tasksApi');
                var task = {
                    Task_ID: $scope.task.projectId,
                    Parent_ID: $filter('filter')($scope.parentTasks, { 'parent_Task': $scope.task.parentTask })[0].parent_ID,
                    Project_ID: $filter('filter')($scope.projects, { 'project_Name': $scope.task.project })[0].project_ID,
                    Task_Name: $scope.task.taskDescription,
                    Start_Date: $scope.task.startDate,
                    End_Date: $scope.task.endDate,
                    Priority: $scope.task.priority,
                };
            }

           
            dataFetcher._postData(url, task)
                .then(function (data) {
                    if (data == true) {
                        $scope.ResetForm();
                    }
                });
        }

        $scope.ResetClick = function () {
            $scope.ResetForm();
        }
                
        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }

        $scope.SetDefaultDates = function () {
            if (!$scope.task.isParentTask) {
                $scope.task.startDate = new Date();
                $scope.task.endDate = $scope.task.startDate.addDays(1);
            }
            else {
                $scope.task.startDate = null;
                $scope.task.endDate = null;
            }
        }

        $scope.GetAllProjects();
        $scope.GetAllUsers();
        $scope.GetAllParentTasks();

        $scope.animationsEnabled = true;

        $scope.openProject = function () {
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
                $scope.task.project = selectedItem;
            });
        };

        $scope.openTask = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'selectParentTaskModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    items: function () {
                        
                        var parentTaskNames = $scope.parentTasks.map(function (v) {
                            return v.parent_Task;
                        });
                        return parentTaskNames;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.task.parentTask = selectedItem;
            });
        };

        $scope.openUser = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'selectProjectModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    items: function () {
                        var userNames = $scope.users.map(function (v) {
                            return v.first_Name + ' ' + v.last_Name;
                        });
                        return userNames;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.task.user = selectedItem;
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