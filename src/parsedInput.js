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
			let sp = s.split(' ');
			let argument = { name: sp.shift(), values: sp };
			args.push(argument);
		});

		this.args = args;
		return { cmd: this.cmd, args: this.args };
	}
}
