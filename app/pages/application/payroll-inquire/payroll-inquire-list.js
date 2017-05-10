/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.payroll-inquire-list', {
          url: '/tab.payroll-inquire-list',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/payroll-inquire/payroll-inquire-list.html',
              controller: 'payrollInquireListCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('payrollInquireListCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate) {
      var nowPage = '0';
      var pageSize = '10';
      $scope.noPayRollFlag = false;
      $scope.payRollInquireList = [];
      $scope.loadMoreDataFlag = false;
      getPayRollInquireList();
      $scope.loadMoreData = function () {//上拉加载
        nowPage++;
        getPayRollInquireList();
        console.log('load');
      };
      $scope.refresh = function () {//下拉刷新
        $scope.noPayRollFlag = false;
        $scope.payRollInquireList = [];
        nowPage = 0;
        getPayRollInquireList();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      function getPayRollInquireList() {//获取销假列表信息
        var url = baseConfig.sapUrl + 'Zhrwf32_001';
        var param = {
          "ZHRWF32_001": {
            "ET_ZHRWF_032": {
              "item": {
                "MANDT": "",
                "PERNR": "",
                "INPER": "",
                "PAYTY": "",
                "ICNUM": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "ZRZRQ": "",
                "ZQYDW": "",
                "ZQYDWT": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "WAERS": "",
                "ZBET01": "",
                "Z1000": "",
                "Z1010": "",
                "Z2010": "",
                "Z2020": "",
                "Z2030": "",
                "Z2040": "",
                "Z2000": "",
                "Z2060": "",
                "Z2070": "",
                "Z2080": "",
                "Z2090": "",
                "Z2100": "",
                "Z3000": "",
                "Z3010": "",
                "Z3020": "",
                "Z3030": "",
                "Z3050": "",
                "Z2110": "",
                "Z4000": "",
                "Z4010": "",
                "Z4020": "",
                "Z4040": "",
                "Z4050": "",
                "ZZ362": "",
                "Z9041": "",
                "Z9051": "",
                "Z9061": "",
                "Z9091": "",
                "Z9021": "",
                "Z9031": "",
                "ZZ313": "",
                "ZZ323": "",
                "ZZ333": "",
                "Z2120": "",
                "Z3060": "",
                "ZBANKN": "",
                "ZZ403": "",
                "ZZ404": "",
                "ZZ560": "",
                "ZZSUM": "",
                "ZZ552": ""
              }
            },
            "I_BEGDA": "",
            "I_ENDDA": "",
            "I_NUM": pageSize,
            "I_PAGE": nowPage,
            "I_USRID": window.localStorage.empno.toUpperCase()
            //"I_USRID": "HAND02"
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          console.group('工资单列表');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'E') {
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noPayRollFlag = true;
            }
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
          } else {
            if(response.ET_ZHRWF_032 == ''){//无数据
              $scope.noPayRollFlag = true;
              $scope.loadMoreDataFlag = false;
            } else {
              if (response.ET_ZHRWF_032.item.constructor == Array) { //返回的item是数组代表有数据
                var len = response.ET_ZHRWF_032.item.length;
                angular.forEach(response.ET_ZHRWF_032.item, function (item, index) {
                  $scope.payRollInquireList.push(item);
                });
                $scope.loadMoreDataFlag = true;
                if (len < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              } else {
                $scope.payRollInquireList.push(response.ET_ZHRWF_032.item);
                $scope.loadMoreDataFlag = false;
              }
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取数据失败,请退出页面重试获取或联系管理员!');
        })
      }

      $scope.goToPayrollDetail = function(detail) {
        $state.go('tab.payroll-inquire-detail', {payRollDetail: detail});
      };

    }]);
