<template>
	<div class="graybox">
		<span class="title">{{ title }}</span>
		<div ref="scroller" class="scroller">
			<GrayboxEntry
				v-for="(entry) in entries"
				:key="entry.timeStamp"
				:entry="entry"
				:config="config"
			/>
		</div>
		<div class="grayboxInput">
			<span class="inputIndicator">></span>
			<input type="text" class="inputLine" v-model="cmdInput" @keyup="onKeyUp">
		</div>
	</div>
</template>

<script>
import GrayboxEntry from "../components/GrayboxEntry.vue";
import Vue from "vue";
import parsedInput from "../parsedInput";

export default {
	name: "Graybox",
	components: {
		GrayboxEntry
	},
	props: ["title", "onCommand", "configuration", "commands"],
	data: function() {
		return {
			entries: [],
			cmdInput: "",
			browsingPastCommands: false,
			browsingPastCommandsIndex: 0,
			config: {
				enableInternalCommands: true,

				showCmdPrefix: true,
				showTime: true,
				showGlobalPrefix: true,
				globalPrefix: "global",
				showScopedPrefix: true,
				scopedPrefix: "scope", //Prefix text written to the right of the global prefix
				showCmdInput: true,
				showCmdOutput: true
			}
		};
	},
	mounted() {
		//Overwrite valid configurations with user-given configurations
		let validKeys = Object.keys(this.config);
		Object.keys(this.configuration).forEach(c => {
			if (validKeys.includes(c)) this.config[c] = this.configuration[c];
		});
	},
	methods: {
		resetState: function() {
			this.browsingPastCommands = false;
			this.browsingPastCommandsIndex = this.entries.length - 1;
		},
		onKeyUp: function(event) {
			//Using onkeyup because onkeypress doesn't fire for arrow keys
			switch (event.key) {
				case "Enter":
					if (this.cmdInput) this.executeCommand();
					break;
				case "ArrowUp":
					if (!this.cmdInput && !this.browsingPastCommands)
						this.cmdInput = this.getPreviousCommand(true);
					else if (this.browsingPastCommands)
						this.cmdInput = this.getPreviousCommand();
					break;
				case "ArrowDown":
					if (this.browsingPastCommands)
						this.cmdInput = this.getNextCommand();
					break;
				default:
					this.resetState();
					break;
			}
		},
		getPreviousCommand: function(reset) {
			if (!this.entries.length) return "";
			this.browsingPastCommands = true;
			if (reset || this.browsingPastCommandsIndex - 1 <= -1)
				this.browsingPastCommandsIndex = this.entries.length - 1;
			else this.browsingPastCommandsIndex--;

			let cmdPrevious = this.entries[this.browsingPastCommandsIndex]
				.cmdInput;
			return cmdPrevious;
		},
		getNextCommand: function() {
			if (!this.entries.length) return "";
			this.browsingPastCommands = true;
			if (this.browsingPastCommandsIndex + 1 >= this.entries.length)
				this.browsingPastCommandsIndex = 0;
			else this.browsingPastCommandsIndex++;

			let cmdNext = this.entries[this.browsingPastCommandsIndex].cmdInput;
			return cmdNext;
		},
		executeCommand: function() {
			if (this.onCommand) {
				let now = new Date().getTime();
				this.writeLine(
					this.cmdInput,
					now,
					this.onCommand(new parsedInput(this.cmdInput))
				);
			}

			this.cmdInput = "";
			Vue.nextTick(
				function() {
					this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight;
				}.bind(this)
			);
		},
		writeLine: function(cmdInput, timeStamp, cmdOutput) {
			if (cmdOutput.timeStamp === undefined)
				cmdOutput.timeStamp = timeStamp;
			if (cmdOutput.cmdInput === undefined) cmdOutput.cmdInput = cmdInput;
			this.entries.push(cmdOutput);
		}
	}
};
</script>

<style scoped>
.graybox {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
		"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
	text-align: left;
	font-size: 10pt;
	color: rgb(245, 245, 245);
	background-color: rgb(33, 33, 44);
	border-radius: 8px;
	padding: 8px;
	word-wrap: break-word;
}
.inputLine {
	color: rgb(245, 245, 245);
	background-color: rgb(33, 33, 44);
	caret-color: rgb(245, 245, 245);
	border: none;
	outline: none;
	flex: 1 0;
}
.grayboxInput {
	display: flex;
	padding: 8px 0px 8px 0px;
}
.inputIndicator {
	font-size: 12px;
	margin-right: 8px;
}

/* Scrollbar Start */
.scroller {
	scroll-behavior: smooth;
	overflow-y: auto;
	max-height: 500px;
}
.scroller::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.scroller::-webkit-scrollbar-track {
	background: none;
	border-radius: 8px;
}
.scroller::-webkit-scrollbar-track:hover {
	background-color: rgb(44, 44, 55);
}
.scroller::-webkit-scrollbar-thumb {
	background: rgb(150, 150, 150);
	border-radius: 8px;
}
.scroller::-webkit-scrollbar-thumb:hover {
	background: rgb(245, 245, 245);
}
.scroller::-webkit-scrollbar-corner {
	display: none;
}
/* Scrollbar End */
</style>