module util {
	export function lerp(a: number, b: number, amount: number): number {
		return a * (1 - amount) + b * amount;
	}
}