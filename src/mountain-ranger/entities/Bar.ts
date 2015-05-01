/// <reference path="../lib/Color" />
/// <reference path="../lib/colors" />
/// <reference path="../lib/sample" />

class Bar {
	x: number;
	y: number;
	color: Color;
	
	constructor(y: number) {
		this.reset(y);
	}
	
	reset(y: number) {
		var jitter = (Math.random() - 0.5) / 2;
		var brightness = Math.sin(Date.now() / 5000) + jitter;
		
		this.x = 0;
		this.y = y;
		this.color = colors.daytime.blendWith(colors.nighttime, brightness);
	}
	
	tick(dt: number): void {
		this.x += dt * 100;
	}
	
	draw(context: CanvasRenderingContext2D): void {
		context.fillStyle = this.color.toString();
		context.fillRect(this.x, this.y, 10, context.canvas.height);
	}
}
