<!DOCTYPE html>
<html lang="en" ng-app>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0">
	<title>mixyourtube</title>
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Varela+Round'>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="style.css">
	<script src="js/customPlayer/swfobject.js"></script>
</head>
<body>
	<div id="wrapper">
		<header>
			<section id="siteTitle">
				<h1>/MIXYOURTUBE</h1>
			</section><!-- End Site Title Section-->
		</header><!-- End header Section-->
		<section id="searchWrapperLeft">
			<div class="searchCancel"></div>
			<div class="searchBoxLeft">
				<div class="cancelButton">CANCEL</div>
				<input type="text" id="qLeft" value="SEARCH">
				<input type="button" id="searchLeft">
				<ul class="searchListLeft">Delete later</ul>
			</div><!-- End Search Left-->
		</section>
		<section id="searchWrapperRight">
			<div class="searchCancel"></div>
			<div class="searchBoxRight">
				<div class="cancelButton">CANCEL</div>
				<input type="text" id="qRight" value="SEARCH">
				<input type="button" id="searchRight">
				<ul class="searchListRight">Delete later</ul>
			</div><!-- End Search Right-->
		</section>
		<section id="video">
			<div class="tubeVideo tubeLeft">
				<div class="tubeTitle tubeTitleLeft">Title Left</div>
				<div id="playerLeft"></div>
			</div>
			<div class="tubeVideo tubeRight">
				<div class="tubeTitle tubeTitleRight">Title Right</div>
				<div id="playerRight"></div>
			</div>
		</section><!-- End Video Section-->
		<section id="controller">
			<div id="faderSlider"></div>
		</section>
	</div>
	<script src="//code.jquery.com/jquery-latest.min.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="js/auth.js"></script>
	<script src="js/v2.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	<script src="js/main.js"></script>
	
</body>
</html>