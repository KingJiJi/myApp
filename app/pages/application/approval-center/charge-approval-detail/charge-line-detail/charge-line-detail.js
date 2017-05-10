/**
 * Created by hulk on 16-10-25.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.charge-line-detail', {
          url: '/tab.charge-line-detail',
          params: {day: {}},
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/charge-approval-detail/charge-line-detail/charge-line-detail.html',
              controller: 'ChargeLineCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('ChargeLineCtrl',['$scope',function ($scope) {

    $scope.approvalHeads = [
      {
        title: '预算项目',
        desc: '手机费'
      },
      {
        title: '出发日期',
        desc: '2016-10-10'
      },
      {
        title: '返程日期',
        desc: '2016-10-15'
      },
      {
        title: '天数',
        desc: '5天'
      },
      {
        title: '出发地',
        desc: '上海'
      },
      {
        title: '返程地',
        desc: '天津'
      },
      {
        title: '发票项目',
        desc: '固定电话费'
      },
      {
        title: '交通工具',
        desc: '缺省车辆类别'
      },
      {
        title: '发票性质',
        desc: '专票'
      },
      {
        title: '发票号码',
        desc: '139813718'
      },
      {
        title: '发票总额',
        desc: '1200.00'
      },
      {
        title: '税额',
        desc: '72.00'
      },
      {
        title: '备注',
        desc: '手机费用'
      }
    ];

    $scope.imgFiles = [
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/12344553',
        type: 'FILE',
        name: '费用报销单01.doc'
      },
    ];


    $scope.detail = 'Y';






  }]);
