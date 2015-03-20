document.createElement('video');
document.createElement('audio');
document.createElement('track');



$(document).ready(function() {
	$('.container .content .personas .img-personas').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				width : "100%"
			}, 1000);
		});
	});



	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null)
		{
		   return null;
		}
		else
		{
		   return results[1] || 0;
		}
	}

	var place = $.urlParam('place');
	var myPlayer;

	if( $(window).height() <= 442 && $(window).width() <=1022 )
	{
		var width_reproductor = 550;
		var height_reproductor = 250;
	}
	else
	{
		var width_reproductor = 750;
		var height_reproductor = 350;
	}

	$('#example_video_1').attr( "width", width_reproductor );
	$('#example_video_1').attr( "height", height_reproductor );

	if(place == 'home')
	{
		videojs("example_video_1").ready(function(){
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

		videojs("example_video_1").on("ended", function(){
			myPlayer.removeClass('vjs-fullscreen');
		});
	}
	else
	{
    if (window['videojs'] !== undefined) {
      videojs("example_video_1").ready(function(){
        myPlayer = this;

        $('#example_video_1').find('.vjs-big-play-button').remove();
      });
    }
	}

	$( ".playlist" ).click(function() {
		myPlayer.src($( this ).attr('data-video'));
		$('#substitle').attr('src', $( this ).attr('data-track'));
		myPlayer.load();
		myPlayer.play();
	});
});
