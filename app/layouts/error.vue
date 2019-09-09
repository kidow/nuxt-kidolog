<template>
  <vue-error :code="500" message="일시적 서버 오류입니다." />
</template>

<script>
import VueError from '~/components/Error'
export default {
  head: _ => ({
    title: '앗!'
  }),
  components: {
    VueError
  }
}
</script>