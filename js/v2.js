// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
}


// Search for a specified string.
$(function() {
	var url = "https://gdata.youtube.com/feeds/api/videos?";
	// Left Search List
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
							$('<p>').text('by ' + f['author'][0]['name']['$t'] /* + ' • ' + f['media$group']['yt$duration']['seconds'] */ /* + ' • ' + f['yt$statistics']['viewCount'] + ' views' */),
							$('<div class="checked selected">').append(
								$('<span data-label="selected">').append(
									$('<img>').attr('src', 'images/searchChecked.png')
								)
							)
						)
					).data({
						'video-id': f['media$group']['yt$videoid']['$t'],
						'video-title': f['title']['$t'],
						'video-duration': f['media$group']['yt$duration']['seconds']
					})
				);
			}
			$('.searchBoxLeft ul.nav').empty();
			$('.searchBoxLeft ul.nav').append(
				$('<li class="prev">').text('PREV'),
				$('<li class="slash">').text('/'),
				$('<li class="next">').text('NEXT')
			).fadeIn(500);

			// NEXT PREV buttons
			var list = $("li.movieLeft").hide();
			list.slice(0, 5).fadeIn(500);
			var maxList = list.length;
			var x = 5,
				start = 0;
			$('.next').click(function () {
				if (start + x < maxList) {
					list.slice(start, start + x).hide();
					start += x;
					list.slice(start, start + x).fadeIn(500);
					$('.prev').css({
						'color': '#000',
						'cursor': 'pointer'
					});
					$('.prev').addClass('blink');
				} 
				if ( start + x == maxList ) {
					$('.next').css({
						'color': '#ccc',
						'cursor': 'inherit'
					});
					$('.next').removeClass('blink');
				}
			});
			if (start + x <= 5) {
				$('.prev').css({
					'color': '#ccc',
					'cursor': 'inherit'
				});
				$('.next').addClass('blink');
			}
			$('.prev').click(function () {
				if (start - x >= 0) {
					list.slice(start, start + x).hide();
					start -= x;
					list.slice(start, start + x).fadeIn(500);
				}
				if ( start + x !== maxList ) {
					$('.next').css('color', '#000');
					$('.next').addClass('blink');
				}
				if (start + x <= 5) {
					$('.prev').css({
						'color': '#ccc',
						'cursor': 'inherit'
					});
					$('.prev').removeClass('blink');
				}
			});
		}, "json");
	});

	//insert video into playerLeft
	$(document).on('click', 'li.movieLeft', function() {
		playerLeft.cueVideoById($(this).data('video-id'));
		playerLeft.setVolume(100);
		function secondsToHMS(s) {
			var h = Math.floor(s/3600); //Get whole hours
			s -= h*3600;
			var m = Math.floor(s/60); //Get remaining minutes
			s -= m*60;
			return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
		}
		var totalTimeLeft = $(this).data('video-duration');
		var totalTimeLeftCal = secondsToHMS($(this).data('video-duration'));
		var currentTimeLeft = playerLeft.getCurrentTime();
		
		$('.tubeTitleLeft').text($(this).data('video-title'));
		$('.totalTimeLeft').text(totalTimeLeftCal);

		$('.seekBarLeft').slider({max: totalTimeLeft, min: 0, value: 0});
		$('.seekBarLeft').bind('slide', function(event, ui) {
			var currentPositionLeft = Math.max(Math.min(parseInt(
				$('.seekBarLeft').slider('option', 'value')
			), totalTimeLeft - 10), 0);
			playerLeft.seekTo(currentPositionLeft);
			console.log(currentPositionLeft);
		});

		$("#searchWrapperLeft").animate({
			opacity: 0
		}, 300, function() {
			$(this).css('visibility', 'hidden');
		});
		
/*
		$(".seekBarLeft").slider({
			min: 0,
			max: totalTimeLeft,
			step: 1,
			change: showValue,
		});
	
		$(".seekBarLeft").click(function () {
			$(".seekBarLeft").slider("option", "value", $(".seekToLeft").val());
			var seekLeftVal = $(".seekToLeft").val();
			playerLeft.seekTo(parseFloat(seekLeftVal));
			return false;
		});
		function showValue(event, ui) {
			$(".valLeft").html(ui.value);
		}
*/

	});

	// Right Search List
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
							$('<p>').text('by ' + f['author'][0]['name']['$t'] /* + ' • ' + f['yt$statistics']['viewCount'] + ' views' */ ),
							$('<div class="checked selected">').append(
								$('<span data-label="selected">').append(
									$('<img>').attr('src', 'images/searchChecked.png')
								)
							)
						)
					).data('video-id', f['media$group']['yt$videoid']['$t'], 'video-title', f['title']['$t'])
				);
			}

			$('.searchBoxRight ul.nav').empty();
			$('.searchBoxRight ul.nav').append(
				$('<li class="prev">').text('PREV'),
				$('<li class="slash">').text('/'),
				$('<li class="next">').text('NEXT')
			).fadeIn(500);

			// NEXT PREV buttons
			var list = $("li.movieRight").hide();
			list.slice(0, 5).fadeIn(500);
			var maxList = list.length;
			var x = 5,
				start = 0;
			$('.next').click(function () {
				if (start + x < maxList) {
					list.slice(start, start + x).hide();
					start += x;
					list.slice(start, start + x).fadeIn(500);
					$('.prev').css({
						'color': '#000',
						'cursor': 'pointer'
					});
					$('.prev').addClass('blink');
				} 
				if ( start + x == maxList ) {
					$('.next').css({
						'color': '#ccc',
						'cursor': 'inherit'
					});
					$('.next').removeClass('blink');
				}
			});
			if (start + x <= 5) {
				$('.prev').css({
					'color': '#ccc',
					'cursor': 'inherit'
				});
				$('.next').addClass('blink');
			}
			$('.prev').click(function () {
				if (start - x >= 0) {
					list.slice(start, start + x).hide();
					start -= x;
					list.slice(start, start + x).fadeIn(500);
				}
				if ( start + x !== maxList ) {
					$('.next').css('color', '#000');
					$('.next').addClass('blink');
				}
				if (start + x <= 5) {
					$('.prev').css({
						'color': '#ccc',
						'cursor': 'inherit'
					});
					$('.prev').removeClass('blink');
				}
			});
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

	// Fader Slider
	$('#faderSlider').slider({max: 200, min: 0, value: 100});
	$('#faderSlider').bind('slide', function(event, ui) {
		var left_val = Math.max(Math.min(190 - parseInt(
			$('#faderSlider').slider('option', 'value')
		), 100), 0);
		var right_val = Math.max(Math.min(parseInt(
			$('#faderSlider').slider('option', 'value')
		), 110) - 10, 0);
		playerLeft.setVolume(left_val);
		playerRight.setVolume(right_val);	
	});
	
});

function onYouTubePlayerAPIReady() {

	var initialVideoLeft = 's-t1tifeImw';
	var initialVideoRight = 'd7zBePUZMog';
	$.getJSON('http://gdata.youtube.com/feeds/api/videos/' + initialVideoLeft + '?v=2&alt=jsonc',function(data,status){
	});

	playerLeft = new YT.Player('playerLeft', {
		// Left initial track
		videoId: initialVideoLeft,
		playerVars: {
			autoplay: 0,
			showinfo: 0,
			modestbranding: 0,
			controls: 0, // 0:hide 1:show(default)
			rel: 0 //related video 0:hide 1:show(default)
		},
		events: {'onStateChange': onPlayerStateChange},
	});
	
	playerRight = new YT.Player('playerRight', {
		// Right initial track
		videoId: initialVideoRight,
		playerVars: {
			autoplay: 0,
			showinfo: 0,
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

		var totalTimeLeft = playerLeft.getDuration();
		var totalBytesLeft = playerLeft.getVideoBytesTotal();
		var startBytesLeft = playerLeft.getVideoStartBytes();

		setInterval(function(){
			var currentTimeLeft = playerLeft.getCurrentTime();
			function secondsToHMS(s) {
				var h = Math.floor(s/3600); //Get whole hours
				s -= h*3600;
				var m = Math.floor(s/60); //Get remaining minutes
				s -= m*60;
				var s = Math.floor(s);
				return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
			}
			var currentTimeLeftCal = secondsToHMS(currentTimeLeft);
			$('.currentTimeLeft').text(currentTimeLeftCal);
		}, 100);
		
	} else {
		$(".playLeft, .playRight").on('click', function() {
			player.playVideo();
		});
	}
}

/*
playerLeft = document.getElementById(".playerLeft");
playerLeft.getCurrentTime();
console.log(currentTimeLeft);
*/

/*
function onPlay(event) {
	window.setInterval(function() {
		currentTimeLeft = setInterval(function () {
			$('.currentTimeLeft').text(currentTimeLeft);
		}, 500); 
		console.log(currentTimeLeft);
	});
}
*/


