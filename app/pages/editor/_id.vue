<template>
  <div class="editor-template">
    <div class="editor__header flex">
      <div class="header__left flex">
        <i class="el-icon-back" @click="$router.back()"></i>
      </div>
      <div class="header__input">
        <input type="text" v-model="title" placeholder="제목을 입력해주세요." />
      </div>
      <div class="header__right flex">
        <el-upload
          :on-success="imageUpload"
          :before-upload="beforeUpload"
          action="/prv/posts/image"
          accept="image/*"
          name="image"
          :with-credentials="true"
          :show-file-list="false"
        >
          <el-button plain icon="el-icon-upload2">썸네일</el-button>
        </el-upload>
        <div style="width: 0.5rem" />
        <el-upload
          :on-success="thumbnailUpload"
          :before-upload="beforeUpload"
          action="/prv/posts/thumbnail"
          accept="image/*"
          name="thumb"
          :with-credentials="true"
          :show-file-list="false"
        >
          <el-button plain icon="el-icon-picture">업로드</el-button>
        </el-upload>
        <div style="width: 0.5rem" />
        <el-button
          @click="onSubmit"
          v-loading="loading"
          class="submit"
          type="primary"
          plain
        >{{ submitText }}</el-button>
      </div>
    </div>
    <div class="editor__content flex">
      <div class="content__flex flex display" :style="{ flex: leftPercentage }">
        <vue-markdown
          @tagChange="tag => tags = tag"
          :tag="tags"
          :markdown="markdown"
          @markdown="md => markdown = md"
        />
      </div>
      <div class="content__flex flex none" :style="{ flex: 1 - leftPercentage}">
        <vue-preview :title="title" :markdown="markdown" />
      </div>
      <div
        class="content__separator"
        @mousedown="onSeparatorMouseDown"
        :style="{ left: `${leftPercentage * 100}%` }"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdown from '~/components/Markdown'
import VuePreview from '~/components/Preview'
import { mapGetters } from 'vuex'
export default {
  layout: 'editor',
  data: _ => ({
    title: '',
    leftPercentage: 0.5,
    markdown: '',
    tags: '',
    thumbnail: '',
    loading: false
  }),
  methods: {
    onSeparatorMouseDown() {
      document.body.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove(e) {
      this.leftPercentage = e.clientX / window.innerWidth
    },
    onMouseUp() {
      document.body.removeEventListener('mousemove', this.onMouseMove)
      window.removeEventListener('mouseup', this.onMouseUp)
    },
    imageUpload({ image }) {
      if (!image)
        return this.notifyError(
          '죄송합니다. 현재 파일을 업로드할 수 없습니다. 나중에 다시 시도해주세요.'
        )
      this.markdown += image
    },
    thumbnailUpload({ thumbnail }) {
      if (!thumbnail)
        return this.notifyError(
          '죄송합니다. 현재 파일을 업로드할 수 없습니다. 나중에 다시 시도해주세요.'
        )
      this.thumbnail = thumbnail
    },
    beforeUpload(file) {
      const isOver3M = file.size / 1024 / 1024 / 1024 > 3

      if (isOver3M) {
        this.notifyError('이미지의 용량이 3MB를 초과합니다.')
        return false
      }

      return true
    },
    async onSubmit() {
      if (!this.title || !this.markdown) return
      const { params } = this.$route
      this.loading = true
      const data = {
        title: this.title,
        content: this.markdown,
        thumbnail: this.thumbnail,
        tags: this.tags
      }
      let url
      let method
      if (params.id) {
        url = `/prv/ports/${params.id}`
        method = 'put'
      } else {
        url = '/prv/posts'
        method = 'post'
      }
      const options = { data, url, method }
      try {
        const { data } = await this.$axios(options)
        this.$router.push(`/post/${data.postId}`)
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError(err.response.data.message)
      }
    }
  },
  components: {
    VueMarkdown,
    VuePreview
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    }),
    submitText() {
      return this.$route.params.id ? '수정하기' : '작성하기'
    }
  },
  middleware: 'isLoggedIn',
  async asyncData({ params, app, store, redirect }) {
    if (!params.id) return
    const user = store.getters['auth/GET_USER']
    if (user.status !== 2) return redirect('/')
    const options = {
      url: `/posts/${params.id}`,
      method: 'get'
    }
    try {
      const {
        data: { post }
      } = await app.$axios(options)
      if (!post.title) return redirect('/')
      return {
        title: post.title,
        markdown: post.content,
        tags: post.tags,
        thumbnail: post.thumbnail
      }
    } catch (err) {
      console.log(err)
    }
  },
  head() {
    return {
      title: '에디터 | Kidolog'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';
@import '~/assets/scss/media.scss';

.editor-template {
  .editor__header {
    height: 4rem;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    background: $oc-gray-8;
    color: #fff;
    .header__left {
      display: flex;
      i {
        font-size: 35px;
        cursor: pointer;
      }
    }
    .header__input {
      flex: 1;
      margin-left: 1rem;
      input {
        width: 100%;
        color: #fff;
        font-size: 1.25rem;
        background: none;
        border: none;
        outline: none;
        &::placeholder {
          color: $oc-gray-3;
        }
      }
    }
    .header__right {
      button {
        background: transparent;
        color: $oc-gray-3;
        font-size: 16px;
        &.submit {
          color: $brand-color;
        }
      }
    }
  }
  .editor__content {
    height: calc(100vh - 4rem);
    position: relative;
    .content__flex {
      min-width: 0;
      overflow: auto;
      &.display {
        @include media('<phone') {
          flex: 1 !important;
        }
      }
      &.none {
        @include media('<phone') {
          display: none !important;
        }
      }
    }
    .content__separator {
      width: 1rem;
      height: 100%;
      position: absolute;
      transform: translate(-50%);
      cursor: col-resize;
    }
  }
}
</style>