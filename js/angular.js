

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
/*
		$http.jsonp(url).success(function(data) {
			for (var i=0; i<data.feed.entry.length; i++) {
				var f = data.feed.entry[i];
				$('<li class="movieLeft">').data('video-id', f['media$group']['yt$videoid']['$t'])
			}
		}, "json");

		$(document).on('click', 'li.movieLeft', function() {
			console.log($(this).attr(videoId));
			player.cueVideoById($(this).data(videoId));
			player.setVolume(100);
		});
*/

		$http.jsonp(url).success(function(data) {
			console.log(data);
			$scope.results = data.feed.entry;
			var results = $scope.results;
			var videoLength = results.length;
			for( i=0; i<videoLength; i++ ) {
				var videoId = data.feed.entry[i].media$group.yt$videoid.$t;
				console.log(videoId);
			}

			$(document).on('click', 'li.movieLeft', function() {
				console.log($(this).attr(videoId));
				player.cueVideoById($(this).data(videoId));
				player.setVolume(100);
			});

		});

	}
}


$(function() {
	
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

