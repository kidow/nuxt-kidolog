<template>
  <vue-error :code="500" message="일시적 서버 오류입니다." />
</template>

<script>
import VueError from '~/components/Error'
export default {
  head: _ => ({
    title: '죄송합니다. 서버 오류입니다.'
  }),
  components: {
    VueError
  }
}
</script>