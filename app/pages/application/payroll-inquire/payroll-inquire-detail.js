/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.payroll-inquire-detail', {
          url: '/tab.payroll-inquire-detail',
          params: {
            payRollDetail: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/payroll-inquire/payroll-inquire-detail.html',
              controller: 'payrollInquireDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('payrollInquireDetailCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              $stateParams,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate) {
      $scope.arrowPath = true;
      $scope.arrowPath1 = true;
      $scope.arrowPath2 = true;
      $scope.arrowPath3 = true;
      $scope.arrowPath4 = true;
      $scope.arrowPath5 = true;

      $scope.showDetail = function () {
        $scope.arrowPath = !$scope.arrowPath;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail1 = function () {
        $scope.arrowPath1 = !$scope.arrowPath1;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail2 = function () {
        $scope.arrowPath2 = !$scope.arrowPath2;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail3 = function () {
        $scope.arrowPath3 = !$scope.arrowPath3;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail4 = function () {
        $scope.arrowPath4 = !$scope.arrowPath4;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail5 = function () {
        $scope.arrowPath5 = !$scope.arrowPath5;
        $ionicScrollDelegate.resize();
      };

      console.group('工资单详情');
      console.info(angular.toJson($stateParams.payRollDetail, true));
      $scope.payRollDetail = $stateParams.payRollDetail;//工资单详细信息
      $scope.NZJGRSDS = Number($scope.payRollDetail.ZZ404);//年终奖个人所得税
      $scope.SFGZ = Number($scope.payRollDetail.ZZ560);//实发工资
      $scope.GRSDS = Number($scope.payRollDetail.ZZ403);//个人所得税
      $scope.SYJS = Number($scope.payRollDetail.ZZ552);//上月结算
      $scope.JBGZ = Number($scope.payRollDetail.ZBET01);//基本工资
      $scope.TZHJBGZ = Number($scope.payRollDetail.Z1000);//调整后基本工资
      $scope.GWJT = Number($scope.payRollDetail.ZBET02);//岗位津贴
      $scope.TZHGWJT = Number($scope.payRollDetail.Z1010);//调整后岗位津贴
      $scope.JBGZHJ = Number($scope.payRollDetail.Z1000) + Number($scope.payRollDetail.Z1010); //基本工资合计
      $scope.JCBZ = Number($scope.payRollDetail.Z2010);//机场补助
      $scope.mealAllowance = Number($scope.payRollDetail.Z2020) + Number($scope.payRollDetail.Z2030);//餐费补助
      $scope.TXBZ = Number($scope.payRollDetail.Z2040);//通讯补助
      $scope.YBBZ = Number($scope.payRollDetail.Z2000);//夜班补助
      $scope.CSGBZ = Number($scope.payRollDetail.Z2060);//超时工补助
      $scope.GWBZ = Number($scope.payRollDetail.Z2070);//高温补助
      $scope.JTBT = Number($scope.payRollDetail.Z2080);//交通补助
      $scope.QTBT = Number($scope.payRollDetail.Z2090);//其他补助
      $scope.SQTZ = Number($scope.payRollDetail.Z2100);//税前调整
      $scope.MDJJ = Number($scope.payRollDetail.Z3000);//门店奖金
      $scope.XSJJ = Number($scope.payRollDetail.Z3010);//销售奖金
      $scope.JXJJ = Number($scope.payRollDetail.Z3020);//绩效奖金
      $scope.QTJJ = Number($scope.payRollDetail.Z3030);//其他奖金
      $scope.BKK = Number($scope.payRollDetail.Z2110);//补扣款
      $scope.overTimePay = Number($scope.payRollDetail.Z4000) + Number($scope.payRollDetail.Z4010) + Number($scope.payRollDetail.Z4020);//加班费
      $scope.BJKK = Number($scope.payRollDetail.Z4040);//病假扣款
      $scope.SJKK = Number($scope.payRollDetail.Z4050);//事假扣款
      $scope.CJKK = Number($scope.payRollDetail.Z4060);//产假扣款
      //税前收入与扣减合计
      $scope.SQSRYKJHJ = Number($scope.payRollDetail.Z2010) + Number($scope.payRollDetail.Z2020) + Number($scope.payRollDetail.Z2030) + Number($scope.payRollDetail.Z2040) + Number($scope.payRollDetail.Z2000) + Number($scope.payRollDetail.Z2060) + Number($scope.payRollDetail.Z2070) + Number($scope.payRollDetail.Z2080) + Number($scope.payRollDetail.Z2090) + Number($scope.payRollDetail.Z2100) + Number($scope.payRollDetail.Z3000) + Number($scope.payRollDetail.Z3010) + Number($scope.payRollDetail.Z3020) + Number($scope.payRollDetail.Z3030) + Number($scope.payRollDetail.Z2110) + Number($scope.payRollDetail.Z4000) + Number($scope.payRollDetail.Z4010) + Number($scope.payRollDetail.Z4020) + Number($scope.payRollDetail.Z4040) + Number($scope.payRollDetail.Z4050) + Number($scope.payRollDetail.Z4060);
      $scope.ZFGJJYGSJ = Number($scope.payRollDetail.ZZ362);//住房公积金员工实缴
      $scope.ZFGJJYGBJ = Number($scope.payRollDetail.Z9091);//住房公积金个人补缴
      $scope.SHBXYGBJ = Number($scope.payRollDetail.Z9041) + Number($scope.payRollDetail.Z9051) + Number($scope.payRollDetail.Z9061);//社会保险员工补缴
      $scope.DEYLYGSJ = Number($scope.payRollDetail.Z9021);//大额医疗员工实缴
      $scope.ZHBXGRSJ = Number($scope.payRollDetail.Z9031);//综合保险个人实缴
      $scope.YLBXGRSJ = Number($scope.payRollDetail.ZZ313);//养老保险个人实缴
      $scope.SYBXGRSJ = Number($scope.payRollDetail.ZZ323);//失业保险个人实缴
      $scope.YILBXGRSJ = Number($scope.payRollDetail.ZZ333);//医疗保险个人实缴
      $scope.SBTZGR = Number($scope.payRollDetail.Z9111);//社保调整(个人)
      $scope.ZFGJJQYSJ = Number($scope.payRollDetail.ZZ363);//住房公积金企业实缴
      $scope.ZFGJJQYBJ = Number($scope.payRollDetail.Z9090);//住房公积金企业补缴
      $scope.DEYLQYJN = Number($scope.payRollDetail.Z9020);//大额医疗企业缴纳
      $scope.ZHBXQYJN = Number($scope.payRollDetail.Z9030);//综合保险企业缴纳
      $scope.SBTZQY = Number($scope.payRollDetail.Z9110);//社保调整(企业)
      $scope.YLBXQYSJ = Number($scope.payRollDetail.ZZ314);//养老保险企业实缴
      $scope.SYBXQYSJ = Number($scope.payRollDetail.ZZ324);//失业保险企业实缴
      $scope.YILBXQYSJ = Number($scope.payRollDetail.ZZ334);//医疗保险企业实缴
      $scope.GSBXQYSJ = Number($scope.payRollDetail.ZZ344);//工伤保险企业实缴
      $scope.SYUBXQYSJ = Number($scope.payRollDetail.ZZ354);//生育保险企业实缴
      //社会保险企业补缴
      $scope.SHBXQYBJ = Number($scope.payRollDetail.Z9040) + Number($scope.payRollDetail.Z9050) + Number($scope.payRollDetail.Z9060) + Number($scope.payRollDetail.Z9070) + Number($scope.payRollDetail.Z9080);
      //社保/公积金合计
      $scope.SBGJJHJ = Number($scope.payRollDetail.ZZ313) + Number($scope.payRollDetail.ZZ323) + Number($scope.payRollDetail.ZZ333) + Number($scope.payRollDetail.ZZ362) + Number($scope.payRollDetail.Z9021) + Number($scope.payRollDetail.Z9031) + Number($scope.payRollDetail.Z9041) + Number($scope.payRollDetail.Z9051) + Number($scope.payRollDetail.Z9061) + Number($scope.payRollDetail.Z9091) + Number($scope.payRollDetail.Z9111);
      $scope.SHTZ = Number($scope.payRollDetail.Z2120);//税后调整
      $scope.JJBCJ = Number($scope.payRollDetail.Z3060);//经济补偿金
      //税后扣减及累计合计
      $scope.SHKCJLJHJ = Number($scope.payRollDetail.Z2120) + Number($scope.payRollDetail.Z3060);

    }]);
