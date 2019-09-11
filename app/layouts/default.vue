<template>
  <div>
    <vue-header />
    <el-row style="padding: 3rem 0">
      <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
      <el-col :lg="18" :sm="20" :xs="24" class="main-column">
        <nuxt />
      </el-col>
      <el-col :lg="3" :sm="2" :xs="0" />
    </el-row>
    <vue-navigation v-if="$device.isMobile" />
    <vue-footer v-else />
    <el-backtop />
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
import VueFooter from '~/components/Footer'
import VueNavigation from '~/components/Navigation'
export default {
  components: {
    VueHeader,
    VueFooter,
    VueNavigation
  }
}
</script>

<style lang="scss" scoped>
.main-column {
  padding-top: calc(4rem + 4px);
}
</style>