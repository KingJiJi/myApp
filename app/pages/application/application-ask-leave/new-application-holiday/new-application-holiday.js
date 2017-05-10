/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.new-application-holiday', {
          url: '/new-application-holiday',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/new-application-holiday/new-application-holiday.html',
              controller: 'newApplicationHolidayListCtrl'
            }
          },
          params: {
            newInfo: {},
            holidayList: []
          }
        })
    }]);
angular.module('applicationModule')
  .controller('newApplicationHolidayListCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    '$cordovaDatePicker',
    '$filter',
    '$ionicActionSheet',
    '$ionicModal',
    '$cordovaFileTransfer',
    '$q',
    'hmsHttp',
    '$rootScope',
    '$stateParams',
    '$timeout',
    '$cordovaCamera',
    '$cordovaDialogs',
    '$ionicPopup',
    'imgService',
    'sweet',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              $cordovaDatePicker,
              $filter,
              $ionicActionSheet,
              $ionicModal,
              $cordovaFileTransfer,
              $q,
              hmsHttp,
              $rootScope,
              $stateParams,
              $timeout,
              $cordovaCamera,
              $cordovaDialogs,
              $ionicPopup,
              imgService,
              sweet) {

      $scope.newHolidayData = {};
      $scope.newHolidayData.days = 0;
      $scope.imgArr = [];
      var imgTotalLength = 0;
      var pictureNumber = 0;
      $scope.chooseTypeFlag = false;
      $scope.newHolidayPics = [];
      $scope.alreadyHoliday = [];
      $scope.beginFlag = true;
      $scope.endFlag = true;
      $scope.showDelete = "-1";
      $scope.typeValue = '';
      $scope.showUploadPic = false;
      $scope.goBack = function () {
        $scope.newHolidayData = {};
        imgService.setHolidayInfo({});
        $ionicHistory.goBack();
      };

      $scope.$on('$ionicView.afterLeave',function () {
        imgService.setAndroidBadgeFlag('true');
      });
      $scope.$on('$ionicView.enter', function () {//controller回收资源时执行
        console.log('enter');
        console.log('broadcast $scope.newHolidayData = ' + angular.toJson($scope.newHolidayData));
        console.log('imgService.getHolidayInfo = ' + angular.toJson(imgService.getHolidayInfo()));

        if (imgService.getHolidayInfo().name) {
          $scope.chooseTypeFlag = true;
          $scope.typeValue = imgService.getHolidayInfo().name;
          $scope.newHolidayData.typeCode = imgService.getHolidayInfo().code;
          if (imgService.getHolidayInfo().name == '婚假' || imgService.getHolidayInfo().name == '病假') {
            $scope.showUploadPic = true;
          } else {
            $scope.showUploadPic = false;
          }
        }
        imgService.setAndroidBadgeFlag('false');

        if ($scope.newHolidayData.beginDate !== '' && $scope.newHolidayData.endDate !== '' && $scope.newHolidayData.beginDate !== undefined && $scope.newHolidayData.endDate !== undefined) {
          initBeginTime();
          initEndTime();
        }
        imgService.setHolidayInfo({});
      });

      $scope.chooseHolidayType = function () {
        $state.go('tab.holiday-type');
      };
      console.group('请假列表数据:');
      console.info('$stateParams.newInfo  = ' + angular.toJson($stateParams.newInfo, true));
      console.info('$stateParams.holidayList  = ' + angular.toJson($stateParams.holidayList, true));
      if ($stateParams.holidayList.length > 0) {
        angular.forEach($stateParams.holidayList, function (item, index) {
          if (item.REL_STATUS !== 'C' || item.REL_STATUS !== 'R') {
            $scope.alreadyHoliday.push(item.BEGDA);
          }
        });
        console.log('$scope.alreadyHoliday = ' + angular.toJson($scope.alreadyHoliday));
      }
      if ($stateParams.newInfo !== '') {
        $scope.newHolidayData = {};
        $scope.newHolidayData.days = 0;
      }
      var todayDate = new Date();//今天日期
      $scope.datetimeFrom = {//开始日期
        year: todayDate.getFullYear(),
        month: "",
        day: ""
      };
      $scope.datetimeTo = {//结束日期
        year: "",
        month: "",
        day: ""
      };

      function getDateString(date) {
        return $filter('date')(date, 'yyyy-MM-dd');
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
                        //划分成数组，删除第一个元素，连接成之前没有分隔的字符串；
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


      function initBeginTime() {
        $scope.newHolidayData.days = '0';
        $scope.beginFlag = true;
        $scope.newHolidayData.beginDate = '';
        $scope.beginTime = '';
        $scope.newHolidayData.beginTimeInterval = '';
      }

      function initEndTime() {
        $scope.newHolidayData.days = '0';
        $scope.endFlag = true;
        $scope.newHolidayData.endDate = '';
        $scope.endTime = '';
        $scope.newHolidayData.endTimeInterval = '';
      }

      $scope.chooseBeginTime = function () {
        var beginDays = new Date();
        var beginYear = beginDays.getFullYear(); //2017
        var beginMonth = beginDays.getMonth()+1; //3
        var startYear = beginDays.getFullYear()-1;  //2016
        // var startYear = beginDays.getFullYear();
        var startMonth = beginMonth == 1? 12 :beginMonth-1;
        console.log('beginMonth = ' + beginYear + '-' + beginMonth + '-01');  //2017-3-10
        console.log('beginDays.getMonth() = '+beginDays.getMonth());   //2
        console.log('getDateString(new Date()) = '+getDateString(new Date()));   //2017-03-27
        if ($scope.newHolidayData.typeCode == '' || $scope.newHolidayData.typeCode == undefined) {
          hmsPopup.showShortCenterToast('请先选择请假类型');
          return;
        }

        var dic = {
          startDate: startYear + '-' + startMonth + '-01',  //2016-2-01
          endDate: new Date().getFullYear() + 3 + "-12-31",   //2010-12-31
          selectedDate: $scope.newHolidayData.beginDate == '' || $scope.newHolidayData.beginDate == undefined ? getDateString(new Date()) + ' 上午' : $scope.newHolidayData.beginDate,   //2017-03-27 上午
          startTime: "7:30",
          endTime: "15:00",
          title: "选择时间",
          type: "TYPE1"
        };
        dic.selectedDate = (($scope.newHolidayData.endDate !== '' || $scope.newHolidayData.endDate !== undefined) && $scope.newHolidayData.endDate) || (($scope.newHolidayData.beginDate == '' || $scope.newHolidayData.beginDate == undefined) && getDateString(new Date()) + ' 上午') || $scope.newHolidayData.beginDate;
        //add by wl 结束时间有值，开始时间没值 且 获取今天的值，或者开始时间有值，则为真
        console.log("$scope.newHolidayData.typeCode值："+$scope.newHolidayData.typeCode);
        if($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010'){
          dic.endDate = new Date().getFullYear()+ '-12-31';
        }
        console.log('参数 = ' + angular.toJson(dic));
        console.log('aaaa = ' + dic.selectedDate);
        CDXDatePicker.selectDate(function (res) {
          console.log('datepicker = ' + res);
          $scope.beginFlag = false;
          $scope.beginTime = res.split(' ').splice(0, 1).join('');
          $scope.checkBeginYear = $scope.beginTime.split('-').splice(0, 1).join('');
          $scope.newHolidayData.beginTimeInterval = res.split(' ').splice(1, 1).join('');
          var beginYear = $scope.beginTime.split('-').splice(0, 1).join('');
          var beginInterval = res.split(' ').splice(1, 1).join('');
          var nextYear = parseInt(new Date().getFullYear()) + 1;
          var lastYear = parseInt(new Date().getFullYear()) - 1;
          var thisYear = parseInt(new Date().getFullYear());
          console.log('$scope.beginTime = ' + $scope.beginTime);
          console.log('beginYear = ' + beginYear);
          console.log('nextYear = ' + nextYear);
          console.log('beginInterval = ' + beginInterval);
          // if(new Date($scope.beginTime).getDay() == 6 || new Date($scope.beginTime).getDay() == 0){
          //   hmsPopup.showShortCenterToast('请假开始时间不能以周末开始');
          //   initBeginTime();
          // }
          if ($scope.newHolidayData.endDate) {
            initEndTime();
          }
            if (($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010') && beginYear == nextYear) {
              hmsPopup.showShortCenterToast('请假只能请本年,请重新选择');
              initBeginTime();
            } else {
              if(beginInterval == 'AM'){
                $scope.newHolidayData.beginDate = $scope.beginTime + ' 上午';
                $scope.newHolidayData.beginTimeInterval = '上午';
              }else if(beginInterval == 'PM'){
                $scope.newHolidayData.beginDate = $scope.beginTime + ' 下午';
                $scope.newHolidayData.beginTimeInterval = '下午';
              }else{
                $scope.newHolidayData.beginDate = res;
                $scope.newHolidayData.beginTimeInterval = res.split(' ').splice(1, 1).join('');
              }
              // $scope.newHolidayData.beginTimeInterval = res.split(' ').splice(1, 1).join('');
              $scope.$apply();
              console.log('$scope.newHolidayData.beginDate = ' + $scope.newHolidayData.beginDate);
            }

        }, function (error) {
          console.log('error');
        }, dic);
      };



      $scope.chooseEndDate = function () {
        var endDays = new Date();
        var endYear = endDays.getFullYear();
        var endMonth = endDays.getMonth()+1;
        var startEndYear = endDays.getFullYear()-1;
        var startEndMonth = endMonth == 1? 12 :endMonth-1;

        console.log('$scope.newHolidayData.typeCode2 = ' + $scope.newHolidayData.typeCode);
        if ($scope.newHolidayData.typeCode == '' || $scope.newHolidayData.typeCode == undefined) {
          hmsPopup.showShortCenterToast('请先选择请假类型');
          return;
        }
        if(!$scope.newHolidayData.beginDate){
          hmsPopup.showShortCenterToast('请您先选择开始时间');
          return;
        }
        var dic = {
          startDate: startEndYear + '-' + startEndMonth + '-01',
          endDate: new Date().getFullYear() + 3 + "-12-31",
          selectedDate: $scope.newHolidayData.endDate == '' || $scope.newHolidayData.endDate == undefined ? getDateString(new Date()) + ' 上午' : $scope.newHolidayData.endDate,
          startTime: "7:30",
          endTime: "15:00",
          title: "选择时间",
          type: "TYPE1"
        };

        dic.selectedDate = (($scope.newHolidayData.beginDate !== '' || $scope.newHolidayData.beginDate !== undefined) && $scope.newHolidayData.beginDate) || (($scope.newHolidayData.endDate == '' || $scope.newHolidayData.endDate == undefined) && getDateString(new Date()) + ' 上午') || $scope.newHolidayData.endDate;
        if($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010'){
          dic.endDate = new Date().getFullYear()+ '-12-31';
        }

        CDXDatePicker.selectDate(function (res) {

          $scope.endTime = res.split(' ').splice(0, 1).join('');
          $scope.endFlag = false;
          if(res.split(' ').splice(1, 1).join('') == 'AM'){
            $scope.newHolidayData.endTimeInterval = '上午';
          }else if(res.split(' ').splice(1, 1).join('') == 'PM'){
            $scope.newHolidayData.endTimeInterval = '下午';
          }else{
            $scope.newHolidayData.endTimeInterval = res.split(' ').splice(1, 1).join('');
          }

          var endInterval = res.split(' ').splice(1, 1).join('');
          var endYear = $scope.endTime.split('-').splice(0, 1).join('');
          $scope.checkEndYear = $scope.endTime.split('-').splice(0, 1).join('');
          var nextYear = parseInt(new Date().getFullYear()) + 1;
          var lastYear = parseInt(new Date().getFullYear()) - 1;
          var thisYear = parseInt(new Date().getFullYear());
          // if(new Date($scope.endTime).getDay() == 6 || new Date($scope.endTime).getDay() == 0){
          //   hmsPopup.showShortCenterToast('请假结束时间不能以周末结束');
          //   initEndTime();
          // }
          if ($scope.newHolidayData.beginDate) {  //选择了开始日期的情况
            var beginYear = $scope.beginTime.split('-').splice(0, 1).join('');
            $scope.newHolidayData.beginTimeInterval = $scope.newHolidayData.beginDate.split(' ').splice(1, 1).join('');
            if (CompareDate($scope.newHolidayData.beginDate, res)) {
              console.log(' CompareDate $scope.beginTime = ' + $scope.beginTime);
              hmsPopup.showShortCenterToast('结束日期小于开始日期,请重新选择');
              initEndTime();
            } else if (($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010') && endYear == nextYear) {
              hmsPopup.showShortCenterToast('请假只能请本年,请重新选择');
              initEndTime();
            }else if($scope.newHolidayData.typeCode == '1000'  && beginYear == lastYear && endYear ==thisYear){
              console.log('年假跨年');
              hmsPopup.showShortCenterToast('不允许跨年申请年假,请重新输入');
              initEndTime();
            }else if($scope.newHolidayData.typeCode == '1010'  && beginYear == lastYear && endYear ==thisYear){
              console.log('病假跨年');
              hmsPopup.showShortCenterToast('不允许跨年申请病假,请重新输入');
              initEndTime();
            }else if($scope.newHolidayData.typeCode == '1000' && beginYear == lastYear && endYear == lastYear){
              var dateCheckUrl_1 = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam_1 = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.newHolidayData.typeCode,
                  "I_BEGDA": $scope.beginTime,
                  "I_ENDDA": $scope.endTime,
                  "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_USRID": window.localStorage.empno.toUpperCase()
                }
              };
              hmsPopup.showLoading('请稍后');
              console.log('dateCheckParam_1 = '+angular.toJson());
              hmsHttp.post(dateCheckUrl_1, dateCheckParam_1).then(function (response) {
                console.group('结束日期返回数据');
                console.info(angular.toJson(response, true));
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  // $scope.newHolidayData.days = response.O_DAYS;
                  if(Number(response.O_DAYS) > Number($stateParams.newInfo.ZANZHL1)){
                    hmsPopup.showShortCenterToast('超出可用年假定额天数,请重新输入');
                    initEndTime();
                  }else{
                    if(endInterval == 'AM'){
                      $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                    }else if(endInterval == 'PM'){
                      $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                    }else{
                      $scope.newHolidayData.endDate = res;
                    }
                    // $scope.newHolidayData.endDate = res;
                    $scope.newHolidayData.days = response.O_DAYS;
                  }
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initEndTime();
                }

              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initEndTime();
              })
            }else if($scope.newHolidayData.typeCode == '1000' && beginYear == thisYear && endYear == thisYear){
              console.log('年假begin and end this year')
              var moment = thisYear+'-04'+'-01'+' 上午';
              console.log('moment = '+moment);
                if(CompareDate(moment,$scope.newHolidayData.beginDate)){
                  console.log('小于4月1号');
                  var dateCheckUrl_2 = baseConfig.sapUrl + 'Zhrwf00_008';
                  var dateCheckParam_2 = {
                    "ZHRWF00_008": {
                      "I_AWART": $scope.newHolidayData.typeCode,
                      "I_BEGDA": $scope.beginTime,
                      "I_ENDDA": $scope.endTime,
                      "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_USRID": window.localStorage.empno.toUpperCase()
                    }
                  };
                  hmsPopup.showLoading('请稍后');
                  hmsHttp.post(dateCheckUrl_2, dateCheckParam_2).then(function (response) {
                    console.group('结束日期返回数据');
                    console.log('response = '+angular.toJson(response));
                    console.info(angular.toJson(response, true));
                    if (response.O_TYPE == 'S') {
                      hmsPopup.hideLoading();
                      if(Number(response.O_DAYS) > (Number($stateParams.newInfo.ZANZHL1)+Number($stateParams.newInfo.ZANZHL2))){
                        console.log('超过了上年年假和本年年假');
                        hmsPopup.showShortCenterToast('超出可用年假定额天数,请重新输入');
                        initEndTime();
                      }else{
                        console.log('de dao day');
                        console.log('$scope.endFlag = '+$scope.endFlag);
                        if(endInterval == 'AM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                        }else if(endInterval == 'PM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                        }else{
                          $scope.newHolidayData.endDate = res;
                        }
                        // $scope.newHolidayData.endDate = res;
                        $scope.newHolidayData.days = response.O_DAYS;
                      }
                    } else {
                      hmsPopup.hideLoading();
                      hmsPopup.showShortCenterToast(response.O_MESSAGE);
                      initEndTime();
                    }

                  }, function (response) {
                    hmsPopup.hideLoading();
                    hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                    initEndTime();
                  })
                }else{
                  var dateCheckUrl_3 = baseConfig.sapUrl + 'Zhrwf00_008';
                  var dateCheckParam_3 = {
                    "ZHRWF00_008": {
                      "I_AWART": $scope.newHolidayData.typeCode,
                      "I_BEGDA": $scope.beginTime,
                      "I_ENDDA": $scope.endTime,
                      "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_USRID": window.localStorage.empno.toUpperCase()
                    }
                  };
                  hmsPopup.showLoading('请稍后');
                  hmsHttp.post(dateCheckUrl_3, dateCheckParam_3).then(function (response) {
                    console.group('结束日期返回数据');
                    console.info(angular.toJson(response, true));
                    if (response.O_TYPE == 'S') {
                      hmsPopup.hideLoading();
                      if(Number(response.O_DAYS) > Number($stateParams.newInfo.ZANZHL2)){
                        hmsPopup.showShortCenterToast('超出可用年假定额天数,请重新输入');
                        initEndTime();
                      }else{
                        if(endInterval == 'AM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                        }else if(endInterval == 'PM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                        }else{
                          $scope.newHolidayData.endDate = res;
                        }
                        // $scope.newHolidayData.endDate = res;
                        $scope.newHolidayData.days = response.O_DAYS;
                      }
                    } else {
                      hmsPopup.hideLoading();
                      hmsPopup.showShortCenterToast(response.O_MESSAGE);
                      initEndTime();
                    }

                  }, function (response) {
                    hmsPopup.hideLoading();
                    hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                    initEndTime();
                  })
                }
            }
            else {
              // judgeAmPm(date, 'end');
              // $scope.newHolidayData.endDate = res;
              if(endInterval == 'AM'){
                $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                $scope.newHolidayData.endTimeInterval = '上午';
              }else if(endInterval == 'PM'){
                $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                $scope.newHolidayData.endTimeInterval = '下午';
              }else{
                $scope.newHolidayData.endDate = res;
                $scope.newHolidayData.endTimeInterval = res.split(' ').splice(1, 1).join('');
              }
              // $scope.newHolidayData.endTimeInterval = res.split(' ').splice(1, 1).join('');
              //请假销假日期计算校验接口
              var dateCheckUrl = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.newHolidayData.typeCode,
                  "I_BEGDA": $scope.beginTime,
                  "I_ENDDA": $scope.endTime,
                  "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_USRID": window.localStorage.empno.toUpperCase()
                }
              };
              hmsPopup.showLoading('请稍后');
              hmsHttp.post(dateCheckUrl, dateCheckParam).then(function (response) {
                console.group('结束日期返回数据');
                console.info(angular.toJson(response, true));
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  $scope.newHolidayData.days = response.O_DAYS;
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initEndTime();
                }

              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initEndTime();
              })
            }

          }
        }, function (error) {

        }, dic);

      };

      $scope.getPicture = function () {
        $ionicActionSheet.show({
          buttons: [
            {text: '从相册中选'},
            {text: '拍照'}
          ],
          titleText: '选择上传方式',
          cancelText: '取消',
          buttonClicked: function (index) {
            if (index == 0) {
              moreImg();
            } else if (index == 1) {
              takePhoto();
            }
            return true;
          }
        });
      };


      /**
       * 多张上传
       */
      function moreImg() {
        window.imagePicker.getPictures(
          function (results) {
            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              $scope.imgArr.push(results[i]);
              $scope.$apply();
            }
          }, function (error) {
            console.log('Error: ' + error);
          }, {
            maximumImagesCount: 1,
            width: 800
          }
        );
      }

      //拍照
      function takePhoto() {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 3000,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
          console.log(imageURI);
          $scope.person_imgsrc = imageURI;
          console.group('img===');
          console.groupEnd();
          $scope.imgArr.push(imageURI);
          console.log('takePhoto imgArr = ' + angular.toJson($scope.imgArr));
          //upImage(base64encode(imageURI), imageURI);
          $scope.showPress = true;
        }, function (err) {
          // error
        });

      }


      $scope.delImage = function (index) {
        $scope.showDelete = true;
        console.log('on-hold' + index);
        console.log('$scope.showDelete' + $scope.showDelete);
      };
      $scope.deleteImage = function (event, num) {//删除图片
        event.stopPropagation();
        $scope.imgArr.splice(num, 1);
        // $scope.showDelete = "-1";
        $scope.showDelete = true;
      };
      $scope.cancelDelete = function () {
        if ($scope.showDelete !== -1) {
          $scope.showDelete = -1;
        }
      };

      $scope.zoomMin = 1;
      $scope.showBigPicture = function (index) {//显示大图
        $scope.showDelete = "-1";
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        $scope.activeSlide = index;
        $scope.showModal('build/pages/application/application-ask-leave/new-application-holiday/photo-zoom.html');
      };

      $scope.showModal = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove()
      };

      //上传图片
      var uploadImage = function () {
        console.log('$scope.imgArr.length = ' + $scope.imgArr.length);
        console.log('$scope.newHolidayData.typeCode' + $scope.newHolidayData.typeCode);
        console.log('Number($scope.newHolidayData.days) = ' + Number($scope.newHolidayData.days));
        console.log('Number($stateParams.newInfo.ZANZHL3) = ' + Number($stateParams.newInfo.ZANZHL3));
        hmsPopup.showLoadingWithoutBackdrop('上传信息中,请稍候');
        console.log('$scope.newHolidayData.typeCode = ' + $scope.newHolidayData.typeCode);
        console.log('$scope.newHolidayData.beginDate = ' + $scope.newHolidayData.beginDate);
        console.log('$scope.newHolidayData.endDate = ' + $scope.newHolidayData.endDate);

        if ($scope.imgArr.length == 0) {
          console.log('pic is null ');
          var submitUrl = baseConfig.sapUrl + 'Zhrwf20_007';
          var submitParam = {
            "ZHRWF20_007": {
              "I_CODE": 'SUBMIT',
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZHRWF_020": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "PERNR": '',
                "ENAME": '',
                "PERSA": '',
                "NAME1": '',
                "ORGEH": '',
                "ORGTX": '',
                "PLANS": '',
                "PLSTX": '',
                "ANSVH": '',
                "ATX": '',
                "AWART": $scope.newHolidayData.typeCode,//请假类型
                "ZANZHL1": $stateParams.newInfo.ZANZHL1,
                "ZANZHL2": $stateParams.newInfo.ZANZHL2,
                "ZANZHL3": $stateParams.newInfo.ZANZHL3,
                "ZANZHL4": $stateParams.newInfo.ZANZHL4,
                "ZXJBJ": "",
                "REL_STATUS": "",
                "BEGDA": $scope.beginTime,//请假开始时间
                "ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',//开始时间时段标记
                "ENDDA": $scope.endTime,//请假结束时间
                "ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',//结束时间时段标记
                "ABWTG": $scope.newHolidayData.days,//请假时长
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY": $scope.newHolidayData.reason,//请假原因
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
              },
              "I_ZMARK": ""
            }
          };
          hmsHttp.post(submitUrl, submitParam).then(function (response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function () {
                hmsPopup.showShortCenterToast('请假申请成功');
                // $cordovaDialogs.alert('','新建成功','确定');
              }, 200);
              $rootScope.$broadcast('HOLIDAY_REFRESH');
              $ionicHistory.goBack();
            } else {
              hmsPopup.showShortCenterToast(response.O_MESSAGE);
            }
          }, function (response) {
            hmsPopup.showShortCenterToast('提交失败');
          })
        } else {
          console.log('pic is not null ');
          for (var i = 0; i < $scope.imgArr.length; i++) {
            var nowDates = Date.parse(new Date()) / 1000;
            var fileName = window.localStorage.empno.toUpperCase() + nowDates + '.jpg';
            var urlname = "";
            var myParam = {
              filename: fileName,
              url: urlname//图片在服务器的路径
            };
            var options = new FileUploadOptions();
            options.filekey = "file";
            options.fileName = "image.jpg";
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            var trustAllHosts = true;
            options.params = myParam;
            if (window.localStorage.token && window.localStorage.empno) {
              var timestamp = new Date().getTime();
              var token = CryptoJS.MD5(window.localStorage.token + timestamp);
              options.headers = {
                timestamp: timestamp,
                token: ''+ token,
                userKey: window.localStorage.empno
              }
            }
            var fileTransfer = new FileTransfer();
            console.log('$scope.imgArr[i] = ' + $scope.imgArr[i]);
            console.log('上传图片baseConfig.imgUploadUrl = ' + baseConfig.imgUploadUrl);
            fileTransfer.upload(
              $scope.imgArr[i],
              //encodeURI(baseConfig.queryPath+"/objectUpload?access_token="+window.localStorage.token),//上传服务器的接口地址
              encodeURI(baseConfig.imgUploadUrl),
              win,
              fail,
              options,
              trustAllHosts
            );
          }
        }
      };

      var win = function (result) {
        var picString = '';
        if (JSON.parse(result.response).result && JSON.parse(result.response).result == 'ETOKEN') {
          window.localStorage.token = '';
          $rootScope.$broadcast("REFRESH_LOGIN");
          $state.go('login');
          hmsPopup.showShortCenterToast('令牌失效,请重新登陆!');
          //重新登录
          return;
        }

        console.log('picString = ' + picString);
        $scope.newHolidayPics.push(angular.fromJson(result.response).savePath);
        console.log('$scope.newHolidayPics = ' + angular.toJson($scope.newHolidayPics));
        pictureNumber++;
        console.log('成功' + angular.toJson(result, true));
        console.log("Response = " + result.response);
        if (pictureNumber == imgTotalLength) {
          for (var i = 0; i < $scope.newHolidayPics.length; i++) {
            if (i < $scope.newHolidayPics.length - 1) {
              picString += $scope.newHolidayPics[i] + ',';
            } else {
              picString += $scope.newHolidayPics[i];
            }
          }
          var submitUrl = baseConfig.sapUrl + 'Zhrwf20_007';
          var submitParam = {
            "ZHRWF20_007": {
              "I_CODE": 'SUBMIT',
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZHRWF_020": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "PERNR": '',
                "ENAME": '',
                "PERSA": '',
                "NAME1": '',
                "ORGEH": '',
                "ORGTX": '',
                "PLANS": '',
                "PLSTX": '',
                "ANSVH": '',
                "ATX": '',
                "AWART": $scope.newHolidayData.typeCode,//请假类型
                "ZANZHL1": $stateParams.newInfo.ZANZHL1,
                "ZANZHL2": $stateParams.newInfo.ZANZHL2,
                "ZANZHL3": $stateParams.newInfo.ZANZHL3,
                "ZANZHL4": $stateParams.newInfo.ZANZHL4,
                "ZXJBJ": "",
                "REL_STATUS": "",
                "BEGDA": $scope.beginTime,//请假开始时间
                "ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',//开始时间时段标记
                "ENDDA": $scope.endTime,//请假结束时间
                "ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',//结束时间时段标记
                "ABWTG": $scope.newHolidayData.days,//请假时长
                "ZFLAG_ATT": "",
                "ZPHOTO": picString,
                "ZJTSY": $scope.newHolidayData.reason,//请假原因
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
              },
              "I_ZMARK": ""
            }
          };
          console.log('submitParam = ' + angular.toJson(submitParam));
          hmsPopup.showLoading('正在上传图片...');
          hmsHttp.post(submitUrl, submitParam).then(function (response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function () {
                hmsPopup.showShortCenterToast('请假申请成功');
                // $cordovaDialogs.alert('','新建成功','确定');
              }, 200);
              $scope.newHolidayData = {};
              $rootScope.$broadcast('HOLIDAY_REFRESH');
              $ionicHistory.goBack();
            } else {
              hmsPopup.showShortCenterToast(response.O_MESSAGE);
            }
          }, function (response) {
            hmsPopup.showShortCenterToast('提交失败');
          })
        }
      };
      var fail = function (error) {//图片上传失败
        //如果有Loading的话记得隐藏loading
        hmsPopup.hideLoading();
        hmsPopup.showPopup("新建申请失败");
      };
      $scope.commitHolidayInfo = function () {
        $scope.checkNextYear = parseInt(new Date().getFullYear()) + 1;
        for (var i = 0; i < $scope.imgArr.length; i++) {
          imgTotalLength++;
        }
        if ($scope.newHolidayData.typeCode == undefined) {
          hmsPopup.showShortCenterToast('请填写请假类型');
        }
        else if ($scope.newHolidayData.beginDate == undefined) {
          hmsPopup.showShortCenterToast('请填写请假开始时间');
        }
        else if ($scope.newHolidayData.endDate == undefined) {
          hmsPopup.showShortCenterToast('请填写请假结束时间');
        }
        else if ($scope.newHolidayData.typeCode == '1080' && Number($scope.newHolidayData.days) * 8 > Number($stateParams.newInfo.ZANZHL4)) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('提交的调休假超过剩余调休假数,请重新选择');
        } else if ($scope.newHolidayData.typeCode == '1010' && $scope.imgArr.length == 0) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('请您上传照片');
        } else if ($scope.newHolidayData.typeCode == '1030' && $scope.imgArr.length == 0) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('请您上传照片');
        } else if ($scope.newHolidayData.beginDate == '' || $scope.newHolidayData.beginDate == undefined || $scope.newHolidayData.endDate == '' || $scope.newHolidayData.endDate == undefined) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('您的开始日期或结束日期为空');
        } else if (($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010') && ($scope.checkBeginYear == $scope.checkNextYear || $scope.checkEndYear == $scope.checkNextYear)) {
        console.log('submit $scope.newHolidayData.beginDate = '+$scope.newHolidayData.beginDate);
        console.log('submit $scope.newHolidayData.endDate = '+$scope.newHolidayData.endDate);
         console.log('submit scope.checkBeginYear = '+$scope.checkBeginYear);
         console.log('submit $scope.checkEndYear = '+$scope.checkEndYear);
         console.log('submit $scope.checkNextYear = '+$scope.checkNextYear);
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('请假只能请本年,请重新选择');
        } else {
          hmsPopup.confirm('您确定要提交请假申请吗?', '温馨提示', function (res) {
            if (res) {
              uploadImage();
            }
          });
        }

      };


    }]);
