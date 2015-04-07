sources.ready(function() {
	$('.container .content .personas .img-personas').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				width : '100%'
			}, 1000);
		});
	});

	var urlParam = function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results && results[1];
	};

	var myPlayer,
		width_reproductor,
		height_reproductor;

	if($(window).height() <= 442 && $(window).width() <=1022) {
		width_reproductor = 550;
		height_reproductor = 250;
	}
	else {
		width_reproductor = 750;
		height_reproductor = 350;
	}

	$('#example_video_1').attr( 'width', width_reproductor );
	$('#example_video_1').attr( 'height', height_reproductor );

	if(urlParam('place') == 'home') {
		videojs('example_video_1').ready(function(){
			myPlayer = this;

				myPlayer.addClass('vjs-fullscreen');
				myPlayer.play();

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

	}
	else {
		videojs('example_video_1').ready(function(){
			myPlayer = this;

			$('#example_video_1').find('.vjs-big-play-button').remove();
		});
	}

	$('.playlist').click(function() {
		myPlayer.src($( this ).attr('data-video'));
		$('#substitle').attr('src', $( this ).attr('data-track'));
		myPlayer.load();
		myPlayer.play();
	});
	videojs('example_video_1').ready(function(){
		setTimeout(function() {
			$('.vjs-captions-button').find('.vjs-menu-item').eq(0).click();
		}, 500);
	});
});
