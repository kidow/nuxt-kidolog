<template>
  <div class="main__container">
    <vue-search @search="val => search = val" />
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
    posts: [
      {
        uuid: '1',
        title: 'Redux-saga에 앞서 Generator 이해하기',
        markdown:
          '제너레이터 함수를 생성할 때는 function*으로 생성합니다. function* generator() { console.log(1) console.lo...',
        createdAt: '5일 전',
        thumbnail: 'https://picsum.photos/200/300'
      },
      {
        uuid: '2',
        title: 'Redux-saga에 앞서 Generator 이해하기',
        markdown:
          '제너레이터 함수를 생성할 때는 function*으로 생성합니다. function* generator() { console.log(1) console.lo...',
        createdAt: '5일 전',
        thumbnail: 'https://picsum.photos/200/300'
      },
      {
        uuid: '3',
        title: 'Redux-saga에 앞서 Generator 이해하기',
        markdown:
          '제너레이터 함수를 생성할 때는 function*으로 생성합니다. function* generator() { console.log(1) console.lo...',
        createdAt: '5일 전',
        thumbnail: 'https://picsum.photos/200/300'
      },
      {
        uuid: '4',
        title: 'Redux-saga에 앞서 Generator 이해하기',
        markdown:
          '제너레이터 함수를 생성할 때는 function*으로 생성합니다. function* generator() { console.log(1) console.lo...',
        createdAt: '5일 전',
        thumbnail: 'https://picsum.photos/200/300'
      }
    ],
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