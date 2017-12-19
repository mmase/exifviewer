<template>
  <div :class="$style.camera">
    <div :class="$style.cameraIcon" v-if="model">
      <img :class="$style.cameraIcon" :src="`../public/img/cameras/${icon}.png`">
    </div>
    <div :class="$style.content">
      <div :class="$style.model" v-if="model">
        {{model}}
      </div>
      <div :class="[$style.lens, {[$style.lensOnly]: !model}]" v-if="lens">
        <img :class="$style.lensIcon" :src="`../public/img/icons/lens.png`">
        <div :class="$style.lensModel">{{lens}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import cameras from '../cameras';

export default {
  props: ['model', 'lens'],

  computed: {
    icon() {
      return cameras[this.model];
    },
  },
};
</script>

<style module lang="scss">
.camera {
  display: flex;
}

.cameraIcon {
  width: 75px;
}

.content {
  margin-left: 12px;
}

.model {
  font-size: 17px;
  margin: 6px 0;
}

.lensIcon {
  width: 16px;
}

.lensModel {
  display: inline-block;
  font-size: 13px;
  font-weight: 100;
  margin-left: 2px;
  position: relative;
  top: -4px;
}

.lensOnly {
  .lensIcon {
    width: 28px;
  }

  .lensModel {
    display: inline-block;
    font-size: 15px;
    font-weight: normal;
    margin-left: 5px;
    position: relative;
    top: -12px;
  }
}
</style>
