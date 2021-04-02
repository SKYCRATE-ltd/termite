import {
	Procedure
} from "zed";

export default Procedure(
'Cmd',
{
	pattern: RegExp,
	init(pattern, hook) {
		this.pattern = pattern;
		return (...args) => {
			// We invoke our hook! We pass
			// our arguments through any
			// middleware/plugins we might have.
			hook()
		}
	},
	test(string) {
		this.pattern.test(string);
	}
});