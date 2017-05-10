/**
 * Created by gusenlin on 16/4/24.
 */

angular.module('messageModule')

  .controller('messageCtrl', [
    '$scope',
    'hmsHttp',
    'hmsPopup',
    'baseConfig',
    'saveParameter',
    '$ionicModal',
    '$rootScope',
    '$ionicTabsDelegate',
    'getService',
    function ($scope,
              hmsHttp,
              hmsPopup,
              baseConfig,
              saveParameter,
              $ionicModal,
              $rootScope,
              $ionicTabsDelegate,
              getService) {
      var getMessageUrl = baseConfig.baseUrl + "msgManage/getAllMsgList";
      var messageParams = {
        "username": window.localStorage.empno
      };
      $scope.messageList = [];
      $scope.badgeArr = [];
      $scope.newPage = 0;
      $scope.messageContent = '';
      $scope.badgeNumber =0;
      $scope.badgeNumber1 =0;
      var DB_NAME = window.localStorage.empno + 'history_message';

      $scope.$on('$ionicView.beforeEnter', function (e) {
        $ionicTabsDelegate.showBar(true);
        // console.log("localStorage.getItem('lastquerytime') = " + localStorage.getItem('lastquerytime'));
      });

      console.log("进入message");
      getMessageList();
      function dealHistory(msgContent, sendTime, msgId, checkFlag) { //存储成功搜索历史记录的方法
        console.log("dealHistory");
        var msgIdArray = [];
        if (localStorage.getItem(DB_NAME) !== null) {

          angular.forEach(JSON.parse(localStorage.getItem(DB_NAME)),function (item,index) {
            msgIdArray.push(item.msgId);
          });
          if(msgIdArray.indexOf(item.msgid) == -1){
            storedb(DB_NAME).insert({
              msgContent: msgContent,
              sendTime: sendTime,
              msgId: msgId,
              checkFlag: checkFlag
            }, function (err) {
              if (!err) {
                $scope.messageList = unique_better(storedb(DB_NAME).find(), 'msgId');
              } else {
                hmsPopup.showShortCenterToast(err);
              }
            });
          }
        }

        if ($scope.messageList.length > 100) {
          $scope.messageList = $scope.messageList.slice(0, 100);
        }
      }

      function getMessageList() {
        $scope.messageList = [];
        // hmsPopup.showLoading("请稍后");
        // messageParams.lastquerytime = localStorage.getItem('lastquerytime');
        hmsHttp.post(getMessageUrl, messageParams).then(function (response) {
          console.log("messageResponse = "+angular.toJson(response));
          // var date = getFormatTime(new Date());
          // localStorage.setItem('lastquerytime', date);
          if (response.data.length > 0) {
            console.log("loglog");
            // hmsPopup.hideLoading();
            $scope.noMessageFlag = false;
            angular.forEach(response.data, function (item, index) {
              var temp = {
                "msgContent": item.msgcontent,
                "sendTime": item.sendtime,
                "msgId": item.msgid,
                "checkFlag": item.readflag,
                "pushId":item.pushid
              };
                $scope.messageList.push(temp);
            });
          } else {
            $scope.noMessageFlag = true;
            // hmsPopup.hideLoading();
          }
        }, function(response){
          console.log("error111");
        });
        console.log("$scope.messageList = " + angular.toJson($scope.messageList));
      }
      // getMessageList();
      $scope.readMessage = function (index) {
        var unreadCount = 0;
        var indexCheckFlag = $scope.messageList[index].checkFlag;
        $scope.messageList[index].checkFlag = 'Y';
        console.log("readMessage  $scope.messageList = "+angular.toJson( $scope.messageList));
        angular.forEach($scope.messageList, function (item) {
          if (item.checkFlag == 'N') {
            unreadCount++;
          }
        });
        console.log("unreadCount1"+unreadCount);
        if(indexCheckFlag =='N' && unreadCount>=0){
          console.log("unreadCount2"+unreadCount);
          $rootScope.$broadcast('readOneMessage');
        }

        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(unreadCount);
        window.plugins.jPushPlugin.setBadge(unreadCount);
        $scope.messageContent = $scope.messageList[index].msgContent;
        getService.readOneMessage($scope.messageList[index].pushId);
      };
      $scope.readAll = function () {
        $scope.badgeNumber = 0;
        // $rootScope.$broadcast('readOneMessage',$scope.badgeNumber);
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        window.plugins.jPushPlugin.setBadge(0);
        angular.forEach($scope.messageList, function (item) {
          item.checkFlag = 'Y';
        });
        $rootScope.$broadcast('readAllMessage');
        getService.readAllMessage();

      };
      $scope.deleteMessage = function (message) {
        var unreadCount = 0;
        var index = $scope.messageList.indexOf(message);
        $scope.messageList.splice(index, 1);
        angular.forEach($scope.messageList, function (item) {
          if (item.checkFlag == 'N') {
            unreadCount++;
          }
        });
        $scope.badgeNumber = unreadCount;
        if($scope.badgeNumber >=0 && message.checkFlag == 'N'){
          $rootScope.$broadcast('readOneMessage');
        }
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(unreadCount);
        window.plugins.jPushPlugin.setBadge(unreadCount);
        if ($scope.messageList.length == 0) {
          $scope.noMessageFlag = 'Y';
        }
        getService.deleteMessage(message.pushId);
      };
      $rootScope.$on('refreshMessageList',function () {
        // alert('refreshMessageList');
        getMessageList();
      });




      $scope.$on('$ionicView.enter', function (e) {
        console.log('messageCtrl.$ionicView.enter');
        // getMessageList();
      });
      $scope.$on('modal.hidden', function () {
        // Execute action
        $scope.pictureAppearance = false;
      });
      // $scope.refresh = function () {
      //   $scope.newPage =1;
      //   messageParams.pageno = "1";
      //   $scope.messageList = [];
      //   getMessageList();
      //   $scope.$broadcast('scroll.refreshComplete');
      // };
      // $scope.loadMore  = function () {
      //   console.log("loadMore");
      //   $scope.newPage +=1;
      //   messageParams.pageno =$scope.newPage.toString();
      //   getMessageList();
      // }
      $ionicModal.fromTemplateUrl('build/pages/message/messageModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdrop: false
      }).then(function (modal) {
        $scope.modal = modal;
      })
    }
  ]);
