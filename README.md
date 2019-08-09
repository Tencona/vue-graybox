# vue-graybox

A basic terminal written in Vue.
![Graybox](https://i.imgur.com/4Mmmiwr.png)
## How to Install

```
npm install --save vue-graybox
```

## How to use

Bind Graybox.onCommand() to a function you want to be run when the user hits "Enter". The object returned is a `ParsedInput` that will have the command and arguments with their values. Using the up and down arrow keys cycle through past commands.

```html
<Graybox ref="graybox" title="Graybox" :onCommand="runCommand" :configuration="config" />
```

```javascript
import Graybox from 'vue-graybox/src/components/Graybox';

export default {
	name: 'app',
	components: {
		Graybox,
	},
	data() {
		return {
			config: {
				globalPrefix: "My App's Name",
			},
		};
	},
	methods: {
		runCommand: function(userInput) {
			return {
				cmdOutput: 'Example output.',
			};
		},
	},
};
```

### ParsedInput

The ParsedInput object parses out the first word as the command, then all arguments and values grouped as `-argument val1 val2`. It will always returns the raw text input as well.

```javascript
{
    args: [
        {
            name: 'date',
            values: ['2019/01/01', '2019/12/31']
        },
        {
            name: 'keywords',
            values: ['cat', 'dog', 'animal']
        },
        {
            name: 'contains',
            values: ['dog park']
        },
    ],
    cmd: 'search-logs',
    cmdInput: 'search-logs -date 2019/01/01 2019/12/31 -keywords cat dog animal -contains "dog park"'
}
```

### Global Configurations

Binding an object to the `configuration` property of the Graybox will set its global configuration. Global configurations are used as the default formatting for every Graybox entry and are overriden by the scoped configurations in the section below.
Available Configurations:

```javascript
config = {
	showCmdPrefix: true, //This is the grouping of text left of the output text
	showTime: true, //Show or hide the time
	timeStamp: undefined, //Actual time value
	showGlobalPrefix: true, //Show or hide the global prefix
	globalPrefix: '', //Global prefix text
	showScopedPrefix: true, //Show or hide the scoped prefix
	scopedPrefix: '', //Scoped prefix text
	showCmdInput: true, //Show or hide what the user wrote above cmdOutput text
};
```

### Scoped Configurations

The function that is called from `onCommand` should return an object for the Graybox to output to the line.
Every property is optional and will only affect the Graybox entry it is passed to.
Object Format:

```javascript
return {
	//Note: All properties from the Global Configurations are available here in addition to the following:
	cmdInput: '', //Overrides the user's input
	showCmdOutput: true, //Show or hide the cmdOuput
	cmdOutput: 'Example output.', //Main output to be written to the Graybox

	//Reporting - Currently nonfunctional but unharmful
	isError: false,
	errorMessage: 'Bad things!',
	isWarning: false,
	warningMessage: 'Kind of bad things!',
	isSuccess: true,
	successMessage: 'Good things!',
	isInformation: false,
	informationMessage: 'Things!',
};
```
