var ytdj = {

	/* fake the search so it doesn't require net access */
	USE_MOCK_SEARCH : false,
	SEARCH_RESULTS_PER_PAGE : 15,
	
	LEFT : "Chan1",
	RIGHT : "Chan2",
	
	PLAY : true,
	PAUSE : false,
	
	channels : [],
	mix : null,
	
	tapTime : 0,
	tapTimes : [],
	tapInterval : null,
	
	interval : null,
	
	userIsScrolling : false,
	showDebug : false,
	
	AUTOPLAY_OFF : -1,
	AUTOPLAY_BEGIN : 0,
	AUTOPLAY_PLAYING : 1,
	AUTOPLAY_FADING : 2,
	AUTOPLAY_FADED : 3,
	waitingOnAutoPlayChannel : true,
	autoplay_loading_track : null,
	
	fadePos : 0.01,
	defaultVolume : 50,
	
	isFirstTimerz : false,
	isFirstTrax : false,
	ourMessageToYou : "",
	
	demoMode : 0,
	
	STATE : -1,
	lastState : [],
	
	cueable : [],
	
	baseUrl : "turntubelist.com",
	useLocal : true,
	uid: Math.floor(Math.random() * 999999),
	
	tsugiNoKagi : 65,
		
	init : function()
	{

		// Set up our channels
		this.channels.push( this.LEFT );
		this.channels.push( this.RIGHT );
		
		this.cueable[ this.LEFT ] = true;
		this.cueable[ this.RIGHT ] = true;
		
		// Initialise the UI components
		ytdj.ui.init();
		
		// Set up the youtube docs
		ytdj.tube.chromelessTube( ytdj.LEFT );
		ytdj.tube.chromelessTube( ytdj.RIGHT );

		// Set up the mix model
		this.mix = new cMix();
		var leftChan = this.mix.playlists[ ytdj.LEFT ] = new cPlaylist();
		var rightChan = this.mix.playlists[ ytdj.RIGHT ] = new cPlaylist();
			
		// Set some defaults
		this.mix.faderPosition = 50;
		leftChan.volume = rightChan.volume = this.defaultVolume;
		this.setFaders();
		
		// No preloading, we are.
		PlaylistController.preLoading( ytdj.LEFT, false );
		PlaylistController.preLoading( ytdj.RIGHT, false );

		// Load tracks into model from cookie
 		PlaylistController.loadFromString( ytdj.LEFT, $.cookie('playlist_one') );
		PlaylistController.loadFromString( ytdj.RIGHT, $.cookie('playlist_two') );
		
		// Add in the debugger window
	    PlaylistHelper.getDebugger( ytdj.LEFT ).css("marginLeft", "180px").insertAfter( $("#Chan1") ).hide();
		PlaylistHelper.getDebugger( ytdj.RIGHT ).insertAfter( $("#Chan2_Display") ).hide();

		// Set up the help dialogs
		ytdj.help.initHelps();
		
		// Check if lists are empty (first timerz)
		if(PlaylistController.checkIfTracksAreAllGone())
		{
			// Any newbie stuff...
			ytdj.isFirstTimerz = true;
			// ytdj.help.finessOpenAll();
			ytdj.help.showHelpBar();
				
			// Add our default playlist!
			PlaylistHelper.defaultList(0);
			ytdj.isFirstTimerz = false;
		}
		else
		{
			// Show our message to you...
			if( ytdj.ourMessageToYou != "" )
			{
				ytdj.help.showOurMessageToYou( ytdj.ourMessageToYou, true );
			}
		}

		// Display the tracks
		PlaylistHelper.setUpLists();
		PlaylistController.display( ytdj.LEFT );
		PlaylistController.display( ytdj.RIGHT );

	
		// Allow sending playlists by query string...
		var s = window.location + "";

		if( s.indexOf("/set/") > 0 )
		{
			var setName = s.replace(/^.+\/set\//, ""); //todo: better checking! remove qs etc...
			if( setName.length >= ytdj.helper.minSetNameLength )
			{
				setTimeout( function()
				{
					ytdj.helper.loadSet( setName, false, ytdj.ui.onSetLoading, ytdj.ui.onSetLoaded );
				}, 1000);
			}
		}
		
		if( s.indexOf("/playlist/") > 0 )
		{
			var playlist = s.replace(/^.+\/playlist\//, ""); //todo: better checking! remove qs etc...
		//	if( setName.length >= ytdj.helper.minSetNameLength )
			{
				setTimeout( function()
				{
					ytdj.tube.loadPlaylist( playlist, ytdj.ui.onSetLoading, ytdj.ui.onSetLoaded ); //"8BCDD04DE8F771B2" );
				}, 1000);
			}
		}
		
		if(window.location.search.length > 0)
		{
			var objURL = new Object();
			window.location.search.replace(
				new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
				function( $0, $1, $2, $3 ){ objURL[ $1 ] = $3; } );
			
				/*if(objURL["save"] != null && objURL["save"].length > 0)
				{
					ytdj.helper.addSave();
				}*/
				
			if( objURL["set"] != null && objURL["set"].length > ytdj.helper.minSetNameLength )
			{
				var setname = objURL["set"];
				ytdj.helper.loadSet( setname, false, ytdj.ui.onSetLoading, ytdj.ui.onSetLoaded );
			}
		}
				
		this.runTimer();
				
	},
	
	debug : function( channel, msg )
	{
		if( ytdj.showDebug )
		{
			$("#" + channel + "_states").val( $("#" + channel + "_states").val() + msg );
		}
	},
	
	runTimer : function()
	{
		this.interval = setInterval( this.mainTublesLoop, 250 );
	},
	
	mainTublesLoop : function()
	{	
		$.each( [ytdj.LEFT, ytdj.RIGHT ], function()
		{
			var otherChannel = this == ytdj.LEFT ? ytdj.RIGHT : ytdj.LEFT;
			
			var currentTime = ytdj.tube.getCurrentTime( this );
			var duration = ytdj.tube.getDuration( this );
			var bytesTotal = ytdj.tube.getBytesTotal( this );
			var bytesLoaded = ytdj.tube.getBytesLoaded( this );
			
			var vidState = ytdj.tube.getState( this );
						
			if(ytdj.showDebug)
			{
				$("#" + this + "_vidTime").val( currentTime );
				$("#" + this + "_vidDuration").val( duration );		
				$("#" + this + "_vidVolume").val(ytdj.tube.getVolume( this ) + ( ytdj.tube.isMuted( this ) ? "(Mute)" : "") );
				$("#" + this + "_bytesTotal").val(bytesTotal);
				$("#" + this + "_bytesLoaded").val(bytesLoaded);
				$("#" + this + "_bytesStart").val(ytdj.tube.getStartBytes( this ));
				$("#" + this + "_state").val(vidState);				
			}

			// Update load progress indicator
			var loadPercent = bytesTotal < 0 ? 0 : Math.floor(bytesLoaded / bytesTotal * 100);
			$("#" + this + "_Position .load-progress").css("width", loadPercent + "%");
			
			// Update position slider
			if(!ytdj.userIsScrolling)
			{
				$("#" + this + "_Position").slider( "moveTo", duration < 0 ? 0 : ( currentTime / duration ) * 100  );
			}
		
			/* Handling wacky state changes in loading youtube vids */
			// Pre load video - by pausing-on-load
			if( PlaylistController.preLoading( this ) )
			{	
				var paused = PlaylistController.preLoadPaused( this );
				
				ytdj.debug( this, ytdj.tube.STATE_BUFFERING ? "~" : "|~" + vidState + ( paused ? "t" : "f" ) );
				
				switch( vidState )
				{
					case ytdj.tube.STATE_BUFFERING:
						break;
					case ytdj.tube.STATE_PLAYING:
					case ytdj.tube.STATE_CUED:
						// Try and pause it
						if(!PlaylistController.preLoadPaused( this ))
						{
							PlaylistController.preLoadPaused( this, true );
							ytdj.tube.playVid( this, false );
						}
						break;
						
					case ytdj.tube.STATE_PAUSED:
						/*
							Yep... certainly an issue: i think it's some videos, when seekTo 0 (such as toto, africa) - goes back
							from PAUSED to BUFFERING... damn it. Going to have to catch this state somehow and set back
							to preloading = true if it happens. (DONE: see the vid state change below)
						*/
						PlaylistController.preLoading( this, false );
						PlaylistController.preLoadPaused( this, false );
						// rewind it  - seems to cause some vids to go back to BUFFERING
						ytdj.tube.seekTo( this, 0 );
						
						if(ytdj.demoMode > 0 && ++ytdj.demoMode > 2 )
						{
							//go!
							ytdj.demoMode = 0;
							setTimeout("ytdj.playDemo()",4000);						
						}
						break;
				}
			}
			
			// Handle video state changes we are interested in
			if( vidState != ytdj.lastState[ this ] )
			{				
				ytdj.debug( this, "|" + vidState + "{ls:" + ytdj.lastState[ this ] + "}" );

				// Check for end of video
				if( vidState == ytdj.tube.STATE_ENDED )
				{
					//ytdj.tube.playFromCue( 0, this );
				//	ytdj.tube.seekTo(this, 0);
					//ytdj.ui.setPlayState(this, false);
				//	$("#" + this + "_Play").click();
				}
				
				if( vidState == ytdj.tube.STATE_BUFFERING && ytdj.lastState[ this ] == ytdj.tube.STATE_PAUSED )
				{
					// try and catch wierdness where rewinding the video re-loads the clip, hence going back to buffering...
					PlaylistController.preLoading( this, true );
					PlaylistController.preLoadPaused( this, false );
				}
			}
			ytdj.lastState[ this ] = vidState;
			
		});

		/* AutoPlay functionality */
		var tmp_msg = ""; 
		switch( ytdj.STATE )
		{
			case ytdj.AUTOPLAY_OFF:
				break;
			case ytdj.AUTOPLAY_BEGIN: 
				tmp_msg = "ab";
				var leftState = ytdj.tube.getState( ytdj.LEFT );
				var rightState = ytdj.tube.getState( ytdj.RIGHT );
				
				// Determine the channel to start autoplay from
				if( rightState != ytdj.tube.STATE_PLAYING && leftState != ytdj.tube.STATE_PLAYING )
				{
					ytdj.waitingOnAutoPlayChannel = true;
					ytdj.autoplay_channel = null;
				}			
				else if( rightState == ytdj.tube.STATE_PLAYING && leftState != ytdj.tube.STATE_PLAYING )
				{
					// auto play from right
					ytdj.autoplay_channel = ytdj.RIGHT;
				}
				else
				{
					//auto play from left
					ytdj.autoplay_channel = ytdj.LEFT;
				}

				ytdj.STATE = ytdj.AUTOPLAY_PLAYING;
				break;
			case ytdj.AUTOPLAY_PLAYING: 
				ytdj.autoplay_checkFinished();
				break;
			case ytdj.AUTOPLAY_FADING:
				tmp_msg = "af";
				ytdj.autoplay_fade();
				break;
			case ytdj.AUTOPLAY_FADED:
				tmp_msg = "ax";
				ytdj.autoplay_fadeDone();
				break;
		}
		if(tmp_msg!="")
			ytdj.debug( ytdj.autoplay_channel, "|" + tmp_msg );
		
	},
	
	/* HACK: Due to changing states of youtube vids */
	checkItPlayed : function( channel, originalTime )
	{
		var state = ytdj.tube.getState( channel );
		var newTime = ytdj.tube.getCurrentTime( channel );
		ytdj.debug( channel, "(" + newTime + ":" + state + ")" );
		
		switch( state )
		{
			case ytdj.tube.STATE_PLAYING:
				var PLAY_BUFFER = 0.1; // If the play position hasn't moved forward at least this much, we assume it's stuck.
				if( ( parseFloat( newTime ) - PLAY_BUFFER ) <= parseFloat( originalTime ) )
				{	
					// Stuck!
					ytdj.debug( channel, "|stuk" );
					ytdj.tube.seekTo( channel, 1 );
					// otherwise try seek to...
					return;
				}
				else
				{
					// THis is the normal path - still playing!
					ytdj.debug( channel, "|ok" );
				}
				break;
			case ytdj.tube.STATE_BUFFERING:
				// Still buffering		
				ytdj.debug( channel, "|stukbuf:" + state );
				//ytdj.tube.playVid( channel, false ); // pause and act like pre load?
				//PlaylistController.preLoading( channel, true ); // try reset as preLoading?
				// wait a bit then try and play?
				ytdj._checkItPlayed_play( channel, 3 );
								
				break;
				
			default:
				// error - some other state
				ytdj.debug( channel, "|errload:" + state );
				// just try and play?
				ytdj._checkItPlayed_play( channel, 1 );
				break;
		}
	},
	
	/* Set a timeout function to press play - can also wait to see if it's stuck in "buffering mode" */
	_checkItPlayed_play : function( channel, attempts )
	{
		setTimeout( function()
		{
			var state = ytdj.tube.getState( channel );
			if( attempts-- > 0 && state == ytdj.tube.STATE_BUFFERING )
			{
				ytdj.debug( channel, "|waitn:" + state );
				ytdj._checkItPlayed_play( channel, attempts );
			}
			else
			{
				if( state == ytdj.tube.STATE_BUFFERING )
				{
					// I reckon it could get here - when it does that weird "continuous buffering" thing.
					ytdj.debug( channel, "|rew" );
					ytdj.tube.seekTo( channel, 0 );
				}
				ytdj.debug( channel, "|playn:" + state );
				ytdj.tube.playVid( channel, true ); 
				
				// HACK: mega hack. nooww, try again on the stick fix....
				setTimeout( function(){ ytdj.checkItPlayed( channel, ytdj.tube.getCurrentTime( channel ) ) }, 2000 ); // fix for sticking play
			}
		}, 2000 );
	},
	
	autoplay_checkFinished : function()
	{
		if(ytdj.autoplay_channel == null)
			return;
			
		var channel = ytdj.autoplay_channel;
		var state = ytdj.tube.getState( channel );
		var currentTime = ytdj.tube.getCurrentTime( channel );
		var duration = ytdj.tube.getDuration( channel );
				
		var otherChannel = channel == ytdj.LEFT ? ytdj.RIGHT : ytdj.LEFT;
		
		$("#testbox").val(duration - currentTime);
		//  Auto play, check for swaps...
		if( duration - currentTime < 5 )
		{
			ytdj.debug( channel, "-" );
			
			// HACK: checks for buffering too (ps...AND ENDED!) - because sometimes it sticks on buffering.
			if( state != ytdj.tube.STATE_PAUSED )
			{
				// Play the other video
				var isReallyPlayingTime = ytdj.tube.getCurrentTime( otherChannel );
				ytdj.tube.toggleVid( otherChannel );
				setTimeout( function(){ ytdj.checkItPlayed( otherChannel, isReallyPlayingTime ) }, 1000 ); // fix for sticking play
				
				ytdj.debug( channel, "|otg" );
				ytdj.debug( otherChannel, "|tog(" + isReallyPlayingTime + ")"  );
				
				ytdj.autoplay_loading_track = channel;			
				// Start the auto fade
				ytdj.STATE = ytdj.AUTOPLAY_FADING;
			}
			else
			{
				// Here if user paused in the last 5 seconds
				ytdj.debug( channel, "|err:". state );
			}
		}
		else
		{
			// Preload the first track in autoplay mode
			if( duration - currentTime < 30 && ytdj.tube.getState( otherChannel ) == ytdj.tube.STATE_UNDEFINED )
			{
				ytdj.autoplay_loading_track = otherChannel;
				PlaylistController.loadTrack( otherChannel, PlaylistController.getNextTrack( otherChannel ) );
			}
		}
	},
	
	autoplay_fade : function()
	{	
		ytdj.fadePos += 5;
		
		if( ytdj.fadePos >= 96 )
		{
			ytdj.fadePos = 100
			ytdj.STATE = ytdj.AUTOPLAY_FADED;			
		}
		
		$('#MixFader').slider("moveTo", ytdj.autoplay_channel == ytdj.LEFT ? ytdj.fadePos : 100 - ytdj.fadePos);

	},
	
	autoplay_fadeDone : function()
	{
		ytdj.fadePos = 0.01;
		// load the next track
		PlaylistController.loadTrack( ytdj.autoplay_channel, PlaylistController.getNextTrack( ytdj.autoplay_channel ) );
		
		// Swap channels
		ytdj.autoplay_channel = ytdj.autoplay_channel == ytdj.LEFT ? ytdj.RIGHT : ytdj.LEFT;
		
		// TODO: Test... I don't think we should go back to begin unless check/uncheck autoplay.... ytdj.STATE = ytdj.AUTOPLAY_BEGIN;	
		ytdj.STATE = ytdj.AUTOPLAY_PLAYING;	
	},
	
	
	getChannel : function( channel )
	{
		// Need to ensure its a player object, not the div...
		return document.getElementById( channel );
	},
	
	fader : function( faderPosition )
	{
		if( isNaN(parseInt(faderPosition) ) ) return;
		faderPosition = parseInt( faderPosition );
	
		var LeftMaxVolume = 100 - ytdj.ui.volumeSliders[ ytdj.LEFT ].slider( "value" );
		var RightMaxVolume = 100 - ytdj.ui.volumeSliders[ ytdj.RIGHT ].slider( "value" );
	
		//Fader response - using the algorithm  (1+cos(x*x*pi))/2
		faderPosition /= 100; // Gets it down to  0 - 1 range
		faderResponseLeft = ( 1 + Math.cos( faderPosition * faderPosition * Math.PI ) ) / 2
		faderResponseRight = ( 1 + Math.cos( (1-faderPosition)*(1-faderPosition) * Math.PI ) ) / 2
	
		// x100 to get back to 0 to 100 range: using Vol% to limit to max volume
		var LeftVolume = parseInt( parseInt( faderResponseLeft * LeftMaxVolume )  );
		var RightVolume = parseInt( parseInt( faderResponseRight * RightMaxVolume )  );
		
		ytdj.tube.setVolume( ytdj.LEFT, LeftVolume );
		ytdj.tube.setVolume( ytdj.RIGHT, RightVolume );
	},
	
	setFaders : function()
	{
		$('#MixFader').slider( "moveTo", ytdj.mix.faderPosition );
		$( '#' + ytdj.LEFT + '_Volume' ).slider( "moveTo", 100 - ytdj.mix.playlists[ ytdj.LEFT ].volume );
		$( '#' + ytdj.RIGHT + '_Volume' ).slider( "moveTo", 100 - ytdj.mix.playlists[ ytdj.RIGHT ].volume );
	},
	
	setVolumeFader : function( channel, volume )
	{
		$( '#' + channel + '_Volume' ).slider( "moveTo", 100 - volume );
	},
	
	setCueToTime : function(channel, time)
	{
		ytdj.ui.cuePoints[ channel ].val( time );
		var curTrack = PlaylistController.getCurrentTrack( channel );
		if(curTrack != null)
		{
			curTrack.cuePoint = time;
			PlaylistController.persistPlaylists();
		}
	},
	
	setCueToCurrentTime : function( channel )
	{
		var currentTime = ytdj.tube.getCurrentTime( channel );
		ytdj.setCueToTime( channel, currentTime );
	},
		
	setCurrentBPM: function()
	{
		var newTime = new Date().getTime();
		
		if( newTime - this.tapTime > 4000)
		{
			// Too long since last tap - reset the whole shebang.
			this.tapTimes = [];
			clearInterval( ytdj.tapInterval );
			$("#testlevel").css("width", "0");
		}
		else
		{
			// Add this tap time to the array
			this.tapTimes.push( newTime - this.tapTime );
			
			var totalTime = 0;		
			var BEATS_TO_SAMPLE = 8
			
			var startIndex = this.tapTimes.length < BEATS_TO_SAMPLE ? 0 : this.tapTimes.length - BEATS_TO_SAMPLE;
			for(var i = startIndex; i < this.tapTimes.length; i++)
			{
				// Add up all the times in the array
				totalTime += this.tapTimes[i];
			}
			// And get the average to give us BPM
			var BPM = 60000 / ( totalTime / ( this.tapTimes.length < BEATS_TO_SAMPLE ? this.tapTimes.length : BEATS_TO_SAMPLE ) )
			$("#testbox").val( BPM );
			if( ytdj.tapInterval != null )
			{
				clearInterval( ytdj.tapInterval );
			}
			ytdj.tapInterval = setInterval( 
				function()
				{	
					$("#testlevel").animate({ width: "119px" }, {duration: 100, easing: 'swing'} ).animate({ width: "30px"},300);
				}, ( 60 / BPM ) * 1000 );
		}
		
		this.tapTime = newTime;
	},
	
	playDemo : function()
	{
		$("#Chan1_Play").click();
		setTimeout(function(){$("#Chan2_Play").click();},27);
	},
	
	handleKeys : function( e )
	{
		if( e.ctrlKey )
		{
			return;
		}
		switch(e.which)
		{
			case ytdj.keys.FADER_CENTRE: $('#MixFader').slider("moveTo", 50); break;
			case ytdj.keys.FADER_LEFT: $('#MixFader').slider("moveTo", 0.01); break;	
			case ytdj.keys.FADER_RIGHT: $('#MixFader').slider("moveTo", 100); break;
			case ytdj.keys.FADER_LEFTISH: $('#MixFader').slider("moveTo", 25); break;	
			case ytdj.keys.FADER_RIGHTISH: $('#MixFader').slider("moveTo", 75); break;
			
			case ytdj.keys.PLAY_LEFT: $("#Chan1_Play").click(); break;
			case ytdj.keys.PLAY_RIGHT: $("#Chan2_Play").click(); break;
			
			case ytdj.keys.CUE_LEFT: $("#Chan1_Cue1").click(); break;
			case ytdj.keys.CUE_RIGHT: $("#Chan2_Cue1").click(); break;
			
			case ytdj.keys.MUTE_LEFT: $("#Chan1_Mute").click(); break;
			case ytdj.keys.MUTE_RIGHT: $("#Chan2_Mute").click(); break;
			
			case ytdj.keys.REWIND_LEFT: ytdj.tube.seekTo(ytdj.LEFT, 0); break;
			case ytdj.keys.REWIND_RIGHT: ytdj.tube.seekTo(ytdj.RIGHT,0); break;

			case ytdj.keys.DEBUG:
			 	/*
				... you don't wanna see debug stuff. tis ugly!
				*/
				ytdj.showDebug = !ytdj.showDebug;
				
				$("#" + ytdj.LEFT + "_vidStats").toggle(); 
				$("#" + ytdj.RIGHT + "_vidStats").toggle(); 
				
				break;
			
			case ytdj.keys.DEMO:
					ytdj.demoMode = 1;
					PlaylistController.loadVid( ytdj.LEFT, "RVp9I8GyBIA");
					PlaylistController.loadVid( ytdj.RIGHT, "8bduEy8IPIw");			 
				break;
			case 49:
					if(this.tsugiNoKagi==96)
					{
						
					}
				break;
		}
		this.tsugiNoKagi = e.which;
	}
	
	
};

function handleError( channel, error )
{
	var errorMesssage;
	switch( error )
	{
		case 100:
			errorMessage = "This video has been removed from YouTube";
			break;
		case 101:
		case 150:
			errorMessage = "Sorry, This video can only be viewed at YouTube.com";
			break;
		default:
			errorMessage = "Something went wrong trying to load this video.\n\n(code " + error + ")";
			break;
	}
	$("#" + channel + "_Title").text(errorMessage)
	
	if(ytdj.autoplay_loading_track != null)
	{
		// Wait a sec, then try and load the next track.
		setTimeout( function()
		{
			PlaylistController.loadTrack( ytdj.autoplay_loading_track, PlaylistController.getNextTrack( ytdj.autoplay_loading_track ) );
		}, 1000);
	}
}

function onYouTubePlayerReady( playerId )
{	
	// Hey, this only appears to get called once - not on each vid load... weird.
		
	// onError retunrs error cdoe 100 for vid not found...	
	ytdj.getChannel(playerId).addEventListener( "onError", "function(error){ handleError('" + playerId + "',error) }" );
	
	PlaylistController.setCurrent( playerId );

}

// Window On load event 
$(function(){

	ytdj.init(); // Set it all up

	// attach search behaviour
	$("#QuickSearch form").submit(function(){
		ytdj.tube.searchForVids($(this).children("#search").val(), 1);
		return false;
	}).children(".button").click(function(){
		ytdj.tube.searchForVids(this.previousSibling.value, 1);
		return false;
	});

	// Set up scrollPanes for the playlists
	$("#Chan1_ul, #Chan2_ul").jScrollPane({ showArrows:true });

	$(document).keypress(ytdj.handleKeys);

});

