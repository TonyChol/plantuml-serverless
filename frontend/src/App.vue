<template>
  <div id="app">
    <div id="left">
      <Editor/>
    </div>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  name: "app",
  components: {
    Editor
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

#left {
  width: 500px;
  height: 500px;
}
</style>
