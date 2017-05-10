/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('loginModule').controller('TabsCtrl', ['$scope', '$rootScope', '$state', 'baseConfig','getService','saveParameter','$ionicTabsDelegate','$timeout',
  function ($scope, $rootScope, $state, baseConfig,getService,saveParameter,$ionicTabsDelegate,$timeout) {
    $scope.badges = {
      messageCount:0
    };


    var DB_NAME = window.localStorage.empno + 'history_message';



    $scope.selectMessageTab = function () {
      // $scope.badges.messageCount = 0;
      console.log("选择消息");

      // //选择消息tab时计算未读消息数目
      // var promise = getService.getMessageCount(window.localStorage.empno,localStorage.getItem('lastquerytime'));
      // promise.then(function(response){
      //   if(localStorage.getItem(DB_NAME) !== null){
      //     var o = JSON.parse(localStorage.getItem(DB_NAME)).length;
      //     console.log("setAndroidBadge.length = "+JSON.parse(localStorage.getItem(DB_NAME)).length);
      //     var a = [];
      //     var k = 0;
      //     if(o !== 0){
      //       a = JSON.parse(localStorage.getItem(DB_NAME));
      //       angular.forEach(a,function (item,index) {
      //         if(item.checkFlag == false){
      //           k++;
      //         }
      //       });
      //       console.log(" k1 = "+k);
      //       console.log("$scope.badges"+$scope.badges.messageCount);
      //       if(ionic.Platform.isIOS()){
      //         $scope.badges.messageCount = k+response.msgCount;
      //       }else{
      //         $scope.badges.messageCount = k;
      //       }
      //     }
      //   }else{
      //     $scope.badges.messageCount = response.msgCount;
      //     // saveParameter.setMessageCounts($scope.badges.messageCount);
      //
      //     console.log("response.msgCount = "+response.msgCount);
      //   }
      // });

    };
    $scope.$on('$ionicView.beforeEnter', function () {
      var statename = $state.current.name;
      if (baseConfig.debug) {
        console.log('$ionicView.beforeEnter statename ' + statename);
      }
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename != 'tab.message' && statename != 'tab.application' && statename != 'tab.myInfo') {
        $scope.hideTabs = true;
      }
    });

    $scope.$on('$ionicView.afterEnter', function () {
      var statename = $state.current.name;
      if (baseConfig.debug) {
        console.log('$ionicView.afterEnter statename ' + statename);
      }
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename === 'tab.message' || statename === 'tab.application' || statename === 'tab.myInfo') {
        $scope.hideTabs = false;
      }
    });
    $rootScope.$on('setBadge',function (event,data) {
      $scope.badges.messageCount = data;
      $scope.$apply();
    });
    $rootScope.$on('readOneMessage',function () {
      if($scope.badges.messageCount>0){
        $scope.badges.messageCount = $scope.badges.messageCount -1;
      }
      console.log("收到readOneMessage");
      // $scope.$apply();
    });
    $rootScope.$on('readAllMessage',function () {
      $scope.badges.messageCount = 0;
      console.log("readAllMessage");
      // $scope.$apply();
    });
    // $rootScope.$on('setAndroidBadgeToTab',function (event,data) {
    //   $scope.badges.messageCount = data;
    //   console.log("setAndroidBadgeToTab");
    // });
    //设置APP刚启动的安卓和IOS消息按钮角标
    $rootScope.$on('setAndroidBadge',function () {
      console.log("setAndroidBadge");
      // alert('接收到setAndroidBadge');
      // alert('lastquerytime:'+localStorage.getItem('lastquerytime'));
      var promise = getService.getMessageCount(window.localStorage.empno);
      // promise.then(function(){
      //
      // });

      promise.then(function(response){
        // alert('response.msgCount:'+response.unreadMsgCount);
        $scope.badges.messageCount = parseInt(response.unreadMsgCount);
        if(ionic.Platform.isIOS()){
          window.plugins.jPushPlugin.setApplicationIconBadgeNumber($scope.badges.messageCount);
          window.plugins.jPushPlugin.setBadge($scope.badges.messageCount);
        }
        console.log("response.msgCount = "+response.unreadMsgCount);
      });

    });


    var onReceiveNotification = function(event) {
      // alert('监听到收到消息');
      console.log("$scope.badges.messageCount"+$scope.badges.messageCount);
      // $rootScope.$broadcast('refreshMessageList');
      $timeout(function () {
        $rootScope.$broadcast('setAndroidBadge');
        $rootScope.$broadcast('refreshMessageList');
      },1500);
      console.log('监听到收到消息');
    };
    //
    // var onReceiveNotification = function(event) {
    //   console.log("$scope.badges.messageCount"+$scope.badges.messageCount);
    //   $scope.badges.messageCount +=1;
    //   window.plugins.jPushPlugin.setApplicationIconBadgeNumber($scope.badges.messageCount);
    //   $rootScope.$broadcast('refreshMessageList');
    //   console.log('监听到收到消息');
    //   alert('监听到收到消息');
    //   alert('监听到收到消息$scope.badges.messageCount = '+$scope.badges.messageCount);
    // };
    // var onOpenNotification = function (event) {
    //   var alertContent;
    //   alertContent = event.aps.alert;
    //   alert("open Notificaiton:" + alertContent);
      //   window.plugins.jPushPlugin.getApplicationIconBadgeNumber(function(data) {
      //     console.log("badgeNumber  ="+data);
      //     $scope.badgeNumber = data;
      //   });
      // $scope.badges.messageCount =$scope.badgeNumber+1;
      // window.plugins.jPushPlugin.setApplicationIconBadgeNumber($scope.badges.messageCount);
      // $rootScope.$broadcast('refreshMessageList');
    // };
    // var onBackgroundNotification = function (event) {
    //   $scope.badges.messageCount +=1;
    //   $scope.$apply();
    // };

      // window.plugins.jPushPlugin.receiveNotificationInAndroidCallback = function (data) {
      //   console.log('安卓接收到了广播');
      //   $scope.badges.messageCount +=1;
      //   $rootScope.$broadcast('refreshMessageList');
      //   $scope.$apply();
      // };

    document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);

    // document.addEventListener("jpush.openNotification", onOpenNotification, false);
    // document.addEventListener("jpush.backgroundNotification", onBackgroundNotification, false);




  }]);
