<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  async created() {
    if (process.client) await this.$store.dispatch('auth/ME')
  }
}
</script>
