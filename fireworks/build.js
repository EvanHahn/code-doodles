var harp = require('harp');

module.exports = function(outputPath, callback) {
  harp.compile(__dirname, outputPath, callback)
};
