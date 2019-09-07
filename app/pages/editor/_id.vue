<template>
  <div class="editor-template">
    <div class="editor__header flex">
      <div class="header__left flex">
        <i class="el-icon-back"></i>
      </div>
      <div class="header__input">
        <input type="text" v-model="title" placeholder="제목을 입력해주세요." />
      </div>
      <div class="header__right flex">
        <el-upload>
          <el-button plain icon="el-icon-upload2">썸네일</el-button>
        </el-upload>
        <div style="width: 0.5rem" />
        <el-upload>
          <el-button plain icon="el-icon-picture">업로드</el-button>
        </el-upload>
        <div style="width: 0.5rem" />
        <el-button class="submit" type="primary" plain>작성하기</el-button>
      </div>
    </div>
    <div class="editor__content flex">
      <div class="content__flex flex display" :style="{ flex: leftPercentage }">display</div>
      <div class="content__flex flex none" :style="{ flex: 1 - leftPercentage}">none</div>
      <div
        class="content__separator"
        @mousedown="onSeparatorMouseDown"
        :style="{ left: `${leftPercentage * 100}%` }"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'editor',
  data: _ => ({
    title: '',
    leftPercentage: 0.5
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