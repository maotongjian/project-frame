<template>
  <div
    ref="selectRef"
    :class="['select', selectClass]"
    tabindex="0"
    @keydown.enter.prevent="toggleDropdown"
    @keydown.esc.prevent="closeDropdown"
  >
    <div :class="['control', { disabled }]" @click="toggleDropdown">
      <span :class="['selected', { placeholder: modelValue === '' }]">{{ selectName || placeholder }}</span>
      <i class="iconfont arrow" :class="{ open, disabled }">&#xe600;</i>
    </div>
    <transition name="fade-slide">
      <ul v-if="open" class="options" :style="optionsStyle">
        <li
          v-for="item in normalizedOptions"
          :key="item.value"
          :class="['option', { selected: item.value === modelValue }]"
          @click="selectOption(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  selectClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectRef = ref(null);
const open = ref(false);
const optionsStyle = ref({});
const selectName = ref('');

const normalizedOptions = computed(() =>
  props.options.map((item) => (typeof item === 'string' ? { label: item, value: item } : item)),
);

const selectOption = (item) => {
  if (props.disabled) return;
  selectName.value = item.name;
  emit('update:modelValue', item.value);
  closeDropdown();
};

const toggleDropdown = async () => {
  if (props.disabled) return;
  open.value = !open.value;
  if (open.value) await nextTick().then(() => updateOptionsPosition());
};

const closeDropdown = () => {
  open.value = false;
};

const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) closeDropdown();
};

const handleScrollOrResize = () => {
  if (open.value) updateOptionsPosition();
};

const updateOptionsPosition = () => {
  if (!selectRef.value) return;
  const rect = selectRef.value.getBoundingClientRect();
  optionsStyle.value = {
    position: 'fixed',
    left: rect.left + 'px',
    top: rect.bottom + 'px',
    width: rect.width + 'px',
    zIndex: 9999,
  };
};

onMounted(() => {
  updateOptionsPosition();
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScrollOrResize, true);
  window.addEventListener('resize', handleScrollOrResize);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScrollOrResize, true);
  window.removeEventListener('resize', handleScrollOrResize);
});

watch(
  () => props.modelValue,
  (val) => {
    if (!selectName.value) {
      selectName.value = val;
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@media screen and (max-width: $max-width) {
  .select {
    position: relative;
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    user-select: none;
    outline: none;
    .control {
      border: 1px solid #e5e9ee;
      border-radius: 4px;
      padding: 8px 10px 8px 12px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
      &.disabled {
        background-color: #f5f5f5;
        color: #999;
        cursor: not-allowed;
      }
    }
    .control:hover {
      border-color: #999;
    }
    .control:focus {
      border-color: $main-color;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    }
    .selected {
      color: #333;
      &.placeholder {
        color: #666;
      }
    }
    .arrow {
      font-size: 12px;
      color: #999;
      transition: all 0.3s ease;
    }
    .arrow.open {
      transform: rotate(180deg);
      color: $main-color;
    }

    .options {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: #fff;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0 0 6px 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 10;
      max-height: 200px;
      overflow-y: auto;
      color: #333;
    }
    .option {
      padding: 8px 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .option:hover {
      background: #f5f5f5;
    }
    .option.selected {
      background: $main-background-color;
      color: $main-color;
      font-weight: 500;
    }

    /* 动画效果 */
    .fade-slide-enter-active,
    .fade-slide-leave-active {
      transition: all 0.2s ease;
    }
    .fade-slide-enter-from,
    .fade-slide-leave-to {
      opacity: 0;
      transform: translateY(-8px);
    }
  }
}
@media screen and (min-width: $min-width) {
  .select {
    position: relative;
    width: 100%;
    /* prettier-ignore */
    font-size: 16PX;
    /* prettier-ignore */
    line-height: 20PX;
    user-select: none;
    outline: none;
    .control {
      /* prettier-ignore */
      border: 1PX solid #e5e9ee;
      /* prettier-ignore */
      border-radius: 4PX;
      /* prettier-ignore */
      padding: 12PX 16PX 12PX 14PX;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
      &.disabled {
        background-color: #f5f5f5;
        color: #999;
        cursor: not-allowed;
      }
    }
    .control:hover {
      border-color: #999;
    }
    .control:focus {
      border-color: $main-color;
      /* prettier-ignore */
      box-shadow: 0 0 0 2PX rgba(64, 158, 255, 0.2);
    }
    .selected {
      color: #333;
      &.placeholder {
        color: #666;
      }
    }
    .arrow {
      /* prettier-ignore */
      font-size: 16PX;
      color: #999;
      transition: all 0.3s ease;
    }
    .arrow.open {
      transform: rotate(180deg);
      color: $main-color;
    }

    .options {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: #fff;
      /* prettier-ignore */
      border: 1PX solid #ccc;
      border-top: none;
      /* prettier-ignore */
      border-radius: 0 0 6PX 6PX;
      /* prettier-ignore */
      box-shadow: 0 4PX 12PX rgba(0, 0, 0, 0.1);
      z-index: 10;
      /* prettier-ignore */
      max-height: 200PX;
      overflow-y: auto;
      color: #333;
    }
    .option {
      /* prettier-ignore */
      padding: 12PX 16PX;
      cursor: pointer;
      transition: background 0.2s;
      /* prettier-ignore */
      font-size: 14PX;
      /* prettier-ignore */
      line-height: 20PX;
    }
    .option:hover {
      background: #f5f5f5;
    }
    .option.selected {
      background: $main-background-color;
      color: $main-color;
      font-weight: 500;
    }

    .fade-slide-enter-active,
    .fade-slide-leave-active {
      transition: all 0.2s ease;
    }
    .fade-slide-enter-from,
    .fade-slide-leave-to {
      opacity: 0;
      /* prettier-ignore */
      transform: translateY(-8PX);
    }
  }
}
</style>
