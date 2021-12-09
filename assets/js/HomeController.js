angular.module('42RaceMini', []).controller('HomeController', function ($scope, $http) {
  $scope.accountInfo = null;

  angular.element(document).ready(function () {
    $scope.getAccountInfo();
  });

  $scope.getAccountInfo = function () {
    $http({
      method: 'GET',
      url: '/account/info'
    }).then(function (res) {
      $scope.accountInfo = res.data;
    });
  }

  $scope.getAthleteURL = function () {
    if (!$scope.accountInfo) return '';
    return 'https://strava.com/athletes/' + $scope.accountInfo.athleteId;
  }
});