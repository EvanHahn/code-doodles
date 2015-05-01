/// <reference path="lerp" />

class Color {
	private colors: number[];
	
	constructor(colors: number[]) {
		this.colors = colors;
	}
	
	blendWith(other: Color, amount: number): Color {
		var result = this.colors.map((val, i) => {
			return util.lerp(val, other.colors[i], amount);
		});
		return new Color(result);
	}
	
	lighten(amount: number): Color {
		amount = Math.abs(amount);
		return this.blendWith(new Color([255, 255, 255]), amount);
	}
	
	toString(): string {
		var colors = this.colors.map(c => Math.round(c)).join(',');
		return 'rgb(' + colors + ')';
	}
}