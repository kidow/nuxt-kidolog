<template>
  <div class="preview__container">
    <h1 class="preview__title">{{ title }}</h1>
    <vue-marked :markdown="markdown" />
  </div>
</template>

<script>
import VueMarked from '~/components/Marked'
export default {
  name: 'VuePreview',
  components: {
    VueMarked
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    markdown: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.preview__container {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  font-size: 1.125em;
  .preview__title {
    font-size: 2.5rem;
    font-weight: bold;
    padding-bottom: 2rem;
    border-bottom: 1px solid $oc-gray-4;
  }
}
</style>