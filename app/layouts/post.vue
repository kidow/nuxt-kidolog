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
    <transition-group name="el-fade-in" v-if="share">
      <el-backtop @click="shareFacebook" :bottom="280" :visibility-height="0" :key="1">
        <i class="fab fa-facebook"></i>
      </el-backtop>
      <el-backtop @click="shareTwitter" :bottom="220" :visibility-height="0" :key="2">
        <i class="fab fa-twitter"></i>
      </el-backtop>
      <el-backtop @click="copyLink" :bottom="160" :visibility-height="0" :key="3">
        <i class="fas fa-link"></i>
      </el-backtop>
    </transition-group>
    <el-backtop @click="share = !share" :bottom="100" :visibility-height="0">
      <i class="el-icon-share"></i>
    </el-backtop>
    <el-backtop />
  </div>
</template>

<script>
let nanobar
import VueHeader from '~/components/Header'
import VueNavigation from '~/components/Navigation'
import Nanobar from 'nanobar'
import throttle from 'lodash.throttle'
export default {
  components: {
    VueHeader,
    VueNavigation
  },
  methods: {
    shareFacebook() {
      const { BASE_URL } = process.env
      const { path } = this.$route
      const url = `http://www.facebook.com/sharer/sharer.php?u=${BASE_URL}${path}`
      this.share = false
      this.$shareSns(url)
    },
    shareTwitter() {
      const { BASE_URL } = process.env
      const { path } = this.$route
      const url = `https://twitter.com/intent/tweet?text=TEXT&url=${BASE_URL}${path}`
      this.share = false
      this.$shareSns(url)
    },
    copyLink() {
      this.$copyText(`${process.env.BASE_URL}${this.$route.path}`)
      this.$message({ message: '성공적으로 복사되었습니다', type: 'success' })
      this.share = false
    },
    setNanobar() {
      if (this.$device.isMobile) return
      nanobar = new Nanobar()
    },
    onScroll: throttle(function() {
      const { scrollHeight, clientHeight } = document.documentElement
      const { innerWidth, pageYOffset } = window
      this.percent = (pageYOffset * 100) / (scrollHeight - clientHeight)
      nanobar.go(this.percent)
    }, 100)
  },
  data: _ => ({
    share: false,
    percent: 0
  }),
  mounted() {
    this.setNanobar()
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.post-container {
  padding: 2rem 0;
  &.mobile {
    padding: 6rem 0 2rem;
  }
}
.el-icon-share,
.fa-link {
  color: $oc-gray-7;
}
.fa-facebook {
  color: #3b5998;
}
.fa-twitter {
  color: #00acee;
}
</style>

<style lang="scss">
@import '~/assets/scss/color.scss';

.bar {
  background: $brand-color !important;
}
</style>