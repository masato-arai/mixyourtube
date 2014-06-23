// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 
	// setup the height depends on the screen size
	var winHeight = $(window).height();
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

	// volume background animation
	var volLeftBg = ".volumeLeftBg";
	var volRightBg = ".volumeRightBg";
	$(".volumeLeft").hover(function() {
		$(volLeftBg).stop(true, false).animate({ bottom: 78 }, 200);
	}, function() {
		$(volLeftBg).animate({ bottom: -78 }, 200);
	});
	$(".volumeRight").hover(function() {
		$(volRightBg).stop(true, false).animate({ bottom: 78 }, 200);
	}, function() {
		$(volRightBg).animate({ bottom: -78 }, 200);
	});

});
