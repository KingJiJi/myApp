/**
 * Created by xuchengcheng on 2016/9/1.
 */
 angular.module('myApp')
 .config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
    .state('tab.application-manage', {
      url: '/application-manage',
      views: {
        'tab-application': {
          templateUrl: 'build/pages/application/application-manage/application-manage.html',
          controller: 'applicationManageCtrl'
        }
      }
    })
  }]);
 angular.module('applicationModule')
 .controller('applicationManageCtrl', [
  '$scope',
  '$state',
  '$ionicHistory',
  'hmsPopup',
  function ($scope,
    $state,
    $ionicHistory,
    hmsPopup) {
    $scope.data={
      showReorder:false
    };
    $scope.manageAppList = [];
    var mianApplicationList = window.localStorage.empno + 'applicationList';
    $scope.appList = JSON.parse(localStorage.getItem(mianApplicationList));
    $scope.listSort = function() {
      $scope.manageAppListSort = [];
      $scope.manageAppList.reverse();
      for(var i = 0;i < $scope.manageAppList.length; i++){
        if($scope.manageAppList[i].appFlag == 'Y') {
          $scope.manageAppListSort.unshift($scope.manageAppList[i]);
        }else{
          $scope.manageAppListSort.push($scope.manageAppList[i]);
        }
      }
      $scope.manageAppList = $scope.manageAppListSort;
    }
    $scope.serveApplist = JSON.parse(localStorage.getItem('serveApplicationList'));
    for(var i = 0; i < $scope.appList.length; i++){
      for(var j = 0; j < $scope.serveApplist.length; j++){
          if($scope.serveApplist[j].functionName == $scope.appList[i].appName){//获取匹配服务器的数据
            if($scope.serveApplist[j].isLock == 'N'){
              $scope.manageAppList.push($scope.appList[i]);
            }
          }
        }
      }
      //将manageAppList排序，将所有对勾应用显示在上面之后是所有的没勾应用
      $scope.listSort();
      //取出固定在屏幕的应用
      var onLockAppList = $scope.appList.slice(0);
      console.log("取到固定应用");
      console.log(onLockAppList);
      for (var i = 0; i < $scope.manageAppList.length; i++) {
        for (var j = 0; j < onLockAppList.length; j++) {
          if(onLockAppList[j].appName == $scope.manageAppList[i].appName){
              onLockAppList.splice(j,1);
          }
        }
      }
      $scope.applicationChoose = function (application) {
        if(!$scope.data.showReorder){
          // for (var i = 0; i < $scope.appList.length; i++) {
          //   if (application.appName == $scope.appList[i].appName) {
          //     if (application.appFlag == 'Y') {
          //       for(var j = 0;j < $scope.manageAppList.length; j++){
          //         if(application.appName == $scope.manageAppList[j].appName){
          //          $scope.manageAppList.splice(j, 1);
          //        }
          //      }
          for (var i = 0; i < $scope.manageAppList.length; i++) {
            if($scope.manageAppList[i].appName == application.appName){
              if (application.appFlag == 'Y') {
               $scope.manageAppList.splice(i,1);
              //hmsPopup.showShortCenterToast('已从首页功能中移除');
              application.appFlag = 'N';
              //将改为N的功能加入到列表尾部
              $scope.manageAppList.push(application);
             }
            else if (application.appFlag == 'N') {
              for(var k = 0;k < $scope.manageAppList.length; k++){
                if(application.appName == $scope.manageAppList[k].appName){
                       //从当前列表位置删除
                       $scope.manageAppList.splice(k, 1);
                      //hmsPopup.showShortCenterToast('功能已添加到首页');
                      application.appFlag = 'Y';
                      //将改为Y的功能加入到已勾选列表尾部
                      for (var n = 0; n < $scope.manageAppList.length; n++) {
                        if($scope.manageAppList[n].appFlag == 'N'){
                          $scope.manageAppList.splice(n,0,application);
                          break;
                        }
                        if(n==$scope.manageAppList.length-1){
                         $scope.manageAppList.push(application);
                         break;
                       }
                     }
                     break;
                   }
                 }
               }
               break;
             }
           }
           $scope.appList = onLockAppList.concat($scope.manageAppList);
           localStorage.setItem(mianApplicationList,JSON.stringify($scope.appList));
           console.log("点击之后的applist:");
           console.log($scope.appList);
         }
       };

       $scope.moveItem = function(application, fromIndex, toIndex) {
        var yNum = 0;
        var lastIndex = -1;
      //判断可移动（已经勾选列表）的应用个数
      for(var i = 0; i< $scope.manageAppList.length; i++){
        if($scope.manageAppList[i].appFlag == 'Y'){
          yNum ++;
        }
      }
      //找到已经勾选列表的最后一个
      for(var j = 0; j< $scope.manageAppList.length; j++){
        if($scope.manageAppList[j].appFlag == 'Y'){
          lastIndex++;
        }
      }
      //可移动的应用个数大于1可以排序
      if(application.appFlag=='Y' && yNum >1){
        //移动距离大于已经勾选列表长度（只能放在已经勾选列表的最后一个）
        if(toIndex>=lastIndex){
          console.log("超出可排序范围");
          $scope.manageAppList.splice(fromIndex, 1);
          $scope.manageAppList.splice(lastIndex,0,application);
          $scope.appList = onLockAppList.concat($scope.manageAppList);
          localStorage.setItem(mianApplicationList, JSON.stringify($scope.appList));
        }else{
          $scope.manageAppList.splice(fromIndex, 1);
          $scope.manageAppList.splice(toIndex,0,application);
          $scope.appList = onLockAppList.concat($scope.manageAppList);
          localStorage.setItem(mianApplicationList, JSON.stringify($scope.appList));
        }
        console.log("排序之后的manageAppList");
        console.log($scope.manageAppList);
        console.log("排序之后的appList");
        console.log($scope.appList);
      }

    };

    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.$on('$ionicView.beforeEnter', function (e) {
      // $ionicTabsDelegate.showBar(true);
    });
  }]);
