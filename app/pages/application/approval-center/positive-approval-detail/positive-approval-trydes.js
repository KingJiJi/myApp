/**
 * Created by utopia_song on 17/1/8.
 */

angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.positive-approval-tryDes', {
          url: '/tab.positive-approval-tryDes',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/positive-approval-detail/positive-approval-tryDes.html',
              controller: 'positiveApprovalTryDesCtrl'
            }
          },
          params:{
            tryDes:''
          }
        });
    }]);
angular.module('applicationModule')
  .controller('positiveApprovalTryDesCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$timeout',
    '$stateParams',
    '$ionicHistory',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $timeout,
              $stateParams,
              $ionicHistory) {

        $scope.goBack = function () {
          $ionicHistory.goBack();
        };
      $scope.positiveTryDes = {};
      $scope.positiveTryDes.tryDes = $stateParams.tryDes;
      console.log('tryDes = '+$stateParams.tryDes);
    }]);
