<? ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=0, initial-scale=1.0">
	<title>mixtube</title>
	<link href="css/normalize.css" rel="stylesheet">
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
		<section class="searchBox">
			<div class="cancelButton">CANCEL</div>
<!--
			<div id="buttons">
				<label>
					<input id="query" value='cats' type="text"/>
					<button id="search-button" disabled onclick="search()">Search</button>
				</label>
			</div>
			<div id="search-container"></div>
-->

		<input type="text" id="q">
		<input type="button" id="search" value="search">
		<ul id="list"></ul>

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
					<iframe class="tubeLeft" src="//www.youtube.com/embed/bUlfAOTBX9g?controls=0&showinfo=0&modestbranding=1&enablejsapi=1" frameborder="1" id="video"></iframe>
				</div>
			</div>
			<div class="tubeVideo">
				<div class="tubeRight">
					<iframe class="tubeRight" src="//www.youtube.com/embed/nT2znG8cpnI?controls=0&showinfo=0&modestbranding=1&enablejsapi=1" frameborder="1" id="video"></iframe>
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
				<li class="controlFader faderLeft"></li>
				<li class="controlFader faderRight"></li>
				<li class="controlButton playRight">
					<div class="playRightIcon"></div>
				</li>
				<li class="controlButton volumeRight">
					<div class="volumeRightIcon"></div>
				</li>
				<div class="faderIcon"></div>
			</ul>
		</section>
	</div>
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<!-- 	<script src="js/auth.js"></script> -->
	<script src="js/search.js"></script>
<!-- 	<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script> -->
	<script src="js/main.js"></script>
	
</body>
</html>