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
      imageUrl: 'img/portfolio_1L.png',
      shortDescription: 'Responsive, scalable animal vector icons for the web',
      categories: 'web-graphics',
      skills: [{
            icon:'fa-archive',
            text: 'Web Graphics, Web Icons'
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
      description: ' Created six different animal portraits from one and the same circle! Made a set of trendy flat elements using basic shapes, the shape builder tool, the pathfinder panel and some other useful functions of Adobe Illustrator. '
  },
  {
      thumbnailUrl: 'img/portfolio_2.png',
      imageUrl: 'img/portfolio_2L.png',
      shortDescription: 'Web Animation using only CSS3',
      categories: 'web-design',
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
      heading: 'CSS based ANIMATION',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ducimus eum, vel sequi sunt harum perspiciatis. Asperiores enim praesentium similique, adipisci modi illo eos magnam nisi, pariatur atque perspiciatis cum? '
  },
  {
      thumbnailUrl: 'img/portfolio_3.png',
      shortDescription: 'Cute Furry Vector Monster using Illustrator',
      categories: 'web-graphics',
      imageUrl: 'img/portfolio_3L.png',
      skills: [{
            icon:'fa-archive',
            text: 'Web Graphics'
          },
          {
            icon:'fa-check',
            text: 'Vector Icons, Responsive, Scalable'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator' 
          }],
      heading: 'Furry Monster',
      description: ' Started working with the basic shapes, then used a variety of gradients to add depth. Finally finished it off with some detailed fur effects to really lift the design from the screen. '
  },
  {
      thumbnailUrl: 'img/portfolio_4.png',
      shortDescription: 'Cartoon Character',
      categories: 'web-graphics',
      imageUrl: 'img/portfolio_4L.png',
      skills: [{
            icon:'fa-archive',
            text: 'Web Graphics'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Rich, Performance'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator'
          }],
      heading: 'Cartoon Character',
      description: ' Using basic tools and effects along with the Blend Tool created the head and the ears of the character. Then did the hair with custom brushes and did the nose and a shadow using two simple blend and a bunch of Drop Shadow effects. Using the Appearance panel created the eyes and finally added the bow tie using the Pucker & Bloat and the Zig Zag effects. '
  },
  {
      thumbnailUrl: 'img/portfolio_5.png',
      shortDescription: 'Dual Exposure Photo Effect in Photoshop',
      categories: 'graphic-design',
      imageUrl: 'img/portfolio_5L.png',
      skills: [{
            icon:'fa-archive',
            text: 'Graphic Design'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Scalable'
          },
          {
            icon:'fa-cog',
            text: 'Adobe Photoshop'
          }],
      heading: 'Dual Exposure Effect',
      description: ' Used various text brushes and worked with shadows and midtones. Then adjusted the brush settings and painted some text. Finally created a layer mask and painted using various brushes. '
  },
  {
      thumbnailUrl: 'img/portfolio_6.png',
      shortDescription: 'Wine Bottle Art using Photoshop',
      categories: 'graphic-design',
      imageUrl: 'img/portfolio_6L.png',
      skills: [{
            icon:'fa-archive',
            text: 'Graphic Design'
          },
          {
            icon:'fa-check',
            text: 'Responsive, Rich, Performance'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Photoshop'
          }],
      heading: 'Wine Bottle Art',
      description: ' The Wine Bottle Art is one of my college project. Used various shadows, reflection and cutting techniques to make the bottle realistic and finally finished it off using photoshop. '
  },
  {
      thumbnailUrl: 'img/portfolio_7.png',
      shortDescription: 'Draw Little Red Riding Hood with Basic Shapes in Illustrator',
      categories: 'web-graphics',
      imageUrl: 'img/portfolio_7L.png',
      skills: [{
            icon:'fa-archive',
            text: 'Web Graphics, Web Icons'
          },
          {
            icon:'fa-check',
            text: 'Vector Icons, Responsive, Scalable'             
          },
          {
            icon:'fa-cog',
            text: 'Adobe Illustrator' 
          }],
      heading: 'Red Riding Hood',
      description: 'Created an adorable cartoon Little Red Riding Hood with her basket and bunch of flowers using the Pen Tool (P) and basic shapes such as the Rectangle Tool (M), the Ellipse Tool (L) and the Polygon Tool in Illustrator. '
  },
  {
      thumbnailUrl: 'img/portfolio_8.png',
      shortDescription: 'Web Based Visualization of Financial Transactions using d3js',
      categories: 'web-design',
      imageUrl: 'img/portfolio_8L.png',
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
      heading: 'Geographic Animation',
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
