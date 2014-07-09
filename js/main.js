// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 
	// setup the height depends on the screen size
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	console.log(winWidth);
	// set initial div height / width
	$('#video').css({
		'height': winHeight - 312,
	});
	// make sure div stays full width/height on resize
	$(window).resize(function(){
		$('#video').css({
			'height': winHeight - 312,
		});
	});

	// set initial div height / width
	$('.ui-widget-content').css({
		'width': winWidth - 482,
	});
	// make sure div stays full width/height on resize
	$(window).resize(function(){
		$('.ui-widget-content').css({
			'width': winWidth - 482,
		});
	});


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
