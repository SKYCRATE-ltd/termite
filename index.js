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
				if (args.length === 0)
					args = process.argv.slice(2);
				
				if (typeof cmds === "function")
					cmds(...args);
				else {
					let cmd = args.shift();
					if (cmd && cmds[cmd]) {
						const out = cmds[cmd].apply(this, args);
						console.log(out);
						if (out)
							this.render(out);
					} else
						this.error(`command "${cmd}" not found.`);
				}
			}
		},
		render(msg) {
			console.log(msg);
		},
		error(msg) {
			this.render(`ERROR: ${msg}`);
		}
	},
);