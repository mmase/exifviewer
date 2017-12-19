<template>
  <div :class="$style.container">
    <img :class="$style.icon" :src="`../public/img/icons/shutter-speed.png`">
    <div :class="$style.value">{{shutterSpeed}}</div>
  </div>
</template>

<script>

export default {
  props: ['exposureTime'],

  computed: {
    shutterSpeed() {
      return this.exposureTime && this.getFraction(this.exposureTime);
    },
  },
  methods: {
    getFraction(fraction) {
      function gcd(a, b) {
        if (b < 0.0000001) {
          return a;
        }
        return gcd(b, Math.floor(a % b));
      };

      const len = fraction.toString().length - 2;

      let denominator = Math.pow(10, len);
      let numerator = fraction * denominator;

      const divisor = gcd(numerator, denominator);

      numerator /= divisor;
      denominator /= divisor;

      return `${Math.floor(numerator)}/${Math.floor(denominator)}s`;
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
