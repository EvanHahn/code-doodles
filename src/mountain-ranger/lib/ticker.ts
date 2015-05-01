module util {
	export function ticker (fn: (dt: number) => void): void {
		var lastTime: number;
		
		function tick (t) {
			lastTime || (lastTime = t);
			var dt = (t - lastTime) / 1000;
			lastTime = t;
			
			fn(dt);
			
			requestAnimationFrame(tick);
		}
		
		requestAnimationFrame(tick);
	};
}