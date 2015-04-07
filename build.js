var browserify = require('browserify');
var b = browserify({
	basedir: './src/'
});
b.add('./js/script.js');
b.bundle().pipe(process.stdout);