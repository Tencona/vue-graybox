<template>
	<div class="grayboxEntry">
		<template v-if="getEntryOverride('showCmdPrefix')">
			<div class="cmdPrefixStickyWrapper">
				<div class="cmdPrefix">
					<template v-if="getEntryOverride('showTime')">
						<div class="cmdPrefixTime">{{displayTime}}</div>
					</template>
					<template v-if="getEntryOverride('showGlobalPrefix')">
						<div class="cmdPrefixGlobal">{{getEntryOverride('globalPrefix')}}</div>
					</template>
					<template v-if="getEntryOverride('showScopedPrefix')">
						<div class="cmdPrefixScoped">{{getEntryOverride('scopedPrefix')}}</div>
					</template>
				</div>
			</div>
		</template>
		<div class="cmdText">
			<template v-if="getEntryOverride('showCmdInput')">
				<div class="cmdInput">{{entry.cmdInput}}</div>
			</template>
			<template v-if="getEntryOverride('showCmdOutput')">
				<div class="cmdOutput">{{entry.cmdOutput}}</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: "GrayboxEntry",
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
				.split(" ")[0]
		};
	},
	computed: {},
	methods: {
		getEntryOverride(prop) {
			if (this.entry[prop] !== undefined) return this.entry[prop];
			else if (this.config[prop] !== undefined) return this.config[prop];
			return undefined;
		}
	}
};
</script>

<style scoped>
.grayboxEntry {
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
.cmdText {
	border-left: 1px;
	border-left-color: rgb(100, 100, 100);
	border-left-style: solid;
	padding-left: 8px;
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
