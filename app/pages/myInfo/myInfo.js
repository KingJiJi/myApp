/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('myInfoModule')

  .controller('myInfoCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    '$http',
    'checkVersionService',
    'hmsPopup',
    '$ionicTabsDelegate',
    '$ionicModal',
    'imgService',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              $http,
              checkVersionService,
              hmsPopup,
              $ionicTabsDelegate,
              $ionicModal,
              imgService) {

      $scope.defaultPortrait="build/img/myInfo/myInfo-userphoto.jpg";
      $scope.personalInfo = '';
      console.log("currentVersion"+baseConfig.version.currentVersion);
      $scope.currentVersion = baseConfig.version.currentversionName;
      /*
       change by wl
       */
      // var url = baseConfig.sapUrl +"ZhrEmployeeListByUname";
      var url = "http://localhost:8080/api/employee/select/myself";
      var param = {
        "UNAME":window.localStorage.empno
      //   "ZHR_EMPLOYEE_LIST_BY_UNAME":{
      //   "UNAME":window.localStorage.empno,
      //   "T_P0000":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "MASSN":"",
      //       "MNTXT":"",
      //       "MASSG":"",
      //       "MGTXT":""
      //     }
      //   },
      //   "T_P0001":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "BUKRS":"",
      //       "BUTXT":"",
      //       "PERSG":"",
      //       "PGTXT":"",
      //       "PERSK":"",
      //       "PTEXT":"",
      //       "WERKS":"",
      //       "NAME1":"",
      //       "BTRTL":"",
      //       "BTEXT":"",
      //       "ABKRS":"",
      //       "ORGEH":"",
      //       "ORGTX":"",
      //       "PLANS":"",
      //       "PLSTX":"",
      //       "ENAME":""
      //     }
      //   },
      //   "T_P0002":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "GESCH":"",
      //       "GBDAT":"",
      //       "NATTX":"",
      //       "LANDX":"",
      //       "FTEXT":""
      //     }
      //   },
      //   "T_P0041":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "DAT01":"",
      //       "DAT02":"",
      //       "DAT03":""
      //     }
      //   },
      //   "T_P0105":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "SUBTY":"",
      //       "STEXT":"",
      //       "USRID":"",
      //       "USRID_LONG":""
      //     }
      //   },
      //   "T_P0185":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ICTYP":"",
      //       "ICTXT":"",
      //       "ICNUM":""
      //     }
      //   },
      //   "T_P0529":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "RACKY":"",
      //       "LTEXT":""
      //     }
      //   },
      //   "T_P0534":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "PCODE":"",
      //       "PTEXT":""
      //     }
      //   },
      //   "T_P9001":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZHKLX":"",
      //       "ZHKLXMS":"",
      //       "ZHKSZD":"",
      //       "ZSFJTHK":"",
      //       "ZHKZCSJ":"",
      //       "ZSSPCS":"",
      //       "ZHKDQ":""
      //     }
      //   },
      //   "T_P9002":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZXL":"",
      //       "ZXLMS":"",
      //       "ZZGXL":"",
      //       "ZSZXX":"",
      //       "ZZY":"",
      //       "ZXW":"",
      //       "ZXWMS":"",
      //       "ZZGXW":"",
      //       "ZXZ":"",
      //       "ZXZMS":"",
      //       "ZXLQDFS":"",
      //       "ZXLQDFSMS":""
      //     }
      //   },
      //   "T_P9003":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZYZ":"",
      //       "ZYZMS":"",
      //       "ZSLDJ":"",
      //       "ZSLDJMS":"",
      //       "ZYYDJ":"",
      //       "ZYYDJMS":"",
      //       "ZBZ":""
      //     }
      //   },
      //   "T_P9004":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZHTLX":"",
      //       "ZHTLXMS":"",
      //       "ZSYQRQ":"",
      //       "ZBYSJ":"",
      //       "ZQDLB":"",
      //       "ZQDLBMS":"",
      //       "ZPQJG":"",
      //       "ZQYDW":"",
      //       "ZQYDWWB":"",
      //       "ZYGFS":"",
      //       "ZYGFSMS":"",
      //       "ZGSZD":"",
      //       "ZGSZDMS":""
      //     }
      //   },
      //   "T_P9005":{
      //     "item":{
      //       "ENDDA":"",
      //       "BEGDA":"",
      //       "ZCZYY":"",
      //       "ZCZYYMS":"",
      //       "ZBZ":""
      //     }
      //   },
      //   "T_P9006":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZJZLX":"",
      //       "ZJZLXMS":"",
      //       "ZCCLZRQ":"",
      //       "ZJZBH":""
      //     }
      //   },
      //   "T_P9007":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZDZBH":"",
      //       "ZCCDD":"",
      //       "ZCCDDMS":"",
      //       "ZCDSJ":"",
      //       "ZDCSJ":"",
      //       "ZTDSJ":"",
      //       "ZDCYY":"",
      //       "ZDCYYMS":""
      //     }
      //   },
      //   "T_P9008":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZHDSJ":"",
      //       "ZZSMC":"",
      //       "ZZSMCMS":"",
      //       "ZZCDD":"",
      //       "ZSCRQ":"",
      //       "ZDQRQ":""
      //     }
      //   },
      //   "T_P9009":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZJCLB":"",
      //       "ZJCLBWB":"",
      //       "ZJCNR":"",
      //       "ZJCNRWB":"",
      //       "ZJE":"",
      //       "ZLY":""
      //     }
      //   },
      //   "T_P9010":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZJTXM":"",
      //       "ZJTXB":"",
      //       "ZGX":"",
      //       "ZGXMS":"",
      //       "ZJTDH":"",
      //       "ZJTDZ":"",
      //       "ZCSRQ":"",
      //       "ZGZDW":"",
      //       "ZGZZW":"",
      //       "ZSFLXR":""
      //     }
      //   },
      //   "T_P9011":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZQRGS":"",
      //       "ZZW":"",
      //       "ZBZ":""
      //     }
      //   },
      //   "T_P9012":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZGZDZ":"",
      //       "ZHJDZ":"",
      //       "ZCZDZ":"",
      //       "ZGW":"",
      //       "ZYB":""
      //     }
      //   },
      //   "T_P9013":{
      //     "item":{
      //       "BEGDA":"",
      //       "ENDDA":"",
      //       "ZHR_ZCLX":"",
      //       "ZHR_ZCBM":"",
      //       "ZHR_PP":"",
      //       "ZHR_XH":"",
      //       "ZHR_XLH":"",
      //       "ZHR_DQJZ":"",
      //       "ZHR_FFRQ":"",
      //       "ZHR_SFGH":"",
      //       "ZHR_GHRQ":""
      //     }
      //   }
      // }
      };
      $scope.bigImage = false;
      var imgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';
      $scope.employee = {};
      hmsPopup.showLoading("正在加载");
      // hmsHttp.post(url,param).then(function(response){//拉取员工信息
      $http.post(url,param).then(function(response){//拉取员工信息
        var response = response.data;
        hmsPopup.hideLoading();
        console.log("我的信息页面：拉取员工信息response值："+angular.toJson(response));
        // if(response.T_P0001 != ''){
        // $scope.employee.emp_name = response.T_P0001.item.ENAME;
        if(response.ES_EMPLOYEE != ''){
          $scope.employee.emp_name = response.ES_EMPLOYEE.ENAME;
        } else {
          hmsPopup.showShortCenterToast('获取个人信息失败');
        }

        // $scope.employee.avatar =imgUrl+response.PERNR;
        $scope.employee.sex = response.ES_EMPLOYEE.SEX;
        if ($scope.employee.sex == "男") {
          $scope.employee.avatar = "build/img/myInfo/man-portrait.png";
        } else if ($scope.employee.sex == "女") {
          $scope.employee.avatar = "build/img/myInfo/woman-portrait.jpg";
        }

      }, function(response){
        $scope.showLoading=false;
      });
      $scope.showBigImage = function (imageName) {
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        console.log("imageName = "+imageName);
        $scope.url = imageName;
        $scope.showModal('build/pages/myInfo/modal/photo-zoom.html');
      };
      $scope.showModal = function(templateUrl) {//显示原图
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.hideBigImage  = function () {
        $scope.modal.hide();
        $scope.modal.remove();
      };
      $scope.logout = function(){//注销登录
        window.localStorage.token = "";
        window.localStorage.empno = '';
        imgService.setAndroidBadgeFlag('false');
        window.plugins.jPushPlugin.setAlias('');
        $state.go('login',{logoutFlag:'true'});
      };

      $scope.$on('$ionicView.beforeEnter', function (e) {
        // angular.element('.tabs').css('backgroundColor','#fafafa');
        $ionicTabsDelegate.showBar(true);
        console.log("进入message");
      });

      $scope.$on('$ionicView.enter', function (e) {
        if(baseConfig.debug) {
          console.log('myInfoCtrl.$ionicView.enter');
        }
      });

      $scope.$on('$ionicView.loaded',function(e){
        if(baseConfig.debug) {
          console.log('myInfoCtrl.$ionicView.loaded');
        }
      });

      $scope.$on('$destroy', function (e) {
        if(baseConfig.debug) {
          console.log('myInfoCtrl.$destroy');
        }
      });
      $scope.goInfoDetail = function (employeeImg) {
        $state.go('tab.my-info-detail',{employeeImg:employeeImg});
      };
      $scope.goFeedBack = function() {
        $state.go('tab.feedback');
      };
      $scope.goAboutUs = function(){
        $state.go('tab.about-us');
      };
      $scope.checkVersion=function(){//点击版本信息
        var param="MY_INFO";
        checkVersionService.checkAppVersion(param);
      };
    }]);
