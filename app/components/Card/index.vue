<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }">
    <el-image
      @click="$router.push(postUrl)"
      v-if="post.thumbnail"
      :src="post.thumbnail"
      fit="cover"
      style="height: 8.5rem"
    />
    <div class="no-image" @click="$router.push(postUrl)" v-else>이미지가 없습니다</div>
    <div class="card__body">
      <nuxt-link class="title" :to="postUrl">{{ post.title }}</nuxt-link>
      <div class="date">{{ $moment(post.createdAt).add(9, 'hour').fromNow() }}</div>
    </div>
    <div class="card__desc">{{ post.intro }}</div>
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
  },
  computed: {
    postUrl() {
      return `/post/${this.$titleUrl(this.post.title, this.post.id)}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.el-card {
  width: 298px;
  margin: 0 1rem 1.5rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  .el-image {
    cursor: pointer;
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