<template>
  <el-card :body-style="{ padding: '0px' }">
    <img
      @click="$router.push(`/post/${post.id}`)"
      v-if="post.thumbnail"
      :src="post.thumbnail"
      alt="thumb"
    />
    <div class="no-image" @click="$router.push(`/post/${post.id}`)" v-else>이미지가 없습니다</div>
    <div class="card__body">
      <nuxt-link class="title" :to="`/post/${post.id}`">{{ post.title }}</nuxt-link>
      <div class="date">{{ $moment(post.createdAt).fromNow() }}</div>
    </div>
    <div class="card__desc">{{ post.content }}</div>
  </el-card>
</template>

<script>
export default {
  name: 'VueCard',
  props: {
    post: {
      type: Object,
      default: _ => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.el-card {
  width: 298px;
  margin: 0 1rem 1.5rem;
  img {
    width: 100%;
    cursor: pointer;
    height: 8.5rem;
    &:hover {
      opacity: 0.8;
    }
  }
  .no-image {
    height: 8.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: $oc-gray-0;
    color: $oc-gray-3;
    font-size: 1.2rem;
    &:hover {
      opacity: 0.8;
      transition: 0.3s;
    }
  }
  .card__body {
    padding: 1rem;
    .title {
      font-size: 1.4rem;
      font-weight: bold;
    }
    .date {
      margin-top: 0.5rem;
      color: $oc-gray-5;
      font-size: 0.9rem;
    }
  }
  .card__desc {
    padding: 1rem;
    padding-bottom: 1.2rem;
    border-top: 1px solid $oc-gray-2;
    height: 8.5rem;
  }
}
</style>