<template>
  <div :class="$style.camera">
    <div :class="$style.cameraIcon" v-if="make && model">
      <img :class="$style.cameraIcon" :src="`../public/img/cameras/${iconPath}.png`" title="Camera">
    </div>
    <div :class="$style.content">
      <div :class="$style.model" v-if="model">
        {{absentMake}} {{formattedModel}}
        <div :class="$style.external" v-html="externalSvg"></div>
      </div>
      <div :class="[$style.lens, {[$style.lensOnly]: !model}]" v-if="lens">
        <img :class="$style.lensIcon" :src="`../public/img/icons/lens.png`" title="Lens">
        <div :class="$style.lensModel">
          {{lens}}
          <div :class="$style.external" v-html="externalSvg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import externalSvg from '../icons/external.svg';
import cameras from '../cameras';

export default {
  props: ['make', 'model', 'lens'],

  data() {
    return {
      externalSvg,
    };
  },

  computed: {
    absentMake() {
      const make = this.make.toLowerCase();
      const model = this.model.toLowerCase();
      let formatted = '';

      if (model.includes(make)) {
        return formatted;
      }

      switch (make) {
        case 'fujifilm':
          formatted = this.capitalizeFirstLetter(make);
          break;

        default:
          break;
      }

      return formatted;
    },
    formattedModel() {
      return this.model.replace('NIKON', 'Nikon');
    },
    iconPath() {
      const make = this.make.toLowerCase().split(' ')[0];

      if (!cameras[make]) {
        return 'default';
      }

      const lines = Object.entries(cameras[make]);

      let match;

      lines.forEach(([line, models]) => {
        models.forEach(model => {
          if (this.model.toLowerCase().includes(model)) {
            match = line;
          }
        });
      });

      return match ? `${make}/${match}` : `${make}/default`;
    },
  },

  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<style module lang="scss">
$linkColor: #0087e2;

.camera {
  display: flex;
}

.cameraIcon {
  width: 75px;
}

.content {
  margin-left: 12px;
}

.model,
.lensModel {
  cursor: pointer;
  display: inline-block;

  &:hover {
    color: $linkColor;

    :global(.icon-external) {
      fill: $linkColor;
    }
  }
}

.external {
  display: inline-block;
  position: relative;
  width: 12px;

  :global(.icon-external) {
    fill: #999;
  }
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

  .external {
    margin-left: 2px;
    top: 2px;
  }
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
