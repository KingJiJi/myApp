/**
 * Created by daiwen on 16/7/21. (-wen.dai-)
 */

'use strict';
//--通讯录组织架构模块路由-
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.contactStructure', {
          url: '/contact/contactStructure',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/structure/structure.html',
              controller: 'structureCtl'
            }
          },
          params: {
            routeId: "1",
            structureId: "00000000",
            typeId: "",
            structureName: ''
          }
        })
    }]);

angular.module('applicationModule')
  .controller('structureCtl', [
    '$scope',
    'hmsPopup',
    '$state',
    '$stateParams',
    'structureDelegate',
    'getInitStructureInfo',
    '$ionicHistory',
    '$ionicScrollDelegate',
    '$timeout',
    'currentStackService',
    'baseConfig',
    function ($scope,
              hmsPopup,
              $state,
              $stateParams,
              structureDelegate,
              getInitStructureInfo,
              $ionicHistory,
              $ionicScrollDelegate,
              $timeout,
              currentStackService,
              baseConfig) {
      /**
       * var section
       */

      {
        var curr_page = ''; //当前组织架构层级的页面
        var curr_department_id = ''; //当前页面所在组织的department ID
        var curr_type_id = '';
        var viewTag = document.getElementsByTagName('ion-view');
        var viewName = viewTag[viewTag.length - 1].attributes[0].value;
        // var screenWidth = document.body.clientWidth;
        var screenWidth = 320; //iphone 5 的宽度
        var structureName = '';
        var getEmployeeImgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';
        var structureParams = {
          "id": ""
        };
        $scope.showScroll = true;
        $scope.childrenDept = []; //当前组织下一级的信息
        $scope.deptStaff = []; //当前这一级组织用户信息
        $scope.departmentName = ''; //当前组织所属层级的名字
        $scope.totalStaffNumber = ''; //当前组织所属层级的总人数(包括全部下级的人数)
        $scope.currentStackList = [{name: '通讯录', id: ''}]; //页栈列表
        $scope.hasAdmin = false; //默认不是管理员
        // $scope.showLoading = true;
      }

      if (currentStackService.getStackList().length > 0) {
        $scope.currentStackList = currentStackService.copyStackList();
        currentStackService.setStackList($scope.currentStackList);
      }
      if ($scope.currentStackList.length == 1) {
        $scope.showLogo = true;
      }
      curr_page = $stateParams.routeId;
      curr_department_id = $stateParams.structureId;
      curr_type_id = $stateParams.typeId;
      structureName = $stateParams.structureName;
      structureParams.id = curr_page;
      console.log("structureName11" + structureName);
      console.log("$stateParams.typeId = " + $stateParams.typeId);
      console.log("$stateParams.structureId = " + $stateParams.structureId);
      function dynamicAddScrollWidth() { //动态增长ion-scroll的宽度
        // var elem = angular.element(document.querySelector('.scroll'));
        // var parent  = angular.element(elem.parent());
        // console.log("elem "+parent[0].style.transform);
        // parent[0].style.transform = 'none';
        // angular.element('.scroll').css('transform', 'none');
        var newWidth = parseInt(screenWidth);
        var stackListLength = $scope.currentStackList.length;
        if (stackListLength == 2) {
          newWidth = parseInt(screenWidth) + 'px';
        } else if (stackListLength > 2) {
          for (var i = 2; i < stackListLength; i++) {
            newWidth += 15 * ($scope.currentStackList[i].name.length + 1);
          }
          newWidth = newWidth + 'px';
        }
        angular.element('.row-scroll-contact').css('width', newWidth);
      };

      $scope.$on('$ionicView.beforeEnter', function () {

        // $ionicScrollDelegate.$getByHandle('contactStructureDelegate').scrollTop();
        $ionicScrollDelegate.$getByHandle('contactStructureDelegate').scrollBy(1000, 0, true);
        var pageCount = currentStackService.getPageCount();
        console.log("pageCount = " + pageCount);
        console.log("$scope.currentStackList.length = " + $scope.currentStackList.length);
        if (pageCount === $scope.currentStackList.length) {
        } else {
          for (var i = 0; i < ($scope.currentStackList.length - pageCount); i++) {
            $scope.currentStackList.pop();
            console.log("pop $scope.currentStackList = " + angular.toJson($scope.currentStackList));
          }
          currentStackService.setStackList($scope.currentStackList);
        }
        dynamicAddScrollWidth();
      });
      function getStructureInfo(result) { //获取数据的回调函数
        console.log("Object.keys(result).length = " + Object.keys(result).length);
        console.log("result = " + angular.toJson(result));
        var tempChildDeptArray = [];
        try {
          if (Object.keys(result).length !== 0) {

            $ionicScrollDelegate.$getByHandle('contactStructureDelegate').scrollBy(1000, 0, true);
            if (result.T_DEPARTMENT.item instanceof Array) {
              if (result.T_DEPARTMENT.item.length > 1) {
                angular.forEach(result.T_DEPARTMENT.item, function (item, index) {
                  var tempChildDept = {
                    NAME: item.NAME,
                    ID: item.ID,
                    PARENTID: item.PARENTID,
                    OTYPE: item.OTYPE,
                    CHECK: true
                  };
                  if (item.NAME !== '集团' || item.NAME !== '租车' || item.NAME !== '专车' || item.NAME !== '买卖车' || item.NAME !== '闪贷') {
                    tempChildDept.CHECK = false;
                  }
                  tempChildDeptArray.push(tempChildDept);
                });
                $scope.childrenDept = tempChildDeptArray;
                // $scope.showLoading = false;
                console.log("$scope.showNormalLogo  = " + $scope.showNormalLogo);
              }
            } else {
              if ("" !== result.T_DEPARTMENT) {
                var tempDept = {
                  "NAME": result.T_DEPARTMENT.item.NAME,
                  "ID": result.T_DEPARTMENT.item.ID,
                  "OTYPE": result.T_DEPARTMENT.item.OTYPE
                };
                $scope.childrenDept.push(tempDept);
                // $scope.showLoading = false;
              } else {
                $scope.childrenDept = [];
                // $scope.showLoading = false;
              }

            }

            console.log("result.T_EMPLOYEE.item = " + angular.toJson(result.T_EMPLOYEE.item));
            if (result.T_EMPLOYEE.item instanceof Array) {
              if (result.T_EMPLOYEE.item.length > 1) {

                angular.forEach(result.T_EMPLOYEE.item, function (item, index) {
                  var nameJobString = item.USERNAME;
                  var JOB = nameJobString.split('.').splice(0, 1);
                  var USERNAME = nameJobString.split('.').splice(1, 1);
                  var temp1 = {
                    "USERNAME": USERNAME,
                    "USERID": item.USERID,
                    "GESCH": getEmployeeImgUrl + item.USERID,
                    "JOB": JOB
                  };
                  // $scope.showLoading = false;
                  $scope.deptStaff.push(temp1);
                });

                console.log("有员工");
                console.log("$scope.deptStaff = " + angular.toJson($scope.deptStaff));
              }
            } else {
              if (result.T_EMPLOYEE !== "") {
                var nameJobString = result.T_EMPLOYEE.item.USERNAME;
                var JOB = nameJobString.split('.').splice(0, 1);
                var USERNAME = nameJobString.split('.').splice(1, 1);
                var temp2 = {
                  "USERNAME": USERNAME,
                  "USERID": result.T_EMPLOYEE.item.USERID,
                  "GESCH": getEmployeeImgUrl + result.T_EMPLOYEE.item.USERID,
                  "JOB":JOB
                };
                $scope.deptStaff.push(temp2);
                console.log("$scope.deptStaff = " + angular.toJson($scope.deptStaff));
                // $scope.showLoading = false;
              } else {
                $scope.deptStaff = [];
                // $scope.showLoading = false;
              }
            }
            var scrollData = {
              name: result.NAME,
              id: result.DEPARTMENTID
            };
            console.log("$stateParams.structureName = " + structureName);
            $scope.currentStackList.push(scrollData);
            currentStackService.setStackList($scope.currentStackList);
            console.log("$scope.currentStackList = " + angular.toJson($scope.currentStackList));
            $scope.departmentName = result.NAME;
            dynamicAddScrollWidth();
          }
        } catch (e) {
        }

      }


      getInitStructureInfo.getStructure(getStructureInfo, curr_department_id, curr_type_id);

      $scope.goLastPage = function () { //返回按钮的响应
        if ($scope.currentStackList.length > 2) {
          $scope.currentStackList.pop();
          currentStackService.setStackList($scope.currentStackList);
          console.log("pop $scope.currentStackList = " + angular.toJson($scope.currentStackList));
        } else {
          $scope.currentStackList = [{name: '通讯录', id: ''}];
          currentStackService.setStackList($scope.currentStackList);
        }
        dynamicAddScrollWidth();
        $timeout(function () {
          $ionicHistory.goBack();
        }, 251);
      };

      $scope.goInputSearch = function () { //去搜索界面
        $state.go('tab.contactSearch');
      };

      $scope.goBackStack = function (index, length, newId) {
        index = parseInt(index) - parseInt(length) + 1;
        $ionicHistory.goBack(index);
        console.log("index = " + index);
        $scope.currentStackList.splice(index, -index);
        currentStackService.setStackList($scope.currentStackList);
      };
      $scope.closeWebSite = function () {
        $ionicHistory.goBack(-($scope.currentStackList.length));  // yunfei 退回主页
        $scope.currentStackList = [{name: '通讯录', id: ''}];
        currentStackService.setStackList($scope.currentStackList);
      };
      $scope.nextStructure = function (newDepartmentId, newTypeId, structureName) { //到下一级组织架构界面
        console.log("newDepartmentId = " + newDepartmentId);
        console.log("$stateParams.structureId = " + $stateParams.structureId);
        try {
          if (curr_page === 'currentDepartment') {
            curr_page = '';
          }
          if (curr_page >= structureDelegate.getStructureId()) {
            curr_page = '';
          }
          structureDelegate.setStructureId(['1', '2']); //provider 在controller中的使用方法
          if ($scope.childrenDept.length != 0 || $scope.childrenDept.length) {
            console.log("newTypeId = " + newTypeId);
            $state.go("tab.contactStructure" + curr_page, {
              routeId: ++curr_page,
              structureId: newDepartmentId,
              typeId: newTypeId,
              structureName: structureName
            });
          }
        } catch (e) {
          warn("update the highest!" + e);
        }
      };

      $scope.goDetailInfo = function (newEmployeeNumber) { //去详情界面
        $state.go('tab.employeeDetail', {employeeNumber: newEmployeeNumber});
      };
    }
  ])
  .provider('structureDelegate', function () {
    this._id = 15;
    this.$get = function () {
      var that = this;
      return {
        getStructureId: function () {
          return that._id;
        },
        setStructureId: function (newIdArray) {
          that._id = newIdArray;
        }
      }
    }
  })
  .config(['$stateProvider', 'structureDelegateProvider',
    function ($stateProvider, structureDelegateProvider) {
      for (var i = 1; i < structureDelegateProvider._id; i++) { //循环路由
        $stateProvider.state('tab.contactStructure' + i, {
          url: '/contact/contactStructure/' + i,
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/structure/structure.html',
              controller: 'structureCtl'
            }
          },
          params: {
            routeId: "",
            structureId: "",
            typeId: "",
            structureName: ''
          }
        });
      }
    }])
  .factory('currentStackService', ['$http', function ($http) {
    var stackList = [];
    var pageCount = 1;
    return {
      setStackList: function (arr) {
        stackList = arr;
        pageCount++;
      },
      copyStackList: function () {
        return angular.copy(stackList);
      },
      getStackList: function () {
        return stackList;
      },
      getPageCount: function () {
        return pageCount;
      },
      deleteStackList: function (arr) {
        arr.pop();
      }
    }
  }]);
