<template>
  <div class="comment__container">
    <div class="comment__head flex">
      <img :src="comment.thumbnail" :alt="comment.displayName" />
      <div class="text">
        <span class="name">{{ comment.displayName }}</span>
        <div class="date">{{ $moment(comment.createdAt).fromNow() }}</div>
      </div>
    </div>
    <div class="comment__body">{{ comment.content }}</div>
    <div class="reply__button">답글</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VueComment',
  props: {
    comment: {
      type: Object,
      default: _ => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/color.scss';

.comment__container {
  padding: 1rem;
  border-bottom: 1px solid $oc-gray-3;
  .comment__head {
    margin-bottom: 1rem;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .text {
      margin-left: 0.5rem;
      .name {
        font-weight: bold;
        font-size: 1rem;
        color: $oc-gray-8;
      }
      .date {
        font-size: 0.875rem;
        margin-top: 0.125rem;
        color: $oc-gray-5;
      }
    }
  }
  .comment__body {
    font-size: 1rem;
    word-break: break-word;
    word-wrap: break-word;
    line-height: 1.5;
  }
  .reply__button {
    color: $brand-color;
    padding-top: 0.875rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
    &:active {
      opacity: 1.2;
    }
  }
}
</style>