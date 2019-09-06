<template>
  <el-tag type="info">
    <slot />
  </el-tag>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/color.scss';

.el-tag {
  background: $oc-gray-3;
  color: $oc-gray-7;
  cursor: pointer;
  margin: 0.375rem;
  &:hover {
    background: $oc-gray-4;
  }
}
</style>