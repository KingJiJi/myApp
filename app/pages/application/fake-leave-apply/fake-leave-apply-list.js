/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-apply-list', {
          url: '/tab.fake-leave-apply-list',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-apply-list.html',
              controller: 'FakeLeaveApplyListCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('FakeLeaveApplyListCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$timeout',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $timeout) {

      var holidayInfoUrl = baseConfig.sapUrl + 'Zhrwf20_002';
      var holidayInfoParam = {//请求拉取假期结余信息参数
        "ZHRWF20_002": {
          "ET_ZHR_YE": {
            "item": {
              "PERNR": "",
              "ZANZHL1": "",
              "ZANZHL2": "",
              "ZANZHL3": "",
              "ZANZHL4": ""
            }
          },
          "I_PERNR": "",
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_YEAR": new Date().getFullYear()
        }
      };

      var nowPage = '0';
      var pageSize = '10';
      $scope.holidayInfo = {};
      $scope.noApprovalFlag = false;
      $scope.fakeLeaveApplyList = [];
      $scope.loadMoreDataFlag = false;
      getHolidayInfo();
      getFakeLeaveApplyList();
      $scope.loadMoreData = function () {//上拉加载
        nowPage++;
        getFakeLeaveApplyList();
        console.log('load');
      };
      $scope.refresh = function () {//下拉刷新
        $scope.noApprovalFlag = false;
        $scope.fakeLeaveApplyList = [];
        nowPage = 0;
        getFakeLeaveApplyList();
        getHolidayInfo();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };

      function getHolidayInfo() {  //获取假期信息
        hmsHttp.post(holidayInfoUrl, holidayInfoParam).then(function (response) {
          $scope.holidayInfo.lastYearDays = response.ET_ZHR_YE.item.ZANZHL1 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL1;//上年年假结余
          $scope.holidayInfo.thisYearDays = response.ET_ZHR_YE.item.ZANZHL2 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL2;//本年年假结余
          $scope.holidayInfo.usedPaidSickLeave = response.ET_ZHR_YE.item.ZANZHL3 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL3;//带薪病假
          $scope.holidayInfo.compensatedLeave = response.ET_ZHR_YE.item.ZANZHL4 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL4;//调休假
        }, function (response) {
          hmsPopup.showShortCenterToast('获取假期信息失败');
        });
      }

      function getFakeLeaveApplyList() {//获取销假列表信息
        var fakeLeaveApplyUrl = baseConfig.sapUrl + 'Zhrwf21_004';
        var fakeLeaveApplyParam = {
          "ZHRWF21_004": {
            "ET_ZHRWF_021": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "REL_NUMBER20": "",
                "PERNR": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "AWART": "",
                "REL_STATUS": "",
                "BEGDA": "",
                "ZBEGAP": "",
                "ENDDA": "",
                "ZENDAP": "",
                "ABWTG": "",
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY": "",
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              }
            },
            "I_NUM": pageSize,
            "I_PAGE": nowPage,
            "I_USRID": window.localStorage.empno.toUpperCase()
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(fakeLeaveApplyUrl, fakeLeaveApplyParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假列表');
          console.info(angular.toJson(response,true));
          if (response.R_TYPE == 'E') {
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
            //hmsPopup.showShortCenterToast(response.R_MESSAGE);
          } else {
            if(response.ET_ZHRWF_021 == '') {
              $scope.noApprovalFlag = true;
              $scope.loadMoreDataFlag = false;
            } else {
              if (response.ET_ZHRWF_021.item.constructor == Array) { //返回的item是数组代表有数据
                var len = response.ET_ZHRWF_021.item.length;
                angular.forEach(response.ET_ZHRWF_021.item, function (item, index) {
                  var temp = {
                    'REL_NUMBER': item.REL_NUMBER,//单据号
                    'ABWTG': item.ABWTG,//请假天数
                    'AWART': item.AWART,//请假类型
                    'CREATE_DATE': item.CREATE_DATE,//年月日
                    'CREATE_TIME': item.CREATE_TIME, //时分秒
                    'REL_STATUS': item.REL_STATUS //当前审批状态
                  };
                  $scope.fakeLeaveApplyList.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (len < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              } else {
                var temp = {
                  'REL_NUMBER': response.ET_ZHRWF_021.item.REL_NUMBER,//单据号
                  'ABWTG': response.ET_ZHRWF_021.item.ABWTG,//请假天数
                  'AWART': response.ET_ZHRWF_021.item.AWART,//请假类型
                  'CREATE_DATE': response.ET_ZHRWF_021.item.CREATE_DATE,//开始时间年月日
                  'CREATE_TIME': response.ET_ZHRWF_021.item.CREATE_TIME, //时分秒
                  'REL_STATUS': response.ET_ZHRWF_021.item.REL_STATUS //当前审批状态
                };
                $scope.fakeLeaveApplyList.push(temp);
                $scope.loadMoreDataFlag = false;
              }
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取数据失败,请退出页面重试获取或联系管理员!');
        })
      }

      $rootScope.$on('FAKELEASE_REFRESH', function() {
        nowPage = 0;
        $scope.fakeLeaveApplyList = [];
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getHolidayInfo();
        getFakeLeaveApplyList();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('fakeLeaveApplyHandle').scrollTop(false);
        },200);
      });

      $scope.goToDetail = function (relNumber) {
        $state.go('tab.fake-leave-apply-detail', {relNumber: relNumber});
      };

      $scope.addFakeLeave = function () {
        $state.go('tab.fake-leave-select');
      };

    }]);
