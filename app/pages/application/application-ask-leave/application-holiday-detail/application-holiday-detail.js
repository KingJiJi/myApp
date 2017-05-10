/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.application-holiday-detail', {
          url: '/application-holiday-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/application-holiday-detail/application-holiday-detail.html',
              controller: 'applicationHolidayDetailCtrl'
            }
          },
          params: {
            receiptNum: ''
          }
        })
    }]);
angular.module('applicationModule')
  .controller('applicationHolidayDetailCtrl', [
    '$scope',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    '$stateParams',
    'hmsHttp',
    '$rootScope',
    '$timeout',
    'baseConfig',
    'sweet',
    function ($scope,
              $state,
              $ionicHistory,
              hmsPopup,
              $stateParams,
              hmsHttp,
              $rootScope,
              $timeout,
              baseConfig,
              sweet) {


      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.picsArr = [];

      var holidayDetailUrl = baseConfig.sapUrl + 'Zhrwf20_006';

      var holidayDetailParam = {
        "ZHRWF20_006": {
          "ET_ZHREL_HISTORY": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_DATE": "",
              "REL_TIME": "",
              "REL_ID": "",
              "REL_ENAME": "",
              "REL_PLANS": "",
              "REL_PLSTX": "",
              "REL_STEP": "",
              "REL_STATUS": "",
              "REL_ACTION": "",
              "REMARKS": ""
            }
          },
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
          "I_RELNUMBER": $stateParams.receiptNum
        }
      };
      var cancelHolidayUrl = baseConfig.sapUrl+'Zhrwf20_007';
      var cancelHolidayParam = {
        "ZHRWF20_007": {
          "I_CODE": 'CANCEL',
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_ZHRWF_020": {
            "MANDT": "",
            "WF_TYPE": "",
            "REL_NUMBER": $stateParams.receiptNum,
            "PERNR":'',
            "ENAME": '',
            "PERSA": '',
            "NAME1": '',
            "ORGEH": '',
            "ORGTX": '',
            "PLANS": '',
            "PLSTX": '',
            "ANSVH": '',
            "ATX": '',
            "AWART": '',
            "ZANZHL1":'',
            "ZANZHL2":'',
            "ZANZHL3":'',
            "ZANZHL4":'',
            "ZXJBJ": "",
            "REL_STATUS": "",
            "BEGDA": '',
            "ZBEGAP":'',
            "ENDDA":'',
            "ZENDAP":'',
            "ABWTG": '',
            "ZFLAG_ATT": "",
            "ZPHOTO":'',
            "ZJTSY":'',
            "ZAPPR": "",
            "REMARKS": '',
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
      console.log('I_RELNUMBER = ' + $stateParams.receiptNum);
      $scope.holidayDetail = {};
      $scope.rel_history = [];
      $scope.showMyBackdrop = false;  //是否显示背景
      $scope.showImg = false; //图片预览是否显示
      $scope.imgUrl = '';
      /**
       * 得到请假明细
       */
      function getHolidayDetail() {
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(holidayDetailUrl, holidayDetailParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假明细');
          console.info(angular.toJson(response, true));
          var picStrings = response.ET_ZHRWF_020.item.ZPHOTO;
          $scope.picsArr = picStrings.split(',');
          angular.forEach($scope.picsArr,function (item,index) {
            if(item == '' || item == undefined){
              $scope.picsArr.splice(index,1);
            }
          });
          console.log('$scope.picsArr' + angular.toJson($scope.picsArr));
          console.log('$scope.picsArr.length' + $scope.picsArr.length);
          $scope.holidayDetail.holidayType = response.ET_ZHRWF_020.item.AWART;//请假类别
          $scope.holidayDetail.approveStatus = response.ET_ZHRWF_020.item.REL_STATUS;//审批状态
          $scope.holidayDetail.holidayDays = response.ET_ZHRWF_020.item.ABWTG ;//请假天数
          $scope.holidayDetail.beginDate = response.ET_ZHRWF_020.item.BEGDA;//请假开始日期
          $scope.holidayDetail.endDate = response.ET_ZHRWF_020.item.ENDDA;//请假结束日期
          $scope.holidayDetail.reason = response.ET_ZHRWF_020.item.ZJTSY;//具体事由
          $scope.holidayDetail.beginFlag = response.ET_ZHRWF_020.item.ZBEGAP;//开始时间标记
          $scope.holidayDetail.endFlag = response.ET_ZHRWF_020.item.ZENDAP;//结束时间标记
          $scope.holidayDetail.approvalDetailStatus = response.ET_ZHRWF_020.item.REL_STATUS;//单据状态
          if (response.ET_ZHREL_HISTORY !== '') { //有审批记录的情况
            if (response.ET_ZHREL_HISTORY.item.constructor == Array) {
              var a = response.ET_ZHREL_HISTORY.item;
              angular.forEach(a, function (item, index) {
                var temp = {
                  REL_DATE: item.REL_DATE,
                  REL_TIME: item.REL_TIME,
                  REL_ENAME: item.REL_ENAME,
                  REL_PLSTX: item.REL_PLSTX,
                  REL_ACTION: item.REL_ACTION,
                  REMARKS: item.REMARKS
                };
                $scope.rel_history.push(temp);
              });
              if(response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
                var temp1  = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_020.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_020.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp1);
              }
            } else {
              var temp = {
                REL_DATE: response.ET_ZHREL_HISTORY.item.REL_DATE,
                REL_TIME: response.ET_ZHREL_HISTORY.item.REL_TIME,
                REL_ENAME: response.ET_ZHREL_HISTORY.item.REL_ENAME,
                REL_PLSTX: response.ET_ZHREL_HISTORY.item.REL_PLSTX,
                REL_ACTION: response.ET_ZHREL_HISTORY.item.REL_ACTION,
                REMARKS: response.ET_ZHREL_HISTORY.item.REMARKS
              };
              $scope.rel_history.push(temp);
              if(response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
                var temp1  = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_020.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_020.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp1);
              }
            }
          }
        }, function (response) {

        })
      }

      getHolidayDetail();

      $scope.openImg = function (url) {
        $scope.showMyBackdrop = true;
        $scope.showImg = true;
        $scope.imgUrl = url;
      };

      $scope.hideImgPropur = function () {
        $scope.showMyBackdrop = false;
        $scope.imgUrl = '';
        $scope.showImg = false;
      };

      $scope.toHolidayPolicy = function (policyCode) {
        // $state.go('tab.holiday-policy-detail', {policyCode: policyCode});
        try{
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
        }catch(e){
          window.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      };

      /**
       * 撤回休假申请
       * @type function
       */

      var cancelHoliday = function(){
        hmsPopup.showLoading('请稍等...');
        hmsHttp.post(cancelHolidayUrl, cancelHolidayParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('撤回结果');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast('HOLIDAY_REFRESH');
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            })
          } else {
            hmsPopup.showPopup(response.O_MESSAGE,function(res){
              console.log('showPopup is true');
              $rootScope.$broadcast('HOLIDAY_REFRESH');
              $ionicHistory.goBack();
            });
          }

        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('撤回失败,请检查网络');
        })
      };
      $scope.cancelHoliday = function () {
        hmsPopup.confirm('您确定要撤销该次请假申请吗?', '温馨提示', function (res) {
          if (res) {
            cancelHoliday();
          }
        });
      }


    }])


  .directive('hmsImgLoad', function () {
    return {
      restrict: 'A',
      link: function (scope, iElement, iAttrs) {
        console.error($(iElement).src);
        $(iElement).src = "build/img/myInfo/man-portrait.png";
        var obj = new Image();
        obj.src = iAttrs.hmsUrl;
        obj.onload = function () { //这个地方可以重复写入，如果错误的话，换到外面即可
          console.log('加载完了');
          $(iElement).src = obj.src;
          console.error($(iElement).src);
        }
      }
    }
  })
  .directive('haoImgLoad', function (baseConfig) {
    /*<img hao-img-load load-src="item.des" default-src="img/chrome.gif"  alt="" ng-repeat="item in imgArr">*/
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {
        loadSrc: '=',
        defaultSrc: '@',
        loadSrcStr: '@'
      }, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function ($scope, iElm, iAttrs, controller) {
        iElm.attr('src', $scope.defaultSrc);
        var imgObj = new Image();
        if ($scope.loadSrc) {
          imgObj.src = baseConfig.imgDownloadUrl+$scope.loadSrc;
        } else {
          imgObj.src = baseConfig.imgDownloadUrl+$scope.loadSrcStr;
        }
        imgObj.onload = function () {
          console.info('图片加载完了');
          iElm.attr('src', baseConfig.imgDownloadUrl+$scope.loadSrcStr);
          $scope.$apply();
        };
      }
    };
  });

