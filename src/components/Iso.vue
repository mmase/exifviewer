<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/iso.png`" title="ISO">
    <div :class="$style.value">{{iso}}</div>
  </div>
</template>

<script>
export default {
  props: ['iso'],
};
</script>

<style module lang="scss">
@import 'captureData';

.icon {
  position: relative;
}

.value {
  top: -2px;
}
</style>
