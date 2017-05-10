/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-apply-add', {
          url: '/tab.fake-leave-apply-add',
          params: {
            holidayInfo: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-apply-add.html',
              controller: 'FakeLeaveApplyAddCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('FakeLeaveApplyAddCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$cordovaDatePicker',
    '$filter',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$timeout',
    '$ionicHistory',
    'sweet',
    function ($scope,
              $state,
              $stateParams,
              $cordovaDatePicker,
              $filter,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $timeout,
              $ionicHistory,
              sweet) {
      $scope.holidayinfo = $stateParams.holidayInfo;//获取用于销假的请假信息
      console.info(angular.toJson($scope.holidayinfo, true));

      $scope.fakeLeaveAddDays = [];
      $scope.fakeLeaveAllDate = 0;
      $scope.noChooseDate = false;
      $scope.clickStatus = false;//解决插件请求过慢多次点击的问题
      $scope.endClickStatus = false;
      $scope.reasonInfo = {};
      $scope.showScrolls = true;
      $scope.hideScroll  = function(){
        $scope.showScrolls = false;
      };
      $scope.showScroll = function(){
        $scope.showScrolls = true;
      };
      $scope.addPeriod = function () {//添加销假时间段
        if ($scope.fakeLeaveAddDays.length != 0 && $scope.fakeLeaveAddDays[$scope.fakeLeaveAddDays.length - 1].fakeLeaveSectionDays == '') {
          hmsPopup.showShortCenterToast('请添加销假时间');
        } else {
          var param = {
            "fakeLeaveSectionStart": "",
            "fakeLeaveSectionEnd": "",
            "fakeLeaveSectionStartTime": "",
            "fakeLeaveSectionEndTime": "",
            "fakeLeaveSectionDays": "",
            "beginTime": "请选择开始时间",
            "endTime": "请选择结束时间"
          };
          $scope.fakeLeaveAddDays.push(param);
          $ionicScrollDelegate.resize();
        }
        $scope.showScrolls = true;
      };
      function getDateString(date) {//时间格式化
        return $filter('date')(date, 'yyyy-MM-dd');
      }

      function DateChecked(fakeLeaveTime, fakeLeaveInterval, holidayTime) {//校验日期是否在请假日期范围内
        if (holidayTime.BEGTIME == 'PM' && fakeLeaveInterval == 'AM') {
          if ((Date.parse(new Date(fakeLeaveTime.replace(/-/g, "\/")))) == (Date.parse(new Date(holidayTime.BEGDA.replace(/-/g, "\/"))))) {
            return true;
          }
        }
        if (holidayTime.ENDTIME == 'AM' && fakeLeaveInterval == 'PM') {
          if ((Date.parse(new Date(fakeLeaveTime.replace(/-/g, "\/")))) == ((Date.parse(new Date(holidayTime.ENDDA.replace(/-/g, "\/")))))) {
            return true;
          }
        }
        return false;
      }

      function DateChecked1(index, chooseTimes, fakeLeaveInterval, fakeLeaveTimes) {//校验日期是否与其他日期重合
        for (var i = 0; i < fakeLeaveTimes.length; i++) {
          if (i != index) {
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime == 'AM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime == 'AM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/")))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/"))) && fakeLeaveInterval == 'PM') {
                } else {
                  return true;
                  break;
                }
              }
            }
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime == 'AM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime == 'PM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/")))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                return true;
                break;
              }
            }
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime === 'PM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime === 'AM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))) && fakeLeaveInterval == 'AM') {
                } else if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/"))) && fakeLeaveInterval == 'PM') {
                } else {
                  return true;
                  break;
                }

              }
            }
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime == 'PM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime == 'PM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))) && fakeLeaveInterval == 'AM') {
                } else {
                  return true;
                  break;
                }
              }
            }
          }
        }
        return false;
      }


      /**
       *比较时间
       * @param d1
       * @param d2
       * @returns {boolean}
       * @constructor
       */
      function CompareDate(d1, d2) {
        var d1_time = d1.split(' ').splice(0, 1).join('');
        var d2_time = d2.split(' ').splice(0, 1).join('');
        var d1_interval = d1.split(' ').splice(1, 1).join('');
        var d2_interval = d2.split(' ').splice(1, 1).join('');
        console.log('d1_time  = ' + d1_time + 'd1_interval = ' + d1_interval);
        console.log('d2_time  = ' + d2_time + 'd2_interval = ' + d2_interval);
        if (d1_time == d2_time) {
          if (d1_interval == '下午' && d2_interval == '上午') {
            return true;
          }
        } else {
          //将所有的短横线替换为斜杠
          console.log('begin morethan end');
          return ((new Date(d1_time.replace(/-/g, "\/"))) > (new Date(d2_time.replace(/-/g, "\/"))));
        }

      }

      function initEndTime(index) {
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
        $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
      }

      function initBeginTime(index) {
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
        $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
      }

      $scope.chooseBeginTimes = function (index, beginTime) {
        $scope.clickStatus = true;
        console.log("第几条时间段：", index);
        var dic = {
          startDate: $scope.holidayinfo.BEGDA,
          endDate: $scope.holidayinfo.ENDDA,
          startTime: "7:30",
          endTime: "15:00",
          selectedDate: beginTime == '请选择开始时间' ? getDateString(new Date()) + ' 上午' : beginTime,
          title: "选择时间",
          type: "TYPE1"
        };
        //if(beginTime == '请选择开始时间'){
        //  delete dic.selectedDate
        //}
        console.info(angular.toJson(dic, true));
        CDXDatePicker.selectDate(function (date) {
          $scope.clickStatus = false;
          console.log('date = ' + date);
          $scope.fakeLeaveAddDays[index].beginTime = date;
          $scope.$apply();
          $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = date.split(' ').splice(0, 1).join('');
          // if(new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart).getDay() == 6 || new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart).getDay() == 0){
          //   hmsPopup.showShortCenterToast('销假开始时间不能以周末开始');
          //   initBeginTime(index);
          // }
          if (date.split(' ').splice(1, 1).join('') == '上午' || date.split(' ').splice(1, 1).join('') == 'AM'  ) {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = 'AM';
          } else if (date.split(' ').splice(1, 1).join('') == '下午' || date.split(' ').splice(1, 1).join('') == 'PM' ) {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = 'PM';
          }
          console.log('时间' + $scope.fakeLeaveAddDays[index].beginTime);
          if (DateChecked($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart, $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime, $scope.holidayinfo)) {//判断时间是否在请假日期范围内
            hmsPopup.showShortCenterToast('请选择在请假日期范围内的日期');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
            return;
          } else if (DateChecked1(index, $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart, $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime, $scope.fakeLeaveAddDays)) {//判断时间是否与其他时间段重合
            hmsPopup.showShortCenterToast('日期与其他销假日期重合,请重新选择');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
            return;
          } else if ($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd) { //判断是否小于结束日期
            if (CompareDate($scope.fakeLeaveAddDays[index].beginTime, $scope.fakeLeaveAddDays[index].endTime)) {
              hmsPopup.showShortCenterToast('开始日期大于结束日期,请重新选择');
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
              $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
              return;
            } else {
              //请假销假日期计算校验接口
              var dateCheckUrl = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.holidayinfo.AWART,
                  "I_BEGDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart,
                  "I_ENDDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd,
                  "I_ZBEGAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime,
                  "I_ZENDAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime
                }
              };
              hmsPopup.showLoading('请稍后');
              hmsHttp.post(dateCheckUrl, dateCheckParam).then(function (response) {
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = response.O_DAYS;
                  $scope.fakeLeaveAllDate = 0;
                  for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
                    $scope.fakeLeaveAllDate += Number($scope.fakeLeaveAddDays[i].fakeLeaveSectionDays);
                  }
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initBeginTime(index);
                }
              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initBeginTime(index);
              })
            }
          }
        }, function (error) {
          $scope.clickStatus = false;
          console.log('error');
        }, dic);
      };

      $scope.chooseEndDates = function (index, endTime) {//选择结束时间
        $scope.endClickStatus = true;
        console.log("第几条时间段：", index);


        var dic = {
          startDate: $scope.holidayinfo.BEGDA,
          endDate: $scope.holidayinfo.ENDDA,
          startTime: "7:30",
          endTime: "15:00",
          selectedDate: endTime == '请选择结束时间' ? getDateString(new Date()) + ' 上午' : endTime,
          title: "选择时间",
          type: "TYPE1"
        };
        //if(endTime == '请选择结束时间'){
        //  delete dic.selectedDate
        //}
        CDXDatePicker.selectDate(function (date) {
          $scope.endClickStatus = false;
          console.log('date = ' + date);
          $scope.fakeLeaveAddDays[index].endTime = date;
          $scope.$apply();
          $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = date.split(' ').splice(0, 1).join('');
          // if(new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd).getDay() == 6 || new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd).getDay() == 0){
          //   hmsPopup.showShortCenterToast('销假结束时间不能以周末结束');
          //   initEndTime(index);
          // }
          if (date.split(' ').splice(1, 1).join('') == '上午' || date.split(' ').splice(1, 1).join('') == 'AM') {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = 'AM';
          } else if (date.split(' ').splice(1, 1).join('') == '下午' || date.split(' ').splice(1, 1).join('') == 'PM') {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = 'PM';
          }
          console.log('时间' + $scope.fakeLeaveAddDays[index].endTime);
          if (DateChecked($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd, $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime, $scope.holidayinfo)) {//判断时间是否在请假日期范围内
            hmsPopup.showShortCenterToast('请选择在请假日期范围内的日期');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
            return;
          } else if (DateChecked1(index, $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd, $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime, $scope.fakeLeaveAddDays)) {//判断时间是否与其他时间段重合
            hmsPopup.showShortCenterToast('日期与其他销假日期重合,请重新选择');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
            return;
          } else if ($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart) { //判断是否大于开始日期
            if (CompareDate($scope.fakeLeaveAddDays[index].beginTime, $scope.fakeLeaveAddDays[index].endTime)) {
              hmsPopup.showShortCenterToast('结束日期小于开始日期,请重新选择');
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
              $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
              return;
            } else {
              //请假销假日期计算校验接口
              var dateCheckUrl = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.holidayinfo.AWART,
                  "I_BEGDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart,
                  "I_ENDDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd,
                  "I_ZBEGAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime,
                  "I_ZENDAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime
                }
              };
              console.log('dateCheckParam = ' + angular.toJson(dateCheckParam));
              hmsPopup.showLoading('请稍后');
              hmsHttp.post(dateCheckUrl, dateCheckParam).then(function (response) {
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = response.O_DAYS;
                  $scope.fakeLeaveAllDate = 0;
                  for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
                    $scope.fakeLeaveAllDate += Number($scope.fakeLeaveAddDays[i].fakeLeaveSectionDays);
                  }
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initEndTime(index);
                }
              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initEndTime(index);
              })
            }
          }
        }, function (error) {
          $scope.endClickStatus = false;
          console.log('error');
        }, dic);
      };

      $scope.delFakeLeaveDays = function (index) {//删除时间段
        $scope.fakeLeaveAddDays.splice(index, 1);
        $scope.fakeLeaveAllDate = 0;
        for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
          $scope.fakeLeaveAllDate += Number($scope.fakeLeaveAddDays[i].fakeLeaveSectionDays);
        }
      };


      var fakeLeaveCommit = function () {
          var url = baseConfig.sapUrl + 'Zhrwf21_002';
          var param = {
            "ZHRWF21_002": {
              "ET_ZHRWF_021_S": {
                "item": $scope.timeInfoList
              },
              "I_CODE": "SUBMIT",
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZHRWF_021": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "REL_NUMBER20": $scope.holidayinfo.REL_NUMBER,
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
                "ZJTSY":$scope.reasonInfo.reason,
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
            }
          };
          hmsPopup.showLoading('请稍后');
          hmsHttp.post(url, param).then(function (response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function () {
                hmsPopup.showShortCenterToast('新建销假成功');
              }, 200);
              $rootScope.$broadcast('FAKELEASE_REFRESH');
              $ionicHistory.goBack(-2);
            } else {
              hmsPopup.showShortCenterToast(response.O_MESSAGE);
            }
          }, function (response) {
            hmsPopup.hideLoading();
            hmsPopup.showShortCenterToast('调用失败,请检查网络');
          })

      };
      $scope.fakeLeaveCommitConfirm = function () {
         $scope.timeInfoList = [];
        console.log('fakeLeaveAddDays = ' + angular.toJson($scope.fakeLeaveAddDays));
        for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
          if ($scope.fakeLeaveAddDays[i].fakeLeaveSectionStart == "" || $scope.fakeLeaveAddDays[i].fakeLeaveSectionEnd == "") {
            $scope.noChooseDate = true;
          } else {
            $scope.noChooseDate = false;
          }
          if ($scope.fakeLeaveAddDays[i].fakeLeaveSectionStart != "" && $scope.fakeLeaveAddDays[i].fakeLeaveSectionEnd != "") {
            var timeInfo = {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_SEQNR": i + 1,
              "AWART": $scope.holidayinfo.AWART,
              "BEGDA": $scope.fakeLeaveAddDays[i].fakeLeaveSectionStart,
              "ZBEGAP": $scope.fakeLeaveAddDays[i].fakeLeaveSectionStartTime,
              "ENDDA": $scope.fakeLeaveAddDays[i].fakeLeaveSectionEnd,
              "ZENDAP": $scope.fakeLeaveAddDays[i].fakeLeaveSectionEndTime,
              "ABWTG": $scope.fakeLeaveAddDays[i].fakeLeaveSectionDays
            };
            $scope.timeInfoList.push(timeInfo);
          }
        }
        if($scope.timeInfoList.length == 0){
          hmsPopup.showPopup('请您添加销假时间段');
        }else if($scope.noChooseDate == true){
          hmsPopup.showShortCenterToast('销假开始日期和结束日期不能为空');
        }else{
          hmsPopup.confirm('您确定要提交销假申请吗?', '温馨提示', function (res) {
            if (res) {
              fakeLeaveCommit();
            }
          });
        }

      };
      $scope.goToPolicyDetail = function (typeFlag) {//跳转到相应的政策详情页
        // $state.go('tab.holiday-policy-detail', {typeFlag: typeFlag});
        try {
          cordova.ThemeableBrowser.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', {
            statusbar: {
              color: '#385198'
            },
            toolbar: {
              height: 44,
              color: '#385198'
            },
            backButton: {
              wwwImage: 'build/img/back.png',
              wwwImagePressed: 'build/img/back.png',
              wwwImageDensity: 2,
              align: 'left',
              event: 'backPressed'
            },
            forwardButton: {
              wwwImage: 'build/img/forward.png',
              wwwImagePressed: 'build/img/forward.png',
              wwwImageDensity: 2,
              align: 'left',
              event: 'forwardPressed'
            },
            closeButton: {
              wwwImage: 'build/img/close.png',
              wwwImagePressed: 'build/img/close.png',
              wwwImageDensity: 2,
              align: 'right',
              event: 'closePressed'
            },
            backButtonCanClose: false
          })
        } catch (e) {
          window.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      }

    }]);
