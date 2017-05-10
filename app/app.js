// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('myApp', [
  'ionic',
  'ngCordova',
  'loginModule',
  'baseConfig',
  'messageModule',
  'contactModule',
  'applicationModule',
  'myInfoModule',
  'utilModule',
  'tsApproveModule',
  'HmsModule',
  'ionicImgCache',
  'hSweetAlert'
]);

angular.module('myApp')
  .run([
    '$ionicPlatform',
    '$timeout',
    'baseConfig',
    'checkVersionService',
    '$state',
    'hmsPopup',
    'getService',
    'saveParameter',
    'imgService',
    '$rootScope',
    '$cordovaSplashscreen',
    function ($ionicPlatform,
              $timeout,
              baseConfig,
              checkVersionService,
              $state,
              hmsPopup,
              getService,
              saveParameter,
              imgService,
              $rootScope,
              $cordovaSplashscreen) {


      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $timeout(function () {
          if (ionic.Platform.isWebView()) {
            $cordovaSplashscreen.hide();
          }
        }, 500);
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {

          StatusBar.styleLightContent();
        }
        // if (localStorage.getItem('firstRunTime') == undefined || localStorage.getItem('firstRunTime') == "") {
        //   var date = getFormatTime(new Date());
        //   localStorage.setItem('firstRunTime', date);
        //   localStorage.setItem('lastquerytime', date);
        //   // alert('selectMessageTab-lastquerytime:'+localStorage.getItem('lastquerytime'));
        // }
        console.log("执行app.js");
        console.log('getFormatTime = '+getFormatTime(new Date()));
        // if(ionic.Platform.isAndroid()){
        // $timeout(function () {
        //   // if (ionic.Platform.isAndroid()) {
        //     alert('app.js中的广播');
        //     $rootScope.$broadcast('setAndroidBadge');
        //   // }
        //   alert('执行app.js里面的setAndroidBadge');
        // }, 2000);

        $timeout(function () {
          $rootScope.$broadcast('setAndroidBadge');
        },1500);

        var initiateUI = function () {
          try {
            window.plugins.jPushPlugin.init();
            // window.plugins.jPushPlugin.resumePush();
            if (device.platform != "Android") {
              window.plugins.jPushPlugin.setDebugModeFromIos();
                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                window.plugins.jPushPlugin.setBadge(0);
            } else {
              window.plugins.jPushPlugin.setDebugMode(true);
              window.plugins.jPushPlugin.setStatisticsOpen(true);
            }
          } catch (exception) {
            if (baseConfig.debug) {
              console.log(exception);
            }
          }
        };

        var analyze = function (currentState) {
          if (currentState.views) {
            if (currentState.views['tab-application']) {
              return 'tab.message';
            } else if (currentState.views['tab-message']) {
              return 'tab.message';
            } else if (currentState.views['tab-myInfo']) {
              return 'tab.message';
            } else if (currentState.views['tab-contact']) {
              return 'tab.message';
            }
          }
          return '';
        };

        var onOpenNotification = function (event) {
          try {
            // $timeout(function () {
            //   $rootScope.$broadcast('setAndroidBadge');
            // },1500);
            // $state.go(analyze($state.current));
              var alertContent;
              alertContent = event.aps.alert;
            console.log('alertContent'+alertContent);
          } catch (exception) {
            console.log("JPushPlugin:onOpenNotification" + exception);
          }
        };
        document.addEventListener("jpush.openNotification", onOpenNotification, false);
        initiateUI();

        // var date  = getFormatTime(new  Date());
        // saveParameter.setMessageTime(date);
        // $timeout(function () {
        //if (baseConfig.debug) {
        //  hmsPopup.showPopup('window.localStorage.token ' + window.localStorage.token);
        //  hmsPopup.showPopup('window.localStorage.access_token ' + window.localStorage.access_token);
        //}
        //   if (!window.localStorage.token || window.localStorage.token == '') {
        //   } else {
        //     checkVersionService.checkAppVersion();
        //   }
        // });
        imgService.setAndroidBadgeFlag('true');
        var mainImgList = [];
        var mainImgUrl = baseConfig.mainImgPath + "focus.do?";
        var mainImgListUrl = window.localStorage.empno + 'mainImgListUrl';
        try {
          getService.getMethod(mainImgUrl).success(function (response) {
            mainImgList = response.result;
            imgService.setImgList(mainImgList);
            localStorage.setItem(mainImgListUrl, JSON.stringify(mainImgList));
            imgService.setNoNetFlag('success');
            $rootScope.$broadcast('getMainImgList');

            // console.log("$scope.mainImgList = "+angular.toJson(mainImgList));
          }).error(function () {
            imgService.setNoNetFlag('failed');
            $rootScope.$broadcast('getMainImgList');
            hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
            console.log("error = " + angular.toJson(error));

          });
        } catch (e) {
          imgService.setNoNetFlag('failed');
          $rootScope.$broadcast('getMainImgList');
          console.log(e);
        }



        if(ionic.Platform.isAndroid()){
          window.plugins.jPushPlugin.receiveNotificationInAndroidCallback = function (data) {
            try {
              // alert('监听到收到消息');
              data = JSON.stringify(data);
              console.log('JPushData: ' + data);
              $timeout(function () {
                $rootScope.$broadcast('setAndroidBadge');
                $rootScope.$broadcast('refreshMessageList');
              },1500);
            } catch(exception) {
              console.log(exception)
            }
          };

        }else{

          // document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
        }

      });


      $ionicPlatform.on('resume', function () {
        $timeout(function () {
          if(imgService.getAndroidBadgeFlag() == 'true'){
            // alert('resume事件');
            $rootScope.$broadcast('setAndroidBadge');
            $rootScope.$broadcast('refreshMessageList');
          }
        }, 1500);
      });
    }]);

angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider', 'baseConfig',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, baseConfig) {
      $httpProvider.interceptors.push('httpRequestHeader');//注册过滤器
      //$httpProvider.interceptors[0] = $httpProvider.interceptors[0] + "access_token=" + window.localStorage.token;
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');
      // $ionicConfigProvider.views.swipeBackEnabled(false);
      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');

      $stateProvider
      // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tab',
          caches: true,
          abstract: true,
          templateUrl: 'build/pages/tab/tabs.html',
          controller: 'TabsCtrl'
        })

        // Each tab has its own nav history stack:
        .state('tab.message', {
          url: '/message',
          views: {
            'tab-message': {
              templateUrl: 'build/pages/message/message.html',
              controller: 'messageCtrl'
            }
          }
        })

        .state('tab.application', {
          url: '/application',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application.html',
              controller: 'applicationCtrl'
            }
          }
        })

        // .state('tab.contact', {
        //   url: '/contact',
        //   views: {
        //     'tab-contact': {
        //       templateUrl: 'build/pages/contact/contact.html',
        //       controller: 'ContactCtrl'
        //     }
        //   }
        // })
        .state('tab.myInfo', {
          url: '/myInfo',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/myInfo.html',
              controller: 'myInfoCtrl'
            }
          }
        })

        .state('login', {
          url: '/login',
          templateUrl: 'build/pages/login/login.html',
          controller: 'loginCtrl',
          params: {
            logoutFlag: ''
          }
        });

      if (window.localStorage.token && window.localStorage.token != "") {
        $urlRouterProvider.otherwise('/tab/application');
        // $state.go('tab.application');
      } else {
        $urlRouterProvider.otherwise('/login');
      }
    }]);
