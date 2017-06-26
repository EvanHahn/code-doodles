/* eslint-disable no-unused-vars */

function square (n) {
  return n * n
}

function clamp (value, min, max) {
  if (value < min) {
    return min
  } else if (value > max) {
    return max
  } else {
    return value
  }
}

function distance (x1, y1, x2, y2) {
  return Math.sqrt(square(x1 - x2) + square(y1 - y2))
}