var winHeight = $(window).height();
var player;
var player2;
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


$(function() {

/*
	$('#searchLeft, #searchRight').click(function() {
		var url = "https://gdata.youtube.com/feeds/api/videos";
		var options = {
			"q": $('#q').val(),
			"alt": "json",
			"max-results": 5,
			"v": 2
		};

		$.get(url, options, function(rs) {
			console.log(rs);
			$('#listLeft, #listRight').empty();

			for (var i=0; i<rs.feed.entry.length; i++) {
				var f = rs.feed.entry[i];
				$('#listLeft').append(
					$('<li class="movieLeft">').append(
						$('<img>').attr('src', f['media$group']['media$thumbnail'][0]['url'])
					).data('video-id', f['media$group']['yt$videoid']['$t'])
				);
				$('#listRight').append(
					$('<li class="movieRight">').append(
						$('<img>').attr('src', f['media$group']['media$thumbnail'][0]['url'])
					).data('video-id', f['media$group']['yt$videoid']['$t'])
				);
			}
		}, "json");
	});
*/
	// Retrieve the next page of videos in the playlist.
	function nextPage() {
		requestVideoPlaylist(playlistId, nextPageToken);
	}
	
	// Retrieve the previous page of videos in the playlist.
	function previousPage() {
		requestVideoPlaylist(playlistId, prevPageToken);
	}
	
	$(document).on('click', 'li.movieLeft', function() {
		player.cueVideoById($(this).data('video-id'));
		player.setVolume(100);
		$(".searchBoxLeft").animate({ bottom: -winHeight });
	});

	$(document).on('click', 'li.movieRight', function() {
		player2.cueVideoById($(this).data('video-id'));
		$(".searchBoxRight").animate({ bottom: -winHeight });
	});


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
		playerVars: {controls: 0, rel: 0},
		events: {'onStateChange': onPlayerStateChange}
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

