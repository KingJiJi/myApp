/**
 * Created by gusenlin on 2016/6/12.
 */
"use strict";
HmsModule.directive('hmsWorkflowList', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      title: '=workflowTitle',
      icon: '=workflowIcon',
      typeValue: '=workflowTypeValue',
      node: '=workflowNode',
      nodeValue: '=workflowNodeValue',
      submit: '=workflowSubmit',
      submitPerson: '=workflowSubmitPerson'
    },

    template: '<a class="workflow-list-item">' +
    '<div class="workflow-list-logo">' +
    '<img ng-src="{{icon}}"/>' +
    '</div>' +
    '<div class="workflow-list-header">{{title}}</div>' +
    '<div class="workflow-list-content">' +
    '<div class="row no-padding" style="padding-left: 20px">' +
    '<div class="col col-90 no-padding">' +
    '<div class="row no-padding" style="margin-top: 10px"> ' +
    '<div class="col no-padding color-content">{{typeValue}}</div>' +
      //'<div class="col col-67 no-padding color-content">{{typeValue}}</div>' +
    '</div>' +
    '<div class="row no-padding" style="margin-top: 5px">' +
    '<div class="col no-padding color-content">{{submit}}：{{submitPerson}}</div>' +
      //'<div class="col col-67 no-padding color-content">{{submitPerson}}</div>' +
    '</div>' +
    '<div class="row no-padding" style="margin-top: 5px">' +
    '<div class="col no-padding color-content">{{node}}：{{nodeValue}}</div>' +
      //'<div class="col col-67 no-padding color-content">{{nodeValue}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="col col-10 no-padding col-center workflow-list-select">' +
    '<img ng-src="build/img/contact/arrow.png"/>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>',
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs) {

    }
  }
});

HmsModule.directive('hmsApprovalHistory', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      time: '=approvalTime',
      person: '=approver',
      position: '=approverPosition',
      status: '=approvalStatus',
      remark: '=approvalRemark',
      annex: '=approvalAnnex',
      index: '=index',
      extent: '=length'
    },

    template: '<div class="row testRow" style="height: 100%;">' +
    '<div class="col" style="padding-left: 40px;">' +
    '<div class="red-line" ng-if="index == 0"></div>' +
    '<div class="white-line" ng-if="index != 0"></div>' +
    '<div class="row message-item-time" ng-if="time">' +
    '<div class=" message-date">{{time}}</div>' +
    '</div>' +
    '<div class="row message-item">' +
    '<div class="col col-70 message-div" style="align-self: center; padding: 0">' +
    '<div class="message-content"> {{person}}&nbsp;&nbsp;({{position}})</div>' +
    '</div>' +
    '<div class="col col-30 message-div">' +
    '<div class="align-center" ng-if="code == 0" style="color: #4FAAFF">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 1" style="color: #FF8923">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 2" style="color: #EB7876">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 3" style="color: #E70B18">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 4" style="color: #76D9AB">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 5" style="color: #A5C261">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 6" style="color: #9B9B9B">{{status}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="row message-item">' +
    '<div class="message-div">' +
    '<div class="approve-remark">{{remark}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="row message-item" style="margin-top: 8px" ng-if="annex">' +
    '<div class="message-div" style="color: #2389FD">附件：</div>' +
    '<div ng-repeat="img in annex">' +
    '<img style="width: 56px; height: 56px; margin-top: 5px; margin-left: 10px" ng-src="{{img.url}}"/>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>',
    controller: ["$scope", function ($scope) {
    }],
    link: function ($scope, element, attrs) {
      if($scope.status == "待审批") {
        $scope.code = 0;
      } else if($scope.status == "提交") {
        $scope.code = 1;
      } else if($scope.status == "保存") {
        $scope.code = 2;
      } else if($scope.status == "拒绝") {
        $scope.code = 3;
      } else if($scope.status == "同意") {
        $scope.code = 4;
      } else if($scope.status == "退回") {
        $scope.code = 5;
      } else if($scope.status == "撤回") {
        $scope.code = 6;
      }
    }
  }
});

