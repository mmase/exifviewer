<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/shutter-speed.png`" title="Shutter speed">
    <div :class="$style.value">{{shutterSpeed}}s</div>
  </div>
</template>

<script>

export default {
  props: ['exposureTime'],

  computed: {
    shutterSpeed() {
      if (this.exposureTime.value >= 1) {
        return this.exposureTime.value;
      }
      return `${this.exposureTime.numerator}/${this.exposureTime.denominator}`;
    },
  },
};
</script>

<style module lang="scss">
@import 'captureData';

.value {
  top: -7px;
}
</style>
