<template>
  <div :class="$style.spinner"></div>
</template>

<style module lang="scss">
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  animation: rotate 0.8s infinite linear;
  border-radius: 50%;
  border-right-color: transparent !important;
  border: 4px solid skyblue;
  height: 28px;
  margin: 30px auto;
  width: 28px;
}
</style>
