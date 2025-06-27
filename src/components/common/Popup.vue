<template>
  <van-popup
    v-model:show="showPopup"
    v-bind="attrs"
    :overlay="overlay"
    :position="position"
    :overlay-class="overlayClass"
    :duration="duration"
    :round="round"
    :lock-scroll="lockScroll"
    :lazy-render="lazyRender"
    :close-on-popstate="closeOnPopstate"
    :close-on-click-overlay="closeOnClickOverlay"
    :closeable="closeable"
    :close-icon="closeIcon"
    :close-icon-position="closeIconPosition"
    :transition="transition"
    :transition-appear="transitionAppear"
    :get-container="getContainer"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @click="emit('click', $event)"
    @click-overlay="emit('clickOverlay', $event)"
    @click-close-icon="emit('clickCloseIcon', $event)"
    @open="emit('open', $event)"
    @close="emit('close', $event)"
    @opened="emit('opened', $event)"
    @closed="emit('closed', $event)"
  >
    <slot />
  </van-popup>
</template>

<script setup>
import { ref, watch, useAttrs } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  overlay: { type: Boolean, default: true },
  position: {
    type: String,
    default: 'center',
    validator: (val) => ['top', 'bottom', 'right', 'left', 'center'].includes(val),
  },
  overlayClass: { type: String, default: '' },
  duration: { type: [Number, String], default: 0.3 },
  round: { type: Boolean, default: true },
  lockScroll: { type: Boolean, default: true },
  lazyRender: { type: Boolean, default: true },
  closeOnPopstate: { type: Boolean, default: true },
  closeOnClickOverlay: { type: Boolean, default: true },
  closeable: { type: Boolean, default: false },
  closeIcon: { type: String, default: 'cross' },
  closeIconPosition: {
    type: String,
    default: 'top-right',
    validator: (val) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(val),
  },
  transition: { type: String, default: '' },
  transitionAppear: { type: Boolean, default: false },
  getContainer: { type: [String, Function], default: 'body' },
  safeAreaInsetBottom: { type: Boolean, default: false },
});

const emit = defineEmits([
  'update:modelValue',
  'click',
  'clickOverlay',
  'clickCloseIcon',
  'open',
  'close',
  'opened',
  'closed',
]);

const attrs = useAttrs();

const showPopup = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    showPopup.value = val;
  },
);

watch(showPopup, (val) => {
  emit('update:modelValue', val);
});
</script>

<style scoped lang="scss"></style>
