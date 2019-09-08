<template>
  <el-drawer
    size="50%"
    title="Kidolog"
    direction="rtl"
    :visible.sync="drawer"
    :show-close="false"
    :before-close="_ => $emit('drawer')"
  >
    <div class="drawer__container">Kidolog</div>
  </el-drawer>
</template>

<script>
export default {
  name: 'VueDrawer',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  }
}
</script>