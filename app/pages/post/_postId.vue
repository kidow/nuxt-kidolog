<template>
  <div>
    <vue-logo v-if="!$device.isMobile" style="padding-left: 1rem; font-size: 2rem" />
    <div class="content__container" :class="{ mobile: !$device.isMobile}">
      <div class="content-title">{{ post.title }}</div>
      <div class="content-buttons" v-if="isLoggedIn">
        <el-button @click="$router.push(`/editor/${post.id}`)">수정</el-button>
        <el-button @click="removePost">삭제</el-button>
      </div>
      <div class="content-date">{{ post.createdAt }}</div>
      <div class="content-body">
        <vue-marked :markdown="post.content" />
      </div>
      <div class="content-tags">
        <vue-tag v-for="(tag, index) in post.tags" :key="index" :tag="tag" />
      </div>
      <div class="comments">
        <h3 class="comment__count flex">
          {{ comments.length }}개의 댓글
          <vue-icons v-if="!isLoggedIn" />
        </h3>

        <el-input type="textarea" v-model="comment" :rows="3" :placeholder="placeholder" />
        <div class="flex" style="justify-content: flex-end; margin: 1rem 0">
          <el-button
            size="small"
            v-loading="loading.comment"
            type="primary"
            v-if="isLoggedIn"
            :disabled="!comment"
            @click="submitComment"
          >댓글 등록</el-button>
        </div>
        <vue-comment
          v-for="(comment, index) in comments"
          :key="comment.id"
          :index="index"
          :comment="comment"
          @replyMode="comment => replyMode(comment)"
          @addReply="addReply"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueLogo from '~/components/Logo'
import VueTag from '~/components/Tag'
import VueComment from '~/components/Comment'
import VueIcons from '~/components/Icons'
import VueMarked from '~/components/Marked'
import { mapGetters } from 'vuex'
export default {
  layout: 'post',
  components: {
    VueLogo,
    VueTag,
    VueComment,
    VueIcons,
    VueMarked
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
    post: {
      id: '1',
      title: 'Redux-saga에 앞서 Generator 이해하기',
      content:
        '개발밖에 할줄 모르는 저에게 고퀄리티의 디자인을 제공해주는 플랫폼이 참 필요했었는데, 이거 참 맘에 드는 서비스인 것 같습니다. ㅎㅎ 앞으로 블로그와 개인 프로젝트의 디자인은 이걸로 해결해 볼 생각입니다. 여러분도 써보면 좋겠군요.',
      createdAt: '2019년 9월 5일 오후 9:19',
      tags: ['redux-saga', 'generator']
    },
    comment: '',
    loading: {
      comment: false,
      post: false,
      edit: false
    },
    comments: [
      {
        id: '1',
        parentId: null,
        displayName: 'Kidow',
        thumbnail: 'https://picsum.photos/200',
        createdAt: Date.now(),
        content:
          '내가 달건이 생활을 17살에 시작했다. 내가 달건이 생활을 17살에 시작했다. 내가 달건이 생활을 17살에 시작했다. 내가 달건이 생활을 17살에 시작했다',
        isReply: false,
        isEdit: false,
        reply: '',
        userId: '3',
        loading: false
      },
      {
        id: '2',
        parentId: '1',
        displayName: 'Kidow',
        thumbnail: 'https://picsum.photos/200',
        createdAt: Date.now(),
        content: '내가 달건이 생활을 17살에 시작했다',
        isReply: false,
        isEdit: false,
        reply: '',
        userId: '4',
        loading: false
      }
    ]
  }),
  methods: {
    removePost() {
      const options = {
        url: `/prt/posts/${this.$route.params.postId}`,
        method: 'delete'
      }
      this.$confirm('정말 삭제하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      })
        .then(_ => this.$axios(options))
        .then(_ => {
          this.$message({
            message: '성공적으로 삭제되었습니다',
            type: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.notifyError(err.response.data.message)
        })
    },
    async submitComment() {
      this.loading.comment = true
      const options = {
        url: '/prt/comments',
        method: 'post',
        data: {
          postId: this.$route.params.postId,
          content: this.comment
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.loading.comment = false
        this.comment = ''
        this.$message({ message: '성공적으로 등록되었습니다', type: 'success' })
      } catch (err) {
        this.loading.comment = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    replyMode(comment) {
      comment.isReply = !comment.isReply
    },
    addReply() {}
  }
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