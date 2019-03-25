<template>
  <div id="app">
    <div id="navigation">
      <a href="/">PlantUML</a>
    </div>
    <Editor code="bob->Alice: hello"/>
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
  width: 95%;
  margin: auto;
}

a:visited {
  text-decoration: none;
  color: yellowgreen;
}
a {
  color: yellowgreen;
}

#navigation {
  width: 100%;
  height: 60px;
  font-size: 2em;
  text-align: left;
}
</style>
