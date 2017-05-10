/**
 * Created by xuchengcheng on 2016/11/8.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.apply-center-manage', {
          url: '/apply-center-manage',
          params: {
            "flag": ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-manage/apply-center-manage/apply-center-manage.html',
              controller: 'applyCenterManageCtrl'
            }
          }
        })
    }]);

angular.module('applicationModule')
  .controller('applyCenterManageCtrl', [
    '$scope',
    '$state',
    "$stateParams",
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    'baseConfig',
    '$ionicPopover',
    '$ionicTabsDelegate',
    '$timeout',
    function ($scope,
              $state,
              $stateParams,
              $ionicHistory,
              hmsPopup,
              hmsHttp,
              baseConfig,
              $ionicPopover,
              $ionicTabsDelegate,
              $timeout) {
      hmsPopup.showLoading('加载中...');
      $scope.title = "";
      $scope.payroll = {
        "password": ""
      };
      if($stateParams.flag == 'personnel-application') {
        $scope.title = "人事申请";
      } else if($stateParams.flag == 'financial-application') {
        $scope.title = "财务申请";
      } else if($stateParams.flag == 'total-office') {
        $scope.title = "综合办公";
      }
      var url = baseConfig.baseUrl + 'appApi/getAppFuncList';
      var params = {
        "rlcode": window.localStorage.rlCode,
        "parent_func_option": $stateParams.flag
      };
      hmsHttp.post(url, params).then(function (result) {//拉取申请中心功能列表
        hmsPopup.hideLoading();
        if (result.status == 'S') {
          $scope.applyCenterList = result.data;
          console.log("功能列表", angular.toJson($scope.applyCenterList));
        } else {
          hmsPopup.showPopup(result.errorMsg);
        }
      }, function (status) {
        hmsPopup.hideLoading();
      });

      $scope.lastLineHide = function(index, itemList) {//去除最后一行的底部边线
        if(index == (itemList.length - 1)){
          return false;
        } else {
          return true;
        }
      };

      $ionicPopover.fromTemplateUrl('build/pages/application/payroll-inquire/view-payroll-popover/view-payroll-popover.html', {//查看工资单密码验证框
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.goToApplication = function(itemInfo, $event) {
        if(itemInfo.functionCode == 'qingjia_applyfor') {//请假申请
          $state.go('tab.application-ask-holiday');
        } else if(itemInfo.functionCode == 'xiaojia_applyfor'){//销假申请
          $state.go('tab.fake-leave-apply-list');
        } else if(itemInfo.functionCode == 'payroll'){//工资单
          //$scope.popover.show($event);
        } else if(itemInfo.functionCode == 'platformEmployed'){//招贤纳士
          $state.go('tab.platform-employed');
        } else if(itemInfo.functionCode == 'certificate-application'){//证明申请
          //$state.go('tab.prove-application-detail');
        } else if(itemInfo.functionCode == 'conference-reservation'){//会议室预定

        } else if(itemInfo.functionCode == 'asset-purchase'){//行政资产采购

        } else if(itemInfo.functionCode == 'visitor-management'){//访客管理

        }
      };

      $scope.viewPayroll = function () {//校验查看工资单密码
        if (!$scope.payroll.password || $scope.payroll.password == '') {
          // hmsPopup.showPopup('请输入登录密码查询');
          return;
        }
        var url = baseConfig.baseUrl + 'loginPortApi/loginPostPort';
        var params = {
          "username": window.localStorage.empno,
          "password": $scope.payroll.password
        };
        hmsHttp.post(url, params).then(function (result) {
          if (result.status == 'S') {
            $scope.payroll.password = "";
            $scope.popover.hide();
            $ionicTabsDelegate.showBar(false);
            $state.go('tab.payroll-inquire-list');
          } else {
            hmsPopup.showPopup("请确认密码是否正确");
          }
        }, function (status) {
          hmsPopup.hideLoading();
          if (status && status == '401') {
            hmsPopup.showPopup('请确认密码是否正确!');
          } else {
            hmsPopup.showPopup('请确认网络连接是否正常,或者联系管理员');
          }
        });
      };
      $scope.clearPassword = function(){
        var ele =  document.querySelector('#payrollPsw');
        var e = angular.element(ele);
        e[0].focus();
        $timeout(function () {
          e[0].focus();
        });
        $scope.payroll.password = "";
      };
      $scope.cancelPayroll = function(){
        $scope.payroll.password = "";
        $scope.popover.hide();
      };

    }]);
