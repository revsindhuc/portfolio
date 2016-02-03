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
});
