<template>
  <div id="editor-container">
    <div class="left">
      <div id="navigation">
        <a href="/" class="navigation__logo">PlantUML Editor</a>
        <button
          v-on:click="renderUMLSvg(editor)"
          class="navigation__button"
          id="render_button"
        >Render</button>
        <button
          class="output__button"
          id="js-markdown__button"
          v-on:click="setupOutputMarkdownText()"
        >Markdown</button>
      </div>
      <div id="editor">{{code}}</div>
    </div>
    <div class="right">
      <div id="preview-section" v-lazyload class="image__wrapper">
        <ImageSpinner class="image__spinner"/>
        <img :data-url="svgUrl" alt="UML result" class="image__item">
      </div>
    </div>
  </div>
</template>

<script>
import * as ace from "ace-builds";
import ImageSpinner from "./ImageSpinner";
import { compress } from "../helpers/compress";
import { copyToClipboard } from "../helpers/clipboard";
import tippy from "tippy.js";
import { runningOS, OS } from "../helpers/os";

const SERVICE_ENDPOINT = `https://0mmjil7108.execute-api.us-west-1.amazonaws.com/plantuml`;

const currentOS = runningOS();
const submitKeybinding = currentOS === OS.MAC ? "Cmd+Enter" : "Ctrl+Enter";

const makeSVGUrl = compressedString => {
  return `${SERVICE_ENDPOINT}/svg/${compressedString}`;
};

const setUMLInUrlParams = encodedUML => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("uml", encodedUML);
  window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
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
      editor: null,
      markdownTooltip: null
    };
  },
  methods: {
    renderEditor() {
      this.editor = ace.edit("editor");
      this.editor.setOptions({
        wrapBehavioursEnabled: true,
        wrap: true
      });

      this.editor.commands.addCommand({
        name: "render from keyboard",
        bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },
        exec: editor => this.renderUMLSvg(editor),
        readOnly: false
      });
    },
    renderUMLSvg(editor) {
      const uml = (editor && editor.getValue()) || "Alice->Bob: hello";
      const encodedUML = compress(uml);
      this.svgUrl = makeSVGUrl(encodedUML);
      setUMLInUrlParams(encodedUML);
    },
    setupRenderButtonTooptip() {
      tippy("#render_button", {
        content: `Press ${submitKeybinding} to render`,
        arrow: true,
        arrowType: "round",
        theme: "google"
      });

      this.markdownTooltip = tippy("#js-markdown__button", {
        content: `Copied`,
        arrow: true,
        arrowType: "round",
        theme: "google",
        trigger: "manual"
      });
    },
    setupOutputMarkdownText() {
      this.renderUMLSvg(this.editor);
      const markdownStr = `![](${this.svgUrl})\n\n[edit](${
        window.location.href
      })`;
      copyToClipboard(markdownStr);
      this.showMarkdownTooltip(1000);
    },
    showMarkdownTooltip(durationInMs) {
      this.markdownTooltip && this.markdownTooltip[0].show(20);
      setTimeout(() => {
        this.markdownTooltip && this.markdownTooltip[0].hide();
      }, durationInMs);
    }
  },
  mounted() {
    this.renderEditor();
    this.renderUMLSvg(this.editor);
    this.setupRenderButtonTooptip();
  }
};
</script>

<style scoped lang="scss">
$navigation-height: 60px;
$editor-height: calc(100vh - 80px);
#navigation {
  width: 100%;
  height: $navigation-height;
  font-size: 2em;
  text-align: left;
  display: flex;
  align-items: center;
}

.navigation__logo {
  width: 80%;
  flex-grow: 1;
}

.output__button {
  font-size: 0.5em;
}

.navigation__button {
  font-size: 0.5em;
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
  height: $editor-height;
  border: 1px solid #efefef;
}

.image {
  &__wrapper {
    position: relative;

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
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
}
</style>