<template>
  <div :class="$style.camera">
    <div :class="$style.iconContainer" v-if="model">
      <img :class="$style.icon" :src="`../public/img/cameras/${icon}.png`">
    </div>
    <div :class="$style.content">
      <div :class="$style.model" v-if="model">
        {{model}}
      </div>
      <div :class="$style.lens" v-if="lens">
        {{lens}}
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

.icon {
  width: 75px;
}

.content {
  margin-left: 12px;
}

.model {
  font-size: 17px;
  margin: 6px 0;
}

.lens {
  font-size: 13px;
  font-weight: 100;
}
</style>
