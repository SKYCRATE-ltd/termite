import Program from "./index.js";

// How should we handle exceptions? keywords are good.
Program({
	test(msg) {
		this.render(msg || 'Done.');
	}
})();