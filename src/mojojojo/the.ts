/// <reference path="./lib/doodle" />
/// <reference path="./entities/Morphy" />

var doodle = new Doodle();

doodle.canvas.style.backgroundColor = '#A7C8CD';

doodle.entities.push(new Morphy({
	x: 123,
	y: 456,
	color: '#7BAAC0'
}));