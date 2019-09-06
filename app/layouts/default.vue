<template>
  <div>
    <vue-header />
    <el-row style="padding: 3rem 0">
      <el-col :lg="3" :sm="2" :xs="1" style="min-height: 1px" />
      <el-col :lg="18" :sm="20" :xs="22">
        <nuxt />
      </el-col>
      <el-col :lg="3" :sm="2" :xs="1" />
    </el-row>
    <vue-footer />
    <el-backtop />
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
import VueFooter from '~/components/Footer'
export default {
  components: {
    VueHeader,
    VueFooter
  }
}
</script>