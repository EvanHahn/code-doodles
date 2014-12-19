const Spectra = require('../vendor/spectra-0.2.3');

module.exports = function() {
  let result;
  do {
    result = Spectra.random();
  } while (result.luma() < 20);
  return result;
};
