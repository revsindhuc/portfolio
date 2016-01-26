//Angular application bootstrap

$(document).ready( function(){
    
    $('#dg-container').gallery({
					autoplay	:	true
				});
    
    //Initializing the circular progress bars in the skills page
    $('#skills').waypoint(function(){
        $('.chart').each(function(){
            $(this).easyPieChart({
                size:170,
                animate: 2000,
                lineCap:'butt',
                scaleColor: false,
                barColor: '#555555',
                trackColor: 'rgba(239, 239, 239, 0.2)',
                lineWidth: 10
            });
        });
    },{offset:'80%'});
    
    // Initializing the grid in the portfolio page
    var $isotopeGrid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        resizable : true,
        transformsEnabled: true,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: true
        }
     });

    var $previousCategory; 
    $('.portfolio_filter_buttons').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $isotopeGrid.isotope({ filter: filterValue });
        onResize();
    });
    
    // change is-checked class on buttons
    $('.portfolio_filter_buttons').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.current-category').removeClass('current-category');
            $( this ).addClass('current-category');
            onResize();
        });
    });
    
    
    
    // Loading Google Maps in the Contact Page
    loadGoogleMaps();
    function loadGoogleMaps() {
        var googleMap;
        var googleMapCoordData = new google.maps.LatLng( 40.089696,  -75.772522);
        var googleMapMarker;
        
        
        function initializeGoogleMaps() {
            var mapOptions = {
                zoom: 8,
                center: googleMapCoordData,
                scrollwheel: false,
                panControl: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                styles: [	{		featureType:"water",		elementType:"all",		stylers:[			{hue:"#bbbbbb"},			{saturation:-100},			{lightness:-4},			{visibility:"on"}		]	},{		featureType:"landscape",		elementType:"all",		stylers:[			{hue:"#999999"},			{saturation:-100},			{lightness:-33},			{visibility:"on"}		]	},{		featureType:"road",		elementType:"all",		stylers:[			{hue:"#999999"},			{saturation:-100},			{lightness:-6},			{visibility:"on"}		]	},{		featureType:"poi",		elementType:"all",		stylers:[			{hue:"#aaaaaa"},			{saturation:-100},			{lightness:-15},			{visibility:"on"}		]	}]
            }
            var googleMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            googleMap.panBy(0, 45);
            googleMapMarker = new google.maps.Marker({
                map:googleMap,
                draggable:true,
                position: googleMapCoordData
            });
        }

        google.maps.event.addDomListener(window, "load", initializeGoogleMaps);    
    }
    
    function onResize(event) {
            var width = fullWidth();
            var height = fullHeight();
            
            // Contact me page elements 
            $(".fullwidth").width(width);
            $(".fullheight").height(height);
            $(".gmap").width(width);

            // Aligning page navigation icons                
            var nextPageNavContainerTop = height - 80;
            var nextPageNavContainerLeft = (width/2) - (32)/2;
            $(".nextPageNavContainer").css({top: nextPageNavContainerTop, left: nextPageNavContainerLeft});
            
            // Aligning portfolio page elements
            var gridItemHeight = $(".grid-item .thumbnail img").height();
            if(gridItemHeight !== 0) {
                $(".grid-item .thumbnail").height(gridItemHeight);
                $(".grid-item").height(gridItemHeight);
            
                if(typeof(event) !== "undefined") {
                    $(".grid").height(gridItemHeight*2);
                    $(".portfolio-content").height((gridItemHeight*2) + 10);
                }
            }
            
            if($(".grid-item .thumbnail img").width() < $(".grid-item").width()) {
                $(".grid-item .thumbnail img").width($(".grid-item").width());
            }
            $isotopeGrid.isotope('layout');
    }
    onResize();
    $(window).resize(onResize);
    
    //Utility Functions
    function fullWidth(){
        return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
    }
    function fullHeight(){
        return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
    }
});

var portfolioDetails = [{
      thumbnailUrl: 'img/portfolio_1.png',
      imageUrl: 'img/portfolio_1.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics',
      skills: [{
            icon:'fa-archive',
            text: 'Graphic Design, Web Icons'
          },
          {
            icon:'fa-check',
            text: 'Vector Icons, Responsive, Scalable'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator' 
          }],
      heading: 'Animal Web Icons',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_2.png',
      imageUrl: 'img/portfolio_2.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics web-design',
      skills: [{
            icon:'fa-archive',
            text: 'Web Design, Animation'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Rich, Performance'             
          },
          {
            icon:'fa-cog',
            text: 'HTML5, CSS3, Adobe Illustrator' 
          },
          {
            icon:'fa-link',
            text: '<a href="portfolio/cssanimation/index.html" target="_blank">Click here for demo</a>' 
          }],
      heading: '100% CSS based ANIMATION',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_3.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics',
      imageUrl: 'img/portfolio_3.png',
      skills: [{
            icon:'fa-archive',
            text: 'Graphic Design, Web Icons'
          },
          {
            icon:'fa-check',
            text: 'Vector Icons, Responsive, Scalable'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator' 
          }],
      heading: 'Animal Web Icons',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_4.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics',
      imageUrl: 'img/portfolio_4.png',
      skills: [{
            icon:'fa-archive',
            text: 'Web Design, Animation'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Rich, Performance'             
          },
          {
            icon:'fa-cog',
            text: 'HTML5, CSS3, Adobe Illustrator' 
          }],
      heading: '100% CSS based ANIMATION',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_5.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics',
      imageUrl: 'img/portfolio_5.png',
      skills: [{
            icon:'fa-archive',
            text: 'Graphic Design, Web Icons'
          },
          {
            icon:'fa-check',
            text: 'Vector Icons, Responsive, Scalable'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator' 
          }],
      heading: 'Animal Web Icons',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_6.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics',
      imageUrl: 'img/portfolio_6.png',
      skills: [{
            icon:'fa-archive',
            text: 'Web Design, Animation'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Rich, Performance'             
          },
          {
            icon:'fa-cog',
            text: 'HTML5, CSS3, Adobe Illustrator' 
          }],
      heading: '100% CSS based ANIMATION',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_7.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics',
      imageUrl: 'img/portfolio_7.png',
      skills: [{
            icon:'fa-archive',
            text: 'Graphic Design, Web Icons'
          },
          {
            icon:'fa-check',
            text: 'Vector Icons, Responsive, Scalable'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator' 
          }],
      heading: 'Animal Web Icons',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_8.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'graphic-design web-graphics web-design',
      imageUrl: 'img/portfolio_8.png',
      skills: [{
            icon:'fa-archive',
            text: 'Web Design, Animation'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Rich, Performance'             
          },
          {
            icon:'fa-cog',
            text: 'HTML5, CSS3, Adobe Illustrator' 
          },
          {
            icon:'fa-link',
            text: '<a href="portfolio/geo/geoView.html" target="_blank">Click here for demo</a>' 
          }],
      heading: '100% CSS based ANIMATION',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  
  ];

var revaPortfolioApp = angular.module('RevaPortfolioApp', ['ngMaterial', 'ngMessages', 'firebase']);
revaPortfolioApp.controller("PortfolioController", function($scope, $sce, $mdDialog, $mdMedia) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    
    $scope.details = portfolioDetails;
    // Making sure that the URLs and HTML are marked as safe
    angular.forEach($scope.details, function(value, key){
      $scope.details[key].imageUrl = $sce.trustAsHtml($scope.details[key].imageUrl);
      $scope.details[key].thumbnailUrl = $sce.trustAsHtml($scope.details[key].thumbnailUrl);
      angular.forEach($scope.details[key].skills, function(skillValue, skillKey){
          $scope.details[key].skills[skillKey].text = $sce.trustAsHtml($scope.details[key].skills[skillKey].text);
      });
    });
    
    $scope.showDialog = function(ev, index) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
        controller: DialogController,
        templateUrl: 'portfolio-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        locals: {
            index: index
        }
        })
        .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
        $scope.status = 'You cancelled the dialog.';
        });
        
        $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
});

revaPortfolioApp.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('');
}]);



function DialogController($scope, $sce, $mdDialog, index) {
  
  $scope.details = portfolioDetails;
  
  $scope.detail = $scope.details[index];
  $scope.title = $scope.details[index].heading;
  
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

revaPortfolioApp.controller("ContactMeController", function($scope, ContactMeService) {
 $scope.newMessage = { name: '', email: '', message: ''};
 $scope.addMessage = function() {
     ContactMeService.addMessage($scope.newMessage);
 };
});
revaPortfolioApp.constant('FIREBASE_URI', 'https://reva-portfolio.firebaseio.com/');
revaPortfolioApp.factory("ContactMeService", function($firebaseArray, FIREBASE_URI){
    var ref = new Firebase(FIREBASE_URI);
    var messages = $firebaseArray(ref);
    
    var addMessage = function(message) {
      messages.$add(message);  
    };
    
    return {
        addMessage : addMessage
    };
});
