/**
 * Created by hulk on 16-10-25.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.line-detail', {
          url: '/tab.line-detail',
          params: {day: {}},
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/charge-approval-detail/line-detail/line-detail.html',
              controller: 'LineDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('LineDetailCtrl',['$scope',function ($scope) {

  }])
