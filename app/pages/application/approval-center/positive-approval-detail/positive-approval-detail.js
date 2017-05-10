/**
 * Created by xuchengcheng on 2016/11/10.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('tab.positive-approval-detail', {
          url: '/tab.positive-approval-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/positive-approval-detail/positive-approval-detail.html',
              controller: 'positiveApprovalDetailCtrl',
              controllerAs: 'pADCtrl'
            }
          },
          params: {
            rel_number: '',
            approvalStatus: ''
          }
        });
    }
  ]);

angular.module('applicationModule')
  .controller('positiveApprovalDetailCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$timeout',
    '$stateParams',
    '$ionicActionSheet',
    '$cordovaCamera',
    '$rootScope',
    '$ionicModal',
    '$cordovaInAppBrowser',
    '$ionicHistory',
    'sweet',
    function($scope,
      $state,
      baseConfig,
      hmsHttp,
      hmsPopup,
      $ionicScrollDelegate,
      $timeout,
      $stateParams,
      $ionicActionSheet,
      $cordovaCamera,
      $rootScope,
      $ionicModal,
      $cordovaInAppBrowser,
      $ionicHistory,
      sweet) {
      $scope.picsArr = [];
      $scope.picsFileArr = [];
      $scope.positiveApproval = {
        remark: ''
      };
      var url = baseConfig.sapUrl + 'Zhrwf04_011';
      var param = {
        "ZHRWF04_011": {
          "ET_ZHRWF_004": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "PERNR": "",
              "ZSYQRQ": "",
              "ZSYQRQ_N": "",
              "BEGDA": "",
              "ENAME": "",
              "RESUME": "",
              "ZFLAG_EX": "",
              "ZFLAG_RE": "",
              "ZFLAG_ATT": "",
              "ZQYDW": "",
              "ZQYDWWB": "",
              "PERSA": "",
              "NAME1": "",
              "ORGEH": "",
              "ORGTX": "",
              "PLANS": "",
              "PLSTX": "",
              "ANSVH": "",
              "ATX": "",
              "ZSUMMARY": "",
              "PR_VALUE1": "",
              "PR_VALUE2": "",
              "PR_VALUE3": "",
              "PR_VALUE4": "",
              "EX_VALUE1": "",
              "EX_VALUE2": "",
              "EX_VALUE3": "",
              "EX_VALUE4": "",
              "DE_VALUE1": "",
              "DE_VALUE2": "",
              "DE_VALUE3": "",
              "DE_VALUE4": "",
              "WAERS": "",
              "REMARKS": "",
              "REL_STATUS": "",
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "REL_FLAG_END": ""
            }
          },
          "I_REL_NUMBER": $stateParams.rel_number,
          "T_REL_HISTORY": {
            "item": {
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_DATE": "",
              "REL_TIME": "",
              "REL_ID": "",
              "REL_ENAME": "",
              "REL_PLANS": "",
              "REL_PLSTX": "",
              "REL_STEP": "",
              "REL_STATUS": "",
              "REL_ACTION": "",
              "REMARKS": "",
              "ZFILE_FLAG": "",
              "ZFILE_NAME": "",
              "ZPHOTO": ""
            }
          }
        }
      };
      $scope.approvalStatus = $stateParams.approvalStatus;
      $scope.imgArr = [];
      $scope.positiveDetail = {};
      $scope.fileDetail = {};
      $scope.rel_history = [];
      $scope.picsArr = [];
      $scope.newHolidayPics = [];
      $scope.showDelete = "-1";
      $scope.takeTimes = 0;
      $scope.showArrow = 'false';
      var imgTotalLength = 0;
      var pictureNumber = 0;
      /**
       * 打开附件
       * @param Url
       * @param self
       * @param opt
       * @returns {Function}
       */
      this.openbrserinfo = function(Url, self, opt) {
        return $ionicActionSheet.show({
          buttons: [{
            text: '确定'
          }],
          titleText: '是否要打开链接',
          cancelText: '取消',
          buttonClicked: function(index) {
            if (index == 0) {
              var options = {
                location: 'yes',
                //clearcache: 'yes',
                toolbar: 'yes',
                toolbarposition: 'top',
                hardwareback: 'no',
                closebuttoncaption: 'yes'
              };
              $cordovaInAppBrowser.open(Url, self ? self : '_self', opt ? opt : options)
                .then(function(event) {
                  console.debug('成功');
                })
                .catch(function(event) {
                  console.debug('失败: ' + event);
                });
              return true;
            }
            $cordovaInAppBrowser.close();
          }
        });
      };
      this.openFile = function(url) {
        var fileUrl = baseConfig.imgDownloadUrl + url;
        console.log("fileUrl = " + fileUrl);
        if (fileUrl !== "") {

          try {
            this.openbrserinfo(fileUrl, '_system', {
              location: 'yes'
            });
          } catch (e) {
            window.open(fileUrl, '_system', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
          }
        } else {
          hmsPopup.showShortCenterToast("没有网站链接");
        }
      };

      /**
       * 得到附件
       * @param REL_NUMBER
       * @param NOW_REL_STEP
       */
      function getFileList(REL_NUMBER, NOW_REL_STEP) {
        hmsPopup.showLoading("正在加载附件,请稍后...");
        var url = baseConfig.sapUrl + 'Zhrwf04_012';
        var param = {
          "ZHRWF04_012": {
            "I_REL_NUMBER": REL_NUMBER,
            "I_REL_STEP": NOW_REL_STEP
          }
        };
        console.log('getFileList param  = ' + angular.toJson(param));
        hmsHttp.post(url, param).then(function(response) {
          hmsPopup.hideLoading();
          var picStrings = response.CV_FILENAME;
          $scope.picsFileArr = picStrings.split(',');
          angular.forEach($scope.picsFileArr, function(item, index) {
            if (item == '' || item == undefined) {
              $scope.picsFileArr.splice(index, 1);
            }
          });
          var a = response.CV_FILENAME == '' ? '' : response.CV_FILENAME;
          // $scope.fileDetail.fileName = a.replace(/[^\u4e00-\u9fa5]/g,'')+a.substring(a.indexOf('.'),a.length);
          $scope.fileDetail.fileName = a;
          $scope.fileDetail.fileSimpleName = a.replace(/\d+/g, '').replace('/', '');
          $scope.fileDetail.CV_FILE = response.CV_FILE;
          $scope.fileDetail.isPics = response.CV_CONTYPE == "image/jpeg" ? 'true' : 'false';
          console.log('$scope.fileDetail.isPics = ' + $scope.fileDetail.isPics);
        }, function(response) {

        })
      }

      $scope.openImg = function(url) {
        $scope.showMyBackdrop = true;
        $scope.showImg = true;
        $scope.imgUrl = url;
      };
      $scope.hideImgPropur = function() {
        $scope.showMyBackdrop = false;
        $scope.imgUrl = '';
        $scope.showImg = false;
      };
      $scope.goTryDes = function(tryDes) {
        $state.go('tab.positive-approval-tryDes', {
          tryDes: tryDes
        });
      };

      function func(times) {
        if (times <= 0) {
          return;
        }
      }

      function getFileArray(a) {
        var url = baseConfig.sapUrl + 'Zhrwf04_012';
        var param = {
          "ZHRWF04_012": {
            "I_REL_NUMBER": a.REL_NUMBER,
            "I_REL_STEP": a.REL_STEP
          }
        };
        hmsHttp.post(url, param).then(function(response) {
          $scope.picsArr = [];
          $scope.fileArr = [];
          console.log('1111 = ' + angular.toJson(response));
          if (response.CV_CONTYPE.indexOf('application') > -1) { //PC端传的是附件
            var fileStrings = response.CV_FILENAME;
            $scope.fileArr = fileStrings.split(',');
          } else {
            //PC端传的是图片
            var picStrings = response.CV_FILENAME;
            $scope.picsArr = picStrings.split(',');
            console.log('$scope.picsArr = ' + angular.toJson($scope.picsArr));
            angular.forEach($scope.picsArr, function(item, index) {
              if (item == '' || item == undefined) {
                $scope.picsArr.splice(index, 1);
              }
            });
          }
          $scope.relStatus = {
            'SUBMIT': '提交',
            'SAVE': '保存',
            'REJECT': '拒绝',
            'APPROVE': '同意',
            'RETURN': '退回',
            'CANCEL': '撤回'
          }[a.REL_ACTION] || '';
          var temp = {
            positiveApprovalTrackDate: a.REL_DATE + '  ' + a.REL_TIME,
            positiveApprovalTrackEmp: a.REL_ENAME,
            positiveApprovalTrackPosition: a.REL_PLSTX,
            positiveApprovalTrackStatus: $scope.relStatus,
            positiveApprovalTrackRemark: a.REMARKS,
            positiveApprovalImg: $scope.picsArr,
            positiveApprovalStep: a.REL_STEP,
            positiveApprovalNumber: a.REL_NUMBER,
            positiveApprovalFiles: $scope.fileArr
          };
          $scope.rel_history.push(temp);
          console.group('审批历史数据:');
          console.info(angular.toJson($scope.rel_history, true));
          $scope.takeTimes--;
          func($scope.takeTimes);
        }, function(response) {

        })
      }

      function getHistoryFileList(a) {
        if (a.ZPHOTO == '') { //PC端审批传的附件和图片
          getFileArray(a);

        } else { //APP端审批传的图片
          var picStrings = a.ZPHOTO;
          $scope.picsArr = picStrings.split(',');
          angular.forEach($scope.picsArr, function(item, index) {
            if (item == '' || item == undefined) {
              $scope.picsArr.splice(index, 1);
            }
          });
          $scope.relStatus = {
            'SUBMIT': '提交',
            'SAVE': '保存',
            'REJECT': '拒绝',
            'APPROVE': '同意',
            'RETURN': '退回',
            'CANCEL': '撤回'
          }[a.REL_ACTION] || '';
          var temp = {
            positiveApprovalTrackDate: a.REL_DATE + '  ' + a.REL_TIME,
            positiveApprovalTrackEmp: a.REL_ENAME,
            positiveApprovalTrackPosition: a.REL_PLSTX,
            positiveApprovalTrackStatus: $scope.relStatus,
            positiveApprovalTrackRemark: a.REMARKS,
            positiveApprovalImg: $scope.picsArr,
            positiveApprovalStep: a.REL_STEP,
            positiveApprovalNumber: a.REL_NUMBER,
            positiveApprovalFiles: $scope.fileArr
          };
          $scope.rel_history.push(temp);
        }
      }

      function getPositiveDetail() {
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function(response) {
          hmsPopup.hideLoading();

          console.group('转正详情');
          console.info(angular.toJson(response, true));
          console.log('response.ET_ZHRWF_004.item.ZSUMMARY.length = ' + response.ET_ZHRWF_004.item.ZSUMMARY.length);
          var summary = response.ET_ZHRWF_004.item.ZSUMMARY || '';
          // $scope.positiveDetail.tryDes = summary; //试用期小结
          var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          if (screenWidth > 400) {
            if (summary.length > 24) {
              var p = summary.substring(0, 24) + '  ...';
              $scope.showArrow = 'true';
              $scope.positiveDetail.tryDes = p; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
              console.log('ppppp = ' + p);
            } else {
              $scope.positiveDetail.tryDes = summary; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
            }
          } else if (screenWidth > 370) {
            if (summary.length > 22) {
              var p = summary.substring(0, 22) + '  ...';
              $scope.showArrow = 'true';
              $scope.positiveDetail.tryDes = p; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
              console.log('ppppp = ' + p);
            } else {
              $scope.positiveDetail.tryDes = summary; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
            }
          } else if (screenWidth > 315) {
            if (summary.length > 18) {
              var p = summary.substring(0,18) + '  ...';
              $scope.showArrow = 'true';
              $scope.positiveDetail.tryDes = p; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
              console.log('ppppp = ' + p);
            } else {
              $scope.positiveDetail.tryDes = summary; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
            }
          } else {
            if (summary.length > 15) {
              var p = summary.substring(0, 15) + '  ...';
              $scope.showArrow = 'true';
              $scope.positiveDetail.tryDes = p; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
              console.log('ppppp = ' + p);
            } else {
              $scope.positiveDetail.tryDes = summary; //试用期小结
              $scope.positiveDetail.realTryDes = summary;
            }
          }


          $scope.positiveDetail.positiveId = response.ET_ZHRWF_004.item.REL_NUMBER;
          $scope.positiveDetail.positivePerson = response.ET_ZHRWF_004.item.CREATE_ENAME;
          $scope.positiveDetail.NOW_REL_STEP = response.ET_ZHRWF_004.item.NOW_REL_STEP;
          $scope.positiveDetail.signedCompany = response.ET_ZHRWF_004.item.ZQYDWWB; //签约公司
          $scope.positiveDetail.company = response.ET_ZHRWF_004.item.NAME1; //所在版块
          $scope.positiveDetail.department = response.ET_ZHRWF_004.item.ORGTX; //所在部门
          $scope.positiveDetail.position = response.ET_ZHRWF_004.item.PLSTX; //现岗位
          $scope.positiveDetail.tryStartDate = response.ET_ZHRWF_004.item.BEGDA; //开始时间
          $scope.positiveDetail.tryEndDate = response.ET_ZHRWF_004.item.ZSYQRQ; //结束时间


          $scope.positiveDetail.tryBasicWage = Number(response.ET_ZHRWF_004.item.PR_VALUE1); //基本工资
          $scope.positiveDetail.tryPostAllowance = Number(response.ET_ZHRWF_004.item.PR_VALUE2); //岗位津贴
          $scope.positiveDetail.tryLunchAllowance = Number(response.ET_ZHRWF_004.item.PR_VALUE3); //午餐补贴
          $scope.positiveDetail.tryOtherAllowance = Number(response.ET_ZHRWF_004.item.PR_VALUE4); //其他补贴
          $scope.positiveDetail.tryTotal = $scope.positiveDetail.tryBasicWage + $scope.positiveDetail.tryPostAllowance + $scope.positiveDetail.tryLunchAllowance + $scope.positiveDetail.tryOtherAllowance; //试用期总计

          $scope.positiveDetail.positiveBasicWage = Number(response.ET_ZHRWF_004.item.EX_VALUE1); //基本工资
          $scope.positiveDetail.positivePostAllowance = Number(response.ET_ZHRWF_004.item.EX_VALUE2); //岗位津贴
          $scope.positiveDetail.positiveLunchAllowance = Number(response.ET_ZHRWF_004.item.EX_VALUE3); //午餐补贴
          $scope.positiveDetail.positiveOtherAllowance = Number(response.ET_ZHRWF_004.item.EX_VALUE4); //其他补贴
          $scope.positiveDetail.positiveAllWage = $scope.positiveDetail.positiveBasicWage + $scope.positiveDetail.positivePostAllowance + $scope.positiveDetail.positiveLunchAllowance + $scope.positiveDetail.positiveOtherAllowance; //转正后约定总计

          if (response.T_REL_HISTORY !== '') { //有审批记录的情况
            $scope.picsArr = [];
            $scope.fileArr = [];
            if (response.T_REL_HISTORY.item.constructor == Array) {

              var a = response.T_REL_HISTORY.item;
              var b = a.filter(function(item) {
                return item.REL_ACTION != 'SAVE';
              });
              console.info('bbbbb = ' + angular.toJson(b, true));
              angular.forEach(b, function(item, index) {
                if (index == b.length - 1) {
                  console.info('index item  = '+angular.toJson(item,true));
                  if (item.ZFILE_NAME !== '') { //PC端审批传的附件和图片
                    var submitFileStrings = item.ZFILE_NAME;
                    if (submitFileStrings.indexOf('JPG') > -1 || submitFileStrings.indexOf('JPEG') > -1 || submitFileStrings.indexOf('GIF') > -1 || submitFileStrings.indexOf('BMP') > -1 || submitFileStrings.indexOf('PSD') > -1 || submitFileStrings.indexOf('PNG') > -1 || submitFileStrings.indexOf('SVG') > -1) {
                      $scope.picsFileArr = submitFileStrings.split(',');
                      $scope.fileDetail.isPics = 'true';
                    } else {
                      $scope.fileDetail.fileName = submitFileStrings;
                      $scope.fileDetail.isPics = 'false';
                    }
                  }else{
                    $scope.fileDetail.fileName = '';
                  }
                }
                $scope.relStatus = "";
                if (item.ZFILE_NAME !== '') { //PC端审批传的附件和图片
                  var fileStrings = item.ZFILE_NAME;
                  if (fileStrings.indexOf('JPG') > -1 || fileStrings.indexOf('JPEG') > -1 || fileStrings.indexOf('GIF') > -1 || fileStrings.indexOf('BMP') > -1 || fileStrings.indexOf('PSD') > -1 || fileStrings.indexOf('PNG') > -1 || fileStrings.indexOf('SVG') > -1) {
                    $scope.picsArr = fileStrings.split(',');
                  } else {
                    $scope.fileArr = fileStrings.split(',');
                  }

                } else if (item.ZPHOTO !== '') { //APP端审批传的图片
                  var picStrings = item.ZPHOTO;
                  $scope.picsArr = picStrings.split(',');
                  angular.forEach($scope.picsArr, function(item, index) {
                    if (item == '' || item == undefined) {
                      $scope.picsArr.splice(index, 1);
                    }
                  });

                } else {
                  $scope.picsArr = [];
                  $scope.fileArr = [];
                }
                $scope.relStatus = {
                  'SUBMIT': '提交',
                  'SAVE': '保存',
                  'REJECT': '拒绝',
                  'APPROVE': '同意',
                  'RETURN': '退回',
                  'CANCEL': '撤回'
                }[item.REL_ACTION] || '';
                var temp = {
                  positiveApprovalTrackDate: item.REL_DATE + '  ' + item.REL_TIME,
                  positiveApprovalTrackEmp: item.REL_ENAME,
                  positiveApprovalTrackPosition: item.REL_PLSTX,
                  positiveApprovalTrackStatus: $scope.relStatus,
                  positiveApprovalTrackRemark: item.REMARKS,
                  positiveApprovalImg: $scope.picsArr,
                  positiveApprovalStep: item.REL_STEP,
                  positiveApprovalNumber: item.REL_NUMBER,
                  positiveApprovalFiles: $scope.fileArr
                };
                $scope.rel_history.push(temp);
                $scope.picsArr = [];
                $scope.fileArr = [];
              });

              console.info('rel_history a = ' + angular.toJson($scope.rel_history, true));
            } else {
              console.log('$scope.fileDetail.fileName'+$scope.fileDetail.fileName);
              console.log('$scope.picsFileArr'+angular.toJson($scope.picsFileArr));
              //用PC端提转正申请的情况
              // getFileList(response.T_REL_HISTORY.item.REL_NUMBER, response.T_REL_HISTORY.item.REL_STEP);
              if(response.T_REL_HISTORY.item.ZFILE_NAME !== ''){
                var fileStrings = response.T_REL_HISTORY.item.ZFILE_NAME;
                if (fileStrings.indexOf('JPG') > -1 || fileStrings.indexOf('JPEG') > -1 || fileStrings.indexOf('GIF') > -1 || fileStrings.indexOf('BMP') > -1 || fileStrings.indexOf('PSD') > -1 || fileStrings.indexOf('PNG') > -1 || fileStrings.indexOf('SVG') > -1) {
                  $scope.picsArr = fileStrings.split(',');
                  $scope.picsFileArr = fileStrings.split(',');
                  $scope.fileDetail.isPics = 'true';
                } else {
                  $scope.fileArr = fileStrings.split(',');
                  $scope.fileDetail.fileName = fileStrings;
                  $scope.fileDetail.isPics = 'false';
                }
              }else{
                $scope.fileDetail.fileName = '';
              }

              $scope.relStatus = {
                'SUBMIT': '提交',
                'SAVE': '保存',
                'REJECT': '拒绝',
                'APPROVE': '同意',
                'RETURN': '退回',
                'CANCEL': '撤回'
              }[response.T_REL_HISTORY.item.REL_ACTION] || '';
              var temp = {
                positiveApprovalTrackDate: response.T_REL_HISTORY.item.REL_DATE + '   ' + response.T_REL_HISTORY.item.REL_TIME,
                positiveApprovalTrackEmp: response.T_REL_HISTORY.item.REL_ENAME,
                positiveApprovalTrackPosition: response.T_REL_HISTORY.item.REL_PLSTX,
                positiveApprovalTrackStatus: $scope.relStatus,
                positiveApprovalTrackRemark: response.T_REL_HISTORY.item.REMARKS,
                positiveApprovalImg: $scope.picsArr,
                positiveApprovalStep: response.T_REL_HISTORY.item.REL_STEP,
                positiveApprovalNumber: response.T_REL_HISTORY.item.REL_NUMBER,
                positiveApprovalFiles: $scope.fileArr
              };
              $scope.rel_history.push(temp);
            }
          }
        }, function(response) {

        })
      }

      getPositiveDetail();

      $scope.getPicture = function() {
        $ionicActionSheet.show({
          buttons: [{
            text: '从相册中选'
          }, {
            text: '拍照'
          }],
          titleText: '选择上传方式',
          cancelText: '取消',
          buttonClicked: function(index) {
            if (index == 0) {
              moreImg();
            } else if (index == 1) {
              takePhoto();
            }
            return true;
          }
        });
      };
      /**
       * 多张上传
       */
      function moreImg() {
        window.imagePicker.getPictures(
          function(results) {
            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              $scope.imgArr.push(results[i]);
              $scope.$apply();
            }
          },
          function(error) {
            console.log('Error: ' + error);
          }, {
            maximumImagesCount: 1,
            width: 800
          }
        );
      }

      /**
       * 拍照
       */
      function takePhoto() {
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 1366,
          targetHeight: 768,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function(imageURI) {
          console.log(imageURI);
          $scope.person_imgsrc = imageURI;
          console.group('img===');
          console.groupEnd();
          $scope.imgArr.push(imageURI);
          console.log('takePhoto imgArr = ' + angular.toJson($scope.imgArr));
          //upImage(base64encode(imageURI), imageURI);
          $scope.showPress = true;
        }, function(err) {
          // error
        });

      }

      /**
       * 删除图片
       * @param index
       */
      $scope.delImage = function(index) {
        if ($scope.showDelete == index) {
          $scope.showDelete = "-1";
        } else {
          $scope.showDelete = index;
        }
        console.log('on-hold' + index);
        console.log('$scope.showDelete' + $scope.showDelete);
      };
      $scope.deleteImage = function(num) { //删除图片
        console.log("dsafdas", num);
        $scope.imgArr.splice(num, 1);
        $scope.showDelete = "-1";
      };


      //上传图片
      var uploadImage = function(type) {
        $scope.type = type;
        hmsPopup.showLoadingWithoutBackdrop('上传信息中,请稍候');
        if ($scope.imgArr.length == 0) {
          var submitUrl = baseConfig.sapUrl + 'Zhrwf04_003';
          var submitParam = {
            "ZHRWF04_003": {
              "ET_ZHRWF_004": {
                "item": {
                  "MANDT": "",
                  "WF_TYPE": "",
                  "REL_NUMBER": $stateParams.rel_number,
                  "PERNR": "",
                  "ZSYQRQ": "",
                  "ZSYQRQ_N": "",
                  "BEGDA": "",
                  "ENAME": "",
                  "RESUME": "",
                  "ZFLAG_EX": "",
                  "ZFLAG_RE": "",
                  "ZFLAG_ATT": "",
                  "ZQYDW": "",
                  "ZQYDWWB": "",
                  "PERSA": "",
                  "NAME1": "",
                  "ORGEH": "",
                  "ORGTX": "",
                  "PLANS": "",
                  "PLSTX": "",
                  "ANSVH": "",
                  "ATX": "",
                  "ZSUMMARY": "",
                  "PR_VALUE1": "",
                  "PR_VALUE2": "",
                  "PR_VALUE3": "",
                  "PR_VALUE4": "",
                  "EX_VALUE1": "",
                  "EX_VALUE2": "",
                  "EX_VALUE3": "",
                  "EX_VALUE4": "",
                  "DE_VALUE1": "",
                  "DE_VALUE2": "",
                  "DE_VALUE3": "",
                  "DE_VALUE4": "",
                  "WAERS": "",
                  "REMARKS": $scope.positiveApproval.remark,
                  "REL_STATUS": "",
                  "CREATE_ID": "",
                  "CREATE_ENAME": "",
                  "CREATE_PLANS": "",
                  "CREATE_PLSTX": "",
                  "CREATE_DATE": "",
                  "CREATE_TIME": "",
                  "NOW_REL_STEP": "",
                  "NOW_REL_ID": "",
                  "NOW_REL_ENAME": "",
                  "NOW_REL_PLANS": "",
                  "NOW_REL_PLSTX": "",
                  "NOW_REL_DATE": "",
                  "NOW_REL_TIME": "",
                  "NEXT_REL_STEP": "",
                  "NEXT_REL_ID": "",
                  "NEXT_REL_ENAME": "",
                  "NEXT_REL_PLANS": "",
                  "NEXT_REL_PLSTX": "",
                  "REL_FLAG_END": ""
                }
              },
              "I_CODE": type,
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZPHOTO": ""
            }
          };
          hmsHttp.post(submitUrl, submitParam).then(function(response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function() {
                hmsPopup.showShortCenterToast('审批成功');
              }, 200);
              $rootScope.$broadcast('APPROVAL_SUCCESS');
              $ionicHistory.goBack();
            } else {
              hmsPopup.showPopup(response.O_MESSAGE, function(res) {
                $rootScope.$broadcast('APPROVAL_SUCCESS');
                $ionicHistory.goBack();
              });
            }
          }, function(response) {
            hmsPopup.hideLoading();
            hmsPopup.showShortCenterToast('审批失败');
          })
        } else {
          console.log('$scope.imgArr has photo = ' + $scope.imgArr);
          for (var i = 0; i < $scope.imgArr.length; i++) {
            var nowDates = Date.parse(new Date()) / 1000;
            var fileName = window.localStorage.empno.toUpperCase() + nowDates + '.jpg';
            var urlname = "";
            var myParam = {
              filename: fileName,
              url: urlname //图片在服务器的路径
            };
            var options = new FileUploadOptions();
            options.filekey = "file";
            options.fileName = "image.jpg";
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            var trustAllHosts = true;
            options.params = myParam;
            var fileTransfer = new FileTransfer();
            fileTransfer.upload(
              $scope.imgArr[i],
              //encodeURI(baseConfig.queryPath+"/objectUpload?access_token="+window.localStorage.token),//上传服务器的接口地址
              encodeURI(baseConfig.imgUploadUrl),
              win,
              fail,
              options,
              trustAllHosts
            );
          }
        }
      };

      var win = function(result) {
        var picString = '';

        console.log('picString = ' + picString);
        $scope.newHolidayPics.push(angular.fromJson(result.response).savePath);
        pictureNumber++;
        console.log('成功' + angular.toJson(result, true));
        console.log("Response = " + result.response);
        if (pictureNumber == imgTotalLength) {
          for (var i = 0; i < $scope.newHolidayPics.length; i++) {
            if (i < $scope.newHolidayPics.length - 1) {
              picString += $scope.newHolidayPics[i] + ',';
            } else {
              picString += $scope.newHolidayPics[i];
            }
          }
          console.log('$scope.newHolidayPics = ' + angular.toJson($scope.newHolidayPics));
          var submitUrl = baseConfig.sapUrl + 'Zhrwf04_003';
          var submitParam = {
            "ZHRWF04_003": {
              "ET_ZHRWF_004": {
                "item": {
                  "MANDT": "",
                  "WF_TYPE": "",
                  "REL_NUMBER": $stateParams.rel_number,
                  "PERNR": "",
                  "ZSYQRQ": "",
                  "ZSYQRQ_N": "",
                  "BEGDA": "",
                  "ENAME": "",
                  "RESUME": "",
                  "ZFLAG_EX": "",
                  "ZFLAG_RE": "",
                  "ZFLAG_ATT": "",
                  "ZQYDW": "",
                  "ZQYDWWB": "",
                  "PERSA": "",
                  "NAME1": "",
                  "ORGEH": "",
                  "ORGTX": "",
                  "PLANS": "",
                  "PLSTX": "",
                  "ANSVH": "",
                  "ATX": "",
                  "ZSUMMARY": "",
                  "PR_VALUE1": "",
                  "PR_VALUE2": "",
                  "PR_VALUE3": "",
                  "PR_VALUE4": "",
                  "EX_VALUE1": "",
                  "EX_VALUE2": "",
                  "EX_VALUE3": "",
                  "EX_VALUE4": "",
                  "DE_VALUE1": "",
                  "DE_VALUE2": "",
                  "DE_VALUE3": "",
                  "DE_VALUE4": "",
                  "WAERS": "",
                  "REMARKS": $scope.positiveApproval.remark,
                  "REL_STATUS": "",
                  "CREATE_ID": "",
                  "CREATE_ENAME": "",
                  "CREATE_PLANS": "",
                  "CREATE_PLSTX": "",
                  "CREATE_DATE": "",
                  "CREATE_TIME": "",
                  "NOW_REL_STEP": "",
                  "NOW_REL_ID": "",
                  "NOW_REL_ENAME": "",
                  "NOW_REL_PLANS": "",
                  "NOW_REL_PLSTX": "",
                  "NOW_REL_DATE": "",
                  "NOW_REL_TIME": "",
                  "NEXT_REL_STEP": "",
                  "NEXT_REL_ID": "",
                  "NEXT_REL_ENAME": "",
                  "NEXT_REL_PLANS": "",
                  "NEXT_REL_PLSTX": "",
                  "REL_FLAG_END": ""
                }
              },
              "I_CODE": $scope.type,
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZPHOTO": picString
            }
          };
          hmsHttp.post(submitUrl, submitParam).then(function(response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $rootScope.$broadcast('APPROVAL_SUCCESS');
              $ionicHistory.goBack();
              $timeout(function() {
                hmsPopup.showShortCenterToast('审批成功');
              });
            } else {
              hmsPopup.showPopup(response.O_MESSAGE, function(res) {
                $rootScope.$broadcast('APPROVAL_SUCCESS');
                $ionicHistory.goBack();
              });
            }
          }, function(response) {
            hmsPopup.hideLoading();
            hmsPopup.showShortCenterToast('审批提交失败');
          })
        }
      };
      var fail = function(error) { //图片上传失败
        //如果有Loading的话记得隐藏loading
        console.log('fail error = ' + angular.toJson(error));
        hmsPopup.hideLoading();
        hmsPopup.showPopup('审批失败');
      };
      $scope.showBigPicture = function(index) { //显示大图
        $scope.showDelete = "-1";
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        $scope.activeSlide = index;
        $scope.showModal('build/pages/application/application-ask-leave/new-application-holiday/photo-zoom.html');
      };

      $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove()
      };
      $scope.delImage = function(index) {
        // if ($scope.showDelete == index) {
        //   $scope.showDelete = "-1";
        // } else {
        //   $('#index').addClass('shake');
        //   $scope.showDelete = index;
        // }
        $scope.showDelete = true;
        console.log('on-hold' + index);
        console.log('$scope.showDelete' + $scope.showDelete);
      };
      $scope.deleteImage = function(event, num) { //删除图片
        event.stopPropagation();
        $scope.imgArr.splice(num, 1);
        // $scope.showDelete = "-1";
        $scope.showDelete = true;
      };
      $scope.cancelDelete = function() {
        if ($scope.showDelete !== -1) {
          $scope.showDelete = -1;
        }
      };
      $scope.approvalCommit = function(type) {
        for (var i = 0; i < $scope.imgArr.length; i++) {
          imgTotalLength++;
        }
        hmsPopup.confirm('您确定要提交审批结果吗?', '温馨提示', function(res) {
          if (res) {
            uploadImage(type);
          }
        });

      };
    }
  ])

.controller('getRelHistoryImageCtrl', ['$scope', 'baseConfig', 'hmsHttp', function($scope, baseConfig, hmsHttp) {
  console.log('getRelHistoryImageCtrl item = ' + angular.toJson($scope.items));
  if ($scope.items.positiveApprovalZphoto == '') { //PC端审批传的附件和图片

    var url = baseConfig.sapUrl + 'Zhrwf04_012';
    var param = {
      "ZHRWF04_012": {
        "I_REL_NUMBER": $scope.items.positiveApprovalNumber,
        "I_REL_STEP": $scope.items.positiveApprovalStep
      }
    };
    hmsHttp.post(url, param).then(function(response) {
      $scope.picsArr = [];
      $scope.fileArr = [];
      console.log('1111 $scope.items = ' + angular.toJson($scope.items));
      console.log('1111 param = ' + angular.toJson(param) + ' res' + angular.toJson(response));
      if (response) {
        if (response.CV_CONTYPE.indexOf('application') > -1) { //PC端传的是附件
          var fileStrings = response.CV_FILENAME;
          $scope.fileArr = fileStrings.split(',');
        } else {

          //PC端传的是图片
          var picStrings = response.CV_FILENAME;
          $scope.picsArr = picStrings.split(',');
          console.log('$scope.picsArr = ' + angular.toJson($scope.picsArr));
          angular.forEach($scope.picsArr, function(item, index) {
            if (item == '' || item == undefined) {
              $scope.picsArr.splice(index, 1);
            }
          });
        }
      } else {
        console.log('no response $scope.items = ' + angular.toJson($scope.items));
      }
    }, function(response) {

    })
  } else { //APP端审批传的图片
    var picStrings = $scope.items.positiveApprovalZphoto;
    $scope.picsArr = picStrings.split(',');
    angular.forEach($scope.picsArr, function(item, index) {
      if (item == '' || item == undefined) {
        $scope.picsArr.splice(index, 1);
      }
    });
  }
}]);
