sources.ready(function() {
	var myPlayer,
		width_reproductor,
		height_reproductor;

	if($(window).height() <= 442 && $(window).width() <=1022) {
		width_reproductor = 350;
		height_reproductor = 250;
	}
	else {
		width_reproductor = 400;
		height_reproductor = 250;
	}
	
	$('#example_video_1').attr( 'width', width_reproductor );
	$('#example_video_1').attr( 'height', height_reproductor );
	
	videojs('example_video_1').ready(function(){
		myPlayer = this;
		$('#example_video_1').find('.vjs-big-play-button').remove();
	});
	
	videojs('example_video_1').on('firstplay', function() {
	  myPlayer.addClass('vjs-fullscreen');
		var button = myPlayer.controlBar.addChild('button', {
			text: 'alternar'
		});

		button.addClass('exit-button');

		button.el().onclick = function() {
			$(myPlayer.el()).toggleClass('vjs-fullscreen');
		};
	});

	videojs('example_video_1').on('ended', function(){
		this.removeClass('vjs-fullscreen');
	});

	videojs('example_video_1').on('error', function(){
		document.location.reload();
	});
	if(typeof gui != 'undefined') {
		$(document.body).on('click', '.anios-container a', function(e) {
			e.preventDefault();
			gui.Shell.openItem($(this).attr('href'));
		});
	}
	else {
		$('.anios-container a').attr('target', '_blank');
	}

	videojs('example_video_1').ready(function(){
		setTimeout(function() {
			$('.vjs-captions-button').find('.vjs-menu-item').eq(0).click();
		}, 500);
	});
});
