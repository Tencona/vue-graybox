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
      <input type="text" class="inputLine" v-model="input" @keypress="onKeyPress">
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
      input: ""
    };
  },
  methods: {
    onKeyPress: function(event) {
      if (event.key === "Enter" && this.input) {
        this.entries.push({
          cmdInput: this.input,
          timeStamp: new Date().getTime()
        });
        this.input = "";
        Vue.nextTick(
          function() {
            this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight;
          }.bind(this)
        );

        if (this.onCommand) this.onCommand();
      }
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
  border: none;
  outline: none;
  flex: 1 0;
}
.terminalInput {
  display: flex;
}
.inputIndicator {
  font-size: 12px;
  margin-right: 8px;
}

/* Scrollbar Start */
.scroller {
  scroll-behavior: smooth;
  overflow-y: auto;
  max-height: 100px;
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