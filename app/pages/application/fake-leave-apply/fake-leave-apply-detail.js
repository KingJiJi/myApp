/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-apply-detail', {
          url: '/tab.fake-leave-apply-detail',
          params: {
            relNumber: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-apply-detail.html',
              controller: 'FakeLeaveApplyDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('FakeLeaveApplyDetailCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$ionicHistory',
    '$rootScope',
    '$timeout',
    function ($scope,
              $state,
              $stateParams,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $ionicHistory,
              $rootScope,
              $timeout) {
      var url = baseConfig.sapUrl + 'Zhrwf21_005';
      var param = {
        "ZHRWF21_005": {
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
          "ET_ZHRWF_021_S": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_SEQNR": "",
              "AWART": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": ""
            }
          },
          "I_RELNUMBER": $stateParams.relNumber
        }
      };
      hmsPopup.showLoading('请稍后');
      hmsHttp.post(url, param).then(function (response) {
        console.info(angular.toJson(response,true));
        hmsPopup.hideLoading();
        if (response.R_TYPE == 'S') {
          $scope.fakeLeaveDetail = response;
          $scope.fakeLeaveTime = [];
          $scope.fakeLeaveHistory = [];
          if (response.ET_ZHRWF_021_S.item.constructor == Array) {//销假时间段
            $scope.holidayAllDate = 0;
            angular.forEach(response.ET_ZHRWF_021_S.item, function (item, index) {
              var temp = {
                BEGDA: item.BEGDA,
                ENDDA: item.ENDDA,
                ZBEGAP: item.ZBEGAP,
                ZENDAP: item.ZENDAP,
                ABWTG: item.ABWTG
              };
              $scope.holidayAllDate += Number(temp.ABWTG);
              $scope.fakeLeaveTime.push(temp);
            })
          } else {
            $scope.holidayAllDate = 0;
            var temp = {
              BEGDA: response.ET_ZHRWF_021_S.item.BEGDA,
              ENDDA: response.ET_ZHRWF_021_S.item.ENDDA,
              ZBEGAP: response.ET_ZHRWF_021_S.item.ZBEGAP,
              ZENDAP: response.ET_ZHRWF_021_S.item.ZENDAP,
              ABWTG: response.ET_ZHRWF_021_S.item.ABWTG
            };
            $scope.holidayAllDate = Number(temp.ABWTG);
            $scope.fakeLeaveTime.push(temp);
          }
          if (response.ET_ZHREL_HISTORY.item.constructor == Array) {//审批历史
            angular.forEach(response.ET_ZHREL_HISTORY.item, function (item, index) {
              $scope.relStatus = "";
              if(item.REL_ACTION == 'SUBMIT'){
                $scope.relStatus = "提交";
              } else if(item.REL_ACTION == 'SAVE') {
                $scope.relStatus = "保存";
              } else if(item.REL_ACTION == 'REJECT') {
                $scope.relStatus = "拒绝";
              } else if(item.REL_ACTION == 'APPROVE') {
                $scope.relStatus = "同意";
              } else if(item.REL_ACTION == 'RETURN') {
                $scope.relStatus = "退回";
              } else if(item.REL_ACTION == 'CANCEL') {
                $scope.relStatus = "撤回";
              }
              var temp = {
                fakeLeaveTrackDate: item.REL_DATE + ' ' + item.REL_TIME,
                fakeLeaveTrackEmp: item.REL_ENAME,
                fakeLeaveTrackPosition: item.REL_PLSTX,
                fakeLeaveTrackStatus: $scope.relStatus,
                fakeLeaveTrackRemark: item.REMARKS
              };
              $scope.fakeLeaveHistory.push(temp);
              console.info('$scope.fakeLeaveHistory1 = '+angular.toJson($scope.fakeLeaveHistory,true));
            });
            if(response.ET_ZHRWF_021.item.NEXT_REL_ENAME != ''){//下一个审批人
              var temp1 = {
                fakeLeaveTrackDate: "",
                fakeLeaveTrackEmp: response.ET_ZHRWF_021.item.NEXT_REL_ENAME,
                fakeLeaveTrackPosition: response.ET_ZHRWF_021.item.NEXT_REL_PLSTX,
                fakeLeaveTrackStatus: '待审批',
                fakeLeaveTrackRemark: ''
              };
              $scope.fakeLeaveHistory.splice(0, 0, temp1);
            }
            console.info('$scope.fakeLeaveHistory2 = '+angular.toJson($scope.fakeLeaveHistory,true));
          } else {
            $scope.relStatus = "";
            if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'SUBMIT'){
              $scope.relStatus = "提交";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'SAVE') {
              $scope.relStatus = "保存";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'REJECT') {
              $scope.relStatus = "拒绝";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'APPROVE') {
              $scope.relStatus = "同意";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'RETURN') {
              $scope.relStatus = "退回";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'CANCEL') {
              $scope.relStatus = "撤回";
            }
            console.log($scope.relStatus);
            var temp = {
              fakeLeaveTrackDate: response.ET_ZHREL_HISTORY.item.REL_DATE + ' ' + response.ET_ZHREL_HISTORY.item.REL_TIME,
              fakeLeaveTrackEmp: response.ET_ZHREL_HISTORY.item.REL_ENAME,
              fakeLeaveTrackPosition: response.ET_ZHREL_HISTORY.item.REL_PLSTX,
              fakeLeaveTrackStatus: $scope.relStatus,
              fakeLeaveTrackRemark: response.ET_ZHREL_HISTORY.item.REMARKS
            };
            $scope.fakeLeaveHistory.push(temp);
            if(response.ET_ZHRWF_021.item.NEXT_REL_ENAME != ''){//下一个审批人
              var temp1 = {
                fakeLeaveTrackDate: "",
                fakeLeaveTrackEmp: response.ET_ZHRWF_021.item.NEXT_REL_ENAME,
                fakeLeaveTrackPosition: response.ET_ZHRWF_021.item.NEXT_REL_PLSTX,
                fakeLeaveTrackStatus: '待审批',
                fakeLeaveTrackRemark: ''
              };
              $scope.fakeLeaveHistory.splice(0, 0, temp1);
            }
          }
        } else {
          hmsPopup.showShortCenterToast(response.R_MESSAGE);
        }
      }, function (response) {
        hmsPopup.hideLoading();
        hmsPopup.showShortCenterToast('加载失败,请检查网络');
      });

     var cancelFakeLeave = function(relNumber) {//撤回按钮
        var url = baseConfig.sapUrl + 'Zhrwf21_002';
        var param = {
          "ZHRWF21_002": {
            "ET_ZHRWF_021_S": {
              "item": ""
            },
            "I_CODE": "CANCEL",
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZHRWF_021": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": relNumber,
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
          }
        };
        hmsPopup.showLoading('请稍后');
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          if (response.O_TYPE == 'S') {
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            },200);
            $rootScope.$broadcast('FAKELEASE_REFRESH');
            $ionicHistory.goBack();
          } else {
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
            $rootScope.$broadcast('FAKELEASE_REFRESH');
            $ionicHistory.goBack();
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('调用失败,请检查网络');
        })
      };
      $scope.cancelFakeLeaveConfirm = function(relNumber){
        hmsPopup.confirm('您确定要撤销该次销假申请吗?','温馨提示',function(res){
          if(res){
            cancelFakeLeave(relNumber);
          }
        })
      }
    }]);

