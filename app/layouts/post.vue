<template>
  <div>
    <vue-header v-if="$device.isMobile" />
    <el-row style="padding: 2rem 0">
      <el-col :lg="5" :sm="3" :xs="1" style="min-height: 1px" />
      <el-col :lg="14" :sm="18" :xs="22">
        <nuxt />
        <vue-navigation v-if="$device.isMobile" />
      </el-col>
      <el-col :lg="5" :sm="3" :xs="1" />
    </el-row>
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