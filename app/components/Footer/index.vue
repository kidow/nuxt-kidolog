<template>
  <footer class="flex">Copyright (c) Kidolog.com, All rights reserved.</footer>
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
  align-items: center;
  justify-content: center;
  color: $oc-gray-5;
}
</style>