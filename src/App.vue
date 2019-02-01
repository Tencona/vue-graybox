<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Terminal title="Terminal v1.0" :onCommand="runCommand" />
  </div>
</template>

<script>
import Terminal from "./components/Terminal.vue";

export default {
  name: "app",
  components: {
    Terminal,
  },
  methods: {
    runCommand: function() {
      console.log("success!");
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
