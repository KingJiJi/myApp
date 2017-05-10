angular.module("baseConfig", [])
.constant("baseConfig", {"debug":true,"isMobilePlatform":false,"clearTable":true,"nativeScreenFlag":false,"appStoreFlag":false,"loginPath":"http://elb-sap-app-test-744951727.cn-north-1.elb.amazonaws.com.cn/web-shenzhou-0.1/api?sysName=SAP&apiName=","baseUrl":"http://elb-sap-app-test-744951727.cn-north-1.elb.amazonaws.com.cn/web-shenzhou-0.1/","sapUrl":"http://elb-sap-app-test-744951727.cn-north-1.elb.amazonaws.com.cn/web-shenzhou-0.1/api?sysName=SAP&apiName=","mainImgPath":"http://w3cmstest.ucarinc.com/portalcms/api/","pkgIdentifier":"","imgUploadUrl":"http://elb-sap-app-test-744951727.cn-north-1.elb.amazonaws.com.cn/web-shenzhou-0.1/appApi/uploadHrFtp","imgDownloadUrl":"http://elb-sap-app-test-744951727.cn-north-1.elb.amazonaws.com.cn/web-shenzhou-0.1/appApi/downloadHRFtp?savePath=","dbName":"makeNote.db","dbLocation":0,"scanPic":"http://w3statictest.zuchecdn.com/upload/news/erweima/uat.png","appRootPath":"","serverPath":"http://10.211.96.173:8080/bts","appRootFile":"helloCordova","appUpId":"com.hand.china.hrms2.research","version":{"currentVersion":"1.0.2","currentversionName":"当前版本1.0.2","currentSubVersion":"1","versionType":"UAT版"}});

/**
 * Created by gusenlin on 16/5/22.
 */
var utilModule = angular.module('utilModule',[]);
var HmsModule = angular.module('HmsModule',[]);//汉得公用模块库
var loginModule = angular.module('loginModule', []);
var messageModule = angular.module('messageModule', []);
var contactModule = angular.module('contactModule', []);
var applicationModule = angular.module('applicationModule', []);
var myInfoModule = angular.module('myInfoModule', []);
var tsApproveModule = angular.module('tsApproveModule', []);


/**
 * @ngdoc directive
 * @name hideTabs
 * @module utilModule
 * @description
 * This is the http interceptor
 * @author
 * gusenlin
 */
HmsModule.directive('hideTabs', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          scope.$watch(attributes.hideTabs, function (value) {
            console.log('$ionicView.beforeEnter value ' + value);
            if (value) {
              $rootScope.hideTabs = false;
            }
            else {
              $rootScope.hideTabs = true;
            }
          });
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = true;
          console.log('$ionicView.beforeLeave value ');
        });
      }
    };
  }])
  .directive('elasticImage', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
    return {
      restrict: 'A',
      link: function ($scope, $scroller, $attr) {
        var image = document.getElementById($attr.elasticImage);
        var imageHeight = image.offsetHeight;
        var currentBrightness = '';
        var brightness5 = "blur(5px) brightness(0.9)";
        var brightness4 = "blur(3px) brightness(0.9)";
        var brightness1 = "blur(0px) brightness(1)";
        currentBrightness = brightness5;

        $scroller.bind('scroll', function (e) {
          var scrollTop = e.detail.scrollTop;

          //console.log('scrollTop ' + scrollTop);

          var newImageHeight = imageHeight - scrollTop;
          /////////
          var calculation = 0;
          var blur = 0;
          var brightness = 0;
          if (newImageHeight < 0) {
            newImageHeight = 0;
            calculation = 0;
          }
          if (scrollTop <= 0) {

            if (-scrollTop >= 0 && -scrollTop < 60) {
              if (currentBrightness != brightness5) {
                currentBrightness = brightness5;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }
            if (-scrollTop >= 60 && -scrollTop < 120) {
              if (currentBrightness != brightness4) {
                currentBrightness = brightness4;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }

            if (-scrollTop >= 120) {
              if (currentBrightness != brightness1) {
                currentBrightness = brightness1;
                image.style.filter = currentBrightness;
                image.style.webkitFilter = currentBrightness;
              }
            }
          }
          //if(scrollTop<0){
          //  if(-scrollTop<175){
          //    calculation=-scrollTop/175;
          //    blur = 5*calculation;
          //    blur = 5-blur;
          //    brightness = 0.3*calculation;
          //    brightness = 0.7+brightness;
          //    image.style.filter = "blur("+blur+"px) "+"brightness("+brightness+")";
          //    image.style.webkitFilter = "blur("+blur+"px) "+"brightness("+brightness+")";
          //  }
          //}
          image.style.height = newImageHeight + 'px';
        });
      }
    }
  }])

  .directive('circleRotate', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $scroller, $attr) {
        var params = $attr.circleRotate;
        var domsId = params.split(',');
        console.log(domsId);
        if (domsId[0] == "dorm-apply") {
          var leftball = document.getElementById(domsId[1]);
          var rightball = document.getElementById(domsId[2]);
          var calculation = $scope.leftDays / $scope.totalDays;
          if (calculation <= 0.5) {//剩余天数大于总天数的一半
            leftball.style.transition = "all 0.3s linear";
            leftball.style.webkitTransition = "all 0.3s linear";
            rightball.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
            rightball.style.webkitTransition = "all 0.3s linear";
          } else if (calculation > 0.5) {//剩余天数不到入住天数的一半
            leftball.style.transition = "all 0.3s linear 0.3s";//左半圆过渡动画0.3s，渐缓，0.3s延迟
            leftball.style.webkitTransition = "all 0.3s linear 0.3s";
            rightball.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
            rightball.style.webkitTransition = "all 0.3s linear";
          }
          leftball.style.webkitTransform = "rotate(-135deg)";
          leftball.style.transform = "rotate(-135deg)";
          rightball.style.webkitTransform = "rotate(-135deg)";
          rightball.style.transform = "rotate(-135deg)";
          $timeout(function () {//定时器中决定两个圆的终止角度
            var angle = 0;
            if (calculation <= 0.5) {
              angle = 360 * calculation;
              angle = angle - 135;
              //console.log("角度："+angle);
              leftball.style.webkitTransform = "rotate(-135deg)";
              leftball.style.transform = "rotate(-135deg)";
              rightball.style.webkitTransform = "rotate(" + angle + "deg)";
              rightball.style.transform = "rotate(" + angle + "deg)";
            } else if (calculation > 0.5) {
              calculation = calculation - 0.5;
              angle = 360 * calculation;
              angle = angle - 135;
              //console.log("角度："+angle);
              leftball.style.webkitTransform = "rotate(" + angle + "deg)";
              leftball.style.transform = "rotate(" + angle + "deg)";
              rightball.style.webkitTransform = "rotate(45deg)";
              rightball.style.transform = "rotate(45deg)";
            }
          }, 500);
        } else if (domsId[0] == "time-off-manage") {
          //$timeout(function() {
          $scope.$watch('circleAnimationFlag', function () {
            if ($scope.circleAnimationFlag == true) {
              var leftball1 = document.getElementById(domsId[1]);
              var rightball1 = document.getElementById(domsId[2]);
              var leftball2 = document.getElementById(domsId[3]);
              var rightball2 = document.getElementById(domsId[4]);
              var leftball3 = document.getElementById(domsId[5]);
              var rightball3 = document.getElementById(domsId[6]);
              var calculation1 = $scope.timeOffHeader.paidHoliday / ($scope.timeOffHeader.paidHoliday + $scope.timeOffHeader.usedPaidHoliday);
              var calculation2 = $scope.timeOffHeader.paidSickLeave / ($scope.timeOffHeader.paidSickLeave + $scope.timeOffHeader.usedPaidSickLeave);
              var calculation3 = $scope.timeOffHeader.extPaidHoliday / ($scope.timeOffHeader.extPaidHoliday + $scope.timeOffHeader.usedExtPaidHoliday);
              if (calculation1 <= 0.5) {//剩余天数大于总天数的一半
                leftball1.style.transition = "all 0.3s linear";
                leftball1.style.webkitTransition = "all 0.3s linear";
                rightball1.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
                rightball1.style.webkitTransition = "all 0.3s linear";
              } else if (calculation1 > 0.5) {//剩余天数不到入住天数的一半
                leftball1.style.transition = "all 0.3s linear 0.3s";//左半圆过渡动画0.3s，渐缓，0.3s延迟
                leftball1.style.webkitTransition = "all 0.3s linear 0.3s";
                rightball1.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
                rightball1.style.webkitTransition = "all 0.3s linear";
              }
              if (calculation2 <= 0.5) {//剩余天数大于总天数的一半
                leftball2.style.transition = "all 0.3s linear";
                leftball2.style.webkitTransition = "all 0.3s linear";
                rightball2.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
                rightball2.style.webkitTransition = "all 0.3s linear";
              } else if (calculation2 > 0.5) {//剩余天数不到入住天数的一半
                leftball2.style.transition = "all 0.3s linear 0.3s";//左半圆过渡动画0.3s，渐缓，0.3s延迟
                leftball2.style.webkitTransition = "all 0.3s linear 0.3s";
                rightball2.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
                rightball2.style.webkitTransition = "all 0.3s linear";
              }
              if (calculation3 <= 0.5) {//剩余天数大于总天数的一半
                leftball3.style.transition = "all 0.3s linear";
                leftball3.style.webkitTransition = "all 0.3s linear";
                rightball3.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
                rightball3.style.webkitTransition = "all 0.3s linear";
              } else if (calculation3 > 0.5) {//剩余天数不到入住天数的一半
                leftball3.style.transition = "all 0.3s linear 0.3s";//左半圆过渡动画0.3s，渐缓，0.3s延迟
                leftball3.style.webkitTransition = "all 0.3s linear 0.3s";
                rightball3.style.transition = "all 0.3s linear";//右半圆过渡动画0.3s，渐快，无延迟
                rightball3.style.webkitTransition = "all 0.3s linear";
              }
              leftball1.style.webkitTransform = "rotate(-135deg)";
              leftball1.style.transform = "rotate(-135deg)";
              rightball1.style.webkitTransform = "rotate(-135deg)";
              rightball1.style.transform = "rotate(-135deg)";
              leftball2.style.webkitTransform = "rotate(-135deg)";
              leftball2.style.transform = "rotate(-135deg)";
              rightball2.style.webkitTransform = "rotate(-135deg)";
              rightball2.style.transform = "rotate(-135deg)";
              leftball3.style.webkitTransform = "rotate(-135deg)";
              leftball3.style.transform = "rotate(-135deg)";
              rightball3.style.webkitTransform = "rotate(-135deg)";
              rightball3.style.transform = "rotate(-135deg)";
              $timeout(function () {//定时器中决定两个圆的终止角度
                var angle1 = 0;
                var angle2 = 0;
                var angle3 = 0;
                if (calculation1 <= 0.5) {
                  angle1 = 360 * calculation1;
                  angle1 = angle1 - 135;
                  //console.log("角度："+angle);
                  leftball1.style.webkitTransform = "rotate(-135deg)";
                  leftball1.style.transform = "rotate(-135deg)";
                  rightball1.style.webkitTransform = "rotate(" + angle1 + "deg)";
                  rightball1.style.transform = "rotate(" + angle1 + "deg)";
                } else if (calculation1 > 0.5) {
                  calculation1 = calculation1 - 0.5;
                  angle1 = 360 * calculation1;
                  angle1 = angle1 - 135;
                  //console.log("角度："+angle);
                  leftball1.style.webkitTransform = "rotate(" + angle1 + "deg)";
                  leftball1.style.transform = "rotate(" + angle1 + "deg)";
                  rightball1.style.webkitTransform = "rotate(45deg)";
                  rightball1.style.transform = "rotate(45deg)";
                }
                if (calculation2 <= 0.5) {
                  angle2 = 360 * calculation2;
                  angle2 = angle2 - 135;
                  //console.log("角度："+angle);
                  leftball2.style.webkitTransform = "rotate(-135deg)";
                  leftball2.style.transform = "rotate(-135deg)";
                  rightball2.style.webkitTransform = "rotate(" + angle2 + "deg)";
                  rightball2.style.transform = "rotate(" + angle2 + "deg)";
                } else if (calculation2 > 0.5) {
                  calculation2 = calculation2 - 0.5;
                  angle2 = 360 * calculation2;
                  angle2 = angle2 - 135;
                  //console.log("角度："+angle);
                  leftball2.style.webkitTransform = "rotate(" + angle2 + "deg)";
                  leftball2.style.transform = "rotate(" + angle2 + "deg)";
                  rightball2.style.webkitTransform = "rotate(45deg)";
                  rightball2.style.transform = "rotate(45deg)";
                }
                if (calculation3 <= 0.5) {
                  angle3 = 360 * calculation3;
                  angle3 = angle3 - 135;
                  //console.log("角度："+angle);
                  leftball3.style.webkitTransform = "rotate(-135deg)";
                  leftball3.style.transform = "rotate(-135deg)";
                  rightball3.style.webkitTransform = "rotate(" + angle3 + "deg)";
                  rightball3.style.transform = "rotate(" + angle3 + "deg)";
                } else if (calculation3 > 0.5) {
                  calculation3 = calculation3 - 0.5;
                  angle3 = 360 * calculation3;
                  angle3 = angle3 - 135;
                  //console.log("角度："+angle);
                  leftball3.style.webkitTransform = "rotate(" + angle3 + "deg)";
                  leftball3.style.transform = "rotate(" + angle3 + "deg)";
                  rightball3.style.webkitTransform = "rotate(45deg)";
                  rightball3.style.transform = "rotate(45deg)";
                }
              }, 500);
            }
          });
          //},2500);
        }
      }
    }
  }])

  .directive('calculatePortrait', function () {
    return {
      restrict: 'A',
      link: function ($scope, $scroller, $attr) {
        var params = $attr.calculatePortrait;
        var domsId = params.split(',');
        var bigPortraitVariable = 0;//大头像的偏移量
        var myBigPortrait = document.getElementById(domsId[0]);
        var myLittlePortrait = document.getElementById(domsId[1]);
        var clientWidth = window.screen.width;
        var calculationBig = 90 * clientWidth / 375;
        var calculationLittle = 64 * clientWidth / 375;
        if (clientWidth > 300 && clientWidth <= 345) {
          bigPortraitVariable = 4;
        } else if (clientWidth > 345 && clientWidth <= 395) {
          bigPortraitVariable = -3;
        } else if (clientWidth > 395 && clientWidth <= 445) {
          bigPortraitVariable = -10;
        } else if (clientWidth > 445) {
          bigPortraitVariable = -17;
        }
        myBigPortrait.style.width = calculationBig + "px";
        myBigPortrait.style.height = calculationBig + "px";
        myLittlePortrait.style.width = calculationLittle + "px";
        myLittlePortrait.style.height = calculationLittle + "px";
        myLittlePortrait.style.top = -calculationLittle / 2 + "px";
        myBigPortrait.style.top = bigPortraitVariable * clientWidth / 375 - calculationBig / 2 + "px";
      }
    }
  });
/**
 * @description:loading tag
 *
 */
HmsModule.directive('hmsLoading', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'E',
    template: '<div class="hms-hide-small-content">' +
    '<div class="loading-hand"></div>' +
    '</div>',
    replace: true, //使用模板替换原始标记
    transclude: false,    // 不复制原始HTML内容
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs, controller) {
    }
  };
}]);

/**
 * @description:nodata tag
 *
 */
HmsModule.directive('hmsNoData', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'E',
    template: '<div class="hms-hide-small-content">' +
    '<div class="nodata-img-hand"></div>' +
    '<div class="nodata-text">没有相关数据！</div>' +
    '</div>',
    replace: true, //使用模板替换原始标记
    transclude: false,    // 不复制原始HTML内容
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs, controller) {
    }
  };
}]);
HmsModule.directive('helloWorld',function () {
  return {
    restrict: 'AE',
    replace: true,
    link: function($scope,elem,attr){
      console.log('elem = '+angular.toJson(elem));
      console.log('.slider-nav ul'+angular.toJson($('.slider-nav ul', slider)));
      var defaults = { items: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"], debug: false, height: null, arrows: true};
      var opts = $.extend(defaults);
      var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      var slider = $('#slider');
      console.log('slider1 = '+angular.toJson(slider));
      $(slider).addClass('slider');
      $('.slider-content li:first', slider).addClass('selected');
      $(slider).append('<div class="slider-nav"><ul></ul></div>');
      for(var i in o.items) {
        $('.slider-nav ul', slider).append("<li><a  alt='#"+o.items[i]+"'>"+o.items[i]+"</a></li>");
      }

      var height = $('.slider-nav', slider).height();
      console.log('height = '+height);
      if(o.height) height = o.height;
      $('.slider-content, .slider-nav', slider).css('height',height);
      if(o.debug) $(slider).append('<div id="debug">Scroll Offset: <span>0</span></div>');

      $('.slider-nav a', slider).on('mouseover',function(){
        console.log('监听到了mouseover事件');
        console.log('elem = '+angular.toJson(elem));
        console.log('$(this) = '+angular.toJson($(this)));
        var target = $(this).attr('alt');
        console.log('target = '+target);
        console.log('.slider-content = '+angular.toJson($('.slider-content')));
        console.log('.slider-content.offset() = '+angular.toJson($('.slider-content', slider).offset()));
        var cOffset = $('.slider-content', slider).offset().top;
        var tOffset = $('.slider-content '+target, slider).offset().top;
        var height = $('.slider-nav', slider).height(); if(o.height) height = o.height;
        var pScroll = (tOffset - cOffset) - height/8;
        $('.slider-content li', slider).removeClass('selected');
        $(target).addClass('selected');
        $('.slider-content', slider).stop().animate({scrollTop: '+=' + pScroll + 'px'});
        if(o.debug) $('#debug span', slider).html(tOffset);
      });
      if(o.arrows){
        $('.slider-nav',slider).css('top','20px');
        $(slider).prepend('<div class="slide-up end"><span class="arrow up"></span></div>');
        $(slider).append('<div class="slide-down"><span class="arrow down"></span></div>');
        $('.slide-down',slider).click(function(){
          $('.slider-content',slider).animate({scrollTop : "+="+height+"px"}, 500);
        });
        $('.slide-up',slider).click(function(){
          $('.slider-content',slider).animate({scrollTop : "-="+height+"px"}, 500);
        });
      }
    }
  }

});

/**
 * Created by wolf on 2016/5/23.
 */
"use strict";

/**
 * @1:暴露三个method--
 * a:selectAllItem();b:passThrough();refuse();
 */
HmsModule.directive("footerSelect", function () {
  return {
    restrict: "E",        // 指令是一个元素(并非属性)
    scope: {              // 设置指令对于的scope
      selectAllItem: "&", // 全选操作--应用表达式
      passThrough: "&",   // 通过操作--应用表达式
      refuse: "&"         // 拒绝操作--应用表达式
    },
    template: '<ion-footer-bar class="foot-bar">' +
    '<div class="row buttons">' +
    '<button class="button button-clear ts-button-left" ng-click="selectAllItem()">全选</button>' +
    '<button class="button button-clear ts-button-center" ng-click="refuse()">拒绝</button>' +
    '<button class="button button-clear ts-button-right" ng-click="passThrough()">通过</button>' +
    '</div>' +
    '</ion-footer-bar>',
    replace: true, //使用模板替换原始标记
    transclude: false,    // 不复制原始HTML内容
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs, controller) {
    }
  }
});

/**
 * 自定义head头
 */
HmsModule.directive("customHeadBar", function () {
  return {
    restrict: "E",        // 指令是一个元素(并非属性)
    scope: {              // 设置指令对于的scope
      actionName: "@",    // actionName 值传递(字符串，单向绑定)
      //test:"=",         // 引用传递--双向绑定
      customTitle: "@",   //
      goBackPage: "&", // 返回
      doAction: "&"   //
    },
    template: '<div class="custom-head custom-head-background">' +
    '<div class="row custom-first-head">' +
    '<button class="button button-clear back-button" ng-click="goBackPage()">' +
    '<i class="ion-ios-arrow-back"></i>' +
    '<span class="back-text">返回</span>' +
    '</button>' +
    '<button class="button button-clear action-button" ng-click="doAction()" ng-bind="actionName">' +
    '</button>' +
    '</div>' +
    '<div class="ts-list-title" ng-bind="customTitle"></div>' +
    '<div class="custom-second-head" ng-transclude>' +
    '</div>' +
    '</div>',
    replace: true, //使用模板替换原始标记
    transclude: true,    // 不复制原始HTML内容
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs, controller) {
    }
  }
});

/**
 * Created by utopia_song on 16/9/8.
 */

HmsModule.directive('hmsWorkflowDetail1', function () {
  return {
    restrict: 'EA',
    replace: false,
    scope: {
      iconLeft: '=detailIcon1',
      itemLeft: '=detailLeft',
      itemLeftValue: '=detailLeftValue',
      iconRight: '=detailIcon2',
      itemRight: '=detailRight',
      itemRightValue: '=detailRightValue'
    },
    template:'<ion-item class="employee-icon-item item">'+
    '<div class="row employee-icon-row">'+
    '<div class="col col-50 border-right">'+
    '<div class="row ">'+
    '<div class="col col-25" style="margin-top: -10px">'+
    '<div class="icon-shelter">'+
    '<img ng-src="{{iconLeft}}" class="info-icon">'+
    '</div>'+
    '</div>'+
    '<div class="col col-75 right-item">'+
    '<div class="row no-padding">{{itemLeft}}</div>'+
    '<div class="row content-detail right-bottom-item no-padding">{{itemLeftValue}}</div>'+
    '</div></div></div>'+
    '<div class="col col-50">'+
    '<div class="row ">'+
    '<div class="col col-25" style="margin-top: -10px">'+
    '<div class="icon-shelter">'+
    '<img ng-src="{{iconRight}}" class="info-icon" >'+
    '</div>'+
    '</div>'+
    '<div class="col col-75 right-item">'+
    '<div class="row no-padding">{{itemRight}}</div>'+
    '<div class="row content-detail right-bottom-item no-padding">{{itemRightValue}}</div>'+
    '</div></div></div>'+
    '</div>',
    controller: ["$scope", function ($scope) {

    }],
    link: function (scope, element, attrs) {

    }
  }
})
  .directive('hmsWorkflowDetail2',function () {
    return{
      restrict: 'EA',
      replace: false,
      scope: {
        iconLeft: '=detailIcon1',
        itemLeft: '=detailLeft',
        itemLeftValue: '=detailLeftValue',
        iconRight: '=detailIcon2',
        itemRight: '=detailRight',
        itemRightValue: '=detailRightValue'
      },
      template:'<ion-item class="employee-icon-item item">'+
      '<div class="row employee-icon-row">'+
      '<div class="col col-50 border-right">'+
      '<div class="row ">'+
      '<div class="col col-25" style="margin-top: -10px">'+
      '<div class="icon-shelter">'+
      '<img ng-src="{{iconLeft}}" class="info-icon">'+
      '</div>'+
      '</div>'+
      '<div class="col col-75 right-item">'+
      '<div class="row no-padding">{{itemLeft}}</div>'+
      '<div class="row content-detail right-bottom-item no-padding">{{itemLeftValue}}</div>'+
      '</div></div></div>'+
      '<div class="col col-50">'+
      '<div class="row ">'+
      '<div class="col col-25" style="margin-top: -10px">'+
      '<div class="icon-shelter">'+
      '<img ng-src="{{iconRight}}" class="info-icon" >'+
      '</div>'+
      '</div>'+
      '<div class="col col-75 right-item">'+
      '<div class="row no-padding">{{itemRight}}</div>'+
      '<div class="row content-detail right-bottom-item no-padding">{{itemRightValue}}</div>'+
      '</div></div></div>'+
      '</div>',
      controller: ["$scope", function ($scope) {
      }],
      link: function (scope, element, attrs) {

      }

    }
  })
  .directive('hmsWorkflowDetail3',function () {
  return{
    restrict: 'EA',
    replace: false,
    scope: {
      iconLeft: '=detailIcon1',
      itemLeft: '=detailLeft',
      itemLeftValue: '=detailLeftValue',
      iconRight: '=detailIcon2',
      itemRight: '=detailRight',
      itemRightValue: '=detailRightValue'
    },
    template:'<ion-item class="employee-icon-item item">'+
    '<div class="row employee-icon-row">'+
    '<div class="col col-50 border-right">'+
    '<div class="row ">'+
    '<div class="col col-25" style="margin-top: -10px">'+
    '<div class="icon-shelter">'+
    '<img ng-src="{{iconLeft}}" class="info-icon">'+
    '</div>'+
    '</div>'+
    '<div class="col col-75 right-item">'+
    '<div class="row no-padding">{{itemLeft}}</div>'+
    '<div class="row content-detail right-bottom-item no-padding">{{itemLeftValue}}</div>'+
    '</div></div></div>'+
    '<div class="col col-50">'+
    '<div class="row ">'+
    '<div class="col col-25" style="margin-top: -10px">'+
    '<div class="icon-shelter">'+
    '<img ng-src="{{iconRight}}" class="info-icon">'+
    '</div>'+
    '</div>'+
    '<div class="col col-75 right-item">'+
    '<div class="row no-padding">{{itemRight}}</div>'+
    '<div class="row content-detail right-bottom-item no-padding">{{itemRightValue}}</div>'+
    '</div></div></div>'+
    '</div>',
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs) {

    }

  }
})
  .directive('hmsWorkflowDetail4',function () {
    return{
      restrict: 'EA',
      replace: false,
      scope: {
        iconLeft: '=detailIcon1',
        itemLeft: '=detailLeft',
        itemLeftValue: '=detailLeftValue',
        iconRight: '=detailIcon2',
        itemRight: '=detailRight',
        itemRightValue: '=detailRightValue'
      },
      template:'<ion-item class="employee-icon-item item">'+
      '<div class="row employee-icon-row">'+
      '<div class="col col-50 border-right">'+
      '<div class="row ">'+
      '<div class="col col-25" style="margin-top: -10px">'+
      '<div class="icon-shelter">'+
      '<img ng-src="{{iconLeft}}" class="info-icon">'+
      '</div>'+
      '</div>'+
      '<div class="col col-75 right-item">'+
      '<div class="row no-padding">{{itemLeft}}</div>'+
      '<div class="row content-detail right-bottom-item no-padding">{{itemLeftValue}}</div>'+
      '</div></div></div>'+
      '<div class="col col-50">'+
      '<div class="row ">'+
      '<div class="col col-25" style="margin-top: -10px">'+
      '<div class="icon-shelter">'+
      '<img ng-src="{{iconRight}}" class="info-icon">'+
      '</div>'+
      '</div>'+
      '<div class="col col-75 right-item">'+
      '<div class="row no-padding">{{itemRight}}</div>'+
      '<div class="row content-detail right-bottom-item no-padding">{{itemRightValue}}</div>'+
      '</div></div></div>'+
      '</div>',
      controller: ["$scope", function ($scope) {
      }],
      link: function (scope, element, attrs) {

      }

    }
  })
  .directive('hmsWorkflowDetail5',function () {
    return{
      restrict: 'EA',
      replace: false,
      scope: {
        iconLeft: '=detailIcon1',
        itemLeft: '=detailLeft',
        itemLeftValue: '=detailLeftValue',
      },
      template:'<ion-item class="employee-icon-item item">'+
      '<div class="row employee-icon-row">'+
      '<div class="col col-50 border-right">'+
      '<div class="row ">'+
      '<div class="col col-25" style="margin-top: -10px">'+
      '<div class="icon-shelter">'+
      '<img ng-src="{{iconLeft}}" class="info-icon">'+
      '</div>'+
      '</div>'+
      '<div class="col col-75 right-item">'+
      '<div class="row no-padding">{{itemLeft}}</div>'+
      '<div class="row content-detail right-bottom-item no-padding">{{itemLeftValue}}</div>'+
      '</div></div></div>'+
      '<div class="col col-50">'+

      '</div></div>'+
      '</div>',
      controller: ["$scope", function ($scope) {
      }],
      link: function (scope, element, attrs) {

      }

    }
  })
  .directive('compile', function($compile) {
  // directive factory creates a link function
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        // watch the 'compile' expression for changes
        return scope.$eval(attrs.compile);
      },
      function(value) {
        // when the 'compile' expression changes
        // assign it into the current DOM
        element.html(value);
        // compile the new DOM and link it to the current
        // scope.
        // NOTE: we only compile .childNodes so that
        // we don't get into infinite loop compiling ourselves
        $compile(element.contents())(scope);
      }
    );
  };
});

/**
 * Created by gusenlin on 2016/6/12.
 */
"use strict";
HmsModule.directive('hmsWorkflowList', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      title: '=workflowTitle',
      icon: '=workflowIcon',
      typeValue: '=workflowTypeValue',
      node: '=workflowNode',
      nodeValue: '=workflowNodeValue',
      submit: '=workflowSubmit',
      submitPerson: '=workflowSubmitPerson'
    },

    template: '<a class="workflow-list-item">' +
    '<div class="workflow-list-logo">' +
    '<img ng-src="{{icon}}"/>' +
    '</div>' +
    '<div class="workflow-list-header">{{title}}</div>' +
    '<div class="workflow-list-content">' +
    '<div class="row no-padding" style="padding-left: 20px">' +
    '<div class="col col-90 no-padding">' +
    '<div class="row no-padding" style="margin-top: 10px"> ' +
    '<div class="col no-padding color-content">{{typeValue}}</div>' +
      //'<div class="col col-67 no-padding color-content">{{typeValue}}</div>' +
    '</div>' +
    '<div class="row no-padding" style="margin-top: 5px">' +
    '<div class="col no-padding color-content">{{submit}}：{{submitPerson}}</div>' +
      //'<div class="col col-67 no-padding color-content">{{submitPerson}}</div>' +
    '</div>' +
    '<div class="row no-padding" style="margin-top: 5px">' +
    '<div class="col no-padding color-content">{{node}}：{{nodeValue}}</div>' +
      //'<div class="col col-67 no-padding color-content">{{nodeValue}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="col col-10 no-padding col-center workflow-list-select">' +
    '<img ng-src="build/img/contact/arrow.png"/>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>',
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs) {

    }
  }
});

HmsModule.directive('hmsApprovalHistory', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      time: '=approvalTime',
      person: '=approver',
      position: '=approverPosition',
      status: '=approvalStatus',
      remark: '=approvalRemark',
      annex: '=approvalAnnex',
      index: '=index',
      extent: '=length'
    },

    template: '<div class="row testRow" style="height: 100%;">' +
    '<div class="col" style="padding-left: 40px;">' +
    '<div class="red-line" ng-if="index == 0"></div>' +
    '<div class="white-line" ng-if="index != 0"></div>' +
    '<div class="row message-item-time" ng-if="time">' +
    '<div class=" message-date">{{time}}</div>' +
    '</div>' +
    '<div class="row message-item">' +
    '<div class="col col-70 message-div" style="align-self: center; padding: 0">' +
    '<div class="message-content"> {{person}}&nbsp;&nbsp;({{position}})</div>' +
    '</div>' +
    '<div class="col col-30 message-div">' +
    '<div class="align-center" ng-if="code == 0" style="color: #4FAAFF">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 1" style="color: #FF8923">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 2" style="color: #EB7876">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 3" style="color: #E70B18">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 4" style="color: #76D9AB">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 5" style="color: #A5C261">{{status}}</div>' +
    '<div class="align-center" ng-if="code == 6" style="color: #9B9B9B">{{status}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="row message-item">' +
    '<div class="message-div">' +
    '<div class="approve-remark">{{remark}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="row message-item" style="margin-top: 8px" ng-if="annex">' +
    '<div class="message-div" style="color: #2389FD">附件：</div>' +
    '<div ng-repeat="img in annex">' +
    '<img style="width: 56px; height: 56px; margin-top: 5px; margin-left: 10px" ng-src="{{img.url}}"/>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>',
    controller: ["$scope", function ($scope) {
    }],
    link: function ($scope, element, attrs) {
      if($scope.status == "待审批") {
        $scope.code = 0;
      } else if($scope.status == "提交") {
        $scope.code = 1;
      } else if($scope.status == "保存") {
        $scope.code = 2;
      } else if($scope.status == "拒绝") {
        $scope.code = 3;
      } else if($scope.status == "同意") {
        $scope.code = 4;
      } else if($scope.status == "退回") {
        $scope.code = 5;
      } else if($scope.status == "撤回") {
        $scope.code = 6;
      }
    }
  }
});


/**
 * Created by gusenlin on 16/5/22.
 */

/**
 * @ngdoc directive
 * @name hmsslidecalendar
 * @module ionic
 * @codepen AjgEB
 * @deprecated will be removed in the next Ionic release in favor of the new ion-slides component.
 * Don't depend on the internal behavior of this widget.
 * @delegate ionic.service:$ionicSlideBoxDelegate
 * @restrict E
 * @description
 * The Slide Box is a multi-page container where each page can be swiped or dragged between:
 *
 *
 * @usage
 * ```html
 * <ion-slide-box on-slide-changed="slideHasChanged($index)">
 * </ion-slide-box>
 * ```
 *
 * @param {string=} delegate-handle The handle used to identify this slideBox
 * with {@link ionic.service:$ionicSlideBoxDelegate}.
 * @param {boolean=} does-continue Whether the slide box should loop.
 * @param {boolean=} auto-play Whether the slide box should automatically slide. Default true if does-continue is true.
 * @param {number=} slide-interval How many milliseconds to wait to change slides (if does-continue is true). Defaults to 4000.
 * @param {boolean=} show-pager Whether a pager should be shown for this slide box. Accepts expressions via `show-pager="{{shouldShow()}}"`. Defaults to true.
 * @param {expression=} pager-click Expression to call when a pager is clicked (if show-pager is true). Is passed the 'index' variable.
 * @param {expression=} on-slide-changed Expression called whenever the slide is changed.  Is passed an '$index' variable.
 * @param {expression=} active-slide Model to bind the current slide index to.
 */
angular.module('HmsModule')
  .directive('hmsslidecalendar', [
    '$animate',
    '$timeout',
    '$compile',
    '$ionicHistory',
    '$ionicScrollDelegate',
    function($animate, $timeout, $compile, $ionicHistory, $ionicScrollDelegate) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          autoPlay: '=',
          doesContinue: '@',
          slideInterval: '@',
          showPager: '@',
          pagerClick: '&',
          disableScroll: '@',
          onSlideChanged: '&',
          activeSlide: '=?',
          bounce: '@'
        },
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

          console.log("$element[0] " + angular.toJson($element[0]));

          var _this = this;

          function isDefined(value) {return typeof value !== 'undefined';}

          var continuous = $scope.$eval($scope.doesContinue) === true;
          var bouncing = ($scope.$eval($scope.bounce) !== false); //Default to true
          var shouldAutoPlay = isDefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
          var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;

          console.log("continuous " + continuous);
          console.log("bouncing " + bouncing);
          console.log("shouldAutoPlay " + shouldAutoPlay);
          console.log("slideInterval " + slideInterval);

          var slider = new ionic.views.calendar({
            el: $element[0],
            auto: slideInterval,
            continuous: continuous,
            startSlide: $scope.activeSlide,
            bouncing: bouncing,
            slidesChanged: function() {
              $scope.currentSlide = slider.currentIndex();

              // Try to trigger a digest
              $timeout(function() {});
            },
            callback: function(slideIndex) {
              $scope.currentSlide = slideIndex;
              $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide});
              $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
              $scope.activeSlide = slideIndex;
              // Try to trigger a digest
              $timeout(function() {});
            },
            onDrag: function() {
              console.log("slider.onDrag ");
              freezeAllScrolls(true);
            },
            onDragEnd: function() {
              console.log("slider.onDragEnd ");
              freezeAllScrolls(false);
            }
          });

          /*function freezeAllScrolls(shouldFreeze) {
            if (shouldFreeze && !_this.isScrollFreeze) {
              $ionicScrollDelegate.freezeAllScrolls(shouldFreeze);

            } else if (!shouldFreeze && _this.isScrollFreeze) {
              $ionicScrollDelegate.freezeAllScrolls(false);
            }
            _this.isScrollFreeze = shouldFreeze;
          }*/

          //slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);

          $scope.$watch('activeSlide', function(nv) {
            console.log("slider.scope.activeSlide ");
            if (isDefined(nv)) {
              slider.slide(nv);
            }
          });

          $scope.$on('slideBox.nextSlide', function() {
            console.log("slider.slideBox.nextSlide ");
            slider.next();
          });

          $scope.$on('slideBox.prevSlide', function() {
            console.log("slider.slideBox.prevSlide ");
            slider.prev();
          });

          $scope.$on('slideBox.setSlide', function(e, index) {
            console.log("slider.slideBox.setSlide ");
            slider.slide(index);
          });

          //Exposed for testing
          this.__slider = slider;

          /*var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(
            slider, $attrs.delegateHandle, function() {
              return $ionicHistory.isActiveScope($scope);
            }
          );*/

          $scope.$on('$destroy', function() {
            console.log("$destroy ");
            //deregisterInstance();
            //slider.kill();
          });

          /*this.slidesCount = function() {
            return slider.slidesCount();
          };

          this.onPagerClick = function(index) {
            $scope.pagerClick({index: index});
          };*/

          $timeout(function() {
            //slider.load();
          });
        }],
        template: '<div class="slider">' +
        '<div class="slider-slides" ng-transclude>' +
        '</div>' +
        '</div>',

        link: function($scope, $element, $attr) {
          // Disable ngAnimate for slidebox and its children
          $animate.enabled($element, false);

          function isDefined(value) {return typeof value !== 'undefined';}

          // if showPager is undefined, show the pager
          /*if (!isDefined($attr.showPager)) {
            $scope.showPager = true;
            getPager().toggleClass('hide', !true);
          }

          $attr.$observe('showPager', function(show) {
            if (show === undefined) return;
            show = $scope.$eval(show);
            getPager().toggleClass('hide', !show);
          });

          var pager;
          function getPager() {
            if (!pager) {
              var childScope = $scope.$new();
              pager = jqLite('<ion-pager></ion-pager>');
              $element.append(pager);
              pager = $compile(pager)(childScope);
            }
            return pager;
          }*/
        }
      };
    }]);

  /*.directive('ionSlide', function() {
    return {
      restrict: 'E',
      require: '?^ionSlideBox',
      compile: function(element) {
        element.addClass('slider-slide');
      }
    };
  })*/

/**
 * Created by wolf on 2016/6/12.
 * @author:wen.dai@hand-china.com
 */

'use strict';

/**
 * 打印--console--level
 */
var log = console.log.bind(console);
var warn = console.warn.bind(console);
var error = console.error.bind(console);

//格式化json
function jsonFormat(newParam) {
  var Json = angular.toJson(newParam, true);
  return Json;
};

//获取当前的年月日 日期
function getCurrentDate(now) {
  //eg:获取当前日期 xxxxxxxx(format)
  var seperator = "-";
  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var day = now.getDate();            //日
  month = (month < 10 ? "0" + month : month);
  day = (day < 10 ? "0" + day : day);
  var myCurrentDate = year.toString() + seperator + month.toString() + seperator + day.toString();
  return myCurrentDate;
};

//获取上个月的月末
function getLastMonthDate(now) {
  //eg:获取当前日期 xxxxxxxx(format)

  var year = now.getFullYear();       //年
  var month = now.getMonth();     //月
  var newDate = new Date(year, month, 1);
  var day = new Date(newDate.getTime() - 1000 * 60 * 60 * 24).getDate(); //日
  month = (month < 10 ? "0" + month : month);
  day = (day < 10 ? "0" + day : day);
  var myLastMonthDate = year.toString() + month.toString() + day.toString();
  return myLastMonthDate;
};

//获取当前月的月末
function getCurrentMonthLastDate(now) {
  //eg:获取当前日期 xxxxxxxx(format)
  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var newDate = new Date(year, month, 1);
  var day = new Date(newDate.getTime() - 1000 * 60 * 60 * 24).getDate(); //日
  month = (month < 10 ? "0" + month : month);
  day = (day < 10 ? "0" + day : day);
  var myCurrentMonthLastDate = (year.toString() + month.toString() + day.toString());
  return myCurrentMonthLastDate;
};

//获取月和日
function getMonthDay(newDate) {
  var newMonthDay = newDate.substring(4, 6) + "月" + newDate.substring(6, 8) + "日";
  return newMonthDay;
};

/**
 ​ *  下面是去重的3个写法
 ​ *  @1：最常规
 ​ *  @2：思路好，但是性能差点
 ​ *  @3：更好的  --推荐
 *  @4：更复杂，适应性更广的
 ​ */

//@1:
function unique_normal(arr) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (ret.indexOf(item) === -1) {
      ret.push(item);
    }
  }
  return ret;
};

//@2:
var indexOf = [].indexOf ?
  function (arr, item) {
    return arr.indexOf(item);
  } :
  function indexOf(arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  };

function unique(arr) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (indexOf(ret, item) === -1) {
      ret.push(item);
    }
  }
  return ret;
};

//@3: 支持数组子条目为对象的去重
function unique_better(arr, newitem) {
  var ret = [];
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    if (typeof(arr[i]) == 'object') {
      var item = arr[i][newitem];
    } else {
      var item = arr[i];
    }
    var item1 = arr[i]
    var key = typeof(item) + item;
    if (hash[key] !== 1) {
      ret.push(item1);
      hash[key] = 1;
    }
  }
  return ret;
};

// //@4: 更高级和复杂的去重法
// Array.prototype.arrUniq = function () {
//   var temp, arrVal,
//     array = this,
//     arrClone = array.concat(),//克隆数组
//     typeArr = {//数组原型
//       'obj': '[object Object]',
//       'fun': '[object Function]',
//       'arr': '[object Array]',
//       'num': '[object Number]'
//     },
//     ent = /(\u3000|\s|\t)*(\n)+(\u3000|\s|\t)*/gi;//空白字符正则
//
//   //把数组中的object和function转换为字符串形式
//   for (var i = arrClone.length; i--;) {
//     arrVal = arrClone[i];
//     temp = Object.prototype.toString.call(arrVal);
//
//     if (temp == typeArr['num'] && arrVal.toString() == 'NaN') {
//       arrClone[i] = arrVal.toString();
//     }
//
//     if (temp == typeArr['obj']) {
//       arrClone[i] = JSON.stringify(arrVal);
//     }
//
//     if (temp == typeArr['fun']) {
//       arrClone[i] = arrVal.toString().replace(ent, '');
//     }
//   }
//
//   //去重关键步骤
//   for (var i = arrClone.length; i--;) {
//     arrVal = arrClone[i];
//     temp = Object.prototype.toString.call(arrVal);
//
//     if (temp == typeArr['arr']) arrVal.arrUniq();//如果数组中有数组，则递归
//     if (arrClone.indexOf(arrVal) != arrClone.lastIndexOf(arrVal)) {//如果有重复的，则去重
//       array.splice(i, 1);
//       arrClone.splice(i, 1);
//     }
//     else {
//       if (Object.prototype.toString.call(array[i]) != temp) {
//         //检查现在数组和原始数组的值类型是否相同，如果不同则用原数组中的替换，原因是原数组经过了字符串变换
//         arrClone[i] = array[i];
//       }
//     }
//   }
//   return arrClone;
// };

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
var getFormatTime = function (date) {
  var dateTemp, minutes, hour, time, seconds;
  dateTemp = date.format("yyyy-MM-dd");
  //秒
  if (date.getSeconds().toString().length < 2) {
    seconds = "0" + date.getSeconds();
  } else {
    seconds = date.getSeconds();
  }
  ;
  //分钟
  if (date.getMinutes().toString().length < 2) {
    minutes = "0" + date.getMinutes();
  } else {
    minutes = date.getMinutes();
  }
  ;
  //小时
  if (date.getHours().toString().length < 2) {
    hour = "0" + date.getHours();
    time = hour + ":" + minutes + ":" + seconds;
  } else {
    hour = date.getHours();
    time = hour + ":" + minutes + ":" + seconds;
  }

  return dateTemp + " " + time;
};

/**
 * base64编码
 * @param {Object} str
 */
var base64encode = function (str) {
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};

/**
 * AES加密
 */
var Encrypt = function (word) {
  var key = CryptoJS.enc.Utf8.parse("ucarincadmin2016");

  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
};

/**
 * AES解密
 */
var Decrypt = function (word) {
  var key = CryptoJS.enc.Utf8.parse("ucarincadmin2016");
  var str = word.replace(/[\n]/g, "");

  var decrypt = CryptoJS.AES.decrypt(str, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();

};

/**
 * 拼接日期
 * @param date
 * @returns {string}
 */
var makeupDate = function (date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
};

//日期比较
var CompareDate = function (d1, d2) {
  //将所有的短横线替换为斜杠
  return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
};

function getLastMonthFirstDate() {//获取当前日期上个月的第一天
  var year = new Date().getFullYear();
  var month = new Date().getMonth();
  if(month==0)
  {
    month=12;
    year=year-1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
  return firstDay;
}
function getPhoneType(){
//正则,忽略大小写
  var pattern_phone = new RegExp("iphone","i");
  var pattern_android = new RegExp("Android","i");
  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroid = pattern_android.test(userAgent);
  var isIphone = pattern_phone.test(userAgent);
  var phoneType="phoneType";
  if(isAndroid){
    var zh_cnIndex = userAgent.indexOf("-");
    var spaceIndex = userAgent.indexOf("build",zh_cnIndex+4);
    var fullResult = userAgent.substring(zh_cnIndex,spaceIndex);
    phoneType=fullResult.split(";")[1];
  }else if(isIphone){
//6   w=375    6plus w=414   5s w=320     5 w=320
    var wigth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(wigth>400){
      phoneType = "iphone6p or iphone6sp";
    }else if(wigth>370){
      phoneType = "iphone6 or iphone6s";
    }else if(wigth>315){
      phoneType = "iphone5 or iphone5s";
    }else{
      phoneType = "iphone 4s";
    }

  }else{
    phoneType = "您的设备太先进了";
  }

  return phoneType;
}

/**
 * @ngdoc interceptor
 * @name httpRequestHeader
 * @module utilModule
 * @description
 * This is the http interceptor
 * @author
 * gusenlin
 */
angular.module('utilModule').factory('httpRequestHeader', function () {
  var interceptor = {
    'request': function (config) {
      if (window.localStorage.token && window.localStorage.empno) {
        var timestamp = new Date().getTime();
        var token = CryptoJS.MD5(window.localStorage.token + timestamp);
        config.headers.timestamp = timestamp;
        config.headers.token     = token;
        config.headers.userKey = window.localStorage.empno;
        config.timeout = 30000;
      }
      return config;
    }
  };

  return interceptor;
});

/**
 * Created by wolf on 2016/6/13. (_wen.dai_)
 */
"use strict";
//根据日期获取星期
HmsModule.filter('weekDay', function () {
  return function (data) {
    if (data == "") {
      return data;
    } else {
      var d = new Date(data);
      var day = d.getDay();
      switch (day) {
        case  0:
          data = data + "　" + "星期天";
          break;
        case  1:
          data = data + "　" + "星期一";
          break;
        case  2:
          data = data + "　" + "星期二";
          break;
        case  3:
          data = data + "　" + "星期三";
          break;
        case  4:
          data = data + "　" + "星期四";
          break;
        case  5:
          data = data + "　" + "星期五";
          break;
        case  6:
          data = data + "　" + "星期六";
          break;
      }
      return data;
    }
  }
});

//图片过滤器
HmsModule.filter('filterImg', function () {
  return function (data, gender) {
    // if (data && data != '') {
    //   return data;
    // } else {
      if (gender == "1") {//根据性别判定头像男女
        data = "build/img/myInfo/man-portrait.png";
      } else if (gender == "2") {
        data = "build/img/myInfo/woman-portrait.png";
      }
      return data;
    // }
  }
});

//department截取
HmsModule.filter('filterTextDepartment', function () {
  return function (data) {
    if (data) {
      if (data.length > 20) {
        var resultData = data.split('.');
        data = resultData[resultData.length - 1];
      }
      return data;
    } else {
      return data;
    }
  }
});

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

/**
 * Created by wolf on 2016/7/6. (-wen.dai-)
 * @description: use RONGCLOUD 云服务
 *  1：initImData 初始化登录获取登录融云的token
 *  2：getImChatList app初始化获取会话列表的消息
 *  3：toNativeChatPage 点击联系人发起聊天--go native page
 * @access_token: 访问令牌，用于api调用时作为参数
 * @token: 用于访问融云的token
 */

'use strict';
angular.module('HmsModule')
  .factory('imService', [
    'hmsHttp',
    'hmsPopup',
    'baseConfig',
    function (hmsHttp,
              hmsPopup,
              baseConfig) {
      //为application/x-www-form-urlencoded格式的请求--post方式
      var baseUrl = baseConfig.imPath;

      function init2Cloud(getImTokenUrl) {
        var getImTokenParams = {
          appCode: 'RONGCLOUD',
          empNo: window.localStorage.empno
        };
        if (baseConfig.debug) {
          alert('init2Cloud.getImTokenParams ' + angular.toJson(getImTokenParams));
        }
        hmsHttp.post(getImTokenUrl, getImTokenParams).success(function (result) {
          if (baseConfig.debug) {
            alert('init2Cloud.success ' + angular.toJson(result));
          }
          try {
            var imParams = {
              token: result.rows[0].token,
              userId: window.localStorage.empno
            };
            window.localStorage.access_token = result.rows[0].token;
          } catch (e) {
            imParams = {token: '', userId: ''};
          }
          getImChatList();
        }).error(function () {
          //hmsPopup.showShortCenterToast('error 2');
        });
      };

      var getImChatList = function () {
        var newImParams = {
          "userId": window.localStorage.empno,
          "access_token": window.localStorage.token,
          "RCToken": window.localStorage.access_token
        };
        if (baseConfig.debug) {
          alert('newImParams ' + angular.toJson(newImParams));
        }
        if (HandIMPlugin) {
          HandIMPlugin.getChatList(function success(msg) {
            //hmsPopup.showShortCenterToast(msg);
            if (baseConfig.debug) {
              console.log('HandIMPlugin.getChatList success!');
            }
            return msg;
          }, function error(error) {
            //hmsPopup.showShortCenterToast(error);
            if (baseConfig.debug) {
              console.log('HandIMPlugin.getChatList error!');
            }
          }, newImParams);
        }
      };

      return {
        initImData: function () {
          var getImTokenUrl = baseUrl + '/v2/api/thirdparty/getToken';
          init2Cloud(getImTokenUrl);
        },
        getImChatList: function () {
          return getImChatList;
        },
        toNativeChatPage: function (newEmpNum) { //传入工号
          if (HandIMPlugin) {
            HandIMPlugin.toChatAct(function success() {
            }, function error() {
            }, newEmpNum);
          }
        }
      }
    }]);

/**
 * Created by gusenlin on 16/5/21.
 */
angular.module('HmsModule')
  .service('hmsJpushService', [
    'baseConfig',
    function (baseConfig) {

      this.init = function (state) {
        if (baseConfig.debug) {
          alert('hmsJpushService.init!! ');
        }
        if (window.plugins.jPushPlugin) {
          var getRegistrationID = function () {
            window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
          };
          var onGetRegistrationID = function (data) {
            try {
              //alert("JPushPlugin:registrationID is " + angular.toJson(data));
              if (baseConfig.debug) {
                console.log("JPushPlugin:registrationID is " + angular.toJson(data));
              }
              if (data.length == 0) {
                var t1 = window.setTimeout(getRegistrationID, 1000);
              }
            } catch (exception) {
              if (baseConfig.debug) {
                console.log(exception);
              }
            }
          };
          var initiateUI = function () {
            try {
              window.plugins.jPushPlugin.init();
              getRegistrationID();
              if (device.platform != "Android") {
                window.plugins.jPushPlugin.setDebugModeFromIos();
                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
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
                return 'tab.tab-application-';
              } else if (currentState.views['tab-message']) {
                return 'tab.tab-message-';
              } else if (currentState.views['tab-contact']) {
                return 'tab.tab-contact-';
              } else if (currentState.views['tab-myInfo']) {
                return 'tab.tab-myInfo-';
              }
            }
            return '';
          };

          var onOpenNotification = function (event) {
            try {
              var alertContent;
              var result;
              var detail;

              //alert('event ' + angular.toJson(event));
              //alert('window.plugins.jPushPlugin ' + angular.toJson(window.plugins.jPushPlugin));
              //alert('detail ' + angular.toJson(detail));

              if (device.platform == "Android") {
                alertContent = window.plugins.jPushPlugin.openNotification.alert;
                result = {
                  "type": typeof(window.plugins.jPushPlugin),
                  "value": window.plugins.jPushPlugin
                };
                detail = {
                  "recordId": window.plugins.jPushPlugin.openNotification.extras.source_record_id,
                  "workflowId": window.plugins.jPushPlugin.openNotification.extras.source_workflow_id,
                  "instanceId": window.plugins.jPushPlugin.openNotification.extras.source_instance_id,
                  "nodeId": window.plugins.jPushPlugin.openNotification.extras.source_node_id
                };
              } else {
                alertContent = event.aps.alert;
                result = {
                  "type": typeof(event),
                  "value": event
                };
                detail = {
                  "recordId": event.source_record_id,
                  "workflowId": event.source_workflow_id,
                  "instanceId": event.source_instance_id,
                  "nodeId": event.source_node_id
                };
              }
              if (baseConfig.debug) {
                console.log("open Notification event: " + event);
              }

              /*workFLowListService.getDetailBase(success, error, detailId.recordId,
               detailId.workflowId, detailId.instanceId, detailId.nodeId);*/

              state.go(analyze(state.current) + 'pushDetail', {
                "detail": detail,
                "processedFlag": {value: true},
                "type": "PUSHDETAIL"
              });
              //state.go('detail', {content: result});
              //state.go('push.pushDetail',{content:alertContent});

            } catch (exception) {
              console.log("JPushPlugin:onOpenNotification" + exception);
            }
          };
          document.addEventListener("jpush.openNotification", onOpenNotification, false);
          initiateUI();
        }
      };

      this.bind = function (userName) {
        try {
          var alias = userName;
          var tags = [];
          tags.push(userName);
          window.plugins.jPushPlugin.setTagsWithAlias(tags, alias);
        } catch (exception) {
          if (baseConfig.debug) {
            console.log(exception);
          }
        }
      }
    }]);

/**
 * Created by gusenlin on 16/5/21.
 */
angular.module('HmsModule')
  .service('sqliteService', [
    'baseConfig',
    function (baseConfig) {

      this.buildExpenseSql = function (state) {

        var db = window.sqlitePlugin.openDatabase({
          name: baseConfig.dbName,
          createFromLocation: 1,
          location: baseConfig.dbLocation
        });
        
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS MOBILE_EXP_REPORT_LINE \
                    (line_id integer primary key AUTOINCREMENT,\
                    expenseObject_id INTEGER,\
                    expenseObject_code TEXT,\
                    expenseObject_desc TEXT,\
                    expenseObject_type TEXT,\
                    costObject_id TEXT,\
                    costObject_desc TEXT,\
                    expense_type_id INTEGER,  \
                    expense_type_desc TEXT,   \
                    expense_item_id INTEGER,\
                    expense_item_code TEXT,\
                    expense_item_desc TEXT,\
                    expense_apply_id TEXT,\
                    expense_apply_desc TEST,\
                    expense_price INTEGER,\
                    expense_quantity INTEGER,\
                    currency_code TEXT,\
                    currency_code_desc text,\
                    invoice_quantity INTEGER,\
                    exchange_rate INTEGER,\
                    total_amount INTEGER,\
                    expense_date_from TEXT,\
                    expense_date_to TEXT,\
                    expense_place Text ,\
                    description TEXT,\
                    local_status TEXT,\
                    service_id INTEGER,\
                    creation_date  TEXT ,\
                    created_by TEXT,\
                    timestamp TEXT,\
                    segment_1 INTEGER,\
                    segment_2 INTEGER,\
                    segment_3 INTEGER,\
                    segment_4 INTEGER,\
                    segment_5 INTEGER,\
                    segment_6 TEXT,\
                    segment_7 TEXT,\
                    segment_8 TEXT ,\
                    segment_9 TEXT,\
                    segment_10 TEXT )'
          );
          tx.executeSql('CREATE TABLE IF NOT EXISTS MOBILE_EXP_LINE_PHOTOS (' +
            'photo_id integer primary key, ' +
            'line_id integer, ' +
            'photo_name text,' +
            'photo_src text,' +
            'creation_date text,' +
            'created_by integer)'
          );
        });
      };
    }]);

/**
 * Created by daiwen on 16/7/25.
 * @description get view history stack
 */

'use strict';
angular.module('HmsModule')
  .factory('stackViewService', [
    'hmsHttp',
    'hmsPopup',
    'baseConfig',
    '$ionicHistory',
    function (hmsHttp,
              hmsPopup,
              baseConfig,
              $ionicHistory) {
      // get the right history stack based on the current view
      var _historyId = $ionicHistory.currentHistoryId();
      var _history = $ionicHistory.viewHistory().histories[_historyId].stack;
      var _color = '#F99D32';
      var _stackList = [];

      return {
        view2BackState: function (stateName) {
          warn("history.length : " + _history.length);
          for (var i = _history.length - 1; i >= 0; i--) {
            warn("stateName " + _history[i].stateName);

              $ionicHistory.backView(_history[i]);
              $ionicHistory.goBack();

          }
        },
        getCurrentStack: function (viewName) {
          if (baseConfig.debug) {
            warn($ionicHistory.currentHistoryId());
            warn(_history);
            warn($ionicHistory.viewHistory());
          }
          angular.forEach(_history, function (view, index) {
            warn('history stack:' + view.stateName);
            if (index === _history.length - 1) {
              _color = 'black';
            }
            var _stackItem = {
              viewId: view.viewId,
              stateName: view.stateName,
              url: view.url
            };
            _stackList.push(_stackItem);
          });
          return _stackList;
        }
      }
    }]);




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
      // $timeout(function () {
      //   checkVersionService.checkAppVersion();
      // }, 500);

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
        } else if (appName == '办公助手') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.apply-center-manage', {flag: "total-office"});
        } else if (appName == '我的申请') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.approval-center',{flag: "applyCenter"});
        } else if (appName == '我的审批') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.approval-center', {flag: "HomePage"});
        } else if (appName == '号外公告') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.company-notice');
        } else if (appName == '神州头条') {
          $ionicTabsDelegate.showBar(false);
          $state.go('tab.company-advisory-list');
        }

      };
      // document.getElementById('cancelButton').addEventListener('click', function () {
      //   console.log('111');
      //   $scope.payroll.password = "";
      // });
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
        $scope.mianAppList = JSON.parse(localStorage.getItem(mianApplicationList));
        $scope.serveApplist = JSON.parse(localStorage.getItem('serveApplicationList'));
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

angular.module('myApp').
  config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('tab.mainImgWebsite',
      {
        url:'/mainImgWebsite',
        views:{
          'tab-application':{
            templateUrl:'build/pages/application/main-img-website.html',
            controller:'mainImgWebsiteCtrl'
          }
        },
        params:{
          mainImgUrl:""
        }
      })
  }]);

angular.module('applicationModule').
    controller('mainImgWebsiteCtrl',[
    '$scope',
    '$stateParams',
    '$ionicHistory',
    '$sce',
    '$state',
    function ($scope,
              $stateParams,
              $ionicHistory,
              $sce,
              $state) {
      // $scope.mainImgUrl = $stateParams.mainImgUrl;
      // var arr = [];
      // arr.push({imgUrl:$sce.trustAsResourceUrl($scope.mainImgUrl)});
      // $scope.arrs = arr;
      // $scope.mainImgUrl =  $sce.trustAsResourceUrl($stateParams.mainImgUrl);
      var mainImgUrl;
      mainImgUrl = $stateParams.mainImgUrl;
      $scope.mainImgUrl = $sce.trustAsResourceUrl(mainImgUrl);
      console.log("$scope.mainImgUrl = "+$scope.mainImgUrl);
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
      $scope.closeWebSite = function(){
        $state.go('tab.application');
      }
    }
]);

/**
 *  modify by shellWolf on 16/06/28.
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function($stateProvider){
      $stateProvider
        .state('tab.contact',{
          url:'/contact',
          views:{
            'tab-application':{
              templateUrl:'build/pages/contact/contact.html',
              controller:'ContactCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('ContactCtrl', [
    '$scope',
    '$ionicScrollDelegate',
    '$ionicModal',
    'baseConfig',
    'hmsPopup',
    '$state',
    '$cordovaActionSheet',
    'contactService',
    'getInitStructureInfo',
    '$ionicHistory',
    '$timeout',
    'currentStackService',
    function ($scope,
              $ionicScrollDelegate,
              $ionicModal,
              baseConfig,
              hmsPopup,
              $state,
              $cordovaActionSheet,
              contactService,
              getInitStructureInfo,
              $ionicHistory,
              $timeout,
              currentStackService) {
      /**
       * var section
       */
      {
        $scope.customContactsInfo = [];
        $scope.showTopInput = false; // 默认不显示bar上的搜索框
        $scope.structureName = ''; //当前员工所属层级的名字
        $scope.currentStructure = {};
        var CONTACT_TAG = 'contact:\n';
        var position = ''; //记录滚动条的位置--
        var LINK_MAN = window.localStorage.empno+'common_linkman2';
      }

      function getCurrentDepartInfo(result) {
        try {
          if (Object.keys(result).length !== 0) { //枚举
            $scope.currentStructure = result;
            for (var i = 1; i < result.deptInfo.length; i++) {
              if (i === (result.deptInfo.length - 1)) {
                $scope.structureName += result.deptInfo[i].name;
              } else {
                $scope.structureName += result.deptInfo[i].name + '-';
              }
            }
          }
        } catch (e) {
        }
      };

      // getInitStructureInfo.getCurrentStructure(getCurrentDepartInfo);


      function getCommonLinkMan() { //获取常用联系人
        $scope.customContactsInfo = unique_better(storedb(LINK_MAN).find(), 'employeeNumber');
        if ($scope.customContactsInfo.length > 15) {
          $scope.customContactsInfo = $scope.customContactsInfo.slice(0, 15);
        }
      }
      $scope.deleteCommonLinkMan = function(employee) {
        var index = $scope.customContactsInfo.indexOf(employee);
        $scope.customContactsInfo.splice(index,1);
        localStorage.setItem(LINK_MAN, JSON.stringify($scope.customContactsInfo));
      };
      $scope.$on('$ionicView.beforeEnter', function (e) {
        var blankArr = [];
        currentStackService.setStackList(blankArr);
        console.log("contact的currentStackService.currentStackList = "+angular.toJson(currentStackService.getStackList()));
        getCommonLinkMan();
        // deleteHistory();
      });

      $scope.$on('$destroy', function (e) {
        if (baseConfig.debug) {
          console.log('ContactCtrl.$destroy');
        }
      });
      $scope.goBack = function () {
        $timeout(function () {
          $ionicHistory.goBack();
        },251);
      };
      $scope.watchScroll = function () { //滚动内容时执行的method
        position = $ionicScrollDelegate.getScrollPosition().top;
        console.log("position = "+position);
        $scope.$apply(function () {
          if (position < 33) {
            $scope.showTopInput = false;
          } else if (position >= 33) {
            $scope.showTopInput = true;
          }
        });
      };
      // function storeStructure(structureParam,newObj){
      //   storedb(structureParam).insert(newObj,function (err) {
      //   })
      // }


      $scope.telNumber = function (event, baseInfo) { //拨打电话按钮的响应事件
        event.stopPropagation(); //阻止事件冒泡
        //常用联系人拨打电话
        window.location.href = "tel:" + baseInfo.replace(/\s+/g, "");
      };

      $scope.goInputSearch = function () { //去搜索界面
        $state.go('tab.contactSearch');
      };

      $scope.goStructure = function (flag) {
        console.log("goStructure");

        $state.go('tab.contactStructure');
      };

      $scope.goDetailInfo = function (newEmployeeNumber) {
        $state.go('tab.employeeDetail', {employeeNumber: newEmployeeNumber});
      };

    }])
  .service('getInitStructureInfo', ['hmsHttp', 'baseConfig', 'commonContactService' ,'hmsPopup', function (hmsHttp, baseConfig,commonContactService,hmsPopup) {
    // var _currentStructureUrl = baseConfig.queryPath + '/dept/getStaffDeptInfo';
    // var _structureUrl = baseConfig.queryPath + '/dept/getDetail';
    var _structureUrl = baseConfig.sapUrl+"ZhrDepartmentList";
    var uniqueStructureArr = [];
    this._returnData = {};
    return {
      getNewStructure: function(){

      },
      getCurrentStructure: function (callback) {
        hmsHttp.post(_currentStructureUrl).then(function (response) {
          if (response.returnData) {
          } else {
            response.returnData = {};
          }
          callback(response.returnData);
        }, function(response){
        });
        //  .error(function (error) {
        //});
      },
      getStructure: function (callback, newId,typeId) {
        // var structureParam = newId + typeId;
        // localStorage.removeItem(structureParam);
        // console.log("localStorage[structureParam] = "+angular.toJson(localStorage[structureParam]));
        hmsPopup.showLoading("请稍后");
        var params = {
          "ZHR_DEPARTMENT_LIST":{
            "ID":newId,
            "OTYPE":typeId,
            "T_DEPARTMENT":{
              "item":{
                "OTYPE":"",
                "ID":"",
                "NAME":"",
                "PARENTID":"",
                "PARENTTY":""
              }
            },
            "T_EMPLOYEE":{
              "item":{
                "USERID":"",
                "USERNAME":""
              }
            }
          }
        };

        console.log("typeId = "+typeId);
        hmsHttp.post(_structureUrl, params).then(function (response) {
          hmsPopup.hideLoading();
          try {
            this._returnData = response;
          } catch (e) {
            this._returnData = {};
          }
          callback(this._returnData);
        }.bind(this), function(response){
          hmsPopup.hideLoading();
        });
        //  .error(function (error) {
        //  hmsPopup.hideLoading();
        //});

      }
    }

  }])
  .factory('commonContactService', [function () {
    var _pageName = '';
    var _newEmp = {};
    var _newDate = '';
    return {
      setGoContactFlg: function (newPage) {
        _pageName = newPage;
      },
      getContactFlag: function () {
        return _pageName;
      },
      setEmpInfo: function (newEmp) {
        _newEmp = newEmp;
      },
      getEmpInfo: function () {
        return _newEmp;
      },
      setNewDate: function (newDate) {
        _newDate = newDate;
      },
      getNewDate: function () {
        return _newDate;
      }
    }
  }]);



/**
 */
var storedb = function (collectionName) {
  collectionName = collectionName ? collectionName : 'default';
  // console.log("collectionName = "+collectionName);
  // console.log("localStorage[collectionName] = "+localStorage[collectionName]);
  var err;
  var cache = localStorage[collectionName] ? JSON.parse(localStorage[collectionName]) : [];
  // console.log("cache = "+angular.toJson(cache));
  return {
    insert: function (obj, callback) {

      cache.unshift(obj);

      localStorage.setItem(collectionName, JSON.stringify(cache));
      if (callback)
        callback(err, obj);
    },

    find: function (obj, callback) {
      if (arguments.length == 0) {
        return cache;
      } else {
        var result = [];
        console.log("find obj = "+obj);
        for (var key in obj) {
          for (var i = 0; i < cache.length; i++) {
            if (cache[i][key] == obj[key]) {
              result.push(cache[i]);
            }
          }
        }
        if (callback)
          callback(err, result);
        else
          return result;
      }
    },

    update: function (obj, upsert, callback) {

      for (var key in obj) {
        for (var i = 0; i < cache.length; i++) {
          if (cache[i][key] == obj[key]) {

            end_loops:
              for (var upsrt in upsert) {
                switch (upsrt) {
                  case "$inc":
                    for (var newkey in upsert[upsrt]) {
                      cache[i][newkey] = parseInt(cache[i][newkey]) + parseInt(upsert[upsrt][newkey]);
                    }
                    break;

                  case "$set":
                    for (var newkey in upsert[upsrt]) {
                      cache[i][newkey] = upsert[upsrt][newkey];
                    }
                    break;

                  case "$push":
                    for (var newkey in upsert[upsrt]) {
                      cache[i][newkey].push(upsert[upsrt][newkey]);
                    }
                    break;

                  default:
                    upsert['_id'] = cache[i]['_id'];
                    cache[i] = upsert;
                    break end_loops;
                }
              }
          }
        }
      }
      localStorage.setItem(collectionName, JSON.stringify(cache));
      if (callback)
        callback(err);

    },

    remove: function (obj, callback) {
      if (arguments.length == 0) {
        localStorage.removeItem(collectionName);
      } else {
        for (var key in obj) {
          for (var i = cache.length - 1; i >= 0; i--) {
            if (cache[i][key] == obj[key]) {
              cache.splice(i, 1);
            }
          }
        }
        localStorage.setItem(collectionName, JSON.stringify(cache));
      }
      if (callback)
        callback(err);
    }

  };
};

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
          "appName": "神州头条",
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
        hmsPopup.showPasswordPopup('请与IT帮助台联系找回密码，谢谢！<br>电话：400-900-3450<br>邮箱：IT@ucarinc.com');
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
          var url = baseConfig.baseUrl + 'loginPortApi/loginPostPort';
          var params = {
            "username": $scope.loginInfo.username,
            "password": $scope.loginInfo.password
          };
          hmsPopup.showLoading('登录中...');

          hmsHttp.post(url, params).then(function (result) {
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
              if (localStorage.getItem(mianApplicationList) == undefined) {//本地功能数据
                localStorage.setItem(mianApplicationList, JSON.stringify($scope.applicationList));
              }
              var appListUrl = baseConfig.baseUrl + 'appApi/getAppFuncList';
              var appListParams = {
                "rlcode": window.localStorage.rlCode,
                "parent_func_option":""
              };
              hmsHttp.post(appListUrl, appListParams).then(function (result) {//拉取首页功能数据
                hmsPopup.hideLoading();
                if (result.status == 'S') {
                  var serveApplicationList = 'serveApplicationList';
                  localStorage.setItem(serveApplicationList, JSON.stringify(result.data));//服务器功能数据
                  var mianAppList = JSON.parse(localStorage.getItem(mianApplicationList));
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
              hmsPopup.showPopup(result.msg);
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

/**
 * Created by utopia_song on 17/1/12.
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.about-us', {
          url: '/about-us',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/about-us.html',
              controller: 'AboutUsCtrl'
            }
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('AboutUsCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$ionicTabsDelegate',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $ionicTabsDelegate) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
      });
      $scope.scanPic = baseConfig.scanPic;
    }]);

/**
 * Created by utopia_song on 16/11/21.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.change-info', {
          url: '/change-info',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/change-info.html',
              controller: 'ChangeInfoCtrl'
            }
          },
          params: {
            infoParam: ''
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('ChangeInfoCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$stateParams',
    '$timeout',
    '$rootScope',
    'sweet',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $stateParams,
              $timeout,
              $rootScope,
              sweet) {
      $scope.title = '';
      $scope.showClearIconFlag = false;
      $scope.changeInfo = {
        'changePhone': '',
        'changeStation': '',
        'changeAddress': ''
      };

      if ($stateParams.infoParam == 'phoneNumber') {
        $scope.title = '手机';
        $scope.titleFlag = 'phone';
      } else if ($stateParams.infoParam == 'station') {
        $scope.title = '工位';
        $scope.titleFlag = 'station';
      } else {
        $scope.title = '地址';
        $scope.titleFlag = 'address';
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.showClearIcon = function () {
        // if($scope.changeInfo.changeValue !== ''){
        //   $scope.showClearIconFlag = true;
        // }else{
        //   $scope.showClearIconFlag = false;
        // }
        ($scope.changeInfo.changeValue == '') ? $scope.showClearIconFlag = false : $scope.showClearIconFlag = true;
      };
      $scope.clearInput = function () {
        $scope.changeInfo.changeValue = '';
        $scope.showClearIconFlag = false;
      };
      $scope.$on('$ionicView.enter', function () {
        $('.input').focus();
      });
      $scope.submitChangeInfo = function () {
        var url = baseConfig.sapUrl + 'Zhrwf10_006';
        var param = {
          "ZHRWF10_006": {
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZCZDZ": $scope.changeInfo.changeAddress,
            "I_ZGW": $scope.changeInfo.changeStation,
            "I_ZMPHONE": $scope.changeInfo.changePhone
          }
        };
        hmsPopup.showLoading('正在提交');
        console.log("params值："+angular.toJson(param));
        hmsHttp.post(url,param).then(function (response) {
          hmsPopup.hideLoading();
          console.log("response值："+angular.toJson(response));
          console.log("response.O_TYPE值："+response.O_TYPE);
          if(response.O_TYPE == 'S'){
           $timeout(function () {
             hmsPopup.showPopup('修改成功');
           },200);
            $rootScope.$broadcast('REFRESH_INFO');
            $ionicHistory.goBack();
          }else{
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
            //add by wl
            console.log("else里 response.O_TYPE !== 'S'");
          }
          console.info('change return :'+angular.toJson(response,true));
        },function(response){
          hmsPopup.showShortCenterToast('提交失败');
        })
      }
    }]);

'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.feedback', {
          url: '/feedback',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/feedBack.html',
              controller: 'FeedbackCtrl'
            }
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('FeedbackCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$ionicTabsDelegate',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $ionicTabsDelegate) {
      $scope.placeholderText = "请填写产品问题反馈";
      $scope.qualityIssue = [false, false, false, false];//反馈问题类型样式
      $scope.feedbackInfo = {//反馈信息
        info: ""
      }
      $scope.selectQualityIssue = function (num) {//选择反馈问题类型
        if (num == 0) {
          $scope.placeholderText = "请填写产品质量问题反馈";
        } else if (num == 1) {
          $scope.placeholderText = "请填写产品服务问题反馈";
        } else if (num == 2) {
          $scope.placeholderText = "请填写产品优化问题反馈";
        } else if (num == 3) {
          $scope.placeholderText = "请填写产品其他问题反馈";
        }
        angular.forEach($scope.qualityIssue, function (data, index, array) {
          array[index] = false;
        });
        $scope.qualityIssue[num] = true;
      }
      $scope.goBack = function () {//返回按钮
        $ionicHistory.goBack();
      }

      $scope.commit = function () {//提交反馈
        var i = 0;
        angular.forEach($scope.qualityIssue, function (data, index, array) {
          if (array[index] == false) {
            i++;
          }
        });
        if (i == $scope.qualityIssue.length) {
          hmsPopup.showShortCenterToast('请选择反馈问题类型');
        } else if ($scope.feedbackInfo.info == "") {
          hmsPopup.showShortCenterToast('请填写产品质量问题反馈');
        } else if ((i < $scope.qualityIssue.length) && ($scope.feedbackInfo.info != "")) {
          var url = baseConfig.baseUrl + "appApi/opinionFeedBack";
          var param = {
            "username": window.localStorage.empno,
            "opiniontype": "",
            "opinioncontent": $scope.feedbackInfo.info
          };
          if ($scope.qualityIssue[0] == true) {
            param.opiniontype = "质量问题";
          } else if ($scope.qualityIssue[1] == true) {
            param.opiniontype = "服务问题";
          } else if ($scope.qualityIssue[2] == true) {
            param.opiniontype = "优化问题";
          } else if ($scope.qualityIssue[3] == true) {
            param.opiniontype = "其他问题";
          }
          hmsPopup.showLoading('请稍候');
          hmsHttp.post(url, param).then(function (result) {
            if (baseConfig.debug) {
              console.log("result success " + angular.toJson(result));
            }
            hmsPopup.hideLoading();
            if (result.status == "S") {
              hmsPopup.showVeryShortCenterToast("您的意见已反馈成功");
              $ionicHistory.goBack();
            } else {
              var message = result.errorMsg;
              hmsPopup.showVeryShortCenterToast(message);
            }
          }, function(response){
              hmsPopup.hideLoading();
              //hmsPopup.showShortCenterToast("网络连接出错");
              if (baseConfig.debug) {
                console.log("response error " + angular.toJson(response));
              }
          });
          //  .error(function (error, status) {
          //  hmsPopup.hideLoading();
          //  //hmsPopup.showShortCenterToast("网络连接出错");
          //  if (baseConfig.debug) {
          //    console.log("response error " + angular.toJson(error));
          //  }
          //})
        }
      };
      $scope.$on('$ionicView.beforeEnter',function () {
        $ionicTabsDelegate.showBar(false);
      });
    }]);

/**
 * Created by LeonChan on 2016/6/20.
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.my-info-detail', {
          url: '/my-info-detail',
          views: {
            'tab-myInfo': {
              templateUrl: 'build/pages/myInfo/my-info-detail.html',
              controller: 'MyInfoDetailCtrl'
            }
          },
          params:{
            employeeImg:''
          }
        })
    }]);
angular.module('myInfoModule')
  .controller('MyInfoDetailCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$stateParams',
    'saveParameter',
    '$ionicTabsDelegate',
    '$state',
    '$rootScope',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $stateParams,
              saveParameter,
              $ionicTabsDelegate,
              $state,
              $rootScope) {

      // $scope.personalInfo=$stateParams.myDetailInfo;
      // $scope.myPortrait="";
      // if($scope.personalInfo.avatar!=""){
      //   $scope.myPortrait=$scope.personalInfo.avatar;
      // }else if($scope.personalInfo.avatar==""){
      //    if($scope.personalInfo.gender=="男"){
      //      $scope.myPortrait="build/img/myInfo/man-portrait.png";
      //    }else if($scope.personalInfo.gender=="女") {
      //      $scope.myPortrait = "build/img/myInfo/woman-portrait.png";
      //    }
      // }
      $scope.employeeImg = $stateParams.employeeImg;
      function getPersonInfo() {
        var url = baseConfig.sapUrl + "ZhrEmployeeListByUname";
        var param = {
          "ZHR_EMPLOYEE_LIST_BY_UNAME": {
            "UNAME": window.localStorage.empno,
            "T_P0000": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "MASSN": "",
                "MNTXT": "",
                "MASSG": "",
                "MGTXT": ""
              }
            },
            "T_P0001": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "BUKRS": "",
                "BUTXT": "",
                "PERSG": "",
                "PGTXT": "",
                "PERSK": "",
                "PTEXT": "",
                "WERKS": "",
                "NAME1": "",
                "BTRTL": "",
                "BTEXT": "",
                "ABKRS": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ENAME": ""
              }
            },
            "T_P0002": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "GESCH": "",
                "GBDAT": "",
                "NATTX": "",
                "LANDX": "",
                "FTEXT": ""
              }
            },
            "T_P0041": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "DAT01": "",
                "DAT02": "",
                "DAT03": ""
              }
            },
            "T_P0105": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "SUBTY": "",
                "STEXT": "",
                "USRID": "",
                "USRID_LONG": ""
              }
            },
            "T_P0185": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ICTYP": "",
                "ICTXT": "",
                "ICNUM": ""
              }
            },
            "T_P0529": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "RACKY": "",
                "LTEXT": ""
              }
            },
            "T_P0534": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "PCODE": "",
                "PTEXT": ""
              }
            },
            "T_P9001": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHKLX": "",
                "ZHKLXMS": "",
                "ZHKSZD": "",
                "ZSFJTHK": "",
                "ZHKZCSJ": "",
                "ZSSPCS": "",
                "ZHKDQ": ""
              }
            },
            "T_P9002": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZXL": "",
                "ZXLMS": "",
                "ZZGXL": "",
                "ZSZXX": "",
                "ZZY": "",
                "ZXW": "",
                "ZXWMS": "",
                "ZZGXW": "",
                "ZXZ": "",
                "ZXZMS": "",
                "ZXLQDFS": "",
                "ZXLQDFSMS": ""
              }
            },
            "T_P9003": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZYZ": "",
                "ZYZMS": "",
                "ZSLDJ": "",
                "ZSLDJMS": "",
                "ZYYDJ": "",
                "ZYYDJMS": "",
                "ZBZ": ""
              }
            },
            "T_P9004": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHTLX": "",
                "ZHTLXMS": "",
                "ZSYQRQ": "",
                "ZBYSJ": "",
                "ZQDLB": "",
                "ZQDLBMS": "",
                "ZPQJG": "",
                "ZQYDW": "",
                "ZQYDWWB": "",
                "ZYGFS": "",
                "ZYGFSMS": "",
                "ZGSZD": "",
                "ZGSZDMS": ""
              }
            },
            "T_P9005": {
              "item": {
                "ENDDA": "",
                "BEGDA": "",
                "ZCZYY": "",
                "ZCZYYMS": "",
                "ZBZ": ""
              }
            },
            "T_P9006": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZJZLX": "",
                "ZJZLXMS": "",
                "ZCCLZRQ": "",
                "ZJZBH": ""
              }
            },
            "T_P9007": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZDZBH": "",
                "ZCCDD": "",
                "ZCCDDMS": "",
                "ZCDSJ": "",
                "ZDCSJ": "",
                "ZTDSJ": "",
                "ZDCYY": "",
                "ZDCYYMS": ""
              }
            },
            "T_P9008": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHDSJ": "",
                "ZZSMC": "",
                "ZZSMCMS": "",
                "ZZCDD": "",
                "ZSCRQ": "",
                "ZDQRQ": ""
              }
            },
            "T_P9009": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZJCLB": "",
                "ZJCLBWB": "",
                "ZJCNR": "",
                "ZJCNRWB": "",
                "ZJE": "",
                "ZLY": ""
              }
            },
            "T_P9010": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZJTXM": "",
                "ZJTXB": "",
                "ZGX": "",
                "ZGXMS": "",
                "ZJTDH": "",
                "ZJTDZ": "",
                "ZCSRQ": "",
                "ZGZDW": "",
                "ZGZZW": "",
                "ZSFLXR": ""
              }
            },
            "T_P9011": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZQRGS": "",
                "ZZW": "",
                "ZBZ": ""
              }
            },
            "T_P9012": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZGZDZ": "",
                "ZHJDZ": "",
                "ZCZDZ": "",
                "ZGW": "",
                "ZYB": ""
              }
            },
            "T_P9013": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHR_ZCLX": "",
                "ZHR_ZCBM": "",
                "ZHR_PP": "",
                "ZHR_XH": "",
                "ZHR_XLH": "",
                "ZHR_DQJZ": "",
                "ZHR_FFRQ": "",
                "ZHR_SFGH": "",
                "ZHR_GHRQ": ""
              }
            }
          }
        };

        hmsPopup.showLoading("正在加载");
        $scope.employeeInfo = {};
        // $scope.employeeInfo = saveParameter.getEmployeeInfos();
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          var contactItem = response.T_P0105.item;
          var self_email = '';
          var work_email = '';
          var self_mobil = '';
          var work_mobil = '';
          angular.forEach(contactItem, function (item, index) {
            if (item.SUBTY === "M2") {
              self_email = item.USRID_LONG;
            }
            if (item.SUBTY === "T1") {
              self_mobil = item.USRID_LONG;
            }
            if (item.SUBTY === "T2") {
              work_mobil = item.USRID_LONG;
            }
            if (item.SUBTY === "M1") {
              work_email = item.USRID_LONG;
            }
          });
          $scope.employeeInfo.emp_code = response.PERNR;
          $scope.employeeInfo.emp_name = response.T_P0001.item.ENAME;
          $scope.employeeInfo.sex = response.T_P0002.item.GESCH;
          $scope.employeeInfo.birthday = response.T_P0002.item.GBDAT;
          $scope.employeeInfo.rootUnitName = response.T_P0001.item.ORGTX;
          $scope.employeeInfo.position_name = response.T_P0001.item.PLSTX;
          $scope.employeeInfo.position_rank = response.T_P0001.item.ATX;
          $scope.employeeInfo.emp_status = response.T_P0001.item.PTEXT.substr(0, 2);
          if (response.T_P9012 == "") {
            $scope.employeeInfo.base_name = "";
            $scope.employeeInfo.workStation = "";
          } else {
            $scope.employeeInfo.base_name = response.T_P9012.item.ZGZDZ;
            $scope.employeeInfo.workStation = response.T_P9012.item.ZGW;
          }
          if (response.T_P0185 == "") {
            $scope.employeeInfo.idCardNum = "";
          } else {
            $scope.employeeInfo.idCardNum = response.T_P0185.item.ICNUM;
          }
          if (response.T_P9012 == "") {
            $scope.employeeInfo.city = "";
            $scope.employeeInfo.address = "";
          } else {
            $scope.employeeInfo.city = response.T_P9012.item.ZGZDZ;
            $scope.employeeInfo.address = response.T_P9012.item.ZCZDZ;
          }
          $scope.employeeInfo.slefEmail = self_email;
          $scope.employeeInfo.workEmail = work_email;
          $scope.employeeInfo.slefMobil = self_mobil;
          $scope.employeeInfo.workMobil = work_mobil;
          if ($scope.employeeInfo.sex == "1") {
            $scope.employeeInfo.avatar = "build/img/myInfo/man-portrait.png";
          } else if ($scope.employeeInfo.sex == "2") {
            $scope.employeeInfo.avatar = "build/img/myInfo/woman-portrait.png";
          }
        }, function (response) {
          $scope.showLoading = false;
        });
      }
      //  .error(function(){
      //  $scope.showLoading=false;
      //});
      getPersonInfo();
      $scope.goBack=function(){//返回按钮
        $ionicHistory.goBack();
      };
      $scope.$on('$ionicView.beforeEnter', function (e) {
        $ionicTabsDelegate.showBar(false);
      });
      $scope.goChangeInfo = function (flag) {
        $state.go('tab.change-info',{infoParam:flag});
      };
      $rootScope.$on('REFRESH_INFO',function () {
        getPersonInfo();
      })
    }]);

/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('myInfoModule')

  .controller('myInfoCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'checkVersionService',
    'hmsPopup',
    '$ionicTabsDelegate',
    '$ionicModal',
    'imgService',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              checkVersionService,
              hmsPopup,
              $ionicTabsDelegate,
              $ionicModal,
              imgService) {

      $scope.defaultPortrait="build/img/myInfo/myInfo-userphoto.jpg";
      $scope.personalInfo = '';
      console.log("currentVersion"+baseConfig.version.currentVersion);
      $scope.currentVersion = baseConfig.version.currentversionName;

      var url = baseConfig.sapUrl +"ZhrEmployeeListByUname";
      var param = {"ZHR_EMPLOYEE_LIST_BY_UNAME":{
        "UNAME":window.localStorage.empno,
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
      $scope.bigImage = false;
      var imgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';
      $scope.employee = {};
      hmsPopup.showLoading("正在加载");
      hmsHttp.post(url,param).then(function(response){//拉取员工信息
        hmsPopup.hideLoading();
        console.log("我的信息页面：拉取员工信息response值："+angular.toJson(response));
        if(response.T_P0001 != ''){
          $scope.employee.emp_name = response.T_P0001.item.ENAME;
        } else {
          hmsPopup.showShortCenterToast('拉取个人信息失败');
        }
        $scope.employee.avatar =imgUrl+response.PERNR;
      }, function(response){
        $scope.showLoading=false;
      });
      //  .error(function(){
      //  $scope.showLoading=false;
      //});
      $scope.showBigImage = function (imageName) {
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        console.log("imageName = "+imageName);
        $scope.url = imageName;
        $scope.showModal('build/pages/myInfo/modal/photo-zoom.html');
      };
      $scope.showModal = function(templateUrl) {//显示原图
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.hideBigImage  = function () {
        $scope.modal.hide();
        $scope.modal.remove();
      };
      $scope.logout = function(){//注销登录
        window.localStorage.token = "";
        window.localStorage.empno = '';
        imgService.setAndroidBadgeFlag('false');
        // window.plugins.jPushPlugin.stopPush();
        window.plugins.jPushPlugin.setAlias('');
        $state.go('login',{logoutFlag:'true'});
      };

      $scope.$on('$ionicView.beforeEnter', function (e) {
        // angular.element('.tabs').css('backgroundColor','#fafafa');
        $ionicTabsDelegate.showBar(true);
        console.log("进入message");
      });

      $scope.$on('$ionicView.enter', function (e) {
        if(baseConfig.debug) {
          console.log('myInfoCtrl.$ionicView.enter');
        }
      });

      $scope.$on('$ionicView.loaded',function(e){
        if(baseConfig.debug) {
          console.log('myInfoCtrl.$ionicView.loaded');
        }
      });

      $scope.$on('$destroy', function (e) {
        if(baseConfig.debug) {
          console.log('myInfoCtrl.$destroy');
        }
      });
      $scope.goInfoDetail = function (employeeImg) {
        $state.go('tab.my-info-detail',{employeeImg:employeeImg});
      };
      $scope.goFeedBack = function() {
        $state.go('tab.feedback');
      };
      $scope.goAboutUs = function(){
        $state.go('tab.about-us');
      };
      $scope.checkVersion=function(){//点击版本信息
        var param="MY_INFO";
        checkVersionService.checkAppVersion(param);
      };
    }]);

/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('loginModule').controller('TabsCtrl', ['$scope', '$rootScope', '$state', 'baseConfig','getService','saveParameter','$ionicTabsDelegate','$timeout',
  function ($scope, $rootScope, $state, baseConfig,getService,saveParameter,$ionicTabsDelegate,$timeout) {
    $scope.badges = {
      messageCount:0
    };


    var DB_NAME = window.localStorage.empno + 'history_message';



    $scope.selectMessageTab = function () {
      // $scope.badges.messageCount = 0;
      console.log("选择消息");

      // //选择消息tab时计算未读消息数目
      // var promise = getService.getMessageCount(window.localStorage.empno,localStorage.getItem('lastquerytime'));
      // promise.then(function(response){
      //   if(localStorage.getItem(DB_NAME) !== null){
      //     var o = JSON.parse(localStorage.getItem(DB_NAME)).length;
      //     console.log("setAndroidBadge.length = "+JSON.parse(localStorage.getItem(DB_NAME)).length);
      //     var a = [];
      //     var k = 0;
      //     if(o !== 0){
      //       a = JSON.parse(localStorage.getItem(DB_NAME));
      //       angular.forEach(a,function (item,index) {
      //         if(item.checkFlag == false){
      //           k++;
      //         }
      //       });
      //       console.log(" k1 = "+k);
      //       console.log("$scope.badges"+$scope.badges.messageCount);
      //       if(ionic.Platform.isIOS()){
      //         $scope.badges.messageCount = k+response.msgCount;
      //       }else{
      //         $scope.badges.messageCount = k;
      //       }
      //     }
      //   }else{
      //     $scope.badges.messageCount = response.msgCount;
      //     // saveParameter.setMessageCounts($scope.badges.messageCount);
      //
      //     console.log("response.msgCount = "+response.msgCount);
      //   }
      // });

    };
    $scope.$on('$ionicView.beforeEnter', function () {
      var statename = $state.current.name;
      if (baseConfig.debug) {
        console.log('$ionicView.beforeEnter statename ' + statename);
      }
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename != 'tab.message' && statename != 'tab.application' && statename != 'tab.myInfo') {
        $scope.hideTabs = true;
      }
    });

    $scope.$on('$ionicView.afterEnter', function () {
      var statename = $state.current.name;
      if (baseConfig.debug) {
        console.log('$ionicView.afterEnter statename ' + statename);
      }
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename === 'tab.message' || statename === 'tab.application' || statename === 'tab.myInfo') {
        $scope.hideTabs = false;
      }
    });
    $rootScope.$on('setBadge',function (event,data) {
      $scope.badges.messageCount = data;
      $scope.$apply();
    });
    $rootScope.$on('readOneMessage',function () {
      if($scope.badges.messageCount>0){
        $scope.badges.messageCount = $scope.badges.messageCount -1;
      }
      console.log("收到readOneMessage");
      // $scope.$apply();
    });
    $rootScope.$on('readAllMessage',function () {
      $scope.badges.messageCount = 0;
      console.log("readAllMessage");
      // $scope.$apply();
    });
    // $rootScope.$on('setAndroidBadgeToTab',function (event,data) {
    //   $scope.badges.messageCount = data;
    //   console.log("setAndroidBadgeToTab");
    // });
    //设置APP刚启动的安卓和IOS消息按钮角标
    $rootScope.$on('setAndroidBadge',function () {
      console.log("setAndroidBadge");
      // alert('接收到setAndroidBadge');
      // alert('lastquerytime:'+localStorage.getItem('lastquerytime'));
      var promise = getService.getMessageCount(window.localStorage.empno);
      // promise.then(function(){
      //
      // });

      promise.then(function(response){
        // alert('response.msgCount:'+response.unreadMsgCount);
        $scope.badges.messageCount = parseInt(response.unreadMsgCount);
        if(ionic.Platform.isIOS()){
          window.plugins.jPushPlugin.setApplicationIconBadgeNumber($scope.badges.messageCount);
          window.plugins.jPushPlugin.setBadge($scope.badges.messageCount);
        }
        console.log("response.msgCount = "+response.unreadMsgCount);
      });

    });


    var onReceiveNotification = function(event) {
      // alert('监听到收到消息');
      console.log("$scope.badges.messageCount"+$scope.badges.messageCount);
      // $rootScope.$broadcast('refreshMessageList');
      $timeout(function () {
        $rootScope.$broadcast('setAndroidBadge');
        $rootScope.$broadcast('refreshMessageList');
      },1500);
      console.log('监听到收到消息');
    };
    //
    // var onReceiveNotification = function(event) {
    //   console.log("$scope.badges.messageCount"+$scope.badges.messageCount);
    //   $scope.badges.messageCount +=1;
    //   window.plugins.jPushPlugin.setApplicationIconBadgeNumber($scope.badges.messageCount);
    //   $rootScope.$broadcast('refreshMessageList');
    //   console.log('监听到收到消息');
    //   alert('监听到收到消息');
    //   alert('监听到收到消息$scope.badges.messageCount = '+$scope.badges.messageCount);
    // };
    // var onOpenNotification = function (event) {
    //   var alertContent;
    //   alertContent = event.aps.alert;
    //   alert("open Notificaiton:" + alertContent);
      //   window.plugins.jPushPlugin.getApplicationIconBadgeNumber(function(data) {
      //     console.log("badgeNumber  ="+data);
      //     $scope.badgeNumber = data;
      //   });
      // $scope.badges.messageCount =$scope.badgeNumber+1;
      // window.plugins.jPushPlugin.setApplicationIconBadgeNumber($scope.badges.messageCount);
      // $rootScope.$broadcast('refreshMessageList');
    // };
    // var onBackgroundNotification = function (event) {
    //   $scope.badges.messageCount +=1;
    //   $scope.$apply();
    // };

      // window.plugins.jPushPlugin.receiveNotificationInAndroidCallback = function (data) {
      //   console.log('安卓接收到了广播');
      //   $scope.badges.messageCount +=1;
      //   $rootScope.$broadcast('refreshMessageList');
      //   $scope.$apply();
      // };

    document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);

    // document.addEventListener("jpush.openNotification", onOpenNotification, false);
    // document.addEventListener("jpush.backgroundNotification", onBackgroundNotification, false);




  }]);

/**
 * Created by utopia_song on 16/11/3.
 */

angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.application-ask-holiday', {
          url: '/application-ask-holiday',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/application-ask-holiday-list.html',
              controller: 'applicationAskHolidayListCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('applicationAskHolidayListCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    'hmsHttp',
    '$cordovaDialogs',
    '$timeout',
    '$ionicScrollDelegate',
    '$rootScope',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService,
              hmsHttp,
              $cordovaDialogs,
              $timeout,
              $ionicScrollDelegate,
              $rootScope) {

      var nowPage = '0';
      var pageSize = '10';
      var holidayRequestUrl = baseConfig.sapUrl + 'Zhrwf20_010';
      var holidayInfoUrl = baseConfig.sapUrl+'Zhrwf20_002';
      var holidayInfoParam  = {
        "ZHRWF20_002":{
          "ET_ZHR_YE":{
            "item":{
              "PERNR":"",
              "ZANZHL1":"",
              "ZANZHL2":"",
              "ZANZHL3":"",
              "ZANZHL4":""
            }
          },
          "I_PERNR":"",
          "I_USRID":window.localStorage.empno.toUpperCase(),
          "I_YEAR":new Date().getFullYear().toString()
        }
      };
      $scope.newInfo = {};
      $scope.requestHolidayList = [];
      $scope.loadMoreDataFlag = false;
      $scope.holidayInfo = {};
      function getRequestHolidayList() {
        var holidayRequestParam = {
          "ZHRWF20_010": {
            "ET_ZHRWF_020": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "PERNR": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "AWART": "",
                "ZANZHL1": "",
                "ZANZHL2": "",
                "ZANZHL3": "",
                "ZANZHL4": "",
                "ZXJBJ": "",
                "REL_STATUS": "",
                "BEGDA": "",
                "ZBEGAP": "",
                "ENDDA": "",
                "ZENDAP": "",
                "ABWTG": "",
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY": "",
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              }
            },
            "I_BEGDA": "1800-01-01",
            "I_ENDDA": "9999-12-31",
            "I_NUM": pageSize,
            "I_PAGE": nowPage,
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZXJBJ": "A"
          }
        };

        hmsPopup.showLoading("请稍后");
        hmsHttp.post(holidayRequestUrl, holidayRequestParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假列表');
          console.info(angular.toJson(response,true));
          if(response.R_TYPE == 'E'){
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
            // hmsPopup.showShortCenterToast(response.R_MESSAGE);
          }
          else if (response.ET_ZHRWF_020.item instanceof Array) { //返回的item是数组代表有数据
            var list = response.ET_ZHRWF_020.item;
            var len = list.length;
            angular.forEach(list,function (item,index) {
              var temp_1 = {
                'REL_NUMBER':item.REL_NUMBER,
                'AWART':item.AWART,
                'ABWTG':item.ABWTG,
                'REL_STATUS':item.REL_STATUS,
                'CREATE_TIME': item.CREATE_TIME,
                'BEGDA': item.BEGDA,
                'CREATE_DATE':item.CREATE_DATE
              };
              $scope.requestHolidayList.push(temp_1);
            });
            $scope.loadMoreDataFlag = true;
            if (len < pageSize) {
              $scope.loadMoreDataFlag = false;
            }
          } else {
            if (response.ET_ZHRWF_020 == '') { //没有数据的情况
              $scope.loadMoreDataFlag = false;
              if (nowPage == 0) {//如果第一页数据为空的话提示无数据
                $scope.noApprovalFlag = true;
              }
            } else { //一条数据的情况
              var temp = {
                'REL_NUMBER': response.ET_ZHRWF_020.item.REL_NUMBER,//单据号
                'ABWTG': response.ET_ZHRWF_020.item.ABWTG,//请假天数
                'AWART':response.ET_ZHRWF_020.item.AWART,//请假类型
                'BEGDA': response.ET_ZHRWF_020.item.BEGDA,//开始时间年月日
                'CREATE_DATE':response.ET_ZHRWF_020.item.CREATE_DATE,
                'CREATE_TIME': response.ET_ZHRWF_020.item.CREATE_TIME, //时分秒
                'REL_STATUS': response.ET_ZHRWF_020.item.REL_STATUS //当前审批状态
              };
              $scope.requestHolidayList.push(temp);
              $scope.loadMoreDataFlag = false;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        },function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取休假列表失败,请退出页面重试获取或联系管理员!');
        })
      }
      $scope.loadMoreData = function () {//上拉加载
          nowPage++;
          getRequestHolidayList();
        console.log('load');
      };

      $scope.refresh = function () {//下拉刷新
        nowPage = 0;
        $scope.requestHolidayList = [];
        getRequestHolidayList();
        getHolidayInfo();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      getRequestHolidayList();
      getHolidayInfo();
      function getHolidayInfo() {  //获取假期信息
        hmsPopup.showLoading("正在加载假期信息");
        hmsHttp.post(holidayInfoUrl,holidayInfoParam).then(function (response) {
          hmsPopup.hideLoading();
          $scope.holidayInfo.lastYearDays = response.ET_ZHR_YE.item.ZANZHL1 == ''? '0': response.ET_ZHR_YE.item.ZANZHL1;//上年年假结余
          $scope.holidayInfo.thisYearDays = response.ET_ZHR_YE.item.ZANZHL2 == ''? '0': response.ET_ZHR_YE.item.ZANZHL2;//本年年假结余
          $scope.holidayInfo.usedPaidSickLeave = response.ET_ZHR_YE.item.ZANZHL3 == ''? '0': response.ET_ZHR_YE.item.ZANZHL3;//带薪病假
          $scope.holidayInfo.compensatedLeave = response.ET_ZHR_YE.item.ZANZHL4 == ''? '0': response.ET_ZHR_YE.item.ZANZHL4;//调休假
          $scope.holidayInfo.totalYearDays = $scope.holidayInfo.lastYearDays + $scope.holidayInfo.thisYearDays;
          //为新建的申请单存字段值
          $scope.newInfo = {
            'ZANZHL1':$scope.holidayInfo.lastYearDays.replace(/\s/g,''),
            'ZANZHL2':$scope.holidayInfo.thisYearDays.replace(/\s/g,''),
            'ZANZHL3':$scope.holidayInfo.usedPaidSickLeave.replace(/\s/g,''),
            'ZANZHL4':$scope.holidayInfo.compensatedLeave.replace(/\s/g,'')
          };
          console.log('holiday info = '+angular.toJson(response));
        },function (response) {
          hmsPopup.showShortCenterToast('获取假期信息失败');
        });
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.newHoliday = function () {
        $state.go('tab.new-application-holiday',{newInfo:$scope.newInfo,holidayList:$scope.requestHolidayList});
      };
      $scope.toHolidayDetail = function (receiptNum) {
        $state.go('tab.application-holiday-detail',{receiptNum:receiptNum});
      };
      $rootScope.$on('HOLIDAY_REFRESH',function () {
        nowPage = 0;
        $scope.requestHolidayList = [];
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getRequestHolidayList();
        getHolidayInfo();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('holidayListHandle').scrollTop(false);
        },200);
      })

    }]);

/**
 * Created by xuchengcheng on 2016/9/1.
 */
 angular.module('myApp')
 .config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
    .state('tab.application-manage', {
      url: '/application-manage',
      views: {
        'tab-application': {
          templateUrl: 'build/pages/application/application-manage/application-manage.html',
          controller: 'applicationManageCtrl'
        }
      }
    })
  }]);
 angular.module('applicationModule')
 .controller('applicationManageCtrl', [
  '$scope',
  '$state',
  '$ionicHistory',
  'hmsPopup',
  function ($scope,
    $state,
    $ionicHistory,
    hmsPopup) {
    $scope.data={
      showReorder:false
    };
    $scope.manageAppList = [];
    var mianApplicationList = window.localStorage.empno + 'applicationList';
    $scope.appList = JSON.parse(localStorage.getItem(mianApplicationList));
    $scope.listSort = function() {
      $scope.manageAppListSort = [];
      $scope.manageAppList.reverse();
      for(var i = 0;i < $scope.manageAppList.length; i++){
        if($scope.manageAppList[i].appFlag == 'Y') {
          $scope.manageAppListSort.unshift($scope.manageAppList[i]);
        }else{
          $scope.manageAppListSort.push($scope.manageAppList[i]);
        }
      }
      $scope.manageAppList = $scope.manageAppListSort;
    }
    $scope.serveApplist = JSON.parse(localStorage.getItem('serveApplicationList'));
    for(var i = 0; i < $scope.appList.length; i++){
      for(var j = 0; j < $scope.serveApplist.length; j++){
          if($scope.serveApplist[j].functionName == $scope.appList[i].appName){//获取匹配服务器的数据
            if($scope.serveApplist[j].isLock == 'N'){
              $scope.manageAppList.push($scope.appList[i]);
            }
          }
        }
      }
      //将manageAppList排序，将所有对勾应用显示在上面之后是所有的没勾应用
      $scope.listSort();
      //取出固定在屏幕的应用
      var onLockAppList = $scope.appList.slice(0);
      console.log("取到固定应用");
      console.log(onLockAppList);
      for (var i = 0; i < $scope.manageAppList.length; i++) {
        for (var j = 0; j < onLockAppList.length; j++) {
          if(onLockAppList[j].appName == $scope.manageAppList[i].appName){
              onLockAppList.splice(j,1);
          }
        }
      }
      $scope.applicationChoose = function (application) {
        if(!$scope.data.showReorder){
          // for (var i = 0; i < $scope.appList.length; i++) {
          //   if (application.appName == $scope.appList[i].appName) {
          //     if (application.appFlag == 'Y') {
          //       for(var j = 0;j < $scope.manageAppList.length; j++){
          //         if(application.appName == $scope.manageAppList[j].appName){
          //          $scope.manageAppList.splice(j, 1);
          //        }
          //      }
          for (var i = 0; i < $scope.manageAppList.length; i++) {
            if($scope.manageAppList[i].appName == application.appName){
              if (application.appFlag == 'Y') {
               $scope.manageAppList.splice(i,1);
              //hmsPopup.showShortCenterToast('已从首页功能中移除');
              application.appFlag = 'N';
              //将改为N的功能加入到列表尾部
              $scope.manageAppList.push(application);
             }
            else if (application.appFlag == 'N') {
              for(var k = 0;k < $scope.manageAppList.length; k++){
                if(application.appName == $scope.manageAppList[k].appName){
                       //从当前列表位置删除
                       $scope.manageAppList.splice(k, 1);
                      //hmsPopup.showShortCenterToast('功能已添加到首页');
                      application.appFlag = 'Y';
                      //将改为Y的功能加入到已勾选列表尾部
                      for (var n = 0; n < $scope.manageAppList.length; n++) {
                        if($scope.manageAppList[n].appFlag == 'N'){
                          $scope.manageAppList.splice(n,0,application);
                          break;
                        }
                        if(n==$scope.manageAppList.length-1){
                         $scope.manageAppList.push(application);
                         break;
                       }
                     }
                     break;
                   }
                 }
               }
               break;
             }
           }
           $scope.appList = onLockAppList.concat($scope.manageAppList);
           localStorage.setItem(mianApplicationList,JSON.stringify($scope.appList));
           console.log("点击之后的applist:");
           console.log($scope.appList);
         }
       };

       $scope.moveItem = function(application, fromIndex, toIndex) {
        var yNum = 0;
        var lastIndex = -1;
      //判断可移动（已经勾选列表）的应用个数
      for(var i = 0; i< $scope.manageAppList.length; i++){
        if($scope.manageAppList[i].appFlag == 'Y'){
          yNum ++;
        }
      }
      //找到已经勾选列表的最后一个
      for(var j = 0; j< $scope.manageAppList.length; j++){
        if($scope.manageAppList[j].appFlag == 'Y'){
          lastIndex++;
        }
      }
      //可移动的应用个数大于1可以排序
      if(application.appFlag=='Y' && yNum >1){
        //移动距离大于已经勾选列表长度（只能放在已经勾选列表的最后一个）
        if(toIndex>=lastIndex){
          console.log("超出可排序范围");
          $scope.manageAppList.splice(fromIndex, 1);
          $scope.manageAppList.splice(lastIndex,0,application);
          $scope.appList = onLockAppList.concat($scope.manageAppList);
          localStorage.setItem(mianApplicationList, JSON.stringify($scope.appList));
        }else{
          $scope.manageAppList.splice(fromIndex, 1);
          $scope.manageAppList.splice(toIndex,0,application);
          $scope.appList = onLockAppList.concat($scope.manageAppList);
          localStorage.setItem(mianApplicationList, JSON.stringify($scope.appList));
        }
        console.log("排序之后的manageAppList");
        console.log($scope.manageAppList);
        console.log("排序之后的appList");
        console.log($scope.appList);
      }

    };

    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.$on('$ionicView.beforeEnter', function (e) {
      // $ionicTabsDelegate.showBar(true);
    });
  }]);

/**
 * Created by utopia_song on 16/9/6.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.approval-center', {
          url: '/tab.approval-center',
          params: {
            flag: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/approval-center.html',
              controller: 'WorkFLowListCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('WorkFLowListCtrl', [
    '$scope',
    '$state',
    'workFlowListService',
    '$timeout',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$stateParams',
    function ($scope,
              $state,
              workFlowListService,
              $timeout,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $stateParams) {
      $scope.list = [];
      $scope.loadMoreDataFlag = false;
      $scope.noApprovalFlag = false;
      $scope.UpFlag = $stateParams.flag;
      var nowPage = 0;
      var nowPage1 = 0;
      var nowPage2 = 0;
      var pageSize = 10;
      var workflowType = '名称';
      var workflowTime = '提交时间';
      var workflowPerson = '提交人';
      $scope.approvalStatus = 'Untreated';
      $scope.listStatus = {
        todo: {
          selected: true
        },
        done: {
          selected: false
        },
        mine: {
          selected: false
        }
      };
      function getUntreatedList() {//未处理
        var url = baseConfig.sapUrl + 'Zhrwf00';
        var param = {
          "ZHRWF00": {
            "FLAG": "Y",
            "UNAME": window.localStorage.empno.toUpperCase(),
            "PAGE": nowPage,
            "PERPAGE": pageSize,
            "ALL": "",
            "T_TODOLIST": {
              "item": {
                "REL_NUMBER": "",
                "WF_TYPE": "",
                "REL_DATE": "",
                "REL_BY": "",
                "CONTENT": "",
                "REL_STATUS": ""
              }
            }
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          console.group('未处理list');
          console.info(angular.toJson(response,true));
          hmsPopup.hideLoading();
          if (response.T_TODOLIST !== "") {
            if (response.T_TODOLIST.item.constructor == Array) {
              if (response.T_TODOLIST.item.length > 0) {
                var list = response.T_TODOLIST.item;
                angular.forEach(list, function (item, index) {
                  var temp = {
                    id: item.REL_NUMBER,
                    title1: '',
                    typeValue: item.CONTENT.replace('\\n',''),
                    submit: workflowPerson,
                    submitPerson: item.REL_BY,
                    sendTime: workflowTime,
                    sendTimeValue: item.REL_DATE,
                    icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                    status: item.REL_STATUS,
                    WF_TYPE:item.WF_TYPE
                  };
                  if(item.WF_TYPE == '20'){ //请假申请的typeCode
                    temp.title1 = '请假审批';
                    temp.icon = 'build/img/application/approval-center-detail/leave-apply.png';
                  }
                  if(item.WF_TYPE == '01'){
                    temp.title1 = '录用审批';//录用申请申请的typeCode
                  }
                  if(item.WF_TYPE == '21'){
                    temp.title1 = '销假审批';
                    temp.icon = 'build/img/application/approval-center-detail/back-leave.png';
                  }
                  if(item.WF_TYPE == '04'){
                    temp.title1 = '转正审批';//销假申请的typeCode
                  }
                  $scope.list.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (response.T_TODOLIST.item.length < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              }
            } else {
              var temp1 = {
                id: response.T_TODOLIST.item.REL_NUMBER,
                title1: '',
                typeValue: response.T_TODOLIST.item.CONTENT.replace('\\n',''),
                submit: workflowPerson,
                submitPerson: response.T_TODOLIST.item.REL_BY,
                sendTime: workflowTime,
                sendTimeValue: response.T_TODOLIST.item.REL_DATE,
                icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                status: response.T_TODOLIST.item.REL_STATUS,
                WF_TYPE:response.T_TODOLIST.item.WF_TYPE
              };
              if(response.T_TODOLIST.item.WF_TYPE == '20'){ //请假申请的typeCode
                temp1.title1 = '请假审批';
                temp1.icon = 'build/img/application/approval-center-detail/leave-apply.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '01'){
                temp1.title1 = '录用审批';//录用申请申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '21'){
                temp1.title1 = '销假审批';
                temp1.icon = 'build/img/application/approval-center-detail/back-leave.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '04'){
                temp1.title1 = '转正审批';//销假申请的typeCode
              }
              $scope.list.push(temp1);
              $scope.loadMoreDataFlag = false;
            }
          } else {
            $scope.loadMoreDataFlag = false;
            if(nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(response){
            hmsPopup.hideLoading();
            hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        });
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //  hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        //});
      }

      function getProcessedList() {//已处理
        var url = baseConfig.sapUrl + 'Zhrwf00001';
        var param = {
          "ZHRWF00_001": {
            "FLAG": "Y",
            "UNAME": window.localStorage.empno.toUpperCase(),
            "PAGE": nowPage1,
            "PERPAGE": pageSize,
            "ALL": "",
            "T_TODOLIST": {
              "item": {
                "REL_NUMBER": "",
                "WF_TYPE": "",
                "REL_DATE": "",
                "REL_BY": "",
                "CONTENT": "",
                "REL_STATUS": ""
              }
            }
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          console.group('已处理list');
          console.info(angular.toJson(response,true));
          hmsPopup.hideLoading();
          if (response.T_TODOLIST !== "") {
            if (response.T_TODOLIST.item.constructor == Array) {
              if (response.T_TODOLIST.item.length > 0) {
                var list = response.T_TODOLIST.item;
                angular.forEach(list, function (item, index) {
                  var temp = {
                    id: item.REL_NUMBER,
                    title1: '',
                    type: workflowType,
                    typeValue: item.CONTENT.replace('\\n',''),
                    submit: workflowPerson,
                    submitPerson: item.REL_BY,
                    sendTime: workflowTime,
                    sendTimeValue: item.REL_DATE,
                    icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                    status: item.REL_STATUS,
                    WF_TYPE:item.WF_TYPE
                  };
                  if(item.WF_TYPE == '20'){ //请假申请的typeCode
                    temp.title1 = '请假审批';
                    temp.icon = 'build/img/application/approval-center-detail/leave-apply.png';
                  }
                  if(item.WF_TYPE == '01'){
                    temp.title1 = '录用审批';//录用申请申请的typeCode
                  }
                  if(item.WF_TYPE == '21'){
                    temp.title1 = '销假审批';//销假申请的typeCode
                    temp.icon = 'build/img/application/approval-center-detail/back-leave.png';
                  }
                  if(item.WF_TYPE == '04'){
                    temp.title1 = '转正审批';//销假申请的typeCode
                  }
                  $scope.list.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (response.T_TODOLIST.item.length < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              }
            } else {
              var temp1 = {
                id: response.T_TODOLIST.item.REL_NUMBER,
                title1: '',
                type: workflowType,
                typeValue: response.T_TODOLIST.item.CONTENT.replace('\\n',''),
                submit: workflowPerson,
                submitPerson: response.T_TODOLIST.item.REL_BY,
                sendTime: workflowTime,
                sendTimeValue: response.T_TODOLIST.item.REL_DATE,
                icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                status: response.T_TODOLIST.item.REL_STATUS,
                WF_TYPE:response.T_TODOLIST.item.WF_TYPE
              };
              if(response.T_TODOLIST.item.WF_TYPE == '20'){ //请假申请的typeCode
                temp1.title1 = '请假审批';
                temp1.icon = 'build/img/application/approval-center-detail/leave-apply.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '01'){
                temp1.title1 = '录用审批';//录用申请申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '21'){
                temp1.title1 = '销假审批';
                temp1.icon = 'build/img/application/approval-center-detail/back-leave.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '04'){
                temp1.title1 = '转正审批';
              }
              $scope.list.push(temp1);
              $scope.loadMoreDataFlag = false;
            }
          } else {
            $scope.loadMoreDataFlag = false;
            if(nowPage1 == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(response){
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        });
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //  hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        //});
      }

      function getMineApprovalList() {//我的
        var url = baseConfig.sapUrl + 'Zhrwf00003';
        var param = {
          "ZHRWF00_003": {
            "FLAG": "Y",
            "UNAME": window.localStorage.empno.toUpperCase(),
            "PAGE": nowPage2,
            "PERPAGE": pageSize,
            "ALL": "",
            "T_TODOLIST": {
              "item": {
                "REL_NUMBER": "",
                "WF_TYPE": "",
                "REL_DATE": "",
                "REL_BY": "",
                "CONTENT": "",
                "REL_STATUS": ""
              }
            }
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          if (response.T_TODOLIST !== "") {
            if (response.T_TODOLIST.item.constructor == Array) {
              if (response.T_TODOLIST.item.length > 0) {
                var list = response.T_TODOLIST.item;
                angular.forEach(list, function (item, index) {
                  var temp = {
                    id: item.REL_NUMBER,
                    title1: '',
                    type: workflowType,
                    typeValue: item.CONTENT.replace('\\n',''),
                    submit: workflowPerson,
                    submitPerson: item.REL_BY,
                    sendTime: workflowTime,
                    sendTimeValue: item.REL_DATE,
                    icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                    status: item.REL_STATUS,
                    WF_TYPE:item.WF_TYPE
                  };
                  if(item.WF_TYPE == '20'){ //请假申请的typeCode
                    temp.title1 = '请假申请';
                    temp.icon = 'build/img/application/approval-center-detail/leave-apply.png';
                  }
                  if(item.WF_TYPE == '01'){
                    temp.title1 = '录用审批';//录用申请申请的typeCode
                  }
                  if(item.WF_TYPE == '21'){
                    temp.title1 = '销假申请';//销假申请的typeCode
                    temp.icon = 'build/img/application/approval-center-detail/back-leave.png';
                  }
                  if(item.WF_TYPE == '04'){
                    temp.title1 = '转正审批';//销假申请的typeCode
                  }
                  if(item.WF_TYPE == '08'){
                    temp.title1 = '证明审批';//证明申请的typeCode
                  }
                  $scope.list.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (response.T_TODOLIST.item.length < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              }
            } else {
              var temp1 = {
                id: response.T_TODOLIST.item.REL_NUMBER,
                title1: '录用审批',
                type: workflowType,
                typeValue: response.T_TODOLIST.item.CONTENT.replace('\\n',''),
                submit: workflowPerson,
                submitPerson: response.T_TODOLIST.item.REL_BY,
                sendTime: workflowTime,
                sendTimeValue: response.T_TODOLIST.item.REL_DATE,
                icon: 'build/img/application/approval-center-detail/approvalIcon.png',
                status: response.T_TODOLIST.item.REL_STATUS,
                WF_TYPE:response.T_TODOLIST.item.WF_TYPE
              };
              if(response.T_TODOLIST.item.WF_TYPE == '20'){ //请假申请的typeCode
                temp1.title1 = '请假申请';
                temp1.icon = 'build/img/application/approval-center-detail/leave-apply.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '01'){
                temp1.title1 = '录用审批';//录用申请申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '21'){
                temp1.title1 = '销假申请';//销假申请的typeCode
                temp1.icon = 'build/img/application/approval-center-detail/back-leave.png';
              }
              if(response.T_TODOLIST.item.WF_TYPE == '04'){
                temp1.title1 = '转正审批';//转正申请的typeCode
              }
              if(response.T_TODOLIST.item.WF_TYPE == '08'){
                temp1.title1 = '证明审批';//证明申请的typeCode
              }
              $scope.list.push(temp1);
              $scope.loadMoreDataFlag = false;
            }
          } else {
            $scope.loadMoreDataFlag = false;
            if(nowPage2 == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(response){
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        })
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //  hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        //});
      }

      $scope.fetchTodoList = function () {
        $scope.listStatus = {
          todo: {
            selected: true
          },
          done: {
            selected: false
          },
          mine: {
            selected: false
          }
        };
        $scope.approvalStatus = "Untreated";
        $scope.list = [];
        nowPage = 0;
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getUntreatedList();
        $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
      };
      $scope.fetchDoneList = function () {
        $scope.listStatus = {
          todo: {
            selected: false
          },
          done: {
            selected: true
          },
          mine: {
            selected: false
          }
        };
        $scope.approvalStatus = "Processed";
        $scope.list = [];
        nowPage1 = 0;
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getProcessedList();
        $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
      };
      $scope.fetchMineList = function () {
        $scope.listStatus = {
          todo: {
            selected: false
          },
          done: {
            selected: false
          },
          mine: {
            selected: true
          }
        };
        $scope.approvalStatus = "mineApproval";
        $scope.list = [];
        nowPage2 = 0;
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getMineApprovalList();
        $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
      };
      $scope.refresh = function () {//下拉刷新
        $scope.list = [];
        $scope.noApprovalFlag = false;
        if ($scope.listStatus.todo.selected == true) {
          nowPage = 0;
          getUntreatedList();
        } else if ($scope.listStatus.done.selected == true) {
          nowPage1 = 0;
          getProcessedList();
        }  else if ($scope.listStatus.mine.selected == true) {
          nowPage2 = 0;
          getMineApprovalList();
        }
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      $scope.loadMoreData = function () {//上拉加载
        if ($scope.listStatus.todo.selected == true) {
          nowPage++;
          getUntreatedList();
        } else if ($scope.listStatus.done.selected == true) {
          nowPage1++;
          getProcessedList();
        } else if ($scope.listStatus.mine.selected == true) {
          nowPage2++;
          getMineApprovalList();
        }
      };

      if($scope.UpFlag == 'applyCenter') {//从申请中心进入我的申请
        $scope.fetchMineList();
      } else {
        getUntreatedList();
      }
      $scope.goCenterDetail = function (approvalList) {
        console.info(angular.toJson(approvalList,true));
        if ($scope.listStatus.todo.selected == true) {
          $scope.approvalStatus = "Untreated";
        } else if ($scope.listStatus.done.selected == true) {
          $scope.approvalStatus = "Processed";
        } else if ($scope.listStatus.mine.selected == true) {
          $scope.approvalStatus = "mineApproval";
        }
        if(approvalList.WF_TYPE == '01'){
          $state.go('tab.approval-center-detail', {approvalList: approvalList, approvalStatus: $scope.approvalStatus});
        }
        if(approvalList.WF_TYPE == '20'){
          $state.go('tab.holiday-approval', {rel_number: approvalList.id,approvalStatus: $scope.approvalStatus});
        }
        if(approvalList.WF_TYPE == '21'){
          $state.go('tab.fake-leave-approval-detail', {receiptNum: approvalList.id,approvalStatus: $scope.approvalStatus});
        }
        if(approvalList.WF_TYPE == '04'){
          $state.go('tab.positive-approval-detail', {rel_number: approvalList.id,approvalStatus: $scope.approvalStatus});
        }
      };

      $rootScope.$on("APPROVAL_SUCCESS",function(){//审批完成后 返回列表页面
        $scope.list = [];
        $scope.loadMoreDataFlag = false;
        nowPage = 0;
        getUntreatedList();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
        },200);
      });

      $rootScope.$on("CANCEL_SUCCESS",function(){//审批完成后 返回列表页面
        $scope.list = [];
        $scope.loadMoreDataFlag = false;
        nowPage2 = 0;
        getMineApprovalList();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop(false);
        },200);
      });
    }])


  /**
   * @author huanghao
   * @desc 一行一行的
   * charge-line-key ===> 左边的key
   * charge-line-value ===> 右边的value
   * col-left ====> 左边的key所占的行比例
   * col-right ====> 右边的value所占的比例
   */
  .directive('hmsChargeLine',function () {
    return{
      restrict: 'EA',
      replace: true,
      scope: {
        name: '=chargeLineKey',
        desc: '=chargeLineValue',
        colLeft: '@',
        colRight: '@'
      },
      template: '<div class="row">'+
      '<div class="col col-{{ colLeft }}" style="text-align: right">'+
      '<span>{{ name }}</span>&nbsp;:'+
      '</div>'+
      '<div class="col col-{{ colRight }}" style="text-align: left">'+
      '<span>{{ desc }}</span>'+
      '</div>'+
      '</div>',
      controller: ["$scope", function ($scope) {
      }],
      link: function (scope, element, attrs) {

      }
    }
  });


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

/**
 * Created by xuchengcheng on 2016/9/5.
 */
/**
 * Created by xuchengcheng on 2016/9/1.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.company-advisory-list', {
          url: '/company-advisory-list',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/company-advisory/company-advisory-list.html',
              controller: 'companyAdvisoryListCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('companyAdvisoryListCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService) {
      var nowPage = 1;
      $scope.companyAdvisoryList = [];
      $scope.moreDataCanBeLoaded = false;
      companyAdvisory();
      function companyAdvisory() {
        var url = baseConfig.mainImgPath + "news.do?";
        var params = {
          type: "1",
          pageNo: nowPage,
          genre: "INFOACT"
        };
        hmsPopup.showLoading("请稍后");
        getApplicationService.getMethod(url, params).success(function (response) {
          if (response.msg == "成功") {
            hmsPopup.hideLoading();
            angular.forEach(response.result, function (data, index, array) {
              $scope.companyAdvisoryList.push(array[index]);
            });
            if (response.result.length > 0) {
              $scope.moreDataCanBeLoaded = true;
              if (response.result.length < 9) {
                $scope.moreDataCanBeLoaded = false;
              }
            } else {
              $scope.moreDataCanBeLoaded = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("login response = " + angular.toJson(response));
          } else {
            hmsPopup.hideLoading();
            $scope.moreDataCanBeLoaded = false;
          }
        }).error(function () {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
        });
      }

      $scope.doRefresh = function () {//下拉刷新
        $scope.companyAdvisoryList = [];
        nowPage = 1;
        companyAdvisory();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.moreDataCanBeLoaded = false;
      };
      $scope.loadMore = function () {//上拉加载
        nowPage++;
        companyAdvisory();
      };

      $scope.goAdvisoryDetail = function (url) {
        // $state.go('tab.mainImgWebsite',{mainImgUrl:url});

        try {
          //if (device.platform == 'Android') {
          //  window.open(url, '_blank', 'location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
          //} else {
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
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);

/**
 * Created by xuchengcheng on 2016/9/5.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.company-notice', {
          url: '/company-notice',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/company-notice/company-notice.html',
              controller: 'companyNoticetCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('companyNoticetCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService) {
      var nowPage = 1;
      $scope.companyNoticeList = [];
      $scope.moreDataCanBeLoaded = false;
      companyNotice();
      function companyNotice() {
        var url = baseConfig.mainImgPath + "news.do?";
        var params = {
          type: "2",
          pageNo: nowPage
        };
        hmsPopup.showLoading("请稍后");
        getApplicationService.getMethod(url, params).success(function (response) {
          if(response.msg == "成功"){
            hmsPopup.hideLoading();
            angular.forEach(response.result, function(data, index, array){
              $scope.companyNoticeList.push(array[index]);
            });
            if(response.result.length > 0){
              $scope.moreDataCanBeLoaded = true;
              if(response.result.length < 9) {
                $scope.moreDataCanBeLoaded = false;
              }
            }else{
              $scope.moreDataCanBeLoaded = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("login response = " + angular.toJson(response));
          }else{
            hmsPopup.hideLoading();
            $scope.moreDataCanBeLoaded = false;
          }
        }).error(function () {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
        });
      }
      $scope.doRefresh = function(){//下拉刷新
        $scope.companyNoticeList = [];
        nowPage = 1;
        companyNotice();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.moreDataCanBeLoaded = false;
      };
      $scope.loadMore = function() {//上拉加载
        nowPage++;
        companyNotice();
      };

      $scope.goNoticeDetail = function (url) {
        //$state.go('tab.mainImgWebsite',{mainImgUrl:url});

        try{
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
        }catch(e){
          window.open(url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);

/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-apply-add', {
          url: '/tab.fake-leave-apply-add',
          params: {
            holidayInfo: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-apply-add.html',
              controller: 'FakeLeaveApplyAddCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('FakeLeaveApplyAddCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$cordovaDatePicker',
    '$filter',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$timeout',
    '$ionicHistory',
    'sweet',
    function ($scope,
              $state,
              $stateParams,
              $cordovaDatePicker,
              $filter,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $timeout,
              $ionicHistory,
              sweet) {
      $scope.holidayinfo = $stateParams.holidayInfo;//获取用于销假的请假信息
      console.info(angular.toJson($scope.holidayinfo, true));

      $scope.fakeLeaveAddDays = [];
      $scope.fakeLeaveAllDate = 0;
      $scope.noChooseDate = false;
      $scope.clickStatus = false;//解决插件请求过慢多次点击的问题
      $scope.endClickStatus = false;
      $scope.reasonInfo = {};
      $scope.showScrolls = true;
      $scope.hideScroll  = function(){
        $scope.showScrolls = false;
      };
      $scope.showScroll = function(){
        $scope.showScrolls = true;
      };
      $scope.addPeriod = function () {//添加销假时间段
        if ($scope.fakeLeaveAddDays.length != 0 && $scope.fakeLeaveAddDays[$scope.fakeLeaveAddDays.length - 1].fakeLeaveSectionDays == '') {
          hmsPopup.showShortCenterToast('请添加销假时间');
        } else {
          var param = {
            "fakeLeaveSectionStart": "",
            "fakeLeaveSectionEnd": "",
            "fakeLeaveSectionStartTime": "",
            "fakeLeaveSectionEndTime": "",
            "fakeLeaveSectionDays": "",
            "beginTime": "请选择开始时间",
            "endTime": "请选择结束时间"
          };
          $scope.fakeLeaveAddDays.push(param);
          $ionicScrollDelegate.resize();
        }
        $scope.showScrolls = true;
      };
      function getDateString(date) {//时间格式化
        return $filter('date')(date, 'yyyy-MM-dd');
      }

      function DateChecked(fakeLeaveTime, fakeLeaveInterval, holidayTime) {//校验日期是否在请假日期范围内
        if (holidayTime.BEGTIME == 'PM' && fakeLeaveInterval == 'AM') {
          if ((Date.parse(new Date(fakeLeaveTime.replace(/-/g, "\/")))) == (Date.parse(new Date(holidayTime.BEGDA.replace(/-/g, "\/"))))) {
            return true;
          }
        }
        if (holidayTime.ENDTIME == 'AM' && fakeLeaveInterval == 'PM') {
          if ((Date.parse(new Date(fakeLeaveTime.replace(/-/g, "\/")))) == ((Date.parse(new Date(holidayTime.ENDDA.replace(/-/g, "\/")))))) {
            return true;
          }
        }
        return false;
      }

      function DateChecked1(index, chooseTimes, fakeLeaveInterval, fakeLeaveTimes) {//校验日期是否与其他日期重合
        for (var i = 0; i < fakeLeaveTimes.length; i++) {
          if (i != index) {
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime == 'AM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime == 'AM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/")))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/"))) && fakeLeaveInterval == 'PM') {
                } else {
                  return true;
                  break;
                }
              }
            }
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime == 'AM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime == 'PM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/")))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                return true;
                break;
              }
            }
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime === 'PM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime === 'AM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))) && fakeLeaveInterval == 'AM') {
                } else if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/"))) && fakeLeaveInterval == 'PM') {
                } else {
                  return true;
                  break;
                }

              }
            }
            if (fakeLeaveTimes[i].fakeLeaveSectionStartTime == 'PM' && fakeLeaveTimes[i].fakeLeaveSectionEndTime == 'PM') {
              if ((Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) >= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))))) && (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) <= (Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionEnd.replace(/-/g, "\/")))))) {
                if (Date.parse(new Date(chooseTimes.replace(/-/g, "\/"))) == Date.parse(new Date(fakeLeaveTimes[i].fakeLeaveSectionStart.replace(/-/g, "\/"))) && fakeLeaveInterval == 'AM') {
                } else {
                  return true;
                  break;
                }
              }
            }
          }
        }
        return false;
      }


      /**
       *比较时间
       * @param d1
       * @param d2
       * @returns {boolean}
       * @constructor
       */
      function CompareDate(d1, d2) {
        var d1_time = d1.split(' ').splice(0, 1).join('');
        var d2_time = d2.split(' ').splice(0, 1).join('');
        var d1_interval = d1.split(' ').splice(1, 1).join('');
        var d2_interval = d2.split(' ').splice(1, 1).join('');
        console.log('d1_time  = ' + d1_time + 'd1_interval = ' + d1_interval);
        console.log('d2_time  = ' + d2_time + 'd2_interval = ' + d2_interval);
        if (d1_time == d2_time) {
          if (d1_interval == '下午' && d2_interval == '上午') {
            return true;
          }
        } else {
          //将所有的短横线替换为斜杠
          console.log('begin morethan end');
          return ((new Date(d1_time.replace(/-/g, "\/"))) > (new Date(d2_time.replace(/-/g, "\/"))));
        }

      }

      function initEndTime(index) {
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
        $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
      }

      function initBeginTime(index) {
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
        $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
        $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
      }

      $scope.chooseBeginTimes = function (index, beginTime) {
        $scope.clickStatus = true;
        console.log("第几条时间段：", index);
        var dic = {
          startDate: $scope.holidayinfo.BEGDA,
          endDate: $scope.holidayinfo.ENDDA,
          startTime: "7:30",
          endTime: "15:00",
          selectedDate: beginTime == '请选择开始时间' ? getDateString(new Date()) + ' 上午' : beginTime,
          title: "选择时间",
          type: "TYPE1"
        };
        //if(beginTime == '请选择开始时间'){
        //  delete dic.selectedDate
        //}
        console.info(angular.toJson(dic, true));
        CDXDatePicker.selectDate(function (date) {
          $scope.clickStatus = false;
          console.log('date = ' + date);
          $scope.fakeLeaveAddDays[index].beginTime = date;
          $scope.$apply();
          $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = date.split(' ').splice(0, 1).join('');
          // if(new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart).getDay() == 6 || new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart).getDay() == 0){
          //   hmsPopup.showShortCenterToast('销假开始时间不能以周末开始');
          //   initBeginTime(index);
          // }
          if (date.split(' ').splice(1, 1).join('') == '上午' || date.split(' ').splice(1, 1).join('') == 'AM'  ) {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = 'AM';
          } else if (date.split(' ').splice(1, 1).join('') == '下午' || date.split(' ').splice(1, 1).join('') == 'PM' ) {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = 'PM';
          }
          console.log('时间' + $scope.fakeLeaveAddDays[index].beginTime);
          if (DateChecked($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart, $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime, $scope.holidayinfo)) {//判断时间是否在请假日期范围内
            hmsPopup.showShortCenterToast('请选择在请假日期范围内的日期');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
            return;
          } else if (DateChecked1(index, $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart, $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime, $scope.fakeLeaveAddDays)) {//判断时间是否与其他时间段重合
            hmsPopup.showShortCenterToast('日期与其他销假日期重合,请重新选择');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
            return;
          } else if ($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd) { //判断是否小于结束日期
            if (CompareDate($scope.fakeLeaveAddDays[index].beginTime, $scope.fakeLeaveAddDays[index].endTime)) {
              hmsPopup.showShortCenterToast('开始日期大于结束日期,请重新选择');
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
              $scope.fakeLeaveAddDays[index].beginTime = '请选择开始时间';
              return;
            } else {
              //请假销假日期计算校验接口
              var dateCheckUrl = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.holidayinfo.AWART,
                  "I_BEGDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart,
                  "I_ENDDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd,
                  "I_ZBEGAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime,
                  "I_ZENDAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime
                }
              };
              hmsPopup.showLoading('请稍后');
              hmsHttp.post(dateCheckUrl, dateCheckParam).then(function (response) {
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = response.O_DAYS;
                  $scope.fakeLeaveAllDate = 0;
                  for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
                    $scope.fakeLeaveAllDate += Number($scope.fakeLeaveAddDays[i].fakeLeaveSectionDays);
                  }
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initBeginTime(index);
                }
              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initBeginTime(index);
              })
            }
          }
        }, function (error) {
          $scope.clickStatus = false;
          console.log('error');
        }, dic);
      };

      $scope.chooseEndDates = function (index, endTime) {//选择结束时间
        $scope.endClickStatus = true;
        console.log("第几条时间段：", index);


        var dic = {
          startDate: $scope.holidayinfo.BEGDA,
          endDate: $scope.holidayinfo.ENDDA,
          startTime: "7:30",
          endTime: "15:00",
          selectedDate: endTime == '请选择结束时间' ? getDateString(new Date()) + ' 上午' : endTime,
          title: "选择时间",
          type: "TYPE1"
        };
        //if(endTime == '请选择结束时间'){
        //  delete dic.selectedDate
        //}
        CDXDatePicker.selectDate(function (date) {
          $scope.endClickStatus = false;
          console.log('date = ' + date);
          $scope.fakeLeaveAddDays[index].endTime = date;
          $scope.$apply();
          $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = date.split(' ').splice(0, 1).join('');
          // if(new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd).getDay() == 6 || new Date($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd).getDay() == 0){
          //   hmsPopup.showShortCenterToast('销假结束时间不能以周末结束');
          //   initEndTime(index);
          // }
          if (date.split(' ').splice(1, 1).join('') == '上午' || date.split(' ').splice(1, 1).join('') == 'AM') {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = 'AM';
          } else if (date.split(' ').splice(1, 1).join('') == '下午' || date.split(' ').splice(1, 1).join('') == 'PM') {
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = 'PM';
          }
          console.log('时间' + $scope.fakeLeaveAddDays[index].endTime);
          if (DateChecked($scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd, $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime, $scope.holidayinfo)) {//判断时间是否在请假日期范围内
            hmsPopup.showShortCenterToast('请选择在请假日期范围内的日期');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
            return;
          } else if (DateChecked1(index, $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd, $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime, $scope.fakeLeaveAddDays)) {//判断时间是否与其他时间段重合
            hmsPopup.showShortCenterToast('日期与其他销假日期重合,请重新选择');
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
            $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
            $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
            return;
          } else if ($scope.fakeLeaveAddDays[index].fakeLeaveSectionStart) { //判断是否大于开始日期
            if (CompareDate($scope.fakeLeaveAddDays[index].beginTime, $scope.fakeLeaveAddDays[index].endTime)) {
              hmsPopup.showShortCenterToast('结束日期小于开始日期,请重新选择');
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime = '';
              $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = '';
              $scope.fakeLeaveAddDays[index].endTime = '请选择结束时间';
              return;
            } else {
              //请假销假日期计算校验接口
              var dateCheckUrl = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.holidayinfo.AWART,
                  "I_BEGDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStart,
                  "I_ENDDA": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEnd,
                  "I_ZBEGAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionStartTime,
                  "I_ZENDAP": $scope.fakeLeaveAddDays[index].fakeLeaveSectionEndTime
                }
              };
              console.log('dateCheckParam = ' + angular.toJson(dateCheckParam));
              hmsPopup.showLoading('请稍后');
              hmsHttp.post(dateCheckUrl, dateCheckParam).then(function (response) {
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  $scope.fakeLeaveAddDays[index].fakeLeaveSectionDays = response.O_DAYS;
                  $scope.fakeLeaveAllDate = 0;
                  for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
                    $scope.fakeLeaveAllDate += Number($scope.fakeLeaveAddDays[i].fakeLeaveSectionDays);
                  }
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initEndTime(index);
                }
              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initEndTime(index);
              })
            }
          }
        }, function (error) {
          $scope.endClickStatus = false;
          console.log('error');
        }, dic);
      };

      $scope.delFakeLeaveDays = function (index) {//删除时间段
        $scope.fakeLeaveAddDays.splice(index, 1);
        $scope.fakeLeaveAllDate = 0;
        for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
          $scope.fakeLeaveAllDate += Number($scope.fakeLeaveAddDays[i].fakeLeaveSectionDays);
        }
      };


      var fakeLeaveCommit = function () {
          var url = baseConfig.sapUrl + 'Zhrwf21_002';
          var param = {
            "ZHRWF21_002": {
              "ET_ZHRWF_021_S": {
                "item": $scope.timeInfoList
              },
              "I_CODE": "SUBMIT",
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZHRWF_021": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "REL_NUMBER20": $scope.holidayinfo.REL_NUMBER,
                "PERNR": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "AWART": "",
                "REL_STATUS": "",
                "BEGDA": "",
                "ZBEGAP": "",
                "ENDDA": "",
                "ZENDAP": "",
                "ABWTG": "",
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY":$scope.reasonInfo.reason,
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              }
            }
          };
          hmsPopup.showLoading('请稍后');
          hmsHttp.post(url, param).then(function (response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function () {
                hmsPopup.showShortCenterToast('新建销假成功');
              }, 200);
              $rootScope.$broadcast('FAKELEASE_REFRESH');
              $ionicHistory.goBack(-2);
            } else {
              hmsPopup.showShortCenterToast(response.O_MESSAGE);
            }
          }, function (response) {
            hmsPopup.hideLoading();
            hmsPopup.showShortCenterToast('调用失败,请检查网络');
          })

      };
      $scope.fakeLeaveCommitConfirm = function () {
         $scope.timeInfoList = [];
        console.log('fakeLeaveAddDays = ' + angular.toJson($scope.fakeLeaveAddDays));
        for (var i = 0; i < $scope.fakeLeaveAddDays.length; i++) {
          if ($scope.fakeLeaveAddDays[i].fakeLeaveSectionStart == "" || $scope.fakeLeaveAddDays[i].fakeLeaveSectionEnd == "") {
            $scope.noChooseDate = true;
          } else {
            $scope.noChooseDate = false;
          }
          if ($scope.fakeLeaveAddDays[i].fakeLeaveSectionStart != "" && $scope.fakeLeaveAddDays[i].fakeLeaveSectionEnd != "") {
            var timeInfo = {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_SEQNR": i + 1,
              "AWART": $scope.holidayinfo.AWART,
              "BEGDA": $scope.fakeLeaveAddDays[i].fakeLeaveSectionStart,
              "ZBEGAP": $scope.fakeLeaveAddDays[i].fakeLeaveSectionStartTime,
              "ENDDA": $scope.fakeLeaveAddDays[i].fakeLeaveSectionEnd,
              "ZENDAP": $scope.fakeLeaveAddDays[i].fakeLeaveSectionEndTime,
              "ABWTG": $scope.fakeLeaveAddDays[i].fakeLeaveSectionDays
            };
            $scope.timeInfoList.push(timeInfo);
          }
        }
        if($scope.timeInfoList.length == 0){
          hmsPopup.showPopup('请您添加销假时间段');
        }else if($scope.noChooseDate == true){
          hmsPopup.showShortCenterToast('销假开始日期和结束日期不能为空');
        }else{
          hmsPopup.confirm('您确定要提交销假申请吗?', '温馨提示', function (res) {
            if (res) {
              fakeLeaveCommit();
            }
          });
        }

      };
      $scope.goToPolicyDetail = function (typeFlag) {//跳转到相应的政策详情页
        // $state.go('tab.holiday-policy-detail', {typeFlag: typeFlag});
        try {
          cordova.ThemeableBrowser.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', {
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
          window.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      }

    }]);

/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-apply-detail', {
          url: '/tab.fake-leave-apply-detail',
          params: {
            relNumber: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-apply-detail.html',
              controller: 'FakeLeaveApplyDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('FakeLeaveApplyDetailCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$ionicHistory',
    '$rootScope',
    '$timeout',
    function ($scope,
              $state,
              $stateParams,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $ionicHistory,
              $rootScope,
              $timeout) {
      var url = baseConfig.sapUrl + 'Zhrwf21_005';
      var param = {
        "ZHRWF21_005": {
          "ET_ZHREL_HISTORY": {
            "item": {
              "MANDT": "",
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
              "REMARKS": ""
            }
          },
          "ET_ZHRWF_021": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_NUMBER20": "",
              "PERNR": "",
              "ENAME": "",
              "PERSA": "",
              "NAME1": "",
              "ORGEH": "",
              "ORGTX": "",
              "PLANS": "",
              "PLSTX": "",
              "ANSVH": "",
              "ATX": "",
              "AWART": "",
              "REL_STATUS": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": "",
              "ZFLAG_ATT": "",
              "ZPHOTO": "",
              "ZJTSY": "",
              "ZAPPR": "",
              "REMARKS": "",
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "CHANGE_ID": "",
              "CHANGE_ENAME": "",
              "CHANGE_PLANS": "",
              "CHANGE_PLSTX": "",
              "CHANGE_DATE": "",
              "CHANGE_TIME": "",
              "REL_FLAG_END": ""
            }
          },
          "ET_ZHRWF_021_S": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_SEQNR": "",
              "AWART": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": ""
            }
          },
          "I_RELNUMBER": $stateParams.relNumber
        }
      };
      hmsPopup.showLoading('请稍后');
      hmsHttp.post(url, param).then(function (response) {
        console.info(angular.toJson(response,true));
        hmsPopup.hideLoading();
        if (response.R_TYPE == 'S') {
          $scope.fakeLeaveDetail = response;
          $scope.fakeLeaveTime = [];
          $scope.fakeLeaveHistory = [];
          if (response.ET_ZHRWF_021_S.item.constructor == Array) {//销假时间段
            $scope.holidayAllDate = 0;
            angular.forEach(response.ET_ZHRWF_021_S.item, function (item, index) {
              var temp = {
                BEGDA: item.BEGDA,
                ENDDA: item.ENDDA,
                ZBEGAP: item.ZBEGAP,
                ZENDAP: item.ZENDAP,
                ABWTG: item.ABWTG
              };
              $scope.holidayAllDate += Number(temp.ABWTG);
              $scope.fakeLeaveTime.push(temp);
            })
          } else {
            $scope.holidayAllDate = 0;
            var temp = {
              BEGDA: response.ET_ZHRWF_021_S.item.BEGDA,
              ENDDA: response.ET_ZHRWF_021_S.item.ENDDA,
              ZBEGAP: response.ET_ZHRWF_021_S.item.ZBEGAP,
              ZENDAP: response.ET_ZHRWF_021_S.item.ZENDAP,
              ABWTG: response.ET_ZHRWF_021_S.item.ABWTG
            };
            $scope.holidayAllDate = Number(temp.ABWTG);
            $scope.fakeLeaveTime.push(temp);
          }
          if (response.ET_ZHREL_HISTORY.item.constructor == Array) {//审批历史
            angular.forEach(response.ET_ZHREL_HISTORY.item, function (item, index) {
              $scope.relStatus = "";
              if(item.REL_ACTION == 'SUBMIT'){
                $scope.relStatus = "提交";
              } else if(item.REL_ACTION == 'SAVE') {
                $scope.relStatus = "保存";
              } else if(item.REL_ACTION == 'REJECT') {
                $scope.relStatus = "拒绝";
              } else if(item.REL_ACTION == 'APPROVE') {
                $scope.relStatus = "同意";
              } else if(item.REL_ACTION == 'RETURN') {
                $scope.relStatus = "退回";
              } else if(item.REL_ACTION == 'CANCEL') {
                $scope.relStatus = "撤回";
              }
              var temp = {
                fakeLeaveTrackDate: item.REL_DATE + ' ' + item.REL_TIME,
                fakeLeaveTrackEmp: item.REL_ENAME,
                fakeLeaveTrackPosition: item.REL_PLSTX,
                fakeLeaveTrackStatus: $scope.relStatus,
                fakeLeaveTrackRemark: item.REMARKS
              };
              $scope.fakeLeaveHistory.push(temp);
              console.info('$scope.fakeLeaveHistory1 = '+angular.toJson($scope.fakeLeaveHistory,true));
            });
            if(response.ET_ZHRWF_021.item.NEXT_REL_ENAME != ''){//下一个审批人
              var temp1 = {
                fakeLeaveTrackDate: "",
                fakeLeaveTrackEmp: response.ET_ZHRWF_021.item.NEXT_REL_ENAME,
                fakeLeaveTrackPosition: response.ET_ZHRWF_021.item.NEXT_REL_PLSTX,
                fakeLeaveTrackStatus: '待审批',
                fakeLeaveTrackRemark: ''
              };
              $scope.fakeLeaveHistory.splice(0, 0, temp1);
            }
            console.info('$scope.fakeLeaveHistory2 = '+angular.toJson($scope.fakeLeaveHistory,true));
          } else {
            $scope.relStatus = "";
            if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'SUBMIT'){
              $scope.relStatus = "提交";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'SAVE') {
              $scope.relStatus = "保存";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'REJECT') {
              $scope.relStatus = "拒绝";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'APPROVE') {
              $scope.relStatus = "同意";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'RETURN') {
              $scope.relStatus = "退回";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'CANCEL') {
              $scope.relStatus = "撤回";
            }
            console.log($scope.relStatus);
            var temp = {
              fakeLeaveTrackDate: response.ET_ZHREL_HISTORY.item.REL_DATE + ' ' + response.ET_ZHREL_HISTORY.item.REL_TIME,
              fakeLeaveTrackEmp: response.ET_ZHREL_HISTORY.item.REL_ENAME,
              fakeLeaveTrackPosition: response.ET_ZHREL_HISTORY.item.REL_PLSTX,
              fakeLeaveTrackStatus: $scope.relStatus,
              fakeLeaveTrackRemark: response.ET_ZHREL_HISTORY.item.REMARKS
            };
            $scope.fakeLeaveHistory.push(temp);
            if(response.ET_ZHRWF_021.item.NEXT_REL_ENAME != ''){//下一个审批人
              var temp1 = {
                fakeLeaveTrackDate: "",
                fakeLeaveTrackEmp: response.ET_ZHRWF_021.item.NEXT_REL_ENAME,
                fakeLeaveTrackPosition: response.ET_ZHRWF_021.item.NEXT_REL_PLSTX,
                fakeLeaveTrackStatus: '待审批',
                fakeLeaveTrackRemark: ''
              };
              $scope.fakeLeaveHistory.splice(0, 0, temp1);
            }
          }
        } else {
          hmsPopup.showShortCenterToast(response.R_MESSAGE);
        }
      }, function (response) {
        hmsPopup.hideLoading();
        hmsPopup.showShortCenterToast('加载失败,请检查网络');
      });

     var cancelFakeLeave = function(relNumber) {//撤回按钮
        var url = baseConfig.sapUrl + 'Zhrwf21_002';
        var param = {
          "ZHRWF21_002": {
            "ET_ZHRWF_021_S": {
              "item": ""
            },
            "I_CODE": "CANCEL",
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZHRWF_021": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": relNumber,
              "REL_NUMBER20": "",
              "PERNR": "",
              "ENAME": "",
              "PERSA": "",
              "NAME1": "",
              "ORGEH": "",
              "ORGTX": "",
              "PLANS": "",
              "PLSTX": "",
              "ANSVH": "",
              "ATX": "",
              "AWART": "",
              "REL_STATUS": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": "",
              "ZFLAG_ATT": "",
              "ZPHOTO": "",
              "ZJTSY": "",
              "ZAPPR": "",
              "REMARKS": "",
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "CHANGE_ID": "",
              "CHANGE_ENAME": "",
              "CHANGE_PLANS": "",
              "CHANGE_PLSTX": "",
              "CHANGE_DATE": "",
              "CHANGE_TIME": "",
              "REL_FLAG_END": ""
            }
          }
        };
        hmsPopup.showLoading('请稍后');
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          if (response.O_TYPE == 'S') {
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            },200);
            $rootScope.$broadcast('FAKELEASE_REFRESH');
            $ionicHistory.goBack();
          } else {
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
            $rootScope.$broadcast('FAKELEASE_REFRESH');
            $ionicHistory.goBack();
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('调用失败,请检查网络');
        })
      };
      $scope.cancelFakeLeaveConfirm = function(relNumber){
        hmsPopup.confirm('您确定要撤销该次销假申请吗?','温馨提示',function(res){
          if(res){
            cancelFakeLeave(relNumber);
          }
        })
      }
    }]);


/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-apply-list', {
          url: '/tab.fake-leave-apply-list',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-apply-list.html',
              controller: 'FakeLeaveApplyListCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('FakeLeaveApplyListCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$timeout',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $timeout) {

      var holidayInfoUrl = baseConfig.sapUrl + 'Zhrwf20_002';
      var holidayInfoParam = {//请求拉取假期结余信息参数
        "ZHRWF20_002": {
          "ET_ZHR_YE": {
            "item": {
              "PERNR": "",
              "ZANZHL1": "",
              "ZANZHL2": "",
              "ZANZHL3": "",
              "ZANZHL4": ""
            }
          },
          "I_PERNR": "",
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_YEAR": new Date().getFullYear()
        }
      };

      var nowPage = '0';
      var pageSize = '10';
      $scope.holidayInfo = {};
      $scope.noApprovalFlag = false;
      $scope.fakeLeaveApplyList = [];
      $scope.loadMoreDataFlag = false;
      getHolidayInfo();
      getFakeLeaveApplyList();
      $scope.loadMoreData = function () {//上拉加载
        nowPage++;
        getFakeLeaveApplyList();
        console.log('load');
      };
      $scope.refresh = function () {//下拉刷新
        $scope.noApprovalFlag = false;
        $scope.fakeLeaveApplyList = [];
        nowPage = 0;
        getFakeLeaveApplyList();
        getHolidayInfo();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };

      function getHolidayInfo() {  //获取假期信息
        hmsHttp.post(holidayInfoUrl, holidayInfoParam).then(function (response) {
          $scope.holidayInfo.lastYearDays = response.ET_ZHR_YE.item.ZANZHL1 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL1;//上年年假结余
          $scope.holidayInfo.thisYearDays = response.ET_ZHR_YE.item.ZANZHL2 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL2;//本年年假结余
          $scope.holidayInfo.usedPaidSickLeave = response.ET_ZHR_YE.item.ZANZHL3 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL3;//带薪病假
          $scope.holidayInfo.compensatedLeave = response.ET_ZHR_YE.item.ZANZHL4 == '' ? 0 : response.ET_ZHR_YE.item.ZANZHL4;//调休假
        }, function (response) {
          hmsPopup.showShortCenterToast('获取假期信息失败');
        });
      }

      function getFakeLeaveApplyList() {//获取销假列表信息
        var fakeLeaveApplyUrl = baseConfig.sapUrl + 'Zhrwf21_004';
        var fakeLeaveApplyParam = {
          "ZHRWF21_004": {
            "ET_ZHRWF_021": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "REL_NUMBER20": "",
                "PERNR": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "AWART": "",
                "REL_STATUS": "",
                "BEGDA": "",
                "ZBEGAP": "",
                "ENDDA": "",
                "ZENDAP": "",
                "ABWTG": "",
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY": "",
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              }
            },
            "I_NUM": pageSize,
            "I_PAGE": nowPage,
            "I_USRID": window.localStorage.empno.toUpperCase()
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(fakeLeaveApplyUrl, fakeLeaveApplyParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假列表');
          console.info(angular.toJson(response,true));
          if (response.R_TYPE == 'E') {
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
            //hmsPopup.showShortCenterToast(response.R_MESSAGE);
          } else {
            if(response.ET_ZHRWF_021 == '') {
              $scope.noApprovalFlag = true;
              $scope.loadMoreDataFlag = false;
            } else {
              if (response.ET_ZHRWF_021.item.constructor == Array) { //返回的item是数组代表有数据
                var len = response.ET_ZHRWF_021.item.length;
                angular.forEach(response.ET_ZHRWF_021.item, function (item, index) {
                  var temp = {
                    'REL_NUMBER': item.REL_NUMBER,//单据号
                    'ABWTG': item.ABWTG,//请假天数
                    'AWART': item.AWART,//请假类型
                    'CREATE_DATE': item.CREATE_DATE,//年月日
                    'CREATE_TIME': item.CREATE_TIME, //时分秒
                    'REL_STATUS': item.REL_STATUS //当前审批状态
                  };
                  $scope.fakeLeaveApplyList.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (len < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              } else {
                var temp = {
                  'REL_NUMBER': response.ET_ZHRWF_021.item.REL_NUMBER,//单据号
                  'ABWTG': response.ET_ZHRWF_021.item.ABWTG,//请假天数
                  'AWART': response.ET_ZHRWF_021.item.AWART,//请假类型
                  'CREATE_DATE': response.ET_ZHRWF_021.item.CREATE_DATE,//开始时间年月日
                  'CREATE_TIME': response.ET_ZHRWF_021.item.CREATE_TIME, //时分秒
                  'REL_STATUS': response.ET_ZHRWF_021.item.REL_STATUS //当前审批状态
                };
                $scope.fakeLeaveApplyList.push(temp);
                $scope.loadMoreDataFlag = false;
              }
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取数据失败,请退出页面重试获取或联系管理员!');
        })
      }

      $rootScope.$on('FAKELEASE_REFRESH', function() {
        nowPage = 0;
        $scope.fakeLeaveApplyList = [];
        $scope.loadMoreDataFlag = false;
        $scope.noApprovalFlag = false;
        getHolidayInfo();
        getFakeLeaveApplyList();
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('fakeLeaveApplyHandle').scrollTop(false);
        },200);
      });

      $scope.goToDetail = function (relNumber) {
        $state.go('tab.fake-leave-apply-detail', {relNumber: relNumber});
      };

      $scope.addFakeLeave = function () {
        $state.go('tab.fake-leave-select');
      };

    }]);

/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-select', {
          url: '/tab.fake-leave-select',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/fake-leave-apply/fake-leave-select.html',
              controller: 'FakeLeaveSelectCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('FakeLeaveSelectCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate) {
      var nowPage = '0';
      var pageSize = '10';
      $scope.noApprovalFlag = false;
      $scope.requestHolidayList = [];
      $scope.loadMoreDataFlag = false;
      getRequestHolidayList();
      $scope.loadMoreData = function () {//上拉加载
        nowPage++;
        getRequestHolidayList();
        console.log('load');
      };
      $scope.refresh = function () {//下拉刷新
        $scope.noApprovalFlag = false;
        $scope.requestHolidayList = [];
        nowPage = 0;
        getRequestHolidayList();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      function getRequestHolidayList() {
        var holidayRequestUrl = baseConfig.sapUrl + 'Zhrwf21_001';
        var holidayRequestParam = {
          "ZHRWF21_001": {
            "ET_ZHRWF_020": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "PERNR": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "ZRZRQ": "",
                "AWART": "",
                "ZANZHL1": "",
                "ZANZHL2": "",
                "ZANZHL3": "",
                "ZANZHL4": "",
                "ZXJBJ": "",
                "REL_STATUS": "",
                "BEGDA": "",
                "ZBEGAP": "",
                "ENDDA": "",
                "ZENDAP": "",
                "ABWTG": "",
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY": "",
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              }
            },
            "I_BEGDA": '',
            "I_ENDDA": '',
            "I_USRID": window.localStorage.empno.toUpperCase()
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(holidayRequestUrl, holidayRequestParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假列表');
          console.info(angular.toJson(response, true));
          if (response.R_TYPE == 'E') {
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noApprovalFlag = true;
            }
            //hmsPopup.showShortCenterToast(response.R_MESSAGE);
          } else {
            if(response.ET_ZHRWF_020 == '') {//无数据
              $scope.noApprovalFlag = true;
              $scope.loadMoreDataFlag = false;
            } else {
              if (response.ET_ZHRWF_020.item.constructor == Array) { //返回的item是数组代表有数据
                var len = response.ET_ZHRWF_020.item.length;
                angular.forEach(response.ET_ZHRWF_020.item, function (item, index) {
                  var temp = {
                    'REL_NUMBER': item.REL_NUMBER,//单据号
                    'ABWTG': item.ABWTG,//请假天数
                    'AWART': item.AWART,//请假类型
                    'BEGDA': item.BEGDA,//操作日期
                    'NOW_REL_DATE': item.NOW_REL_DATE,//操作日期
                    'ENDDA': item.ENDDA, //结束时间年月日
                    'BEGTIME': item.ZBEGAP, //开始时间上午/下午标识（AM/PM）
                    'ENDTIME': item.ZENDAP, //结束时间上午/下午标识（AM/PM）
                    'CREATE_TIME': item.NOW_REL_TIME, //时分秒
                    'REL_STATUS': item.REL_STATUS, //当前审批状态
                    'REMARK': item.ZJTSY //请假具体事由
                  };
                  $scope.requestHolidayList.push(temp);
                });
                $scope.loadMoreDataFlag = true;
                if (len < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              } else {//一条数据的情况
                var temp = {
                  'REL_NUMBER': response.ET_ZHRWF_020.item.REL_NUMBER,//单据号
                  'ABWTG': response.ET_ZHRWF_020.item.ABWTG,//请假天数
                  'AWART': response.ET_ZHRWF_020.item.AWART,//请假类型
                  'BEGDA': response.ET_ZHRWF_020.item.BEGDA,//操作日期
                  'NOW_REL_DATE': response.ET_ZHRWF_020.item.NOW_REL_DATE,//操作日期
                  'ENDDA': response.ET_ZHRWF_020.item.ENDDA, //结束时间年月日
                  'BEGTIME': response.ET_ZHRWF_020.item.ZBEGAP, //开始时间上午/下午标识（AM/PM）
                  'ENDTIME': response.ET_ZHRWF_020.item.ZENDAP, //结束时间上午/下午标识（AM/PM）
                  'CREATE_TIME': response.ET_ZHRWF_020.item.NOW_REL_TIME, //时分秒
                  'REL_STATUS': response.ET_ZHRWF_020.item.REL_STATUS, //当前审批状态
                  'REMARK': response.ET_ZHRWF_020.item.ZJTSY //请假具体事由
                };
                $scope.requestHolidayList.push(temp);
                $scope.loadMoreDataFlag = false;
              }
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取数据失败,请退出页面重试获取或联系管理员!');
        })
      }

      $scope.goToAddFake = function (param) {
        $state.go('tab.fake-leave-apply-add', {holidayInfo: param});
      };

    }]);

/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.payroll-inquire-detail', {
          url: '/tab.payroll-inquire-detail',
          params: {
            payRollDetail: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/payroll-inquire/payroll-inquire-detail.html',
              controller: 'payrollInquireDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('payrollInquireDetailCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              $stateParams,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate) {
      $scope.arrowPath = true;
      $scope.arrowPath1 = true;
      $scope.arrowPath2 = true;
      $scope.arrowPath3 = true;
      $scope.arrowPath4 = true;
      $scope.arrowPath5 = true;

      $scope.showDetail = function () {
        $scope.arrowPath = !$scope.arrowPath;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail1 = function () {
        $scope.arrowPath1 = !$scope.arrowPath1;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail2 = function () {
        $scope.arrowPath2 = !$scope.arrowPath2;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail3 = function () {
        $scope.arrowPath3 = !$scope.arrowPath3;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail4 = function () {
        $scope.arrowPath4 = !$scope.arrowPath4;
        $ionicScrollDelegate.resize();
      };
      $scope.showDetail5 = function () {
        $scope.arrowPath5 = !$scope.arrowPath5;
        $ionicScrollDelegate.resize();
      };

      console.group('工资单详情');
      console.info(angular.toJson($stateParams.payRollDetail, true));
      $scope.payRollDetail = $stateParams.payRollDetail;//工资单详细信息
      $scope.NZJGRSDS = Number($scope.payRollDetail.ZZ404);//年终奖个人所得税
      $scope.SFGZ = Number($scope.payRollDetail.ZZ560);//实发工资
      $scope.GRSDS = Number($scope.payRollDetail.ZZ403);//个人所得税
      $scope.SYJS = Number($scope.payRollDetail.ZZ552);//上月结算
      $scope.JBGZ = Number($scope.payRollDetail.ZBET01);//基本工资
      $scope.TZHJBGZ = Number($scope.payRollDetail.Z1000);//调整后基本工资
      $scope.GWJT = Number($scope.payRollDetail.ZBET02);//岗位津贴
      $scope.TZHGWJT = Number($scope.payRollDetail.Z1010);//调整后岗位津贴
      $scope.JBGZHJ = Number($scope.payRollDetail.Z1000) + Number($scope.payRollDetail.Z1010); //基本工资合计
      $scope.JCBZ = Number($scope.payRollDetail.Z2010);//机场补助
      $scope.mealAllowance = Number($scope.payRollDetail.Z2020) + Number($scope.payRollDetail.Z2030);//餐费补助
      $scope.TXBZ = Number($scope.payRollDetail.Z2040);//通讯补助
      $scope.YBBZ = Number($scope.payRollDetail.Z2000);//夜班补助
      $scope.CSGBZ = Number($scope.payRollDetail.Z2060);//超时工补助
      $scope.GWBZ = Number($scope.payRollDetail.Z2070);//高温补助
      $scope.JTBT = Number($scope.payRollDetail.Z2080);//交通补助
      $scope.QTBT = Number($scope.payRollDetail.Z2090);//其他补助
      $scope.SQTZ = Number($scope.payRollDetail.Z2100);//税前调整
      $scope.MDJJ = Number($scope.payRollDetail.Z3000);//门店奖金
      $scope.XSJJ = Number($scope.payRollDetail.Z3010);//销售奖金
      $scope.JXJJ = Number($scope.payRollDetail.Z3020);//绩效奖金
      $scope.QTJJ = Number($scope.payRollDetail.Z3030);//其他奖金
      $scope.BKK = Number($scope.payRollDetail.Z2110);//补扣款
      $scope.overTimePay = Number($scope.payRollDetail.Z4000) + Number($scope.payRollDetail.Z4010) + Number($scope.payRollDetail.Z4020);//加班费
      $scope.BJKK = Number($scope.payRollDetail.Z4040);//病假扣款
      $scope.SJKK = Number($scope.payRollDetail.Z4050);//事假扣款
      $scope.CJKK = Number($scope.payRollDetail.Z4060);//产假扣款
      //税前收入与扣减合计
      $scope.SQSRYKJHJ = Number($scope.payRollDetail.Z2010) + Number($scope.payRollDetail.Z2020) + Number($scope.payRollDetail.Z2030) + Number($scope.payRollDetail.Z2040) + Number($scope.payRollDetail.Z2000) + Number($scope.payRollDetail.Z2060) + Number($scope.payRollDetail.Z2070) + Number($scope.payRollDetail.Z2080) + Number($scope.payRollDetail.Z2090) + Number($scope.payRollDetail.Z2100) + Number($scope.payRollDetail.Z3000) + Number($scope.payRollDetail.Z3010) + Number($scope.payRollDetail.Z3020) + Number($scope.payRollDetail.Z3030) + Number($scope.payRollDetail.Z2110) + Number($scope.payRollDetail.Z4000) + Number($scope.payRollDetail.Z4010) + Number($scope.payRollDetail.Z4020) + Number($scope.payRollDetail.Z4040) + Number($scope.payRollDetail.Z4050) + Number($scope.payRollDetail.Z4060);
      $scope.ZFGJJYGSJ = Number($scope.payRollDetail.ZZ362);//住房公积金员工实缴
      $scope.ZFGJJYGBJ = Number($scope.payRollDetail.Z9091);//住房公积金个人补缴
      $scope.SHBXYGBJ = Number($scope.payRollDetail.Z9041) + Number($scope.payRollDetail.Z9051) + Number($scope.payRollDetail.Z9061);//社会保险员工补缴
      $scope.DEYLYGSJ = Number($scope.payRollDetail.Z9021);//大额医疗员工实缴
      $scope.ZHBXGRSJ = Number($scope.payRollDetail.Z9031);//综合保险个人实缴
      $scope.YLBXGRSJ = Number($scope.payRollDetail.ZZ313);//养老保险个人实缴
      $scope.SYBXGRSJ = Number($scope.payRollDetail.ZZ323);//失业保险个人实缴
      $scope.YILBXGRSJ = Number($scope.payRollDetail.ZZ333);//医疗保险个人实缴
      $scope.SBTZGR = Number($scope.payRollDetail.Z9111);//社保调整(个人)
      $scope.ZFGJJQYSJ = Number($scope.payRollDetail.ZZ363);//住房公积金企业实缴
      $scope.ZFGJJQYBJ = Number($scope.payRollDetail.Z9090);//住房公积金企业补缴
      $scope.DEYLQYJN = Number($scope.payRollDetail.Z9020);//大额医疗企业缴纳
      $scope.ZHBXQYJN = Number($scope.payRollDetail.Z9030);//综合保险企业缴纳
      $scope.SBTZQY = Number($scope.payRollDetail.Z9110);//社保调整(企业)
      $scope.YLBXQYSJ = Number($scope.payRollDetail.ZZ314);//养老保险企业实缴
      $scope.SYBXQYSJ = Number($scope.payRollDetail.ZZ324);//失业保险企业实缴
      $scope.YILBXQYSJ = Number($scope.payRollDetail.ZZ334);//医疗保险企业实缴
      $scope.GSBXQYSJ = Number($scope.payRollDetail.ZZ344);//工伤保险企业实缴
      $scope.SYUBXQYSJ = Number($scope.payRollDetail.ZZ354);//生育保险企业实缴
      //社会保险企业补缴
      $scope.SHBXQYBJ = Number($scope.payRollDetail.Z9040) + Number($scope.payRollDetail.Z9050) + Number($scope.payRollDetail.Z9060) + Number($scope.payRollDetail.Z9070) + Number($scope.payRollDetail.Z9080);
      //社保/公积金合计
      $scope.SBGJJHJ = Number($scope.payRollDetail.ZZ313) + Number($scope.payRollDetail.ZZ323) + Number($scope.payRollDetail.ZZ333) + Number($scope.payRollDetail.ZZ362) + Number($scope.payRollDetail.Z9021) + Number($scope.payRollDetail.Z9031) + Number($scope.payRollDetail.Z9041) + Number($scope.payRollDetail.Z9051) + Number($scope.payRollDetail.Z9061) + Number($scope.payRollDetail.Z9091) + Number($scope.payRollDetail.Z9111);
      $scope.SHTZ = Number($scope.payRollDetail.Z2120);//税后调整
      $scope.JJBCJ = Number($scope.payRollDetail.Z3060);//经济补偿金
      //税后扣减及累计合计
      $scope.SHKCJLJHJ = Number($scope.payRollDetail.Z2120) + Number($scope.payRollDetail.Z3060);

    }]);

/**
 * Created by xuchengcheng on 2016/11/2.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.payroll-inquire-list', {
          url: '/tab.payroll-inquire-list',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/payroll-inquire/payroll-inquire-list.html',
              controller: 'payrollInquireListCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('payrollInquireListCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate) {
      var nowPage = '0';
      var pageSize = '10';
      $scope.noPayRollFlag = false;
      $scope.payRollInquireList = [];
      $scope.loadMoreDataFlag = false;
      getPayRollInquireList();
      $scope.loadMoreData = function () {//上拉加载
        nowPage++;
        getPayRollInquireList();
        console.log('load');
      };
      $scope.refresh = function () {//下拉刷新
        $scope.noPayRollFlag = false;
        $scope.payRollInquireList = [];
        nowPage = 0;
        getPayRollInquireList();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loadMoreDataFlag = false;
      };
      function getPayRollInquireList() {//获取销假列表信息
        var url = baseConfig.sapUrl + 'Zhrwf32_001';
        var param = {
          "ZHRWF32_001": {
            "ET_ZHRWF_032": {
              "item": {
                "MANDT": "",
                "PERNR": "",
                "INPER": "",
                "PAYTY": "",
                "ICNUM": "",
                "ENAME": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "ZRZRQ": "",
                "ZQYDW": "",
                "ZQYDWT": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "WAERS": "",
                "ZBET01": "",
                "Z1000": "",
                "Z1010": "",
                "Z2010": "",
                "Z2020": "",
                "Z2030": "",
                "Z2040": "",
                "Z2000": "",
                "Z2060": "",
                "Z2070": "",
                "Z2080": "",
                "Z2090": "",
                "Z2100": "",
                "Z3000": "",
                "Z3010": "",
                "Z3020": "",
                "Z3030": "",
                "Z3050": "",
                "Z2110": "",
                "Z4000": "",
                "Z4010": "",
                "Z4020": "",
                "Z4040": "",
                "Z4050": "",
                "ZZ362": "",
                "Z9041": "",
                "Z9051": "",
                "Z9061": "",
                "Z9091": "",
                "Z9021": "",
                "Z9031": "",
                "ZZ313": "",
                "ZZ323": "",
                "ZZ333": "",
                "Z2120": "",
                "Z3060": "",
                "ZBANKN": "",
                "ZZ403": "",
                "ZZ404": "",
                "ZZ560": "",
                "ZZSUM": "",
                "ZZ552": ""
              }
            },
            "I_BEGDA": "",
            "I_ENDDA": "",
            "I_NUM": pageSize,
            "I_PAGE": nowPage,
            "I_USRID": window.localStorage.empno.toUpperCase()
            //"I_USRID": "HAND02"
          }
        };
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          console.group('工资单列表');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'E') {
            $scope.loadMoreDataFlag = false;
            if (nowPage == 0) {//如果第一页数据为空的话提示无数据
              $scope.noPayRollFlag = true;
            }
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
          } else {
            if(response.ET_ZHRWF_032 == ''){//无数据
              $scope.noPayRollFlag = true;
              $scope.loadMoreDataFlag = false;
            } else {
              if (response.ET_ZHRWF_032.item.constructor == Array) { //返回的item是数组代表有数据
                var len = response.ET_ZHRWF_032.item.length;
                angular.forEach(response.ET_ZHRWF_032.item, function (item, index) {
                  $scope.payRollInquireList.push(item);
                });
                $scope.loadMoreDataFlag = true;
                if (len < pageSize) {
                  $scope.loadMoreDataFlag = false;
                }
              } else {
                $scope.payRollInquireList.push(response.ET_ZHRWF_032.item);
                $scope.loadMoreDataFlag = false;
              }
            }
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取数据失败,请退出页面重试获取或联系管理员!');
        })
      }

      $scope.goToPayrollDetail = function(detail) {
        $state.go('tab.payroll-inquire-detail', {payRollDetail: detail});
      };

    }]);

/**
 * Created by xuchengcheng on 2016/9/5.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.platform-employed', {
          url: '/platform-employed',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/platform-employed/platform-employed.html',
              controller: 'platformEmployedCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('platformEmployedCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService) {
      var nowPage = 1;
      $scope.platformEmployedList = [];
      $scope.moreDataCanBeLoaded = false;
      platformEmployed();
      function platformEmployed() {
        var url = baseConfig.mainImgPath + "news.do?";
        var params = {
          type: "4",
          pageNo: nowPage
        };
        hmsPopup.showLoading("请稍后");
        getApplicationService.getMethod(url, params).success(function (response) {
          if(response.msg == "成功"){
            hmsPopup.hideLoading();
            angular.forEach(response.result, function(data, index, array){
              $scope.platformEmployedList.push(array[index]);
            });
            if(response.result.length > 0){
              $scope.moreDataCanBeLoaded = true;
              if(response.result.length < 9) {
                $scope.moreDataCanBeLoaded = false;
              }
            }else{
              $scope.moreDataCanBeLoaded = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("login response = " + angular.toJson(response));
          }else{
            hmsPopup.hideLoading();
            $scope.moreDataCanBeLoaded = false;
          }
        }).error(function () {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
        });
      }
      $scope.doRefresh = function(){//下拉刷新
        $scope.platformEmployedList = [];
        nowPage = 1;
        platformEmployed();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.moreDataCanBeLoaded = false;
      };
      $scope.loadMore = function() {//上拉加载
        nowPage++;
        platformEmployed();
      };

      $scope.goEmployedListDetail = function (url) {
        //$state.go('tab.mainImgWebsite',{mainImgUrl:url});

        try{
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
        }catch(e){
          window.open(url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);

/**
 * Created by xuchengcheng on 2017/3/7.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.prove-application-detail', {
          url: '/prove-application-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/prove-application/prove-application-detail.html',
              controller: 'proveApplicationDetailCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('proveApplicationDetailCtrl', [
    '$scope',
    '$rootScope',
    'baseConfig',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    '$timeout',
    function ($scope,
              $rootScope,
              baseConfig,
              $state,
              $stateParams,
              $ionicHistory,
              hmsPopup,
              hmsHttp,
              $timeout) {
      $scope.proveApplication = {
        "reason": ""
      };
      $scope.chooseTypeFlag = false;
      $scope.typeValue = "";
      $scope.proveType = "";

      $rootScope.$on('CHOOSE_PROVE_TYPE', function(event,data) {
        $scope.chooseTypeFlag = true;
        $scope.typeValue = data.name;
        $scope.proveType = data.code;
      });

      $scope.chooseProveType = function() {
        $state.go('tab.prove-application-type');
      };

      $scope.proveCommit = function () {
        if($scope.proveType === ''){
          hmsPopup.showShortCenterToast("请选择证明类型");
        } else {
          var url = baseConfig.sapUrl + 'Zhrwf08_001';
          var param = {
            "ZHRWF08_001": {
              "ET_PROOF": {
                "item": {
                  "MANDT": "",
                  "ZPERNR": "",
                  "ZTYPE": "",
                  "WF_TYPE": "",
                  "REL_NUMBER": "",
                  "ZPTX": "",
                  "ZNAME": "",
                  "ZBIRTH": "",
                  "GESCH": "",
                  "ICNUM_TYPE": "",
                  "ZIDNUM": "",
                  "ZEDATE": "",
                  "ZENDATE": "",
                  "ZRDATE": "",
                  "CREATE_DATE": "",
                  "PERSA": "",
                  "NAME1": "",
                  "ORGEH": "",
                  "ORGTX": "",
                  "ZQYDWWB": "",
                  "PLANS": "",
                  "PLSTX": "",
                  "MINCOME": "",
                  "YINCOME": "",
                  "RTE_CURR": "",
                  "STATUS": "",
                  "REASON": $scope.proveApplication.reason,
                  "NEXT_REL_STEP": "",
                  "NEXT_REL_ID": "",
                  "NEXT_REL_ENAME": "",
                  "NEXT_REL_PLANS": "",
                  "NEXT_REL_PLSTX": "",
                  "RESIGN_STATUS": ""
                }
              },
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "Z_FIELD": "SAVE",
              "Z_TYPE": $scope.proveType
            }
          };
          hmsPopup.showLoading('请稍候');
          hmsHttp.post(url, param).then(function (result) {
            if (baseConfig.debug) {
              console.log("result success " + angular.toJson(result));
            }
            hmsPopup.hideLoading();
            if (result.O_TYPE == "S") {
              $timeout(function () {
                hmsPopup.showShortCenterToast('提交成功');
              }, 200);
              $ionicHistory.goBack();
            } else {
              var message = result.O_MESSAGE;
              hmsPopup.showVeryShortCenterToast(message);
            }
          }, function (response) {
            hmsPopup.hideLoading();
            if (baseConfig.debug) {
              console.log("response error " + angular.toJson(response));
            }
          });
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);

/**
 * Created by xuchengcheng on 2017/3/7.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.prove-application-type', {
          url: '/prove-application-type',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/prove-application/prove-application-type.html',
              controller: 'proveApplicationTypeCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('proveApplicationTypeCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    '$rootScope',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              $rootScope) {
      $scope.proveTypeList = [
        {
          'name':'在职证明',
          'src':'build/img/application/holiday-type/1.png',
          'code':'01'
        },
        {
          'name':'收入证明',
          'src':'build/img/application/holiday-type/2.png',
          'code':'03'
        }
      ];

      $scope.chooseProveType = function (item) {
        $rootScope.$broadcast('CHOOSE_PROVE_TYPE',item);
        $ionicHistory.goBack();
      };

      $scope.lastLineHide = function(index, itemList) {//去除最后一行的底部边线
        if(index == (itemList.length - 1)){
          return false;
        } else {
          return true;
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);

/**
 * Created by xuchengcheng on 2016/9/5.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.social-activity', {
          url: '/social-activity',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/social-activity/social-activity.html',
              controller: 'socialActivityCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('socialActivityCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService) {
      var nowPage = 1;
      $scope.socialActivityList = [];
      $scope.moreDataCanBeLoaded = false;
      socialActivity();
      function socialActivity() {
        var url = baseConfig.mainImgPath + "news.do?";
        var params = {
          type: "3",
          pageNo: nowPage
        };
        hmsPopup.showLoading("请稍后");
        getApplicationService.getMethod(url, params).success(function (response) {
          if(response.msg == "成功"){
            hmsPopup.hideLoading();
            angular.forEach(response.result, function(data, index, array){
              $scope.socialActivityList.push(array[index]);
            });
            if(response.result.length > 0){
              $scope.moreDataCanBeLoaded = true;
              if(response.result.length < 9) {
                $scope.moreDataCanBeLoaded = false;
              }
            }else{
              $scope.moreDataCanBeLoaded = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("login response = " + angular.toJson(response));
          }else{
            hmsPopup.hideLoading();
            $scope.moreDataCanBeLoaded = false;
          }
        }).error(function () {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('处理请求失败,请确认网络连接是否正常,或者联系管理员!');
        });
      }
      $scope.doRefresh = function(){//下拉刷新
        $scope.socialActivityList = [];
        nowPage = 1;
        socialActivity();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.moreDataCanBeLoaded = false;
      };
      $scope.loadMore = function() {//上拉加载
        nowPage++;
        socialActivity();
      };

      $scope.goActivityDetail = function (url) {
        //$state.go('tab.mainImgWebsite',{mainImgUrl:url});
        //window.open(url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');

        try{
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
        }catch(e){
          window.open(url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      };

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }]);

/**
 * Created by wolf on 2016/7/5.
 * -wen.dai-
 */
'use strict';
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.employeeDetail', {
          url: 'contact/employeeDetail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/detail/employee-detail.html',
              controller: 'contactEmployeeDetailCtl'
            }
          },
          params: {
            'employeeNumber': ""
          }
        });
    }]);
angular.module('applicationModule')
  .controller('contactEmployeeDetailCtl', [
    '$scope',
    '$ionicScrollDelegate',
    '$ionicModal',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicHistory',
    '$stateParams',
    'imService',
    '$ionicActionSheet',
    'contactService',
    '$cordovaActionSheet',
    '$rootScope',
    '$state',
    function ($scope,
              $ionicScrollDelegate,
              $ionicModal,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicHistory,
              $stateParams,
              imService,
              $ionicActionSheet,
              contactService,
              $cordovaActionSheet,
              $rootScope,
              $state) {
      /**
       * var section
       */
      {
        var getEmployeeImgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';

        // $rootScope.$on('toEmployeeDetail',function (event,data) {
        //   $scope.employeeNumber = data;
        //   console.log("$scope.employeeNumber = "+$scope.employeeNumber);
        //   initEmployeeData();
        // });
        // console.log("$scope.employeeNumber = "+$scope.employeeNumber);
        var getEmployeeDetailUrl = baseConfig.sapUrl + "ZhrEmployeeList";
        // var employeeDetailParams = {key: $stateParams.employeeNumber};
        var employeeDetailParams = {
          "ZHR_EMPLOYEE_LIST": {
            "PERNR": $stateParams.employeeNumber,
            "UNAME": window.localStorage.empno,
            "T_P0000": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "MASSN": "",
                "MNTXT": "",
                "MASSG": "",
                "MGTXT": ""
              }
            },
            "T_P0001": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "BUKRS": "",
                "BUTXT": "",
                "PERSG": "",
                "PGTXT": "",
                "PERSK": "",
                "PTEXT": "",
                "WERKS": "",
                "NAME1": "",
                "BTRTL": "",
                "BTEXT": "",
                "ABKRS": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ENAME": ""
              }
            },
            "T_P0002": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "GESCH": "",
                "GBDAT": "",
                "NATTX": "",
                "LANDX": "",
                "FTEXT": ""
              }
            },
            "T_P0041": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "DAT01": "",
                "DAT02": "",
                "DAT03": ""
              }
            },
            "T_P0105": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "SUBTY": "",
                "STEXT": "",
                "USRID": "",
                "USRID_LONG": ""
              }
            },
            "T_P0185": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ICTYP": "",
                "ICTXT": "",
                "ICNUM": ""
              }
            },
            "T_P0529": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "RACKY": "",
                "LTEXT": ""
              }
            },
            "T_P0534": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "PCODE": "",
                "PTEXT": ""
              }
            },
            "T_P9001": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHKLX": "",
                "ZHKLXMS": "",
                "ZHKSZD": "",
                "ZSFJTHK": "",
                "ZHKZCSJ": "",
                "ZSSPCS": "",
                "ZHKDQ": ""
              }
            },
            "T_P9002": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZXL": "",
                "ZXLMS": "",
                "ZZGXL": "",
                "ZSZXX": "",
                "ZZY": "",
                "ZXW": "",
                "ZXWMS": "",
                "ZZGXW": "",
                "ZXZ": "",
                "ZXZMS": "",
                "ZXLQDFS": "",
                "ZXLQDFSMS": ""
              }
            },
            "T_P9003": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZYZ": "",
                "ZYZMS": "",
                "ZSLDJ": "",
                "ZSLDJMS": "",
                "ZYYDJ": "",
                "ZYYDJMS": "",
                "ZBZ": ""
              }
            },
            "T_P9004": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHTLX": "",
                "ZHTLXMS": "",
                "ZSYQRQ": "",
                "ZBYSJ": "",
                "ZQDLB": "",
                "ZQDLBMS": "",
                "ZPQJG": "",
                "ZQYDW": "",
                "ZQYDWWB": "",
                "ZYGFS": "",
                "ZYGFSMS": "",
                "ZGSZD": "",
                "ZGSZDMS": ""
              }
            },
            "T_P9005": {
              "item": {
                "ENDDA": "",
                "BEGDA": "",
                "ZCZYY": "",
                "ZCZYYMS": "",
                "ZBZ": ""
              }
            },
            "T_P9006": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZJZLX": "",
                "ZJZLXMS": "",
                "ZCCLZRQ": "",
                "ZJZBH": ""
              }
            },
            "T_P9007": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZDZBH": "",
                "ZCCDD": "",
                "ZCCDDMS": "",
                "ZCDSJ": "",
                "ZDCSJ": "",
                "ZTDSJ": "",
                "ZDCYY": "",
                "ZDCYYMS": ""
              }
            },
            "T_P9008": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHDSJ": "",
                "ZZSMC": "",
                "ZZSMCMS": "",
                "ZZCDD": "",
                "ZSCRQ": "",
                "ZDQRQ": ""
              }
            },
            "T_P9009": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZJCLB": "",
                "ZJCLBWB": "",
                "ZJCNR": "",
                "ZJCNRWB": "",
                "ZJE": "",
                "ZLY": ""
              }
            },
            "T_P9010": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZJTXM": "",
                "ZJTXB": "",
                "ZGX": "",
                "ZGXMS": "",
                "ZJTDH": "",
                "ZJTDZ": "",
                "ZCSRQ": "",
                "ZGZDW": "",
                "ZGZZW": "",
                "ZSFLXR": ""
              }
            },
            "T_P9011": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZQRGS": "",
                "ZZW": "",
                "ZBZ": ""
              }
            },
            "T_P9012": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZGZDZ": "",
                "ZHJDZ": "",
                "ZCZDZ": "",
                "ZGW": "",
                "ZYB": ""
              }
            },
            "T_P9013": {
              "item": {
                "BEGDA": "",
                "ENDDA": "",
                "ZHR_ZCLX": "",
                "ZHR_ZCBM": "",
                "ZHR_PP": "",
                "ZHR_XH": "",
                "ZHR_XLH": "",
                "ZHR_DQJZ": "",
                "ZHR_FFRQ": "",
                "ZHR_SFGH": "",
                "ZHR_GHRQ": ""
              }
            }
          }
        };
        if (ionic.Platform.isIOS()) {
          angular.element('.common-head').css('paddingTop', '20px');
        }
        $scope.employeeInfo = {}; //存储查询员工的详细信息
        // $scope.contactLoading = true; //默认显示loading加载
        var LINK_MAN = window.localStorage.empno + 'common_linkman2';
        var employeeBaseInfo = {
          tel: '',
          name: '',
          employeeNumber: '',
          imgUrl: ''
        };
        // $rootScope.employeeDetailFlag = true;
      }

      //放大显示头像
      $scope.showBigImage = function (imageName) {
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        console.log("imageName = " + imageName);
        $scope.url = imageName;
        $scope.showModal('build/pages/contact/detail/modal/photo-zoom.html');
      };
      $scope.showModal = function (templateUrl) {//显示原图
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.hideBigImage = function () {
        $scope.modal.hide();
        $scope.modal.remove();
      };


      /**
       *  获取员工的详细信息数据--
       */
      function initEmployeeData() {
        hmsPopup.showLoading("正在加载");
        hmsHttp.post(getEmployeeDetailUrl, employeeDetailParams).then(function (response) {
          hmsPopup.hideLoading();
          var contactItem = response.T_P0105.item;
          var self_email = '';
          var work_email = '';
          var self_mobil = '';
          var work_mobil = '';
          angular.forEach(contactItem, function (item, index) {
            if (item.STEXT === "个人邮箱") {
              self_email = item.USRID_LONG;
            }
            if (item.STEXT === "移动电话") {
              self_mobil = item.USRID_LONG;
            }
            if (item.STEXT === "办公电话") {
              work_mobil = item.USRID_LONG;
            }
            if (item.STEXT === "办公邮箱") {
              work_email = item.USRID_LONG;
            }
          });
          $scope.employeeInfo.emp_code = $stateParams.employeeNumber;
          $scope.employeeInfo.emp_name = response.T_P0001.item.ENAME;
          $scope.employeeInfo.sex = response.T_P0002.item.GESCH;
          $scope.employeeInfo.rootUnitName = response.T_P0001.item.ORGTX;
          $scope.employeeInfo.position_name = response.T_P0001.item.PLSTX;
          $scope.employeeInfo.emp_status = response.T_P0001.item.PTEXT;
          if (response.T_P9012 == "") {
            $scope.employeeInfo.base_name = "";
          } else {
            $scope.employeeInfo.base_name = response.T_P9012.item.ZGZDZ;
            $scope.employeeInfo.workStation = response.T_P9012.item.ZGW;
          }
          $scope.employeeInfo.slefEmail = self_email;
          $scope.employeeInfo.workEmail = work_email;
          $scope.employeeInfo.slefMobil = self_mobil;
          $scope.employeeInfo.workMobil = work_mobil;
          $scope.employeeInfo.avatar = getEmployeeImgUrl + $stateParams.employeeNumber;
          angular.element('.human-head-image').css({
            'backgroundImage': 'url(build/img/myInfo/myInfo-background.png)',
            'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover', 'backgroundPosition': 'center'
          });
          $scope.contactLoading = false;
        }, function (response) {
          $scope.contactLoading = false;
          $scope.employeeInfo = {};
        });
        //  .error(function (error) {
        //  $scope.contactLoading = false;
        //  $scope.employeeInfo = {};
        //});
      };
      initEmployeeData();

      $scope.goBackPage = function () {
        $ionicHistory.goBack();
        // $scope.modal.hide();
        // $state.go('tab.contactSearch',{searchHistory:searchParam});
      };


      function storeCommonLinkman(newObject) { //存储为常用联系人
        //storedb(LINK_MAN).remove(newObject, function (err) {
        //});
        storedb(LINK_MAN).insert(newObject, function (err) {
        });
      };

      $scope.telPersonPhone = function () { //响应拨打电话按钮的方法
        var options = {
          buttonLabels: ['拨打电话', '增加到通讯录'],
          addCancelButtonWithLabel: '取消',
          androidEnableCancelButton: true,
          androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT
        };

        document.addEventListener("deviceready", function () {
          $cordovaActionSheet.show(options)
            .then(function (btnIndex) {
              if (baseConfig.debug) {
                warn(btnIndex);
              }
              if (btnIndex == 1) {
                //window.location.href = "tel:" + 88888888888; //不明觉厉-!
                window.location.href = "tel:" + $scope.employeeInfo.slefMobil.replace(/\s+/g, "");
                employeeBaseInfo = {
                  tel: $scope.employeeInfo.slefMobil.replace(/\s+/g, ""),
                  name: $scope.employeeInfo.emp_name,
                  employeeNumber: $scope.employeeInfo.emp_code,
                  imgUrl: $scope.employeeInfo.avatar
                };
                if (employeeBaseInfo.name) {
                  storeCommonLinkman(employeeBaseInfo);
                }
                return true;
              } else if (btnIndex == 2) {
                var baseInfo = {
                  mobil: $scope.employeeInfo.slefMobil.replace(/\s+/g, ""),
                  email: $scope.employeeInfo.slefEmail,
                  emp_name: $scope.employeeInfo.emp_name
                };
                contactService.contactLocal(baseInfo);
                return true;
              }
            });
        }, false);

      };
      $scope.telWorkPhone = function () { //响应拨打电话按钮的方法
        var options = {
          buttonLabels: ['拨打电话', '增加到通讯录'],
          addCancelButtonWithLabel: '取消',
          androidEnableCancelButton: true,
          androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT
        };

        document.addEventListener("deviceready", function () {
          $cordovaActionSheet.show(options)
            .then(function (btnIndex) {
              if (baseConfig.debug) {
                warn(btnIndex);
              }
              if (btnIndex == 1) {
                var workMobile = $scope.employeeInfo.workMobil;
                var telArr = workMobile.split('-');
                var changedTel = '';
                if (telArr.length >= 2) {
                  if(workMobile.indexOf('/') !== -1){
                    workMobile = workMobile.split('/').splice(0, 1).join('');
                    if(workMobile.split('-')>2){
                      var index_1 = workMobile.lastIndexOf('-');
                      changedTel = workMobile.substring(0, index_1);
                    }else{
                      changedTel = workMobile;
                    }
                  }else{
                    workMobile = workMobile.split('/').splice(0, 1).join('');
                    var index_2 = workMobile.lastIndexOf('-');
                    changedTel = workMobile.substring(0, index_2);
                    console.log('changedTel = '+changedTel);
                  }

                }
                console.log('changedTel = '+changedTel);
                //window.location.href = "tel:" + 88888888888; //不明觉厉-!
                window.location.href = "tel:" + changedTel.replace(/\s+/g, "");
                employeeBaseInfo = {
                  tel: $scope.employeeInfo.workMobil.replace(/\s+/g, ""),
                  name: $scope.employeeInfo.emp_name,
                  employeeNumber: $scope.employeeInfo.emp_code,
                  imgUrl: $scope.employeeInfo.avatar
                };
                if (employeeBaseInfo.name) {
                  storeCommonLinkman(employeeBaseInfo);
                }
                return true;
              } else if (btnIndex == 2) {
                var baseInfo = {
                  mobil: $scope.employeeInfo.workMobil.replace(/\s+/g, ""),
                  email: $scope.employeeInfo.slefEmail,
                  emp_name: $scope.employeeInfo.emp_name
                };
                contactService.contactLocal(baseInfo);
                return true;
              }
            });
        }, false);

      };
      $scope.goImTalk = function () {
        employeeBaseInfo = {
          tel: $scope.employeeInfo.mobil.replace(/\s+/g, ""),
          name: $scope.employeeInfo.emp_name,
          employeeNumber: $scope.employeeInfo.emp_code,
          imgUrl: $scope.employeeInfo.avatar
        };
        if (employeeBaseInfo.name) {
          storeCommonLinkman(employeeBaseInfo);
        }
        //go native page --im talk
        if (ionic.Platform.isWebView()) {
          var emp = {
            "friendId": $scope.employeeInfo.emp_code,
            "friendName": $scope.employeeInfo.emp_name,
            "friendIcon": $scope.employeeInfo.avatar
          };
          try {
            imService.toNativeChatPage(emp);
          } catch (e) {
          }
        } else {
          hmsPopup.showShortCenterToast('不支持网页聊天!');
        }
      };
    }]);

/**
 * Created by wolf on 2016/7/6. (-wen.dai-)
 */
'use strict';
//--通讯录搜索模块路由-
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.contactSearch', {
          url: 'contact/contactSearch',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/search/contact-search.html',
              controller: 'employeeSearchCtl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('employeeSearchCtl', [
    '$scope',
    '$ionicScrollDelegate',
    '$ionicModal',
    'baseConfig',
    'hmsPopup',
    '$state',
    '$ionicActionSheet',
    'contactService',
    '$timeout',
    'hmsHttp',
    '$ionicHistory',
    'commonContactService',
    '$rootScope',
    '$cordovaActionSheet',
    '$sce',
    '$q',
    '$http',
    '$stateParams',
    function ($scope,
              $ionicScrollDelegate,
              $ionicModal,
              baseConfig,
              hmsPopup,
              $state,
              $ionicActionSheet,
              contactService,
              $timeout,
              hmsHttp,
              $ionicHistory,
              commonContactService,
              $rootScope,
              $cordovaActionSheet,
              $sce,
              $q,
              $http,
              $stateParams) {
      /**
       * var section
       */

      {
        var nowPage = 0;
        var pageSize = 10;

        $scope.showInfinite = false; //默认隐藏无限滚动的标签
        $scope.contactLoading = false; //默认不显示loading加载
        $scope.showHistory = true; //默认显示搜索历史
        $scope.showClear = false; //默认隐藏搜索框的清楚按钮
        $scope.resultList = []; //存储搜索结果
        $scope.contactKey = {getValue: ''}; //绑定输入的关键字
        $scope.historys = []; //存储搜索历史的关键字
        $scope.newPage = 0;
        var employeeBaseInfo = {
          tel: '',
          name: '',
          employeeNumber: '',
          imgUrl: ''
        };
        var DB_NAME = 'key_history1';
        var getEmployeeUrl = baseConfig.sapUrl + "ZhrEmployeeListFuzzy";
        // var getEmployeeUrl = "http://localhost:8080/api/employee/list";
        var getEmployeeImgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';
        var getEmployeeImgParams =
        {
          "empno": ''
        };
        var LINK_MAN = 'common_linkman2';
        var item = document.getElementById("employeeInputSearch");
        $scope.historys = unique_better(storedb(DB_NAME).find(), 'historyItem');

        if ($scope.historys.length > 10) {
          $scope.historys = $scope.historys.slice(0, 10);
        }
      }
      if($rootScope.employeeDetailFlag == true){
        $scope.contactKey.getValue = $stateParams.searchHistory;
        $scope.searchContacts();
      }
      $scope.$on('$ionicView.afterEnter', function () { //初始化input框-自动聚焦
        if (ionic.Platform.isWebView()) {
          cordova.plugins.Keyboard.show();
        }
        if (ionic.Platform.isAndroid()) {
          $timeout(function () {
            item.focus();
            $scope.$apply();
          }, 400);
        } else {
          item.focus();
          $scope.$apply();
        }
      });
      $scope.$on('$ionicView.enter',function () {
        if($scope.contactKey.getValue ==''){
          $scope.showHistory = false;
        }
        console.log("$scope.contactKey.getValue = "+$scope.contactKey.getValue);
          $scope.searchContacts();
      });
      function dealHistory(newEmployee, emp_code) { //存储成功搜索历史记录的方法
        storedb(DB_NAME).remove({historyItem: newEmployee, historyEmpCode: emp_code}, function (err) {
          if (!err) {
          } else {
            hmsPopup.showShortCenterToast(err);
          }
        });
        storedb(DB_NAME).insert({historyItem: newEmployee, historyEmpCode: emp_code}, function (err) {
          if (!err) {
            $scope.historys = unique_better(storedb(DB_NAME).find(), 'historyItem');
          } else {
            hmsPopup.showShortCenterToast(err);
          }
        });
        if ($scope.historys.length > 10) {
          $scope.historys = $scope.historys.slice(0, 10);
        }
      };

      function dealCommonLinkMan(newObject) { //存储常用联系人最多15个
        storedb(LINK_MAN).insert(newObject, function (err) {
          if (!err) {
            $scope.customContactsInfo = unique_better(storedb(LINK_MAN).find(), 'employeeNumber');
          } else {
            hmsPopup.showShortCenterToast(err);
          }
        });
        if ($scope.customContactsInfo.length > 15) {
          $scope.customContactsInfo = $scope.customContactsInfo.slice(0, 15);
        }
      };

      $scope.hideContactSearch = function () {
        $scope.showHistory = true;
        $scope.showClear = false;
        $scope.resultList = [];
        $scope.contactKey.getValue = '';
        $ionicHistory.goBack();
      };
      var employeeParams = {
        "ZHR_EMPLOYEE_LIST_FUZZY": {
          "SEARCH_KEY": "",
          "ALL":"",
          "PAGE": nowPage,
          "PERPAGE": pageSize,
          "T_EMPLOYEE": {
            "item": {
              "PERNR": "",
              "ENAME": "",
              "EMAIL": ""
            }
          }
        }
      };
      $scope.getEmployeeData = function (empNum,moreFlag) { //获取搜索关键字的数据

        var q = $q.defer();
        if(moreFlag =='init'){
          employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.PAGE = 0;
        }
        employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.SEARCH_KEY = empNum;
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(getEmployeeUrl, employeeParams).then(function (response) {
        // $http.post(getEmployeeUrl, employeeParams).then(function (response) {

          // var response = response.data;
          console.log("response值"+angular.toJson(response));
          hmsPopup.hideLoading();
          if (response.T_EMPLOYEE.item instanceof Array) {
            if (response.T_EMPLOYEE.item.length < 10) {
              $scope.$broadcast('scroll.infiniteScrollComplete');
              var contactItem = response.T_EMPLOYEE.item;
              angular.forEach(contactItem, function (item, index) {
                    var temp = {
                      "emp_name": item.ENAME,
                      "emp_code": item.PERNR,
                      "email": item.EMAIL,
                      "avatar": getEmployeeImgUrl+item.PERNR
                    };
                    $scope.resultList.push(temp);
              });
              $scope.showInfinite = false;
              q.resolve($scope.resultList);

            }else{
              angular.forEach(response.T_EMPLOYEE.item, function (item, index) {
                var temp = {
                  "emp_name": item.ENAME,
                  "emp_code": item.PERNR,
                  "email": item.EMAIL,
                  "avatar": getEmployeeImgUrl+item.PERNR
                };
                $scope.resultList.push(temp);
                q.resolve($scope.resultList);
              });
              $scope.showInfinite = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            var contactItem_2 = response.T_EMPLOYEE.item;

              var temp_2 = {
                "emp_name": contactItem_2.ENAME,
                "emp_code": contactItem_2.PERNR,
                "email": contactItem_2.EMAIL,
                "avatar": getEmployeeImgUrl+contactItem_2.PERNR
              };
              $scope.resultList.push(temp_2);
              $scope.showInfinite = false;
          };
          return q.promise;
        }, function(response){
            hmsPopup.hideLoading();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
        //  .error(function (error) {
        //  hmsPopup.hideLoading();
        //  $scope.$broadcast('scroll.infiniteScrollComplete');
        //});
      };
      console.log(" $scope.showInfinite= "+ $scope.showInfinite);
      $scope.loadMore = function () {
        console.log("loadMore");
        $scope.newPage += 1;
        employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.PAGE =  $scope.newPage;
        $scope.getEmployeeData($scope.contactKey.getValue,'loadMore');
      };

      $scope.clearInputContent = function () { //响应清除输入框文字按钮的方法
        $scope.contactKey.getValue = '';
        // $scope.searchContacts();
        $scope.showClear = false;
        if (ionic.Platform.isWebView()) {
          cordova.plugins.Keyboard.show();
        }
        $timeout(function () {
          item.focus();
          $scope.$apply();
        }, 400);
      };
      document.getElementById('employeeInputSearch').addEventListener('keyup', function () {

        if (this.value.length > 0) {
          $scope.showClear = true;
        } else {
          $scope.showClear = false;
        }
      });
      $scope.searchContacts = function () { //响应搜索输入框的方法
        $scope.showHistory = false;
        if ($scope.contactKey.getValue === '') {
          $ionicScrollDelegate.scrollTop();
          $scope.showClear = false;
          $scope.showHistory = true;
          $timeout(function () {
            $scope.resultList = [];
          }, 100); //防止过快啦 --凸凸凸
        } else {
          $scope.showClear = true;
          $scope.newPage = 0;
          $scope.resultList = [];
          $scope.getEmployeeData($scope.contactKey.getValue,'init');
        }
      };

      $scope.getHistoryItem = function (values) { //响应搜素历史记录点击的方法
        var employeeParams = {
          "ZHR_EMPLOYEE_LIST_FUZZY": {
            "SEARCH_KEY": "",
            "ALL":"",
            "PAGE": nowPage,
            "PERPAGE": pageSize,
            "T_EMPLOYEE": {
              "item": {
                "PERNR": "",
                "ENAME": "",
                "EMAIL": ""
              }
            }
          }
        };
        console.log("values = " + angular.toJson(values));
        $scope.contactKey.getValue = values.historyItem;
        employeeParams.ZHR_EMPLOYEE_LIST_FUZZY.SEARCH_KEY = $scope.contactKey.getValue;
        // $scope.contactLoading = true;
        $scope.showHistory = false;
        $scope.showClear = true;
        $scope.resultList = [];
        dealHistory(values.historyItem, values.historyEmpCode);
        $scope.getEmployeeData(values.historyEmpCode,'init');
      };

      $scope.deleteHistory = function (values) { //清空历史数据
        $scope.historys = [];
        localStorage.removeItem(DB_NAME);
      };

      function storeCommonLinkman(newObject) { //存储为常用联系人
        //storedb(LINK_MAN).remove(newObject, function (err) {
        //});
        storedb(LINK_MAN).insert(newObject, function (err) {
        });
      };
      $ionicModal.fromTemplateUrl('build/pages/contact/detail/employee-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.selectEmployeeItem = function (newEmp) { //跳到个人详情界面
        console.log("newEmp = " + angular.toJson(newEmp));
        dealHistory(newEmp.emp_name, newEmp.emp_code);
        $scope.showHistory = true;
        $scope.showClear = false;
        $scope.resultList = [];
        // $scope.contactKey.getValue = '';
        if (commonContactService.getContactFlag() === 'carpooling-new-contactSearch') {
          commonContactService.setEmpInfo(newEmp);
          $rootScope.$broadcast("SEND_EMP_INFO");
          $ionicHistory.goBack();
        } else {
          $state.go('tab.employeeDetail', {employeeNumber: newEmp.emp_code});
          // $rootScope.$broadcast('toEmployeeDetail',newEmp.emp_code);
          // $scope.modal.show();
        }
      };

      $scope.telSaveNumber = function (event, baseInfo) { //拨打电话按钮的响应事件
        event.stopPropagation(); //阻止事件冒泡

        var options = {
          buttonLabels: ['拨打电话', '增加到通讯录'],
          addCancelButtonWithLabel: '取消',
          androidEnableCancelButton: true,
          androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT
        };

        document.addEventListener("deviceready", function () {
          $cordovaActionSheet.show(options)
            .then(function (btnIndex) {
              if (baseConfig.debug) {
                warn(btnIndex);
              }
              if (btnIndex == 1) {
                window.location.href = "tel:" + 88888888888; //不明觉厉--
                window.location.href = "tel:" + baseInfo.mobil.replace(/\s+/g, "");
                var imgUrl = '';
                if (baseInfo.avatar === "1") {//根据性别判定头像男女
                  imgUrl = "build/img/myInfo/man-portrait.png";
                } else if (baseInfo.avatar === "2") {
                  imgUrl = "build/img/myInfo/woman-portrait.png";
                }

                var employeeBaseInfo = {
                  tel: baseInfo.emp_mobil.replace(/\s+/g, ""),
                  name: baseInfo.emp_name,
                  employeeNumber: baseInfo.emp_code,
                  imgUrl: imgUrl
                };
                if (employeeBaseInfo.name) {
                  dealCommonLinkMan(employeeBaseInfo);
                }
                return true;
              } else if (btnIndex == 2) {
                contactService.contactLocal(baseInfo);
                return true;
              }
            });
        }, false);
      };
    }
  ])
  .factory('contactService', ['hmsPopup', function (hmsPopup) {
    //for contact
    function onSaveContactSuccess(scanCardModal) {
      hmsPopup.showShortCenterToast('添加成功!');
      try {
        if (scanCardModal) {
          scanCardModal.hide();
        }
      } catch (e) {
      }
    };
    //for contact
    function onSaveContactError(contactError) {
      hmsPopup.showShortCenterToast('添加失败,请重新操作!');
    };
    return {  //联系人保存到本地--
      contactLocal: function (baseInfo, scanCardModal) {
        if (ionic.Platform.isWebView()) {
          var newContact = navigator.contacts.create();
          var phoneNumbers = [];
          phoneNumbers[0] = new ContactField('mobile', baseInfo.mobil, true);
          var emails = [];
          emails[0] = new ContactField('email', baseInfo.email, true);
          var organization = [];
          organization[0] = new ContactField('organization', baseInfo.organization, true);
          if (ionic.Platform.isAndroid()) {
            newContact.displayName = baseInfo.emp_name; // ios 不支持 displayName
          }
          if (ionic.Platform.isIOS()) {
            var name = new ContactName();
            name.givenName = baseInfo.emp_name.substring(1, baseInfo.emp_name.length);
            name.familyName = baseInfo.emp_name.substring(0, 1);
            newContact.name = name;
          }
          newContact.phoneNumbers = phoneNumbers;
          newContact.emails = emails;
          newContact.organizations = organization;
          newContact.save(onSaveContactSuccess(scanCardModal), onSaveContactError);
        }
      }
    }
  }]);

/**
 * Created by daiwen on 16/7/21. (-wen.dai-)
 */

'use strict';
//--通讯录组织架构模块路由-
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.contactStructure', {
          url: '/contact/contactStructure',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/structure/structure.html',
              controller: 'structureCtl'
            }
          },
          params: {
            routeId: "1",
            structureId: "00000000",
            typeId: "",
            structureName: ''
          }
        })
    }]);

angular.module('applicationModule')
  .controller('structureCtl', [
    '$scope',
    'hmsPopup',
    '$state',
    '$stateParams',
    'structureDelegate',
    'getInitStructureInfo',
    '$ionicHistory',
    '$ionicScrollDelegate',
    '$timeout',
    'currentStackService',
    'baseConfig',
    function ($scope,
              hmsPopup,
              $state,
              $stateParams,
              structureDelegate,
              getInitStructureInfo,
              $ionicHistory,
              $ionicScrollDelegate,
              $timeout,
              currentStackService,
              baseConfig) {
      /**
       * var section
       */

      {
        var curr_page = ''; //当前组织架构层级的页面
        var curr_department_id = ''; //当前页面所在组织的department ID
        var curr_type_id = '';
        var viewTag = document.getElementsByTagName('ion-view');
        var viewName = viewTag[viewTag.length - 1].attributes[0].value;
        // var screenWidth = document.body.clientWidth;
        var screenWidth = 320; //iphone 5 的宽度
        var structureName = '';
        var getEmployeeImgUrl = baseConfig.baseUrl + 'appApi/employeeImg?empno=';
        var structureParams = {
          "id": ""
        };
        $scope.showScroll = true;
        $scope.childrenDept = []; //当前组织下一级的信息
        $scope.deptStaff = []; //当前这一级组织用户信息
        $scope.departmentName = ''; //当前组织所属层级的名字
        $scope.totalStaffNumber = ''; //当前组织所属层级的总人数(包括全部下级的人数)
        $scope.currentStackList = [{name: '通讯录', id: ''}]; //页栈列表
        $scope.hasAdmin = false; //默认不是管理员
        // $scope.showLoading = true;
      }

      if (currentStackService.getStackList().length > 0) {
        $scope.currentStackList = currentStackService.copyStackList();
        currentStackService.setStackList($scope.currentStackList);
      }
      if ($scope.currentStackList.length == 1) {
        $scope.showLogo = true;
      }
      curr_page = $stateParams.routeId;
      curr_department_id = $stateParams.structureId;
      curr_type_id = $stateParams.typeId;
      structureName = $stateParams.structureName;
      structureParams.id = curr_page;
      console.log("structureName11" + structureName);
      console.log("$stateParams.typeId = " + $stateParams.typeId);
      console.log("$stateParams.structureId = " + $stateParams.structureId);
      function dynamicAddScrollWidth() { //动态增长ion-scroll的宽度
        // var elem = angular.element(document.querySelector('.scroll'));
        // var parent  = angular.element(elem.parent());
        // console.log("elem "+parent[0].style.transform);
        // parent[0].style.transform = 'none';
        // angular.element('.scroll').css('transform', 'none');
        var newWidth = parseInt(screenWidth);
        var stackListLength = $scope.currentStackList.length;
        if (stackListLength == 2) {
          newWidth = parseInt(screenWidth) + 'px';
        } else if (stackListLength > 2) {
          for (var i = 2; i < stackListLength; i++) {
            newWidth += 15 * ($scope.currentStackList[i].name.length + 1);
          }
          newWidth = newWidth + 'px';
        }
        angular.element('.row-scroll-contact').css('width', newWidth);
      };

      $scope.$on('$ionicView.beforeEnter', function () {

        // $ionicScrollDelegate.$getByHandle('contactStructureDelegate').scrollTop();
        $ionicScrollDelegate.$getByHandle('contactStructureDelegate').scrollBy(1000, 0, true);
        var pageCount = currentStackService.getPageCount();
        console.log("pageCount = " + pageCount);
        console.log("$scope.currentStackList.length = " + $scope.currentStackList.length);
        if (pageCount === $scope.currentStackList.length) {
        } else {
          for (var i = 0; i < ($scope.currentStackList.length - pageCount); i++) {
            $scope.currentStackList.pop();
            console.log("pop $scope.currentStackList = " + angular.toJson($scope.currentStackList));
          }
          currentStackService.setStackList($scope.currentStackList);
        }
        dynamicAddScrollWidth();
      });
      function getStructureInfo(result) { //获取数据的回调函数
        console.log("Object.keys(result).length = " + Object.keys(result).length);
        console.log("result = " + angular.toJson(result));
        var tempChildDeptArray = [];
        try {
          if (Object.keys(result).length !== 0) {

            $ionicScrollDelegate.$getByHandle('contactStructureDelegate').scrollBy(1000, 0, true);
            if (result.T_DEPARTMENT.item instanceof Array) {
              if (result.T_DEPARTMENT.item.length > 1) {
                angular.forEach(result.T_DEPARTMENT.item, function (item, index) {
                  var tempChildDept = {
                    NAME: item.NAME,
                    ID: item.ID,
                    PARENTID: item.PARENTID,
                    OTYPE: item.OTYPE,
                    CHECK: true
                  };
                  if (item.NAME !== '集团' || item.NAME !== '租车' || item.NAME !== '专车' || item.NAME !== '买卖车' || item.NAME !== '闪贷') {
                    tempChildDept.CHECK = false;
                  }
                  tempChildDeptArray.push(tempChildDept);
                });
                $scope.childrenDept = tempChildDeptArray;
                // $scope.showLoading = false;
                console.log("$scope.showNormalLogo  = " + $scope.showNormalLogo);
              }
            } else {
              if ("" !== result.T_DEPARTMENT) {
                var tempDept = {
                  "NAME": result.T_DEPARTMENT.item.NAME,
                  "ID": result.T_DEPARTMENT.item.ID,
                  "OTYPE": result.T_DEPARTMENT.item.OTYPE
                };
                $scope.childrenDept.push(tempDept);
                // $scope.showLoading = false;
              } else {
                $scope.childrenDept = [];
                // $scope.showLoading = false;
              }

            }

            console.log("result.T_EMPLOYEE.item = " + angular.toJson(result.T_EMPLOYEE.item));
            if (result.T_EMPLOYEE.item instanceof Array) {
              if (result.T_EMPLOYEE.item.length > 1) {

                angular.forEach(result.T_EMPLOYEE.item, function (item, index) {
                  var nameJobString = item.USERNAME;
                  var JOB = nameJobString.split('.').splice(0, 1);
                  var USERNAME = nameJobString.split('.').splice(1, 1);
                  var temp1 = {
                    "USERNAME": USERNAME,
                    "USERID": item.USERID,
                    "GESCH": getEmployeeImgUrl + item.USERID,
                    "JOB": JOB
                  };
                  // $scope.showLoading = false;
                  $scope.deptStaff.push(temp1);
                });

                console.log("有员工");
                console.log("$scope.deptStaff = " + angular.toJson($scope.deptStaff));
              }
            } else {
              if (result.T_EMPLOYEE !== "") {
                var nameJobString = result.T_EMPLOYEE.item.USERNAME;
                var JOB = nameJobString.split('.').splice(0, 1);
                var USERNAME = nameJobString.split('.').splice(1, 1);
                var temp2 = {
                  "USERNAME": USERNAME,
                  "USERID": result.T_EMPLOYEE.item.USERID,
                  "GESCH": getEmployeeImgUrl + result.T_EMPLOYEE.item.USERID,
                  "JOB":JOB
                };
                $scope.deptStaff.push(temp2);
                console.log("$scope.deptStaff = " + angular.toJson($scope.deptStaff));
                // $scope.showLoading = false;
              } else {
                $scope.deptStaff = [];
                // $scope.showLoading = false;
              }
            }
            var scrollData = {
              name: result.NAME,
              id: result.DEPARTMENTID
            };
            console.log("$stateParams.structureName = " + structureName);
            $scope.currentStackList.push(scrollData);
            currentStackService.setStackList($scope.currentStackList);
            console.log("$scope.currentStackList = " + angular.toJson($scope.currentStackList));
            $scope.departmentName = result.NAME;
            dynamicAddScrollWidth();
          }
        } catch (e) {
        }

      }


      getInitStructureInfo.getStructure(getStructureInfo, curr_department_id, curr_type_id);

      $scope.goLastPage = function () { //返回按钮的响应
        if ($scope.currentStackList.length > 2) {
          $scope.currentStackList.pop();
          currentStackService.setStackList($scope.currentStackList);
          console.log("pop $scope.currentStackList = " + angular.toJson($scope.currentStackList));
        } else {
          $scope.currentStackList = [{name: '通讯录', id: ''}];
          currentStackService.setStackList($scope.currentStackList);
        }
        dynamicAddScrollWidth();
        $timeout(function () {
          $ionicHistory.goBack();
        }, 251);
      };

      $scope.goInputSearch = function () { //去搜索界面
        $state.go('tab.contactSearch');
      };

      $scope.goBackStack = function (index, length, newId) {
        index = parseInt(index) - parseInt(length) + 1;
        $ionicHistory.goBack(index);
        console.log("index = " + index);
        $scope.currentStackList.splice(index, -index);
        currentStackService.setStackList($scope.currentStackList);
      };
      $scope.closeWebSite = function () {
        $ionicHistory.goBack(-($scope.currentStackList.length));  // yunfei 退回主页
        $scope.currentStackList = [{name: '通讯录', id: ''}];
        currentStackService.setStackList($scope.currentStackList);
      };
      $scope.nextStructure = function (newDepartmentId, newTypeId, structureName) { //到下一级组织架构界面
        console.log("newDepartmentId = " + newDepartmentId);
        console.log("$stateParams.structureId = " + $stateParams.structureId);
        try {
          if (curr_page === 'currentDepartment') {
            curr_page = '';
          }
          if (curr_page >= structureDelegate.getStructureId()) {
            curr_page = '';
          }
          structureDelegate.setStructureId(['1', '2']); //provider 在controller中的使用方法
          if ($scope.childrenDept.length != 0 || $scope.childrenDept.length) {
            console.log("newTypeId = " + newTypeId);
            $state.go("tab.contactStructure" + curr_page, {
              routeId: ++curr_page,
              structureId: newDepartmentId,
              typeId: newTypeId,
              structureName: structureName
            });
          }
        } catch (e) {
          warn("update the highest!" + e);
        }
      };

      $scope.goDetailInfo = function (newEmployeeNumber) { //去详情界面
        $state.go('tab.employeeDetail', {employeeNumber: newEmployeeNumber});
      };
    }
  ])
  .provider('structureDelegate', function () {
    this._id = 15;
    this.$get = function () {
      var that = this;
      return {
        getStructureId: function () {
          return that._id;
        },
        setStructureId: function (newIdArray) {
          that._id = newIdArray;
        }
      }
    }
  })
  .config(['$stateProvider', 'structureDelegateProvider',
    function ($stateProvider, structureDelegateProvider) {
      for (var i = 1; i < structureDelegateProvider._id; i++) { //循环路由
        $stateProvider.state('tab.contactStructure' + i, {
          url: '/contact/contactStructure/' + i,
          views: {
            'tab-application': {
              templateUrl: 'build/pages/contact/structure/structure.html',
              controller: 'structureCtl'
            }
          },
          params: {
            routeId: "",
            structureId: "",
            typeId: "",
            structureName: ''
          }
        });
      }
    }])
  .factory('currentStackService', ['$http', function ($http) {
    var stackList = [];
    var pageCount = 1;
    return {
      setStackList: function (arr) {
        stackList = arr;
        pageCount++;
      },
      copyStackList: function () {
        return angular.copy(stackList);
      },
      getStackList: function () {
        return stackList;
      },
      getPageCount: function () {
        return pageCount;
      },
      deleteStackList: function (arr) {
        arr.pop();
      }
    }
  }]);

/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.application-holiday-detail', {
          url: '/application-holiday-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/application-holiday-detail/application-holiday-detail.html',
              controller: 'applicationHolidayDetailCtrl'
            }
          },
          params: {
            receiptNum: ''
          }
        })
    }]);
angular.module('applicationModule')
  .controller('applicationHolidayDetailCtrl', [
    '$scope',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    '$stateParams',
    'hmsHttp',
    '$rootScope',
    '$timeout',
    'baseConfig',
    'sweet',
    function ($scope,
              $state,
              $ionicHistory,
              hmsPopup,
              $stateParams,
              hmsHttp,
              $rootScope,
              $timeout,
              baseConfig,
              sweet) {


      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.picsArr = [];

      var holidayDetailUrl = baseConfig.sapUrl + 'Zhrwf20_006';

      var holidayDetailParam = {
        "ZHRWF20_006": {
          "ET_ZHREL_HISTORY": {
            "item": {
              "MANDT": "",
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
              "REMARKS": ""
            }
          },
          "ET_ZHRWF_020": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "PERNR": "",
              "ENAME": "",
              "PERSA": "",
              "NAME1": "",
              "ORGEH": "",
              "ORGTX": "",
              "PLANS": "",
              "PLSTX": "",
              "ANSVH": "",
              "ATX": "",
              "AWART": "",
              "ZANZHL1": "",
              "ZANZHL2": "",
              "ZANZHL3": "",
              "ZANZHL4": "",
              "ZXJBJ": "",
              "REL_STATUS": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": "",
              "ZFLAG_ATT": "",
              "ZPHOTO": "",
              "ZJTSY": "",
              "ZAPPR": "",
              "REMARKS": "",
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "CHANGE_ID": "",
              "CHANGE_ENAME": "",
              "CHANGE_PLANS": "",
              "CHANGE_PLSTX": "",
              "CHANGE_DATE": "",
              "CHANGE_TIME": "",
              "REL_FLAG_END": ""
            }
          },
          "I_RELNUMBER": $stateParams.receiptNum
        }
      };
      var cancelHolidayUrl = baseConfig.sapUrl+'Zhrwf20_007';
      var cancelHolidayParam = {
        "ZHRWF20_007": {
          "I_CODE": 'CANCEL',
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_ZHRWF_020": {
            "MANDT": "",
            "WF_TYPE": "",
            "REL_NUMBER": $stateParams.receiptNum,
            "PERNR":'',
            "ENAME": '',
            "PERSA": '',
            "NAME1": '',
            "ORGEH": '',
            "ORGTX": '',
            "PLANS": '',
            "PLSTX": '',
            "ANSVH": '',
            "ATX": '',
            "AWART": '',
            "ZANZHL1":'',
            "ZANZHL2":'',
            "ZANZHL3":'',
            "ZANZHL4":'',
            "ZXJBJ": "",
            "REL_STATUS": "",
            "BEGDA": '',
            "ZBEGAP":'',
            "ENDDA":'',
            "ZENDAP":'',
            "ABWTG": '',
            "ZFLAG_ATT": "",
            "ZPHOTO":'',
            "ZJTSY":'',
            "ZAPPR": "",
            "REMARKS": '',
            "CREATE_ID": "",
            "CREATE_ENAME": "",
            "CREATE_DATE": "",
            "CREATE_TIME": "",
            "CREATE_PLANS": "",
            "CREATE_PLSTX": "",
            "NOW_REL_STEP": "",
            "NOW_REL_ID": "",
            "NOW_REL_ENAME": "",
            "NOW_REL_DATE": "",
            "NOW_REL_TIME": "",
            "NOW_REL_PLANS": "",
            "NOW_REL_PLSTX": "",
            "NEXT_REL_STEP": "",
            "NEXT_REL_ID": "",
            "NEXT_REL_ENAME": "",
            "NEXT_REL_PLANS": "",
            "NEXT_REL_PLSTX": "",
            "CHANGE_ID": "",
            "CHANGE_ENAME": "",
            "CHANGE_PLANS": "",
            "CHANGE_PLSTX": "",
            "CHANGE_DATE": "",
            "CHANGE_TIME": "",
            "REL_FLAG_END": ""
          },
          "I_ZMARK": ""
        }
      };
      console.log('I_RELNUMBER = ' + $stateParams.receiptNum);
      $scope.holidayDetail = {};
      $scope.rel_history = [];
      $scope.showMyBackdrop = false;  //是否显示背景
      $scope.showImg = false; //图片预览是否显示
      $scope.imgUrl = '';
      /**
       * 得到请假明细
       */
      function getHolidayDetail() {
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(holidayDetailUrl, holidayDetailParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假明细');
          console.info(angular.toJson(response, true));
          var picStrings = response.ET_ZHRWF_020.item.ZPHOTO;
          $scope.picsArr = picStrings.split(',');
          angular.forEach($scope.picsArr,function (item,index) {
            if(item == '' || item == undefined){
              $scope.picsArr.splice(index,1);
            }
          });
          console.log('$scope.picsArr' + angular.toJson($scope.picsArr));
          console.log('$scope.picsArr.length' + $scope.picsArr.length);
          $scope.holidayDetail.holidayType = response.ET_ZHRWF_020.item.AWART;//请假类别
          $scope.holidayDetail.approveStatus = response.ET_ZHRWF_020.item.REL_STATUS;//审批状态
          $scope.holidayDetail.holidayDays = response.ET_ZHRWF_020.item.ABWTG ;//请假天数
          $scope.holidayDetail.beginDate = response.ET_ZHRWF_020.item.BEGDA;//请假开始日期
          $scope.holidayDetail.endDate = response.ET_ZHRWF_020.item.ENDDA;//请假结束日期
          $scope.holidayDetail.reason = response.ET_ZHRWF_020.item.ZJTSY;//具体事由
          $scope.holidayDetail.beginFlag = response.ET_ZHRWF_020.item.ZBEGAP;//开始时间标记
          $scope.holidayDetail.endFlag = response.ET_ZHRWF_020.item.ZENDAP;//结束时间标记
          $scope.holidayDetail.approvalDetailStatus = response.ET_ZHRWF_020.item.REL_STATUS;//单据状态
          if (response.ET_ZHREL_HISTORY !== '') { //有审批记录的情况
            if (response.ET_ZHREL_HISTORY.item.constructor == Array) {
              var a = response.ET_ZHREL_HISTORY.item;
              angular.forEach(a, function (item, index) {
                var temp = {
                  REL_DATE: item.REL_DATE,
                  REL_TIME: item.REL_TIME,
                  REL_ENAME: item.REL_ENAME,
                  REL_PLSTX: item.REL_PLSTX,
                  REL_ACTION: item.REL_ACTION,
                  REMARKS: item.REMARKS
                };
                $scope.rel_history.push(temp);
              });
              if(response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
                var temp1  = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_020.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_020.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp1);
              }
            } else {
              var temp = {
                REL_DATE: response.ET_ZHREL_HISTORY.item.REL_DATE,
                REL_TIME: response.ET_ZHREL_HISTORY.item.REL_TIME,
                REL_ENAME: response.ET_ZHREL_HISTORY.item.REL_ENAME,
                REL_PLSTX: response.ET_ZHREL_HISTORY.item.REL_PLSTX,
                REL_ACTION: response.ET_ZHREL_HISTORY.item.REL_ACTION,
                REMARKS: response.ET_ZHREL_HISTORY.item.REMARKS
              };
              $scope.rel_history.push(temp);
              if(response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
                var temp1  = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_020.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_020.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp1);
              }
            }
          }
        }, function (response) {

        })
      }

      getHolidayDetail();

      $scope.openImg = function (url) {
        $scope.showMyBackdrop = true;
        $scope.showImg = true;
        $scope.imgUrl = url;
      };

      $scope.hideImgPropur = function () {
        $scope.showMyBackdrop = false;
        $scope.imgUrl = '';
        $scope.showImg = false;
      };

      $scope.toHolidayPolicy = function (policyCode) {
        // $state.go('tab.holiday-policy-detail', {policyCode: policyCode});
        try{
          cordova.ThemeableBrowser.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', {
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
        }catch(e){
          window.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }
      };

      /**
       * 撤回休假申请
       * @type function
       */

      var cancelHoliday = function(){
        hmsPopup.showLoading('请稍等...');
        hmsHttp.post(cancelHolidayUrl, cancelHolidayParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('撤回结果');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast('HOLIDAY_REFRESH');
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            })
          } else {
            hmsPopup.showPopup(response.O_MESSAGE,function(res){
              console.log('showPopup is true');
              $rootScope.$broadcast('HOLIDAY_REFRESH');
              $ionicHistory.goBack();
            });
          }

        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('撤回失败,请检查网络');
        })
      };
      $scope.cancelHoliday = function () {
        hmsPopup.confirm('您确定要撤销该次请假申请吗?', '温馨提示', function (res) {
          if (res) {
            cancelHoliday();
          }
        });
      }


    }])


  .directive('hmsImgLoad', function () {
    return {
      restrict: 'A',
      link: function (scope, iElement, iAttrs) {
        console.error($(iElement).src);
        $(iElement).src = "build/img/myInfo/man-portrait.png";
        var obj = new Image();
        obj.src = iAttrs.hmsUrl;
        obj.onload = function () { //这个地方可以重复写入，如果错误的话，换到外面即可
          console.log('加载完了');
          $(iElement).src = obj.src;
          console.error($(iElement).src);
        }
      }
    }
  })
  .directive('haoImgLoad', function (baseConfig) {
    /*<img hao-img-load load-src="item.des" default-src="img/chrome.gif"  alt="" ng-repeat="item in imgArr">*/
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {
        loadSrc: '=',
        defaultSrc: '@',
        loadSrcStr: '@'
      }, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function ($scope, iElm, iAttrs, controller) {
        iElm.attr('src', $scope.defaultSrc);
        var imgObj = new Image();
        if ($scope.loadSrc) {
          imgObj.src = baseConfig.imgDownloadUrl+$scope.loadSrc;
        } else {
          imgObj.src = baseConfig.imgDownloadUrl+$scope.loadSrcStr;
        }
        imgObj.onload = function () {
          console.info('图片加载完了');
          iElm.attr('src', baseConfig.imgDownloadUrl+$scope.loadSrcStr);
          $scope.$apply();
        };
      }
    };
  });


/**
 * Created by utopia_song on 16/11/7.
 */

angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-approval', {
          url: '/holiday-approval',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-approval/holiday-approval.html',
              controller: 'holidayApprovalCtrl'
            }
          },
          params:{
            rel_number:'',
            approvalStatus:''
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayApprovalCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    '$stateParams',
    '$rootScope',
    '$timeout',
    '$ionicPopup',
    'sweet',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              hmsHttp,
              $stateParams,
              $rootScope,
              $timeout,
              $ionicPopup,
              sweet) {


      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      $scope.picsArr = [];
      $scope.approvalStatus = $stateParams.approvalStatus;
      var holidayApprovalUrl   = baseConfig.sapUrl+'Zhrwf20_006';
      var holidayApprovalParam  = {
        "ZHRWF20_006":{
          "ET_ZHREL_HISTORY":{
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
          "ET_ZHRWF_020":{
            "item":{
              "MANDT":"",
              "WF_TYPE":"",
              "REL_NUMBER":"",
              "PERNR":"",
              "ENAME":"",
              "PERSA":"",
              "NAME1":"",
              "ORGEH":"",
              "ORGTX":"",
              "PLANS":"",
              "PLSTX":"",
              "ANSVH":"",
              "ATX":"",
              "AWART":"",
              "ZANZHL1":"",
              "ZANZHL2":"",
              "ZANZHL3":"",
              "ZANZHL4":"",
              "ZXJBJ":"",
              "REL_STATUS":"",
              "BEGDA":"",
              "ZBEGAP":"",
              "ENDDA":"",
              "ZENDAP":"",
              "ABWTG":"",
              "ZFLAG_ATT":"",
              "ZPHOTO":"",
              "ZJTSY":"",
              "ZAPPR":"",
              "REMARKS":"",
              "CREATE_ID":"",
              "CREATE_ENAME":"",
              "CREATE_DATE":"",
              "CREATE_TIME":"",
              "CREATE_PLANS":"",
              "CREATE_PLSTX":"",
              "NOW_REL_STEP":"",
              "NOW_REL_ID":"",
              "NOW_REL_ENAME":"",
              "NOW_REL_DATE":"",
              "NOW_REL_TIME":"",
              "NOW_REL_PLANS":"",
              "NOW_REL_PLSTX":"",
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
          "I_RELNUMBER":$stateParams.rel_number
        }
      };
      $scope.approvalData = {
        'remark':''
      };

      var cancelHolidayUrl = baseConfig.sapUrl+'Zhrwf20_007';
      var cancelHolidayParam = {
        "ZHRWF20_007": {
          "I_CODE": 'CANCEL',
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_ZHRWF_020": {
            "MANDT": "",
            "WF_TYPE": "",
            "REL_NUMBER": $stateParams.rel_number,
            "PERNR":'',
            "ENAME": '',
            "PERSA": '',
            "NAME1": '',
            "ORGEH": '',
            "ORGTX": '',
            "PLANS": '',
            "PLSTX": '',
            "ANSVH": '',
            "ATX": '',
            "AWART": '',
            "ZANZHL1":'',
            "ZANZHL2":'',
            "ZANZHL3":'',
            "ZANZHL4":'',
            "ZXJBJ": "",
            "REL_STATUS": "",
            "BEGDA": '',
            "ZBEGAP":'',
            "ENDDA":'',
            "ZENDAP":'',
            "ABWTG": '',
            "ZFLAG_ATT": "",
            "ZPHOTO":'',
            "ZJTSY":'',
            "ZAPPR": "",
            "REMARKS": '',
            "CREATE_ID": "",
            "CREATE_ENAME": "",
            "CREATE_DATE": "",
            "CREATE_TIME": "",
            "CREATE_PLANS": "",
            "CREATE_PLSTX": "",
            "NOW_REL_STEP": "",
            "NOW_REL_ID": "",
            "NOW_REL_ENAME": "",
            "NOW_REL_DATE": "",
            "NOW_REL_TIME": "",
            "NOW_REL_PLANS": "",
            "NOW_REL_PLSTX": "",
            "NEXT_REL_STEP": "",
            "NEXT_REL_ID": "",
            "NEXT_REL_ENAME": "",
            "NEXT_REL_PLANS": "",
            "NEXT_REL_PLSTX": "",
            "CHANGE_ID": "",
            "CHANGE_ENAME": "",
            "CHANGE_PLANS": "",
            "CHANGE_PLSTX": "",
            "CHANGE_DATE": "",
            "CHANGE_TIME": "",
            "REL_FLAG_END": ""
          },
          "I_ZMARK": ""
        }
      };
      $scope.holidayApproval = {};
      $scope.rel_history = [];
      $scope.showMyBackdrop = false;  //是否显示背景
      $scope.showImg = false; //图片预览是否显示
      $scope.imgUrl = '';
      $scope.picsArr = [];

      /**
       * 得到请假审批明细
       */
      function getHolidayApprovalDetail() {
        hmsPopup.showLoading("请稍后");
        console.log('baseConfig.imgDownloadUrl'+baseConfig.imgDownloadUrl);
        hmsHttp.post(holidayApprovalUrl,holidayApprovalParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('请假明细');
          console.info(angular.toJson(response,true));
          var picStrings = response.ET_ZHRWF_020.item.ZPHOTO;
          $scope.picsArr = picStrings.split(',');
          angular.forEach($scope.picsArr,function (item,index) {
            if(item == '' || item == undefined){
              $scope.picsArr.splice(index,1);
            }
          });
          console.log('$scope.picsArr'+angular.toJson($scope.picsArr));
          $scope.holidayApproval.holidayType = response.ET_ZHRWF_020.item.AWART;//请假类别
          $scope.holidayApproval.rel_number = response.ET_ZHRWF_020.item.REL_NUMBER;//单据号
          $scope.holidayApproval.submitPerson = response.ET_ZHRWF_020.item.CREATE_ENAME;//提交人
          $scope.holidayApproval.plate = response.ET_ZHRWF_020.item.NAME1;//板块
          $scope.holidayApproval.department = response.ET_ZHRWF_020.item.ORGTX;//所在部门
          $scope.holidayApproval.jobDescription = response.ET_ZHRWF_020.item.PLSTX;//职位描述
          $scope.holidayApproval.entryTime = response.ET_ZHRWF_020.item.ZRZRQ;//入职时间
          $scope.holidayApproval.approveStatus = response.ET_ZHRWF_020.item.REL_STATUS;//审批状态
          $scope.holidayApproval.holidayDays = response.ET_ZHRWF_020.item.ABWTG;//请假天数
          $scope.holidayApproval.beginDate = response.ET_ZHRWF_020.item.BEGDA;//请假开始日期
          $scope.holidayApproval.endDate = response.ET_ZHRWF_020.item.ENDDA;//请假结束日期
          $scope.holidayApproval.reason = response.ET_ZHRWF_020.item.ZJTSY;//具体事由
          $scope.holidayApproval.beginFlag = response.ET_ZHRWF_020.item.ZBEGAP;//开始时间标记
          $scope.holidayApproval.endFlag = response.ET_ZHRWF_020.item.ZENDAP;//结束时间标记
          $scope.holidayApproval.approvalDetailStatus = response.ET_ZHRWF_020.item.REL_STATUS;//单据状态
          if(response.ET_ZHREL_HISTORY !==''){ //有审批记录的情况
            if(response.ET_ZHREL_HISTORY.item.constructor == Array){
              var a = response.ET_ZHREL_HISTORY.item;
              angular.forEach(a,function (item,index) {
                var temp  = {
                  REL_DATE:item.REL_DATE,
                  REL_TIME:item.REL_TIME,
                  REL_ENAME:item.REL_ENAME,
                  REL_PLSTX:item.REL_PLSTX,
                  REL_ACTION:item.REL_ACTION,
                  REMARKS:item.REMARKS
                };
                $scope.rel_history.push(temp);
              });
              if($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
                var temp1  = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_020.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_020.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp1);
              }
            }else{
              var temp = {
                REL_DATE:response.ET_ZHREL_HISTORY.item.REL_DATE,
                REL_TIME:response.ET_ZHREL_HISTORY.item.REL_TIME,
                REL_ENAME:response.ET_ZHREL_HISTORY.item.REL_ENAME,
                REL_PLSTX:response.ET_ZHREL_HISTORY.item.REL_PLSTX,
                REL_ACTION:response.ET_ZHREL_HISTORY.item.REL_ACTION,
                REMARKS:response.ET_ZHREL_HISTORY.item.REMARKS
              };
              $scope.rel_history.push(temp);
              if($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_020.item.NEXT_REL_ENAME != '') {//下一个审批人
                var temp1  = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_020.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_020.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp1);
              }
            }
          }
        },function (response) {

        })
      }
      getHolidayApprovalDetail();

      $scope.openImg = function (url) {
        $scope.showMyBackdrop = true;
        $scope.showImg = true;
        $scope.imgUrl = url;
      };

      $scope.hideImgPropur = function () {
        $scope.showMyBackdrop = false;
        $scope.imgUrl = '';
        $scope.showImg = false;
      };

      /**
       * 审批同意拒绝
       * @param flag
         */

      var examineApproval = function (flag) {
        var examineApprovalUrl = baseConfig.sapUrl+'Zhrwf20_007';
        var examineApprovalParam = {
          "ZHRWF20_007": {
            "I_CODE": '',
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZHRWF_020": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": $stateParams.rel_number,
              "PERNR":'',
              "ENAME": '',
              "PERSA": '',
              "NAME1": '',
              "ORGEH": '',
              "ORGTX": '',
              "PLANS": '',
              "PLSTX": '',
              "ANSVH": '',
              "ATX": '',
              "AWART": '',
              "ZANZHL1":'',
              "ZANZHL2":'',
              "ZANZHL3":'',
              "ZANZHL4":'',
              "ZXJBJ": "",
              "REL_STATUS": "",
              "BEGDA": '',
              "ZBEGAP":'',
              "ENDDA":'',
              "ZENDAP":'',
              "ABWTG": '',
              "ZFLAG_ATT": "",
              "ZPHOTO":'',
              "ZJTSY":'',
              "ZAPPR": "",
              "REMARKS": $scope.approvalData.remark,//审批意见
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "CHANGE_ID": "",
              "CHANGE_ENAME": "",
              "CHANGE_PLANS": "",
              "CHANGE_PLSTX": "",
              "CHANGE_DATE": "",
              "CHANGE_TIME": "",
              "REL_FLAG_END": ""
            },
            "I_ZMARK": ""
          }
        };
        if(flag == 'approval'){
          examineApprovalParam.ZHRWF20_007.I_CODE = 'APPROVE';
        }else{
          examineApprovalParam.ZHRWF20_007.I_CODE = 'REJECT';
        }
        hmsPopup.showLoading('请稍等...');
      hmsHttp.post(examineApprovalUrl,examineApprovalParam).then(function (response) {
        hmsPopup.hideLoading();
        if(response.O_TYPE == 'S'){
          $rootScope.$broadcast('APPROVAL_SUCCESS');
          $ionicHistory.goBack();
          $timeout(function () {
            hmsPopup.showShortCenterToast('审批成功');
          })
        }else{
          hmsPopup.showPopup(response.O_MESSAGE,function(res){
              console.log('showPopup is true');
              $rootScope.$broadcast('APPROVAL_SUCCESS');
              $ionicHistory.goBack();
          });
        }
      },function(response){
        hmsPopup.hideLoading();
        hmsPopup.showShortCenterToast('审批失败,请检查网络');
      })
      };
      $scope.examineApprovalConfirm  = function(flag){
        hmsPopup.confirm('您确定要提交审批结果吗?', '温馨提示', function (res) {
          if (res) {
            examineApproval(flag);
          }
        });
      };
      /**
       * 撤回休假申请
       * @type function
       */
      var cancelHoliday = function () {
        hmsPopup.showLoading('请稍等...');
        hmsHttp.post(cancelHolidayUrl, cancelHolidayParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('撤回结果');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast('CANCEL_SUCCESS');
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            })
          } else {
            hmsPopup.showPopup(response.O_MESSAGE,function(res){
              $rootScope.$broadcast('CANCEL_SUCCESS');
              $ionicHistory.goBack();
            });
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('撤回失败,请检查网络');
        })
      };
      $scope.cancelHolidayConfirm = function(){
        hmsPopup.confirm('您确定要撤销该次请假申请吗?', '温馨提示', function (res) {
          if (res) {
            cancelHoliday();
          }
        });
      }
    }]);


/**
 * Created by utopia_song on 16/11/9.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-policy-detail', {
          url: '/holiday-policy-detail',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-policy/holiday-policy-detail.html',
              controller: 'holidayPolicyDetailCtrl'
            }
          },
          params:{
            policyCode:'',
            typeFlag:''
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayPolicyDetailCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    '$stateParams',
    'hmsHttp',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              $stateParams,
              hmsHttp,
              $compileProvider
    ) {

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.policyCode = $stateParams.policyCode;
      var policyDetailUrl  = baseConfig.baseUrl  + 'appApi/getPolicyInfo';
      var policyDetailParam = {
        "lookuptype": "UCAR_COMPANY_POLICY",
        "lookupCode": $stateParams.policyCode || $stateParams.typeFlag
      };
      console.log('$stateParams.policyCode = '+$stateParams.policyCode);
      function getPolicyDetail(){
        hmsHttp.post(policyDetailUrl,policyDetailParam).then(function (response) {
          console.log("holiday-policy-detail = "+angular.toJson(response));
          var policyDesc = response.date[0].lookupCodeDesc;
          console.log('policyDesc = '+policyDesc);
          $scope.html = policyDesc;
        },function(response){
          hmsPopup.showShortCenterToast('获取政策详情失败');
        })
      }
      getPolicyDetail();


    }]);

/**
 * Created by utopia_song on 16/11/8.
 */
/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-policy', {
          url: '/holiday-policy',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-policy/holiday-policy.html',
              controller: 'holidayPolicyCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayPolicyCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              hmsHttp
              ) {

      var policyTypeUrl  = baseConfig.baseUrl  + 'appApi/getPolicyInfo';
      var policyTypeParam = {
        "lookuptype": "UCAR_COMPANY_POLICY",
        "lookupCode": ""
      };
      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.holidayTypeList = [
        {
          'name':'事假',
          'src':'build/img/application/holiday-type/1.png',
          'code':'1020'
        },
        {
          'name':'病假',
          'src':'build/img/application/holiday-type/2.png',
          'code':'1010'
        },
        {
          'name':'婚假',
          'src':'build/img/application/holiday-type/3.png',
          'code':'1030'
        },
        {
          'name':'调休',
          'src':'build/img/application/holiday-type/4.png',
          'code':'1080'
        },
        {
          'name':'年假',
          'src':'build/img/application/holiday-type/5.png',
          'code':'1000'
        },
        {
          'name':'产假',
          'src':'build/img/application/holiday-type/7.png',
          'code':'1050'
        },
        {
          'name':'哺乳假',
          'src':'build/img/application/holiday-type/6.png',
          'code':'1060'
        },
        {
          'name':'丧假',
          'src':'build/img/application/holiday-type/10.png',
          'code':'1040'
        },
        {
          'name':'其他',
          'src':'build/img/application/holiday-type/9.png',
          'code':'1099'
        }

      ];
      // function getHolidayType(){
      //   hmsHttp.post(policyTypeUrl,policyTypeParam).then(function (response) {
      //     var typeArr = response.date;
      //     angular.forEach(typeArr,function (item,index) {
      //       var temp  = {
      //         'name':item.lookupCodeName,
      //         'code':item.lookupCode
      //       };
      //       $scope.holidayTypeList.push(temp);
      //     })
      //   },function (response) {
      //     hmsPopup.showShortCenterToast('获取政策失败');
      //   })
      // }
      // getHolidayType();
      $scope.toPolicyDetail = function (policyCode) {
        console.log('policyCode = '+policyCode);
        $state.go('tab.holiday-policy-detail',{policyCode:policyCode});
      }
    }]);

/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.holiday-type', {
          url: '/holiday-type',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/holiday-type/holiday-type.html',
              controller: 'holidayTypeCtrl'
            }
          }
        })
    }]);
angular.module('applicationModule')
  .controller('holidayTypeCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    'getApplicationService',
    '$rootScope',
    'imgService',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              getApplicationService,
              $rootScope,
              imgService) {


      $scope.goBack = function () {
        $ionicHistory.goBack();
      };
      $scope.holidayTypeList = [
        {
          'name':'事假',
          'src':'build/img/application/holiday-type/1.png',
          'code':'1020'
        },
        {
          'name':'病假',
          'src':'build/img/application/holiday-type/2.png',
          'code':'1010'
        },
        {
          'name':'婚假',
          'src':'build/img/application/holiday-type/3.png',
          'code':'1030'
        },
        {
          'name':'调休',
          'src':'build/img/application/holiday-type/4.png',
          'code':'1080'
        },
        {
          'name':'年假',
          'src':'build/img/application/holiday-type/5.png',
          'code':'1000'
        },
        {
          'name':'产假',
          'src':'build/img/application/holiday-type/7.png',
          'code':'1050'
        },
        {
          'name':'哺乳假',
          'src':'build/img/application/holiday-type/6.png',
          'code':'1060'
        },
        {
          'name':'丧假',
          'src':'build/img/application/holiday-type/10.png',
          'code':'1040'
        },
        {
          'name':'其他',
          'src':'build/img/application/holiday-type/9.png',
          'code':'1099'
        }
      ];
      $scope.toHolidayPolicy = function () {
        try{
          cordova.ThemeableBrowser.open('http://w3cms.ucarinc.com/portalcms/news/newsdetail.do?id=120', '_blank', {
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
        }catch(e){
          window.open(url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
        }

      };
      $scope.chooseHoliday = function (item) {
        // $rootScope.$broadcast('CHOOSE_HOLIDAY_TYPE',item);
        imgService.setHolidayInfo(item);
        $ionicHistory.goBack();
      };

    }]);

/**
 * Created by utopia_song on 16/11/3.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.new-application-holiday', {
          url: '/new-application-holiday',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-ask-leave/new-application-holiday/new-application-holiday.html',
              controller: 'newApplicationHolidayListCtrl'
            }
          },
          params: {
            newInfo: {},
            holidayList: []
          }
        })
    }]);
angular.module('applicationModule')
  .controller('newApplicationHolidayListCtrl', [
    '$scope',
    'baseConfig',
    '$state',
    '$ionicHistory',
    'hmsPopup',
    '$cordovaDatePicker',
    '$filter',
    '$ionicActionSheet',
    '$ionicModal',
    '$cordovaFileTransfer',
    '$q',
    'hmsHttp',
    '$rootScope',
    '$stateParams',
    '$timeout',
    '$cordovaCamera',
    '$cordovaDialogs',
    '$ionicPopup',
    'imgService',
    'sweet',
    function ($scope,
              baseConfig,
              $state,
              $ionicHistory,
              hmsPopup,
              $cordovaDatePicker,
              $filter,
              $ionicActionSheet,
              $ionicModal,
              $cordovaFileTransfer,
              $q,
              hmsHttp,
              $rootScope,
              $stateParams,
              $timeout,
              $cordovaCamera,
              $cordovaDialogs,
              $ionicPopup,
              imgService,
              sweet) {

      $scope.newHolidayData = {};
      $scope.newHolidayData.days = 0;
      $scope.imgArr = [];
      var imgTotalLength = 0;
      var pictureNumber = 0;
      $scope.chooseTypeFlag = false;
      $scope.newHolidayPics = [];
      $scope.alreadyHoliday = [];
      $scope.beginFlag = true;
      $scope.endFlag = true;
      $scope.showDelete = "-1";
      $scope.typeValue = '';
      $scope.showUploadPic = false;
      $scope.goBack = function () {
        $scope.newHolidayData = {};
        imgService.setHolidayInfo({});
        $ionicHistory.goBack();
      };

      $scope.$on('$ionicView.afterLeave',function () {
        imgService.setAndroidBadgeFlag('true');
      });
      $scope.$on('$ionicView.enter', function () {//controller回收资源时执行
        console.log('enter');
        console.log('broadcast $scope.newHolidayData = ' + angular.toJson($scope.newHolidayData));
        console.log('imgService.getHolidayInfo = ' + angular.toJson(imgService.getHolidayInfo()));

        if (imgService.getHolidayInfo().name) {
          $scope.chooseTypeFlag = true;
          $scope.typeValue = imgService.getHolidayInfo().name;
          $scope.newHolidayData.typeCode = imgService.getHolidayInfo().code;
          if (imgService.getHolidayInfo().name == '婚假' || imgService.getHolidayInfo().name == '病假') {
            $scope.showUploadPic = true;
          } else {
            $scope.showUploadPic = false;
          }
        }
        imgService.setAndroidBadgeFlag('false');

        if ($scope.newHolidayData.beginDate !== '' && $scope.newHolidayData.endDate !== '' && $scope.newHolidayData.beginDate !== undefined && $scope.newHolidayData.endDate !== undefined) {
          initBeginTime();
          initEndTime();
        }
        imgService.setHolidayInfo({});
      });

      $scope.chooseHolidayType = function () {
        $state.go('tab.holiday-type');
      };
      console.group('请假列表数据:');
      console.info('$stateParams.newInfo  = ' + angular.toJson($stateParams.newInfo, true));
      console.info('$stateParams.holidayList  = ' + angular.toJson($stateParams.holidayList, true));
      if ($stateParams.holidayList.length > 0) {
        angular.forEach($stateParams.holidayList, function (item, index) {
          if (item.REL_STATUS !== 'C' || item.REL_STATUS !== 'R') {
            $scope.alreadyHoliday.push(item.BEGDA);
          }
        });
        console.log('$scope.alreadyHoliday = ' + angular.toJson($scope.alreadyHoliday));
      }
      if ($stateParams.newInfo !== '') {
        $scope.newHolidayData = {};
        $scope.newHolidayData.days = 0;
      }
      var todayDate = new Date();//今天日期
      $scope.datetimeFrom = {//开始日期
        year: todayDate.getFullYear(),
        month: "",
        day: ""
      };
      $scope.datetimeTo = {//结束日期
        year: "",
        month: "",
        day: ""
      };

      function getDateString(date) {
        return $filter('date')(date, 'yyyy-MM-dd');
      }

      /**
       *比较时间
       * @param d1
       * @param d2
       * @returns {boolean}
       * @constructor
       */
      function CompareDate(d1, d2) {
        var d1_time = d1.split(' ').splice(0, 1).join('');
                        //划分成数组，删除第一个元素，连接成之前没有分隔的字符串；
        var d2_time = d2.split(' ').splice(0, 1).join('');
        var d1_interval = d1.split(' ').splice(1, 1).join('');
        var d2_interval = d2.split(' ').splice(1, 1).join('');
        console.log('d1_time  = ' + d1_time + 'd1_interval = ' + d1_interval);
        console.log('d2_time  = ' + d2_time + 'd2_interval = ' + d2_interval);
        if (d1_time == d2_time) {
          if (d1_interval == '下午' && d2_interval == '上午') {
            return true;
          }
        } else {
          //将所有的短横线替换为斜杠
          console.log('begin morethan end');
          return ((new Date(d1_time.replace(/-/g, "\/"))) > (new Date(d2_time.replace(/-/g, "\/"))));
        }

      }


      function initBeginTime() {
        $scope.newHolidayData.days = '0';
        $scope.beginFlag = true;
        $scope.newHolidayData.beginDate = '';
        $scope.beginTime = '';
        $scope.newHolidayData.beginTimeInterval = '';
      }

      function initEndTime() {
        $scope.newHolidayData.days = '0';
        $scope.endFlag = true;
        $scope.newHolidayData.endDate = '';
        $scope.endTime = '';
        $scope.newHolidayData.endTimeInterval = '';
      }

      $scope.chooseBeginTime = function () {
        var beginDays = new Date();
        var beginYear = beginDays.getFullYear(); //2017
        var beginMonth = beginDays.getMonth()+1; //3
        var startYear = beginDays.getFullYear()-1;  //2016
        // var startYear = beginDays.getFullYear();
        var startMonth = beginMonth == 1? 12 :beginMonth-1;
        console.log('beginMonth = ' + beginYear + '-' + beginMonth + '-01');  //2017-3-10
        console.log('beginDays.getMonth() = '+beginDays.getMonth());   //2
        console.log('getDateString(new Date()) = '+getDateString(new Date()));   //2017-03-27
        if ($scope.newHolidayData.typeCode == '' || $scope.newHolidayData.typeCode == undefined) {
          hmsPopup.showShortCenterToast('请先选择请假类型');
          return;
        }

        var dic = {
          startDate: startYear + '-' + startMonth + '-01',  //2016-2-01
          endDate: new Date().getFullYear() + 3 + "-12-31",   //2010-12-31
          selectedDate: $scope.newHolidayData.beginDate == '' || $scope.newHolidayData.beginDate == undefined ? getDateString(new Date()) + ' 上午' : $scope.newHolidayData.beginDate,   //2017-03-27 上午
          startTime: "7:30",
          endTime: "15:00",
          title: "选择时间",
          type: "TYPE1"
        };
        dic.selectedDate = (($scope.newHolidayData.endDate !== '' || $scope.newHolidayData.endDate !== undefined) && $scope.newHolidayData.endDate) || (($scope.newHolidayData.beginDate == '' || $scope.newHolidayData.beginDate == undefined) && getDateString(new Date()) + ' 上午') || $scope.newHolidayData.beginDate;
        //add by wl 结束时间有值，开始时间没值 且 获取今天的值，或者开始时间有值，则为真
        console.log("$scope.newHolidayData.typeCode值："+$scope.newHolidayData.typeCode);
        if($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010'){
          dic.endDate = new Date().getFullYear()+ '-12-31';
        }
        console.log('参数 = ' + angular.toJson(dic));
        console.log('aaaa = ' + dic.selectedDate);
        CDXDatePicker.selectDate(function (res) {
          console.log('datepicker = ' + res);
          $scope.beginFlag = false;
          $scope.beginTime = res.split(' ').splice(0, 1).join('');
          $scope.checkBeginYear = $scope.beginTime.split('-').splice(0, 1).join('');
          $scope.newHolidayData.beginTimeInterval = res.split(' ').splice(1, 1).join('');
          var beginYear = $scope.beginTime.split('-').splice(0, 1).join('');
          var beginInterval = res.split(' ').splice(1, 1).join('');
          var nextYear = parseInt(new Date().getFullYear()) + 1;
          var lastYear = parseInt(new Date().getFullYear()) - 1;
          var thisYear = parseInt(new Date().getFullYear());
          console.log('$scope.beginTime = ' + $scope.beginTime);
          console.log('beginYear = ' + beginYear);
          console.log('nextYear = ' + nextYear);
          console.log('beginInterval = ' + beginInterval);
          // if(new Date($scope.beginTime).getDay() == 6 || new Date($scope.beginTime).getDay() == 0){
          //   hmsPopup.showShortCenterToast('请假开始时间不能以周末开始');
          //   initBeginTime();
          // }
          if ($scope.newHolidayData.endDate) {
            initEndTime();
          }
            if (($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010') && beginYear == nextYear) {
              hmsPopup.showShortCenterToast('请假只能请本年,请重新选择');
              initBeginTime();
            } else {
              if(beginInterval == 'AM'){
                $scope.newHolidayData.beginDate = $scope.beginTime + ' 上午';
                $scope.newHolidayData.beginTimeInterval = '上午';
              }else if(beginInterval == 'PM'){
                $scope.newHolidayData.beginDate = $scope.beginTime + ' 下午';
                $scope.newHolidayData.beginTimeInterval = '下午';
              }else{
                $scope.newHolidayData.beginDate = res;
                $scope.newHolidayData.beginTimeInterval = res.split(' ').splice(1, 1).join('');
              }
              // $scope.newHolidayData.beginTimeInterval = res.split(' ').splice(1, 1).join('');
              $scope.$apply();
              console.log('$scope.newHolidayData.beginDate = ' + $scope.newHolidayData.beginDate);
            }

        }, function (error) {
          console.log('error');
        }, dic);
      };



      $scope.chooseEndDate = function () {
        var endDays = new Date();
        var endYear = endDays.getFullYear();
        var endMonth = endDays.getMonth()+1;
        var startEndYear = endDays.getFullYear()-1;
        var startEndMonth = endMonth == 1? 12 :endMonth-1;

        console.log('$scope.newHolidayData.typeCode2 = ' + $scope.newHolidayData.typeCode);
        if ($scope.newHolidayData.typeCode == '' || $scope.newHolidayData.typeCode == undefined) {
          hmsPopup.showShortCenterToast('请先选择请假类型');
          return;
        }
        if(!$scope.newHolidayData.beginDate){
          hmsPopup.showShortCenterToast('请您先选择开始时间');
          return;
        }
        var dic = {
          startDate: startEndYear + '-' + startEndMonth + '-01',
          endDate: new Date().getFullYear() + 3 + "-12-31",
          selectedDate: $scope.newHolidayData.endDate == '' || $scope.newHolidayData.endDate == undefined ? getDateString(new Date()) + ' 上午' : $scope.newHolidayData.endDate,
          startTime: "7:30",
          endTime: "15:00",
          title: "选择时间",
          type: "TYPE1"
        };

        dic.selectedDate = (($scope.newHolidayData.beginDate !== '' || $scope.newHolidayData.beginDate !== undefined) && $scope.newHolidayData.beginDate) || (($scope.newHolidayData.endDate == '' || $scope.newHolidayData.endDate == undefined) && getDateString(new Date()) + ' 上午') || $scope.newHolidayData.endDate;
        if($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010'){
          dic.endDate = new Date().getFullYear()+ '-12-31';
        }

        CDXDatePicker.selectDate(function (res) {

          $scope.endTime = res.split(' ').splice(0, 1).join('');
          $scope.endFlag = false;
          if(res.split(' ').splice(1, 1).join('') == 'AM'){
            $scope.newHolidayData.endTimeInterval = '上午';
          }else if(res.split(' ').splice(1, 1).join('') == 'PM'){
            $scope.newHolidayData.endTimeInterval = '下午';
          }else{
            $scope.newHolidayData.endTimeInterval = res.split(' ').splice(1, 1).join('');
          }

          var endInterval = res.split(' ').splice(1, 1).join('');
          var endYear = $scope.endTime.split('-').splice(0, 1).join('');
          $scope.checkEndYear = $scope.endTime.split('-').splice(0, 1).join('');
          var nextYear = parseInt(new Date().getFullYear()) + 1;
          var lastYear = parseInt(new Date().getFullYear()) - 1;
          var thisYear = parseInt(new Date().getFullYear());
          // if(new Date($scope.endTime).getDay() == 6 || new Date($scope.endTime).getDay() == 0){
          //   hmsPopup.showShortCenterToast('请假结束时间不能以周末结束');
          //   initEndTime();
          // }
          if ($scope.newHolidayData.beginDate) {  //选择了开始日期的情况
            var beginYear = $scope.beginTime.split('-').splice(0, 1).join('');
            $scope.newHolidayData.beginTimeInterval = $scope.newHolidayData.beginDate.split(' ').splice(1, 1).join('');
            if (CompareDate($scope.newHolidayData.beginDate, res)) {
              console.log(' CompareDate $scope.beginTime = ' + $scope.beginTime);
              hmsPopup.showShortCenterToast('结束日期小于开始日期,请重新选择');
              initEndTime();
            } else if (($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010') && endYear == nextYear) {
              hmsPopup.showShortCenterToast('请假只能请本年,请重新选择');
              initEndTime();
            }else if($scope.newHolidayData.typeCode == '1000'  && beginYear == lastYear && endYear ==thisYear){
              console.log('年假跨年');
              hmsPopup.showShortCenterToast('不允许跨年申请年假,请重新输入');
              initEndTime();
            }else if($scope.newHolidayData.typeCode == '1010'  && beginYear == lastYear && endYear ==thisYear){
              console.log('病假跨年');
              hmsPopup.showShortCenterToast('不允许跨年申请病假,请重新输入');
              initEndTime();
            }else if($scope.newHolidayData.typeCode == '1000' && beginYear == lastYear && endYear == lastYear){
              var dateCheckUrl_1 = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam_1 = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.newHolidayData.typeCode,
                  "I_BEGDA": $scope.beginTime,
                  "I_ENDDA": $scope.endTime,
                  "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_USRID": window.localStorage.empno.toUpperCase()
                }
              };
              hmsPopup.showLoading('请稍后');
              console.log('dateCheckParam_1 = '+angular.toJson());
              hmsHttp.post(dateCheckUrl_1, dateCheckParam_1).then(function (response) {
                console.group('结束日期返回数据');
                console.info(angular.toJson(response, true));
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  // $scope.newHolidayData.days = response.O_DAYS;
                  if(Number(response.O_DAYS) > Number($stateParams.newInfo.ZANZHL1)){
                    hmsPopup.showShortCenterToast('超出可用年假定额天数,请重新输入');
                    initEndTime();
                  }else{
                    if(endInterval == 'AM'){
                      $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                    }else if(endInterval == 'PM'){
                      $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                    }else{
                      $scope.newHolidayData.endDate = res;
                    }
                    // $scope.newHolidayData.endDate = res;
                    $scope.newHolidayData.days = response.O_DAYS;
                  }
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initEndTime();
                }

              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initEndTime();
              })
            }else if($scope.newHolidayData.typeCode == '1000' && beginYear == thisYear && endYear == thisYear){
              console.log('年假begin and end this year')
              var moment = thisYear+'-04'+'-01'+' 上午';
              console.log('moment = '+moment);
                if(CompareDate(moment,$scope.newHolidayData.beginDate)){
                  console.log('小于4月1号');
                  var dateCheckUrl_2 = baseConfig.sapUrl + 'Zhrwf00_008';
                  var dateCheckParam_2 = {
                    "ZHRWF00_008": {
                      "I_AWART": $scope.newHolidayData.typeCode,
                      "I_BEGDA": $scope.beginTime,
                      "I_ENDDA": $scope.endTime,
                      "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_USRID": window.localStorage.empno.toUpperCase()
                    }
                  };
                  hmsPopup.showLoading('请稍后');
                  hmsHttp.post(dateCheckUrl_2, dateCheckParam_2).then(function (response) {
                    console.group('结束日期返回数据');
                    console.log('response = '+angular.toJson(response));
                    console.info(angular.toJson(response, true));
                    if (response.O_TYPE == 'S') {
                      hmsPopup.hideLoading();
                      if(Number(response.O_DAYS) > (Number($stateParams.newInfo.ZANZHL1)+Number($stateParams.newInfo.ZANZHL2))){
                        console.log('超过了上年年假和本年年假');
                        hmsPopup.showShortCenterToast('超出可用年假定额天数,请重新输入');
                        initEndTime();
                      }else{
                        console.log('de dao day');
                        console.log('$scope.endFlag = '+$scope.endFlag);
                        if(endInterval == 'AM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                        }else if(endInterval == 'PM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                        }else{
                          $scope.newHolidayData.endDate = res;
                        }
                        // $scope.newHolidayData.endDate = res;
                        $scope.newHolidayData.days = response.O_DAYS;
                      }
                    } else {
                      hmsPopup.hideLoading();
                      hmsPopup.showShortCenterToast(response.O_MESSAGE);
                      initEndTime();
                    }

                  }, function (response) {
                    hmsPopup.hideLoading();
                    hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                    initEndTime();
                  })
                }else{
                  var dateCheckUrl_3 = baseConfig.sapUrl + 'Zhrwf00_008';
                  var dateCheckParam_3 = {
                    "ZHRWF00_008": {
                      "I_AWART": $scope.newHolidayData.typeCode,
                      "I_BEGDA": $scope.beginTime,
                      "I_ENDDA": $scope.endTime,
                      "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                      "I_USRID": window.localStorage.empno.toUpperCase()
                    }
                  };
                  hmsPopup.showLoading('请稍后');
                  hmsHttp.post(dateCheckUrl_3, dateCheckParam_3).then(function (response) {
                    console.group('结束日期返回数据');
                    console.info(angular.toJson(response, true));
                    if (response.O_TYPE == 'S') {
                      hmsPopup.hideLoading();
                      if(Number(response.O_DAYS) > Number($stateParams.newInfo.ZANZHL2)){
                        hmsPopup.showShortCenterToast('超出可用年假定额天数,请重新输入');
                        initEndTime();
                      }else{
                        if(endInterval == 'AM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                        }else if(endInterval == 'PM'){
                          $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                        }else{
                          $scope.newHolidayData.endDate = res;
                        }
                        // $scope.newHolidayData.endDate = res;
                        $scope.newHolidayData.days = response.O_DAYS;
                      }
                    } else {
                      hmsPopup.hideLoading();
                      hmsPopup.showShortCenterToast(response.O_MESSAGE);
                      initEndTime();
                    }

                  }, function (response) {
                    hmsPopup.hideLoading();
                    hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                    initEndTime();
                  })
                }
            }
            else {
              // judgeAmPm(date, 'end');
              // $scope.newHolidayData.endDate = res;
              if(endInterval == 'AM'){
                $scope.newHolidayData.endDate = $scope.endTime + ' 上午';
                $scope.newHolidayData.endTimeInterval = '上午';
              }else if(endInterval == 'PM'){
                $scope.newHolidayData.endDate = $scope.endTime + ' 下午';
                $scope.newHolidayData.endTimeInterval = '下午';
              }else{
                $scope.newHolidayData.endDate = res;
                $scope.newHolidayData.endTimeInterval = res.split(' ').splice(1, 1).join('');
              }
              // $scope.newHolidayData.endTimeInterval = res.split(' ').splice(1, 1).join('');
              //请假销假日期计算校验接口
              var dateCheckUrl = baseConfig.sapUrl + 'Zhrwf00_008';
              var dateCheckParam = {
                "ZHRWF00_008": {
                  "I_AWART": $scope.newHolidayData.typeCode,
                  "I_BEGDA": $scope.beginTime,
                  "I_ENDDA": $scope.endTime,
                  "I_ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',
                  "I_USRID": window.localStorage.empno.toUpperCase()
                }
              };
              hmsPopup.showLoading('请稍后');
              hmsHttp.post(dateCheckUrl, dateCheckParam).then(function (response) {
                console.group('结束日期返回数据');
                console.info(angular.toJson(response, true));
                if (response.O_TYPE == 'S') {
                  hmsPopup.hideLoading();
                  $scope.newHolidayData.days = response.O_DAYS;
                } else {
                  hmsPopup.hideLoading();
                  hmsPopup.showShortCenterToast(response.O_MESSAGE);
                  initEndTime();
                }

              }, function (response) {
                hmsPopup.hideLoading();
                hmsPopup.showShortCenterToast('日期计算接口调用失败,请检查网络');
                initEndTime();
              })
            }

          }
        }, function (error) {

        }, dic);

      };

      $scope.getPicture = function () {
        $ionicActionSheet.show({
          buttons: [
            {text: '从相册中选'},
            {text: '拍照'}
          ],
          titleText: '选择上传方式',
          cancelText: '取消',
          buttonClicked: function (index) {
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
          function (results) {
            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              $scope.imgArr.push(results[i]);
              $scope.$apply();
            }
          }, function (error) {
            console.log('Error: ' + error);
          }, {
            maximumImagesCount: 1,
            width: 800
          }
        );
      }

      //拍照
      function takePhoto() {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 3000,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
          console.log(imageURI);
          $scope.person_imgsrc = imageURI;
          console.group('img===');
          console.groupEnd();
          $scope.imgArr.push(imageURI);
          console.log('takePhoto imgArr = ' + angular.toJson($scope.imgArr));
          //upImage(base64encode(imageURI), imageURI);
          $scope.showPress = true;
        }, function (err) {
          // error
        });

      }


      $scope.delImage = function (index) {
        $scope.showDelete = true;
        console.log('on-hold' + index);
        console.log('$scope.showDelete' + $scope.showDelete);
      };
      $scope.deleteImage = function (event, num) {//删除图片
        event.stopPropagation();
        $scope.imgArr.splice(num, 1);
        // $scope.showDelete = "-1";
        $scope.showDelete = true;
      };
      $scope.cancelDelete = function () {
        if ($scope.showDelete !== -1) {
          $scope.showDelete = -1;
        }
      };

      $scope.zoomMin = 1;
      $scope.showBigPicture = function (index) {//显示大图
        $scope.showDelete = "-1";
        $scope.photoHight = {
          "height": window.screen.height + "px"
        };
        $scope.activeSlide = index;
        $scope.showModal('build/pages/application/application-ask-leave/new-application-holiday/photo-zoom.html');
      };

      $scope.showModal = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.modal.remove()
      };

      //上传图片
      var uploadImage = function () {
        console.log('$scope.imgArr.length = ' + $scope.imgArr.length);
        console.log('$scope.newHolidayData.typeCode' + $scope.newHolidayData.typeCode);
        console.log('Number($scope.newHolidayData.days) = ' + Number($scope.newHolidayData.days));
        console.log('Number($stateParams.newInfo.ZANZHL3) = ' + Number($stateParams.newInfo.ZANZHL3));
        hmsPopup.showLoadingWithoutBackdrop('上传信息中,请稍候');
        console.log('$scope.newHolidayData.typeCode = ' + $scope.newHolidayData.typeCode);
        console.log('$scope.newHolidayData.beginDate = ' + $scope.newHolidayData.beginDate);
        console.log('$scope.newHolidayData.endDate = ' + $scope.newHolidayData.endDate);

        if ($scope.imgArr.length == 0) {
          console.log('pic is null ');
          var submitUrl = baseConfig.sapUrl + 'Zhrwf20_007';
          var submitParam = {
            "ZHRWF20_007": {
              "I_CODE": 'SUBMIT',
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZHRWF_020": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "PERNR": '',
                "ENAME": '',
                "PERSA": '',
                "NAME1": '',
                "ORGEH": '',
                "ORGTX": '',
                "PLANS": '',
                "PLSTX": '',
                "ANSVH": '',
                "ATX": '',
                "AWART": $scope.newHolidayData.typeCode,//请假类型
                "ZANZHL1": $stateParams.newInfo.ZANZHL1,
                "ZANZHL2": $stateParams.newInfo.ZANZHL2,
                "ZANZHL3": $stateParams.newInfo.ZANZHL3,
                "ZANZHL4": $stateParams.newInfo.ZANZHL4,
                "ZXJBJ": "",
                "REL_STATUS": "",
                "BEGDA": $scope.beginTime,//请假开始时间
                "ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',//开始时间时段标记
                "ENDDA": $scope.endTime,//请假结束时间
                "ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',//结束时间时段标记
                "ABWTG": $scope.newHolidayData.days,//请假时长
                "ZFLAG_ATT": "",
                "ZPHOTO": "",
                "ZJTSY": $scope.newHolidayData.reason,//请假原因
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              },
              "I_ZMARK": ""
            }
          };
          hmsHttp.post(submitUrl, submitParam).then(function (response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function () {
                hmsPopup.showShortCenterToast('请假申请成功');
                // $cordovaDialogs.alert('','新建成功','确定');
              }, 200);
              $rootScope.$broadcast('HOLIDAY_REFRESH');
              $ionicHistory.goBack();
            } else {
              hmsPopup.showShortCenterToast(response.O_MESSAGE);
            }
          }, function (response) {
            hmsPopup.showShortCenterToast('提交失败');
          })
        } else {
          console.log('pic is not null ');
          for (var i = 0; i < $scope.imgArr.length; i++) {
            var nowDates = Date.parse(new Date()) / 1000;
            var fileName = window.localStorage.empno.toUpperCase() + nowDates + '.jpg';
            var urlname = "";
            var myParam = {
              filename: fileName,
              url: urlname//图片在服务器的路径
            };
            var options = new FileUploadOptions();
            options.filekey = "file";
            options.fileName = "image.jpg";
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            var trustAllHosts = true;
            options.params = myParam;
            if (window.localStorage.token && window.localStorage.empno) {
              var timestamp = new Date().getTime();
              var token = CryptoJS.MD5(window.localStorage.token + timestamp);
              options.headers = {
                timestamp: timestamp,
                token: ''+ token,
                userKey: window.localStorage.empno
              }
            }
            var fileTransfer = new FileTransfer();
            console.log('$scope.imgArr[i] = ' + $scope.imgArr[i]);
            console.log('上传图片baseConfig.imgUploadUrl = ' + baseConfig.imgUploadUrl);
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

      var win = function (result) {
        var picString = '';
        if (JSON.parse(result.response).result && JSON.parse(result.response).result == 'ETOKEN') {
          window.localStorage.token = '';
          $rootScope.$broadcast("REFRESH_LOGIN");
          $state.go('login');
          hmsPopup.showShortCenterToast('令牌失效,请重新登陆!');
          //重新登录
          return;
        }

        console.log('picString = ' + picString);
        $scope.newHolidayPics.push(angular.fromJson(result.response).savePath);
        console.log('$scope.newHolidayPics = ' + angular.toJson($scope.newHolidayPics));
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
          var submitUrl = baseConfig.sapUrl + 'Zhrwf20_007';
          var submitParam = {
            "ZHRWF20_007": {
              "I_CODE": 'SUBMIT',
              "I_USRID": window.localStorage.empno.toUpperCase(),
              "I_ZHRWF_020": {
                "MANDT": "",
                "WF_TYPE": "",
                "REL_NUMBER": "",
                "PERNR": '',
                "ENAME": '',
                "PERSA": '',
                "NAME1": '',
                "ORGEH": '',
                "ORGTX": '',
                "PLANS": '',
                "PLSTX": '',
                "ANSVH": '',
                "ATX": '',
                "AWART": $scope.newHolidayData.typeCode,//请假类型
                "ZANZHL1": $stateParams.newInfo.ZANZHL1,
                "ZANZHL2": $stateParams.newInfo.ZANZHL2,
                "ZANZHL3": $stateParams.newInfo.ZANZHL3,
                "ZANZHL4": $stateParams.newInfo.ZANZHL4,
                "ZXJBJ": "",
                "REL_STATUS": "",
                "BEGDA": $scope.beginTime,//请假开始时间
                "ZBEGAP": $scope.newHolidayData.beginTimeInterval == '上午' ? 'AM' : 'PM',//开始时间时段标记
                "ENDDA": $scope.endTime,//请假结束时间
                "ZENDAP": $scope.newHolidayData.endTimeInterval == '上午' ? 'AM' : 'PM',//结束时间时段标记
                "ABWTG": $scope.newHolidayData.days,//请假时长
                "ZFLAG_ATT": "",
                "ZPHOTO": picString,
                "ZJTSY": $scope.newHolidayData.reason,//请假原因
                "ZAPPR": "",
                "REMARKS": "",
                "CREATE_ID": "",
                "CREATE_ENAME": "",
                "CREATE_DATE": "",
                "CREATE_TIME": "",
                "CREATE_PLANS": "",
                "CREATE_PLSTX": "",
                "NOW_REL_STEP": "",
                "NOW_REL_ID": "",
                "NOW_REL_ENAME": "",
                "NOW_REL_DATE": "",
                "NOW_REL_TIME": "",
                "NOW_REL_PLANS": "",
                "NOW_REL_PLSTX": "",
                "NEXT_REL_STEP": "",
                "NEXT_REL_ID": "",
                "NEXT_REL_ENAME": "",
                "NEXT_REL_PLANS": "",
                "NEXT_REL_PLSTX": "",
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              },
              "I_ZMARK": ""
            }
          };
          console.log('submitParam = ' + angular.toJson(submitParam));
          hmsPopup.showLoading('正在上传图片...');
          hmsHttp.post(submitUrl, submitParam).then(function (response) {
            hmsPopup.hideLoading();
            if (response.O_TYPE == 'S') {
              $timeout(function () {
                hmsPopup.showShortCenterToast('请假申请成功');
                // $cordovaDialogs.alert('','新建成功','确定');
              }, 200);
              $scope.newHolidayData = {};
              $rootScope.$broadcast('HOLIDAY_REFRESH');
              $ionicHistory.goBack();
            } else {
              hmsPopup.showShortCenterToast(response.O_MESSAGE);
            }
          }, function (response) {
            hmsPopup.showShortCenterToast('提交失败');
          })
        }
      };
      var fail = function (error) {//图片上传失败
        //如果有Loading的话记得隐藏loading
        hmsPopup.hideLoading();
        hmsPopup.showPopup("新建申请失败");
      };
      $scope.commitHolidayInfo = function () {
        $scope.checkNextYear = parseInt(new Date().getFullYear()) + 1;
        for (var i = 0; i < $scope.imgArr.length; i++) {
          imgTotalLength++;
        }
        if ($scope.newHolidayData.typeCode == undefined) {
          hmsPopup.showShortCenterToast('请填写请假类型');
        }
        else if ($scope.newHolidayData.beginDate == undefined) {
          hmsPopup.showShortCenterToast('请填写请假开始时间');
        }
        else if ($scope.newHolidayData.endDate == undefined) {
          hmsPopup.showShortCenterToast('请填写请假结束时间');
        }
        else if ($scope.newHolidayData.typeCode == '1080' && Number($scope.newHolidayData.days) * 8 > Number($stateParams.newInfo.ZANZHL4)) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('提交的调休假超过剩余调休假数,请重新选择');
        } else if ($scope.newHolidayData.typeCode == '1010' && $scope.imgArr.length == 0) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('请您上传照片');
        } else if ($scope.newHolidayData.typeCode == '1030' && $scope.imgArr.length == 0) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('请您上传照片');
        } else if ($scope.newHolidayData.beginDate == '' || $scope.newHolidayData.beginDate == undefined || $scope.newHolidayData.endDate == '' || $scope.newHolidayData.endDate == undefined) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('您的开始日期或结束日期为空');
        } else if (($scope.newHolidayData.typeCode == '1000' || $scope.newHolidayData.typeCode == '1010') && ($scope.checkBeginYear == $scope.checkNextYear || $scope.checkEndYear == $scope.checkNextYear)) {
        console.log('submit $scope.newHolidayData.beginDate = '+$scope.newHolidayData.beginDate);
        console.log('submit $scope.newHolidayData.endDate = '+$scope.newHolidayData.endDate);
         console.log('submit scope.checkBeginYear = '+$scope.checkBeginYear);
         console.log('submit $scope.checkEndYear = '+$scope.checkEndYear);
         console.log('submit $scope.checkNextYear = '+$scope.checkNextYear);
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('请假只能请本年,请重新选择');
        } else {
          hmsPopup.confirm('您确定要提交请假申请吗?', '温馨提示', function (res) {
            if (res) {
              uploadImage();
            }
          });
        }

      };


    }]);

/**
 * Created by xuchengcheng on 2016/11/8.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.apply-center-manage', {
          url: '/apply-center-manage',
          params: {
            "flag": ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/application-manage/apply-center-manage/apply-center-manage.html',
              controller: 'applyCenterManageCtrl'
            }
          }
        })
    }]);

angular.module('applicationModule')
  .controller('applyCenterManageCtrl', [
    '$scope',
    '$state',
    "$stateParams",
    '$ionicHistory',
    'hmsPopup',
    'hmsHttp',
    'baseConfig',
    '$ionicPopover',
    '$ionicTabsDelegate',
    '$timeout',
    function ($scope,
              $state,
              $stateParams,
              $ionicHistory,
              hmsPopup,
              hmsHttp,
              baseConfig,
              $ionicPopover,
              $ionicTabsDelegate,
              $timeout) {
      hmsPopup.showLoading('加载中...');
      $scope.title = "";
      $scope.payroll = {
        "password": ""
      };
      if($stateParams.flag == 'personnel-application') {
        $scope.title = "人事申请";
      } else if($stateParams.flag == 'financial-application') {
        $scope.title = "财务申请";
      } else if($stateParams.flag == 'total-office') {
        $scope.title = "综合办公";
      }
      var url = baseConfig.baseUrl + 'appApi/getAppFuncList';
      var params = {
        "rlcode": window.localStorage.rlCode,
        "parent_func_option": $stateParams.flag
      };
      hmsHttp.post(url, params).then(function (result) {//拉取申请中心功能列表
        hmsPopup.hideLoading();
        if (result.status == 'S') {
          $scope.applyCenterList = result.data;
          console.log("功能列表", angular.toJson($scope.applyCenterList));
        } else {
          hmsPopup.showPopup(result.errorMsg);
        }
      }, function (status) {
        hmsPopup.hideLoading();
      });

      $scope.lastLineHide = function(index, itemList) {//去除最后一行的底部边线
        if(index == (itemList.length - 1)){
          return false;
        } else {
          return true;
        }
      };

      $ionicPopover.fromTemplateUrl('build/pages/application/payroll-inquire/view-payroll-popover/view-payroll-popover.html', {//查看工资单密码验证框
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.goToApplication = function(itemInfo, $event) {
        if(itemInfo.functionCode == 'qingjia_applyfor') {//请假申请
          $state.go('tab.application-ask-holiday');
        } else if(itemInfo.functionCode == 'xiaojia_applyfor'){//销假申请
          $state.go('tab.fake-leave-apply-list');
        } else if(itemInfo.functionCode == 'payroll'){//工资单
          //$scope.popover.show($event);
        } else if(itemInfo.functionCode == 'platformEmployed'){//招贤纳士
          $state.go('tab.platform-employed');
        } else if(itemInfo.functionCode == 'certificate-application'){//证明申请
          //$state.go('tab.prove-application-detail');
        } else if(itemInfo.functionCode == 'conference-reservation'){//会议室预定

        } else if(itemInfo.functionCode == 'asset-purchase'){//行政资产采购

        } else if(itemInfo.functionCode == 'visitor-management'){//访客管理

        }
      };

      $scope.viewPayroll = function () {//校验查看工资单密码
        if (!$scope.payroll.password || $scope.payroll.password == '') {
          // hmsPopup.showPopup('请输入登录密码查询');
          return;
        }
        var url = baseConfig.baseUrl + 'loginPortApi/loginPostPort';
        var params = {
          "username": window.localStorage.empno,
          "password": $scope.payroll.password
        };
        hmsHttp.post(url, params).then(function (result) {
          if (result.status == 'S') {
            $scope.payroll.password = "";
            $scope.popover.hide();
            $ionicTabsDelegate.showBar(false);
            $state.go('tab.payroll-inquire-list');
          } else {
            hmsPopup.showPopup("请确认密码是否正确");
          }
        }, function (status) {
          hmsPopup.hideLoading();
          if (status && status == '401') {
            hmsPopup.showPopup('请确认密码是否正确!');
          } else {
            hmsPopup.showPopup('请确认网络连接是否正常,或者联系管理员');
          }
        });
      };
      $scope.clearPassword = function(){
        var ele =  document.querySelector('#payrollPsw');
        var e = angular.element(ele);
        e[0].focus();
        $timeout(function () {
          e[0].focus();
        });
        $scope.payroll.password = "";
      };
      $scope.cancelPayroll = function(){
        $scope.payroll.password = "";
        $scope.popover.hide();
      };

    }]);

/**
 * Created by Richard on 16/10/25.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.charge-approval-detail', {
          url: '/charge-approval-detail',
          //params: {
          //  approvalList: "",
          //  approvalStatus: ""
          //},
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/charge-approval-detail/charge-approval-detail.html',
              controller: 'chargeApprovalDetailCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('chargeApprovalDetailCtrl', [
    '$scope',
    '$stateParams',
    '$timeout',
    '$ionicTabsDelegate',
    function ($scope,
              $stateParams,
              $timeout,
              $ionicTabsDelegate) {
      $ionicTabsDelegate.showBar(false);

      $scope.lists = [
        {
          title: '公司',
          value: '北京神州汽车租赁有限公司'
        },
        {
          title: '部门',
          value: '销售部'
        },
        {
          title: '单据类型',
          value: '通用报销单'
        },
        {
          title: '收款对象',
          value: '供应商'
        },
        {
          title: '收款方',
          value: '华夏汽车'
        },
        {
          title: '银行账号',
          value: '6228480861707160'
        },
        {
          title: '银行信息',
          value: '中国工商银行'
        },
        {
          title: '报销日期',
          value: '2016-10-10'
        },
        {
          title: '总金额',
          value: '项目车费'
        }
      ];

      $scope.lineLists = [
        {
          name: "交通费",
          amount: 1200,
          other: ""
        },
        {
          name: "交通费",
          amount: 1200,
          other: "2016.10.10（上海）~ 2016.10.14（天津）"
        }
      ];


    }
  ])

/**
 * Created by utopia_song on 16/9/7.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.approval-center-detail', {
          url: '/tab.approval-center-detail',
          params: {
            approvalList: "",
            approvalStatus: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/detail/approval-center-detail.html',
              controller: 'approvalCenterDetailCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('approvalCenterDetailCtrl', [
    '$scope',
    'hmsPopup',
    'workFlowListService',
    '$timeout',
    '$stateParams',
    'hmsHttp',
    'baseConfig',
    '$rootScope',
    '$ionicHistory',
    function ($scope,
              hmsPopup,
              workFlowListService,
              $timeout,
              $stateParams,
              hmsHttp,
              baseConfig,
              $rootScope,
              $ionicHistory) {
      $scope.approvalList = $stateParams.approvalList;
      console.log("22222222222222222222", angular.toJson($scope.approvalList));
      var approvalId = $scope.approvalList.id;
      $scope.approvalStatus = $stateParams.approvalStatus;
      $scope.approval = {
        remarks: ""
      };
      var getTodoDetail = function () {
        hmsPopup.showLoading("请稍后");
        var success = function (response) {
          hmsPopup.hideLoading();
          if (response.ET_ZHRWF_001.item.ICNUM_TYPE == '1') {
            $scope.icnumTpye = "身份证号";
          } else {
            $scope.icnumTpye = "其他证件号";
          }
          $scope.icnum = response.ET_ZHRWF_001.item.ICNUM;
          $scope.contractCompant = response.ET_ZHRWF_001.item.ZQYDWWB;
          $scope.approvalDetailStatus = response.ET_ZHRWF_001.item.REL_STATUS;
          $scope.detailList1 = [
            {
              iconLeft: "build/img/application/approval-center-detail/sector.png",
              itemLeft: "板块",
              itemLeftValue: response.ET_ZHRWF_001.item.NAME1,
              iconRight: "build/img/application/approval-center-detail/department.png",
              itemRight: "部门",
              itemRightValue: response.ET_ZHRWF_001.item.ORGTX
            },
            {
              iconLeft: "build/img/application/approval-center-detail/position.png",
              itemLeft: "职位",
              itemLeftValue: response.ET_ZHRWF_001.item.PLSTX,
              iconRight: "build/img/application/approval-center-detail/rank.png",
              itemRight: "职级",
              itemRightValue: response.ET_ZHRWF_001.item.ATX
            },
            {
              iconLeft: "build/img/application/approval-center-detail/work-city.png",
              itemLeft: "工作城市",
              itemLeftValue: response.ET_ZHRWF_001.item.ZGZCSWB,
              iconRight: "build/img/application/approval-center-detail/entry-position.png",
              itemRight: "工作地址",
              itemRightValue: response.ET_ZHRWF_001.item.ZGZDZ
            },
            {
              iconLeft: "build/img/application/approval-center-detail/hire-model.png",
              itemLeft: "聘用形式",
              itemLeftValue: response.ET_ZHRWF_001.item.PTEXT,
              iconRight: "build/img/application/approval-center-detail/apply-way.png",
              itemRight: "申请方式",
              itemRightValue: response.ET_ZHRWF_001.item.REQ_TYPE
            },
            {
              iconLeft: "build/img/application/approval-center-detail/entrant-time.png",
              itemLeft: "拟入职时间",
              itemLeftValue: response.ET_ZHRWF_001.item.ENTR_DATE,
              iconRight: "build/img/application/approval-center-detail/white.png",
              itemRight: "",
              itemRightValue: ""
            }
          ];
          $scope.detailList2 = [
            {
              iconLeft: "build/img/application/approval-center-detail/basic-salary.png",
              itemLeft: "基本工资",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE1)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/station-allowance.png",
              itemRight: "岗位津贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE2)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/lunch-allowance.png",
              itemLeft: "午餐补贴",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE3)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/other-allowance.png",
              itemRight: "其他补贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE4)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/total.png",
              itemLeft: "合计值",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.PR_VALUE1) + parseInt(response.ET_ZHRWF_001.item.PR_VALUE2) + parseInt(response.ET_ZHRWF_001.item.PR_VALUE3) + parseInt(response.ET_ZHRWF_001.item.PR_VALUE4)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/white.png",
              itemRight: "",
              itemRightValue: ""
            }
          ];
          $scope.detailList3 = [
            {
              iconLeft: "build/img/application/approval-center-detail/basic-salary.png",
              itemLeft: "基本工资",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE1)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/station-allowance.png",
              itemRight: "岗位津贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE2)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/lunch-allowance.png",
              itemLeft: "午餐补贴",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE3)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/other-allowance.png",
              itemRight: "其他补贴",
              itemRightValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE4)).toFixed(2)
            },
            {
              iconLeft: "build/img/application/approval-center-detail/total.png",
              itemLeft: "合计值",
              itemLeftValue: (parseInt(response.ET_ZHRWF_001.item.EX_VALUE1) + parseInt(response.ET_ZHRWF_001.item.EX_VALUE2) + parseInt(response.ET_ZHRWF_001.item.EX_VALUE3) + parseInt(response.ET_ZHRWF_001.item.EX_VALUE4)).toFixed(2),
              iconRight: "build/img/application/approval-center-detail/white.png",
              itemRight: "",
              itemRightValue: ""
            }
          ];
          $scope.detailList4 = [
            {
              iconLeft: "build/img/application/approval-center-detail/name.png",
              itemLeft: "姓名",
              itemLeftValue: response.ET_ZHRWF_001.item.ENAME,
              iconRight: "build/img/application/approval-center-detail/gender.png",
              itemRight: "性别",
              itemRightValue: response.ET_ZHRWF_001.item.GESCH
            }
          ];
          $scope.rel_history = [];
          if (response.ET_REL_HISTORY != "") {
            if (response.ET_REL_HISTORY.item.constructor == Array) {

              for (var i = 0; i < response.ET_REL_HISTORY.item.length; i++) {
                var item1 = response.ET_REL_HISTORY.item[i];
                var temp1 = {
                  REL_DATE: item1.REL_DATE,
                  REL_TIME: item1.REL_TIME,
                  REL_ENAME: item1.REL_ENAME,
                  REL_PLSTX: item1.REL_PLSTX,
                  REL_ACTION: item1.REL_ACTION,
                  REMARKS: item1.REMARKS
                };
                $scope.rel_history.push(temp1);
              }
              $scope.remark = response.ET_REL_HISTORY.item[0].REMARKS;
              if ($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_001.item.NEXT_REL_ENAME != '') {
                var temp2 = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_001.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_001.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp2);
              }
            } else {
              $scope.remark = response.ET_REL_HISTORY.item.REMARKS;
              var item2 = response.ET_REL_HISTORY.item;
              var temp2 = {
                REL_DATE: item2.REL_DATE,
                REL_TIME: item2.REL_TIME,
                REL_ENAME: item2.REL_ENAME,
                REL_PLSTX: item2.REL_PLSTX,
                REL_ACTION: item2.REL_ACTION,
                REMARKS: item2.REMARKS
              };
              $scope.rel_history.push(temp2);
              if ($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_001.item.NEXT_REL_ENAME != '') {
                var temp2 = {
                  REL_DATE: '',
                  REL_TIME: '',
                  REL_ENAME: response.ET_ZHRWF_001.item.NEXT_REL_ENAME,
                  REL_PLSTX: response.ET_ZHRWF_001.item.NEXT_REL_PLSTX,
                  REL_ACTION: '',
                  REMARKS: ''
                };
                $scope.rel_history.splice(0, 0, temp2);
              }
            }
          } else {
            $scope.remark = "";
          }

          if ($scope.remark == '') {
            $scope.remarkHight = {
              height: (55 + 'px')
            }
          }
        };
        var error = function () {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('获取审批列表失败,请退出页面重试获取或联系管理员!');
        };
        $timeout(function () {
          workFlowListService.getTodoDetail(success, error, approvalId);
        }, 0)
      };
      getTodoDetail();
      var approvalCommit = function (type) {
        var params = {
          "ZHRWF01_003": {
            "ET_ZHRWF_001": {
              "item": {
                "MANDT": "",
                "WF_TYPE": "01",
                "REL_NUMBER": approvalId,
                "ENAME": "",
                "ICNUM": "",
                "ICNUM_TYPE": "",
                "GESCH": "",
                "REQ_TYPE": "",
                "CREAT_BY": "",
                "MASSN": "",
                "MNTXT": "",
                "PERNR_A": "",
                "MASSG": "",
                "MGTXT": "",
                "ENTR_DATE": "",
                "ZQYDW": "",
                "ZQYDWWB": "",
                "ZGZDZ": "",
                "PERSK": "",
                "PTEXT": "",
                "PERSA": "",
                "NAME1": "",
                "ORGEH": "",
                "ORGTX": "",
                "PLANS": "",
                "PLSTX": "",
                "ANSVH": "",
                "ATX": "",
                "PR_VALUE1": "",
                "PR_VALUE2": "",
                "PR_VALUE3": "",
                "PR_VALUE4": "",
                "EX_VALUE1": "",
                "EX_VALUE2": "",
                "EX_VALUE3": "",
                "EX_VALUE4": "",
                "WAERS": "",
                "REMARKS": $scope.approval.remarks,
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
                "CHANGE_ID": "",
                "CHANGE_ENAME": "",
                "CHANGE_PLANS": "",
                "CHANGE_PLSTX": "",
                "CHANGE_DATE": "",
                "CHANGE_TIME": "",
                "REL_FLAG_END": ""
              }
            },
            "I_CODE": type,
            "I_USRID": window.localStorage.empno
          }
        };
        var url = baseConfig.sapUrl + 'Zhrwf01003';
        hmsPopup.showLoading("请稍后");
        hmsHttp.post(url, params).then(function (response) {
          hmsPopup.hideLoading();
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast("APPROVAL_SUCCESS");
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast("数据处理成功");
            }, 200)
          } else {
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
          }
        }, function (response) {
          hmsPopup.hideLoading();
        });
        //  .error(function (response) {
        //  hmsPopup.hideLoading();
        //})
      };
      $scope.approvalCommitConfirm = function (type) {
        hmsPopup.confirm('您确定要提交审批结果吗?', '温馨提示', function (res) {
          if (res) {
            approvalCommit(type);
          }
        });
      };


    }]);

/**
 * Created by xuchengcheng on 2016/11/10.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.fake-leave-approval-detail', {
          url: '/tab.fake-leave-approval-detail',
          params: {
            receiptNum: "",
            approvalStatus: ""
          },
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/fake-leave-approval-detail/fake-leave-approval-detail.html',
              controller: 'FakeLeaveApprovalDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('FakeLeaveApprovalDetailCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$stateParams',
    '$rootScope',
    '$ionicHistory',
    '$timeout',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $stateParams,
              $rootScope,
              $ionicHistory,
              $timeout) {
      $scope.approvalStatus = $stateParams.approvalStatus;
      $scope.approval = {
        remarks: ""
      };
      var cancelUrl = baseConfig.sapUrl + 'Zhrwf21_002';
      var cancelParam  =  {
        "ZHRWF21_002": {
          "ET_ZHRWF_021_S": {
            "item": ""
          },
          "I_CODE": 'CANCEL',
          "I_USRID": window.localStorage.empno.toUpperCase(),
          "I_ZHRWF_021": {
            "MANDT": "",
            "WF_TYPE": "",
            "REL_NUMBER": $stateParams.receiptNum,
            "REL_NUMBER20": "",
            "PERNR": "",
            "ENAME": "",
            "PERSA": "",
            "NAME1": "",
            "ORGEH": "",
            "ORGTX": "",
            "PLANS": "",
            "PLSTX": "",
            "ANSVH": "",
            "ATX": "",
            "AWART": "",
            "REL_STATUS": "",
            "BEGDA": "",
            "ZBEGAP": "",
            "ENDDA": "",
            "ZENDAP": "",
            "ABWTG": "",
            "ZFLAG_ATT": "",
            "ZPHOTO": "",
            "ZJTSY": "",
            "ZAPPR": "",
            "REMARKS": $scope.approval.remarks,
            "CREATE_ID": "",
            "CREATE_ENAME": "",
            "CREATE_DATE": "",
            "CREATE_TIME": "",
            "CREATE_PLANS": "",
            "CREATE_PLSTX": "",
            "NOW_REL_STEP": "",
            "NOW_REL_ID": "",
            "NOW_REL_ENAME": "",
            "NOW_REL_DATE": "",
            "NOW_REL_TIME": "",
            "NOW_REL_PLANS": "",
            "NOW_REL_PLSTX": "",
            "NEXT_REL_STEP": "",
            "NEXT_REL_ID": "",
            "NEXT_REL_ENAME": "",
            "NEXT_REL_PLANS": "",
            "NEXT_REL_PLSTX": "",
            "CHANGE_ID": "",
            "CHANGE_ENAME": "",
            "CHANGE_PLANS": "",
            "CHANGE_PLSTX": "",
            "CHANGE_DATE": "",
            "CHANGE_TIME": "",
            "REL_FLAG_END": ""
          }
        }
      };
      var url = baseConfig.sapUrl + 'Zhrwf21_005';
      var param = {
        "ZHRWF21_005": {
          "ET_ZHREL_HISTORY": {
            "item": {
              "MANDT": "",
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
              "REMARKS": ""
            }
          },
          "ET_ZHRWF_021": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_NUMBER20": "",
              "PERNR": "",
              "ENAME": "",
              "PERSA": "",
              "NAME1": "",
              "ORGEH": "",
              "ORGTX": "",
              "PLANS": "",
              "PLSTX": "",
              "ANSVH": "",
              "ATX": "",
              "AWART": "",
              "REL_STATUS": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": "",
              "ZFLAG_ATT": "",
              "ZPHOTO": "",
              "ZJTSY": "",
              "ZAPPR": "",
              "REMARKS": "",
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "CHANGE_ID": "",
              "CHANGE_ENAME": "",
              "CHANGE_PLANS": "",
              "CHANGE_PLSTX": "",
              "CHANGE_DATE": "",
              "CHANGE_TIME": "",
              "REL_FLAG_END": ""
            }
          },
          "ET_ZHRWF_021_S": {
            "item": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": "",
              "REL_SEQNR": "",
              "AWART": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": ""
            }
          },
          "I_RELNUMBER": $stateParams.receiptNum
        }
      };
      hmsPopup.showLoading('请稍后');
      hmsHttp.post(url, param).then(function (response) {
        console.info(angular.toJson(response,true));
        hmsPopup.hideLoading();
        if (response.R_TYPE == 'S') {
          $scope.fakeLeaveDetail = response;
          $scope.fakeLeaveTime = [];
          $scope.fakeLeaveHistory = [];
          if (response.ET_ZHRWF_021_S.item.constructor == Array) {//销假时间段
            $scope.holidayAllDate = 0;
            angular.forEach(response.ET_ZHRWF_021_S.item, function (item, index) {
              var temp = {
                BEGDA: item.BEGDA,
                ENDDA: item.ENDDA,
                ZBEGAP: item.ZBEGAP,
                ZENDAP: item.ZENDAP,
                ABWTG: item.ABWTG
              };
              $scope.holidayAllDate += Number(temp.ABWTG);
              $scope.fakeLeaveTime.push(temp);
            })
          } else {
            $scope.holidayAllDate = 0;
            var temp = {
              BEGDA: response.ET_ZHRWF_021_S.item.BEGDA,
              ENDDA: response.ET_ZHRWF_021_S.item.ENDDA,
              ZBEGAP: response.ET_ZHRWF_021_S.item.ZBEGAP,
              ZENDAP: response.ET_ZHRWF_021_S.item.ZENDAP,
              ABWTG: response.ET_ZHRWF_021_S.item.ABWTG
            };
            $scope.holidayAllDate = Number(temp.ABWTG);
            $scope.fakeLeaveTime.push(temp);
          }
          if (response.ET_ZHREL_HISTORY.item.constructor == Array) {//审批历史
            angular.forEach(response.ET_ZHREL_HISTORY.item, function (item, index) {
              $scope.relStatus = "";
              if(item.REL_ACTION == 'SUBMIT'){
                $scope.relStatus = "提交";
              } else if(item.REL_ACTION == 'SAVE') {
                $scope.relStatus = "保存";
              } else if(item.REL_ACTION == 'REJECT') {
                $scope.relStatus = "拒绝";
              } else if(item.REL_ACTION == 'APPROVE') {
                $scope.relStatus = "同意";
              } else if(item.REL_ACTION == 'RETURN') {
                $scope.relStatus = "退回";
              } else if(item.REL_ACTION == 'CANCEL') {
                $scope.relStatus = "撤回";
              }
              var temp = {
                fakeLeaveTrackDate: item.REL_DATE + ' ' + item.REL_TIME,
                fakeLeaveTrackEmp: item.REL_ENAME,
                fakeLeaveTrackPosition: item.REL_PLSTX,
                fakeLeaveTrackStatus: $scope.relStatus,
                fakeLeaveTrackRemark: item.REMARKS
              };
              $scope.fakeLeaveHistory.push(temp);
            });
            if($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_021.item.NEXT_REL_ENAME != '') {//下一个审批人
              var temp1 = {
                fakeLeaveTrackDate: '',
                fakeLeaveTrackEmp: response.ET_ZHRWF_021.item.NEXT_REL_ENAME,
                fakeLeaveTrackPosition: response.ET_ZHRWF_021.item.NEXT_REL_PLSTX,
                fakeLeaveTrackStatus: '待审批',
                fakeLeaveTrackRemark: ''
              };
              $scope.fakeLeaveHistory.splice(0, 0, temp1);
            }
          } else {
            $scope.relStatus = "";
            if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'SUBMIT'){
              $scope.relStatus = "提交";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'SAVE') {
              $scope.relStatus = "保存";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'REJECT') {
              $scope.relStatus = "拒绝";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'APPROVE') {
              $scope.relStatus = "同意";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'RETURN') {
              $scope.relStatus = "退回";
            } else if(response.ET_ZHREL_HISTORY.item.REL_ACTION == 'CANCEL') {
              $scope.relStatus = "撤回";
            }

            console.log($scope.relStatus);
            var temp = {
              fakeLeaveTrackDate: response.ET_ZHREL_HISTORY.item.REL_DATE + ' ' + response.ET_ZHREL_HISTORY.item.REL_TIME,
              fakeLeaveTrackEmp: response.ET_ZHREL_HISTORY.item.REL_ENAME,
              fakeLeaveTrackPosition: response.ET_ZHREL_HISTORY.item.REL_PLSTX,
              fakeLeaveTrackStatus: $scope.relStatus,
              fakeLeaveTrackRemark: response.ET_ZHREL_HISTORY.item.REMARKS
            };
            $scope.fakeLeaveHistory.push(temp);
            if($scope.approvalStatus != 'Untreated' && response.ET_ZHRWF_021.item.NEXT_REL_ENAME != '') {//下一个审批人
              var temp1 = {
                fakeLeaveTrackDate: '',
                fakeLeaveTrackEmp: response.ET_ZHRWF_021.item.NEXT_REL_ENAME,
                fakeLeaveTrackPosition: response.ET_ZHRWF_021.item.NEXT_REL_PLSTX,
                fakeLeaveTrackStatus: '待审批',
                fakeLeaveTrackRemark: ''
              };
              $scope.fakeLeaveHistory.splice(0, 0, temp1);
            }
          }
        } else {
          hmsPopup.showShortCenterToast(response.R_MESSAGE);
        }
      }, function (response) {
        hmsPopup.hideLoading();
        hmsPopup.showShortCenterToast('加载失败,请检查网络');
      });

      var approvalCommit = function(type) {
        var url = baseConfig.sapUrl + 'Zhrwf21_002';
        var param = {
          "ZHRWF21_002": {
            "ET_ZHRWF_021_S": {
              "item": ""
            },
            "I_CODE": type,
            "I_USRID": window.localStorage.empno.toUpperCase(),
            "I_ZHRWF_021": {
              "MANDT": "",
              "WF_TYPE": "",
              "REL_NUMBER": $stateParams.receiptNum,
              "REL_NUMBER20": "",
              "PERNR": "",
              "ENAME": "",
              "PERSA": "",
              "NAME1": "",
              "ORGEH": "",
              "ORGTX": "",
              "PLANS": "",
              "PLSTX": "",
              "ANSVH": "",
              "ATX": "",
              "AWART": "",
              "REL_STATUS": "",
              "BEGDA": "",
              "ZBEGAP": "",
              "ENDDA": "",
              "ZENDAP": "",
              "ABWTG": "",
              "ZFLAG_ATT": "",
              "ZPHOTO": "",
              "ZJTSY": "",
              "ZAPPR": "",
              "REMARKS": $scope.approval.remarks,
              "CREATE_ID": "",
              "CREATE_ENAME": "",
              "CREATE_DATE": "",
              "CREATE_TIME": "",
              "CREATE_PLANS": "",
              "CREATE_PLSTX": "",
              "NOW_REL_STEP": "",
              "NOW_REL_ID": "",
              "NOW_REL_ENAME": "",
              "NOW_REL_DATE": "",
              "NOW_REL_TIME": "",
              "NOW_REL_PLANS": "",
              "NOW_REL_PLSTX": "",
              "NEXT_REL_STEP": "",
              "NEXT_REL_ID": "",
              "NEXT_REL_ENAME": "",
              "NEXT_REL_PLANS": "",
              "NEXT_REL_PLSTX": "",
              "CHANGE_ID": "",
              "CHANGE_ENAME": "",
              "CHANGE_PLANS": "",
              "CHANGE_PLSTX": "",
              "CHANGE_DATE": "",
              "CHANGE_TIME": "",
              "REL_FLAG_END": ""
            }
          }
        };
        hmsPopup.showLoading('请稍后');
        hmsHttp.post(url, param).then(function (response) {
          hmsPopup.hideLoading();
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast("APPROVAL_SUCCESS");
            $ionicHistory.goBack();
            $timeout(function(){
              hmsPopup.showShortCenterToast("审批成功");
            },200)
          } else {
            hmsPopup.showShortCenterToast(response.O_MESSAGE);
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('调用失败,请检查网络');
        })
      };
      $scope.approvalCommitConfirm = function (type) {
        hmsPopup.confirm('您确定要提交审批结果吗?', '温馨提示', function (res) {
          if (res) {
            approvalCommit(type);
          }
        });
      };

      /**
       * 撤回休假申请
       * @type function
       */
      var cancelFakeHoliday = function () {
        hmsPopup.showLoading('请稍等...');
        hmsHttp.post(cancelUrl, cancelParam).then(function (response) {
          hmsPopup.hideLoading();
          console.group('撤回结果');
          console.info(angular.toJson(response,true));
          if (response.O_TYPE == 'S') {
            $rootScope.$broadcast('CANCEL_SUCCESS');
            $ionicHistory.goBack();
            $timeout(function () {
              hmsPopup.showShortCenterToast('撤回成功');
            })
          } else {
            hmsPopup.showPopup(response.O_MESSAGE,function(res){
              $rootScope.$broadcast('CANCEL_SUCCESS');
              $ionicHistory.goBack();
            });
          }
        }, function (response) {
          hmsPopup.hideLoading();
          hmsPopup.showShortCenterToast('撤回失败,请检查网络');
        })
      };
      $scope.cancelFakeHolidayConfirm = function(){
        hmsPopup.confirm('您确定要撤销该次销假申请吗?', '温馨提示', function (res) {
          if (res) {
            cancelFakeHoliday();
          }
        });
      }
    }]);


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

/**
 * Created by utopia_song on 17/1/8.
 */

angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.positive-approval-tryDes', {
          url: '/tab.positive-approval-tryDes',
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/positive-approval-detail/positive-approval-tryDes.html',
              controller: 'positiveApprovalTryDesCtrl'
            }
          },
          params:{
            tryDes:''
          }
        });
    }]);
angular.module('applicationModule')
  .controller('positiveApprovalTryDesCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    'hmsHttp',
    'hmsPopup',
    '$ionicScrollDelegate',
    '$rootScope',
    '$timeout',
    '$stateParams',
    '$ionicHistory',
    function ($scope,
              $state,
              baseConfig,
              hmsHttp,
              hmsPopup,
              $ionicScrollDelegate,
              $rootScope,
              $timeout,
              $stateParams,
              $ionicHistory) {

        $scope.goBack = function () {
          $ionicHistory.goBack();
        };
      $scope.positiveTryDes = {};
      $scope.positiveTryDes.tryDes = $stateParams.tryDes;
      console.log('tryDes = '+$stateParams.tryDes);
    }]);

/**
 * Created by hulk on 16-10-25.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.charge-line-detail', {
          url: '/tab.charge-line-detail',
          params: {day: {}},
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/charge-approval-detail/charge-line-detail/charge-line-detail.html',
              controller: 'ChargeLineCtrl'
            }
          }
        });
    }]);
angular.module('applicationModule')
  .controller('ChargeLineCtrl',['$scope',function ($scope) {

    $scope.approvalHeads = [
      {
        title: '预算项目',
        desc: '手机费'
      },
      {
        title: '出发日期',
        desc: '2016-10-10'
      },
      {
        title: '返程日期',
        desc: '2016-10-15'
      },
      {
        title: '天数',
        desc: '5天'
      },
      {
        title: '出发地',
        desc: '上海'
      },
      {
        title: '返程地',
        desc: '天津'
      },
      {
        title: '发票项目',
        desc: '固定电话费'
      },
      {
        title: '交通工具',
        desc: '缺省车辆类别'
      },
      {
        title: '发票性质',
        desc: '专票'
      },
      {
        title: '发票号码',
        desc: '139813718'
      },
      {
        title: '发票总额',
        desc: '1200.00'
      },
      {
        title: '税额',
        desc: '72.00'
      },
      {
        title: '备注',
        desc: '手机费用'
      }
    ];

    $scope.imgFiles = [
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/img/main/more.png',
        type: 'IMG'
      },
      {
        url: 'build/12344553',
        type: 'FILE',
        name: '费用报销单01.doc'
      },
    ];


    $scope.detail = 'Y';






  }]);

/**
 * Created by hulk on 16-10-25.
 */
angular.module('myApp')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.line-detail', {
          url: '/tab.line-detail',
          params: {day: {}},
          views: {
            'tab-application': {
              templateUrl: 'build/pages/application/approval-center/charge-approval-detail/line-detail/line-detail.html',
              controller: 'LineDetailCtrl'
            }
          }
        });
    }]);

angular.module('applicationModule')
  .controller('LineDetailCtrl',['$scope',function ($scope) {

  }])
