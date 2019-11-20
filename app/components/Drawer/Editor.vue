<template>
  <el-drawer
    size="80%"
    title="에디터"
    direction="rtl"
    :visible.sync="open"
    :before-close="_ => $emit('drawer')"
  >
    <slot />
  </el-drawer>
</template>

<script>
export default {
  name: 'VueDrawerEditor',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>