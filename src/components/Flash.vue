<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/${flashIcon}.png`" title="Flash">
    <div :class="$style.value">
      <span>{{flashLabel}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['flash'],

  computed: {
    flashIcon() {
      const flash = this.flash.toLowerCase();

      let icon = 'flash';

      if (flash.includes('no flash') || flash.includes('did not fire, compulsory')) {
        icon += '-off';
      }
      else if (flash.includes('auto')) {
        icon += '-auto';
      }

      return icon;
    },
    flashLabel() {
      return this.flash && this.flash.split(',')[0];
    },
  },
};
</script>

<style module lang="scss">
@import 'captureData';

.container {
  position: relative;
}

.value {
  align-items: center;
  display: flex;
  font-size: 11px;
  height: 28px;
  left: 22px;
  position: absolute;
  top: 13px;
  width: 60px;
}

.icon {
  position: relative;
  top: -3px;
  width: 15px;
}
</style>
