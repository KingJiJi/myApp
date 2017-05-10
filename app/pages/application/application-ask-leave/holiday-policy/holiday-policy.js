/**
 * Created by utopia_song on 16/11/8.
 */
/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-policy', {
          url: '/holiday-policy',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-policy/holiday-policy.html',
              controller: 'holidayPolicyCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayPolicyCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              hmsHttp
              ) {

      var policyTypeUrl  = baseConfig.baseUrl  + 'appApi/getPolicyInfo';
      var policyTypeParam = {
        "lookuptype": "UCAR_COMPANY_POLICY",
        "lookupCode": ""
      };
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.holidayTypeList = [
        {
          'name':'事假',
          'src':'build/img/application/holiday-type/1.png',
          'code':'1020'
        },
        {
          'name':'病假',
          'src':'build/img/application/holiday-type/2.png',
          'code':'1010'
        },
        {
          'name':'婚假',
          'src':'build/img/application/holiday-type/3.png',
          'code':'1030'
        },
        {
          'name':'调休',
          'src':'build/img/application/holiday-type/4.png',
          'code':'1080'
        },
        {
          'name':'年假',
          'src':'build/img/application/holiday-type/5.png',
          'code':'1000'
        },
        {
          'name':'产假',
          'src':'build/img/application/holiday-type/7.png',
          'code':'1050'
        },
        {
          'name':'哺乳假',
          'src':'build/img/application/holiday-type/6.png',
          'code':'1060'
        },
        {
          'name':'丧假',
          'src':'build/img/application/holiday-type/10.png',
          'code':'1040'
        },
        {
          'name':'其他',
          'src':'build/img/application/holiday-type/9.png',
          'code':'1099'
        }

      ];
      // function getHolidayType(){
      //   hmsHttp.post(policyTypeUrl,policyTypeParam).then(function (response) {
      //     var typeArr = response.date;
      //     angular.forEach(typeArr,function (item,index) {
      //       var temp  = {
      //         'name':item.lookupCodeName,
      //         'code':item.lookupCode
      //       };
      //       $scope.holidayTypeList.push(temp);
      //     })
      //   },function (response) {
      //     hmsPopup.showShortCenterToast('获取政策失败');
      //   })
      // }
      // getHolidayType();
      $scope.toPolicyDetail = function (policyCode) {
        console.log('policyCode = '+policyCode);
        $state.go('tab.holiday-policy-detail',{policyCode:policyCode});
      }
    }]);
