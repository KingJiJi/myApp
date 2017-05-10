/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('loginModule')

  .controller('loginCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    '$timeout',
    '$ionicHistory',
    '$ionicPlatform',
    '$ionicScrollDelegate',
    'hmsPopup',
    '$rootScope',
    'getService',
    'imgService',
    'checkVersionService',
    'saveParameter',
    'hmsHttp',
    '$stateParams',
    '$cordovaStatusbar',
    'sweet',
    function ($scope,
              $state,
              baseConfig,
              $ionicLoading,
              $http,
              $timeout,
              $ionicHistory,
              $ionicPlatform,
              $ionicScrollDelegate,
              hmsPopup,
              $rootScope,
              getService,
              imgService,
              checkVersionService,
              saveParameter,
              hmsHttp,
              $stateParams,
              $cordovaStatusbar,
              sweet) {


      $scope.applicationList = [//初始化首页图标
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
          // "appName": "神州头条",
          "appName": "内聘平台",
          "appFlag": "Y",
          "isLock": ""
        }
      ];

      $scope.mainImgList = [];
      $scope.employeeInfo = {};
      $scope.showUserClearButton = false;//显示用户名删除按钮
      $scope.showPasswordClearButton = false;//显示密码删除按钮
      $scope.loginInfo = {
        username: "",
        password: ""
      };
      if (window.localStorage.empno) {
        $scope.loginInfo.username = window.localStorage.empno;
      }
      $scope.usernameFocus = function () {//聚焦用户名
        if ($scope.loginInfo.username != "") {
          $scope.showUserClearButton = true;
        } else if ($scope.loginInfo.username == "") {
          $scope.showUserClearButton = false;
        }
      };
      $scope.usernameBlur = function () {//用户名失去焦点
        $scope.showUserClearButton = false;
      };
      $scope.usernameChange = function () {//用户名改变
        if ($scope.loginInfo.username != "") {
          $scope.showUserClearButton = true;
        } else if ($scope.loginInfo.username == "") {
          $scope.showUserClearButton = false;
        }
      };
      $scope.valueFilter = function (e) {//禁止输入汉字
        $scope.loginInfo.username = $scope.loginInfo.username.replace(/[\u4e00-\u9fa5]/g, "");
      };
      $scope.valuePasswordFilter = function(e) {
        $scope.loginInfo.password = $scope.loginInfo.password.replace(/[\u4e00-\u9fa5]/g, "");
      };
      $scope.passwordFocus = function () {//聚焦密码
        console.log('pswInput');
        if ($scope.loginInfo.password != "") {
          $scope.showPasswordClearButton = true;
        } else if ($scope.loginInfo.password == "") {
          $scope.showPasswordClearButton = false;
        }
      };
      $scope.passwordBlur = function () {//密码失去焦点
        $scope.showPasswordClearButton = false;
        angular.element('#mainLogo').css('marginTop', '35%');
      };
      $scope.passwordChange = function () {//密码改变
        if ($scope.loginInfo.password != "") {
          $scope.showPasswordClearButton = true;
        } else if ($scope.loginInfo.password == "") {
          $scope.showPasswordClearButton = false;
        }
      };
      $scope.myKeyup = function(event) {//实现账号输入框enter键转行，密码输入框enter键登陆
        if (document.activeElement.tagName.toUpperCase() == "INPUT") {
          if (event.keyCode == 13) {
            switch (document.activeElement.id) {
              case "usernameFocu" :
                document.getElementById("passwordFocu").focus();
                break;
              case "passwordFocu" :
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                  cordova.plugins.Keyboard.close();
                }
                $scope.login();
                break;
            }
          }
        }
      };
      $scope.forgetPassword = function () {//忘记密码
        hmsPopup.showPasswordPopup('请与IT帮助台联系找回密码，谢谢！<br>电话：400-800-3450<br>邮箱：IT@hand-china.com');
      };

      $scope.clearUsername = function () {//清空用户名
        var ele =  document.querySelector('#usernameFocu');
        var e = angular.element(ele);
        e[0].focus();
        $timeout(function () {
          e[0].focus();
        });
        $scope.loginInfo.username = "";
        $scope.showUserClearButton = false;
      };

      $scope.clearPassword = function () {//清空密码
        var ele =  document.querySelector('#passwordFocu');
        var e = angular.element(ele);
        e[0].focus();
        $timeout(function () {
          e[0].focus();
        });
        $scope.loginInfo.password = "";
        $scope.showPasswordClearButton = false;
      };

      $scope.login = function () {//登录功能
        $timeout(function () {
          window.localStorage.empno = $scope.loginInfo.username.toLowerCase();
          if (!$scope.loginInfo.username || $scope.loginInfo.username == '') {
            hmsPopup.showPopup('用户名不能为空');
            return;
          }
          if (!$scope.loginInfo.password || $scope.loginInfo.password == '') {
            hmsPopup.showPopup('密码不能为空');
            return;
          }
          /*
           change by wl
           */
          // var url = baseConfig.baseUrl + 'loginPortApi/loginPostPort';
          var url = 'http://localhost:8080/api/user/login';
          var params = {
            "username": $scope.loginInfo.username,
            "password": $scope.loginInfo.password
          };
          hmsPopup.showLoading('登录中...');

          // hmsHttp.post(url, params).then(function (result) {
          $http.post(url, params).then(function (result) {
            var result = result.data;
            if (baseConfig.debug) {
              console.log("result success " + angular.toJson(result));
            }
            if (result.status == 'S') {
              $timeout(function () {
                $rootScope.$broadcast('setAndroidBadge');
                $rootScope.$broadcast('refreshMessageList');
              },1500);
              // StatusBar.show();
              window.localStorage.token = result.data.pre_token + result.data.token_key;
              window.localStorage.rlCode  = result.data.rlCode;
              var userNameBase64 = base64encode(window.localStorage.empno.toLowerCase()).replace(/=/g, "");//对用户名进行base编码，解决极光设置别名出现特殊字符的错误
              console.log("用户名Base64编译：", userNameBase64);
              try {
                window.plugins.jPushPlugin.setAlias(userNameBase64);//设置极光推送别名
              } catch (exception) {
                console.log(exception);
              }
              var onTagsWithAlias = function(event) {
                try {
                  console.log("onTagsWithAlias");
                  var result = "result code:" + event.resultCode + " ";
                  result += "tags:" + event.tags + " ";
                  result += "alias:" + event.alias + " ";
                  console.log('onTagsWithAlias result = '+result);
                  $("#tagAliasResult").html(result);
                } catch(exception) {
                  console.log(exception);
                }
              };
              document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
              var mianApplicationList = window.localStorage.empno + 'applicationList';
              console.log("login里mianApplicationList值："+angular.toJson(mianApplicationList));
              if (localStorage.getItem(mianApplicationList) == undefined) {//本地功能数据
                localStorage.setItem(mianApplicationList, JSON.stringify($scope.applicationList));
              }
              /*
                change by wl
               */
              // var appListUrl = baseConfig.baseUrl + 'appApi/getAppFuncList';
              var appListUrl = 'http://localhost:8080/api/app/list';
              var appListParams = {
                "rlcode": window.localStorage.rlCode,
                "parent_func_option":""
              };
              // hmsHttp.post(appListUrl, appListParams).then(function (result) {//拉取首页功能数据
              $http.post(appListUrl, appListParams).then(function (result) {//拉取首页功能数据
                var result = result.data;
                hmsPopup.hideLoading();
                if (result.status == 'S') {
                  var serveApplicationList = 'serveApplicationList';
                  localStorage.setItem(serveApplicationList, JSON.stringify(result.data));//服务器功能数据
                  var mianAppList = JSON.parse(localStorage.getItem(mianApplicationList));
                  console.log("mianAppList值："+angular.toJson(mianAppList));
                  for (var i = 0; i < result.data.length; i++) {
                    for (var j = 0; j < mianAppList.length; j++) {
                      if (mianAppList[j].appName == result.data[i].functionName) {
                        if (result.data[i].isLock == 'Y') {
                          mianAppList[j].appFlag = "Y";
                        }
                      }
                    }
                  }
                  localStorage.setItem(mianApplicationList, JSON.stringify(mianAppList));
                  $state.go("tab.application");
                } else {
                  hmsPopup.showPopup(result.errorMsg);
                }
              }, function (status) {
                hmsPopup.hideLoading();
              });
            } else {
              hmsPopup.hideLoading();
              /*
                cahange by wl
               */
              // hmsPopup.showPopup(result.msg);
              hmsPopup.showPopup(result.errorMsg);
            }
          }, function (status) {
            hmsPopup.hideLoading();
            if (status && status == '401') {
              hmsPopup.showPopup('登陆失败,请确认密码是否正确!');
            } else {
              hmsPopup.showPopup('登陆失败,请确认网络连接是否正常,或者联系管理员');
            }
          });
        }, 700);
      };
      $scope.$on('$ionicView.beforeEnter', function (e) {
        console.log("$ionicView.beforeEnter");
      });

      $scope.$on('$ionicView.enter', function (e) {
        console.log("$ionicView.enter");
        if (baseConfig.debug) {
          console.log('loginCtrl.$ionicView.enter');
        }
        if (ionic.Platform.isIOS()) {
          var logoutFlg = $stateParams.logoutFlag;
          if (logoutFlg === 'true') {
            console.log("logoutAnimation");
            $timeout(function () {
              $('#loginAnimation').css('display','block');
            },3000);
            $timeout(function () {
              var theLogo = document.getElementById("mainLogo");
              theLogo.style.transition = "all .3s ease-in .5s";
              theLogo.style.webkitTransition = "all .3s ease-in .5s";
              theLogo.style.transform = "translateY(0px)";
              theLogo.style.webkitTransform = "translateY(0px)";
            }, 1200);
          } else {
            console.log("loginAnimation");
            $timeout(function () {
              $('#loginAnimation').css('display','block');
            },3000);
            $timeout(function () {
              var theLogo = document.getElementById("mainLogo");
              theLogo.style.transition = "all .3s ease-in .5s";
              theLogo.style.webkitTransition = "all .3s ease-in .5s";
              theLogo.style.transform = "translateY(0px)";
              theLogo.style.webkitTransform = "translateY(0px)";
            }, 1600);
          }

        } else if (ionic.Platform.isAndroid()) {
          $timeout(function () {
            $('#loginAnimation').css('display','block');
          },2800);
          $timeout(function () {
            var theLogo = document.getElementById("mainLogo");
            theLogo.style.transition = "all .3s ease-in .5s";
            theLogo.style.webkitTransition = "all .3s ease-in .5s";
            theLogo.style.transform = "translateY(0px)";
            theLogo.style.webkitTransform = "translateY(0px)";
          }, 700);
        }
        $scope.showUserClearButton = false;//显示用户名删除按钮
        $scope.showPasswordClearButton = false;//显示密码删除按钮
        $scope.loginInfo = {
          username: "",
          password: ""
        };
        if (window.localStorage.empno) {
          $scope.loginInfo.username = window.localStorage.empno;
        }
        $timeout(function () {
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        }, 400);

      });
      $scope.$on('$destroy', function (e) {
        if (baseConfig.debug) {
          console.log('loginCtrl.$destroy');
        }

      });
    }
  ])
  .
  factory('imgService', ['$http', function ($http) {
    var _imgList = [];
    var noNetFlag = 'success';
    var holidayInfo = {};
    var androidBadgeFlag = 'true';
    return {
      setImgList: function (imgList) {
        _imgList = imgList;
      },
      getImgList: function () {
        return _imgList;
      },
      setNoNetFlag: function (flag) {
        noNetFlag = flag;
      },
      getNoNetFlag: function () {
        return noNetFlag;
      },
      setHolidayInfo : function(info){
        holidayInfo = info;
      },
      getHolidayInfo : function(){
        return holidayInfo;
      },
      setAndroidBadgeFlag : function(badgeFlag){
        androidBadgeFlag = badgeFlag;
      },
      getAndroidBadgeFlag : function () {
        return androidBadgeFlag;
      }
    }

  }]);
