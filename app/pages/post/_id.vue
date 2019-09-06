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
        <vue-tag v-for="(tag, index) in tags" :key="index" :tag="tag" />
      </div>
      <div class="comments">
        <h3 class="comment__count">{{ comments.length }}개의 댓글</h3>
        <el-input type="textarea" v-model="comment" :rows="3" :placeholder="placeholder" />
        <div class="flex" style="justify-content: flex-end; margin: 1rem 0">
          <el-button
            size="small"
            v-loading="loading.comment"
            type="primary"
            v-if="!isLoggedIn"
          >댓글 등록</el-button>
        </div>
        <vue-comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import VueLogo from '~/components/Logo'
import VueTag from '~/components/Tag'
import VueComment from '~/components/Comment'
import { mapGetters } from 'vuex'
export default {
  layout: 'post',
  components: {
    VueLogo,
    VueTag,
    VueComment
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    }),
    placeholder() {
      if (this.isLoggedIn) return '댓글을 달아보세요.'
      else return '로그인이 필요합니다.'
    }
  },
  data: _ => ({
    title: '',
    content: '',
    createdAt: '',
    tags: ['redux-saga', 'generator'],
    comment: '',
    loading: {
      comment: false,
      post: false,
      edit: false
    },
    comments: [
      {
        id: '1',
        displayName: 'Kidow',
        thumbnail: 'https://picsum.photos/200',
        createdAt: Date.now(),
        content:
          '내가 달건이 생활을 17살에 시작했다. 내가 달건이 생활을 17살에 시작했다. 내가 달건이 생활을 17살에 시작했다. 내가 달건이 생활을 17살에 시작했다'
      },
      {
        id: '2',
        displayName: 'Kidow',
        thumbnail: 'https://picsum.photos/200',
        createdAt: Date.now(),
        content: '내가 달건이 생활을 17살에 시작했다'
      }
    ]
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
    padding-bottom: 3rem;
    @include tablet;
  }
  .comments {
    padding-bottom: 15rem;
    .submit {
      float: right;
      margin-top: 1rem;
    }
  }
}
</style>