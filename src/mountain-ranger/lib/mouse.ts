module util {
	export class Mouse {
		element: HTMLElement;
		x: number;
		y: number;
		
		constructor(element) {
			this.element = element || window;
			
			this.x = this.element.offsetWidth / 2;
			this.y = this.element.offsetHeight / 2;
			
			this.element.addEventListener('mousemove', event => {
				this.x = event.clientX;
				this.y = event.clientY;
			});
		}
	}	
}