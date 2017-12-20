<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/aperture.png`" title="Aperture">
    <div :class="$style.value">ƒ/{{fnumber}}</div>
  </div>
</template>

<script>
export default {
  props: ['fnumber'],
};
</script>

<style module lang="scss">
@import 'captureData';
</style>
