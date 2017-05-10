/**
 * Created by utopia_song on 16/9/7.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.approval-center-detail', {
          url: '/tab.approval-center-detail',
          params: {
            approvalList: "",
            approvalStatus: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/detail/approval-center-detail.html',
              controller: 'approvalCenterDetailCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('approvalCenterDetailCtrl', [
    '$scope',
    'hmsPopup',
    'workFlowListService',
    '$timeout',
    '$stateParams',
    'hmsHttp',
    'baseConfig',
    '$rootScope',
    '$ionicHistory',
    function ($scope,
              hmsPopup,
              workFlowListService,
              $timeout,
              $stateParams,
              hmsHttp,
              baseConfig,
              $rootScope,
              $ionicHistory) {
      $scope.approvalList = $stateParams.approvalList;
      console.log("22222222222222222222", angular.toJson($scope.approvalList));
      var approvalId = $scope.approvalList.id;
      $scope.approvalStatus = $stateParams.approvalStatus;
      $scope.approval = {
        remarks: ""
      };
      var getTodoDetail = function () {
        hmsPopup.showLoading("请稍后");
        var success = function (response) {
          hmsPopup.hideLoading();
          if (response.ET_ZHRWF_001.item.ICNUM_TYPE == '1') {
            $scope.icnumTpye = "身份证号";
          } else {
            $scope.icnumTpye = "其他证件号";
          }
          $scope.icnum = response.ET_ZHRWF_001.item.ICNUM;
          $scope.contractCompant = response.ET_ZHRWF_001.item.ZQYDWWB;
          $scope.approvalDetailStatus = response.ET_ZHRWF_001.item.REL_STATUS;
          $scope.detailList1 = [
            {
              iconLeft: "build/img/application/approval-center-detail/sector.png",
              itemLeft: "板块",
              itemLeftValue: response.ET_ZHRWF_001.item.NAME1,
              iconRight: "build/img/application/approval-center-detail/department.png",
              itemRight: "部门",
              itemRightValue: response.ET_ZHRWF_001.item.ORGTX
            },
            {
              iconLeft: "build/img/application/approval-center-detail/position.png",
              itemLeft: "职位",
              itemLeftValue: response.ET_ZHRWF_001.item.PLSTX,
              iconRight: "build/img/application/approval-center-detail/rank.png",
              itemRight: "职级",
              itemRightValue: response.ET_ZHRWF_001.item.ATX
            },
            {
              iconLeft: "build/img/application/approval-center-detail/work-city.png",
              itemLeft: "工作城市",
              itemLeftValue: response.ET_ZHRWF_001.item.ZGZCSWB,
              iconRight: "build/img/application/approval-center-detail/entry-position.png",
              itemRight: "工作地址",
              itemRightValue: response.ET_ZHRWF_001.item.ZGZDZ
            },
            {
              iconLeft: "build/img/application/approval-center-detail/hire-model.png",
              itemLeft: "聘用形式",
              itemLeftValue: response.ET_ZHRWF_001.item.PTEXT,
              iconRight: "build/img/application/approval-center-detail/apply-way.png",
              itemRight: "申请方式",
              itemRightValue: response.ET_ZHRWF_001.item.REQ_TYPE
            },
            {
              iconLeft: "build/img/application/approval-center-detail/entrant-time.png",
              itemLeft: "拟入职时间",
              itemLeftValue: response.ET_ZHRWF_001.item.ENTR_DATE,
              iconRight: "build/img/application/approval-center-detail/white.png",
              itemRight: "",
              itemRightValue: ""
            }
          ];
          $scope.detailList2 = [
            {
              iconLeft: "build/img/application/approval-center-detail/basic-salary.png",
              itemLeft: "基本工资",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE1)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/station-allowance.png",
              itemRight: "岗位津贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE2)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/lunch-allowance.png",
              itemLeft: "午餐补贴",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE3)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/other-allowance.png",
              itemRight: "其他补贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE4)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/total.png",
              itemLeft: "合计值",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE1) + parseInt(response.ET_ZHRWF_001.item.PR_VALUE2) + parseInt(response.ET_ZHRWF_001.item.PR_VALUE3) + parseInt(response.ET_ZHRWF_001.item.PR_VALUE4)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/white.png",
              itemRight: "",
              itemRightValue: ""
            }
          ];
          $scope.detailList3 = [
            {
              iconLeft: "build/img/application/approval-center-detail/basic-salary.png",
              itemLeft: "基本工资",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE1)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/station-allowance.png",
              itemRight: "岗位津贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE2)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/lunch-allowance.png",
              itemLeft: "午餐补贴",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE3)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/other-allowance.png",
              itemRight: "其他补贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE4)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/total.png",
              itemLeft: "合计值",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE1) + parseInt(response.ET_ZHRWF_001.item.EX_VALUE2) + parseInt(response.ET_ZHRWF_001.item.EX_VALUE3) + parseInt(response.ET_ZHRWF_001.item.EX_VALUE4)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/white.png",
              itemRight: "",
              itemRightValue: ""
            }
          ];
          $scope.detailList4 = [
            {
              iconLeft: "build/img/application/approval-center-detail/name.png",
              itemLeft: "姓名",
              itemLeftValue: response.ET_ZHRWF_001.item.ENAME,
              iconRight: "build/img/application/approval-center-detail/gender.png",
              itemRight: "性别",
              itemRightValue: response.ET_ZHRWF_001.item.GESCH
            }
          ];
          $scope.rel_history = [];
          if (response.ET_REL_HISTORY != "") {
            if (response.ET_REL_HISTORY.item.constructor == Array) {

              for (var i = 0; i < response.ET_REL_HISTORY.item.length; i++) {
                var item1 = response.ET_REL_HISTORY.item[i];
                var temp1 = {
                  REL_DATE: item1.REL_DATE,
                  REL_TIME: item1.REL_TIME,
                  REL_ENAME: item1.REL_ENAME,
                  REL_PLSTX: item1.REL_PLSTX,
                  REL_ACTION: item1.REL_ACTION,
                  REMARKS: item1.REMARKS
                };
                $scope.rel_history.push(temp1);
              }
              $scope.remark = response.ET_REL_HISTORY.item[0].REMARKS;
              if ($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_001.item.NEXT_REL_ENAME != '') {
                var temp2 = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_001.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_001.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp2);
              }
            } else {
              $scope.remark = response.ET_REL_HISTORY.item.REMARKS;
              var item2 = response.ET_REL_HISTORY.item;
              var temp2 = {
                REL_DATE: item2.REL_DATE,
                REL_TIME: item2.REL_TIME,
                REL_ENAME: item2.REL_ENAME,
                REL_PLSTX: item2.REL_PLSTX,
                REL_ACTION: item2.REL_ACTION,
                REMARKS: item2.REMARKS
              };
              $scope.rel_history.push(temp2);
              if ($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_001.item.NEXT_REL_ENAME != '') {
                var temp2 = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_001.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_001.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp2);
              }
            }
          } else {
            $scope.remark = "";
          }

          if ($scope.remark == '') {
            $scope.remarkHight = {
              height: (55 + 'px')
            }
          }
        };
        var error = function () {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        };
        $timeout(function () {
          workFlowListService.getTodoDetail(success, error, approvalId);
        }, 0)
      };
      getTodoDetail();
      var approvalCommit = function (type) {
        var params = {
          "ZHRWF01_003": {
            "ET_ZHRWF_001": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "01",
                "REL_NUMBER": approvalId,
                "ENAME": "",
                "ICNUM": "",
                "ICNUM_TYPE": "",
                "GESCH": "",
                "REQ_TYPE": "",
                "CREAT_BY": "",
                "MASSN": "",
                "MNTXT": "",
                "PERNR_A": "",
                "MASSG": "",
                "MGTXT": "",
                "ENTR_DATE": "",
                "ZQYDW": "",
                "ZQYDWWB": "",
                "ZGZDZ": "",
                "PERSK": "",
                "PTEXT": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "PR_VALUE1": "",
                "PR_VALUE2": "",
                "PR_VALUE3": "",
                "PR_VALUE4": "",
                "EX_VALUE1": "",
                "EX_VALUE2": "",
                "EX_VALUE3": "",
                "EX_VALUE4": "",
                "WAERS": "",
                "REMARKS": $scope.approval.remarks,
                "REL_STATUS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
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
            "I_CODE": type,
            "I_USRID": window.localStorage.empno
          }
        };
        var url = baseConfig.sapUrl + 'Zhrwf01003';
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, params).then(function (response) {
          hmsPopup.hideLoading();
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast("APPROVAL_SUCCESS");
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast("数据处理成功");
            }, 200)
          } else {
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
          }
        }, function (response) {
          hmsPopup.hideLoading();
        });
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //})
      };
      $scope.approvalCommitConfirm = function (type) {
        hmsPopup.confirm('您确定要提交审批结果吗?', '温馨提示', function (res) {
          if (res) {
            approvalCommit(type);
          }
        });
      };


    }]);
