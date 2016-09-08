VERSION=0.5.24
NOMBRE="visita-a-la-casa-del-pueblo"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m

comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}visita${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}            Instala dependencias."
	@echo "    ${G}ejecutar_linux${N}     Prueba la aplicacion sobre Huayra."
	@echo "    ${G}ejecutar_mac${N}       Prueba la aplicacion sobre OSX."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version${N}            Genera la informacion de versión actualizada."
	@echo "    ${G}ver_sync${N}           Sube la nueva version al servidor."
	@echo ""
	@echo "    ${G}binarios_windows${N}   Genera las versiones para windows."
	@echo "    ${G}publicar${N}           Incrementa la versión."
	@echo "    ${G}crear_deb${N}          Empaqueta para huayra."
	@echo ""


iniciar:
	npm install

ejecutar_linux:
	nw src

ejecutar_mac:
	/Applications/nwjs.app/Contents/MacOS/nwjs src

publicar:
	dch -i

limpiar:
	@rm -r -f dist
	@rm -r -f distwin
	@rm -r -f extras/__MACOSX
	@rm -rf build

binarios_windows: limpiar
	@echo "Compilando ... "
	@./node_modules/.bin/nwbuild src/. --platforms=win32,win64 > /dev/null
	@echo "Generando binarios win32 ..."
	@zip -qr build/${NOMBRE}-${VERSION}-win32.zip build/${NOMBRE}/win32/ > /dev/null
	@echo "Generando binarios win64 ..."
	@zip -qr build/${NOMBRE}-${VERSION}-win64.zip build/${NOMBRE}/win64/ > /dev/null
	@echo "Los binarios se generaron en el directorio build"

crear_deb:
	dpkg-buildpackage -us -uc

version:
	@bumpversion patch --current-version ${VERSION} Makefile --list 
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make ver_sync"

ver_sync:
	git tag '${VERSION}'
	git commit -am 'release ${VERSION}'
	git push
	git push --all
	git push --tags

