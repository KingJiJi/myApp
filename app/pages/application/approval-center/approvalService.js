/**
 * Created by utopia_song on 16/9/9.
 */
angular.module('applicationModule')
  .service('workFlowListService',
    ['hmsHttp',
      'baseConfig',
      'hmsPopup',
      function (hmsHttp,
                baseConfig,
                hmsPopup) {

        this.getTodoList = function (success,error) {
          var url = baseConfig.sapUrl + 'Zhrwf00';
          var param = {"ZHRWF00":{
            "FLAG":"Y",
            "UNAME":"HANDDEV",
            "PAGE":"0",
            "PERPAGE":"2",
            "ALL":"X",
            "T_TODOLIST":{
              "item":{
                "REL_NUMBER":"",
                "WF_TYPE":"",
                "REL_DATE":"",
                "REL_BY":"",
                "CONTENT":"",
                "REL_STATUS":""
              }
            }
          }
          };
          hmsHttp.post(url,param).then(function (response) {
              success(response);
          }, function(response){
            error(response);
          });
          //  .error(function (response) {
          //  error(response);
          //})
        },
        this.getTodoDetail = function(success,error,approvalId){
          var url = baseConfig.sapUrl + 'Zhrwf01001';
          var param = {
            "ZHRWF01_001":{
              "ET_REL_HISTORY":{
                "item":{
                  "MANDT":"",
                  "WF_TYPE":"",
                  "REL_NUMBER":"",
                  "REL_DATE":"",
                  "REL_TIME":"",
                  "REL_ID":"",
                  "REL_ENAME":"",
                  "REL_PLANS":"",
                  "REL_PLSTX":"",
                  "REL_STEP":"",
                  "REL_STATUS":"",
                  "REL_ACTION":"",
                  "REMARKS":""
                }
              },
              "I_REL_NUMBER":approvalId,
              "I_WF_TYPE":"01",
              "ET_ZHRWF_001":{
                "item":{
                  "MANDT":"",
                  "WF_TYPE":"",
                  "REL_NUMBER":"",
                  "ENAME":"",
                  "ICNUM":"",
                  "ICNUM_TYPE":"",
                  "GESCH":"",
                  "REQ_TYPE":"",
                  "CREAT_BY":"",
                  "MASSN":"",
                  "MNTXT":"",
                  "PERNR_A":"",
                  "MASSG":"",
                  "MGTXT":"",
                  "ENTR_DATE":"",
                  "ZQYDW":"",
                  "ZQYDWWB":"",
                  "ZGZDZ":"",
                  "PERSK":"",
                  "PTEXT":"",
                  "PERSA":"",
                  "NAME1":"",
                  "ORGEH":"",
                  "ORGTX":"",
                  "PLANS":"",
                  "PLSTX":"",
                  "ANSVH":"",
                  "ATX":"",
                  "PR_VALUE1":"",
                  "PR_VALUE2":"",
                  "PR_VALUE3":"",
                  "PR_VALUE4":"",
                  "EX_VALUE1":"",
                  "EX_VALUE2":"",
                  "EX_VALUE3":"",
                  "EX_VALUE4":"",
                  "WAERS":"",
                  "REMARKS":"",
                  "REL_STATUS":"",
                  "CREATE_ID":"",
                  "CREATE_ENAME":"",
                  "CREATE_PLANS":"",
                  "CREATE_PLSTX":"",
                  "CREATE_DATE":"",
                  "CREATE_TIME":"",
                  "NOW_REL_STEP":"",
                  "NOW_REL_ID":"",
                  "NOW_REL_ENAME":"",
                  "NOW_REL_PLANS":"",
                  "NOW_REL_PLSTX":"",
                  "NOW_REL_DATE":"",
                  "NOW_REL_TIME":"",
                  "NEXT_REL_STEP":"",
                  "NEXT_REL_ID":"",
                  "NEXT_REL_ENAME":"",
                  "NEXT_REL_PLANS":"",
                  "NEXT_REL_PLSTX":"",
                  "CHANGE_ID":"",
                  "CHANGE_ENAME":"",
                  "CHANGE_PLANS":"",
                  "CHANGE_PLSTX":"",
                  "CHANGE_DATE":"",
                  "CHANGE_TIME":"",
                  "REL_FLAG_END":""
                }
              },
              "I_ENAME":"",
              "I_ICNUM":""
            }
          };
          hmsHttp.post(url,param).then(function (response) {
            success(response);
          }, function(response){
            error(response);
          });
          //  .error(function (response) {
          //  error(response);
          //})
        }
      }
    ]);
