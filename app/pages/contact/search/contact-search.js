/**
 * Created by wolf on 2016/7/6. (-wen.dai-)
 */
'use strict';
//--通讯录搜索模块路由-
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.contactSearch', {
          url: 'contact/contactSearch',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/search/contact-search.html',
              controller: 'employeeSearchCtl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('employeeSearchCtl', [
    '$scope',
    '$ionicScrollDelegate',
    '$ionicModal',
    'baseConfig',
    'hmsPopup',
    '$state',
    '$ionicActionSheet',
    'contactService',
    '$timeout',
    'hmsHttp',
    '$ionicHistory',
    'commonContactService',
    '$rootScope',
    '$cordovaActionSheet',
    '$sce',
    '$q',
    '$http',
    '$stateParams',
    function ($scope,
              $ionicScrollDelegate,
              $ionicModal,
              baseConfig,
              hmsPopup,
              $state,
              $ionicActionSheet,
              contactService,
              $timeout,
              hmsHttp,
              $ionicHistory,
              commonContactService,
              $rootScope,
              $cordovaActionSheet,
              $sce,
              $q,
              $http,
              $stateParams) {
      /**
       * var section
       */

      {
        var nowPage = 0;
        var pageSize = 10;

        $scope.showInfinite = false; //默认隐藏无限滚动的标签
        $scope.contactLoading = false; //默认不显示loading加载
        $scope.showHistory = true; //默认显示搜索历史
        $scope.showClear = false; //默认隐藏搜索框的清楚按钮
        $scope.resultList = []; //存储搜索结果
        $scope.contactKey = {getValue: ''}; //绑定输入的关键字
        $scope.historys = []; //存储搜索历史的关键字
        $scope.newPage = 0;
        var employeeBaseInfo = {
          tel: '',
          name: '',
          employeeNumber: '',
          imgUrl: ''
        };
        var DB_NAME = 'key_history1';
        /*
          change by wl
         */
        // var getEmployeeUrl = baseConfig.sapUrl + "ZhrEmployeeListFuzzy";
        var getEmployeeUrl = "http://localhost:8080/api/employee/list";
        var getEmployeeImgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';
        var getEmployeeImgParams =
        {
          "empno": ''
        };
        var LINK_MAN = 'common_linkman2';
        var item = document.getElementById("employeeInputSearch");
        $scope.historys = unique_better(storedb(DB_NAME).find(), 'historyItem');

        if ($scope.historys.length > 10) {
          $scope.historys = $scope.historys.slice(0, 10);
        }
      }
      if($rootScope.employeeDetailFlag == true){
        $scope.contactKey.getValue = $stateParams.searchHistory;
        $scope.searchContacts();
      }
      $scope.$on('$ionicView.afterEnter', function () { //初始化input框-自动聚焦
        if (ionic.Platform.isWebView()) {
          cordova.plugins.Keyboard.show();
        }
        if (ionic.Platform.isAndroid()) {
          $timeout(function () {
            item.focus();
            $scope.$apply();
          }, 400);
        } else {
          item.focus();
          $scope.$apply();
        }
      });
      $scope.$on('$ionicView.enter',function () {
        if($scope.contactKey.getValue ==''){
          $scope.showHistory = false;
        }
        console.log("$scope.contactKey.getValue = "+$scope.contactKey.getValue);
          $scope.searchContacts();
      });
      function dealHistory(newEmployee, emp_code) { //存储成功搜索历史记录的方法
        storedb(DB_NAME).remove({historyItem: newEmployee, historyEmpCode: emp_code}, function (err) {
          if (!err) {
          } else {
            hmsPopup.showShortCenterToast(err);
          }
        });
        storedb(DB_NAME).insert({historyItem: newEmployee, historyEmpCode: emp_code}, function (err) {
          if (!err) {
            $scope.historys = unique_better(storedb(DB_NAME).find(), 'historyItem');
          } else {
            hmsPopup.showShortCenterToast(err);
          }
        });
        if ($scope.historys.length > 10) {
          $scope.historys = $scope.historys.slice(0, 10);
        }
      };

      function dealCommonLinkMan(newObject) { //存储常用联系人最多15个
        storedb(LINK_MAN).insert(newObject, function (err) {
          if (!err) {
            $scope.customContactsInfo = unique_better(storedb(LINK_MAN).find(), 'employeeNumber');
          } else {
            hmsPopup.showShortCenterToast(err);
          }
        });
        if ($scope.customContactsInfo.length > 15) {
          $scope.customContactsInfo = $scope.customContactsInfo.slice(0, 15);
        }
      };

      $scope.hideContactSearch = function () {
        $scope.showHistory = true;
        $scope.showClear = false;
        $scope.resultList = [];
        $scope.contactKey.getValue = '';
        $ionicHistory.goBack();
      };
      var employeeParams = {
        "ZHR_EMPLOYEE_LIST_FUZZY": {
          "SEARCH_KEY": "",
          "ALL":"",
          "PAGE": nowPage,
          "PERPAGE": pageSize,
          "T_EMPLOYEE": {
            "item": {
              "PERNR": "",
              "ENAME": "",
              "EMAIL": ""
            }
          }
        }
      };
      $scope.getEmployeeData = function (empNum,moreFlag) { //获取搜索关键字的数据

        var q = $q.defer();
        if(moreFlag =='init'){
          employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.PAGE = 0;
        }
        employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.SEARCH_KEY = empNum;
        hmsPopup.showLoading("请稍后");
        // hmsHttp.post(getEmployeeUrl, employeeParams).then(function (response) {
        $http.post(getEmployeeUrl, employeeParams).then(function (response) {
          var response = response.data;
          console.log("response值"+angular.toJson(response));
          hmsPopup.hideLoading();
          if (response.T_EMPLOYEE.item instanceof Array) {
            if (response.T_EMPLOYEE.item.length < 10) {
              $scope.$broadcast('scroll.infiniteScrollComplete');
              var contactItem = response.T_EMPLOYEE.item;
              angular.forEach(contactItem, function (item, index) {
                    var temp = {
                      "emp_name": item.ENAME,
                      "emp_code": item.PERNR,
                      "email": item.EMAIL,
                      "avatar": getEmployeeImgUrl+item.PERNR
                    };
                    $scope.resultList.push(temp);
              });
              $scope.showInfinite = false;
              q.resolve($scope.resultList);

            }else{
              angular.forEach(response.T_EMPLOYEE.item, function (item, index) {
                var temp = {
                  "emp_name": item.ENAME,
                  "emp_code": item.PERNR,
                  "email": item.EMAIL,
                  "avatar": getEmployeeImgUrl+item.PERNR
                };
                $scope.resultList.push(temp);
                q.resolve($scope.resultList);
              });
              $scope.showInfinite = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            var contactItem_2 = response.T_EMPLOYEE.item;

              var temp_2 = {
                "emp_name": contactItem_2.ENAME,
                "emp_code": contactItem_2.PERNR,
                "email": contactItem_2.EMAIL,
                "avatar": getEmployeeImgUrl+contactItem_2.PERNR
              };
              $scope.resultList.push(temp_2);
              $scope.showInfinite = false;
          };
          return q.promise;
        }, function(response){
            hmsPopup.hideLoading();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
        //  .error(function (error) {
        //  hmsPopup.hideLoading();
        //  $scope.$broadcast('scroll.infiniteScrollComplete');
        //});
      };
      console.log(" $scope.showInfinite= "+ $scope.showInfinite);
      $scope.loadMore = function () {
        console.log("loadMore");
        $scope.newPage += 1;
        employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.PAGE =  $scope.newPage;
        $scope.getEmployeeData($scope.contactKey.getValue,'loadMore');
      };

      $scope.clearInputContent = function () { //响应清除输入框文字按钮的方法
        $scope.contactKey.getValue = '';
        // $scope.searchContacts();
        $scope.showClear = false;
        if (ionic.Platform.isWebView()) {
          cordova.plugins.Keyboard.show();
        }
        $timeout(function () {
          item.focus();
          $scope.$apply();
        }, 400);
      };
      document.getElementById('employeeInputSearch').addEventListener('keyup', function () {

        if (this.value.length > 0) {
          $scope.showClear = true;
        } else {
          $scope.showClear = false;
        }
      });
      $scope.searchContacts = function () { //响应搜索输入框的方法
        $scope.showHistory = false;
        if ($scope.contactKey.getValue === '') {
          $ionicScrollDelegate.scrollTop();
          $scope.showClear = false;
          $scope.showHistory = true;
          $timeout(function () {
            $scope.resultList = [];
          }, 100); //防止过快啦 --凸凸凸
        } else {
          $scope.showClear = true;
          $scope.newPage = 0;
          $scope.resultList = [];
          $scope.getEmployeeData($scope.contactKey.getValue,'init');
        }
      };

      $scope.getHistoryItem = function (values) { //响应搜素历史记录点击的方法
        var employeeParams = {
          "ZHR_EMPLOYEE_LIST_FUZZY": {
            "SEARCH_KEY": "",
            "ALL":"",
            "PAGE": nowPage,
            "PERPAGE": pageSize,
            "T_EMPLOYEE": {
              "item": {
                "PERNR": "",
                "ENAME": "",
                "EMAIL": ""
              }
            }
          }
        };
        console.log("values = " + angular.toJson(values));
        $scope.contactKey.getValue = values.historyItem;
        employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.SEARCH_KEY = $scope.contactKey.getValue;
        // $scope.contactLoading = true;
        $scope.showHistory = false;
        $scope.showClear = true;
        $scope.resultList = [];
        dealHistory(values.historyItem, values.historyEmpCode);
        $scope.getEmployeeData(values.historyEmpCode,'init');
      };

      $scope.deleteHistory = function (values) { //清空历史数据
        $scope.historys = [];
        localStorage.removeItem(DB_NAME);
      };

      function storeCommonLinkman(newObject) { //存储为常用联系人
        //storedb(LINK_MAN).remove(newObject, function (err) {
        //});
        storedb(LINK_MAN).insert(newObject, function (err) {
        });
      };
      $ionicModal.fromTemplateUrl('build/pages/contact/detail/employee-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.selectEmployeeItem = function (newEmp) { //跳到个人详情界面
        console.log("newEmp = " + angular.toJson(newEmp));
        dealHistory(newEmp.emp_name, newEmp.emp_code);
        $scope.showHistory = true;
        $scope.showClear = false;
        $scope.resultList = [];
        // $scope.contactKey.getValue = '';
        if (commonContactService.getContactFlag() === 'carpooling-new-contactSearch') {
          commonContactService.setEmpInfo(newEmp);
          $rootScope.$broadcast("SEND_EMP_INFO");
          $ionicHistory.goBack();
        } else {
          $state.go('tab.employeeDetail', {employeeNumber: newEmp.emp_code});
          // $rootScope.$broadcast('toEmployeeDetail',newEmp.emp_code);
          // $scope.modal.show();
        }
      };

      $scope.telSaveNumber = function (event, baseInfo) { //拨打电话按钮的响应事件
        event.stopPropagation(); //阻止事件冒泡

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
                window.location.href = "tel:" + 88888888888; //不明觉厉--
                window.location.href = "tel:" + baseInfo.mobil.replace(/\s+/g, "");
                var imgUrl = '';
                if (baseInfo.avatar === "1") {//根据性别判定头像男女
                  imgUrl = "build/img/myInfo/man-portrait.png";
                } else if (baseInfo.avatar === "2") {
                  imgUrl = "build/img/myInfo/woman-portrait.png";
                }

                var employeeBaseInfo = {
                  tel: baseInfo.emp_mobil.replace(/\s+/g, ""),
                  name: baseInfo.emp_name,
                  employeeNumber: baseInfo.emp_code,
                  imgUrl: imgUrl
                };
                if (employeeBaseInfo.name) {
                  dealCommonLinkMan(employeeBaseInfo);
                }
                return true;
              } else if (btnIndex == 2) {
                contactService.contactLocal(baseInfo);
                return true;
              }
            });
        }, false);
      };
    }
  ])
  .factory('contactService', ['hmsPopup', function (hmsPopup) {
    //for contact
    function onSaveContactSuccess(scanCardModal) {
      hmsPopup.showShortCenterToast('添加成功!');
      try {
        if (scanCardModal) {
          scanCardModal.hide();
        }
      } catch (e) {
      }
    };
    //for contact
    function onSaveContactError(contactError) {
      hmsPopup.showShortCenterToast('添加失败,请重新操作!');
    };
    return {  //联系人保存到本地--
      contactLocal: function (baseInfo, scanCardModal) {
        if (ionic.Platform.isWebView()) {
          var newContact = navigator.contacts.create();
          var phoneNumbers = [];
          phoneNumbers[0] = new ContactField('mobile', baseInfo.mobil, true);
          var emails = [];
          emails[0] = new ContactField('email', baseInfo.email, true);
          var organization = [];
          organization[0] = new ContactField('organization', baseInfo.organization, true);
          if (ionic.Platform.isAndroid()) {
            newContact.displayName = baseInfo.emp_name; // ios 不支持 displayName
          }
          if (ionic.Platform.isIOS()) {
            var name = new ContactName();
            name.givenName = baseInfo.emp_name.substring(1, baseInfo.emp_name.length);
            name.familyName = baseInfo.emp_name.substring(0, 1);
            newContact.name = name;
          }
          newContact.phoneNumbers = phoneNumbers;
          newContact.emails = emails;
          newContact.organizations = organization;
          newContact.save(onSaveContactSuccess(scanCardModal), onSaveContactError);
        }
      }
    }
  }]);
