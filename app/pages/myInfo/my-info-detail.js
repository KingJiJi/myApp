/**
 * Created by LeonChan on 2016/6/20.
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.my-info-detail', {
          url: '/my-info-detail',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/my-info-detail.html',
              controller: 'MyInfoDetailCtrl'
            }
          },
          params:{
            employeeImg:''
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('MyInfoDetailCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$http',
    '$stateParams',
    'saveParameter',
    '$ionicTabsDelegate',
    '$state',
    '$rootScope',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $http,
              $stateParams,
              saveParameter,
              $ionicTabsDelegate,
              $state,
              $rootScope) {

      // $scope.personalInfo=$stateParams.myDetailInfo;
      // $scope.myPortrait="";
      // if($scope.personalInfo.avatar!=""){
      //   $scope.myPortrait=$scope.personalInfo.avatar;
      // }else if($scope.personalInfo.avatar==""){
      //    if($scope.personalInfo.gender=="男"){
      //      $scope.myPortrait="build/img/myInfo/man-portrait.png";
      //    }else if($scope.personalInfo.gender=="女") {
      //      $scope.myPortrait = "build/img/myInfo/woman-portrait.png";
      //    }
      // }
      $scope.employeeImg = $stateParams.employeeImg;
      function getPersonInfo() {
        /*
          changed by wl
         */
        // var url = baseConfig.sapUrl + "ZhrEmployeeListByUname";
        var url = "http://localhost:8080/api/employee/select/myself";
        var param = {
          "UNAME": window.localStorage.empno
          // "ZHR_EMPLOYEE_LIST_BY_UNAME": {
          //   "UNAME": window.localStorage.empno,
          //   "T_P0000": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "MASSN": "",
          //       "MNTXT": "",
          //       "MASSG": "",
          //       "MGTXT": ""
          //     }
          //   },
          //   "T_P0001": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "BUKRS": "",
          //       "BUTXT": "",
          //       "PERSG": "",
          //       "PGTXT": "",
          //       "PERSK": "",
          //       "PTEXT": "",
          //       "WERKS": "",
          //       "NAME1": "",
          //       "BTRTL": "",
          //       "BTEXT": "",
          //       "ABKRS": "",
          //       "ORGEH": "",
          //       "ORGTX": "",
          //       "PLANS": "",
          //       "PLSTX": "",
          //       "ENAME": ""
          //     }
          //   },
          //   "T_P0002": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "GESCH": "",
          //       "GBDAT": "",
          //       "NATTX": "",
          //       "LANDX": "",
          //       "FTEXT": ""
          //     }
          //   },
          //   "T_P0041": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "DAT01": "",
          //       "DAT02": "",
          //       "DAT03": ""
          //     }
          //   },
          //   "T_P0105": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "SUBTY": "",
          //       "STEXT": "",
          //       "USRID": "",
          //       "USRID_LONG": ""
          //     }
          //   },
          //   "T_P0185": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ICTYP": "",
          //       "ICTXT": "",
          //       "ICNUM": ""
          //     }
          //   },
          //   "T_P0529": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "RACKY": "",
          //       "LTEXT": ""
          //     }
          //   },
          //   "T_P0534": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "PCODE": "",
          //       "PTEXT": ""
          //     }
          //   },
          //   "T_P9001": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZHKLX": "",
          //       "ZHKLXMS": "",
          //       "ZHKSZD": "",
          //       "ZSFJTHK": "",
          //       "ZHKZCSJ": "",
          //       "ZSSPCS": "",
          //       "ZHKDQ": ""
          //     }
          //   },
          //   "T_P9002": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZXL": "",
          //       "ZXLMS": "",
          //       "ZZGXL": "",
          //       "ZSZXX": "",
          //       "ZZY": "",
          //       "ZXW": "",
          //       "ZXWMS": "",
          //       "ZZGXW": "",
          //       "ZXZ": "",
          //       "ZXZMS": "",
          //       "ZXLQDFS": "",
          //       "ZXLQDFSMS": ""
          //     }
          //   },
          //   "T_P9003": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZYZ": "",
          //       "ZYZMS": "",
          //       "ZSLDJ": "",
          //       "ZSLDJMS": "",
          //       "ZYYDJ": "",
          //       "ZYYDJMS": "",
          //       "ZBZ": ""
          //     }
          //   },
          //   "T_P9004": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZHTLX": "",
          //       "ZHTLXMS": "",
          //       "ZSYQRQ": "",
          //       "ZBYSJ": "",
          //       "ZQDLB": "",
          //       "ZQDLBMS": "",
          //       "ZPQJG": "",
          //       "ZQYDW": "",
          //       "ZQYDWWB": "",
          //       "ZYGFS": "",
          //       "ZYGFSMS": "",
          //       "ZGSZD": "",
          //       "ZGSZDMS": ""
          //     }
          //   },
          //   "T_P9005": {
          //     "item": {
          //       "ENDDA": "",
          //       "BEGDA": "",
          //       "ZCZYY": "",
          //       "ZCZYYMS": "",
          //       "ZBZ": ""
          //     }
          //   },
          //   "T_P9006": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZJZLX": "",
          //       "ZJZLXMS": "",
          //       "ZCCLZRQ": "",
          //       "ZJZBH": ""
          //     }
          //   },
          //   "T_P9007": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZDZBH": "",
          //       "ZCCDD": "",
          //       "ZCCDDMS": "",
          //       "ZCDSJ": "",
          //       "ZDCSJ": "",
          //       "ZTDSJ": "",
          //       "ZDCYY": "",
          //       "ZDCYYMS": ""
          //     }
          //   },
          //   "T_P9008": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZHDSJ": "",
          //       "ZZSMC": "",
          //       "ZZSMCMS": "",
          //       "ZZCDD": "",
          //       "ZSCRQ": "",
          //       "ZDQRQ": ""
          //     }
          //   },
          //   "T_P9009": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZJCLB": "",
          //       "ZJCLBWB": "",
          //       "ZJCNR": "",
          //       "ZJCNRWB": "",
          //       "ZJE": "",
          //       "ZLY": ""
          //     }
          //   },
          //   "T_P9010": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZJTXM": "",
          //       "ZJTXB": "",
          //       "ZGX": "",
          //       "ZGXMS": "",
          //       "ZJTDH": "",
          //       "ZJTDZ": "",
          //       "ZCSRQ": "",
          //       "ZGZDW": "",
          //       "ZGZZW": "",
          //       "ZSFLXR": ""
          //     }
          //   },
          //   "T_P9011": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZQRGS": "",
          //       "ZZW": "",
          //       "ZBZ": ""
          //     }
          //   },
          //   "T_P9012": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZGZDZ": "",
          //       "ZHJDZ": "",
          //       "ZCZDZ": "",
          //       "ZGW": "",
          //       "ZYB": ""
          //     }
          //   },
          //   "T_P9013": {
          //     "item": {
          //       "BEGDA": "",
          //       "ENDDA": "",
          //       "ZHR_ZCLX": "",
          //       "ZHR_ZCBM": "",
          //       "ZHR_PP": "",
          //       "ZHR_XH": "",
          //       "ZHR_XLH": "",
          //       "ZHR_DQJZ": "",
          //       "ZHR_FFRQ": "",
          //       "ZHR_SFGH": "",
          //       "ZHR_GHRQ": ""
          //     }
          //   }
          // }
        };

        hmsPopup.showLoading("正在加载");
        $scope.employeeInfo = {};
        // $scope.employeeInfo = saveParameter.getEmployeeInfos();
        // hmsHttp.post(url, param).then(function (response) {
        $http.post(url, param).then(function (response) {
          var response = response.data;
          hmsPopup.hideLoading();
          // var contactItem = response.T_P0105.item;
          // var self_email = '';
          // var work_email = '';
          // var self_mobil = '';
          // var work_mobil = '';
          // angular.forEach(contactItem, function (item, index) {
          //   if (item.SUBTY === "M2") {
          //     self_email = item.USRID_LONG;
          //   }
          //   if (item.SUBTY === "T1") {
          //     self_mobil = item.USRID_LONG;
          //   }
          //   if (item.SUBTY === "T2") {
          //     work_mobil = item.USRID_LONG;
          //   }
          //   if (item.SUBTY === "M1") {
          //     work_email = item.USRID_LONG;
          //   }
          // });
          // $scope.employeeInfo.emp_code = response.PERNR;
          $scope.employeeInfo.emp_code = response.ES_EMPLOYEE.PERNR;
          // $scope.employeeInfo.emp_name = response.T_P0001.item.ENAME;
          $scope.employeeInfo.emp_name = response.ES_EMPLOYEE.ENAME;
          // $scope.employeeInfo.sex = response.T_P0002.item.GESCH;
          $scope.employeeInfo.sex = response.ES_EMPLOYEE.SEX;
          // $scope.employeeInfo.birthday = response.T_P0002.item.GBDAT;
          $scope.employeeInfo.birthday = response.ES_EMPLOYEE.BIRTHDAY;
          // $scope.employeeInfo.rootUnitName = response.T_P0001.item.ORGTX;
          $scope.employeeInfo.rootUnitName = response.ES_EMPLOYEE.rootUnitName;
          // $scope.employeeInfo.position_name = response.T_P0001.item.PLSTX;
          $scope.employeeInfo.position_name = response.ES_EMPLOYEE.positionName;
          // $scope.employeeInfo.position_rank = response.T_P0001.item.ATX;
          $scope.employeeInfo.position_rank = response.ES_EMPLOYEE.positionRank;
          // $scope.employeeInfo.emp_status = response.T_P0001.item.PTEXT.substr(0, 2);
          // if (response.T_P9012 == "") {
          //   $scope.employeeInfo.base_name = "";
          //   $scope.employeeInfo.workStation = "";
          // } else {
          //   $scope.employeeInfo.base_name = response.T_P9012.item.ZGZDZ;
          //   $scope.employeeInfo.workStation = response.T_P9012.item.ZGW;
          // }
          $scope.employeeInfo.workStation = response.ES_EMPLOYEE.PASSWORD;
          // if (response.T_P0185 == "") {
          //   $scope.employeeInfo.idCardNum = "";
          // } else {
          //   $scope.employeeInfo.idCardNum = response.T_P0185.item.ICNUM;
          // }
          $scope.employeeInfo.idCardNum = response.ES_EMPLOYEE.idCArdNum;
          // if (response.T_P9012 == "") {
          //   $scope.employeeInfo.city = "";
          //   $scope.employeeInfo.address = "";
          // } else {
          //   $scope.employeeInfo.city = response.T_P9012.item.ZGZDZ;
          //   $scope.employeeInfo.address = response.T_P9012.item.ZCZDZ;
          // }
          $scope.employeeInfo.city = response.ES_EMPLOYEE.CITY;
          $scope.employeeInfo.address = response.ES_EMPLOYEE.ADDRESS;

          // $scope.employeeInfo.slefEmail = self_email;
          // $scope.employeeInfo.workEmail = work_email;
          $scope.employeeInfo.workEmail = response.ES_EMPLOYEE.EMAIL;
          // $scope.employeeInfo.slefMobil = self_mobil;
          $scope.employeeInfo.slefMobil = response.ES_EMPLOYEE.selfMobil;
          // $scope.employeeInfo.workMobil = work_mobil;
          $scope.employeeInfo.workMobil = response.ES_EMPLOYEE.workMobil;

          // if ($scope.employeeInfo.sex == "1") {
          if ($scope.employeeInfo.sex == "男") {
            $scope.employeeInfo.avatar = "build/img/myInfo/man-portrait.png";
          // } else if ($scope.employeeInfo.sex == "2") {
          } else if ($scope.employeeInfo.sex == "女") {
            // $scope.employeeInfo.avatar = "build/img/myInfo/woman-portrait.png";
            $scope.employeeInfo.avatar = "build/img/myInfo/woman-portrait.jpg";
          }
        }, function (response) {
          $scope.showLoading = false;
        });
      }
      //  .error(function(){
      //  $scope.showLoading=false;
      //});
      getPersonInfo();
      $scope.goBack=function(){//返回按钮
        $ionicHistory.goBack();
      };
      $scope.$on('$ionicView.beforeEnter', function (e) {
        $ionicTabsDelegate.showBar(false);
      });
      $scope.goChangeInfo = function (flag) {
        $state.go('tab.change-info',{infoParam:flag});
      };
      $rootScope.$on('REFRESH_INFO',function () {
        getPersonInfo();
      })
    }]);
