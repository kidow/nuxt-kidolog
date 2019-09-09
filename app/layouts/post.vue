<template>
  <div>
    <vue-header v-if="$device.isMobile" />
    <el-row class="post-container" :class="{ mobile: $device.isMobile }">
      <el-col :lg="5" :sm="3" :xs="1" style="min-height: 1px">
        <client-only v-if="$device.isMobile">
          <affix relative-element-selector="#content" :scrollAffix="true">
            <div style="position: relative; right: 28px">
              <div>
                <el-button
                  @click="share = !share"
                  :icon="share ? 'el-icon-close' : 'el-icon-share'"
                  circle
                />
              </div>
              <el-collapse-transition>
                <div v-show="share">
                  <div style="margin-top: 8px">
                    <el-button
                      icon="fab fa-facebook"
                      @click="shareFacebook"
                      style="color: #3b5998"
                      circle
                    />
                  </div>
                  <div style="margin-top: 8px">
                    <el-button
                      icon="fab fa-twitter"
                      @click="shareTwitter"
                      style="color: #00acee"
                      circle
                    />
                  </div>
                  <div style="margin-top: 8px">
                    <el-button icon="el-icon-link" @click="copyLink" circle />
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </affix>
        </client-only>
      </el-col>
      <el-col :lg="14" :sm="18" :xs="22" id="content">
        <nuxt />
      </el-col>
      <el-col :lg="5" :sm="3" :xs="1" />
    </el-row>
    <vue-navigation v-if="$device.isMobile" />
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
      this.$message({
        message: '성공적으로 복사되었습니다',
        showClose: true,
        type: 'success'
      })
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
    if (!this.$device.isMobile) window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    if (!this.$device.isMobile)
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

.vue-affix {
  display: flex;
  width: inherit;
  justify-content: flex-end;
  top: 155px !important;
}
</style>

<style lang="scss">
@import '~/assets/scss/color.scss';

.bar {
  background: $brand-color !important;
}
</style>