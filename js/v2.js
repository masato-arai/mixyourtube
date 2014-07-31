// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
}

// Search for a specified string.
var url = "https://gdata.youtube.com/feeds/api/videos?";

$(function() {
	$('#searchLeft').click(function() {
		var options = {
			'q': $('#qLeft').val(),
			'alt': 'json',
			'start-index': 1,
			'max-results': 50,
			'v': 2
		};
		$.get(url, options, function(rs) {
			console.log(rs);
			$('.searchListLeft').empty();
			for (var i=0; i<rs.feed.entry.length; i++) {
				var f = rs.feed.entry[i];
				$('.searchListLeft').append(
					$('<li class="movieLeft">').append(
						$('<img>').attr('src', f['media$group']['media$thumbnail'][0]['url']),
						$('<div class="youtubeInfo">').append(
							$('<h3>').text(f['title']['$t']),
							$('<p>').text('by ' + f['author'][0]['name']['$t'] + ' • ' + f['yt$statistics']['viewCount'] + ' views' ),
							$('<div class="checked selected">').append(
								$('<span data-label="selected">').append(
									$('<img>').attr('src', 'images/searchChecked.png')
								)
							)
						)
					).data('video-id', f['media$group']['yt$videoid']['$t'], 'video-title', f['title']['$t'])
				);
			}
		}, "json");
	});
	
	$(document).on('click', 'li.movieLeft', function() {
		playerLeft.cueVideoById($(this).data('video-id'));
		playerLeft.setVolume(100);
		$("#searchWrapperLeft").animate({
			opacity: 0
		}, 300, function() {
			$(this).css('visibility', 'hidden');
		});
	});
});

$(function() {
	$('#searchRight').click(function() {
		var options = {
			'q': $('#qRight').val(),
			'alt': 'json',
			'start-index': 1,
			'max-results': 50,
			'v': 2
		};
		$.get(url, options, function(rs) {
			$('.searchListRight').empty();
			for (var i=0; i<rs.feed.entry.length; i++) {
				var f = rs.feed.entry[i];
				$('.searchListRight').append(
					$('<li class="movieRight">').append(
						$('<img>').attr('src', f['media$group']['media$thumbnail'][0]['url']),
						$('<div class="youtubeInfo">').append(
							$('<h3>').text(f['title']['$t']),
							$('<p>').text('by ' + f['author'][0]['name']['$t'] + ' • ' + f['yt$statistics']['viewCount'] + ' views' ),
							$('<div class="checked selected">').append(
								$('<span data-label="selected">').append(
									$('<img>').attr('src', 'images/searchChecked.png')
								)
							)
						)
					).data('video-id', f['media$group']['yt$videoid']['$t'], 'video-title', f['title']['$t'])
				);
			}
		}, "json");
	});
	
	$(document).on('click', 'li.movieRight', function() {
		playerRight.cueVideoById($(this).data('video-id'));
		playerRight.setVolume(100);
		$("#searchWrapperRight").animate({
			opacity: 0
		}, 300, function() {
			$(this).css('visibility', 'hidden');
		});
	});


});

/*
var start_vid_left = 's-t1tifeImw';
var start_vid_right = 'd7zBePUZMog';
var params = { allowScriptAccess: "always" };
var attsLeft = { id: "playerLeft" };
var attsRight = { id: "playerRight" };
*/

/*
// read the url & get the initial track
swfobject.embedSWF("http://www.youtube.com/v/" + start_vid_left + "&enablejsapi=1&playerapiid=yt-left-player&loop=1",
"playerLeft", "425", "336", "8", null, null, params, attsLeft);
swfobject.embedSWF("http://www.youtube.com/v/" + start_vid_right + "&enablejsapi=1&playerapiid=yt-right-player&loop=1",
"playerRight", "425", "336", "8", null, null, params, attsRight);
*/


function onYouTubePlayerAPIReady() {

	playerLeft = new YT.Player('playerLeft', {
		playerVars: {
			showinfo: 1,
			modestbranding: 0,
			controls: 0, // 0:hide 1:show(default)
			rel: 0 //related video 0:hide 1:show(default)
		},
		events: {'onStateChange': onPlayerStateChange},
	});
	
	playerRight = new YT.Player('playerRight', {
		playerVars: {
			showinfo: 1,
			modestbranding: 0,
			controls: 0, // 0:hide 1:show(default)
			rel: 0 //related video 0:hide 1:show(default)
		},
		events: {'onStateChange': onPlayerStateChange},
	});

}

function onPlayerStateChange(e){
	if(e.data == YT.PlayerState.PLAYING) { // if video is playing
		$(".playLeft, .playRight").on('click', function() {
			player.pauseVideo();
		});
	} else {
		$(".playLeft, .playRight").on('click', function() {
			player.playVideo();
		});
	}
}

$(function() {
	$('#faderSlider').slider({max: 200, min: 0,value: 100});
	$('#faderSlider').bind('slide', function(event, ui) {
		var left_val = Math.max(Math.min(190 - parseInt($('#faderSlider').slider('option','value')), 100), 0);
		var right_val = Math.max(Math.min(parseInt($('#faderSlider').slider('option','value')), 110) - 10, 0);
		playerLeft.setVolume(left_val);
		playerRight.setVolume(right_val);	
	});
});


