<template>
  <div>
    <vue-header v-if="$device.isMobile" />
    <el-row class="post-container" :class="{ mobile: $device.isMobile }">
      <el-col :lg="5" :sm="3" :xs="1" style="min-height: 1px" />
      <el-col :lg="14" :sm="18" :xs="22">
        <nuxt />
      </el-col>
      <el-col :lg="5" :sm="3" :xs="1" />
    </el-row>
    <vue-navigation v-if="$device.isMobile" />
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
import VueNavigation from '~/components/Navigation'
export default {
  components: {
    VueHeader,
    VueNavigation
  }
}
</script>

<style lang="scss" scoped>
.post-container {
  padding: 2rem 0;
  &.mobile {
    padding: 6rem 0 2rem;
  }
}
</style>