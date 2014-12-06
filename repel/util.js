Math.sign = function(n) {
  if (n > 0) {
    return 1;
  } else if (n < 0) {
    return -1;
  } else {
    return 0;
  }
};

Math.moveTowards = function(val, destination, howMuch) {
  if (destination > val) {
    return Math.min(val + howMuch, destination);
  } else {
    return Math.max(val - howMuch, destination);
  }
};
