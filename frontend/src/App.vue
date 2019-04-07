<template>
  <div id="app">
    <Editor v-bind:code="initialUML()"/>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
import { decompress } from "./helpers/compress";

export default {
  name: "app",
  components: {
    Editor
  },
  methods: {
    initialUML: function() {
      const urlParams = new URLSearchParams(window.location.search);
      const encodedUML = urlParams.get("uml");
      const decodedUML = encodedUML && decompress(encodedUML);
      return decodedUML || "bob->Alice: hello";
    }
  }
};
</script>

<style>
body {
  max-width: none;
}
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
</style>
