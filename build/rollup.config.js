import Vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
export default {
	input: 'src/wrapper.js', // Path relative to package.json
	output: {
		name: 'Graybox',
		exports: 'named',
	},
	plugins: [
		Vue({
			css: true, // Dynamically inject css as a <style> tag
			compileTemplate: true, // Explicitly convert template to render function
		}),
		buble(), // Transpile to ES5
	],
};
