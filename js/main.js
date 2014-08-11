/*
window.onload=function(){
	$('#wrapper').fadeIn(1500);
}
*/

$('body').append(
	'<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>'
);

jQuery.event.add(window,"load",function() { // 全ての読み込み完了後に呼ばれる関数
	var pageH = $("#container").height();

	$("#fade").css("height", pageH).delay(900).fadeOut(800);
	$("#loader").delay(600).fadeOut(300);
	$("#wrapper").css("display", "block");
});


// Window load event used just in case window height is dependant upon images
$(window).bind("load", function() { 

	// Search Box ON OFF Animation
	var search = "#searchWrapperLeft, #searchWrapperRight";
	var searchLeft = "#searchWrapperLeft";
	var searchRight = "#searchWrapperRight";
	
	$(".tubeTitleLeft").click(function() {
		$(searchLeft).animate({ 
			opacity: 1
		}, 1, function(){
			$(this).css('visibility', 'visible').hide().fadeIn(300);
		});
	});

	$(".tubeTitleRight").click(function() {
		$(searchRight).animate({ 
			opacity: 1
		}, 1, function(){
			$(this).css('visibility', 'visible').hide().fadeIn(300);
		});
	});

	$(".searchCancel, .cancelButton").click(function() {
		$(search).animate({
			opacity: 0
		}, 300, function() {
			$(this).css('visibility', 'hidden');
		});
	});
	
	// First time Input is focused, delete it's value
	$('input').one('focus', function(){
		this.value = '';
	});
	
	//Search enter key click event	
	$("#qLeft").keyup(function(event){
		if(event.keyCode == 13){
			$("#searchLeft").click();
		}
	});
	$("#qRight").keyup(function(event){
		if(event.keyCode == 13){
			$("#searchRight").click();
		}
	});
	
	// jQuery UI volume fader
	$( "#faderSlider" ).slider({ value: 100 });
	
});
