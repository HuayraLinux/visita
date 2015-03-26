rm -r -f distwin
rm -r -f distwin.zip

mkdir distwin
cp -r -f src/* distwin
mkdir distwin/node_modules
cp -r -f node_modules/ini distwin/node_modules/
cp -r -f node_modules/winreg distwin/node_modules/
cd distwin
zip -r distwin.zip *
mv distwin.zip ..
cd ..
mv distwin.zip visita.nw
rm -r -f distwin/*

cp -r -f extras/bins/* distwin/
cp extras/instalador-completo.nsi distwin/
mv visita.nw distwin/
cat distwin/nw.exe distwin/visita.nw > distwin/visita.exe
rm distwin/nw.exe distwin/visita.nw

echo "El instalador está en el directorio shared/distwin, solo queda compilar el instalador."
