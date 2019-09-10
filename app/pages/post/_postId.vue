<template>
  <div>
    <vue-logo v-if="!$device.isMobile" style="padding-left: 1rem; font-size: 2rem" />
    <div class="content__container" :class="{ mobile: !$device.isMobile}">
      <div class="content-title">{{ post.title }}</div>
      <div class="content-buttons" v-if="isLoggedIn && user.status === 2">
        <el-button @click="$router.push(`/editor/${post.id}`)">수정</el-button>
        <el-button @click="removePost">삭제</el-button>
      </div>
      <div class="content-date">{{ $moment(post.createdAt).format('YYYY년 MM월 DD일 hh:mm:ss') }}</div>
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
          @removeComment="removeComment"
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
      isLoggedIn: 'auth/IS_LOGGED_IN',
      user: 'auth/GET_USER'
    }),
    placeholder() {
      if (this.isLoggedIn) return '댓글을 달아보세요.'
      else return '로그인이 필요합니다.'
    }
  },
  data: _ => ({
    post: {},
    comment: '',
    loading: {
      comment: false,
      post: false,
      edit: false
    },
    comments: []
  }),
  methods: {
    removePost() {
      const options = {
        url: `/prv/posts/${this.$sliceParams(this.$route.params.postId)}`,
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
            showClose: true,
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
          content: this.comment,
          userId: this.user.id
        }
      }
      try {
        const { data } = await this.$axios(options)
        this.comments.push(data)
        this.loading.comment = false
        this.comment = ''
        this.$message({
          message: '성공적으로 등록되었습니다',
          showClose: true,
          type: 'success'
        })
      } catch (err) {
        this.loading.comment = false
        console.log(err)
        this.notifyError(err.response.data.message)
      }
    },
    replyMode(comment) {
      comment.isReply = !comment.isReply
    },
    addReply(reply, index) {
      this.comments.splice(index + 1, 0, reply)
    },
    removeComment(index) {
      this.comments.splice(index, 1)
    }
  },
  async asyncData({ app, params }) {
    const sliceParams = paramsId =>
      paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
    const options = {
      url: `/posts/${sliceParams(params.postId)}`,
      method: 'get'
    }
    try {
      const { data } = await app.$axios(options)
      if (data.post.tags) data.post.tags = data.post.tags.split(', ')
      return { post: data.post, comments: data.comments }
    } catch (err) {
      console.log(err)
    }
  },
  head() {
    return {
      title: `${this.post.title} | Kidolog`,
      meta: [
        // Open Graph
        { hid: 'og-type', property: 'og:type', content: 'website' },
        {
          hid: 'og-site_name',
          property: 'og:site_name',
          content: 'Kidolog'
        },
        { hid: 'og-title', property: 'og:title', content: this.post.title },
        {
          hid: 'og-description',
          property: 'og-description',
          content: this.post.intro
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: this.post.thumbnail
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        },
        {
          hid: 'og-image-alt',
          property: 'og:image:alt',
          content: '###kidolog###'
        },
        // Twitter
        {
          hid: 'twitter-site',
          property: 'twitter:site',
          content: '@Kidolog'
        },
        {
          hid: 'twitter-card',
          property: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: 'Kidolog'
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: this.post.intro
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: this.post.thumbnail
        },
        {
          hid: 'twitter-domain',
          property: 'twitter:domain',
          content: process.env.BASE_URL + this.$route.path
        }
      ]
    }
  },
  validate({ params }) {
    const sliceParams = paramsId =>
      paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
    return /[0-9]/.test(sliceParams(params.postId))
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