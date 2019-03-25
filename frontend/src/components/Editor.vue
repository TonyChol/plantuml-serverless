<template>
  <div id="editor-container">
    <div id="editor" class="left">{{code}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
import * as ace from "ace-builds";
import { compress, decompress } from "../helpers/compress";

export default {
  name: "Editor",
  props: ["code"],
  mounted() {
    const editor = ace.edit("editor");
    const uml = editor.getValue() || "Alice->Bob: hello";
    const encodedUML = compress(uml);
    console.log(`encoded uml = ${encodedUML}`);
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