<template>
  <div id="editor-container">
    <div class="left">
      <div id="editor">{{code}}</div>
      <button v-on:click="renderUMLSvg(editor)">Render svg</button>
    </div>
    <div class="right">
      <div id="preview-section">
        <img :src="svgUrl" alt="UML result">
      </div>
    </div>
  </div>
</template>

<script>
import * as ace from "ace-builds";
import { compress } from "../helpers/compress";

const SERVICE_ENDPOINT = `https://0mmjil7108.execute-api.us-west-1.amazonaws.com/plantuml`;

const makeSVGUrl = compressedString => {
  return `${SERVICE_ENDPOINT}/svg/${compressedString}`;
};

export default {
  name: "Editor",
  props: ["code"],
  data() {
    return {
      svgUrl: "",
      editor: null
    };
  },
  methods: {
    renderEditor() {
      this.editor = ace.edit("editor");
      this.editor.setOptions({
        wrapBehavioursEnabled: true,
        wrap: true
      });
    },
    renderUMLSvg(editor) {
      const uml = (editor && editor.getValue()) || "Alice->Bob: hello";
      const encodedUML = compress(uml);
      this.svgUrl = makeSVGUrl(encodedUML);
    }
  },
  mounted() {
    this.renderEditor();
    this.renderUMLSvg(this.editor);
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

#preview-section {
  width: 100%;
  height: 100%;
  overflow-x: auto;
}

#editor {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #efefef;
}
</style>