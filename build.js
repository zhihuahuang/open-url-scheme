var fs = require('fs');

const SRC_FILE      = __dirname + '/src/index.js',
      DIST_FILE     = __dirname + '/dist/open-url-scheme.js',
      DIST_MIN_FILE = __dirname + '/dist/open-url-scheme.min.js';

function requireModule(src, dist, cb) {
    var browserify = require('browserify');
    var b = browserify();
    b.add(src);
    b.bundle()
        .on('end', cb)
        .pipe(fs.createWriteStream(dist));
}

function minifyJS(src, dist, cb) {
    var UglifyJS = require("uglify-js");
    fs.readFile(src, 'utf8', function (err, data) {
        var result = UglifyJS.minify(data);
        fs.writeFile(dist, result.code, 'utf8', cb);
    })
}

requireModule(SRC_FILE, DIST_FILE, function () {
    minifyJS(DIST_FILE, DIST_MIN_FILE, function() {
        console.log('Done!');
    });
});