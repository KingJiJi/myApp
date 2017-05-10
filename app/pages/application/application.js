/**
 * Created by gusenlin on 16/4/24.
 */
//应用模块
angular.module('applicationModule')

  .controller('applicationCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'imgService',
    'hmsPopup',
    '$ionicSlideBoxDelegate',
    '$rootScope',
    '$timeout',
    'checkVersionService',
    '$ionicTabsDelegate',
    '$cordovaSplashscreen',
    'getService',
    '$ionicPopover',
    'hmsHttp',
    'sweet',
    function ($scope,
              $state,
              baseConfig,
              imgService,
              hmsPopup,
              $ionicSlideBoxDelegate,
              $rootScope,
              $timeout,
              checkVersionService, $ionicTabsDelegate, $cordovaSplashscreen, getService, $ionicPopover, hmsHttp,sweet) {
      $scope.versionType = baseConfig.version.versionType;
      $scope.picHeight = {
        height: (window.screen.height * 0.5 + 'px')
      };
      $scope.pic_bar = {
        top: (window.screen.height * 0.5 - 56 + 'px')
      };

      //changed by wl
      var mainImgList1 = $scope.mainImgList1 = [];
      $scope.mainImgList1 = [
        {imgURL:"build/img/application/lunbotu/aplct01.jpg"},
        {imgURL:"build/img/application/lunbotu/aplct02.jpg"},
        {imgURL:"build/img/application/lunbotu/aplct03.jpg"},
        {imgURL:"build/img/application/lunbotu/aplct04.jpg"},
        {imgURL:"build/img/application/lunbotu/aplct05.jpg"},
        {imgURL:"build/img/application/lunbotu/aplct06.jpg"},
      ];
      $scope.mainImgList = [];
      $scope.noNetFlag = 'success';
      $scope.slideHasChanged = function ($index) {//轮播图为两张的时候
        if ($scope.mainImgList.length == 2) {
          $timeout.cancel($scope.t1);
          $timeout.cancel($scope.t2);
          if ($index === 0) {
            $scope.t1 = $timeout(function () {
              $ionicSlideBoxDelegate.slide(1);
            }, 3000)
          } else if ($index === 1) {
            $scope.t2 = $timeout(function () {
              $ionicSlideBoxDelegate.slide(0);
            }, 3000)
          }
        }
      };

      var MAIN_URL = window.localStorage.empno + 'mainImgListUrl'
      $rootScope.$on('getMainImgList', function () {
        if(localStorage.getItem(MAIN_URL) !== undefined){
          $scope.mainImgList = JSON.parse(localStorage.getItem(MAIN_URL));
        }
        // $scope.mainImgList = imgService.getImgList();
        $scope.noNetFlag = imgService.getNoNetFlag();
        console.log("广播的flag = " + imgService.getNoNetFlag());
        if($scope.mainImgList.length ==2){
          $scope.slideHasChanged(0);
        } else {
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.loop(true);
        }
        imgService.setAndroidBadgeFlag('true');
        console.log("收到广播了..");
        console.log('phone type = '+getPhoneType());
      });
      console.log("$scope.noNetFlag = " + $scope.noNetFlag);
      $scope.refreshPic = function () {
        var mainImgList = [];
        var mainImgUrl = baseConfig.mainImgPath + "focus.do?";
        try {
          getService.getMethod(mainImgUrl).success(function (response) {
            mainImgList = response.result;
            imgService.setImgList(mainImgList);
            $scope.mainImgList = imgService.getImgList();
            $ionicSlideBoxDelegate.update();
            if($scope.mainImgList.length ==2){
              $scope.slideHasChanged(0);
            } else {
              $ionicSlideBoxDelegate.loop(true);
            }
            imgService.setNoNetFlag('success');
            $scope.noNetFlag = imgService.getNoNetFlag();
            // console.log("$scope.mainImgList = "+angular.toJson(mainImgList));
          }).error(function () {
            imgService.setNoNetFlag('failed');
            $scope.noNetFlag = imgService.getNoNetFlag();
            hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
          });
        } catch (e) {
          imgService.setNoNetFlag('failed');
          $scope.noNetFlag = imgService.getNoNetFlag();
          console.log(e);
        }
      };

      $scope.goApplication = function (appName, $event) {
        if (appName == '通讯录') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.contact');
        } else if (appName == '人力助手') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.apply-center-manage', {flag: "personnel-application"});
        } else if (appName == '财务助手') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.apply-center-manage', {flag: "financial-application"});
        }
          // else if (appName == '办公助手') {
          // $ionicTabsDelegate.showBar(false);
          // $state.go('tab.apply-center-manage', {flag: "total-office"});
        // }
        else if (appName == '我的申请') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.approval-center',{flag: "applyCenter"});
        } else if (appName == '我的审批') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.approval-center', {flag: "HomePage"});
        } else if (appName == '号外公告') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.company-notice');
        // } else if (appName == '神州头条') {
        } else if (appName == '内聘平台') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.company-advisory-list');
        }

      };
      $scope.goApplicationManage = function () {
        $ionicTabsDelegate.showBar(false);
        $state.go('tab.application-manage');
      };
      $scope.$on('$destroy', function (e) {
        if (baseConfig.debug) {
          console.log('applicationCtrl.$destroy');
        }
      });

      $scope.$on('$ionicView.enter', function () {
        //$ionicSlideBoxDelegate.stop();
        if (ionic.Platform.isWebView()) {
          $cordovaSplashscreen.hide();
        }
        $scope.mainImgList = [];
        $scope.mainImgList = imgService.getImgList();
        $scope.noNetFlag = imgService.getNoNetFlag();
        if($scope.mainImgList.length == 2){
          $ionicSlideBoxDelegate.start();
          $ionicSlideBoxDelegate.slide(0);
        } else {
          $ionicSlideBoxDelegate.start();
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.loop(true);
        }
        console.log("进入主页了application");
      });

      $scope.$on('$ionicView.beforeEnter', function (e) {
        $ionicTabsDelegate.showBar(true);
        $timeout(function () {
          checkVersionService.checkAppVersion();
        }, 500);
        var mianApplicationList = window.localStorage.empno + 'applicationList';
        // 20000011applicationList
        // $scope.mianAppList = JSON.parse(localStorage.getItem(mianApplicationList));
        //add by wl
        $scope.mianAppList = [//初始化首页图标
          {
            "appImg": "build/img/application-manage/contact@2x.png",
            "mainAppImg": "build/img/application-manage/contact@3x.png",
            "appName": "通讯录",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/Personnel-application@2x.png",
            "mainAppImg": "build/img/application-manage/Personnel-application@3x.png",
            "appName": "人力助手",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/Financial-application-@2x.png",
            "mainAppImg": "build/img/application-manage/Financial-application-@3x.png",
            "appName": "财务助手",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/_integrated-office@2x.png",
            "mainAppImg": "build/img/application-manage/_integrated-office@3x.png",
            "appName": "办公助手",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/My-Application@2x.png",
            "mainAppImg": "build/img/application-manage/My-Application@3x.png",
            "appName": "我的申请",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/My-approval@2x.png",
            "mainAppImg": "build/img/application-manage/My-approval@3x.png",
            "appName": "我的审批",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/Company-notice@2x.png",
            "mainAppImg": "build/img/application-manage/Company-notice@3x.png",
            "appName": "号外公告",
            "appFlag": "Y",
            "isLock": ""
          },
          {
            "appImg": "build/img/application-manage/information-campaign@2x.png",
            "mainAppImg": "build/img/application-manage/information-campaign@3x.png",
            "appName": "内聘平台",
            "appFlag": "Y",
            "isLock": ""
          }
        ];
        console.log("11112222212："+angular.toJson($scope.mianAppList));
        $scope.serveApplist = JSON.parse(localStorage.getItem('serveApplicationList'));
        console.log("1111133333333112："+angular.toJson($scope.serveApplist));
        $timeout(function () {
          $scope.applicationList = [];
          for (var i = 0; i < $scope.mianAppList.length; i++) {
            for (var j = 0; j < $scope.serveApplist.length; j++) {
              if ($scope.serveApplist[j].functionName == $scope.mianAppList[i].appName) {
                if ($scope.mianAppList[i].appFlag == 'Y') {
                  $scope.applicationList.push($scope.mianAppList[i]);
                }
              }
            }
          }
          $scope.$apply();
        }, 100);
        console.log("beforeEnter的flag = " + imgService.getNoNetFlag());
        $scope.noNetFlag = 'success';
        $ionicSlideBoxDelegate.update();
        console.log("进入message");
      });
      $scope.goMainImgUrl = function (url) {
        console.log("url = " + url);
        if (url !== "") {
          //$state.go('tab.mainImgWebsite',{mainImgUrl:url});

          try {
            //if(device.platform=='Android'){
            //  window.open(url, '_blank', 'location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
            //}else{
            //  window.open(url, '_blank', 'location=no,toolbar=yes,enableViewportScale=yes,toolbarposition=top,closebuttoncaption=关闭');
            //}
            cordova.ThemeableBrowser.open(url, '_blank', {
              statusbar: {
                color: '#385198'
              },
              toolbar: {
                height: 44,
                color: '#385198'
              },
              backButton: {
                wwwImage: 'build/img/back.png',
                wwwImagePressed: 'build/img/back.png',
                wwwImageDensity: 2,
                align: 'left',
                event: 'backPressed'
              },
              forwardButton: {
                wwwImage: 'build/img/forward.png',
                wwwImagePressed: 'build/img/forward.png',
                wwwImageDensity: 2,
                align: 'left',
                event: 'forwardPressed'
              },
              closeButton: {
                wwwImage: 'build/img/close.png',
                wwwImagePressed: 'build/img/close.png',
                wwwImageDensity: 2,
                align: 'right',
                event: 'closePressed'
              },
              backButtonCanClose: false
            })
          } catch (e) {
            window.open(url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
          }
        } else {
          hmsPopup.showShortCenterToast("没有网站链接");
        }
      }
    }]);
