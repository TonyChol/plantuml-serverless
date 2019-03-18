<template>
  <div id="editor">some text</div>
</template>

<script>
import * as ace from "ace-builds";

export default {
  name: "Editor",
  mounted() {
    ace.edit("editor");
  }
};
</script>

<style>
#editor {
  width: 100%;
  height: 100%;
}
</style>