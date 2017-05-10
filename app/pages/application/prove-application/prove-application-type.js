/**
 * Created by xuchengcheng on 2017/3/7.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.prove-application-type', {
          url: '/prove-application-type',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/prove-application/prove-application-type.html',
              controller: 'proveApplicationTypeCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('proveApplicationTypeCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    '$rootScope',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              $rootScope) {
      $scope.proveTypeList = [
        {
          'name':'在职证明',
          'src':'build/img/application/holiday-type/1.png',
          'code':'01'
        },
        {
          'name':'收入证明',
          'src':'build/img/application/holiday-type/2.png',
          'code':'03'
        }
      ];

      $scope.chooseProveType = function (item) {
        $rootScope.$broadcast('CHOOSE_PROVE_TYPE',item);
        $ionicHistory.goBack();
      };

      $scope.lastLineHide = function(index, itemList) {//去除最后一行的底部边线
        if(index == (itemList.length - 1)){
          return false;
        } else {
          return true;
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);
