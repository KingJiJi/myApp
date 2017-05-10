/**
 * Created by xuchengcheng on 2016/9/5.
 */
angular.module("applicationModule")
  .factory('getApplicationService', function ($http,$q, $ionicLoading, baseConfig) {
    var cid ;//用户id，6位数字，前三位代表客户端类型
    var cidParam_1;
    var cidParam_2;
    var signParam;
    var signkey = "dsf@332%%$#!jsadfel123439BD";
    var sign;
    if(ionic.Platform.isIOS()){
      cidParam_1 = "100";
    }else if(ionic.Platform.isAndroid()){
      cidParam_1 = "200";
    }else{
      cidParam_1 = "300";
    }
    cidParam_2 =  baseConfig.version.currentVersion.split(".").join("");

    cid = Number(cidParam_1+cidParam_2);
    var service= {
      getMethod: function (url,params){
        var time = new Date().getTime().toString();
        console.log("params = ", angular.toJson(params));
        if(params.genre == 'INFOACT') {
          signParam = "cid="+cid+";timestamp="+time+";q={\"origin\":\"app\",\"type\":\""+params.type+"\",\"type2\":\"4\",\"pageNo\":\""+params.pageNo+"\"}"+signkey;
        } else {
          signParam = "cid="+cid+";timestamp="+time+";q={\"origin\":\"app\",\"type\":\""+params.type+"\",\"pageNo\":\""+params.pageNo+"\"}"+signkey;
        }
        console.log("signParam = "+signParam);
        sign = CryptoJS.MD5(signParam);
        console.log("sign = "+sign);
        var destUrl;
        if(params.genre == 'INFOACT') {
          destUrl  = url + "cid="+cid+"&timestamp="+time+
            "&sign="+sign+'&q={"origin":"app","type":"'+params.type+'","type2":"4","pageNo":"'+params.pageNo+'"}';
        } else {
           destUrl = url + "cid="+cid+"&timestamp="+time+
            "&sign="+sign+'&q={"origin":"app","type":"'+params.type+'","pageNo":"'+params.pageNo+'"}';
        }
        console.log("destUrl = "+destUrl);
        var promise = $http.get(destUrl).success(function(response) {
          console.log("success");
          console.log("success response = "+angular.toJson(response));
          return response;
        }).error(function(response ) {
          console.log("error response = "+angular.toJson(response));
          return response;
        });
        return promise;
      }
    };
    return service;
  });
