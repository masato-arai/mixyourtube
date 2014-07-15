<? ?>
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0">
	<title>mixtube</title>
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Varela+Round'>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="wrapper">
		<header>
			<section id="siteTitle">
				<h1>/MIXYOURTUBE</h1>
			</section><!-- End Site Title Section-->
		</header><!-- End header Section-->
		<section class="searchBoxLeft">
			<div class="cancelButton">CANCEL</div>
			<div ng-controller="mainCtrl">
				<form ng-submit="doSearch()" name="myForm">
					<input type="text" ng-model="query" required>
				</form>
				<ul ng-show="results.length">
					<li ng-repeat="result in results">
						<img ng-src="{{result.media$group.media$thumbnail[0].url}}">
						<p>
							<h3>{{result.title.$t}}</h3>
							by {{result.author[0].name.$t}} • {{result.published.$t}} ago • {{result.yt$statistics.viewCount}} views
						</p>
					</li>
				</ul>
				<p ng-hide="results.length">research from top</p>
			</div>
<!--
			<ul id="listLeft">
				
			</ul>
-->
		</section>
<!--
		<section class="searchBoxRight">
			<div class="cancelButton">CANCEL</div>
			<input type="text" id="q">
			<input type="button" id="searchRight" value="search">
			<ul id="listRight"></ul>
		</section>
-->
		<section id="video">
			<div class="tubeVideo tubeLeft">
				<div class="tubeTitle tubeTitleLeft">BLUE HAWAII IN TWO (PT. II)</div>
				<div id="playerLeft"></div>
			</div>
			<div class="tubeVideo tubeRight">
				<div id="playerRight"></div>
			</div>
		</section><!-- End Video Section-->
		<section id="controller">
			<div id="faderSlider"></div>
		</section>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
	<script src="//code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="js/search.js"></script>
	<script src="js/main.js"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	
</body>
</html>