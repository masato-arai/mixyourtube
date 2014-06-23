<? ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0">
	<title>mixtube</title>
	<link href="css/normalize.css" rel="stylesheet">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	
	<link href="style.css" rel="stylesheet">
</head>
<body>
	<div id="wrapper">
		<header>
			<div class="headerLeft">
				<ul>
					<li class="backforward backwardLeft">
						<div class="backwardLeftIcon"></div>
					</li>
					<li class="tubeTitle tubeTitleLeft">
						<div class="tubeName">
							<p>UNKNOWN ARTIST<br />MODERAT - MILK MP3...</p>
						</div>
					</li>
					<li class="backforward forwardLeft">
						<div class="forwardLeftIcon"></div>
					</li>
				</ul>
			</div>
			<div class="headerRight">
				<ul>
					<li class="backforward backwardRight">
						<div class="backwardRightIcon"></div>
					</li>
					<li class="tubeTitle tubeTitleRight">
						<div class="tubeName">
							<p>UNKNOWN ARTIST<br />MODERAT - MILK MP3...</p>
						</div>
					</li>
					<li class="backforward forwardRight">
						<div class="forwardRightIcon"></div>
					</li>
				</ul>
			</div>
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

		
		<section id="audioApi">
			<div class="audioVisual">
				<div class="tubeTime">00:00</div>
				<div class="audioLeft"></div>
			</div>
			<div class="audioVisual">
				<div class="tubeTime">00:00</div>
				<div class="audioRight"></div>
			</div>
		</section><!-- End Audio API Section-->
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
				<li class="controlButton playLeft">
					<div class="playLeftIcon"></div>
				</li>
				<li class="controlButton volumeLeft">
					<div class="volumeLeftIcon"></div>
				</li>
				<div class="volumeLeftBg">
					<div id="slider-vertical"></div>
				</div>
				<li class="controlFader faderLeft"></li>
				<li class="controlFader faderRight"></li>
				<li class="controlButton playRight" onclick="player2.playVideo(); return false">
					<div class="playRightIcon"></div>
				</li>				
				<li class="controlButton volumeRight">
					<div class="volumeRightBg"></div>
					<div class="volumeRightIcon"></div>
				</li>
				<div class="faderIcon"></div>
			</ul>
		</section>
	</div>
	<script src="//code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="js/search.js"></script>
	<script src="js/main.js"></script>
	<script src="//www.youtube.com/iframe_api"></script>
	
</body>
</html>