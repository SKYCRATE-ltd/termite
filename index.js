import {
	Procedure, Any
} from "zed";
import {
	EOL
} from "os";

// A singleton. Creates a custom Type then returns that instance
// Instance returned is a function.
export default Procedure(
	'Program',
	{
		__: Any,
		init(cmds) {
			this.__ = cmds;
			return (...args) => {
				if (typeof cmds === "function")
					cmds.apply(this, args);
				else {
					let cmd = args.shift();
					if (!cmd)
						this.pass("@default");
					else if (cmds[cmd]) {
						this.pass("@init", cmd, ...args) ||
							this.pass(cmd, ...args) ||
								this.pass("@end", cmd, ...args);
					} else
						this.error(`command "${cmd}" not found.`);
				}
			}
		},
		print(msg) {
			process.stdout.write(msg);
			return msg;
		},
		println(msg, type = 'log') {
			// return this.print(msg + EOL, type);
			console[type](msg);
			return msg;
		},
		log(msg = 'log') {
			return this.println(` - ${msg}`);
		},
		info(msg = 'info') {
			return this.println(`🛈 ${msg}`);
		},
		warn(msg = ':S') {
			return this.println(`⚡ ${msg}`, 'warn');
		},
		error(msg = ':(') {
			return this.println(`💔 ERROR: ${msg}`, 'error');
		},
		done(msg = '') {
			return this.println(`✔ DONE ${msg}`);
		},
		debug(msg = 'here!') {
			return this.println(`🐛 ${msg}`, 'debug');
		},
		hr(char = '•', size = 40) {
			let msg = '';
			for (let i = 0; i < size; i++)
				msg += char;
			return this.println(msg);
		},
		header(title) {
			return this.hr() + this.println(`• ${title}`) + this.hr();
		},
		list(items) {
			return this.println(items.map(item => ` • ${item}`).join(EOL));
		},
		next() {
			// TODO: Implement
		},
		pass(cmd, ...args) {
			return this.__[cmd] && this.__[cmd].apply(this, args);
		},
		exit(code = 0) {
			process.exit(code);
		},
		// TODO: add some things for listening to stdout, stdin, etc...
		// that'll be cool!!!!
	},
);