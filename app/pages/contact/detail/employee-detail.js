/**
 * Created by wolf on 2016/7/5.
 * -wen.dai-
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.employeeDetail', {
          url: 'contact/employeeDetail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/detail/employee-detail.html',
              controller: 'contactEmployeeDetailCtl'
            }
          },
          params: {
            'employeeNumber': ""
          }
        });
    }]);
angular.module('applicationModule')
  .controller('contactEmployeeDetailCtl', [
    '$scope',
    '$ionicScrollDelegate',
    '$ionicModal',
    'baseConfig',
    'hmsHttp',
    '$http',
    'hmsPopup',
    '$ionicHistory',
    '$stateParams',
    'imService',
    '$ionicActionSheet',
    'contactService',
    '$cordovaActionSheet',
    '$rootScope',
    '$state',
    function ($scope,
              $ionicScrollDelegate,
              $ionicModal,
              baseConfig,
              hmsHttp,
              $http,
              hmsPopup,
              $ionicHistory,
              $stateParams,
              imService,
              $ionicActionSheet,
              contactService,
              $cordovaActionSheet,
              $rootScope,
              $state) {
      /**
       * var section
       */
      {
        var getEmployeeImgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';

        /*
          changed by wl
         */
        // var getEmployeeDetailUrl = baseConfig.sapUrl + "ZhrEmployeeList";
        var getEmployeeDetailUrl = "http://localhost:8080/api/employee/select";
        var employeeDetailParams = {
          "UNAME": window.localStorage.empno,
          "PERNR": $stateParams.employeeNumber
          // "ZHR_EMPLOYEE_LIST": {
          //   "PERNR": $stateParams.employeeNumber,
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
        if (ionic.Platform.isIOS()) {
          angular.element('.common-head').css('paddingTop', '20px');
        }
        $scope.employeeInfo = {}; //存储查询员工的详细信息
        var LINK_MAN = window.localStorage.empno + 'common_linkman2';
        var employeeBaseInfo = {
          tel: '',
          name: '',
          employeeNumber: '',
          imgUrl: ''
        };
      }

      //放大显示头像
      $scope.showBigImage = function (imageName) {
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        console.log("imageName = " + imageName);
        $scope.url = imageName;
        $scope.showModal('build/pages/contact/detail/modal/photo-zoom.html');
      };
      $scope.showModal = function (templateUrl) {//显示原图
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.hideBigImage = function () {
        $scope.modal.hide();
        $scope.modal.remove();
      };


      /**
       *  获取员工的详细信息数据--
       */
      function initEmployeeData() {
        hmsPopup.showLoading("正在加载");
        // hmsHttp.post(getEmployeeDetailUrl, employeeDetailParams).then(function (response) {
        $http.post(getEmployeeDetailUrl, employeeDetailParams).then(function (response) {
          var response =response.data;
          hmsPopup.hideLoading();
          // var contactItem = response.T_P0105.item;
          // var self_email = '';
          // var work_email = '';
          // var self_mobil = '';
          // var work_mobil = '';
          // angular.forEach(contactItem, function (item, index) {
          //   if (item.STEXT === "个人邮箱") {
          //     self_email = item.USRID_LONG;
          //   }
          //   if (item.STEXT === "移动电话") {
          //     self_mobil = item.USRID_LONG;
          //   }
          //   if (item.STEXT === "办公电话") {
          //     work_mobil = item.USRID_LONG;
          //   }
          //   if (item.STEXT === "办公邮箱") {
          //     work_email = item.USRID_LONG;
          //   }
          // });
          // $scope.employeeInfo.emp_code = $stateParams.employeeNumber;
          $scope.employeeInfo.emp_code = response.ES_EMPLOYEE.PERNR;
          // $scope.employeeInfo.emp_name = response.T_P0001.item.ENAME;
          $scope.employeeInfo.emp_name = response.ES_EMPLOYEE.ENAME;
          // $scope.employeeInfo.sex = response.T_P0002.item.GESCH;
          $scope.employeeInfo.sex = response.ES_EMPLOYEE.SEX;
          // $scope.employeeInfo.rootUnitName = response.T_P0001.item.ORGTX;
          $scope.employeeInfo.rootUnitName = response.ES_EMPLOYEE.rootUnitName;
          // $scope.employeeInfo.position_name = response.T_P0001.item.PLSTX;
          $scope.employeeInfo.position_name = response.ES_EMPLOYEE.positionName;
          // $scope.employeeInfo.emp_status = response.T_P0001.item.PTEXT;
          $scope.employeeInfo.emp_status = response.ES_EMPLOYEE.STATUS;
          // if (response.T_P9012 == "") {
          //   $scope.employeeInfo.base_name = "";
          // } else {
          //   $scope.employeeInfo.base_name = response.T_P9012.item.ZGZDZ;
          //   $scope.employeeInfo.workStation = response.T_P9012.item.ZGW;
          // }
          $scope.employeeInfo.base_name = response.ES_EMPLOYEE.baseName;
          $scope.employeeInfo.workStation = response.ES_EMPLOYEE.workStation;
          // $scope.employeeInfo.slefEmail = self_email;
          // $scope.employeeInfo.workEmail = work_email;
          $scope.employeeInfo.workEmail = response.ES_EMPLOYEE.EMAIL;
          // $scope.employeeInfo.slefMobil = self_mobil;
          $scope.employeeInfo.slefMobil = response.ES_EMPLOYEE.selfMobil;
          // $scope.employeeInfo.workMobil = work_mobil;
          $scope.employeeInfo.workMobil = response.ES_EMPLOYEE.workMobil;
          $scope.employeeInfo.avatar = getEmployeeImgUrl + $stateParams.employeeNumber;
          angular.element('.human-head-image').css({
            'backgroundImage': 'url(build/img/myInfo/myInfo-background.png)',
            'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover', 'backgroundPosition': 'center'
          });
          $scope.contactLoading = false;
        }, function (response) {
          $scope.contactLoading = false;
          $scope.employeeInfo = {};
        });
      };
      initEmployeeData();

      $scope.goBackPage = function () {
        $ionicHistory.goBack();
      };


      function storeCommonLinkman(newObject) { //存储为常用联系人
        storedb(LINK_MAN).insert(newObject, function (err) {
        });
      };

      $scope.telPersonPhone = function () { //响应拨打电话按钮的方法
        var options = {
          buttonLabels: ['拨打电话', '增加到通讯录'],
          addCancelButtonWithLabel: '取消',
          androidEnableCancelButton: true,
          androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT
        };

        document.addEventListener("deviceready", function () {
          $cordovaActionSheet.show(options)
            .then(function (btnIndex) {
              if (baseConfig.debug) {
                warn(btnIndex);
              }
              if (btnIndex == 1) {
                //window.location.href = "tel:" + 88888888888; //不明觉厉-!
                window.location.href = "tel:" + $scope.employeeInfo.slefMobil.replace(/\s+/g, "");
                employeeBaseInfo = {
                  tel: $scope.employeeInfo.slefMobil.replace(/\s+/g, ""),
                  name: $scope.employeeInfo.emp_name,
                  employeeNumber: $scope.employeeInfo.emp_code,
                  imgUrl: $scope.employeeInfo.avatar
                };
                if (employeeBaseInfo.name) {
                  storeCommonLinkman(employeeBaseInfo);
                }
                return true;
              } else if (btnIndex == 2) {
                var baseInfo = {
                  mobil: $scope.employeeInfo.slefMobil.replace(/\s+/g, ""),
                  email: $scope.employeeInfo.slefEmail,
                  emp_name: $scope.employeeInfo.emp_name
                };
                contactService.contactLocal(baseInfo);
                return true;
              }
            });
        }, false);

      };
      $scope.telWorkPhone = function () { //响应拨打电话按钮的方法
        var options = {
          buttonLabels: ['拨打电话', '增加到通讯录'],
          addCancelButtonWithLabel: '取消',
          androidEnableCancelButton: true,
          androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT
        };

        document.addEventListener("deviceready", function () {
          $cordovaActionSheet.show(options)
            .then(function (btnIndex) {
              if (baseConfig.debug) {
                warn(btnIndex);
              }
              if (btnIndex == 1) {
                var workMobile = $scope.employeeInfo.workMobil;
                var telArr = workMobile.split('-');
                var changedTel = '';
                if (telArr.length >= 2) {
                  if(workMobile.indexOf('/') !== -1){
                    workMobile = workMobile.split('/').splice(0, 1).join('');
                    if(workMobile.split('-')>2){
                      var index_1 = workMobile.lastIndexOf('-');
                      changedTel = workMobile.substring(0, index_1);
                    }else{
                      changedTel = workMobile;
                    }
                  }else{
                    workMobile = workMobile.split('/').splice(0, 1).join('');
                    var index_2 = workMobile.lastIndexOf('-');
                    changedTel = workMobile.substring(0, index_2);
                    console.log('changedTel = '+changedTel);
                  }

                }
                console.log('changedTel = '+changedTel);
                //window.location.href = "tel:" + 88888888888; //不明觉厉-!
                window.location.href = "tel:" + changedTel.replace(/\s+/g, "");
                employeeBaseInfo = {
                  tel: $scope.employeeInfo.workMobil.replace(/\s+/g, ""),
                  name: $scope.employeeInfo.emp_name,
                  employeeNumber: $scope.employeeInfo.emp_code,
                  imgUrl: $scope.employeeInfo.avatar
                };
                if (employeeBaseInfo.name) {
                  storeCommonLinkman(employeeBaseInfo);
                }
                return true;
              } else if (btnIndex == 2) {
                var baseInfo = {
                  mobil: $scope.employeeInfo.workMobil.replace(/\s+/g, ""),
                  email: $scope.employeeInfo.slefEmail,
                  emp_name: $scope.employeeInfo.emp_name
                };
                contactService.contactLocal(baseInfo);
                return true;
              }
            });
        }, false);

      };
      $scope.goImTalk = function () {
        employeeBaseInfo = {
          tel: $scope.employeeInfo.mobil.replace(/\s+/g, ""),
          name: $scope.employeeInfo.emp_name,
          employeeNumber: $scope.employeeInfo.emp_code,
          imgUrl: $scope.employeeInfo.avatar
        };
        if (employeeBaseInfo.name) {
          storeCommonLinkman(employeeBaseInfo);
        }
        //go native page --im talk
        if (ionic.Platform.isWebView()) {
          var emp = {
            "friendId": $scope.employeeInfo.emp_code,
            "friendName": $scope.employeeInfo.emp_name,
            "friendIcon": $scope.employeeInfo.avatar
          };
          try {
            imService.toNativeChatPage(emp);
          } catch (e) {
          }
        } else {
          hmsPopup.showShortCenterToast('不支持网页聊天!');
        }
      };
    }]);
