module util {
	export function sample(arr: any[]): any {
		return arr[Math.floor(Math.random() * arr.length)];
	}
}