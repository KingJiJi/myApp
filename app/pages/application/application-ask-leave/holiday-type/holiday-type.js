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
