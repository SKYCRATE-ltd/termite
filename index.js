import {
	Procedure
} from "zed";

// A singleton. Creates a custom Type then returns that instance
// Instance returned is a function.
export default Procedure(
	'Program',
	{
		init(cmds) {
			return (...args) => {
				let out;
				if (typeof cmds === "function")
					out = cmds.apply(this, args);
				else {
					let cmd = args.shift();
					if (!cmd) {
						out = Object.values(cmds)[0].call(this);
					} else if (cmds[cmd]) {
						out = cmds[cmd].apply(this, args);
					} else
						this.error(`command "${cmd}" not found.`);
				}
				if (out)
					this.render(out);
			}
		},
		render(msg) {
			console.log(msg);
		},
		error(msg) {
			this.render(`🚨 ERROR: ${msg}`);
		}
	},
);