<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/focal-length.png`">
    <div :class="$style.value">{{formattedFocalLength}}</div>
  </div>
</template>

<script>
export default {
  props: ['focalLength'],

  computed: {
    formattedFocalLength() {
      const focalLength = parseFloat(this.focalLength);
      return focalLength && `${Number(focalLength)}mm`;
    },
  },
};
</script>

<style module lang="scss">
@import 'captureData';

.icon {
  width: 20px;
}

.value {
  margin-left: 3px;
  top: -5px;
}
</style>
