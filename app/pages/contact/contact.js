/**
 *  modify by shellWolf on 16/06/28.
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function($stateProvider){
      $stateProvider
        .state('tab.contact',{
          url:'/contact',
          views:{
            'tab-application':{
              templateUrl:'build/pages/contact/contact.html',
              controller:'ContactCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('ContactCtrl', [
    '$scope',
    '$ionicScrollDelegate',
    '$ionicModal',
    'baseConfig',
    'hmsPopup',
    '$state',
    '$cordovaActionSheet',
    'contactService',
    'getInitStructureInfo',
    '$ionicHistory',
    '$timeout',
    'currentStackService',
    function ($scope,
              $ionicScrollDelegate,
              $ionicModal,
              baseConfig,
              hmsPopup,
              $state,
              $cordovaActionSheet,
              contactService,
              getInitStructureInfo,
              $ionicHistory,
              $timeout,
              currentStackService) {
      /**
       * var section
       */
      {
        $scope.customContactsInfo = [];
        $scope.showTopInput = false; // 默认不显示bar上的搜索框
        $scope.structureName = ''; //当前员工所属层级的名字
        $scope.currentStructure = {};
        var CONTACT_TAG = 'contact:\n';
        var position = ''; //记录滚动条的位置--
        var LINK_MAN = window.localStorage.empno+'common_linkman2';
      }

      function getCurrentDepartInfo(result) {
        try {
          if (Object.keys(result).length !== 0) { //枚举
            $scope.currentStructure = result;
            for (var i = 1; i < result.deptInfo.length; i++) {
              if (i === (result.deptInfo.length - 1)) {
                $scope.structureName += result.deptInfo[i].name;
              } else {
                $scope.structureName += result.deptInfo[i].name + '-';
              }
            }
          }
        } catch (e) {
        }
      };

      // getInitStructureInfo.getCurrentStructure(getCurrentDepartInfo);


      function getCommonLinkMan() { //获取常用联系人
        $scope.customContactsInfo = unique_better(storedb(LINK_MAN).find(), 'employeeNumber');
        if ($scope.customContactsInfo.length > 15) {
          $scope.customContactsInfo = $scope.customContactsInfo.slice(0, 15);
        }
      }
      $scope.deleteCommonLinkMan = function(employee) {
        var index = $scope.customContactsInfo.indexOf(employee);
        $scope.customContactsInfo.splice(index,1);
        localStorage.setItem(LINK_MAN, JSON.stringify($scope.customContactsInfo));
      };
      $scope.$on('$ionicView.beforeEnter', function (e) {
        var blankArr = [];
        currentStackService.setStackList(blankArr);
        console.log("contact的currentStackService.currentStackList = "+angular.toJson(currentStackService.getStackList()));
        getCommonLinkMan();
        // deleteHistory();
      });

      $scope.$on('$destroy', function (e) {
        if (baseConfig.debug) {
          console.log('ContactCtrl.$destroy');
        }
      });
      $scope.goBack = function () {
        $timeout(function () {
          $ionicHistory.goBack();
        },251);
      };
      $scope.watchScroll = function () { //滚动内容时执行的method
        position = $ionicScrollDelegate.getScrollPosition().top;
        console.log("position = "+position);
        $scope.$apply(function () {
          if (position < 33) {
            $scope.showTopInput = false;
          } else if (position >= 33) {
            $scope.showTopInput = true;
          }
        });
      };
      // function storeStructure(structureParam,newObj){
      //   storedb(structureParam).insert(newObj,function (err) {
      //   })
      // }


      $scope.telNumber = function (event, baseInfo) { //拨打电话按钮的响应事件
        event.stopPropagation(); //阻止事件冒泡
        //常用联系人拨打电话
        window.location.href = "tel:" + baseInfo.replace(/\s+/g, "");
      };

      $scope.goInputSearch = function () { //去搜索界面
        $state.go('tab.contactSearch');
      };

      $scope.goStructure = function (flag) {
        console.log("goStructure");

        $state.go('tab.contactStructure');
      };

      $scope.goDetailInfo = function (newEmployeeNumber) {
        $state.go('tab.employeeDetail', {employeeNumber: newEmployeeNumber});
      };

    }])
  .service('getInitStructureInfo', ['hmsHttp', 'baseConfig', 'commonContactService' ,'hmsPopup', function (hmsHttp, baseConfig,commonContactService,hmsPopup) {
    // var _currentStructureUrl = baseConfig.queryPath + '/dept/getStaffDeptInfo';
    // var _structureUrl = baseConfig.queryPath + '/dept/getDetail';
    var _structureUrl = baseConfig.sapUrl+"ZhrDepartmentList";
    var uniqueStructureArr = [];
    this._returnData = {};
    return {
      getNewStructure: function(){

      },
      getCurrentStructure: function (callback) {
        hmsHttp.post(_currentStructureUrl).then(function (response) {
          if (response.returnData) {
          } else {
            response.returnData = {};
          }
          callback(response.returnData);
        }, function(response){
        });
        //  .error(function (error) {
        //});
      },
      getStructure: function (callback, newId,typeId) {
        // var structureParam = newId + typeId;
        // localStorage.removeItem(structureParam);
        // console.log("localStorage[structureParam] = "+angular.toJson(localStorage[structureParam]));
        hmsPopup.showLoading("请稍后");
        var params = {
          "ZHR_DEPARTMENT_LIST":{
            "ID":newId,
            "OTYPE":typeId,
            "T_DEPARTMENT":{
              "item":{
                "OTYPE":"",
                "ID":"",
                "NAME":"",
                "PARENTID":"",
                "PARENTTY":""
              }
            },
            "T_EMPLOYEE":{
              "item":{
                "USERID":"",
                "USERNAME":""
              }
            }
          }
        };

        console.log("typeId = "+typeId);
        hmsHttp.post(_structureUrl, params).then(function (response) {
          hmsPopup.hideLoading();
          try {
            this._returnData = response;
          } catch (e) {
            this._returnData = {};
          }
          callback(this._returnData);
        }.bind(this), function(response){
          hmsPopup.hideLoading();
        });
        //  .error(function (error) {
        //  hmsPopup.hideLoading();
        //});

      }
    }

  }])
  .factory('commonContactService', [function () {
    var _pageName = '';
    var _newEmp = {};
    var _newDate = '';
    return {
      setGoContactFlg: function (newPage) {
        _pageName = newPage;
      },
      getContactFlag: function () {
        return _pageName;
      },
      setEmpInfo: function (newEmp) {
        _newEmp = newEmp;
      },
      getEmpInfo: function () {
        return _newEmp;
      },
      setNewDate: function (newDate) {
        _newDate = newDate;
      },
      getNewDate: function () {
        return _newDate;
      }
    }
  }]);


