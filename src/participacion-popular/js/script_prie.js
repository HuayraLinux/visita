document.createElement('video');
document.createElement('audio');
document.createElement('track');



$(document).ready(function() {
	var myPlayer_1;
	var myPlayer_2;
	
	if( $(window).height() <= 442 && $(window).width() <=1022 )
	{
		var width_reproductor = 350;
		var height_reproductor = 150;
	}
	else
	{
		var width_reproductor = 400;
		var height_reproductor = 175;
	}
	
	$('#example_video_1').attr( "width", width_reproductor );
	$('#example_video_1').attr( "height", height_reproductor );
	
	$('#example_video_2').attr( "width", width_reproductor );
	$('#example_video_2').attr( "height", height_reproductor );
	
	videojs("example_video_1").ready(function(){
		myPlayer_1 = this;
		$('#example_video_1').find('.vjs-big-play-button').remove();
	});

	videojs("example_video_2").ready(function(){
		myPlayer_2 = this;
		$('#example_video_2').find('.vjs-big-play-button').remove();
	});
	
	videojs("example_video_1").on("firstplay", function(){
		myPlayer_1.addClass('vjs-fullscreen');

			var button = myPlayer_1.controlBar.addChild('button', {
				text: 'alternar'
			});

			button.addClass('exit-button');

			button.el().onclick = function() {
				$(myPlayer_1.el()).toggleClass('vjs-fullscreen');
			};
	});

		videojs("example_video_1").on("ended", function(){
			this.removeClass('vjs-fullscreen');
		});

	
	videojs("example_video_2").on("firstplay", function(){
		  myPlayer_2.addClass('vjs-fullscreen');

			var button = myPlayer_2.controlBar.addChild('button', {
				text: 'alternar'
			});

			button.addClass('exit-button');

			button.el().onclick = function() {
				$(myPlayer_2.el()).toggleClass('vjs-fullscreen');
			};
	});

		videojs("example_video_2").on("ended", function(){
			this.removeClass('vjs-fullscreen');
		});
	videojs("example_video_1").ready(function(){
		setTimeout(function() {
			$('.vjs-captions-button').find('.vjs-menu-item').eq(0).click();
		}, 500);
	});
	videojs("example_video_2").ready(function(){
		setTimeout(function() {
			$('.vjs-captions-button').find('.vjs-menu-item').eq(0).click();
		}, 500);
	});
});
