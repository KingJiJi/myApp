/**
 * Created by utopia_song on 16/11/9.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-policy-detail', {
          url: '/holiday-policy-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-policy/holiday-policy-detail.html',
              controller: 'holidayPolicyDetailCtrl'
            }
          },
          params:{
            policyCode:'',
            typeFlag:''
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayPolicyDetailCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    '$stateParams',
    'hmsHttp',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              $stateParams,
              hmsHttp,
              $compileProvider
    ) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.policyCode = $stateParams.policyCode;
      var policyDetailUrl  = baseConfig.baseUrl  + 'appApi/getPolicyInfo';
      var policyDetailParam = {
        "lookuptype": "UCAR_COMPANY_POLICY",
        "lookupCode": $stateParams.policyCode || $stateParams.typeFlag
      };
      console.log('$stateParams.policyCode = '+$stateParams.policyCode);
      function getPolicyDetail(){
        hmsHttp.post(policyDetailUrl,policyDetailParam).then(function (response) {
          console.log("holiday-policy-detail = "+angular.toJson(response));
          var policyDesc = response.date[0].lookupCodeDesc;
          console.log('policyDesc = '+policyDesc);
          $scope.html = policyDesc;
        },function(response){
          hmsPopup.showShortCenterToast('获取政策详情失败');
        })
      }
      getPolicyDetail();


    }]);
