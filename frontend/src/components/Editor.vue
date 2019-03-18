<template>
  <div id="editor-container">
    <div id="editor" class="left">{{code}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
import * as ace from "ace-builds";

export default {
  name: "Editor",
  props: ["code"],
  mounted() {
    ace.edit("editor");
  }
};
</script>

<style>
#editor-container {
  width: 100%;
  height: 500px;
}

.left {
  display: block;
  float: left;
  width: 50%;
  height: 100%;
}

.right {
  float: right;
  display: block;
  width: 50%;
  height: 100%;
}
</style>