class Doodle {
	canvas:HTMLCanvasElement;
	context:any;
	
	private lastTime:number;
	private totalTime:number;
	speed:number;
	
	entities:any[];
	
	constructor() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		
		document.body.appendChild(this.canvas);
		this.makeCanvasFillScreen();
		window.addEventListener('resize', () => {
			this.makeCanvasFillScreen();
		}, false);
	
		this.entities = [];
		
		this.speed = 1;
		requestAnimationFrame(this.tick.bind(this));
	}
	
	private makeCanvasFillScreen() {
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = '0';
		this.canvas.style.left = '0';

		var dpi = window.devicePixelRatio || 1;
		if (dpi !== 1) {
			this.canvas.style.width = window.innerWidth + 'px';
			this.canvas.style.height = window.innerHeight + 'px';
		}
		
		this.canvas.width = window.innerWidth * dpi;
		this.canvas.height = window.innerHeight * dpi;
	}
	
	private tick(t) {
		this.lastTime = (this.lastTime || t);
		
		var dt = (t - this.lastTime) * this.speed;
		this.totalTime += dt;
		this.lastTime = t;
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		var entity, tick, draw;
		for (var i = 0; i < this.entities.length; i ++) {
			entity = this.entities[i];
			if (entity.tick) { entity.tick(dt, this.totalTime); }
			if (entity.draw) { entity.draw(this.context); }
		}
		
		requestAnimationFrame(this.tick.bind(this));
	}
}