start_vid_left = 's-t1tifeImw';
start_vid_right = 'd7zBePUZMog';

var params = { allowScriptAccess: "always" };
var attsLeft = { id: "playerLeft" };
var attsRight = { id: "playerRight" };
// read the url & get the initial track
swfobject.embedSWF("http://www.youtube.com/v/" + start_vid_left + "&enablejsapi=1&playerapiid=yt-left-player&loop=1",
"playerLeft", "425", "336", "8", null, null, params, attsLeft);
swfobject.embedSWF("http://www.youtube.com/v/" + start_vid_right + "&enablejsapi=1&playerapiid=yt-right-player&loop=1",
"playerRight", "425", "336", "8", null, null, params, attsRight);


function onYouTubePlayerReady(playerId) {
	left_player = document.getElementById('playerLeft')
	right_player = document.getElementById('playerRight')
}

function load_vid(channel, video_id) {
	var player_elem = document.getElementById(channel + '-player');
	player_elem.loadVideoById(video_id);
}

$(function() {
	$('#faderSlider').slider({max: 200, min: 0,value: 100});
	$('#faderSlider').bind('slide', function(event, ui) {
		var left_val = Math.max(Math.min(190 - parseInt($('#faderSlider').slider('option','value')), 100), 0);
		var right_val = Math.max(Math.min(parseInt($('#faderSlider').slider('option','value')), 110) - 10, 0);
		left_player.setVolume(left_val);
		right_player.setVolume(right_val);	
	});
});