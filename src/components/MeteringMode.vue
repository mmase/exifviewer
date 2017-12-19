<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/metering-mode.png`" title="Metering mode">
    <div :class="$style.value">{{formattedMeteringMode}}</div>
  </div>
</template>

<script>
export default {
  props: ['meteringMode'],

  computed: {
    formattedMeteringMode() {
      if (this.meteringMode === 'CenterWeightedAverage') {
        return 'Center';
      }

      if (this.meteringMode === 'MultiSpot') {
        return 'Multi-spot';
      }

      return this.meteringMode;
    },
  },
};
</script>

<style module lang="scss">
@import 'captureData';

.icon {
  position: relative;
  top: -1px;
}

.value {
  top: -4px;
}
</style>
