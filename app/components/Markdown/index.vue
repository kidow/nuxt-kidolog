<template>
  <div class="markdown__container flex">
    <div class="markdown__code-editor flex" ref="editor" />
    <div class="markdown__tags flex">
      <div class="markdown__description">소개글</div>
      <input
        type="text"
        name="intro"
        autocomplete="off"
        autocapitalize="off"
        v-model="intro"
        placeholder="소개글을 입력하세요."
      />
    </div>
    <div class="markdown__tags flex">
      <div class="markdown__description">태그</div>
      <input
        type="text"
        name="tags"
        autocomplete="off"
        autocapitalize="off"
        v-model="tags"
        placeholder="태그로 입력하세요 (쉼표로 구분)"
      />
    </div>
  </div>
</template>

<script>
let CodeMirror
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('codemirror')
  require('codemirror/mode/markdown/markdown')
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/jsx/jsx')
  require('codemirror/mode/css/css')
  require('codemirror/mode/shell/shell')
  require('codemirror/mode/sass/sass')
  require('codemirror/mode/nginx/nginx')
  require('codemirror/mode/sql/sql')
}

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
export default {
  name: 'VueMarkdown',
  data: _ => ({
    cursor: null,
    codeMirror: null,
    tags: '',
    intro: ''
  }),
  mounted() {
    this.codeMirror = CodeMirror(this.$refs.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    })
    this.codeMirror.on('change', this.onChangeMarkdown)
    this.tags = this.tag
    this.intro = this.int
    if (this.markdown) this.setMarkdown(this.markdown)
  },
  methods: {
    onChangeMarkdown(doc) {
      this.cursor = doc.getCursor()
      this.$emit('markdown', doc.getValue())
    },
    setMarkdown(val) {
      const { codeMirror, cursor } = this
      if (!codeMirror) return
      codeMirror.setValue(val)
      if (!cursor) return
      codeMirror.setCursor(cursor)
    }
  },
  watch: {
    markdown(val) {
      this.setMarkdown(val)
    },
    tags(val) {
      this.$emit('tagChange', val)
    },
    intro(val) {
      this.$emit('introChange', val)
    }
  },
  props: {
    markdown: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    int: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/color.scss';

.markdown__container {
  flex: 1;
  flex-direction: column;
  .markdown__code-editor {
    flex: 1;
    background: $oc-gray-9;
    flex-direction: column;
    .cm-s-monokai {
      font-size: 1rem;
      flex: 1;
      font-family: 'D2 Coding';
    }
  }
  .markdown__tags {
    padding: 0 1rem;
    height: 2.7rem;
    background: $oc-gray-7;
    align-items: center;
    font-size: 0.85rem;
    .markdown__description {
      color: white;
      font-weight: bold;
      margin-right: 1rem;
    }
    input {
      font-size: 0.85rem;
      flex: 1;
      font-weight: 600;
      border: none;
      background: none;
      outline: none;
      color: $oc-gray-3;
    }
  }
}
</style>