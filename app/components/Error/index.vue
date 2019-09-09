<template>
  <div class="error">
    <div class="number">{{ code }}</div>
    <div class="text">{{ message }}</div>
    <div>
      <el-button @click="$router.push('/')">홈으로</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueError',
  props: {
    code: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.error {
  div {
    text-align: center;
  }
  .number {
    font-size: 5rem;
    font-weight: 800;
    color: $oc-gray-7;
  }
  .text {
    margin: 1rem 0;
    font-size: 1.5rem;
    color: $oc-gray-8;
  }
}
</style>