<template>
  <div class="editor-template">
    <div class="editor__header flex">
      <div class="header__left flex">
        <i class="el-icon-back" @click="$router.back()"></i>
      </div>
      <div class="header__input">
        <input
          type="text"
          autofocus
          autocomplete="off"
          autocapitalize="off"
          v-model="title"
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div class="header__right flex">
        <template v-if="$device.isMobile">
          <i class="fas fa-bars" @click="open = true"></i>
          <vue-drawer-editor :open="open" @drawer="open = false" :submitText="submitText">
            <div class="editor__drawer">
              <div class="menu-title">썸네일</div>
              <ul class="menu-list">
                <li class="menu-item" v-if="thumbnail" style="width: 100%">
                  <img :src="thumbnail" alt="thumbnail" style="height: 40px; width: 100%" />
                </li>
              </ul>
              <div class="menu-title">작업</div>
              <ul class="menu-list">
                <el-upload
                  :on-success="thumbnailUpload"
                  :before-upload="beforeUpload"
                  action="/prv/posts/thumbnail"
                  accept="image/*"
                  name="thumb"
                  :with-credentials="true"
                  :show-file-list="false"
                  :on-error="uploadError"
                >
                  <li class="menu-item" @click="$emit('thumbnail')">썸네일</li>
                </el-upload>
                <el-upload
                  :on-success="imageUpload"
                  :before-upload="beforeUpload"
                  action="/prv/posts/image"
                  accept="image/*"
                  name="image"
                  :with-credentials="true"
                  :show-file-list="false"
                  :on-error="uploadError"
                >
                  <li class="menu-item" @click="$emit('upload')">업로드</li>
                </el-upload>

                <li class="menu-item" @click="onSubmit" style="color: #e8590c">{{ submitText }}</li>
              </ul>
              <div class="menu-title">창</div>
              <ul class="menu-list">
                <li class="menu-item" @click="openPreview">미리보기</li>
              </ul>
              <div class="menu-title">확장자</div>
              <ul class="menu-list">
                <el-tag
                  type="info"
                  v-for="(extension,i ) in  extensions"
                  :key="i"
                  style="margin: 0 4px 4px"
                >{{ extension }}</el-tag>
              </ul>
            </div>
          </vue-drawer-editor>
        </template>
        <template v-else>
          <el-upload
            :on-success="thumbnailUpload"
            :before-upload="beforeUpload"
            action="/prv/posts/thumbnail"
            accept="image/*"
            name="thumb"
            :with-credentials="true"
            :show-file-list="false"
            :on-error="uploadError"
          >
            <el-button plain icon="el-icon-upload2">썸네일</el-button>
          </el-upload>
          <div style="width: 0.5rem" />
          <el-upload
            :on-success="imageUpload"
            :before-upload="beforeUpload"
            action="/prv/posts/image"
            accept="image/*"
            name="image"
            :with-credentials="true"
            :show-file-list="false"
            :on-error="uploadError"
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
        </template>
      </div>
    </div>
    <div class="editor__content flex">
      <div class="content__flex flex display" :style="{ flex: leftPercentage }">
        <vue-markdown
          @tagChange="tag => tags = tag"
          :tag="tags"
          :int="intro"
          :markdown="markdown"
          @markdown="md => markdown = md"
          @introChange="int => intro = int"
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
    <transition name="el-zoom-in-bottom">
      <vue-dialog v-show="visible" :visible="visible" @beforeClose="visible = false" :title="title">
        <vue-marked :markdown="markdown" />
      </vue-dialog>
    </transition>
  </div>
</template>

<script>
import VueMarkdown from '~/components/Markdown'
import VueDrawerEditor from '~/components/Drawer/Editor'
import VuePreview from '~/components/Preview'
import VueDialog from '~/components/Dialog'
import VueMarked from '~/components/Marked'
import { mapGetters } from 'vuex'
export default {
  layout: 'editor',
  data: _ => ({
    title: '',
    leftPercentage: 0.5,
    markdown: '',
    tags: '',
    thumbnail: '',
    intro: '',
    loading: false,
    open: false,
    visible: false
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
      this.$message({
        message: '썸네일이 업로드되었습니다',
        type: 'success',
        showClose: true
      })
    },
    uploadError(err) {
      this.notifyError(JSON.parse(err.message).message)
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
        tags: this.tags,
        intro: this.intro
      }
      let url
      let method
      if (params.id) {
        url = `/prv/posts/${params.id}`
        method = 'put'
      } else {
        url = '/prv/posts'
        method = 'post'
      }
      const options = { data, url, method }
      try {
        const { data } = await this.$axios(options)
        this.title = ''
        this.content = ''
        this.thumbnail = ''
        this.tags = ''
        this.intro = ''
        const message = params.id ? '수정되었습니다' : '작성되었습니다'
        this.$message({ message, showClose: true, type: 'success' })
        this.$router.push(`/post/${this.$titleUrl(data.title, data.postId)}`)
      } catch (err) {
        console.log(err)
        this.loading = false
        this.notifyError(err.response.data.message)
      }
    },
    openPreview() {
      this.visible = true
      this.open = false
    }
  },
  components: {
    VueMarkdown,
    VuePreview,
    VueDrawerEditor,
    VueDialog,
    VueMarked
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    }),
    submitText() {
      return this.$route.params.id ? '수정하기' : '작성하기'
    },
    extensions() {
      return [
        'json',
        'nginx',
        'bash',
        'javascript',
        'typescript',
        'jsx',
        'css',
        'markdown',
        'scss',
        'sql'
      ]
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
        thumbnail: post.thumbnail,
        intro: post.intro
      }
    } catch (err) {
      console.log(err)
      app.$sentry.captureException(err)
    }
  },
  head() {
    return {
      title: '에디터 | Kidolog'
    }
  },
  mounted() {
    window.onbeforeunload = () => true
  },
  destroyed() {
    window.onbeforeunload = null
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
      margin: 0 1rem;
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
      .fa-bars {
        font-size: 25px;
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

.editor__drawer {
  .menu-title {
    color: $oc-gray-5;
    font-size: 1.15rem;
    margin: 0 0 0.5rem;
    font-weight: bold;
  }
  .menu-list {
    padding-left: 32px;
    .menu-item {
      padding: 14px 0;
      font-size: 1.15rem;
      color: $oc-gray-8;
    }
  }
}
</style>