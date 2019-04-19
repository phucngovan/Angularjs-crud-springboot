'use strict';
var app = angular.module("myApp", []);
app.controller('UserCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.edit = true;
        $scope.error = false;
        $scope.incomplete = false;
        $scope.hideform = true;
        $scope.users = [];
        $scope.getUser = function (id) {
            $http({
                method : 'GET',
                url : 'http://localhost:8080/api/user/' + userId
            }).then(function success(response) {
                        $scope.user = response.data;
                        $scope.user.id = id;
                        $scope.message = '';
                        $scope.errorMessage = '';
                    },
                    function error(response) {
                        $scope.message = '';
                        if (response.status === 404) {
                            $scope.errorMessage = 'User not found!';
                        } else {
                            $scope.errorMessage = "Error getting user!";
                        }
                    });
        };
        $scope.addUser = function (name, age, salary) {
            if ($scope.user != null && $scope.user.name) {
                return $http({
                    method : 'POST',
                    url : 'http://localhost:8080/api/user/',
                    data : {
                        name : name,
                        age: age,
                        salary: salary
                    }
                }).then(function success(response) {
                            $scope.message = 'User added!';
                            $scope.errorMessage = '';

                        },
                        function error(response) {
                            $scope.errorMessage = 'Error adding user!';
                            $scope.message = '';
                            $scope.getAllUsers();
                        });
            } else {
                $scope.errorMessage = 'Please enter a name!';
                $scope.message = '';
            }
        };
        $scope.updateUser = function (id, name, age, salary) {
            return $http({
                method : 'PATCH',
                url : 'http://localhost:8080/api/user/' + id,
                data : {
                    name : name,
                    age : age,
                    salary: salary
                }
            }).then(function success(response) {
                        $scope.message = 'User data updated!';
                        $scope.errorMessage = '';
                    },
                    function error(response) {
                        $scope.errorMessage = 'Error updating user!';
                        $scope.message = '';
                    });
        }

        $scope.deleteOneUser = function (id) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/user/' + id
            }).then(function success(response) {
                    $scope.message = 'User deleted!';
                    $scope.User = null;
                    $scope.errorMessage = '';
                    $scope.getAllUsers();
                },
                function error(response) {
                    $scope.errorMessage = 'Error deleting user!';
                    $scope.message = '';
                    $scope.getAllUsers();
                });

        }
        $scope.getAllUsers = function () {
            return $http({
                method : 'GET',
                url : 'http://localhost:8080/api/user/'
            }).then(function success(response) {
                        $scope.users = response.data;
                        $scope.message = '';
                        $scope.errorMessage = '';
                    },
                    function error(response) {
                        $scope.message = '';
                        $scope.errorMessage = 'Error getting users!';
                    });
        }
        $scope.init = function () {
            $scope.getAllUsers();
        }
        $scope.init();
    }]);
