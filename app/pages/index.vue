<template>
  <div class="main__container">
    <!-- <vue-search @searchChange="val => (search = val)" @search="onSearch" /> -->
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
    try {
      const docRef = await app.$db.collection('posts').get()
      const posts = []
      docRef.forEach(doc => {
        const data = doc.data()
        data.id = doc.id
        data.createdAt = data.createdAt.toDate()
        posts.push(data)
      })
      console.log('posts: ', posts)
      // const { data } = await app.$axios(options)
      // return { posts, nextPosts: data.nextPosts }
      return { posts }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async onSearch() {
      this.offset = 0
      // const options = {
      //   url: '/posts',
      //   method: 'get',
      //   params: {
      //     search: this.search,
      //     offset: this.offset
      //   }
      // }
      try {
        const { data } = await this.$axios(options)
        this.posts = data.posts
        this.nextPosts = data.nextPosts
      } catch (err) {
        console.log(err)
        this.notifyError()
      }
    },
    async getData() {
      // const options = {
      //   url: '/posts',
      //   method: 'get',
      //   params: {
      //     search: this.search,
      //     offset: this.offset
      //   }
      // }
      try {
        // const { data } = await this.$axios(options)
        // this.posts.push(...data.posts)
        // this.nextPosts = data.nextPosts
      } catch (err) {
        console.log(err)
        this.notifyError()
      }
    },
    onScroll: throttle(function() {
      const { scrollHeight, clientHeight } = document.documentElement
      const { pageYOffset } = window
      const isScroll = scrollHeight - clientHeight <= pageYOffset + 30
      if (isScroll && this.nextPosts.length) {
        this.offset += 15
        // this.getData()
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
