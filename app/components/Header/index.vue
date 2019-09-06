<template>
  <header class="flex">
    <vue-logo />
    <div class="mobile" v-if="$device.isMobile">
      <i class="fas fa-bars" @click="drawer = true"></i>
      <el-drawer
        size="50%"
        title="Kidolog"
        direction="rtl"
        :visible.sync="drawer"
        :show-close="false"
        :before-close="_ => drawer = false"
      >
        <span>Kidolog</span>
      </el-drawer>
    </div>
    <div class="icons" v-else-if="!isLoggedIn">
      <i class="fab fa-facebook" @click="OAuthLogin('/auth/facebook')"></i>
      <i class="fab fa-google" @click="OAuthLogin('/auth/google')"></i>
      <i class="fab fa-twitter" @click="OAuthLogin('/auth/twitter')"></i>
      <i class="fab fa-github" @click="OAuthLogin('/auth/github')"></i>
    </div>
    <div class="icons" v-else>
      <i class="fas fa-code" @click="$router.push('/editor')"></i>
    </div>
  </header>
</template>

<script>
import VueLogo from '~/components/Logo'
import { mapGetters } from 'vuex'
export default {
  name: 'VueHeader',
  components: {
    VueLogo
  },
  data: _ => ({
    drawer: false
  }),
  methods: {
    OAuthLogin(url) {
      window.open(url, 'login', 'menubar=1, resizable=1, width=400, height=600')
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';
@import '~/assets/scss/media.scss';

header {
  height: 4rem;
  padding: 1rem 4rem calc(1rem + 4px);
  align-items: center;
  justify-content: space-between;
  background: white;
  border-style: solid;
  border-image: linear-gradient(to right, #fcc419, #fd7e14);
  border-image-width: 0 0 4px;
  border-image-slice: 1;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
  .mobile {
    font-size: 1.5rem;
  }
  .icons {
    font-size: 1.5rem;
    i {
      cursor: pointer;
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
  }
  @include media('<phone') {
    padding: 1rem 1rem calc(1rem + 4px);
  }
}

i {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>