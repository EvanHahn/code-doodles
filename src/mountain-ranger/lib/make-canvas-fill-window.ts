module util {
	export function makeCanvasFillWindow(canvas: HTMLCanvasElement): void {
		canvas.style.position = 'absolute';
		canvas.style.top = '0';
		canvas.style.left = '0';
		
		var dpi = window.devicePixelRatio || 1;
		if (dpi !== 1) {
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
		}
		
		canvas.width = window.innerWidth * dpi;
		canvas.height = window.innerHeight * dpi;
	};
}