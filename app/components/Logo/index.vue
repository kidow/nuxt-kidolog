<template>
  <nuxt-link to="/">Kidolog</nuxt-link>
</template>

<script>
export default {
  name: 'VueLogo'
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

a {
  color: $brand-color;
  font-weight: bold;
  font-size: 1.4rem;
}
</style>