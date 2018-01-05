(function (angular) {
    'use strict';

    angular
        .module('app.project', ['projectManagement'])
        .controller('projectController', ['$scope', 'apiUrl', 'dataFetcher', '$filter', '$uibModal',

    function ($scope, apiUrl, dataFetcher, $filter, $uibModal) {
        $scope.projects = [];
        $scope.project = {};
        $scope.project.priority = 0;
        $scope.project.submitLabel = 'Add';


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

        $scope.ResetForm = function () {
            $scope.addEditProjectForm.$setPristine();
            $scope.addEditProjectForm.$setUntouched();
            $scope.project = {};
            $scope.project.priority = 0;
            $scope.project.submitLabel = 'Add';
        }

        $scope.AddUpdateProject = function () {
            var url = apiUrl.getApiUrl('projectsApi');
            var project = {
                Project_ID: $scope.project.projectId,
                Project_Name: $scope.project.projectDescription,
                Start_Date: $scope.project.startDate,
                End_Date: $scope.project.endDate,
                Priority: $scope.project.priority,
                Manager: $scope.project.manager,
            };
            dataFetcher._postData(url, project)
                .then(function (data) {
                    if (data == true) {
                        $scope.ResetForm();
                        $scope.GetAllProjects();
                    }
                });
        }

        $scope.ResetClick = function () {
            $scope.ResetForm();
        }

        $scope.EditProject = function (selectedProject) {
            $scope.project.projectId = selectedProject.project_ID;
            $scope.project.projectDescription = selectedProject.project_Name;
            $scope.project.startDate = new Date(selectedProject.start_Date);
            $scope.project.endDate = new Date(selectedProject.end_Date);
            $scope.project.priority = selectedProject.priority;
            $scope.project.manager = selectedProject.manager;
            $scope.project.submitLabel = 'Update';
        }

        $scope.Order = function (order) {

            if (order == '0') {
                $scope.projects = $filter('orderBy')($scope.projects, 'startDate');
            }
            else if (order == '1') {
                $scope.projects = $filter('orderBy')($scope.projects, 'endDate');
            }
            else if (order == '2') {
                $scope.projects = $filter('orderBy')($scope.projects, 'priority');
            }
        }

        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }

        $scope.SetDefaultDates = function () {
            if ($scope.project.isSetDates) {
                $scope.project.startDate = new Date();
                $scope.project.endDate = $scope.project.startDate.addDays(1);
            }
            else {
                $scope.project.startDate = null;
                $scope.project.endDate = null;
            }
        }

        $scope.GetAllProjects();
        $scope.GetAllUsers();

        $scope.animationsEnabled = true;

        $scope.open = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'selectManagerModalContent.html',
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
                $scope.project.manager = selectedItem;
            });
        };
    }])

    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        //$ctrl.cancel = function () {
        //    $uibModalInstance.dismiss();
        //};
    })
})(angular);