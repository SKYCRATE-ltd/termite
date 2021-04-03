import {
	Procedure, Any
} from "zed";

// A singleton. Creates a custom Type then returns that instance
// Instance returned is a function.
export default Procedure(
	'Program',
	{
		__: Any,
		init(cmds) {
			this.__ = cmds;
			return (...args) => {
				let out;
				if (typeof cmds === "function")
					out = cmds.apply(this, args);
				else {
					let cmd = args.shift();
					if (!cmd)
						out = this.pass("@default");
					else if (cmds[cmd]) {
						out = this.pass("@init", cmd, ...args) ||
								this.pass(cmd, ...args) ||
									this.pass("@exit", cmd, ...args);
					} else
						out = this.error(`command "${cmd}" not found.`);
				}
				this.render(out);
			}
		},
		render(msg) {
			console.log(msg);
			return msg;
		},
		error(msg) {
			return `💔 ERROR: ${msg}`;
		},
		next() {
			// TODO: Implement
		},
		pass(cmd, ...args) {
			return this.__[cmd] && this.__[cmd].apply(this, args)
		}
	},
);