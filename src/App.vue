<template>
	<div id="app">
		<Graybox ref="graybox" title="Graybox v1.0" :onCommand="runCommand" :configuration="config"/>
	</div>
</template>

<script>
import Graybox from "./components/Graybox.vue";

export default {
	name: "app",
	components: {
		Graybox
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
			let output = "";
			return {
				//Overrides - These can either be per entry, as done here, or placed in the data.config object to override the global configurations of the Graybox, to which things in here would override
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
				userInput: userInput,
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

<style></style>
