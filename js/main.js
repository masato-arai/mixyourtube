// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 
	// setup the height depends on the screen size
	var winHeight = $(window).height();

	//Search Box ON OFF Animation
	var search = ".searchBoxLeft, .searchBoxRight";
	var searchLeft = ".searchBoxLeft";
	var searchRight = ".searchBoxRight";
	$(search).css({ bottom: -winHeight });
	$(".tubeTitleLeft").click(function() {
		$(searchLeft).animate({ bottom: 0 });
	});
	$(".tubeTitleRight").click(function() {
		$(searchRight).animate({ bottom: 0 });
	});
	$(".cancelButton").click(function() {
		$(search).animate({ bottom: -winHeight });
	});

	// fader
	$( "#faderSlider" ).slider();

});