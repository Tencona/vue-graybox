<template>
	<div id="app">
		<Terminal ref="terminal" title="Terminal v1.0" :onCommand="runCommand" :configuration="config"/>
	</div>
</template>

<script>
import Terminal from "./components/Terminal.vue";

export default {
	name: "app",
	components: {
		Terminal
	},
	data() {
		return {
			config: {
				// globalPrefix: "Test"
			}
		};
	},
	methods: {
		runCommand: function(userInput) {
			//The function called to by `onCommand` should return information in this template but nothing is required:
			let output =
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec nulla tempus, feugiat tellus eu, sollicitudin mi. Donec lacinia congue suscipit. Aliquam lobortis vel tortor ut egestas. Pellentesque ac tristique ligula. Suspendisse malesuada convallis dictum. Donec ornare diam a hendrerit finibus. In nec nunc eleifend, fringilla ex vitae, faucibus nunc. Quisque luctus pharetra interdum. Donec tortor leo, elementum ut massa quis, cursus tristique metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed at augue eget augue iaculis dapibus eleifend eget ex.";
			output = output.substr(
				0,
				Math.floor((Math.random() * output.length) / 8)
			);

			return {
				//Overrides - These can either be per entry, as done here, or placed in the data.config object to override the global configurations of the Terminal, to which things in here would override
				// showCmdPrefix: true,
				// showTime: true,
				// timeStamp: undefined,
				// showGlobalPrefix: true,
				// globalPrefix: "",
				// showScopedPrefix: true,
				// scopedPrefix: "", //Prefix text written to the right of the global prefix
				// showCmdInput: true,
				// cmdInput: "", //Overrides the user's input
				// showCmdOutput: true,
				cmdOutput: output, //The text to be written after the user's input

				//Reporting
				isError: false,
				errorMessage: "Bad things!",
				isWarning: false,
				warningMessage: "Kind of bad things!",
				isSuccess: true,
				successMessage: "Good things!",
				isInformation: false,
				informationMessage: "Things!"
			};
		}
	}
};
</script>

<style>
</style>
