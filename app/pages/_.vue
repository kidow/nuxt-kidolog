<template>
  <vue-error :code="404" message="잘못 찾아오셨네요." />
</template>

<script>
import VueError from '~/components/Error'
export default {
  head: _ => ({
    title: '존재하지 않는 페이지입니다.'
  }),
  components: {
    VueError
  }
}
</script>
