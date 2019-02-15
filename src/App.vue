<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
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
			//The function called to by `onCommand` should return information in this template:
			return {
				//Overrides - These can either be per entry, as done here, or placed in the data.config object to override the global configurations of the Terminal, to which things in here would override
				// showCmdPrefix: true,
				// showTime: true,
				// showGlobalPrefix: true,
				// globalPrefix: "",
				// showScopedPrefix: true,
				// scopedPrefix: "", //Prefix text written to the right of the global prefix
				// showCmdInput: true,
				// cmdInput: "", //Overrides the user's input
				// showCmdOutput: true,
				cmdOutput:
					"Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output Example output ", //The text to be written after the user's input

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
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
