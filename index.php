<??>
<!--
      ___           ___           ___           ___                       ___           ___           ___           ___     
     /\  \         /\  \         /\__\         /\__\          ___        /\  \         /\__\         /\__\         /\  \    
    /::\  \       /::\  \       /:/  /        /:/  /         /\  \       \:\  \       /:/  /        /:/  /        /::\  \   
   /:/\ \  \     /:/\:\  \     /:/__/        /:/__/          \:\  \       \:\  \     /:/__/        /:/  /        /:/\:\  \  
  _\:\~\ \  \   /::\~\:\  \   /::\__\____   /::\__\____      /::\__\      /::\  \   /::\  \ ___   /:/  /  ___   /::\~\:\__\ 
 /\ \:\ \ \__\ /:/\:\ \:\__\ /:/\:::::\__\ /:/\:::::\__\  __/:/\/__/     /:/\:\__\ /:/\:\  /\__\ /:/__/  /\__\ /:/\:\ \:|__|
 \:\ \:\ \/__/ \:\~\:\ \/__/ \/_|:|~~|~    \/_|:|~~|~    /\/:/  /       /:/  \/__/ \/__\:\/:/  / \:\  \ /:/  / \:\~\:\/:/  /
  \:\ \:\__\    \:\ \:\__\      |:|  |        |:|  |     \::/__/       /:/  /           \::/  /   \:\  /:/  /   \:\ \::/  / 
   \:\/:/  /     \:\ \/__/      |:|  |        |:|  |      \:\__\       \/__/            /:/  /     \:\/:/  /     \:\/:/  /  
    \::/  /       \:\__\        |:|  |        |:|  |       \/__/                       /:/  /       \::/  /       \::/__/   
     \/__/         \/__/         \|__|         \|__|                                   \/__/         \/__/         ~~       
-->

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0">
	<title>M - Y - H</title>
	<meta name="description" content="Mingle to mix all your favorites and favorites tunes for making tiny casual dance floor in your living room">
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Varela+Round'>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<link rel="shortcut icon" type="image/ico" href="images/favicon.ico" />
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/jquery-ui-1.10.2.custom.min.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="wrapper">
		<header>
			<section id="siteTitle">
				<h1>MIX YOUTUBE IN THE HOUSE</h1>
			</section>
		</header><!-- End header Section-->
		<section id="searchWrapperLeft">
			<div class="searchCancel"></div>
			<div class="searchBoxLeft">
				<div class="cancelButton">CANCEL</div>
				<input type="text" id="qLeft" value="SEARCH" onClick="this.setSelectionRange(0, this.value.length)">
				<input type="button" id="searchLeft">
				<ul class="searchListLeft">
					<p class="blinkFont blinkAuto">M - Y - H</p>
				</ul>
				<ul class="nav"></ul>
			</div><!-- End Search Left-->
		</section>
		<section id="searchWrapperRight">
			<div class="searchCancel"></div>
			<div class="searchBoxRight">
				<div class="cancelButton">CANCEL</div>
				<input type="text" id="qRight" value="SEARCH" onClick="this.setSelectionRange(0, this.value.length)">
				<input type="button" id="searchRight">
				<ul class="searchListRight">
					<p class="blinkFont blinkAuto"> (っ・ω・)っ</p>
				</ul>
				<ul class="nav"></ul>
			</div><!-- End Search Right-->
		</section>
		<section id="video">
			<div class="tubeVideo tubeLeft">
				<div class="tubeTitle tubeTitleLeft">////////////////////////////////////////</div>
				<div class="tubeControlLeft">
					<div class="seekBarLeft"></div>
					<div class = "timeLeft">
						<div class="totalTimeLeft">0:00</div>
						<div class="slashLeft"> / </div>
						<div class="currentTimeLeft">0:00</div>
					</div>
				</div>
				<div id="playerLeft"></div>
			</div>
			<div class="tubeVideo tubeRight">
				<div class="tubeTitle tubeTitleRight">\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>
				<div class="tubeControlRight">
					<div class="seekBarRight"></div>
					<div class = "timeRight">
						<div class="totalTimeRight">0:00</div>
						<div class="slashRight"> / </div>
						<div class="currentTimeRight">0:00</div>
					</div>
				</div>
				<div id="playerRight"></div>
			</div>
		</section><!-- End Video Section-->
		<section id="controller">
			<div id="faderSlider"></div>
		</section><!-- End Fader Controller Section-->
	</div><!-- End #Wrapper-->
	
	<script src="//code.jquery.com/jquery-latest.min.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	<script src="//www.google.com/jsapi"></script> 
	<script src="js/auth.js"></script>
	<script src="js/swfobject.js"></script>
	<script src="js/v2.js"></script>
	<script src="js/main.js"></script>
	
</body>
</html>