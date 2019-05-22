'use strict';
var app = angular.module("myApp", []);
app.controller('UserCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.users = [];
        $scope.getUser = function (id) {
            $http({
                method : 'GET',
                url : 'http://localhost:8080/api/user/' + id
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
        $scope.openEditPopup = function (user){
            $scope.editUser = JSON.parse(JSON.stringify(user));
        };
        $scope.modalDetail = function (user){
            $scope.getData = user;
        };
        // fix loi khong  lay dc id do click cua modal
        $scope.addUser = function (name, age, salary,email,address,gender,phone,image) {
            return $http({
                method : 'POST',
                url : 'http://localhost:8080/api/user/',
                data : {
                    name : name,
                    age: age,
                    salary: salary,
                    email: email,
                    address: address,
                    gender: gender,
                    phone: phone,
                    image: image
                }
            }).then(function success(response) {
                    $scope.message = 'User added!';
                    $scope.errorMessage = '';
                    $scope.getAllUsers();

                },
                function error(response) {
                    $scope.errorMessage = 'Error adding user!';
                    $scope.message = '';
                });
        };

        $scope.updateUser = function (id,name, age, salary,email,address,phone,image,gender) {
            return $http({
                method : 'PATCH',
                url : 'http://localhost:8080/api/user/' +id,
                data : {
                    id: id,
                    name : name,
                    age : age,
                    salary: salary,
                    email: email,
                    address: address,
                    phone: phone,
                    gender: gender,
                    image: image
                }
            }).then(function success(response) {
                    $scope.message = 'User data updated!';
                    $scope.errorMessage = '';
                    $scope.getAllUsers();
                    $('#exampleModalCenter').modal("hide");
                    // $("#exampleModal").modal("hide");

                },
                function error(response) {
                    $scope.errorMessage = 'Error updating user!';
                    $scope.message = '';
                    // $scope.getAllUsers();
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

        $scope.regexPhone = /^(03|09)[0-9]{8}$/;
        $scope.regexAge =/^(1[89]|[2-9][0-9])$/;
    }]);
