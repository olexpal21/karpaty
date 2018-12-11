var mr_firstSectionHeight, 
    mr_nav, 
    mr_navOuterHeight, 
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

$(document).ready(function(){
	"use strict";
	
	// Update scroll variable for scrolling functions
	
	addEventListener('scroll',function(){ mr_scrollTop = window.pageYOffset; }, false );
	
	// Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });
    
    // Fade in background images
	
	setTimeout(function(){
		$('.background-image-holder').each(function() {
			$(this).addClass('fadeIn');
		});
    },200);
	
	// Initialize Tooltips
	
	$('[data-toggle="tooltip"]').tooltip();
	
	// Checkboxes
	
	$('.checkbox-option').click(function(){
		$(this).toggleClass('checked');
		var checkbox = $(this).find('input');
		if(checkbox.prop('checked') === false){
			checkbox.prop('checked',true);
		}else{
			checkbox.prop('checked',false);
		}
	});
	
	// Radio Buttons
	
	$('.radio-option').click(function(){
		$(this).closest('form').find('.radio-option').removeClass('checked');
		$(this).addClass('checked');
		$(this).find('input').prop('checked',true);
	});
	
	// Tabbed Content
    
    $('.tabbed-content').each(function(){
    	$(this).append('<ul class="content"></ul>');
    });
    
    $('.tabs li').each(function(){
    	var originalTab = $(this), activeClass = "";
    	if(originalTab.is('.tabs li:first-child')){
    		activeClass = ' class="active"';
    	}
    	var tabContent = originalTab.find('.tab-content').detach().wrap('<li'+activeClass+'></li>').parent();
    	originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });
    
    $('.tabs li').click(function(){
    	$(this).closest('.tabs').find('li').removeClass('active');
    	$(this).addClass('active');
    	var liIndex = $(this).index() + 1;
    	$(this).closest('.tabbed-content').find('.content>li').removeClass('active');
    	$(this).closest('.tabbed-content').find('.content>li:nth-of-type('+liIndex+')').addClass('active');
    });
    
    // Navigation
    
    if(!$('nav').hasClass('fixed') && !$('nav').hasClass('absolute')){
    
    	// Make nav container height of nav
    	
    	$('.nav-container').css('min-height',$('nav').outerHeight(true));
    	
    	$(window).resize(function(){
    		$('.nav-container').css('min-height',$('nav').outerHeight(true));
    	});
    	
    	// Compensate the height of parallax element for inline nav
    	
    	if($(window).width() > 768){
    		$('.parallax:first-child .background-image-holder').css('top', -($('nav').outerHeight(true)) );
    	}
    	
    	// Adjust fullscreen elements
    	
    	if($(window).width() > 768){
    		$('section.fullscreen:first-child').css('height', ($(window).height() - $('nav').outerHeight(true)));
    	}
    	
    }else{
    	$('body').addClass('nav-is-overlay');
    }
    
    if($('nav').hasClass('bg-dark')){
    	$('.nav-container').addClass('bg-dark');
    }
    

    // Fix nav to top while scrolling
    
    mr_nav = $('body .nav-container nav:first');
    mr_navOuterHeight = $('body .nav-container nav:first').outerHeight();
    window.addEventListener("scroll", updateNav, false);

    // Menu dropdown positioning
    
    $('.menu > li > ul').each(function(){
    	var menu = $(this).offset();
    	var farRight = menu.left + $(this).outerWidth(true);
    	if(farRight > $(window).width() && !$(this).hasClass('mega-menu') ){
    		$(this).addClass('make-right');
    	}else if(farRight > $(window).width() && $(this).hasClass('mega-menu')){
    		var isOnScreen = $(window).width() - menu.left;
    		var difference = $(this).outerWidth(true) - isOnScreen;
    		$(this).css('margin-left', -(difference));
    	}
    });
    
    // Mobile Menu
    
    $('.mobile-toggle').click(function(){
    	$('.nav-bar').toggleClass('nav-open');
    	$(this).toggleClass('active');
    });
    
    $('.menu li').click(function(e){
    	if (!e) e = window.event;
    	e.stopPropagation();
    	if($(this).find('ul').length){
    		$(this).toggleClass('toggle-sub');
    	}else{
    		$(this).parents('.toggle-sub').removeClass('toggle-sub');
    	}
    });
    
    $('.menu li a').click(function(){
    	if($(this).attr('href') === '#'){
    		if(!$(this).closest('li').find('ul').length){
    			return false;
    		}
    	}
    });
    
    
    $('.module.widget-handle').click(function(){
    	$(this).toggleClass('toggle-widget-handle');
    });
    
    // Instagram Feed

    jQuery.fn.spectragram.accessData = {
        accessToken: '', // token
        clientID: '' // ID
    };

    $('.instafeed').each(function() {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name'), max: 12
        });
    });
    
    // Image Sliders
    
    $('.slider-all-controls').flexslider({  });
    $('.slider-paging-controls').flexslider({ animation: "slide", directionNav: false });
    $('.slider-arrow-controls').flexslider({ controlNav: false });
	$('.slider-thumb-controls .slides li').each(function(){
		var imgSrc = $(this).find('img').attr('src');
		$(this).attr('data-thumb', imgSrc);
	});
	$('.slider-thumb-controls').flexslider({ animation: "slide", controlNav: "thumbnails", directionNav: true });
	$('.logo-carousel').flexslider({ minItems: 1, maxItems: 4, move: 1, itemWidth: 200, itemMargin: 0, animation: "slide", slideshow: true, slideshowSpeed: 3000, directionNav: false, controlNav: false });
	
	
	// Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map
	
	$('.map-holder').click(function(){
		$(this).addClass('interact');
	});
	
	$(window).scroll(function(){
		if($('.map-holder.interact').length){
			$('.map-holder.interact').removeClass('interact');
		}
	});
	
	// Scroll Reveal
	
	window.sr = new scrollReveal();
	
	// Pull bottom half
	
	$('.pull-bottom-half').each(function(){
		var margin = -($(this).outerHeight(true)/2) + 'px';
		$(this).css('margin-bottom',''+margin+'');
	});
	

    $('.validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $('form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr('original-error', $(this).find('.form-error').text());
        }
    });

    function validateFields(form) {
        var name, error, originalErrorMessage;

        $(form).find('.validate-required[type="checkbox"]').each(function() {
            if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                error = 1;
                name = $(this).attr('name').replace('[]', '');
                form.find('.form-error').text('Please tick at least one ' + name + ' box.');
            }
        });

        $(form).find('.validate-required').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        $(form).find('.validate-email').each(function() {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        if (!form.find('.field-error').length) {
            form.find('.form-error').fadeOut(1000);
        }

        return error;
    }
	
});

$(window).load(function() { 
	"use strict";
    
    mr_firstSectionHeight = $('.main-container section:first-child').outerHeight(true);   
    
});

function updateNav(){
    
    var scrollY = mr_scrollTop;

    if(scrollY <= 0){
        if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
        if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight');}
        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        return;
    }

    if(scrollY > mr_firstSectionHeight){
        if(!mr_navScrolled){
            mr_nav.addClass('scrolled');
            mr_navScrolled = true;
            return; 
        }
    }else{
        if(scrollY > mr_navOuterHeight){
            if(!mr_navFixed){mr_nav.addClass('fixed');mr_navFixed = true;}

            if(scrollY > mr_navOuterHeight*2){
                if(!mr_outOfSight){mr_nav.addClass('outOfSight'); mr_outOfSight = true;}
            }else{
                if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
            }
        }else{
            if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
            if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
        }

        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        
    }
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};