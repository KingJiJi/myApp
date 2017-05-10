/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-select', {
          url: '/tab.fake-leave-select',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-select.html',
              controller: 'FakeLeaveSelectCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('FakeLeaveSelectCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate) {
      var nowPage = '0';
      var pageSize = '10';
      $scope.noApprovalFlag = false;
      $scope.requestHolidayList = [];
      $scope.loadMoreDataFlag = false;
      getRequestHolidayList();
      $scope.loadMoreData = function () {//上拉加载
        nowPage++;
        getRequestHolidayList();
        console.log('load');
      };
      $scope.refresh = function () {//下拉刷新
        $scope.noApprovalFlag = false;
        $scope.requestHolidayList = [];
        nowPage = 0;
        getRequestHolidayList();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      function getRequestHolidayList() {
        var holidayRequestUrl = baseConfig.sapUrl + 'Zhrwf21_001';
        var holidayRequestParam = {
          "ZHRWF21_001": {
            "ET_ZHRWF_020": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
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
                "ZRZRQ": "",
                "AWART": "",
                "ZANZHL1": "",
                "ZANZHL2": "",
                "ZANZHL3": "",
                "ZANZHL4": "",
                "ZXJBJ": "",
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
            "I_BEGDA": '',
            "I_ENDDA": '',
            "I_USRID": window.localStorage.empno.toUpperCase()
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(holidayRequestUrl, holidayRequestParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假列表');
          console.info(angular.toJson(response, true));
          if (response.R_TYPE == 'E') {
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
            //hmsPopup.showShortCenterToast(response.R_MESSAGE);
          } else {
            if(response.ET_ZHRWF_020 == '') {//无数据
              $scope.noApprovalFlag = true;
              $scope.loadMoreDataFlag = false;
            } else {
              if (response.ET_ZHRWF_020.item.constructor == Array) { //返回的item是数组代表有数据
                var len = response.ET_ZHRWF_020.item.length;
                angular.forEach(response.ET_ZHRWF_020.item, function (item, index) {
                  var temp = {
                    'REL_NUMBER': item.REL_NUMBER,//单据号
                    'ABWTG': item.ABWTG,//请假天数
                    'AWART': item.AWART,//请假类型
                    'BEGDA': item.BEGDA,//操作日期
                    'NOW_REL_DATE': item.NOW_REL_DATE,//操作日期
                    'ENDDA': item.ENDDA, //结束时间年月日
                    'BEGTIME': item.ZBEGAP, //开始时间上午/下午标识（AM/PM）
                    'ENDTIME': item.ZENDAP, //结束时间上午/下午标识（AM/PM）
                    'CREATE_TIME': item.NOW_REL_TIME, //时分秒
                    'REL_STATUS': item.REL_STATUS, //当前审批状态
                    'REMARK': item.ZJTSY //请假具体事由
                  };
                  $scope.requestHolidayList.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (len < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              } else {//一条数据的情况
                var temp = {
                  'REL_NUMBER': response.ET_ZHRWF_020.item.REL_NUMBER,//单据号
                  'ABWTG': response.ET_ZHRWF_020.item.ABWTG,//请假天数
                  'AWART': response.ET_ZHRWF_020.item.AWART,//请假类型
                  'BEGDA': response.ET_ZHRWF_020.item.BEGDA,//操作日期
                  'NOW_REL_DATE': response.ET_ZHRWF_020.item.NOW_REL_DATE,//操作日期
                  'ENDDA': response.ET_ZHRWF_020.item.ENDDA, //结束时间年月日
                  'BEGTIME': response.ET_ZHRWF_020.item.ZBEGAP, //开始时间上午/下午标识（AM/PM）
                  'ENDTIME': response.ET_ZHRWF_020.item.ZENDAP, //结束时间上午/下午标识（AM/PM）
                  'CREATE_TIME': response.ET_ZHRWF_020.item.NOW_REL_TIME, //时分秒
                  'REL_STATUS': response.ET_ZHRWF_020.item.REL_STATUS, //当前审批状态
                  'REMARK': response.ET_ZHRWF_020.item.ZJTSY //请假具体事由
                };
                $scope.requestHolidayList.push(temp);
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

      $scope.goToAddFake = function (param) {
        $state.go('tab.fake-leave-apply-add', {holidayInfo: param});
      };

    }]);
