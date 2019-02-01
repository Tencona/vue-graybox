<template>
    <div><span class="cmdPrefix">{{displayTime}}</span>{{cmdInput}}
    </div>
</template>

<script>
export default {
  name: "TerminalEntry",
  props: ['cmdInput','timeStamp'],
  data: function() {
    return {
      displayTime: new Date(this.timeStamp).toTimeString().split(' ')[0]
    }
  },
  methods: {}
};
</script>

<style scoped>
.cmdPrefix {
  color: rgb(150, 150, 150);
  margin-right: 8px;
}
</style>
