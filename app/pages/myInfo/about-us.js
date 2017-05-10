/**
 * Created by utopia_song on 17/1/12.
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.about-us', {
          url: '/about-us',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/about-us.html',
              controller: 'AboutUsCtrl'
            }
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('AboutUsCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$ionicTabsDelegate',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $ionicTabsDelegate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
      });
      $scope.scanPic = baseConfig.scanPic;
    }]);
