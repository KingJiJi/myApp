/**
 * Created by utopia_song on 16/9/6.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.approval-center', {
          url: '/tab.approval-center',
          params: {
            flag: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/approval-center.html',
              controller: 'WorkFLowListCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('WorkFLowListCtrl', [
    '$scope',
    '$state',
    'workFlowListService',
    '$timeout',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$stateParams',
    function ($scope,
              $state,
              workFlowListService,
              $timeout,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $stateParams) {
      $scope.list = [];
      $scope.loadMoreDataFlag = false;
      $scope.noApprovalFlag = false;
      $scope.UpFlag = $stateParams.flag;
      var nowPage = 0;
      var nowPage1 = 0;
      var nowPage2 = 0;
      var pageSize = 10;
      var workflowType = '名称';
      var workflowTime = '提交时间';
      var workflowPerson = '提交人';
      $scope.approvalStatus = 'Untreated';
      $scope.listStatus = {
        todo: {
          selected: true
        },
        done: {
          selected: false
        },
        mine: {
          selected: false
        }
      };
      function getUntreatedList() {//未处理
        var url = baseConfig.sapUrl + 'Zhrwf00';
        var param = {
          "ZHRWF00": {
            "FLAG": "Y",
            "UNAME": window.localStorage.empno.toUpperCase(),
            "PAGE": nowPage,
            "PERPAGE": pageSize,
            "ALL": "",
            "T_TODOLIST": {
              "item": {
                "REL_NUMBER": "",
                "WF_TYPE": "",
                "REL_DATE": "",
                "REL_BY": "",
                "CONTENT": "",
                "REL_STATUS": ""
              }
            }
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          console.group('未处理list');
          console.info(angular.toJson(response,true));
          hmsPopup.hideLoading();
          if (response.T_TODOLIST !== "") {
            if (response.T_TODOLIST.item.constructor == Array) {
              if (response.T_TODOLIST.item.length > 0) {
                var list = response.T_TODOLIST.item;
                angular.forEach(list, function (item, index) {
                  var temp = {
                    id: item.REL_NUMBER,
                    title1: '',
                    typeValue: item.CONTENT.replace('\\n',''),
                    submit: workflowPerson,
                    submitPerson: item.REL_BY,
                    sendTime: workflowTime,
                    sendTimeValue: item.REL_DATE,
                    icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                    status: item.REL_STATUS,
                    WF_TYPE:item.WF_TYPE
                  };
                  if(item.WF_TYPE == '20'){ //请假申请的typeCode
                    temp.title1 = '请假审批';
                    temp.icon = 'build/img/application/approval-center-detail/leave-apply.png';
                  }
                  if(item.WF_TYPE == '01'){
                    temp.title1 = '录用审批';//录用申请申请的typeCode
                  }
                  if(item.WF_TYPE == '21'){
                    temp.title1 = '销假审批';
                    temp.icon = 'build/img/application/approval-center-detail/back-leave.png';
                  }
                  if(item.WF_TYPE == '04'){
                    temp.title1 = '转正审批';//销假申请的typeCode
                  }
                  $scope.list.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (response.T_TODOLIST.item.length < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              }
            } else {
              var temp1 = {
                id: response.T_TODOLIST.item.REL_NUMBER,
                title1: '',
                typeValue: response.T_TODOLIST.item.CONTENT.replace('\\n',''),
                submit: workflowPerson,
                submitPerson: response.T_TODOLIST.item.REL_BY,
                sendTime: workflowTime,
                sendTimeValue: response.T_TODOLIST.item.REL_DATE,
                icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                status: response.T_TODOLIST.item.REL_STATUS,
                WF_TYPE:response.T_TODOLIST.item.WF_TYPE
              };
              if(response.T_TODOLIST.item.WF_TYPE == '20'){ //请假申请的typeCode
                temp1.title1 = '请假审批';
                temp1.icon = 'build/img/application/approval-center-detail/leave-apply.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '01'){
                temp1.title1 = '录用审批';//录用申请申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '21'){
                temp1.title1 = '销假审批';
                temp1.icon = 'build/img/application/approval-center-detail/back-leave.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '04'){
                temp1.title1 = '转正审批';//销假申请的typeCode
              }
              $scope.list.push(temp1);
              $scope.loadMoreDataFlag = false;
            }
          } else {
            $scope.loadMoreDataFlag = false;
            if(nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(response){
            hmsPopup.hideLoading();
            hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        });
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //  hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        //});
      }

      function getProcessedList() {//已处理
        var url = baseConfig.sapUrl + 'Zhrwf00001';
        var param = {
          "ZHRWF00_001": {
            "FLAG": "Y",
            "UNAME": window.localStorage.empno.toUpperCase(),
            "PAGE": nowPage1,
            "PERPAGE": pageSize,
            "ALL": "",
            "T_TODOLIST": {
              "item": {
                "REL_NUMBER": "",
                "WF_TYPE": "",
                "REL_DATE": "",
                "REL_BY": "",
                "CONTENT": "",
                "REL_STATUS": ""
              }
            }
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          console.group('已处理list');
          console.info(angular.toJson(response,true));
          hmsPopup.hideLoading();
          if (response.T_TODOLIST !== "") {
            if (response.T_TODOLIST.item.constructor == Array) {
              if (response.T_TODOLIST.item.length > 0) {
                var list = response.T_TODOLIST.item;
                angular.forEach(list, function (item, index) {
                  var temp = {
                    id: item.REL_NUMBER,
                    title1: '',
                    type: workflowType,
                    typeValue: item.CONTENT.replace('\\n',''),
                    submit: workflowPerson,
                    submitPerson: item.REL_BY,
                    sendTime: workflowTime,
                    sendTimeValue: item.REL_DATE,
                    icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                    status: item.REL_STATUS,
                    WF_TYPE:item.WF_TYPE
                  };
                  if(item.WF_TYPE == '20'){ //请假申请的typeCode
                    temp.title1 = '请假审批';
                    temp.icon = 'build/img/application/approval-center-detail/leave-apply.png';
                  }
                  if(item.WF_TYPE == '01'){
                    temp.title1 = '录用审批';//录用申请申请的typeCode
                  }
                  if(item.WF_TYPE == '21'){
                    temp.title1 = '销假审批';//销假申请的typeCode
                    temp.icon = 'build/img/application/approval-center-detail/back-leave.png';
                  }
                  if(item.WF_TYPE == '04'){
                    temp.title1 = '转正审批';//销假申请的typeCode
                  }
                  $scope.list.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (response.T_TODOLIST.item.length < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              }
            } else {
              var temp1 = {
                id: response.T_TODOLIST.item.REL_NUMBER,
                title1: '',
                type: workflowType,
                typeValue: response.T_TODOLIST.item.CONTENT.replace('\\n',''),
                submit: workflowPerson,
                submitPerson: response.T_TODOLIST.item.REL_BY,
                sendTime: workflowTime,
                sendTimeValue: response.T_TODOLIST.item.REL_DATE,
                icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                status: response.T_TODOLIST.item.REL_STATUS,
                WF_TYPE:response.T_TODOLIST.item.WF_TYPE
              };
              if(response.T_TODOLIST.item.WF_TYPE == '20'){ //请假申请的typeCode
                temp1.title1 = '请假审批';
                temp1.icon = 'build/img/application/approval-center-detail/leave-apply.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '01'){
                temp1.title1 = '录用审批';//录用申请申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '21'){
                temp1.title1 = '销假审批';
                temp1.icon = 'build/img/application/approval-center-detail/back-leave.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '04'){
                temp1.title1 = '转正审批';
              }
              $scope.list.push(temp1);
              $scope.loadMoreDataFlag = false;
            }
          } else {
            $scope.loadMoreDataFlag = false;
            if(nowPage1 == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(response){
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        });
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //  hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        //});
      }

      function getMineApprovalList() {//我的
        var url = baseConfig.sapUrl + 'Zhrwf00003';
        var param = {
          "ZHRWF00_003": {
            "FLAG": "Y",
            "UNAME": window.localStorage.empno.toUpperCase(),
            "PAGE": nowPage2,
            "PERPAGE": pageSize,
            "ALL": "",
            "T_TODOLIST": {
              "item": {
                "REL_NUMBER": "",
                "WF_TYPE": "",
                "REL_DATE": "",
                "REL_BY": "",
                "CONTENT": "",
                "REL_STATUS": ""
              }
            }
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          if (response.T_TODOLIST !== "") {
            if (response.T_TODOLIST.item.constructor == Array) {
              if (response.T_TODOLIST.item.length > 0) {
                var list = response.T_TODOLIST.item;
                angular.forEach(list, function (item, index) {
                  var temp = {
                    id: item.REL_NUMBER,
                    title1: '',
                    type: workflowType,
                    typeValue: item.CONTENT.replace('\\n',''),
                    submit: workflowPerson,
                    submitPerson: item.REL_BY,
                    sendTime: workflowTime,
                    sendTimeValue: item.REL_DATE,
                    icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                    status: item.REL_STATUS,
                    WF_TYPE:item.WF_TYPE
                  };
                  if(item.WF_TYPE == '20'){ //请假申请的typeCode
                    temp.title1 = '请假申请';
                    temp.icon = 'build/img/application/approval-center-detail/leave-apply.png';
                  }
                  if(item.WF_TYPE == '01'){
                    temp.title1 = '录用审批';//录用申请申请的typeCode
                  }
                  if(item.WF_TYPE == '21'){
                    temp.title1 = '销假申请';//销假申请的typeCode
                    temp.icon = 'build/img/application/approval-center-detail/back-leave.png';
                  }
                  if(item.WF_TYPE == '04'){
                    temp.title1 = '转正审批';//销假申请的typeCode
                  }
                  if(item.WF_TYPE == '08'){
                    temp.title1 = '证明审批';//证明申请的typeCode
                  }
                  $scope.list.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (response.T_TODOLIST.item.length < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              }
            } else {
              var temp1 = {
                id: response.T_TODOLIST.item.REL_NUMBER,
                title1: '录用审批',
                type: workflowType,
                typeValue: response.T_TODOLIST.item.CONTENT.replace('\\n',''),
                submit: workflowPerson,
                submitPerson: response.T_TODOLIST.item.REL_BY,
                sendTime: workflowTime,
                sendTimeValue: response.T_TODOLIST.item.REL_DATE,
                icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                status: response.T_TODOLIST.item.REL_STATUS,
                WF_TYPE:response.T_TODOLIST.item.WF_TYPE
              };
              if(response.T_TODOLIST.item.WF_TYPE == '20'){ //请假申请的typeCode
                temp1.title1 = '请假申请';
                temp1.icon = 'build/img/application/approval-center-detail/leave-apply.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '01'){
                temp1.title1 = '录用审批';//录用申请申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '21'){
                temp1.title1 = '销假申请';//销假申请的typeCode
                temp1.icon = 'build/img/application/approval-center-detail/back-leave.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '04'){
                temp1.title1 = '转正审批';//转正申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '08'){
                temp1.title1 = '证明审批';//证明申请的typeCode
              }
              $scope.list.push(temp1);
              $scope.loadMoreDataFlag = false;
            }
          } else {
            $scope.loadMoreDataFlag = false;
            if(nowPage2 == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(response){
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        })
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //  hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        //});
      }

      $scope.fetchTodoList = function () {
        $scope.listStatus = {
          todo: {
            selected: true
          },
          done: {
            selected: false
          },
          mine: {
            selected: false
          }
        };
        $scope.approvalStatus = "Untreated";
        $scope.list = [];
        nowPage = 0;
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getUntreatedList();
        $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
      };
      $scope.fetchDoneList = function () {
        $scope.listStatus = {
          todo: {
            selected: false
          },
          done: {
            selected: true
          },
          mine: {
            selected: false
          }
        };
        $scope.approvalStatus = "Processed";
        $scope.list = [];
        nowPage1 = 0;
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getProcessedList();
        $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
      };
      $scope.fetchMineList = function () {
        $scope.listStatus = {
          todo: {
            selected: false
          },
          done: {
            selected: false
          },
          mine: {
            selected: true
          }
        };
        $scope.approvalStatus = "mineApproval";
        $scope.list = [];
        nowPage2 = 0;
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getMineApprovalList();
        $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
      };
      $scope.refresh = function () {//下拉刷新
        $scope.list = [];
        $scope.noApprovalFlag = false;
        if ($scope.listStatus.todo.selected == true) {
          nowPage = 0;
          getUntreatedList();
        } else if ($scope.listStatus.done.selected == true) {
          nowPage1 = 0;
          getProcessedList();
        }  else if ($scope.listStatus.mine.selected == true) {
          nowPage2 = 0;
          getMineApprovalList();
        }
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      $scope.loadMoreData = function () {//上拉加载
        if ($scope.listStatus.todo.selected == true) {
          nowPage++;
          getUntreatedList();
        } else if ($scope.listStatus.done.selected == true) {
          nowPage1++;
          getProcessedList();
        } else if ($scope.listStatus.mine.selected == true) {
          nowPage2++;
          getMineApprovalList();
        }
      };

      if($scope.UpFlag == 'applyCenter') {//从申请中心进入我的申请
        $scope.fetchMineList();
      } else {
        getUntreatedList();
      }
      $scope.goCenterDetail = function (approvalList) {
        console.info(angular.toJson(approvalList,true));
        if ($scope.listStatus.todo.selected == true) {
          $scope.approvalStatus = "Untreated";
        } else if ($scope.listStatus.done.selected == true) {
          $scope.approvalStatus = "Processed";
        } else if ($scope.listStatus.mine.selected == true) {
          $scope.approvalStatus = "mineApproval";
        }
        if(approvalList.WF_TYPE == '01'){
          $state.go('tab.approval-center-detail', {approvalList: approvalList, approvalStatus: $scope.approvalStatus});
        }
        if(approvalList.WF_TYPE == '20'){
          $state.go('tab.holiday-approval', {rel_number: approvalList.id,approvalStatus: $scope.approvalStatus});
        }
        if(approvalList.WF_TYPE == '21'){
          $state.go('tab.fake-leave-approval-detail', {receiptNum: approvalList.id,approvalStatus: $scope.approvalStatus});
        }
        if(approvalList.WF_TYPE == '04'){
          $state.go('tab.positive-approval-detail', {rel_number: approvalList.id,approvalStatus: $scope.approvalStatus});
        }
      };

      $rootScope.$on("APPROVAL_SUCCESS",function(){//审批完成后 返回列表页面
        $scope.list = [];
        $scope.loadMoreDataFlag = false;
        nowPage = 0;
        getUntreatedList();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
        },200);
      });

      $rootScope.$on("CANCEL_SUCCESS",function(){//审批完成后 返回列表页面
        $scope.list = [];
        $scope.loadMoreDataFlag = false;
        nowPage2 = 0;
        getMineApprovalList();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
        },200);
      });
    }])


  /**
   * @author huanghao
   * @desc 一行一行的
   * charge-line-key ===> 左边的key
   * charge-line-value ===> 右边的value
   * col-left ====> 左边的key所占的行比例
   * col-right ====> 右边的value所占的比例
   */
  .directive('hmsChargeLine',function () {
    return{
      restrict: 'EA',
      replace: true,
      scope: {
        name: '=chargeLineKey',
        desc: '=chargeLineValue',
        colLeft: '@',
        colRight: '@'
      },
      template: '<div class="row">'+
      '<div class="col col-{{ colLeft }}" style="text-align: right">'+
      '<span>{{ name }}</span>&nbsp;:'+
      '</div>'+
      '<div class="col col-{{ colRight }}" style="text-align: left">'+
      '<span>{{ desc }}</span>'+
      '</div>'+
      '</div>',
      controller: ["$scope", function ($scope) {
      }],
      link: function (scope, element, attrs) {

      }
    }
  });

