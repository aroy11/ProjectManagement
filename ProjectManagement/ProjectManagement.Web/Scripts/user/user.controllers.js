(function (angular) {
    'use strict';

    angular
        .module('app.user', ['projectManagement'])
        .controller('userController', ['$scope', 'apiUrl', 'dataFetcher', '$filter',

    function ($scope, apiUrl, dataFetcher, $filter) {
        $scope.users = [];
        $scope.user = {};
        $scope.user.submitLabel = 'Add';

        $scope.GetAllUsers = function () {
            var url = apiUrl.getApiUrl('usersApi');
            dataFetcher._getData(url)
                       .then(function (data) {
                           $scope.users = data;
                       });
        }

        $scope.ResetForm = function () {
            $scope.addEditUserForm.$setPristine();
            $scope.addEditUserForm.$setUntouched();
            $scope.user = {};
            $scope.user.submitLabel = 'Add';
        }

        $scope.AddEditUser = function () {
            var url = apiUrl.getApiUrl('usersApi');
            var user = {
                User_ID: $scope.user.userId,
                First_Name: $scope.user.firstName,
                Last_Name: $scope.user.lastName,
                Employee_ID: $scope.user.employeeId
            };
            dataFetcher._postData(url, user)
                .then(function (data) {
                    if (data == true) {
                        $scope.ResetForm();
                        $scope.GetAllUsers();
                    }
                });
        }

        $scope.DeleteUser = function (selectedUser) {
            var url = apiUrl.getApiUrl('usersApi');

            dataFetcher._deleteData(url, selectedUser.user_ID)
                .then(function (data) {
                    $scope.GetAllUsers();
                });
        }

        $scope.ResetClick = function () {
            $scope.ResetForm();
        }

        $scope.EditUser = function (selectedUser) {
            $scope.user.userId = selectedUser.user_ID;
            $scope.user.firstName = selectedUser.first_Name;
            $scope.user.lastName = selectedUser.last_Name;
            $scope.user.employeeId = selectedUser.employee_ID;
            $scope.user.submitLabel = 'Update';
        }

        $scope.Order = function (order) {

            if (order == '0') {
                $scope.users = $filter('orderBy')($scope.users, 'first_Name');
            }
            else if (order == '1') {
                $scope.users = $filter('orderBy')($scope.users, 'last_Name');
            }
            else if (order == '2') {
                $scope.users = $filter('orderBy')($scope.users, 'employee_ID');
            }
        }

        $scope.GetAllUsers();

    }])


})(angular);