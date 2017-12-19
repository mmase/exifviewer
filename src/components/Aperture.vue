<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/aperture.png`" title="Aperture">
    <div :class="$style.value">ƒ/{{formattedFNumber}}</div>
  </div>
</template>

<script>
export default {
  props: ['fnumber'],

  computed: {
    formattedFNumber() {
      return this.fnumber && Number(this.fnumber);
    },
  },
};
</script>

<style module lang="scss">
@import 'captureData';
</style>
