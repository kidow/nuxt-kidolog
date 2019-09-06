<template>
  <div class="comment__container" :class="{ parent: comment.parentId }">
    <div class="comment__head flex">
      <img :src="comment.thumbnail" :alt="comment.displayName" />
      <div class="text">
        <span class="name">{{ comment.displayName }}</span>
        <div class="date">{{ $moment(comment.createdAt).fromNow() }}</div>
      </div>
    </div>
    <div class="comment__body">
      <el-input type="textarea" v-model="comment.content" v-if="comment.isEdit" :rows="3" />
      <template v-else>{{ comment.content }}</template>
    </div>
    <div class="reply__container">
      <span v-if="!comment.parentId" @click="$emit('replyMode', comment)">답글</span>
      <span @click="editComment">수정</span>
      <span>삭제</span>
    </div>
    <div class="reply__input" v-if="comment.isReply">
      <el-input
        type="textarea"
        :rows="3"
        style="margin-top: 8px"
        v-model="comment.reply"
        :disabled="!comment.reply"
        :placeholder="!isLoggedIn ? '로그인이 필요합니다' : ''"
      />
      <div class="reply__button">
        <el-button
          type="primary"
          v-if="isLoggedIn"
          v-loading="comment.loading"
          :disabled="!comment.reply"
          @click="submitReply"
          size="small"
        >답글 등록</el-button>
      </div>
    </div>
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
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    async submitReply() {
      this.comment.loading = true
      const options = {
        url: `/prt/comments`,
        method: 'post',
        data: {
          comment: this.comment.reply,
          parentId: this.comment.id
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.$emit('addReply', data)
        this.comment.loading = false
        this.$message({ message: '성공적으로 등록되었습니다', type: 'success' })
        this.comment.reply = ''
      } catch (err) {
        this.comment.loading = false
        console.log(err)
        this.comment.reply = ''
        this.notifyError(err.response.data.message)
      }
    },
    async editComment() {
      if (!this.comment.isEdit) return (this.comment.isEdit = true)
      const options = {
        url: `/prt/comments/${this.comment.id}`,
        method: 'put',
        data: {
          content: this.comment
        }
      }
      try {
        await this.$axios(options)
        this.comment.isEdit = false
        this.$message({ message: '성공적으로 수정되었습니다', type: 'success' })
      } catch (err) {
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    removeComment() {
      const options = {
        url: `/prt/comments/${this.comment.id}`,
        method: 'delete'
      }
      this.$confirm('정말 삭제하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      })
        .then(_ => this.$axios(options))
        .then(_ =>
          this.$message({
            message: '성공적으로 삭제되었습니다',
            type: 'success'
          }).catch(err => {
            console.log(err)
            this.notifyError(err.response.data.message)
          })
        )
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/color.scss';

.comment__container {
  padding: 1rem;
  border-bottom: 1px solid $oc-gray-3;
  &.parent {
    margin-left: 3rem;
  }
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
  .reply__container {
    color: $brand-color;
    padding-top: 0.875rem;
    span {
      cursor: pointer;
      margin-right: 1rem;
      &:hover {
        text-decoration: underline;
        opacity: 0.8;
      }
      &:active {
        opacity: 1.2;
      }
    }
  }
  .reply__input {
    .reply__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }
  }
}
</style>