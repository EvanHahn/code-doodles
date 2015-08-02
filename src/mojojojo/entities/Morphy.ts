class Morphy {
	private x: number;
	private y: number;
	private color: string;
	
	constructor(properties: {x: number, y: number, color: string}) {
		this.x = properties.x;
		this.y = properties.y;
		this.color = properties.color;
	}
	
	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		
	  ctx.beginPath();
	  ctx.moveTo(0, ctx.canvas.height);
	  ctx.quadraticCurveTo(this.x, this.y, ctx.canvas.width, ctx.canvas.height);
	  ctx.fill();
	}
}