# vue-terminal

A basic terminal written in Vue.

## How to use

Bind Terminal.onCommand() to a function you want to be run when the user hits "Enter". The object returned is a `ParsedInput` that will have the command and arguments with their values.

```html
<Terminal ref="terminal" title="Terminal" :onCommand="runCommand" :configuration="config" />
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

Binding an object to the `configuration` property of the Terminal will set its global configuration. Global configurations are used as the default formatting for every Terminal entry and are overriden by the scoped configurations in the section below.
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

The function that is called from `onCommand` should return an object for the Terminal to output to the line.
Object Format:

```javascript
return {
	//Note: All properties from the Global Configurations are available here in addition to the following:
	cmdInput: '', //Overrides the user's input
	showCmdOutput: true, //Show or hide the cmdOuput
	cmdOutput: 'Example output.', //Main output to be written to the Terminal

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

Every property above is optional and will only affect the Terminal entry it is passed to.
