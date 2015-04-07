window.sources = (function(require) {
	var $ = require('./js/jquery'),
		gui = require('gui'),
		readyCallbacks = [];

	//Aquí colocamos el PATH tanto para Huayra como para Windows
	$(document).ready(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut(function() {
			$('body').delay(350).css({'overflow':'visible'});
		});
		$('#imagen-cerrar').click(function(e) {
			gui.close();
		});

		$('#imagen-alternar').click(function(e) {
			gui.toggleFullscreen();
		});

		$(document).keydown(function(e) {
			// si pulsa la tecla ESC alterna entre ventana y pantalla completa.
			if (e.keyCode == 27) {
				gui.toggleFullscreen();
			}

			// Si pulsa la tecla "i" abre las herramientas de desarrollo.
			if (e.keyCode == 73) {
				gui.showDevTools();
			}

			// Si pulsa la tecla "r" actualiza la pantalla.
			if (e.keyCode == 82) {
				gui.reload();
			}
		});

		var fixPaths = function(path) {
			var datosPath = gui.getRecursosPath(path);

			$('.recurso-src').each(function() {
				$(this).attr('src', datosPath + $(this).attr('src'));
			});

			$('.recurso-poster').each(function() {
				$(this).attr('poster', datosPath + $(this).attr('poster'));
			});

			$('.recurso-href').each(function() {
				$(this).attr('href', datosPath + $(this).attr('href'));
			});

			$('.playlist').each(function() {
				$(this).attr('data-video',datosPath + $(this).attr('data-video'));
				$(this).attr('data-track',datosPath + $(this).attr('data-track'));
			});

			readyCallbacks.forEach(function(aCallback) {
				aCallback();
			});
			readyCallbacks = [];
		};

		if(navigator.appVersion.indexOf('Win') != -1) {
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

	return {
		ready: function(aCallback) {
			if(readyCallbacks) {
				readyCallbacks.push(aCallback);
			}
			else {
				aCallback();
			}
			return this;
		}
	};
})(require);
