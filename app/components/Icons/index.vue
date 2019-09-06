<template>
  <div class="icons">
    <i class="fab fa-facebook" @click="OAuthLogin('/auth/facebook')"></i>
    <i class="fab fa-google" @click="OAuthLogin('/auth/google')"></i>
    <i class="fab fa-twitter" @click="OAuthLogin('/auth/twitter')"></i>
    <i class="fab fa-github" @click="OAuthLogin('/auth/github')"></i>
    <img src="~/assets/icons/kakao.png" alt="kakao" @click="OAuthLogin('/auth/kakao')" />
    <img src="~/assets/icons/naver.png" alt="naver" @click="OAuthLogin('/auth/naver')" />
  </div>
</template>

<script>
export default {
  name: 'VueIcons',
  methods: {
    OAuthLogin(url) {
      const { path } = this.$route
      window.open(
        url + `?redirect=${path}`,
        'login',
        'menubar=1, resizable=1, width=500, height=600'
      )
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