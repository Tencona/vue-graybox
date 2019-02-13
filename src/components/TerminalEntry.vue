<template>
	<div class="terminalEntry">
		<div class="cmdPrefix">
			<div class="cmdPrefixTime">{{displayTime}}</div>
			<!-- <div class="cmdPrefixCmdInput">[{{cmdInput}}]</div> -->
		</div>
		<div class="cmdOutput">{{cmdOutput}}</div>
	</div>
</template>

<script>
export default {
	name: "TerminalEntry",
	props: ["timeStamp", "cmdInput", "cmdOutput"],
	data: function() {
		return {
			displayTime: new Date(this.timeStamp).toTimeString().split(" ")[0]
		};
	},
	methods: {}
};
</script>

<style scoped>
.terminalEntry {
	display: flex;
}
.cmdPrefix {
	display: flex;
	margin-right: 8px;
}
.cmdPrefixTime {
	color: rgb(150, 150, 150);
}
.cmdPrefixCmdInput {
	color: rgb(110, 110, 110);
}
.cmdOutput {
	margin-top: auto;
}
</style>
