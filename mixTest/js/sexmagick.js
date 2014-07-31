
function onYouTubePlayerReady(playerId) {
    left_player = document.getElementById('left-player')
    right_player = document.getElementById('right-player')
}

function load_vid(channel, video_id) {
    var player_elem = document.getElementById(channel + '-player');
    player_elem.loadVideoById(video_id);
}

$(function() {
    $('#crossfader').slider({max: 200, min: 0,value: 100});
    $('#crossfader').bind('slide', function(event, ui) {
        var left_val = Math.max(Math.min(190 - parseInt($('#crossfader').slider('option','value')), 100), 0);
        var right_val = Math.max(Math.min(parseInt($('#crossfader').slider('option','value')), 110) - 10, 0);

        left_player.setVolume(left_val);
        right_player.setVolume(right_val);
        
    });

/*
    function search_loaded() {
        return true;
    }
    
    google.load('search','1', {'callback': search_loaded});

    function setup_goog() {
        left_searcher = new google.search.VideoSearch();
        left_searcher.setResultSetSize(google.search.Search.LARGE_RESULTSET);
        
        left_searcher.setSearchCompleteCallback(null, function() {
            $('#left-crate').empty();            
            for(var i = 0; i<left_searcher.results.length; i++) {
                var result = left_searcher.results[i];
                var thumb_url = result.tbUrl;
                var video_id = result.tbUrl.split('/')[4];
                $('#left-crate').append(
                    '<a class="crate-vid" href="javascript:void(0);" title="' + result.title + '" onclick="load_vid(\'left\',\'' + video_id + '\');"><img width="50" src="' + thumb_url + '" /></a>'
                );
            }
            
            if (left_searcher.cursor) {
                $('#left-crate').append('<div class="pages"><strong>Pages:</strong></div>');
                var pages = left_searcher.cursor.pages;
                for(var i=0; i<pages.length; i++) {
                    if(i == left_searcher.cursor.currentPageIndex) {
                        $('#left-crate .pages').append(
                            '<span class="page">' + pages[i].label + '</a>'
                        );
                    } else {
                        $('#left-crate .pages').append(
                            '<a class="page" pagenum="' + i + '">' + pages[i].label + '</a>'
                        );
                    }
                }
                
                $('#left-crate a.page').click(function() {
                    left_searcher.gotoPage(parseInt($(this).attr('pagenum')));
                });
            }
            
        });

        // right

        right_searcher = new google.search.VideoSearch();
        right_searcher.setResultSetSize(google.search.Search.LARGE_RESULTSET);
        
        right_searcher.setSearchCompleteCallback(null, function() {
            $('#right-crate').empty();
            
            for(var i = 0; i<right_searcher.results.length; i++) {
                var result = right_searcher.results[i];
                var thumb_url = result.tbUrl;
                var video_id = result.tbUrl.split('/')[4];
                $('#right-crate').append(
                    '<a class="crate-vid" href="javascript:void(0);" title="' + result.title + '" onclick="load_vid(\'right\',\'' + video_id + '\');"><img width="50" src="' + thumb_url + '" /></a>'
                );
            }
            
            if (right_searcher.cursor) {
                $('#right-crate').append('<div class="pages"><strong>Pages:</strong></div>');
                var pages = right_searcher.cursor.pages;
                for(var i=0; i<pages.length; i++) {
                    if(i == right_searcher.cursor.currentPageIndex) {
                        $('#right-crate .pages').append(
                            '<span class="page">' + pages[i].label + '</a>'
                        );
                    } else {
                        $('#right-crate .pages').append(
                            '<a class="page" pagenum="' + i + '">' + pages[i].label + '</a>'
                        );
                    }
                }
                
                $('#right-crate a.page').click(function() {
                    right_searcher.gotoPage(parseInt($(this).attr('pagenum')));
                });
            }
            
        });

        // trigger the first search
        left_searcher.execute($('#left-selector input').val());
        right_searcher.execute($('#right-selector input').val());
    }

    google.setOnLoadCallback(setup_goog);
    
    $('#left-selector button').click(function() {
        var input_val = $(this).siblings('input').val();
        left_searcher.execute(input_val)
    });

    $('#left-selector input').keyup(function(ev) {
        if(ev.keyCode == 13) {
            $('#left-selector button').click();
        }
    });
    
    $('#right-selector button').click(function() {
        var input_val = $(this).siblings('input').val();
        right_searcher.execute(input_val)
    });

    $('#right-selector input').keyup(function(ev) {
        if(ev.keyCode == 13) {
            $('#right-selector button').click();
        }
    });
*/

});