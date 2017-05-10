'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.feedback', {
          url: '/feedback',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/feedBack.html',
              controller: 'FeedbackCtrl'
            }
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('FeedbackCtrl', [
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
      $scope.placeholderText = "请填写产品问题反馈";
      $scope.qualityIssue = [false, false, false, false];//反馈问题类型样式
      $scope.feedbackInfo = {//反馈信息
        info: ""
      }
      $scope.selectQualityIssue = function (num) {//选择反馈问题类型
        if (num == 0) {
          $scope.placeholderText = "请填写产品质量问题反馈";
        } else if (num == 1) {
          $scope.placeholderText = "请填写产品服务问题反馈";
        } else if (num == 2) {
          $scope.placeholderText = "请填写产品优化问题反馈";
        } else if (num == 3) {
          $scope.placeholderText = "请填写产品其他问题反馈";
        }
        angular.forEach($scope.qualityIssue, function (data, index, array) {
          array[index] = false;
        });
        $scope.qualityIssue[num] = true;
      }
      $scope.goBack = function () {//返回按钮
        $ionicHistory.goBack();
      }

      $scope.commit = function () {//提交反馈
        var i = 0;
        angular.forEach($scope.qualityIssue, function (data, index, array) {
          if (array[index] == false) {
            i++;
          }
        });
        if (i == $scope.qualityIssue.length) {
          hmsPopup.showShortCenterToast('请选择反馈问题类型');
        } else if ($scope.feedbackInfo.info == "") {
          hmsPopup.showShortCenterToast('请填写产品质量问题反馈');
        } else if ((i < $scope.qualityIssue.length) && ($scope.feedbackInfo.info != "")) {
          var url = baseConfig.baseUrl + "appApi/opinionFeedBack";
          var param = {
            "username": window.localStorage.empno,
            "opiniontype": "",
            "opinioncontent": $scope.feedbackInfo.info
          };
          if ($scope.qualityIssue[0] == true) {
            param.opiniontype = "质量问题";
          } else if ($scope.qualityIssue[1] == true) {
            param.opiniontype = "服务问题";
          } else if ($scope.qualityIssue[2] == true) {
            param.opiniontype = "优化问题";
          } else if ($scope.qualityIssue[3] == true) {
            param.opiniontype = "其他问题";
          }
          hmsPopup.showLoading('请稍候');
          hmsHttp.post(url, param).then(function (result) {
            if (baseConfig.debug) {
              console.log("result success " + angular.toJson(result));
            }
            hmsPopup.hideLoading();
            if (result.status == "S") {
              hmsPopup.showVeryShortCenterToast("您的意见已反馈成功");
              $ionicHistory.goBack();
            } else {
              var message = result.errorMsg;
              hmsPopup.showVeryShortCenterToast(message);
            }
          }, function(response){
              hmsPopup.hideLoading();
              //hmsPopup.showShortCenterToast("网络连接出错");
              if (baseConfig.debug) {
                console.log("response error " + angular.toJson(response));
              }
          });
          //  .error(function (error, status) {
          //  hmsPopup.hideLoading();
          //  //hmsPopup.showShortCenterToast("网络连接出错");
          //  if (baseConfig.debug) {
          //    console.log("response error " + angular.toJson(error));
          //  }
          //})
        }
      };
      $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
      });
    }]);
