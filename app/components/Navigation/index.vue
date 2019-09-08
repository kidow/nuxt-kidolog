<template>
  <div class="navigation">
    <i class="fas fa-home" @click="$router.push('/')" :class="{ matched: $route.path === '/' }"></i>
    <i class="fas fa-search" @click="search"></i>
    <i
      class="fas fa-tags"
      @click="$router.push('/tag')"
      :class="{ matched: $route.path.indexOf('/tag') > -1 }"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'VueNavigation',
  methods: {
    search() {
      this.$prompt("맨 앞에 '#'를 붙이면 태그를 검색합니다. ", '검색', {
        confirmButtonText: '검색',
        cancelButtonText: '취소'
      })
        .then(({ value }) => this.$router.push(`/?search=${value}`))
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 3rem;
  border-top: 1px solid $oc-gray-3;
  i {
    font-size: 25px;
    color: $oc-gray-7;
    &.matched {
      color: $brand-color;
    }
    transition: 0.3s;
  }
}
</style>