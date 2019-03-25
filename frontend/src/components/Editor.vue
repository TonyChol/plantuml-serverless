<template>
  <div id="editor-container">
    <div class="left">
      <div id="editor">{{code}}</div>
      <button v-on:click="renderUMLSvg">render svg</button>
    </div>
    <div class="right">
      <img :src="svgUrl" alt="UML result">
    </div>
  </div>
</template>

<script>
import * as ace from "ace-builds";
import { compress, decompress } from "../helpers/compress";

const SERVICE_ENDPOINT = `https://0mmjil7108.execute-api.us-west-1.amazonaws.com/plantuml`;

const makeSVGUrl = compressedString => {
  return `${SERVICE_ENDPOINT}/svg/${compressedString}`;
};

export default {
  name: "Editor",
  props: ["code"],
  data() {
    return {
      svgUrl: ""
    };
  },
  methods: {
    renderUMLSvg() {
      const editor = ace.edit("editor");
      const uml = editor.getValue() || "Alice->Bob: hello";
      const encodedUML = compress(uml);
      this.svgUrl = makeSVGUrl(encodedUML);
    }
  },
  mounted() {
    this.renderUMLSvg();
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

#editor {
  display: block;
  width: 100%;
  height: 100%;
}
</style>