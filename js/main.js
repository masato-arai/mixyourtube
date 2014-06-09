// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 

// global vars
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

/*
	var footerHeight = 0,
	footerTop = 0,
	$footer = $("#controller");
	positionFooter();
	function positionFooter() {
		footerHeight = $footer.height();
		footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
		if ( ($(document.body).height()+footerHeight) < $(window).height()) {
			$footer.css({
				position: "absolute"
			}).animate({
				top: footerTop
			})
		} else {
			$footer.css({
				position: "static"
			})
		}
	}
	$(window)
	.scroll(positionFooter)
	.resize(positionFooter)
*/
});