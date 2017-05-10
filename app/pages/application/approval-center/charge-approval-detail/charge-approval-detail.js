/**
 * Created by Richard on 16/10/25.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.charge-approval-detail', {
          url: '/charge-approval-detail',
          //params: {
          //  approvalList: "",
          //  approvalStatus: ""
          //},
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/charge-approval-detail/charge-approval-detail.html',
              controller: 'chargeApprovalDetailCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('chargeApprovalDetailCtrl', [
    '$scope',
    '$stateParams',
    '$timeout',
    '$ionicTabsDelegate',
    function ($scope,
              $stateParams,
              $timeout,
              $ionicTabsDelegate) {
      $ionicTabsDelegate.showBar(false);

      $scope.lists = [
        {
          title: '公司',
          value: '北京神州汽车租赁有限公司'
        },
        {
          title: '部门',
          value: '销售部'
        },
        {
          title: '单据类型',
          value: '通用报销单'
        },
        {
          title: '收款对象',
          value: '供应商'
        },
        {
          title: '收款方',
          value: '华夏汽车'
        },
        {
          title: '银行账号',
          value: '6228480861707160'
        },
        {
          title: '银行信息',
          value: '中国工商银行'
        },
        {
          title: '报销日期',
          value: '2016-10-10'
        },
        {
          title: '总金额',
          value: '项目车费'
        }
      ];

      $scope.lineLists = [
        {
          name: "交通费",
          amount: 1200,
          other: ""
        },
        {
          name: "交通费",
          amount: 1200,
          other: "2016.10.10（上海）~ 2016.10.14（天津）"
        }
      ];


    }
  ])
