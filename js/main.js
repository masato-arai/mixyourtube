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

	// fader
	$( "#faderSlider" ).slider();

});



/*
var mainCtrl = function($scope, $http) {
	$scope.doSearch = function() {
		var url = "https://gdata.youtube.com/feeds/api/videos?"
	+ [
		'q=' + encodeURIComponent($scope.query),
		'alt=json',
		'max-results=5',
		'v=2',
		'callback=JSON_CALLBACK'
	].join('&');
	$http.jsonp(url).success(function(data) {
		console.dir(data);
		$scope.results = data.feed.entry;
	});
	}
}
*/

