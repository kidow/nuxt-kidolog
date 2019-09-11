<template>
  <div class="icons">
    <el-tooltip effect="light" content="페이스북으로 로그인" placement="bottom">
      <i class="fab fa-facebook" @click="OAuthLogin('/auth/facebook')"></i>
    </el-tooltip>
    <el-tooltip effect="light" content="구글로 로그인" placement="bottom">
      <i class="fab fa-google" @click="OAuthLogin('/auth/google')"></i>
    </el-tooltip>
    <el-tooltip effect="light" content="트위터로 로그인" placement="bottom">
      <i class="fab fa-twitter" @click="OAuthLogin('/auth/twitter')"></i>
    </el-tooltip>
    <el-tooltip effect="light" content="깃허브로 로그인" placement="bottom">
      <i class="fab fa-github" @click="OAuthLogin('/auth/github')"></i>
    </el-tooltip>
    <el-tooltip effect="light" content="카카오로 로그인" placement="bottom">
      <img src="~/assets/icons/kakao.png" alt="kakao" @click="OAuthLogin('/auth/kakao')" />
    </el-tooltip>
    <el-tooltip effect="light" content="네이버로 로그인" placement="bottom">
      <img src="~/assets/icons/naver.png" alt="naver" @click="OAuthLogin('/auth/naver')" />
    </el-tooltip>
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
  i {
    cursor: pointer;
    margin-left: 6px;
    &:hover {
      opacity: 0.8;
    }
  }
  .fa-facebook {
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