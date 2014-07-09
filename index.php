<? ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0">
	<title>mixtube</title>
	<link href="css/normalize.css" rel="stylesheet">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="wrapper">
		<header>
		</header><!-- End header Section-->
		<section class="searchBoxLeft">
			<div class="cancelButton">CANCEL</div>
			<input type="text" id="q">
			<input type="button" id="searchLeft" value="search">
			<ul id="listLeft"></ul>
		</section>
		<section class="searchBoxRight">
			<div class="cancelButton">CANCEL</div>
			<input type="text" id="q">
			<input type="button" id="searchRight" value="search">
			<ul id="listRight"></ul>
		</section>

		
		<section id="siteTitle">
			<h1>mixtube</h1>
		</section><!-- End Site Title Section-->
		<section id="video">
			<div class="tubeVideo">
				<div class="tubeLeft">
					<div id="playerLeft"></div>
				</div>
			</div>
			<div class="tubeVideo">
				<div class="tubeRight">
					<div id="playerRight"></div>
				</div>
			</div>
		</section><!-- End Video Section-->
		<section id="controller">
			<ul>
				<div id="faderSlider"></div>
			</ul>
		</section>
	</div>
	<script src="//code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="js/audioAnalyser.js"></script>
	<script src="js/search.js"></script>
	<script src="js/main.js"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	
</body>
</html>