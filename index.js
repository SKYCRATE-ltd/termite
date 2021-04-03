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
					if (!cmd && cmds["@default"])
						out = cmds["@default"].call(this);
					else if (cmds[cmd]) {
						if (cmds["@init"])
							out = cmds["@init"].call(this, cmd, ...args);
						if (!out)
							out = cmds[cmd].apply(this, args);
						if (out && cmds["@exit"])
							cmds["@exit"].call(this, cmd, ...args);
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
			this.render(`💔 ERROR: ${msg}`);
		}
	},
);