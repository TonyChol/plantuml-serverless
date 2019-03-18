<template>
  <div id="container"></div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "Editor",
  mounted() {
    monaco.editor.create(document.getElementById("container"), {
      value: ["hello"].join("\n")
    });
  }
};
</script>

<style>
#container {
  width: 600px;
  height: 800px;
}
</style>