function value() {
  return (Math.floor(Math.random() * 207) + 48).toString(16);
}

function randomColor() {
  return '#' + value() + value() + value();
}

window.onload = function() {

  var body = document.body;
  var text = body.innerHTML;
  var len = text.length;

  var letters = new Array(len);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < len; i ++) {
    var element = document.createElement('span');
    element.innerHTML = text[i];
    letters[i] = element;
    fragment.appendChild(element);
  }

  body.innerHTML = '';
  body.appendChild(fragment);

  function update() {
    for (var i = 0; i < len; i ++) {
      letters[i].style.color = randomColor();
    }
  }

  update();
  setInterval(update, 100);

};
