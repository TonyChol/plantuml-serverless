<template>
  <div id="editor-container">
    <div class="left">
        <div id="navigation">
          <a href="/" class="navigation__logo">PlantUML</a>
          <button v-on:click="renderUMLSvg(editor)" class="navigation__button">Render svg</button>
        </div>
      <div id="editor">{{code}}</div>
      
    </div>
    <div class="right">
      <div id="preview-section" v-lazyload class="image__wrapper">
      <ImageSpinner
        class="image__spinner"
      />
        <img :data-url="svgUrl" alt="UML result" class="image__item">
      </div>
    </div>
  </div>
</template>

<script>
import * as ace from "ace-builds";
import ImageSpinner from "./ImageSpinner";
import { compress } from "../helpers/compress";

const SERVICE_ENDPOINT = `https://0mmjil7108.execute-api.us-west-1.amazonaws.com/plantuml`;

const makeSVGUrl = compressedString => {
  return `${SERVICE_ENDPOINT}/svg/${compressedString}`;
};

export default {
  name: "Editor",
  props: ["code"],
  components: {
    ImageSpinner
  },
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

<style scoped lang="scss">
#navigation {
  width: 100%;
  height: 60px;
  font-size: 2em;
  text-align: left;
  display: flex;
  align-items: center;
}

.navigation__logo {
  width: 80%;
}

.navigation__button {
  width: 20%;
}


#editor-container {
  width: 100%;
  height: 100vh;
}

.left {
  display: block;
  float: left;
  width: 50%;
  height: 100vh;
}

.right {
  float: right;
  display: block;
  width: 50%;
  height: 100vh;
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

.image {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    &.loaded {
      .image {
        &__item {
          visibility: visible;
          opacity: 1;
          border: 0;
        }

        &__spinner {
          display: none;
          width: 100%;
        }
      }
    }
  }

  &__item {
    transition: all 0.4s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
}
</style>