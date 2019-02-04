<template>
  <div class="terminal">
    <span class="title">{{ title }}</span>
    <div ref="scroller" class="scroller">
      <TerminalEntry
        v-for="(entry) in entries"
        :key="entry.timeStamp"
        :cmdInput="entry.cmdInput"
        :timeStamp="entry.timeStamp"
      />
    </div>
    <div class="terminalInput">
      <span class="inputIndicator">></span>
      <input type="text" class="inputLine" v-model="input" @keyup="onKeyUp">
    </div>
  </div>
</template>

<script>
import TerminalEntry from "../components/TerminalEntry.vue";
import Vue from "vue";

export default {
  name: "Terminal",
  components: {
    TerminalEntry
  },
  props: ["title", "onCommand"],
  data: function() {
    return {
      entries: [],
      input: "",
      browsingPastCommands: false,
      browsingPastCommandsIndex: 0
    };
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
          if (this.input) this.executeCommand();
          break;
        case "ArrowUp":
          if (!this.input && !this.browsingPastCommands)
            this.input = this.getPreviousCommand(true);
          else if (this.browsingPastCommands)
            this.input = this.getPreviousCommand();
          break;
        case "ArrowDown":
          if (this.browsingPastCommands) this.input = this.getNextCommand();
          break;
        default:
          this.resetState();
          break;
      }
    },
    getPreviousCommand: function(reset) {
      if (!this.entries.length) return "";
      this.browsingPastCommands = true;
      if (reset || this.browsingPastCommandsIndex - 1 < -1)
        this.browsingPastCommandsIndex = this.entries.length - 1;

      let cmdInput = this.entries[this.browsingPastCommandsIndex].cmdInput;
      this.browsingPastCommandsIndex--;
      return cmdInput;
    },
    getNextCommand: function() {
      if (!this.entries.length) return "";
      this.browsingPastCommands = true;
      if (this.browsingPastCommandsIndex + 1 > this.entries.length)
        this.browsingPastCommandsIndex = 0;

      let cmdInput = this.entries[this.browsingPastCommandsIndex].cmdInput;
      this.browsingPastCommandsIndex++;
      return cmdInput;
    },
    executeCommand: function() {
      let userInput = this.input;
      this.input = "";
      // this.writeLine(userInput);
      Vue.nextTick(
        function() {
          this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight;
        }.bind(this)
      );

      if (this.onCommand) this.writeLine(this.onCommand(userInput));
    },
    writeLine: function(input) {
      if(!input) return;
      this.entries.push({
        cmdInput: input,
        timeStamp: new Date().getTime()
      });
    }
  }
};
</script>

<style scoped>
.terminal {
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
.terminalInput {
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
/* Scrollbar End */
</style>