import Program from "./index.js";

// How should we handle exceptions? keywords are good.
Program({
	test(msg) {
		return this.println(msg || 'Done.');
	}
})('test');