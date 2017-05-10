/**
 * Created by xuchengcheng on 2017/3/7.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.prove-application-detail', {
          url: '/prove-application-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/prove-application/prove-application-detail.html',
              controller: 'proveApplicationDetailCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('proveApplicationDetailCtrl', [
    '$scope',
    '$rootScope',
    'baseConfig',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    '$timeout',
    function ($scope,
              $rootScope,
              baseConfig,
              $state,
              $stateParams,
              $ionicHistory,
              hmsPopup,
              hmsHttp,
              $timeout) {
      $scope.proveApplication = {
        "reason": ""
      };
      $scope.chooseTypeFlag = false;
      $scope.typeValue = "";
      $scope.proveType = "";

      $rootScope.$on('CHOOSE_PROVE_TYPE', function(event,data) {
        $scope.chooseTypeFlag = true;
        $scope.typeValue = data.name;
        $scope.proveType = data.code;
      });

      $scope.chooseProveType = function() {
        $state.go('tab.prove-application-type');
      };

      $scope.proveCommit = function () {
        if($scope.proveType === ''){
          hmsPopup.showShortCenterToast("请选择证明类型");
        } else {
          var url = baseConfig.sapUrl + 'Zhrwf08_001';
          var param = {
            "ZHRWF08_001": {
              "ET_PROOF": {
                "item": {
                  "MANDT": "",
                  "ZPERNR": "",
                  "ZTYPE": "",
                  "WF_TYPE": "",
                  "REL_NUMBER": "",
                  "ZPTX": "",
                  "ZNAME": "",
                  "ZBIRTH": "",
                  "GESCH": "",
                  "ICNUM_TYPE": "",
                  "ZIDNUM": "",
                  "ZEDATE": "",
                  "ZENDATE": "",
                  "ZRDATE": "",
                  "CREATE_DATE": "",
                  "PERSA": "",
                  "NAME1": "",
                  "ORGEH": "",
                  "ORGTX": "",
                  "ZQYDWWB": "",
                  "PLANS": "",
                  "PLSTX": "",
                  "MINCOME": "",
                  "YINCOME": "",
                  "RTE_CURR": "",
                  "STATUS": "",
                  "REASON": $scope.proveApplication.reason,
                  "NEXT_REL_STEP": "",
                  "NEXT_REL_ID": "",
                  "NEXT_REL_ENAME": "",
                  "NEXT_REL_PLANS": "",
                  "NEXT_REL_PLSTX": "",
                  "RESIGN_STATUS": ""
                }
              },
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "Z_FIELD": "SAVE",
              "Z_TYPE": $scope.proveType
            }
          };
          hmsPopup.showLoading('请稍候');
          hmsHttp.post(url, param).then(function (result) {
            if (baseConfig.debug) {
              console.log("result success " + angular.toJson(result));
            }
            hmsPopup.hideLoading();
            if (result.O_TYPE == "S") {
              $timeout(function () {
                hmsPopup.showShortCenterToast('提交成功');
              }, 200);
              $ionicHistory.goBack();
            } else {
              var message = result.O_MESSAGE;
              hmsPopup.showVeryShortCenterToast(message);
            }
          }, function (response) {
            hmsPopup.hideLoading();
            if (baseConfig.debug) {
              console.log("response error " + angular.toJson(response));
            }
          });
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);
