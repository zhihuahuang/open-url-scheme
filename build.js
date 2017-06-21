var fs = require('fs');

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

requireModule(__dirname + '/src/index.js', __dirname + '/dist/open-url-scheme.js', function () {
    minifyJS(__dirname + '/dist/open-url-scheme.js', __dirname + '/dist/open-url-scheme.min.js');
});