<? ?>
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
</head>
<body>
	<div id="wrapper">
		<header>
			<section id="siteTitle">
				<h1>/MIXYOURTUBE</h1>
			</section><!-- End Site Title Section-->
		</header><!-- End header Section-->
		<section id="searchWrapper">
			<div class="searchCancel"></div>
			<div class="searchBoxLeft">
				<div class="cancelButton">CANCEL</div>
				<div ng-controller="mainCtrl">
					<form ng-submit="doSearch()" name="myForm">
						<input type="text" ng-model="query" ng-init="query='SEARCH'" value="SEARCH" ng-click="onTextClick($event)" required>
					</form>
					<ul ng-show="results.length" class="searchList">
						<li ng-repeat="result in results">
							<img ng-src="{{result.media$group.media$thumbnail[0].url}}">
							<div class="youtubeInfo">
								<h3>{{result.title.$t}}</h3>
								<p>by {{result.author[0].name.$t}} • {{result.yt$statistics.viewCount}} views</p>
								<!-- <div class="checked "></div> -->
								<div class="checked selected">
									<span data-label="selected">
										<img src="images/searchChecked.png" />
									</span>
								</div>
							</div>
						</li>
					</ul>
					<p ng-hide="results.length">hide later</p>
				</div>
				<div id="search-container"></div>
			</div>
		</section>
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
	<script src="//code.jquery.com/jquery-latest.min.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="js/auth.js"></script>
	<script src="js/search.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
	<script src="js/main.js"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	
</body>
</html>