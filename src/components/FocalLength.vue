<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/focal-length.png`" title="Focal length">
    <div :class="$style.value">{{focalLength}}</div>
  </div>
</template>

<script>
export default {
  props: ['focalLength'],
};
</script>

<style module lang="scss">
@import 'captureData';

.value {
  top: -6px;
}
</style>
