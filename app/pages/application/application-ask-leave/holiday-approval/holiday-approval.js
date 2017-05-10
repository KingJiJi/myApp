/**
 * Created by utopia_song on 16/11/7.
 */

angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-approval', {
          url: '/holiday-approval',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-approval/holiday-approval.html',
              controller: 'holidayApprovalCtrl'
            }
          },
          params:{
            rel_number:'',
            approvalStatus:''
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayApprovalCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    '$stateParams',
    '$rootScope',
    '$timeout',
    '$ionicPopup',
    'sweet',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              hmsHttp,
              $stateParams,
              $rootScope,
              $timeout,
              $ionicPopup,
              sweet) {


      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      $scope.picsArr = [];
      $scope.approvalStatus = $stateParams.approvalStatus;
      var holidayApprovalUrl   = baseConfig.sapUrl+'Zhrwf20_006';
      var holidayApprovalParam  = {
        "ZHRWF20_006":{
          "ET_ZHREL_HISTORY":{
            "item":{
              "MANDT":"",
              "WF_TYPE":"",
              "REL_NUMBER":"",
              "REL_DATE":"",
              "REL_TIME":"",
              "REL_ID":"",
              "REL_ENAME":"",
              "REL_PLANS":"",
              "REL_PLSTX":"",
              "REL_STEP":"",
              "REL_STATUS":"",
              "REL_ACTION":"",
              "REMARKS":""
            }
          },
          "ET_ZHRWF_020":{
            "item":{
              "MANDT":"",
              "WF_TYPE":"",
              "REL_NUMBER":"",
              "PERNR":"",
              "ENAME":"",
              "PERSA":"",
              "NAME1":"",
              "ORGEH":"",
              "ORGTX":"",
              "PLANS":"",
              "PLSTX":"",
              "ANSVH":"",
              "ATX":"",
              "AWART":"",
              "ZANZHL1":"",
              "ZANZHL2":"",
              "ZANZHL3":"",
              "ZANZHL4":"",
              "ZXJBJ":"",
              "REL_STATUS":"",
              "BEGDA":"",
              "ZBEGAP":"",
              "ENDDA":"",
              "ZENDAP":"",
              "ABWTG":"",
              "ZFLAG_ATT":"",
              "ZPHOTO":"",
              "ZJTSY":"",
              "ZAPPR":"",
              "REMARKS":"",
              "CREATE_ID":"",
              "CREATE_ENAME":"",
              "CREATE_DATE":"",
              "CREATE_TIME":"",
              "CREATE_PLANS":"",
              "CREATE_PLSTX":"",
              "NOW_REL_STEP":"",
              "NOW_REL_ID":"",
              "NOW_REL_ENAME":"",
              "NOW_REL_DATE":"",
              "NOW_REL_TIME":"",
              "NOW_REL_PLANS":"",
              "NOW_REL_PLSTX":"",
              "NEXT_REL_STEP":"",
              "NEXT_REL_ID":"",
              "NEXT_REL_ENAME":"",
              "NEXT_REL_PLANS":"",
              "NEXT_REL_PLSTX":"",
              "CHANGE_ID":"",
              "CHANGE_ENAME":"",
              "CHANGE_PLANS":"",
              "CHANGE_PLSTX":"",
              "CHANGE_DATE":"",
              "CHANGE_TIME":"",
              "REL_FLAG_END":""
            }
          },
          "I_RELNUMBER":$stateParams.rel_number
        }
      };
      $scope.approvalData = {
        'remark':''
      };

      var cancelHolidayUrl = baseConfig.sapUrl+'Zhrwf20_007';
      var cancelHolidayParam = {
        "ZHRWF20_007": {
          "I_CODE": 'CANCEL',
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_ZHRWF_020": {
            "MANDT": "",
            "WF_TYPE": "",
            "REL_NUMBER": $stateParams.rel_number,
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
      $scope.holidayApproval = {};
      $scope.rel_history = [];
      $scope.showMyBackdrop = false;  //是否显示背景
      $scope.showImg = false; //图片预览是否显示
      $scope.imgUrl = '';
      $scope.picsArr = [];

      /**
       * 得到请假审批明细
       */
      function getHolidayApprovalDetail() {
        hmsPopup.showLoading("请稍后");
        console.log('baseConfig.imgDownloadUrl'+baseConfig.imgDownloadUrl);
        hmsHttp.post(holidayApprovalUrl,holidayApprovalParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假明细');
          console.info(angular.toJson(response,true));
          var picStrings = response.ET_ZHRWF_020.item.ZPHOTO;
          $scope.picsArr = picStrings.split(',');
          angular.forEach($scope.picsArr,function (item,index) {
            if(item == '' || item == undefined){
              $scope.picsArr.splice(index,1);
            }
          });
          console.log('$scope.picsArr'+angular.toJson($scope.picsArr));
          $scope.holidayApproval.holidayType = response.ET_ZHRWF_020.item.AWART;//请假类别
          $scope.holidayApproval.rel_number = response.ET_ZHRWF_020.item.REL_NUMBER;//单据号
          $scope.holidayApproval.submitPerson = response.ET_ZHRWF_020.item.CREATE_ENAME;//提交人
          $scope.holidayApproval.plate = response.ET_ZHRWF_020.item.NAME1;//板块
          $scope.holidayApproval.department = response.ET_ZHRWF_020.item.ORGTX;//所在部门
          $scope.holidayApproval.jobDescription = response.ET_ZHRWF_020.item.PLSTX;//职位描述
          $scope.holidayApproval.entryTime = response.ET_ZHRWF_020.item.ZRZRQ;//入职时间
          $scope.holidayApproval.approveStatus = response.ET_ZHRWF_020.item.REL_STATUS;//审批状态
          $scope.holidayApproval.holidayDays = response.ET_ZHRWF_020.item.ABWTG;//请假天数
          $scope.holidayApproval.beginDate = response.ET_ZHRWF_020.item.BEGDA;//请假开始日期
          $scope.holidayApproval.endDate = response.ET_ZHRWF_020.item.ENDDA;//请假结束日期
          $scope.holidayApproval.reason = response.ET_ZHRWF_020.item.ZJTSY;//具体事由
          $scope.holidayApproval.beginFlag = response.ET_ZHRWF_020.item.ZBEGAP;//开始时间标记
          $scope.holidayApproval.endFlag = response.ET_ZHRWF_020.item.ZENDAP;//结束时间标记
          $scope.holidayApproval.approvalDetailStatus = response.ET_ZHRWF_020.item.REL_STATUS;//单据状态
          if(response.ET_ZHREL_HISTORY !==''){ //有审批记录的情况
            if(response.ET_ZHREL_HISTORY.item.constructor == Array){
              var a = response.ET_ZHREL_HISTORY.item;
              angular.forEach(a,function (item,index) {
                var temp  = {
                  REL_DATE:item.REL_DATE,
                  REL_TIME:item.REL_TIME,
                  REL_ENAME:item.REL_ENAME,
                  REL_PLSTX:item.REL_PLSTX,
                  REL_ACTION:item.REL_ACTION,
                  REMARKS:item.REMARKS
                };
                $scope.rel_history.push(temp);
              });
              if($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
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
            }else{
              var temp = {
                REL_DATE:response.ET_ZHREL_HISTORY.item.REL_DATE,
                REL_TIME:response.ET_ZHREL_HISTORY.item.REL_TIME,
                REL_ENAME:response.ET_ZHREL_HISTORY.item.REL_ENAME,
                REL_PLSTX:response.ET_ZHREL_HISTORY.item.REL_PLSTX,
                REL_ACTION:response.ET_ZHREL_HISTORY.item.REL_ACTION,
                REMARKS:response.ET_ZHREL_HISTORY.item.REMARKS
              };
              $scope.rel_history.push(temp);
              if($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
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
        },function (response) {

        })
      }
      getHolidayApprovalDetail();

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

      /**
       * 审批同意拒绝
       * @param flag
         */

      var examineApproval = function (flag) {
        var examineApprovalUrl = baseConfig.sapUrl+'Zhrwf20_007';
        var examineApprovalParam = {
          "ZHRWF20_007": {
            "I_CODE": '',
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZHRWF_020": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": $stateParams.rel_number,
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
              "REMARKS": $scope.approvalData.remark,//审批意见
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
        if(flag == 'approval'){
          examineApprovalParam.ZHRWF20_007.I_CODE = 'APPROVE';
        }else{
          examineApprovalParam.ZHRWF20_007.I_CODE = 'REJECT';
        }
        hmsPopup.showLoading('请稍等...');
      hmsHttp.post(examineApprovalUrl,examineApprovalParam).then(function (response) {
        hmsPopup.hideLoading();
        if(response.O_TYPE == 'S'){
          $rootScope.$broadcast('APPROVAL_SUCCESS');
          $ionicHistory.goBack();
          $timeout(function () {
            hmsPopup.showShortCenterToast('审批成功');
          })
        }else{
          hmsPopup.showPopup(response.O_MESSAGE,function(res){
              console.log('showPopup is true');
              $rootScope.$broadcast('APPROVAL_SUCCESS');
              $ionicHistory.goBack();
          });
        }
      },function(response){
        hmsPopup.hideLoading();
        hmsPopup.showShortCenterToast('审批失败,请检查网络');
      })
      };
      $scope.examineApprovalConfirm  = function(flag){
        hmsPopup.confirm('您确定要提交审批结果吗?', '温馨提示', function (res) {
          if (res) {
            examineApproval(flag);
          }
        });
      };
      /**
       * 撤回休假申请
       * @type function
       */
      var cancelHoliday = function () {
        hmsPopup.showLoading('请稍等...');
        hmsHttp.post(cancelHolidayUrl, cancelHolidayParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('撤回结果');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast('CANCEL_SUCCESS');
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            })
          } else {
            hmsPopup.showPopup(response.O_MESSAGE,function(res){
              $rootScope.$broadcast('CANCEL_SUCCESS');
              $ionicHistory.goBack();
            });
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('撤回失败,请检查网络');
        })
      };
      $scope.cancelHolidayConfirm = function(){
        hmsPopup.confirm('您确定要撤销该次请假申请吗?', '温馨提示', function (res) {
          if (res) {
            cancelHoliday();
          }
        });
      }
    }]);

