angular.module('42RaceMini', []).controller('HomeController', function ($scope, $http) {
  $scope.accountInfo = null;
  $scope.activities = [];

  angular.element(document).ready(function () {
    $scope.getAccountInfo();
  });

  $scope.getAccountInfo = function () {
    $http({
      method: 'GET',
      url: '/account/info'
    }).then(function (res) {
      $scope.accountInfo = res.data;
      $scope.getListActivities();
    });
  }

  $scope.getListActivities = function () {
    $http({
      method: 'GET',
      url: '/activity/get-by-account'
    }).then(function (res) {
      console.log('getListActivities: ', res);
      $scope.activities = res.data;
    });
  }

  $scope.getAthleteURL = function () {
    if (!$scope.accountInfo) return '';
    return 'https://strava.com/athletes/' + $scope.accountInfo.athleteId;
  }
});