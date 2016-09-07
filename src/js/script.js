var isWindows = navigator.appVersion.indexOf("Win") != -1;
var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');
var DEFAULT_DATA_DIR = isWindows
  ? '/media/DATOS/contenido'
  : 'file:///F:/contenido';

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
function fixPaths(path) {
  /* Actualiza un atributo con un path a uno fixeado */
  function updateAttr(attr) {
    var newPath = path + $(this).attr(attr).replace(/^recursos/, '');
    return $(this).attr(attr, newPath);
  };

  /* Devuelve una función que realiza el update */
  function update(attr) {
    return function() {
      return updateAttr.call(this, attr);
    }
  }

  $('.recurso-src').each(update('src'));
  $('.recurso-poster').each(update('poster'));
  $('.recurso-href').each(update('href'));
  $('.playlist').each(update('data-video'));
  $('.playlist').each(update('data-track'));
};

/* Nota, este código está copiado en instalar-data.html:9 */
function hasDataInstalledIn(recursos) {
  var SENTINEL = '/el-poder-del-pueblo/capitulo51.mp4';
  var sentinelPath = path.join(recursos, SENTINEL);
  return fs.existsSync(sentinelPath);
}

function warnIfNeeded(recursos) {
  var needed = !hasDataInstalledIn(recursos);

  if(needed) {
    window.location.href = "instalar-data.html";
  }
}

$(document).ready(function() {
  var recursos = localStorage.path || DEFAULT_DATA_DIR;
  fixPaths(recursos);
  warnIfNeeded(recursos);
});
