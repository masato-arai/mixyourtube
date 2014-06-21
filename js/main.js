// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 
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
	var search = ".searchBox";
	$(function() {
		$(search).css({ bottom: -winHeight });
		$(".tubeTitleLeft").click(function() {
			$(search).animate({ bottom: 0 });
		});
		$(".cancelButton").click(function() {
			$(search).animate({ bottom: -winHeight });
		});
	});

});
