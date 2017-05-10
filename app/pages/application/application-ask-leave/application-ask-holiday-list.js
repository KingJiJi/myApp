/**
 * Created by utopia_song on 16/11/3.
 */

angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.application-ask-holiday', {
          url: '/application-ask-holiday',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/application-ask-holiday-list.html',
              controller: 'applicationAskHolidayListCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('applicationAskHolidayListCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    'hmsHttp',
    '$cordovaDialogs',
    '$timeout',
    '$ionicScrollDelegate',
    '$rootScope',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService,
              hmsHttp,
              $cordovaDialogs,
              $timeout,
              $ionicScrollDelegate,
              $rootScope) {

      var nowPage = '0';
      var pageSize = '10';
      var holidayRequestUrl = baseConfig.sapUrl + 'Zhrwf20_010';
      var holidayInfoUrl = baseConfig.sapUrl+'Zhrwf20_002';
      var holidayInfoParam  = {
        "ZHRWF20_002":{
          "ET_ZHR_YE":{
            "item":{
              "PERNR":"",
              "ZANZHL1":"",
              "ZANZHL2":"",
              "ZANZHL3":"",
              "ZANZHL4":""
            }
          },
          "I_PERNR":"",
          "I_USRID":window.localStorage.empno.toUpperCase(),
          "I_YEAR":new Date().getFullYear().toString()
        }
      };
      $scope.newInfo = {};
      $scope.requestHolidayList = [];
      $scope.loadMoreDataFlag = false;
      $scope.holidayInfo = {};
      function getRequestHolidayList() {
        var holidayRequestParam = {
          "ZHRWF20_010": {
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
            "I_BEGDA": "1800-01-01",
            "I_ENDDA": "9999-12-31",
            "I_NUM": pageSize,
            "I_PAGE": nowPage,
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZXJBJ": "A"
          }
        };

        hmsPopup.showLoading("请稍后");
        hmsHttp.post(holidayRequestUrl, holidayRequestParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假列表');
          console.info(angular.toJson(response,true));
          if(response.R_TYPE == 'E'){
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
            // hmsPopup.showShortCenterToast(response.R_MESSAGE);
          }
          else if (response.ET_ZHRWF_020.item instanceof Array) { //返回的item是数组代表有数据
            var list = response.ET_ZHRWF_020.item;
            var len = list.length;
            angular.forEach(list,function (item,index) {
              var temp_1 = {
                'REL_NUMBER':item.REL_NUMBER,
                'AWART':item.AWART,
                'ABWTG':item.ABWTG,
                'REL_STATUS':item.REL_STATUS,
                'CREATE_TIME': item.CREATE_TIME,
                'BEGDA': item.BEGDA,
                'CREATE_DATE':item.CREATE_DATE
              };
              $scope.requestHolidayList.push(temp_1);
            });
            $scope.loadMoreDataFlag = true;
            if (len < pageSize) {
              $scope.loadMoreDataFlag = false;
            }
          } else {
            if (response.ET_ZHRWF_020 == '') { //没有数据的情况
              $scope.loadMoreDataFlag = false;
              if (nowPage == 0) {//如果第一页数据为空的话提示无数据
                $scope.noApprovalFlag = true;
              }
            } else { //一条数据的情况
              var temp = {
                'REL_NUMBER': response.ET_ZHRWF_020.item.REL_NUMBER,//单据号
                'ABWTG': response.ET_ZHRWF_020.item.ABWTG,//请假天数
                'AWART':response.ET_ZHRWF_020.item.AWART,//请假类型
                'BEGDA': response.ET_ZHRWF_020.item.BEGDA,//开始时间年月日
                'CREATE_DATE':response.ET_ZHRWF_020.item.CREATE_DATE,
                'CREATE_TIME': response.ET_ZHRWF_020.item.CREATE_TIME, //时分秒
                'REL_STATUS': response.ET_ZHRWF_020.item.REL_STATUS //当前审批状态
              };
              $scope.requestHolidayList.push(temp);
              $scope.loadMoreDataFlag = false;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        },function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取休假列表失败,请退出页面重试获取或联系管理员!');
        })
      }
      $scope.loadMoreData = function () {//上拉加载
          nowPage++;
          getRequestHolidayList();
        console.log('load');
      };

      $scope.refresh = function () {//下拉刷新
        nowPage = 0;
        $scope.requestHolidayList = [];
        getRequestHolidayList();
        getHolidayInfo();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      getRequestHolidayList();
      getHolidayInfo();
      function getHolidayInfo() {  //获取假期信息
        hmsPopup.showLoading("正在加载假期信息");
        hmsHttp.post(holidayInfoUrl,holidayInfoParam).then(function (response) {
          hmsPopup.hideLoading();
          $scope.holidayInfo.lastYearDays = response.ET_ZHR_YE.item.ZANZHL1 == ''? '0': response.ET_ZHR_YE.item.ZANZHL1;//上年年假结余
          $scope.holidayInfo.thisYearDays = response.ET_ZHR_YE.item.ZANZHL2 == ''? '0': response.ET_ZHR_YE.item.ZANZHL2;//本年年假结余
          $scope.holidayInfo.usedPaidSickLeave = response.ET_ZHR_YE.item.ZANZHL3 == ''? '0': response.ET_ZHR_YE.item.ZANZHL3;//带薪病假
          $scope.holidayInfo.compensatedLeave = response.ET_ZHR_YE.item.ZANZHL4 == ''? '0': response.ET_ZHR_YE.item.ZANZHL4;//调休假
          $scope.holidayInfo.totalYearDays = $scope.holidayInfo.lastYearDays + $scope.holidayInfo.thisYearDays;
          //为新建的申请单存字段值
          $scope.newInfo = {
            'ZANZHL1':$scope.holidayInfo.lastYearDays.replace(/\s/g,''),
            'ZANZHL2':$scope.holidayInfo.thisYearDays.replace(/\s/g,''),
            'ZANZHL3':$scope.holidayInfo.usedPaidSickLeave.replace(/\s/g,''),
            'ZANZHL4':$scope.holidayInfo.compensatedLeave.replace(/\s/g,'')
          };
          console.log('holiday info = '+angular.toJson(response));
        },function (response) {
          hmsPopup.showShortCenterToast('获取假期信息失败');
        });
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.newHoliday = function () {
        $state.go('tab.new-application-holiday',{newInfo:$scope.newInfo,holidayList:$scope.requestHolidayList});
      };
      $scope.toHolidayDetail = function (receiptNum) {
        $state.go('tab.application-holiday-detail',{receiptNum:receiptNum});
      };
      $rootScope.$on('HOLIDAY_REFRESH',function () {
        nowPage = 0;
        $scope.requestHolidayList = [];
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getRequestHolidayList();
        getHolidayInfo();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('holidayListHandle').scrollTop(false);
        },200);
      })

    }]);
