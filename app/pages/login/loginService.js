/**
 * Created by utopia_song on 16/9/2.
 */
/*结算对象service*/
angular.module("loginModule")
  .factory('getService', function ($http,$q, $ionicLoading, baseConfig,hmsHttp,$rootScope,hmsPopup) {
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
    var time = new Date().getTime().toString();
    cid = Number(cidParam_1+cidParam_2);
    // signParam = "cid="+cid+";timestamp="+new Date().getTime().toString()+";q={\"origin\":\"pc\"}"+signkey;
     signParam = "cid="+cid+";timestamp="+time+";q={\"origin\":\"app\"}"+signkey;
    console.log("signParam = "+signParam);
    sign = CryptoJS.MD5(signParam);
    console.log("sign = "+sign);
    var service= {
      getMethod: function (url){
        var destUrl = url + "cid="+cid+"&timestamp="+time+
          "&sign="+sign+'&q={"origin":"app"}';
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
      },
      getMessageCount:function (username) {
        var deferred = $q.defer();
        var messageCountUrl = baseConfig.baseUrl+"msgManage/getAllMsgList";
        var countParams = {
          username:username
        };
        hmsHttp.post(messageCountUrl,countParams).then(function (response) {
          // console.log("getMessageCount = "+angular.toJson(response));
          // if(response.status == "S"){
          //   // $rootScope.messageCount = response.msgCount;
          //   return response.msgCount;
          // }else{
          //   hmsPopup.showShortCenterToast(response.errorMsg);
          // }
          console.group('getMessageCount :');
          console.info(angular.toJson(response,true));
          deferred.resolve(response);
        }, function(response){
            deferred.reject(response);
        });
        //  .error(function () {
        //  deferred.reject(response);
        //});
        return deferred.promise;
      },
      readOneMessage:function (pushId) {
        var updateUrl = baseConfig.baseUrl + "msgManage/updateMsgReadFlag";
        var param  = {
          "userName": window.localStorage.empno,
          "pushId":pushId

        };
        hmsHttp.post(updateUrl,param).then(function(response){
          console.info(angular.toJson(response,true));
        },function(response){
        });
      },
      readAllMessage:function () {
        var readAllUrl = baseConfig.baseUrl + "msgManage/updateMsgReadFlag";
        var param  = {
          "userName": window.localStorage.empno,
          "pushId":'ALL'

        };
        hmsHttp.post(readAllUrl,param).then(function(response){
          console.info(angular.toJson(response,true));
        },function(response){
        });
      },
      deleteMessage:function (pushId) {
        var deleteUrl = baseConfig.baseUrl + "msgManage/deleteMsg";
        var param  = {
          "pushId":pushId

        };
        hmsHttp.post(deleteUrl,param).then(function(response){
          console.info(angular.toJson(response,true));
        },function(response){

        })
      },
      getEmployeeInfo:function(username){
        var deferred = $q.defer();
        var infoUrl = baseConfig.sapUrl +"ZhrEmployeeListByUname";
        var infoParam = {"ZHR_EMPLOYEE_LIST_BY_UNAME":{
          "UNAME":username,
          "T_P0000":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "MASSN":"",
              "MNTXT":"",
              "MASSG":"",
              "MGTXT":""
            }
          },
          "T_P0001":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "BUKRS":"",
              "BUTXT":"",
              "PERSG":"",
              "PGTXT":"",
              "PERSK":"",
              "PTEXT":"",
              "WERKS":"",
              "NAME1":"",
              "BTRTL":"",
              "BTEXT":"",
              "ABKRS":"",
              "ORGEH":"",
              "ORGTX":"",
              "PLANS":"",
              "PLSTX":"",
              "ENAME":""
            }
          },
          "T_P0002":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "GESCH":"",
              "GBDAT":"",
              "NATTX":"",
              "LANDX":"",
              "FTEXT":""
            }
          },
          "T_P0041":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "DAT01":"",
              "DAT02":"",
              "DAT03":""
            }
          },
          "T_P0105":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "SUBTY":"",
              "STEXT":"",
              "USRID":"",
              "USRID_LONG":""
            }
          },
          "T_P0185":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ICTYP":"",
              "ICTXT":"",
              "ICNUM":""
            }
          },
          "T_P0529":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "RACKY":"",
              "LTEXT":""
            }
          },
          "T_P0534":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "PCODE":"",
              "PTEXT":""
            }
          },
          "T_P9001":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZHKLX":"",
              "ZHKLXMS":"",
              "ZHKSZD":"",
              "ZSFJTHK":"",
              "ZHKZCSJ":"",
              "ZSSPCS":"",
              "ZHKDQ":""
            }
          },
          "T_P9002":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZXL":"",
              "ZXLMS":"",
              "ZZGXL":"",
              "ZSZXX":"",
              "ZZY":"",
              "ZXW":"",
              "ZXWMS":"",
              "ZZGXW":"",
              "ZXZ":"",
              "ZXZMS":"",
              "ZXLQDFS":"",
              "ZXLQDFSMS":""
            }
          },
          "T_P9003":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZYZ":"",
              "ZYZMS":"",
              "ZSLDJ":"",
              "ZSLDJMS":"",
              "ZYYDJ":"",
              "ZYYDJMS":"",
              "ZBZ":""
            }
          },
          "T_P9004":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZHTLX":"",
              "ZHTLXMS":"",
              "ZSYQRQ":"",
              "ZBYSJ":"",
              "ZQDLB":"",
              "ZQDLBMS":"",
              "ZPQJG":"",
              "ZQYDW":"",
              "ZQYDWWB":"",
              "ZYGFS":"",
              "ZYGFSMS":"",
              "ZGSZD":"",
              "ZGSZDMS":""
            }
          },
          "T_P9005":{
            "item":{
              "ENDDA":"",
              "BEGDA":"",
              "ZCZYY":"",
              "ZCZYYMS":"",
              "ZBZ":""
            }
          },
          "T_P9006":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZJZLX":"",
              "ZJZLXMS":"",
              "ZCCLZRQ":"",
              "ZJZBH":""
            }
          },
          "T_P9007":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZDZBH":"",
              "ZCCDD":"",
              "ZCCDDMS":"",
              "ZCDSJ":"",
              "ZDCSJ":"",
              "ZTDSJ":"",
              "ZDCYY":"",
              "ZDCYYMS":""
            }
          },
          "T_P9008":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZHDSJ":"",
              "ZZSMC":"",
              "ZZSMCMS":"",
              "ZZCDD":"",
              "ZSCRQ":"",
              "ZDQRQ":""
            }
          },
          "T_P9009":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZJCLB":"",
              "ZJCLBWB":"",
              "ZJCNR":"",
              "ZJCNRWB":"",
              "ZJE":"",
              "ZLY":""
            }
          },
          "T_P9010":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZJTXM":"",
              "ZJTXB":"",
              "ZGX":"",
              "ZGXMS":"",
              "ZJTDH":"",
              "ZJTDZ":"",
              "ZCSRQ":"",
              "ZGZDW":"",
              "ZGZZW":"",
              "ZSFLXR":""
            }
          },
          "T_P9011":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZQRGS":"",
              "ZZW":"",
              "ZBZ":""
            }
          },
          "T_P9012":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZGZDZ":"",
              "ZHJDZ":"",
              "ZCZDZ":"",
              "ZGW":"",
              "ZYB":""
            }
          },
          "T_P9013":{
            "item":{
              "BEGDA":"",
              "ENDDA":"",
              "ZHR_ZCLX":"",
              "ZHR_ZCBM":"",
              "ZHR_PP":"",
              "ZHR_XH":"",
              "ZHR_XLH":"",
              "ZHR_DQJZ":"",
              "ZHR_FFRQ":"",
              "ZHR_SFGH":"",
              "ZHR_GHRQ":""
            }
          }
        }
        };
        hmsHttp.post(infoUrl,infoParam).then(function(response){
          deferred.resolve(response);
        }, function(response){
          deferred.reject(response);
        });
        //  .error(function(){
        //  deferred.reject(response);
        //});
        return deferred.promise;
      }
    };
    return service;
  });
