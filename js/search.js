

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
}

// Search for a specified string.
var mainCtrl = function($scope, $http) {
	$scope.doSearch = function() {
		var url = "https://gdata.youtube.com/feeds/api/videos?"
	+ [
		'q=' + encodeURIComponent($scope.query),
		'alt=json',
		'max-results=5',
		'nextPageToken',
		'v=2',
		'callback=JSON_CALLBACK'
	].join('&');
	$http.jsonp(url).success(function(data) {
		console.dir(data);
		$scope.results = data.feed.entry;
	});
	}
}


$(function() {

	var player;
	var player2;
	
	$(document).on('click', 'li.movieLeft', function() {
		player.cueVideoById($(this).data('video-id'));
		player.setVolume(100);
	});

	$(document).on('click', 'li.movieRight', function() {
		player2.cueVideoById($(this).data('video-id'));
		player.setVolume(100);
	});
	console.log(document);
/*

	// Youtube Current Time
	// call the function every 1 second.
	setInterval(displTime,1000);  // PUT THIS STATEMENT JUST AFTER THE PLAYER HAS BEEN CREATED. 
	
	function displTime() {
		// player.getCurrentTime() or player.getDuration()
		var mind = player.getCurrentTime();   // returns elapsed time in seconds 
		var m = Math.floor(mind / 60);
		var secd = mind % 60;
		var zero = 0;
		var s = Math.ceil(secd)
			$(".tubeTime").html(zero + m + ":" + zero + s);  // Using the JQUERY library to write to body

	}
*/

});

function onYouTubePlayerAPIReady() {

	player = new YT.Player('playerLeft', {
		playerVars: {
			showinfo: 0,
			modestbranding: 0,
			controls: 0, // 0:hide 1:show(default)
			rel: 0 //related video 0:hide 1:show(default)
		},
		events: {'onStateChange': onPlayerStateChange},
	});
	
	player2 = new YT.Player('playerRight', {
		playerVars: {
			showinfo: 0,
			modestbranding: 0,
			controls: 0, // 0:hide 1:show(default)
			rel: 0 //related video 0:hide 1:show(default)
		},
		events: {'onStateChange': onPlayerStateChange},
	});

}




function onPlayerStateChange(e){
	if (e.data == YT.PlayerState.PLAYING) { // if video is playing
		$('.playLeftIcon').css('background-position-x','-60px'); // change the play icon
		$(".playLeft").on('click', function() {
			player.pauseVideo();
		});
	} else {
		$('.playLeftIcon').css('background-position-x','-90px');
		$(".playLeft").on('click', function() {
			player.playVideo();
		});
	}
}

