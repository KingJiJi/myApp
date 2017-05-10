/**
 * Created by utopia_song on 16/11/21.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.change-info', {
          url: '/change-info',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/change-info.html',
              controller: 'ChangeInfoCtrl'
            }
          },
          params: {
            infoParam: ''
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('ChangeInfoCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    '$http',
    'hmsPopup',
    '$stateParams',
    '$timeout',
    '$rootScope',
    'sweet',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              $http,
              hmsPopup,
              $stateParams,
              $timeout,
              $rootScope,
              sweet) {
      $scope.title = '';
      $scope.showClearIconFlag = false;
      $scope.changeInfo = {
        'changePhone': '',
        'changePwd': '',
        'changeAddress': ''
      };

      if ($stateParams.infoParam == 'phoneNumber') {
        $scope.title = '手机';
        $scope.titleFlag = 'phone';
      // } else if ($stateParams.infoParam == 'station') {
      } else if ($stateParams.infoParam == 'password') {
        // $scope.title = '工位';
        $scope.title = '密码';
        $scope.titleFlag = 'password';
      } else {
        $scope.title = '地址';
        $scope.titleFlag = 'address';
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.showClearIcon = function () {
        // if($scope.changeInfo.changeValue !== ''){
        //   $scope.showClearIconFlag = true;
        // }else{
        //   $scope.showClearIconFlag = false;
        // }
        ($scope.changeInfo.changeValue == '') ? $scope.showClearIconFlag = false : $scope.showClearIconFlag = true;
      };
      $scope.clearInput = function () {
        $scope.changeInfo.changeValue = '';
        $scope.showClearIconFlag = false;
      };
      $scope.$on('$ionicView.enter', function () {
        $('.input').focus();
      });
      $scope.submitChangeInfo = function () {
        /*
          change by wl
         */
        // var url = baseConfig.sapUrl + 'Zhrwf10_006';
        var url = 'http://localhost:8080/api/employee/update/myself';
        var param = {
          // "ZHRWF10_006": {
          "ZHRWF10_006": {
            // "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_USRID": window.localStorage.empno.toUpperCase(),
            // "I_ZCZDZ": $scope.changeInfo.changeAddress,
            "I_MADDR": $scope.changeInfo.changeAddress,
            // "I_ZGW": $scope.changeInfo.changeStation,
            "I_MPWD": $scope.changeInfo.changePwd,
            // "I_ZMPHONE": $scope.changeInfo.changePhone
            "I_MPHONE": $scope.changeInfo.changePhone
          }
        };
        hmsPopup.showLoading('正在提交');
        console.log("params值："+angular.toJson(param));
        // hmsHttp.post(url,param).then(function (response) {
        $http.post(url,param).then(function (response) {
          var response =response.data;
          hmsPopup.hideLoading();
          console.log("response值："+angular.toJson(response));
          console.log("response.O_TYPE值："+response.O_TYPE);
          if(response.O_TYPE == 'S'){
           $timeout(function () {
             hmsPopup.showPopup('修改成功');
           },200);
            $rootScope.$broadcast('REFRESH_INFO');
            $ionicHistory.goBack();
          }else{
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
          }
          console.info('change return :'+angular.toJson(response,true));
        },function(response){
          hmsPopup.showShortCenterToast('提交失败');
        })
      }
    }]);
