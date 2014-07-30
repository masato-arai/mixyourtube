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
	<link rel='previous' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos?start-index=1&max-results=5&v=2'/>
	<link rel='next' type='application/atom+xml' href='http://gdata.youtube.com/feeds/api/videos?start-index=51&max-results=5&v=2'/>
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
			</div>
		</section>

		<section id="searchWrapperRight">
			<div class="searchCancel"></div>
			<div class="searchBoxRight">
				<div class="cancelButton">CANCEL</div>
				<input type="text" id="qRight" value="SEARCH">
				<input type="button" id="searchRight">
				<ul class="searchListRight">Delete later</ul>
			</div>
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
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
	<script src="//code.jquery.com/jquery-latest.min.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="js/auth.js"></script>
	<script src="js/v2.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
	<script src="js/main.js"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	
</body>
</html>