<template>
  <el-dialog
    fullscreen
    :visible.sync="visible"
    :title="title"
    :before-close="_ => $emit('beforeClose')"
  >
    <slot />
  </el-dialog>
</template>

<script>
export default {
  name: 'VueDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/color.scss';

.el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid $oc-gray-2;
  }
  .el-dialog__body {
    height: calc(100vh - 55px);
    overflow: auto;
  }
}
</style>