<template>
  <div>
    <vue-logo v-if="!$device.isMobile" style="padding-left: 1rem; font-size: 2rem" />
    <div class="content__container" :class="{ mobile: !$device.isMobile}">
      <div class="content-title">Redux-saga에 앞서 Generator 이해하기</div>
      <div class="content-buttons" v-if="isLoggedIn">
        <el-button>수정</el-button>
        <el-button>삭제</el-button>
      </div>
      <div class="content-date">2019년 9월 5일 오후 9:19</div>
      <div class="content-body">
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
      </div>
      <div class="content-tags">
        <vue-tag
          v-for="(tag, index) in tags"
          :key="index"
          @click="$router.push(`/tag/${tag}`)"
        >{{ tag }}</vue-tag>
      </div>
    </div>
  </div>
</template>

<script>
import VueLogo from '~/components/Logo'
import VueTag from '~/components/Tag'
import { mapGetters } from 'vuex'
export default {
  layout: 'post',
  components: {
    VueLogo,
    VueTag
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  },
  data: _ => ({
    title: '',
    content: '',
    createdAt: '',
    tags: ['redux-saga', 'generator']
  })
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/media.scss';
@import '~/assets/scss/color.scss';

@mixin tablet {
  @include media('<tablet') {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
}

.content__container {
  &.mobile {
    padding-top: 5rem;
  }
  .content-title {
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 3rem;
    word-break: keep-all;
    @include tablet;
  }
  .content-date {
    font-size: 1.1rem;
    padding: 1rem 0 2rem;
    color: $oc-gray-5;
    border-bottom: 1px solid $oc-gray-3;
    @include tablet;
  }
  .content-body {
    padding: 3rem 0 6rem;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.75;
    color: $oc-gray-7;
    @include media('<tablet') {
      padding-left: 0.8rem;
      padding-right: 0.8rem;
      font-size: 0.9rem;
    }
  }
  .content-tags {
    padding-bottom: 15rem;
    @include tablet;
  }
}
</style>