/***
 * Created By Revathy Sindhu Chellapandian
 *
 *  Angular Application for the Military Alphabets App
 */
var militaryAlphaModule = angular.module('MilitaryAlphabetApp', ['ngMaterial', 'ngMessages']);

militaryAlphaModule.controller("MilitaryAlphabetController", function($scope, $mdMedia, MilitaryAlphabets, MilitaryAlphabetService){
    
    $scope.referenceList = MilitaryAlphabetService.getReference();
    
    $scope.firstText = '';
    $scope.secondText = '';
    
    $scope.firstWords = [];
    $scope.secondWords = [];
    
    $scope.showSecondCard = isLargeDevice();
    $scope.$watch(isLargeDevice, function(largeDevice) {
        $scope.showSecondCard = largeDevice;
    });

    $scope.$watch('firstText', function(newValue, oldValue) {
        textChanged($scope, 'firstWords', newValue, oldValue);
    });
    
    $scope.$watch('secondText', function(newValue, oldValue) {
        textChanged($scope, 'secondWords', newValue, oldValue);
    });
    
    function isLargeDevice() {
        return $mdMedia('min-width: 1060px');
    }
    
    function textChanged($scope, property, newValue, oldValue) {
        if(newValue === oldValue) {
            return;
        }
        if(newValue==="" || newValue.length==0) {
            $scope[property]=[];
            return;
        }
        var words = MilitaryAlphabetService.getMilitaryWords(newValue.toUpperCase());
        if(angular.isDefined(words) && words!== null && words.length>0) {
           angular.copy(words,$scope[property]);
        }
        else {
             $scope[property]=[];
        }
    }

});

militaryAlphaModule.service("MilitaryAlphabetService", function(MilitaryAlphabets){
    var SPACER = "--SPACE--";
    var NULL = null;

    /***
     * Gets the NATO Phonetic Word for a given alphabet
     * @param alphabet
     * @returns {*}
     * String - NATO Phonetic Word or
     * NULL if the input alphabet is invalid
     */
    function getWord(alphabet) {
        if(angular.isUndefined(alphabet) || alphabet===null || !(angular.isString(alphabet))) {
            return NULL;
        }
        
        alphabet=alphabet.trim();
        if(alphabet.length==0) {
            return SPACER;
        } 
        else if(alphabet.length>1) {
            return NULL;
        }
        
        alphabet = alphabet.toUpperCase(); 
        
        var regex = /[A-Z]/;
        if(regex.test(alphabet)){
            return MilitaryAlphabets[alphabet];
        }
        else {
            return alphabet;
        }
    }

    /***
     * Given a text input, this function returns an array of
     * words where each word is the NATO Phonetic Word for each alphabet
     * @param text
     * @returns {*} Array of words
     */
    function getWords(text) {
        if(angular.isUndefined(text) || text===null || !(angular.isString(text))) {
            return NULL;
        }
        
        text=text.trim();
        if(text.length==0) {
            return SPACER;
        }
        var i=0, currentChar='', currentWord='';
        var words=[];
        for(i=0;i<text.length;i++) {
            currentChar = text.charAt(i);
            currentWord = getWord(currentChar);
            if(angular.isDefined(currentWord) && currentWord !== NULL) {
                words.push({'alphabet': currentChar, 'word': currentWord});
            }
        }
        return words;
    }
    
    function getReference() {
        var refArray = [];
        angular.forEach(MilitaryAlphabets, function(value, key){
            refArray.push({'alphabet': key, 'word': value});
        });
        return refArray;
    }
    
    return {
        SPACER: SPACER,
        NULL: NULL,
        getMilitaryWords : getWords,
        getReference: getReference
    };
    
});

/***
 * The reference Object for the NATO Phonetic Words for alphabets
 */
militaryAlphaModule.constant("MilitaryAlphabets", {
    A : 'Alfa',
    B : 'Bravo',
    C : 'Charlie',
    D : 'Delta',
    E : 'Echo',
    F : 'Foxtrot',
    G : 'Golf',
    H : 'Hotel',
    I : 'India',
    J : 'Juliett',
    K : 'Kilo',
    L : 'Lima',
    M : 'Mike',
    N : 'November',
    O : 'Oscar',
    P : 'Papa',
    Q : 'Quebec',
    R : 'Romeo',
    S : 'Sierra',
    T : 'Tango',
    U : 'Uniform',
    V : 'Victor',
    W : 'Whiskey',
    X : 'X-Ray',
    Y : 'Yankee',
    Z : 'Zulu'
});