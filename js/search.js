// After the API loads, call a function to enable the search box.
/*
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}


// Search for a specified string.
function search() {
  var q = $('#query').val();
  gapi.client.setApiKey('AIzaSyCeeSBYijxztGdXc1X8qeSFYTZZUZ6YSXg');
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 25
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}
*/

/*
function searchByKeyword() {
  var results = YouTube.Search.list('id,snippet', {
    q: 'dogs',
    maxResults: 25
  });

  for (var i = 0; i < results.items.length; i++) {
    var item = results.items[i];
    Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
  }
}
*/


$(function() {
	$('#search').click(function() {
		var url = "https://gdata.youtube.com/feeds/api/videos";
		var options = {
			"q": $('#q').val(),
			"alt": "json",
			"max-results": 10,
			"v": 2
		};
		
		$.get(url, options, function(rs) {
			console.log(rs);
			$('#list').empty();
			for (var i=0; i<rs.feed.entry.length; i++) {
				var f = rs.feed.entry[i];
				$('#list').append(
					$('<li class="movie">').append(
						$('<img>').attr('src', f['media$group']['media$thumbnail'][0]['url'])
					).data('video-id', f['media$group']['yt$videoid']['$t'])
				);
			}
		}, "json");
	
	});
});









