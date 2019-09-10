<template>
  <header class="flex">
    <vue-logo />
    <div class="mobile" v-if="$device.isMobile">
      <i class="fas fa-bars" @click="drawer = true"></i>
      <vue-drawer :drawer="drawer" @drawer="drawer = false" />
    </div>
    <vue-icons v-else-if="!isLoggedIn" />
    <div class="icons" v-else>
      <i class="fas fa-code" v-if="user.status === 2" @click="$router.push('/editor')"></i>
      <i class="fas fa-sign-out-alt" @click="$store.dispatch('auth/LOGOUT')"></i>
    </div>
  </header>
</template>

<script>
import VueLogo from '~/components/Logo'
import VueIcons from '~/components/Icons'
import VueDrawer from '~/components/Drawer'
import { mapGetters } from 'vuex'
export default {
  name: 'VueHeader',
  components: {
    VueLogo,
    VueIcons,
    VueDrawer
  },
  data: _ => ({
    drawer: false
  }),
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
@import '~/assets/scss/media.scss';

header {
  height: 4rem;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
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
    i {
      color: $oc-gray-7;
    }
  }
  .icons {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    .fa-code {
      color: $brand-color;
      cursor: pointer;
      margin: 0 6px;
      &:hover {
        opacity: 0.8;
      }
    }
    .fa-sign-out-alt {
      color: $oc-gray-7;
      &:hover {
        color: $brand-color;
      }
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