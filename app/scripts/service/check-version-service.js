/**
 * Created by wolf on 2016/6/30. (wen.da)
 */
angular.module('HmsModule')
  .factory('checkVersionService', [
    'hmsHttp',
    'hmsPopup',
    'baseConfig',
    '$ionicPopup',
    '$cordovaDialogs',
    '$cordovaNetwork',
    '$cordovaInAppBrowser',
    '$state',
    function (hmsHttp,
              hmsPopup,
              baseConfig,
              $ionicPopup,
              $cordovaDialogs,
              $cordovaNetwork,
              $cordovaInAppBrowser,
              $state) {
      var localVersion = baseConfig.version.currentVersion;
      var url = baseConfig.baseUrl + '/appApi/appVersionManage';
      var checkVersionParams = {
        "appname": "shenzhou",
        "platform": ionic.Platform.isAndroid() ? 'android' : 'ios'
      };

      function checkVersion(newVersion, oldVersion) {
        if (!newVersion || !oldVersion) {
          return false;
        }
        var newVs = newVersion.split(".");
        var oldVs = oldVersion.split(".");
        if (window.parseInt(newVs[0]) > window.parseInt(oldVs[0])) {
          return true;
        } else if (newVs[0] == oldVs[0]) {
          if (window.parseInt(newVs[1]) > window.parseInt(oldVs[1])) {
            return true;
          } else if (newVs[1] == oldVs[1]) {
            if (window.parseInt(newVs[2]) > window.parseInt(oldVs[2])) {
              return true;
            }
          }
        }
        return false;
      }

      /**
       * 检查app的版本更新
       * -- 分大版本和小版本的update
       */
      return {
        checkAppVersion: function (newName) {
          hmsHttp.post(url, checkVersionParams).then(function (response) {
              console.log("response = " + angular.toJson(response));
              try {
                var minVersion = response.data.minVersion;
                var newVersion = response.data.newVersion;
              } catch (e) {
              }
              if (response.status == 'S') {
                console.log("版本检测");
                if (localVersion == newVersion) {
                  if (newName === 'MY_INFO') {
                    hmsPopup.showPopup("当前为最新版本");
                  }
                  console.log("当前为最新版本");
                } else if (response.data.forceUpdateFlag == 'Y') {
                  console.log("大版本更新");
                  // $cordovaDialogs.alert('程序有了新版本,请确认更新!', '温馨提示', '确定').then(function () {
                  //   if ($cordovaNetwork.getNetwork() !== 'wifi') {
                  //     $cordovaDialogs.confirm('当前正在使用流量上网,是否继续下载?', '温馨提示', ['确定', '取消']).then(function (buttonIndex) {
                  //       if (buttonIndex == 1) {
                  //         $state.go('login');
                  //         $cordovaInAppBrowser.open(response.data.downloadUrl, '_system', {location: 'yes'}).then(function (event) {
                  //           // success
                  //         })
                  //           .catch(function (event) {
                  //             // error
                  //           });
                  //
                  //       }
                  //     });
                  //   } else {
                  //     $state.go('login');
                  //     $cordovaInAppBrowser.open(response.data.downloadUrl, '_system', {location: 'yes'});
                  //   }
                  // })
                } else if (checkVersion(newVersion, localVersion)) {
                  console.log("小版本更新");
                  // $cordovaDialogs.confirm('程序有了新版本,请确认更新!', '温馨提示', ['确定', '取消']).then(function (versionIndex) {
                  //   if (versionIndex == 1) {
                  //     if ($cordovaNetwork.getNetwork() !== 'wifi') {
                  //       $cordovaDialogs.confirm('当前正在使用流量上网,是否继续下载?', '温馨提示', ['确定', '取消']).then(function (buttonIndex) {
                  //         //确定
                  //         if (buttonIndex == 1) {
                  //           $cordovaInAppBrowser.open(response.data.downloadUrl, '_system', {location: 'yes'});
                  //         }
                  //       });
                  //     } else {
                  //       $cordovaInAppBrowser.open(response.data.downloadUrl, '_system', {location: 'yes'});
                  //     }
                  //   }
                  // });
                }
              }
              else {
                hmsPopup.showShortCenterToast(response.msg);
              }
            }, function(response){
              $ionicLoading.show({
                template: '检查更新失败',
                duration: 1000
              });
              console.log("error:", response);
          });
            //.
            //error(function (response, status) {
            //  $ionicLoading.show({
            //    template: '检查更新失败',
            //    duration: 1000
            //  });
            //  console.log("error:", response, status);
            //});
        }
      }
    }])
;
