<template>
  <footer>
    <div style="margin: 1rem 0 0.5rem">
      <nuxt-link to="/privacy">개인정보처리방침</nuxt-link>
    </div>
    <div>Copyright (c) Kidolog.com, All rights reserved.</div>
  </footer>
</template>

<script>
export default {
  name: 'VueFooter'
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

footer {
  border-top: 1px solid $oc-gray-3;
  height: 6rem;
  background: white;
  text-align: center;
  color: $oc-gray-5;
  vertical-align: middle;
}

a {
  color: $oc-gray-5;
}
</style>