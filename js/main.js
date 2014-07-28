// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 

	// Search Box ON OFF Animation
	var search = "#searchWrapper";
	var searchLeft = ".searchBoxLeft";
	var searchRight = ".searchBoxRight";
	
	$(".tubeTitleLeft").click(function() {
		$(search).animate({ 
			opacity: 1
		}, 1, function(){
			$(this).css('visibility', 'visible').hide().fadeIn(300);
		});
	});

	$(".searchCancel, .cancelButton").click(function() {
		$(search).animate({
			opacity: 0
		}, 300, function() {
			$(this).css('visibility', 'hidden');
		});
	});
	
	// First time Input is focused, delete it's value
	$('input').one('focus', function(){
		this.value = '';
	});
	
	// Hover animation
	

	// jQuery UI volume fader
	$( "#faderSlider" ).slider();

});