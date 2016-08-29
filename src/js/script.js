var gui = require('nw.gui'),
  fs = require('fs'),
  ini = require('ini');

/* HACK para setear WM_CLASS */
process.mainModule.exports.init(require('nwjs-hack').set_wmclass.bind(null, "visita", true));

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
    gui.Window.get().toggleFullscreen();
  }


  // Si pulsa la tecla "i" abre las herramientas de desarrollo.
  if (e.keyCode === 73) {
    gui.Window.get().showDevTools();
  }

  // Si pulsa la tecla "r" actualiza la pantalla.
  if (e.keyCode === 82) {
    document.location.reload(true);
  }

};

//Aquí colocamos el PATH tanto para Huayra como para Windows
$(document).ready(function() {
  var fixPaths = function(path) {
    var datosPath = ini.parse(fs.readFileSync(path + '/config.ini', 'utf-8')).datos.path;
    $('.recurso-src').each(function(){
      $(this).attr('src', datosPath + $(this).attr('src'));
    });

    $('.recurso-poster').each(function(){
      $(this).attr('poster', datosPath + $(this).attr('poster'));
    });

    $('.recurso-href').each(function(){
      $(this).attr('href', datosPath + $(this).attr('href'));
    });

    $('.playlist').each(function(){
      $(this).attr('data-video',datosPath+$(this).attr('data-video'));
      $(this).attr('data-track',datosPath+$(this).attr('data-track'));
    });
  };

  if(navigator.appVersion.indexOf("Win") != -1) {
    var Winreg = require('winreg');
    var regKey = new Winreg({
      hive: Winreg.HKCU,                                          // HKEY_CURRENT_USER
      key:  '\\visita-HCDN\\visita-HCDN' // key containing autostart programs
    });

    // list autostart programs
    regKey.get('path', function (err, item) {
      var pathPrefix;
      if (err) {
        throw err;
      }
      else {
        pathPrefix = item.value;
      }

      fixPaths(pathPrefix);
    });
  }
  else {
    fixPaths('.') ;
  }
});
