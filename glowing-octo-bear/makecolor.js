this.makeColor = function(index) {
  var b, g, modded, r;
  modded = index % 5;
  switch (modded) {
    case 0:
      r = 0;
      b = Math.random() * 100;
      g = (Math.random() * 100) + 155;
      break;
    case 1:
      r = Math.random() * 100;
      g = Math.random() * 100;
      b = (Math.random() * 100) + 155;
      break;
    case 2:
      r = (Math.random() * 100) + 155;
      g = Math.random() * 50;
      b = Math.random() * 75;
      break;
    case 3:
      r = (Math.random() * 100) + 155;
      g = (Math.random() * 100) + 155;
      b = Math.random() * 40;
      break;
    case 4:
      r = (Math.random() * 100) + 155;
      g = Math.random() * 75;
      b = (Math.random() * 100) + 155;
  }
  return Spectra({
    r: r,
    g: g,
    b: b
  });
};
