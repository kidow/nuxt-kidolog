<template>
  <div class="icons">
    <el-tooltip effect="light" content="페이스북으로 로그인" placement="bottom">
      <i
        class="fab fa-facebook-square"
        @click="$store.dispatch('auth/FACEBOOK_LOGIN')"
      ></i>
    </el-tooltip>
    <el-tooltip effect="light" content="구글로 로그인" placement="bottom">
      <i
        class="fab fa-google"
        @click="$store.dispatch('auth/GOOGLE_LOGIN')"
      ></i>
    </el-tooltip>
    <el-tooltip effect="light" content="트위터로 로그인" placement="bottom">
      <i
        class="fab fa-twitter"
        @click="$store.dispatch('auth/TWITTER_LOGIN')"
      ></i>
    </el-tooltip>
    <el-tooltip effect="light" content="깃허브로 로그인" placement="bottom">
      <i
        class="fab fa-github"
        @click="$store.dispatch('auth/GITHUB_LOGIN')"
      ></i>
    </el-tooltip>
    <!-- <el-tooltip effect="light" content="카카오로 로그인" placement="bottom">
      <img
        src="~/assets/icons/kakao.png"
        alt="kakao"
        @click="OAuthLogin('/auth/kakao')"
      />
    </el-tooltip>
    <el-tooltip effect="light" content="네이버로 로그인" placement="bottom">
      <img
        src="~/assets/icons/naver.png"
        alt="naver"
        @click="OAuthLogin('/auth/naver')"
      />
    </el-tooltip> -->
  </div>
</template>

<script>
export default {
  name: 'VueIcons',
  methods: {
    OAuthLogin(url) {
      const { path, query } = this.$route
      location.href = `${url}?redirect=${path}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.icons {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  i,
  svg {
    cursor: pointer;
    margin-left: 6px;
    &:hover {
      opacity: 0.8;
    }
  }
  .fa-facebook-square {
    color: #3b5998;
  }
  .fa-google {
    color: #db4437;
  }
  .fa-twitter {
    color: #00acee;
  }
  .fa-code {
    color: $brand-color;
  }
  img {
    width: 24px;
    height: 24px;
    margin-left: 6px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
