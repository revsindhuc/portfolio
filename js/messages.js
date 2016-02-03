angular.module('RevaPortfolioMessagesApp', ['ngMaterial', 'firebase'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple');
})
.controller("RevaPortfolioMessagesController", function($scope, RevaPortfolioMessagesService) {
     $scope.messages = RevaPortfolioMessagesService.getMessages();
})
.constant('FIREBASE_URI', 'https://reva-portfolio.firebaseio.com/')
.factory("RevaPortfolioMessagesService", function($firebaseArray, FIREBASE_URI){
    var ref = new Firebase(FIREBASE_URI);
    var messages = $firebaseArray(ref);
    
    var getMessages = function() {
      return messages;  
    };
    
    return {
        getMessages : getMessages
    };
})
.filter("toArray", function () {
    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }
        var customArray=[];
        angular.forEach(obj, function(value, key){
            if(value && angular.isObject(value) && !(angular.isFunction(value))) {
                if(angular.isDefined(value.when) && angular.isNumber(value.when)) {
                    var date = new Date(value.when);
                    value.timestamp = date;        
                }
                customArray.push(value);
            }
        })    
        return customArray;
    }
})
.config(function($locationProvider, $mdIconProvider){
    $locationProvider.html5Mode(true).hashPrefix('');
    $mdIconProvider.defaultIconSet('img/mdi.svg');
});
