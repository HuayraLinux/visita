VERSION=0.0.3
NOMBRE="visita"

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
	@echo "    ${G}iniciar${N}         Instala dependencias."
	@echo "    ${G}ejecutar_linux${N}  Prueba la aplicacion sobre Huayra."
	@echo "    ${G}ejecutar_mac${N}    Prueba la aplicacion sobre OSX."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version${N}         Genera la informacion de versión actualizada."
	@echo "    ${G}ver_sync${N}        Sube la nueva version al servidor."
	@echo ""
	@echo "    ${G}distwin${N}         Genera las versiones para windows."
	@echo "    ${G}distwin-completo${N}         Genera las versiones para windows con todos los recursos incluidos."
	@echo "    ${G}publicar${N}        Incrementa la versión."
	@echo "    ${G}crear_deb${N}       Empaqueta para huayra."
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
	rm -r -f dist
	rm -r -f distwin
#	rm -r -f extras/bins
	rm -r -f extras/__MACOSX


distwin: limpiar
#	cd extras; unzip bins.zip
	sh extras/distwin.sh
	makensis distwin/instalador.nsi
	mkdir dist
	mv distwin/visita-HCDN_0.0.3.exe dist/
	@echo "Build completo: el archivo se encuentra en dist"
#	open dist
distwin-completo: limpiar
	sh extras/distwin-completo.sh
	makensis distwin/instalador-completo.nsi
	mkdir dist
	mv distwin/completo-visita-HCDN_0.0.4.exe dist/
	@echo "Build completo: el archivo se encuentra en dist"

crear_deb:
	dpkg-buildpackage -us -uc

version:
	# patch || minor
	@bumpversion patch --current-version ${VERSION} Makefile extras/instalador.nsi --list 
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make ver_sync"

ver_sync:
	git tag '${VERSION}'
	git commit -am 'release ${VERSION}'
	git push
	git push --all
	git push --tags

