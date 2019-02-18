export default class ParsedInput {
	constructor(cmdInput) {
		this.cmdInput = cmdInput;

		this.parse();
	}

	parse() {
		let str = this.cmdInput;

		//Get Command
		let split = str.split(' ');
		this.cmd = split[0];

		//Get Arguments
		let args = [];
		str = str.substring(str.indexOf(' '));
		split = str.split(' -').slice(1);
		split.forEach(s => {
			let q = s.split('"');
			q = q.map(x => x.trim());

			let arr = q[0].split(' ');
			arr = arr.concat(q.slice(1));
			arr = arr.filter(x => x);

			let argument = { name: arr.shift(), values: arr };
			args.push(argument);
		});

		this.args = args;
		return { cmd: this.cmd, args: this.args };
	}
}
