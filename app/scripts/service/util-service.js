/**
 * Created by gusenlin on 16/5/21.
 */
angular.module('HmsModule')
  .factory('hmsHttp', ['$log',
    '$http',
    'hmsPopup',
    '$state',
    'baseConfig',
    '$rootScope',
    '$q',
    function ($log,
              $http,
              hmsPopup,
              $state,
              baseConfig,
              $rootScope,
              $q) {
      var serivieName = "HmsHttp";
      var isSucessfullName = "isSucessfull";
      var noAuthorPostName = serivieName + ".noAuthorPost";
      var noAuthorGetName = serivieName + ".noAuthorGet";
      var postName = serivieName + ".post";
      var getName = serivieName + ".get";
      var procedure;

      var init = function (procedure) {
        procedure = procedure;
      };
      var debug = function (text) {
        if (baseConfig.debug) {
          console.log(procedure + " success");
        }
      };

      //如果登录令牌失效，跳转会登录界面
      var goBackLogin = function (state) {
        hmsPopup.hideLoading();
        $rootScope.$broadcast("REFRESH_LOGIN");
        state.go('login');
      };

      var request = {
        goBackLogin: function (state) {
          goBackLogin(state);
        },
        isSuccessfull: function (status) {
          if (baseConfig.debug) {
            console.log(isSucessfullName + " Start!");
            console.log(noAuthorPostName + " status " + status);
          }
          if (status == "S" || status == "SW") {
            return true;
          } else {
            return false;
          }
        },
        post: function (url, paramter) {
          if (baseConfig.debug) {
            console.group(postName + " Start!");
            console.log(postName + " url " + url);
            console.info(postName + " paramter " + angular.toJson(paramter,true));
            console.groupEnd();
          }
          // var destUrl = url + "?access_token=" + window.localStorage.token;
          var destUrl = url;
          var deferred = $q.defer();
          var promise = deferred.promise;
          if (ionic.Platform.isWebView()) {//在andorid或ios上使用插件加密
            console.log("移动设备");
            Encryption.encryptWithString(function (data) {
              var post = $http.post(destUrl, data).success(function (response) {
                if (baseConfig.debug) {
                  console.group(postName + " success");
                  console.log(postName + " response " + angular.toJson(response));
                  console.log(postName + " End!");
                  console.groupEnd();
                }
                //当token失效时,返回的不是加密数据,所以不需要解密,直接判断
                if(response.result && response.result=="ETOKEN"){
                  hmsPopup.hideLoading();
                  window.localStorage.token = '';
                  goBackLogin($state);
                  hmsPopup.showShortCenterToast('令牌失效,请重新登陆!');
                  //重新登录
                  return;
                }
                //否则的话,对返回数据进行解密
                Encryption.decryptWithString(function (res) {
                  var results = JSON.parse(res);
                  deferred.resolve(results);
                  //if(results.result && results.result=="ETOKEN"){
                  //  //重新登录
                  //  $state.go('login');
                  //  return;
                  //}
                }, function (error) {
                }, response);

              }).error(function (response, status) {
                if (baseConfig.debug) {
                  console.group(postName + " error");
                  console.log(postName + " response " + response);
                  console.log(postName + " status " + status);
                  console.log(postName + " End!");
                  console.groupEnd();
                }
                hmsPopup.hideLoading();
                if (status == '401') {
                  window.localStorage.token = '';
                  goBackLogin($state);
                  hmsPopup.showShortCenterToast('登录失效,请重新登陆!');
                }
                else if (status == '404') {
                  hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
                }
                else {
                  hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
                }
                Encryption.decryptWithString(function (res) {
                  var results = JSON.parse(res);
                  deferred.reject(results);
                }, function (error) {
                }, response);
              });
            }, function (error) {
            }, JSON.stringify(paramter));
          } else {//在浏览器上执行加密
            console.log("pc浏览器");
            var data = Encrypt(JSON.stringify(paramter));
            var post = $http.post(destUrl, data).success(function (response) {
              if (baseConfig.debug) {
                console.group(postName + " success");

                console.log(postName + " End!");
                console.groupEnd();
              }
              //当token失效时,返回的不是加密数据,所以不需要解密,直接判断
              if(response.result && response.result=="ETOKEN"){
                hmsPopup.hideLoading();
                window.localStorage.token = '';
                goBackLogin($state);
                hmsPopup.showShortCenterToast('令牌失效,请重新登陆!');
                //重新登录
                return;
              }
              var results = JSON.parse(Decrypt(response));
              console.info(postName + " response " + angular.toJson(results,true));
              deferred.resolve(results);
              //if(results.result && results.result=="ETOKEN"){
              //  重新登录
              //  $state.go('login');
              //  return;
              //}
            }).error(function (response, status) {
              if (baseConfig.debug) {
                console.log(postName + " error");
                console.log(postName + " response " + response);
                console.log(postName + " status " + status);
                console.log(postName + " End!");
              }
              hmsPopup.hideLoading();
              if (status == '401') {
                window.localStorage.token = '';
                goBackLogin($state);
                hmsPopup.showShortCenterToast('登录失效,请重新登陆!');
              }
              else if (status == '404') {
                hmsPopup.showShortCenterToast('后端服务器请求失败,请联系管理员!');
              }
              else {
                hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
              }
              var results = JSON.parse(Decrypt(response));
              deferred.reject(results);
            });
          }
          return promise;
        },
        get: function (url) {
          if (baseConfig.debug) {
            console.log(getName + " Start!");
            console.log(getName + " url " + url);
          }
          var destUrl = url + "?access_token=" + window.localStorage.token;
          var get = $http.get(destUrl).success(function (response) {
            if (baseConfig.debug) {
              console.log(getName + " success");
              console.log(getName + " response " + angular.toJson(response));
              console.log(getName + " End!");
            }
          }).error(function (response, status) {
            if (baseConfig.debug) {
              console.log(getName + " error");
              console.log(getName + " response " + response);
              console.log(getName + " status " + status);
              console.log(getName + " End!");
            }
          });
          return get;
        }
      };
      return request;
    }])

  .service('hmsPopup', ['$ionicLoading', '$cordovaToast', '$ionicPopup', 'baseConfig',
    function ($ionicLoading, $cordovaToast, $ionicPopup, baseConfig) {
      // this.showLoading = function (content) {
      //   $ionicLoading.show({
      //     template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
      //     '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>'
      //   });
      // };
      this.showLoading = function (content) {
        content = angular.isUndefined(content) || content == null ? "" : content;
        $ionicLoading.show({

          template: '<ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner><p>' + content + '</p>',
          animation: 'fade-in',
          showBackdrop: true
        });
      },
        this.showLoadingWithoutBackdrop = function (content) {
          $ionicLoading.show({
            template: '<ion-spinner icon="ios" class="spinner spinner-ios spinner-stable"></ion-spinner>' +
            '<div style="color: white;font-size: 12px;text-align: center;height:25px;line-height: 25px;">' + content + '</div>',
            noBackdrop: true
          });
        };
      this.hideLoading = function () {
        $ionicLoading.hide();
      };
      this.showShortCenterToast = function (content) {//长时间底部提示toast
        if (!baseConfig.nativeScreenFlag) {
          $ionicLoading.show({
            template: (angular.isDefined(content) ? content : "操作失败"),
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            duration: 2000
          });
        } else {
          $cordovaToast.showLongBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
          }, function (error) {
          });
        }
      };
      this.showVeryShortCenterToast = function (content) {
        if (!baseConfig.nativeScreenFlag) {
          $ionicLoading.show({
            template: (angular.isDefined(content) ? content : "操作失败"),
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            duration: 1000
          });
        } else {
          $cordovaToast.showShortBottom((angular.isDefined(content) ? content : "操作失败")).then(function (success) {
          }, function (error) {
          });
        }
      };
      //弹出确认弹出框
      this.showPopup = function (template, callback) {
        if (!baseConfig.nativeScreenFlag) {
         var certainPopup =  $ionicPopup.show({
            title: "<span class='warningTitle'>温馨提示</span>",
            cssClass:'fuk-popup-style',
            template: template,
            buttons: [{
              text: '确定',
              type: 'button-cux-popup-confirm'
            }]
          });
          certainPopup.then(callback);
        } else {
          var alertDismissed = function () {
          };
          navigator.notification.alert(
            template, // message
            alertDismissed, // callback
            "提示", // title
            '确定' // buttonName
          );
        }
      };
      //忘记密码弹出确认弹出框
      this.showPasswordPopup = function (template, callback) {
        if (!baseConfig.nativeScreenFlag) {
          var certainPopup =  $ionicPopup.show({
            title: "<span class='warningTitle'>温馨提示</span>",
            cssClass:'fck-popup-style',
            template: template,
            buttons: [{
              text: '确定',
              type: 'button-cux-popup-confirm'
            }]
          });
          certainPopup.then(callback);
        } else {
          var alertDismissed = function () {
          };
          navigator.notification.alert(
            template, // message
            alertDismissed, // callback
            "提示", // title
            '确定' // buttonName
          );
        }
      };
      //弹出是否确认的窗口
      this.prompt = function (myscope, title, popup, pluginPopup) {
        if (!baseConfig.nativeScreenFlag) {
          var myPopup = $ionicPopup.show({
            template: '<input type="type" ng-model="myScope.data.city">',
            title: title,
            subTitle: title,
            scope: myscope,
            buttons: [
              {text: '取消'},
              {
                text: '<b>确定</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (!myscope.myScope.data.city) {
                    e.preventDefault();
                  } else {
                    return myscope.myScope.data.city;
                  }
                }
              },
            ]
          });
          myPopup.then(popup);
        } else {

          navigator.notification.prompt(
            title,  // message
            pluginPopup,          // callback to invoke
            '填写信息',           // title
            ['确定', '退出'],    // buttonLabels
            ''                 // defaultText
          );
        }
      };

      this.confirm = function (message, title, onConfirm, options) {
        if (!baseConfig.nativeScreenFlag) {
          var confirmPopup = $ionicPopup.confirm({
            title: (angular.isDefined(title) ? "<span class='warningTitle'>"+title +"</span>": "<span class='warningTitle'>温馨提示</span>"),
            cssClass: 'cux-confirm-style',
            template: message,
            cancelText: '取消',
            cancelType: angular.isDefined(options) ? (angular.isDefined(options.btnLeft) ? options.btnLeft : 'button-cux-popup-cancel') : 'button-cux-popup-cancel',
            okText: '确定',
            okType: angular.isDefined(options) ? (angular.isDefined(options.btnRight) ? options.btnRight : 'button-cux-popup-confirm') : 'button-cux-popup-confirm'

          });
          confirmPopup.then(onConfirm);
        } else {
          navigator.notification.confirm(
            message, // message
            function (index) {
              onConfirm(index - 1);
            }, // callback to invoke with index of button pressed
            title, // title
            ['取消', '确定'] // buttonLabels
          );
        }
      };
    }
  ])

  .factory('hmsReturnView', ['$ionicHistory', 'baseConfig', function ($ionicHistory, baseConfig) {
    //当前屏幕宽度
    var screenWidth = window.screen.width - 50;
    //滑动栏的宽度
    var scrollWidth = {
      width: ''
    };
    //当前内容的宽度
    var contentWidth = 0;
    //当前标题的宽度
    var viewLength;

    return {
      go: function (depth) {
        // get the right history stack based on the current view
        var historyId = $ionicHistory.currentHistoryId();
        var history = $ionicHistory.viewHistory().histories[historyId];
        // set the view 'depth' back in the stack as the back view
        var targetViewIndex = history.stack.length - 1 - depth;
        $ionicHistory.backView(history.stack[targetViewIndex]);
        // navigate to it
        $ionicHistory.goBack();
      },
      returnToState: function (stateName) {
        var historyId = $ionicHistory.currentHistoryId();
        var history = $ionicHistory.viewHistory().histories[historyId];
        if (baseConfig.debug) {
          console.log('history.stack.length : ' + history.stack.length);
        }
        for (var i = history.stack.length - 1; i >= 0; i--) {
          if (baseConfig.debug) {
            console.log('history.stack[i].stateName : ' + history.stack[i].stateName);
          }
          if (history.stack[i].stateName == stateName) {
            $ionicHistory.backView(history.stack[i]);
            $ionicHistory.goBack();
          }
        }
      },
      getStackList: function (currentIonicHistory, viewName) {
        var stackList = [];
        var historyId = currentIonicHistory.currentHistoryId();
        var history = currentIonicHistory.viewHistory().histories[historyId];
        if (baseConfig.debug) {
          console.log(currentIonicHistory.viewHistory());
        }
        var color = '#F99D32';
        for (var i = 0; i < history.stack.length; i++) {
          if (i == history.stack.length - 1) {
            color = 'black';
          }
          var stackItem = {
            viewId: history.stack[i].viewId,
            stateName: history.stack[i].stateName,
            title: history.stack[i].title,
            color: {
              color: color
            }
          };
          if (baseConfig.debug) {
            console.log(history.stack[i]);
          }
          stackList.push(stackItem);
        }
        stackList[stackList.length - 1].title = viewName;
        return stackList;
      },
      getWidth: function () {
        return scrollWidth;
      }
    };
  }])

  .factory('hmsBackLine', ['$ionicHistory', 'baseConfig', function ($ionicHistory) {
    //当前屏幕宽度
    var screenWidth = window.screen.width - 50;
    //滑动栏的宽度
    var scrollWidth = {
      width: ''
    };
    //当前内容的宽度
    var contentWidth = 0;
    //当前标题的宽度
    var viewLength;
    var backViews = [];
    return {
      getViews: function (viewName) {
        viewLength = viewName.toString().length;
        if (baseConfig.debug) {
          console.log(viewLength);
        }
        for (var i = 0; i < backViews.length; i++) {
          if (viewName == backViews[i].name) {
            backViews = backViews.slice(0, i + 1);
            contentWidth = 0;
            for (var j = 0; j < backViews.length; j++) {
              if (j == backViews.length - 1) {
                contentWidth = contentWidth + backViews[j].name.toString().length * 14 + 8;
              } else {
                contentWidth = contentWidth + backViews[j].name.toString().length * 14 + 18 + 8;
              }
            }
            if (baseConfig.debug) {
              console.log(contentWidth);
            }
            if (contentWidth < screenWidth) {
              scrollWidth.width = '';
            } else {
              scrollWidth.width = contentWidth + 'px';
            }
            for (var k = 0; k < backViews.length - 1; k++) {
              backViews[k].myStyle.color = '#F99D32';
            }
            console.log(backViews);
            backViews[backViews.length - 1].myStyle.color = 'black';
            return backViews;
          }
        }
        var view = {
          name: viewName,
          myStyle: {
            color: ''
          }
        };
        backViews.push(view);
        contentWidth = 0;
        for (var ii = 0; i < backViews.length; ii++) {
          if (ii == backViews.length - 1) {
            contentWidth = contentWidth + backViews[ii].name.toString().length * 14 + 8;
          } else {
            contentWidth = contentWidth + backViews[ii].name.toString().length * 14 + 18 + 8;
          }
        }
        if (contentWidth > screenWidth) {
          scrollWidth.width = contentWidth + 'px';
        }
        for (var iii = 0; iii < backViews.length - 1; i++) {
          backViews[iii].myStyle.color = '#F99D32';
        }
        return backViews;
      },
      getWidth: function () {
        return scrollWidth;
      }
    };
  }])

  .factory('$hmsHelp', [
    '$ionicTemplateLoader',
    '$ionicBackdrop',
    '$q',
    '$timeout',
    '$rootScope',
    '$ionicBody',
    '$compile',
    '$ionicPlatform',
    '$ionicModal',
    'IONIC_BACK_PRIORITY',
    function ($ionicTemplateLoader,
              $ionicBackdrop,
              $q,
              $timeout,
              $rootScope,
              $ionicBody,
              $compile,
              $ionicPlatform,
              $ionicModal,
              IONIC_BACK_PRIORITY) {
      //TODO allow this to be configured
      var config = {
        stackPushDelay: 75
      };
      var HELP_TPL;
      if (ionic.Platform.isIOS()) {
        HELP_TPL = '<div style="position: absolute;top:2px;left: -4px;bottom: 0;right: 0;' +
          'background: url(img/mainHide.png); background-size: cover;;z-index: 12;">' +
          '<div style="height: 100%;width: 100%;background: none" ng-click="$buttonTapped()"></div></div>';
      } else {
        HELP_TPL = '<div style="position: absolute;top: -14px;left: -4px;bottom: 0;right: 0;' +
          'background: url(img/mainHide.png); background-size: cover;;z-index: 12;">' +
          '<div style="height: 100%;width: 100%;background: none" ng-click="$buttonTapped()"></div></div>';
      }
      var popupStack = [];

      function setHashKey(obj, h) {
        if (h) {
          obj.$$hashKey = h;
        } else {
          delete obj.$$hashKey;
        }
      }

      function extend(dst, args) {
        var h = dst.$$hashKey;
        if (baseConfig.debug) {
          console.log(arguments);
        }
        for (var i = 1, ii = arguments.length; i < ii; i++) {
          var obj = arguments[i];
          if (obj) {
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
              var key = keys[j];
              dst[key] = obj[key];
            }
          }
        }
        setHashKey(dst, h);
        return dst;
      }

      var $hmsHelp = {
        showPopup: showPopup,
        _createPopup: createPopup,
        _popupStack: popupStack
      };


      return $hmsHelp;

      function createPopup() {
        var self = {};
        self.scope = ($rootScope).$new();
        self.element = angular.element(HELP_TPL);
        self.responseDeferred = $q.defer();
        $ionicBody.get().appendChild(self.element[0]);
        if (baseConfig.debug) {
          debug(self.element);
        }
        $compile(self.element)(self.scope);

        extend(self.scope, {
          title: "",
          $buttonTapped: function () {
            //event = event.originalEvent || event; //jquery events
            if (baseConfig.debug) {
              debug("$buttonTapped");
            }
            self.responseDeferred.resolve(1);
          }
        });
        self.show = function () {
          if (self.isShown || self.removed) return;
          $ionicModal.stack.add(self);
          self.isShown = true;
          ionic.requestAnimationFrame(function () {
            //if hidden while waiting for raf, don't show
            if (!self.isShown) return;

            //self.element.removeClass('popup-hidden');
            //self.element.addClass('popup-showing active');
            focusInput(self.element);
          });
        };
        self.hide = function (callback) {
          if (baseConfig.debug) {
            console.log("4 self.hide " + callback);
          }
          callback = callback || function () {
            };
          if (!self.isShown) return callback();

          $ionicModal.stack.remove(self);
          self.isShown = false;
          //self.element.removeClass('active');
          //self.element.addClass('popup-hidden');
          $timeout(callback, 250, false);
        };
        self.remove = function () {
          if (baseConfig.debug) {
            console.log("5 self.remove ");
          }
          if (self.removed || !$ionicModal.stack.isHighest(self)) return;
          self.hide(function () {
            self.element.remove();
            self.scope.$destroy();
          });
          self.removed = true;
        };
        return self;
      }

      function onHardwareBackButton() {
        var last = popupStack[popupStack.length - 1];
        last && last.responseDeferred.resolve();
      }

      function showPopup() {
        var popup = $HmsHelp._createPopup();
        var showDelay = 0;

        if (popupStack.length > 0) {
          popupStack[popupStack.length - 1].hide();
          showDelay = config.stackPushDelay;
        } else {
          //Add popup-open & backdrop if this is first popup
          //$ionicBody.addClass('popup-open');
          //$ionicBackdrop.retain();
          //only show the backdrop on the first popup
          $hmsHelp._backButtonActionDone = $ionicPlatform.registerBackButtonAction(
            onHardwareBackButton,
            IONIC_BACK_PRIORITY.popup
          );
        }

        // Expose a 'close' method on the returned promise
        popup.responseDeferred.promise.close = function popupClose(result) {
          if (!popup.removed) popup.responseDeferred.resolve(result);
        };
        //DEPRECATED: notify the promise with an object with a close method
        popup.responseDeferred.notify({
          close: popup.responseDeferred.close
        });

        doShow();

        return popup.responseDeferred.promise;

        function doShow() {
          popupStack.push(popup);
          if (baseConfig.debug) {
            console.log("popupStack.push(popup)");
          }
          $timeout(popup.show, showDelay, false);

          popup.responseDeferred.promise.then(function (result) {
            var index = popupStack.indexOf(popup);
            if (index !== -1) {
              popupStack.splice(index, 1);
            }
            if (baseConfig.debug) {
              console.log("popupStack.length");
            }
            if (popupStack.length > 0) {
              popupStack[popupStack.length - 1].show();
            } else {
              //$ionicBackdrop.release();
              //Remove popup-open & backdrop if this is last popup
              $timeout(function () {
                // wait to remove this due to a 300ms delay native
                // click which would trigging whatever was underneath this
                if (!popupStack.length) {
                  //$ionicBody.removeClass('popup-open');
                }
              }, 400, false);
              ($hmsHelp._backButtonActionDone || function () {
              })();
            }

            popup.remove();
            return result;
          });
        }
      }

      function focusInput(element) {
        var focusOn = element[0].querySelector('[autofocus]');
        if (focusOn) {
          focusOn.focus();
        }
      }
    }
  ])

  .factory('HmsDateFormat', ['$filter', function ($filter) {
    return {
      getDateString: function (date) {
        return $filter('date')(date, 'yyyy-MM-dd');
      },
      getDateTimeString: function (date) {
        return $filter('date')(date, 'yyyy-MM-dd HH:mm:ss');
      }
    }
  }])

  .factory("hmsFastPath", function () {
    var request = {
      configFastPath: function (scope, returnView, ionicHistory) {
        scope.screenWidth = {
          width: (window.screen.width - 50 + 'px')
        };
        scope.scrollWidth = returnView.getWidth();
        var viewTag = document.getElementsByTagName('ion-view');
        var viewName = viewTag[viewTag.length - 1].attributes[0].value;
        scope.currentStackList = returnView.getStackList(ionicHistory, viewName);
        scope.goStack = function (stackItem) {
          returnView.returnToState(stackItem.stateName);
        };
      }
    };
    return request;
  })
  .factory("saveParameter", function () {
    var messageCount;
    var time;
    var employeeInfo = {};
    return {
      setMessageCounts: function (count) {
        messageCount = count;
      },
      getMessageCounts: function () {
        return messageCount;
      },
      setEmployeeInfos: function (info) {
        employeeInfo = info;
      },
      getEmployeeInfos: function () {
        return employeeInfo;
      },
      setMessageTime: function (date) {
        time = date;
      },
      getMessageTime: function () {
        return time;
      }
    }
  });
