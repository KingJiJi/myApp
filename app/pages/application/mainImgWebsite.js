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
