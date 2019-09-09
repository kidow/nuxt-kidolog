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
    search: '',
    nextPosts: []
  }),
  async asyncData({ app }) {
    const options = {
      url: '/posts',
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      return { posts: data.posts, nextPosts: data.nextPosts }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async onSearch() {
      this.offset = 0
      const options = {
        url: '/posts',
        method: 'get',
        params: {
          search: this.search,
          offset: this.offset
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.posts = data.posts
        this.nextPosts = data.nextPosts
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    async getData() {
      const options = {
        url: '/posts',
        method: 'get',
        params: {
          search: this.search,
          offset: this.offset
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.posts.push(...data.posts)
        this.nextPosts = data.nextPosts
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    onScroll: throttle(function() {
      const { scrollHeight, clientHeight } = document.documentElement
      const { pageYOffset } = window
      const isScroll = scrollHeight - clientHeight <= pageYOffset + 30
      if (isScroll && this.nextPosts.length) {
        this.offset += 6
        this.getData()
      }
    }, 200)
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
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