const copyFile = require('stream-copy-file');
const fs = require('fs');
const path = require('path');
const rmdir = require('rmdir');
const watch = require('watch').watchTree;
const connect = require('connect');
const serveStatic = require('serve-static');

const watchOptions = {
  ignoreDotfiles: true,
  ignoreUnreadableDir: true
};
const thrower = function(err) { if (err) { throw err; } };

const srcDir = path.resolve(__dirname, 'src');
const srcFiles = fs.readdirSync(srcDir);
const outputDir = path.resolve(__dirname, 'www');

const recreateDir = function(path, callback) {
  fs.exists(path, exists => {
    if (exists) {
      rmdir(path, err => {
        if (err) {
          callback(err);
          return;
        }
        fs.mkdir(path, callback);
      });
    } else {
      fs.mkdir(path, callback);
    }
  });
};

recreateDir(outputDir, err => {

  srcFiles.forEach(file => {

    const filename = path.resolve(srcDir, file);
    fs.stat(filename, (err, stats) => {

      if (err) { throw err; }

      if (stats.isDirectory()) {

        const buildFile = path.resolve(filename, 'build.js');

        fs.exists(buildFile, exists => {

          if (!exists) { return; }

          const buildFunction = require(buildFile);
          const outputFolder = path.resolve(outputDir, file);

          const build = function() {
            console.log('building', file);
            recreateDir(outputFolder, err => {
              if (err) {
                console.error('Error recreating output folder:', err);
                return;
              }
              buildFunction(outputFolder, err => {
                if (err) {
                  console.error('Error building ' + file + ':', err);
                }
              });
            });
          };

          watch(filename, watchOptions, build);

        });

      } else {

        const outputFilename = path.resolve(outputDir, file);
        copyFile(filename, outputFilename, thrower);

      }

    });

  });

  const app = connect();
  app.use(serveStatic(outputDir));
  app.listen(3000, () => {
    console.log('Code doodles are happening');
  });

});
