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
