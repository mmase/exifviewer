import Vue from 'vue';
import App from './App.vue';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div');
  const id = 'app';

  el.id = id;

  const app = new Vue({
    render: h => h(App),
  });

  document.body.prepend(el);

  app.$mount(`#${id}`);
});
