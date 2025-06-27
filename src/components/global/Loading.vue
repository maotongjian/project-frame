<script setup>
import { ref } from 'vue';

const visible = ref(false);
const text = ref('');

function show(customText) {
  text.value = customText;
  visible.value = true;
}

function hide() {
  visible.value = false;
}

defineExpose({
  show,
  hide,
});
</script>

<template>
  <div v-if="visible" class="global-loading">
    <div class="loading-mask"></div>
    <div class="loading-content">
      <van-loading type="circular" size="36px" />
      <span v-if="text" class="loading-text">{{ text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.global-loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loading-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
}
.loading-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}
.loading-text {
  display: block;
  margin-top: 10px;
  font-size: 16px;
}
@media screen and (min-width: $min-width) {
  .loading-text {
    /* prettier-ignore */
    font-size: 20PX;
    /* prettier-ignore */
    margin-top: 20PX;
  }
}
</style>
