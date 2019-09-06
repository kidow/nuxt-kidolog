<template>
  <div class="search__container">
    <input
      type="text"
      v-model="search"
      autocomplete="off"
      autocapitalize="off"
      placeholder="태그 검색은 '#' 붙이기"
      @keyup.enter="onSearch"
    />
  </div>
</template>

<script>
export default {
  data: _ => ({
    search: '',
    loading: false
  }),
  name: 'VueSearch',
  methods: {
    async onSearch() {
      this.loading = true
      const options = {
        url: '/posts/search',
        method: 'get',
        params: {
          search: this.search
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
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