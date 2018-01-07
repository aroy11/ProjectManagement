(function (angular) {
    'use strict';

    angular.module('apiCall')

.service('dataFetcher', ['$http', '$q', '$timeout', '$location', '$route', '$rootScope',
                    function ($http, $q, $timeout, $location, $route, $rootScope) {

                        this.reqCount = 0;

                        this._getData = function (url, id) {
                            url = (id === undefined || id < 1) ? url : (url + '/' + id);
                            var deferred = $q.defer();
                            var httpConfig = {
                                method: 'GET',
                                url: url
                            }

                            var self = this;
                            self.reqCount++;
                            $http(httpConfig)

                        .then(function (response) { //Success function
                            self.reqCount--;
                            if (!self.reqCount) {
                            }

                            if (response.data.ResponseCode == -1 && response.data.ResponseMessage != '-1') {
                                $rootScope.$broadcast('sessionTimedOut');
                            }
                            else {
                                //check if ResponseStatus is true
                                if (response.data && !response.data.ResponseStatus) {
                                    //if message is available show message else show default error message
                                    if ((!response.data.ResponseMessage || response.data.ResponseMessage.length === 0) && response.data.ResponseMessage != '-1') {
                                    }
                                    else if (typeof parseJson.getJson(response.data.ResponseMessage) == 'string') {
                                    }
                                }
                            }

                            deferred.resolve(response.data);
                        },

                        function (response) {
                            deferred.reject(response);
                        });
                            return deferred.promise;
                        }

                        this._postData = function (url, data) {
                            var deferred = $q.defer();
                            var httpConfig = {
                                method: 'POST',
                                url: url,
                                data: data
                            }

                            var self = this;
                            self.reqCount++;
                            $http(httpConfig)

                            .then(function (response) { //Success function
                                self.reqCount--;
                                if (!self.reqCount) {
                                }

                                if (response.data.ResponseCode == -1 && response.data.ResponseMessage != '-1') {
                                    $rootScope.$broadcast('sessionTimedOut');
                                }

                                    //check if ResponseStatus is true
                                else if (response.data && !response.data.ResponseStatus) {
                                    //if message is un-available show default error message
                                    if ((!response.data.ResponseMessage || response.data.ResponseMessage.length === 0) && response.data.ResponseMessage != '-1') {
                                    }
                                    else if (typeof parseJson.getJson(response.data.ResponseMessage) == 'string' && response.data.ResponseMessage != 'Session Expired') {
                                    }
                                }

                                deferred.resolve(response.data);
                            },

                            function (response) {
                                self.reqCount--;
                                $timeout(function () {
                                    deferred.reject(response);
                                }, 200);
                            });
                            return deferred.promise;
                        }

                        this._deleteData = function (url, id) {
                            url = (url + '/' + id);
                            var deferred = $q.defer();
                            var httpConfig = {
                                method: 'DELETE',
                                url: url
                            }

                            var self = this;
                            self.reqCount++;
                            $http(httpConfig)

                        .then(function (response) { //Success function
                            self.reqCount--;
                            if (!self.reqCount) {
                            }

                            if (response.data.ResponseCode == -1 && response.data.ResponseMessage != '-1') {
                                $rootScope.$broadcast('sessionTimedOut');
                            }
                            else {
                                //check if ResponseStatus is true
                                if (response.data && !response.data.ResponseStatus) {
                                    //if message is available show message else show default error message
                                    if ((!response.data.ResponseMessage || response.data.ResponseMessage.length === 0) && response.data.ResponseMessage != '-1') {
                                    }
                                    else if (typeof parseJson.getJson(response.data.ResponseMessage) == 'string') {
                                    }
                                }
                            }

                            deferred.resolve(response.data);
                        },

                        function (response) {
                            deferred.reject(response);
                        });
                            return deferred.promise;
                        }


                        this.setPopupTextMsg = function () {
                            var txt = "We're sorry, there's been a technical difficulty that's been reported to the site administrator. ";
                            angular.element('.popupErrorMessage').text(txt);
                        }
                    }

])

.service('apiUrl', ['apiEndPoints',
                function (apiEndPoints) {
                    this.getApiUrl = function (key) {
                        return apiEndPoints[key] ? apiEndPoints[key] : undefined;
                    }
                }
]);
})(angular);