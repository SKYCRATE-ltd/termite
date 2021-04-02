export default Procedure(
'Router',
{
	init(args, cmds) {
		// We have different kinds of arguments...
		// 
		this.args = process.argv.slice(2);
		// We gotta go through the cmds and hook them up, dawg.
		Object.prototype.map.call(cmds, () => {
			//
		});

		// We execute this with... what?
		// basically we send responses...
		// and we have our "request"... it's a lot
		// like a server actually.
		return (...args) => {

		};
	}
});