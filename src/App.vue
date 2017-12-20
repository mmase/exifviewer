<template>
  <Viewer :img="img" :ready="ready" v-show="img" ref="viewer"/>
</template>

<script>
import Viewer from './components/Viewer.vue';

export default {
  components: {
    Viewer,
  },

  data() {
    return {
      ready: false,
      img: null,
      timeout: null,
    };
  },

  methods: {
    getElementFromEvent(e) {
      let el = e.target;

      if (el.targetNodeType === 3) {
        el = el.parentNode;
      }

      return el;
    },
    elementIsImage(el) {
      return el.tagName === 'IMG';
    },
    elementIsViewer(el) {
      return el === this.$refs.viewer.$el || this.$refs.viewer.$el.contains(el);
    },
    bindMouseEvents() {
      window.addEventListener('mouseover', e => {
        const el = this.getElementFromEvent(e);

        if (el && el.tagName) {
          if (this.elementIsViewer(el)) {
            clearTimeout(this.timeout);
            this.ready = true;
          }
          else if (this.elementIsImage(el)) {
            this.ready = false;
            this.img = el;
          }
        }
      });

      window.addEventListener('mouseout', e => {
        const el = this.getElementFromEvent(e);
        const cached = this.img;

        if (this.elementIsViewer(el)) {
          return;
        }

        if (this.img) {
          this.timeout = setTimeout(() => {
            if (cached === this.img) {
              this.img = null;
              this.ready = false;
            }
          }, 5);
        }
      });
    },
  },

  mounted() {
    this.bindMouseEvents();
  },
};
</script>
