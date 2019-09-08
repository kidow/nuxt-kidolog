<template>
  <div class="main__container">
    <vue-search @searchChange="val => search = val" @search="onSearch" />
    <div class="post-list">
      <vue-card v-for="post in posts" :key="post.uuid" :post="post" />
    </div>
  </div>
</template>

<script>
import VueSearch from '~/components/Search'
import VueCard from '~/components/Card'
import throttle from 'lodash.throttle'
export default {
  components: {
    VueSearch,
    VueCard
  },
  data: _ => ({
    posts: [],
    offset: 0,
    search: ''
  }),
  async asyncData({ app }) {
    const options = {
      url: '/posts',
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return {
        posts: data
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    onSearch(data) {
      this.posts = data
      this.offset = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.main__container {
  .post-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>