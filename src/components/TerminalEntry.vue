<template>
	<div class="terminalEntry">
		<div class="cmdPrefixStickyWrapper">
			<div class="cmdPrefix">
				<template v-if="showTime">
					<div class="cmdPrefixTime">{{displayTime}}</div>
				</template>
				<template v-if="showPrefixGlobal">
					<div class="cmdPrefixGlobal">{{config.globalPrefix}}</div>
				</template>

				<template v-if="showPrefixScoped">
					<div class="cmdPrefixScoped">{{entry.scopedPrefix}}</div>
				</template>
			</div>
		</div>
		<div class="cmdText">
			<div class="cmdInput">{{entry.cmdInput}}</div>
			<div class="cmdOutput">{{entry.cmdOutput}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TerminalEntry",
	props: {
		entry: Object,
		config: Object
	},
	mounted() {
		var s = "";
	},
	data: function() {
		return {
			displayTime: new Date(this.entry.timeStamp)
				.toTimeString()
				.split(" ")[0],
			// showTime: this.config.showTime,
			testString: "prefixTest"
		};
	},
	methods: {
		showTime() {
			return this.config.showTime;
		},
		showPrefixGlobal() {
			return this.config.globalPrefix;
		},
		showPrefixScoped() {
			return this.entry.scopedPrefix;
		}
	}
};
</script>

<style scoped>
.terminalEntry {
	display: flex;
	margin-top: 12px;
}
.inputstuff {
	display: flex;
	flex-direction: column;
}
.cmdPrefix {
	display: flex;
	margin-right: 8px;
	position: sticky;
	top: 0px;
	white-space: nowrap;
	color: rgb(150, 150, 150);
}
.cmdPrefixTime {
	padding-right: 8px;
}
.cmdPrefixGlobal {
	padding-right: 8px;
}
.cmdPrefixScoped {
	padding-right: 8px;
}
.cmdInput {
	color: rgb(150, 150, 150);
}
.cmdOutput {
	margin-top: auto;
	word-wrap: break-word;
	padding-top: 4px;
}
</style>
