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
    <div class="editor__content"></div>
  </div>
</template>

<script>
export default {
  layout: 'editor',
  data: _ => ({
    title: '',
    leftPercentage: 0.5
  }),
  methods: {}
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
}
</style>