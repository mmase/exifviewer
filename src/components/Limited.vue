<template>
  <div :class="$style.limited">
    <div :class="[$style.warning]" v-html="warningSvg"></div>
    <div :class="$style.message">Limited data available for this image.</div>
  </div>
</template>

<script>
import warningSvg from '../icons/warning.svg';

export default {
  data() {
    return {
      warningSvg,
    };
  },
};
</script>

<style module lang="scss">
.limited {
  background: #fff4da;
  border-radius: 3px;
  margin: 5px 5px 15px;
  padding: 10px;
  text-align: center;
}

.warning {
  display: inline-block;
  width: 16px;
  position: relative;
  top: 1px;
}

.message {
  display: inline-block;
  margin-left: 8px;
  position: relative;
  top: -1px;
}
</style>
