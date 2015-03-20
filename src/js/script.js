var gui = require('nw.gui');

jQuery(window).load(function() {
   // Page Preloader
   jQuery('#status').fadeOut();
   jQuery('#preloader').delay(350).fadeOut(function(){
      jQuery('body').delay(350).css({'overflow':'visible'});
   });

   jQuery('#imagen-cerrar').click(function(e) {
     var win = gui.Window.get();
     win.close();
   });

   jQuery('#imagen-alternar').click(function(e) {
     var win = gui.Window.get();
     win.toggleFullscreen();
   });

});



document.onkeydown = function(e) {
  // si pulsa la tecla ESC alterna entre ventana y pantalla completa.
  if (e.keyCode === 27) {
    var win = gui.Window.get();
    win.toggleFullscreen();
  }


  // Si pulsa la tecla "i" abre las herramientas de desarrollo.
  if (e.keyCode === 73) {
    var win = gui.Window.get();
    win.showDevTools();
  }

  // Si pulsa la tecla "r" actualiza la pantalla.
  if (e.keyCode === 82) {
    document.location.reload(true);
  }

};



//Aquí colocamos el PATH tanto para Huayra como para Windows
$(document).ready(function() {
	var OSPath="Unknown OS";

	if (navigator.appVersion.indexOf("Win") != -1)
		OSPath="file:///F:/contenido/recursos/";

	if (navigator.appVersion.indexOf("Linux") != -1)
    OSPath="/media/DATOS/contenido/recursos/";
		//OSPath="file:///media/alumno/DATOS/recursos/";

	$('.recurso-src').each(function(){
		$(this).attr('src',OSPath+$(this).attr('src'))
	});

	$('.recurso-poster').each(function(){
		$(this).attr('poster',OSPath+$(this).attr('poster'))
	});

	$('.recurso-href').each(function(){
		$(this).attr('href',OSPath+$(this).attr('href'))
	});

	$('.playlist').each(function(){
		$(this).attr('data-video',OSPath+$(this).attr('data-video'));
		$(this).attr('data-track',OSPath+$(this).attr('data-track'));
	});
});
