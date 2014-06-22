var winHeight = $(window).height();
var player;
var player2;

$(function() {
	$('#searchLeft, #searchRight').click(function() {
		var url = "https://gdata.youtube.com/feeds/api/videos";
		var options = {
			"q": $('#q').val(),
			"alt": "json",
			"max-results": 3,
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

	
	$(document).on('click', 'li.movieLeft', function() {
		player.cueVideoById($(this).data('video-id'));
		$(".searchBoxLeft").animate({ bottom: -winHeight });
	});

	$(document).on('click', 'li.movieRight', function() {
		player2.cueVideoById($(this).data('video-id'));
		$(".searchBoxRight").animate({ bottom: -winHeight });
	});

	
});

function onYouTubePlayerAPIReady() {
	player = new YT.Player('playerLeft', {
	});
	player2 = new YT.Player('playerRight', {
	});
}
