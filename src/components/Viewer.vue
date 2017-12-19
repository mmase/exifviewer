<template>
  <div :class="$style.container" :style="positionStyle">
    <div :class="[$style.camera, {[$style.active]: img}]" v-html="cameraSvg"></div>
    <div :class="$style.viewer">
      <template v-if="imageData">
        <Spinner v-if="!imageData.ready"/>
        <template v-else>
          <Limited v-if="imageData.LimitedData"/>
          <Camera :model="imageData.Model" :lens="imageData.LensModel" v-if="imageData.Model || imageData.LensModel"/>
        </template>
      </template>
      <div v-else :class="$style.noData">
        No data available for this image.
      </div>
    </div>
  </div>
</template>

<script>
import { EXIF } from 'exif-js';
import exiftool from 'exiftool.js';
import _ from 'lodash';
import cameraSvg from '../icons/camera.svg';
import Spinner from './Spinner.vue';
import Limited from './Limited.vue';
import Camera from './Camera.vue';

export default {
  props: ['img'],

  components: {
    Spinner,
    Limited,
    Camera,
  },

  data() {
    return {
      imageData: false,
      cameraSvg,
    };
  },

  watch: {
    img(img) {
      if (img) {
        this.imageData = {
          ready: false,
        };
      }

      this.getImageData()
        .then(data => {
          this.imageData = {
            ready: true,
            ...data,
          };
        })
        .catch(() => this.imageData = false);
    },
  },

  computed: {
    imagePosition() {
      if (!this.img) {
        return;
      }

      return this.getElementPosition(this.img);
    },
    positionStyle() {
      const offset = 5;

      if (!this.img) {
        return;
      }

      const { top, left } = this.imagePosition;

      return {
        top: `${top + offset}px`,
        left: `${left + offset}px`,
      };
    },
  },

  methods: {
    getImageData() {
      return new Promise((resolve, reject) => {
        if (!this.img) {
          reject();
        }

        this.getExifData().then(resolve).catch(() => {
          this.getXmpData().then(resolve).catch(reject);
        });
      });
    },
    getExifData() {
      return new Promise((resolve, reject) => {
        exiftool.getData(this.img, () => {
          const tags = exiftool.getAllTags(this.img);

          if (!_.isEmpty(tags)) {
            resolve(tags);
          }

          reject();
        });
      });
    },
    getXmpData() {
      return new Promise((resolve, reject) => {
        EXIF.enableXmp();
        EXIF.getData(this.img, function() {
          const xmp = this.xmpdata &&
                      this.xmpdata['x:xmpmeta'] &&
                      this.xmpdata['x:xmpmeta']['rdf:RDF'] &&
                      this.xmpdata['x:xmpmeta']['rdf:RDF']['rdf:Description'] &&
                      this.xmpdata['x:xmpmeta']['rdf:RDF']['rdf:Description']['@attributes'];
          if (!_.isEmpty(xmp)) {
            resolve({
              LensModel: xmp['aux:Lens'],
              LimitedData: true,
            });
          }

          reject();
        });
      });
    },
    getElementPosition(el) {
      let positionTop = 0;
      let positionLeft = 0;
      let positionOffsetTop = 0;
      let positionOffsetLeft = 0;
      let paddingTop = 0;
      let paddingLeft = 0;

      function getCssValue(property) {
        return parseInt(window.getComputedStyle(el, null).getPropertyValue(property).replace(/[A-Za-z]/g, ''), 10);
      }

      positionOffsetTop = getCssValue('top');
      positionOffsetLeft = getCssValue('left');

      paddingTop = getCssValue('padding-top');
      paddingLeft = getCssValue('padding-left');

      if (el.offsetParent) {
        do {
          positionLeft = positionLeft + el.offsetLeft;
          positionTop = positionTop + el.offsetTop;
        } while (el = el.offsetParent);

        if (positionOffsetTop < 0) {
          positionTop = positionTop + positionOffsetTop;
        }
        if (positionOffsetLeft < 0) {
          positionLeft = positionLeft + positionOffsetLeft;
        }

        return {
          top: positionTop + paddingTop,
          left: positionLeft + paddingLeft,
        };
      }
    },
  },
};
</script>

<style module lang="scss">
$iconSize: 16px;
$finalOpacity: .92;

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: $finalOpacity; }
}

.container {
  backface-visibility: hidden;
  position: absolute;

  &:hover {

    .camera {
      opacity: 1;
    }

    .viewer {
      animation: fadeIn .3s;
      display: block;
    }
  }
}

.camera {
  cursor: pointer;
  height: $iconSize;
  opacity: 0;
  padding: 10px;
  transition: opacity 300ms;
  width: $iconSize;

  :global(.icon-camera) {
    fill: #fff;
  }

  &.active {
    opacity: 0.66;
  }

  &:hover {
    opacity: 1 !important;
  }
}

.viewer {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(#000, 0.1);
  color: #191919;
  display: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 12px;
  left: -6px;
  margin: 0 12px;
  min-width: 275px;
  opacity: $finalOpacity;
  padding: 15px;
  position: relative;

  &::before {
    content: '';
    border-bottom-color: #fff !important;
    border: 6px solid transparent;
    left: 6px;
    position: absolute;
    top: -11px;
  }
}

.noData {
  font-size: 14px;
  padding: 12px;
  text-align: center;
}
</style>
