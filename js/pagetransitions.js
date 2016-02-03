var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
        pagesCount = $pages.length,
        $previousPageLink = $('.previousPageLink'),
        $nextPageLink = $('.nextPageLink'),
        $navigationLink = $('#navigateBtn'),
        pageNames = ['about', 'skills', 'work', 'education', 'portfolio', 'contact'],
        sortedPages=[],
        pagesByName={},
		current = 0,
        $currentPage,
        //$previousPage,
        //$nextPage,
        pagesMap=[],
        currentPageName = 'about',
        //previousPageName = null,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
            var pageName = $page.attr( 'name' );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
            $page.data( 'name', pageName );
            pagesByName[pageName] = $page;
		} );
        
        initializePages();
        
        $currentPage = getPage(currentPageName);
        $currentPage.addClass('pt-page-current');
        
        $nextPageLink.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			nextPage();
		} );
        
        $previousPageLink.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			previousPage();
		} );

        $navigationLink.on('click', function() {

            var targetPage = $("#targetPage").val();
            if(!targetPage) return;
            goToPage(targetPage);

        });

	}

    function goToPage(targetPageName ) {
		var targetPageIndex = pageNames.indexOf(targetPageName);
		if(targetPageIndex < 0) {
			return;
		}
		var currentPageIndex = current;

		if(targetPageIndex === currentPageIndex) {
			// No need to navigate
			return;
		}

		var moveForward;
		var steps=0;
		if(targetPageIndex > currentPageIndex) {
			// Move forward
			if((targetPageIndex - currentPageIndex) > 3) {
				// Rather Move back
				moveForward = false;
				steps = 6 - (targetPageIndex - currentPageIndex);
			}
			else
			{
				// Move forward indeed
				moveForward = true;
				steps = targetPageIndex - currentPageIndex;
			}
		} else {
			// Move backwards
			if((currentPageIndex - targetPageIndex) > 3) {
				// Rather Move forward
				moveForward = true;
				steps = 6 - (currentPageIndex - targetPageIndex);
			}
			else
			{
				// Move backwards indeed
				moveForward = false;
				steps = currentPageIndex - targetPageIndex;
			}
		}

		console.log(moveForward);
		console.log(steps);
		var i= 0, time=700;
		for(i=0;i<steps;i++) {
			if(moveForward) {
				setTimeout(nextPage, time);
				time=time + 700;
			} else {
				setTimeout(previousPage, time);
				time=time + 700;

			}
		}

        /*var animation = 61;
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = sortedPages[current];

        if( current < pagesCount - 1 ) {
            ++current;
        }
        else {
            current = 0;
        }

		var $nextPage = sortedPages[targetPageIndex].addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		var inOutClasses = getInOutClasses(animation);
        outClass = inOutClasses.outClass;
        inClass = inOutClasses.inClass;

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}*/
	}

	function nextPage(options ) {
		var animation = 60;
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = sortedPages[current];

        if( current < pagesCount - 1 ) {
            ++current;
        }
        else {
            current = 0;
        }

		var $nextPage = sortedPages[current].addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		var inOutClasses = getInOutClasses(animation);
        outClass = inOutClasses.outClass;
        inClass = inOutClasses.inClass;

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}
	}

    function previousPage(options ) {
		var animation = 61;
		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = sortedPages[current];

        if( current > 0) {
            --current;
        }
        else {
            current = sortedPages.length-1;
        }

		var $nextPage = sortedPages[current].addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		var inOutClasses = getInOutClasses(animation);
        outClass = inOutClasses.outClass;
        inClass = inOutClasses.inClass;

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}
	}

    
    

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

    function getPage(name) {
        if(!pagesByName) {
            return null;
        }
        return pagesByName[name];
    }

    function initializePages() {
        var i, key;
        for(i=0;i<pageNames.length;i++) {
            for (key in pagesByName) {
                if(!(pagesByName[key]) || !(pagesByName[key].data('name'))) continue;
                if(pagesByName[key].data('name') === pageNames[i]) {
                    sortedPages.push(pagesByName[key]);
                    break;
                }
            }
        }
        for(i=0;i<pageNames.length;i++) {
            pagesMap.push({
                "page" : sortedPages[i],
                "previous" : i===0?null:sortedPages[i-1],
                "next" : (i===(pageNames.length -1))?null:sortedPages[i+1],
                });
        }
    }

    function getInOutClasses(animation) {
            var outClass = '', inClass = '';
            
            switch( animation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;
		}
        return {
            "outClass" : outClass,
            "inClass" : inClass
        };
    }
    
	init();
    
	return { 
		init : init,
		nextPage : nextPage,
	};

})();