<template>
  <div class="search__container">
    <input
      type="text"
      v-model="search"
      autocomplete="off"
      autocapitalize="off"
      placeholder="'Enter' 키로 검색"
      @keyup.enter="$emit('search')"
    />
  </div>
</template>

<script>
export default {
  data: _ => ({
    search: ''
  }),
  name: 'VueSearch',
  watch: {
    search(val) {
      this.$emit('searchChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.search__container {
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  input {
    border: none;
    border-bottom: 1px solid $oc-gray-3;
    background: transparent;
    padding: 0.5rem;
    font-size: 1.2rem;
    color: $oc-gray-7;
    &::placeholder {
      color: $oc-gray-5;
    }
  }
}
</style>