const async = require('async');
const browserify = require('browserify');
const copyFile = require('stream-copy-file');
const fs = require('fs');
const less = require('less');
const path = require('path');
const to5ify = require('6to5ify');

const htmlInPath = path.resolve(__dirname, 'index.html');
const cssInPath = path.resolve(__dirname, 'the.less');
const jsInPath = path.resolve(__dirname, 'the.js');

module.exports = function(buildPath, callback) {

  const htmlOutPath = path.resolve(buildPath, 'index.html');
  const cssOutPath = path.resolve(buildPath, 'the.css');
  const jsOutPath = path.resolve(buildPath, 'the.js');

  async.parallel([

    done => {
      copyFile(htmlInPath, htmlOutPath, done);
    },

    done => {
      fs.readFile(cssInPath, { encoding: 'utf8' }, (err, data) => {
        if (err) { done(err); return; }
        less.render(data, { paths: [__dirname] }, (err, compiled) => {
          if (err) { done(err); return; }
          fs.writeFile(cssOutPath, compiled.css, done);
        });
      });
    },

    done => {
      browserify({ basedir: __dirname })
        .transform(to5ify)
        .require(jsInPath, { entry: true })
        .bundle()
        .on('error', err => { console.error(err); })
        .on('end', () => { done(null); })
        .pipe(fs.createWriteStream(jsOutPath));
    }

  ], callback);

};
