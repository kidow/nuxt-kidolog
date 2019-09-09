<template>
  <el-drawer
    size="80%"
    title="Kidolog"
    direction="rtl"
    :visible.sync="drawer"
    :before-close="_ => $emit('drawer')"
  >
    <div class="auth__container">
      <template v-if="isLoggedIn">
        <div class="menu-title">내 계정</div>
        <ul class="menu-list">
          <li class="menu-item" @click="logout">로그아웃</li>
          <li class="menu-item" v-if="user.status === 2" @click="$router.push('/editor')">새 글</li>
        </ul>
      </template>
      <template v-else>
        <div class="menu-title">로그인</div>
        <ul class="menu-list">
          <li class="menu-item" @click="OAuthLogin('/auth/facebook')">페이스북</li>
          <li class="menu-item" @click="OAuthLogin('/auth/google')">구글</li>
          <li class="menu-item" @click="OAuthLogin('/auth/twitter')">트위터</li>
          <li class="menu-item" @click="OAuthLogin('/auth/github')">깃허브</li>
          <li class="menu-item" @click="OAuthLogin('/auth/kakao')">카카오</li>
          <li class="menu-item" @click="OAuthLogin('/auth/naver')">네이버</li>
        </ul>
      </template>
      <div class="menu-title">Kidolog</div>
      <ul class="menu-list">
        <li class="menu-item" @click="$router.push('/privacy')">개인정보처리방침</li>
      </ul>
    </div>
  </el-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VueDrawer',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    OAuthLogin(url) {
      const { path, query } = this.$route
      if (path !== '/' && !query.search && !query.offset)
        url += `?redirect=${path}`
      location.href = url
    },
    async logout() {
      try {
        await this.$store.dispatch('auth/LOGOUT')
        this.$message({
          message: '로그아웃 되었습니다',
          showClose: true,
          type: 'success'
        })
        this.$emit('drawer')
      } catch (err) {
        console.log(err)
        this.$message({
          message: err.response.data.message,
          showClose: true,
          type: 'error'
        })
      }
    }
  },
  watch: {
    '$route.path'() {
      this.$emit('drawer')
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      user: 'auth/GET_USER'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.auth__container {
  .menu-title {
    color: $oc-gray-5;
    font-size: 1.15rem;
    margin: 0 0 0.5rem;
    font-weight: bold;
  }
  .menu-list {
    padding-left: 32px;
    .menu-item {
      padding: 14px 0;
      font-size: 1.15rem;
      color: $oc-gray-8;
    }
  }
}
</style>