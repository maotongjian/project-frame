<template>
  <div :class="['text-input', inputLayout]">
    <label v-if="label" :for="id" class="label">
      <span v-if="required" class="required">*</span>
      {{ label }}
    </label>
    <div class="relative">
      <input
        v-if="!isSelect"
        :id="id"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="['input', { 'input-error': showError }, inputClass]"
        @input="handleInput"
        @blur="handleBlur"
      />
      <Select v-else v-model="inputValue" :options="options" :placeholder="placeholder" :disabled="disabled" />
      <i v-if="clearable && !isSelect && inputValue" class="iconfont clear-btn" @click="clearInput">&#xe713;</i>
    </div>
    <p v-if="showError" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Select from '@/components/common/Select.vue';

const { t, locale } = useI18n();

const props = defineProps({
  id: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  required: Boolean,
  pattern: RegExp, // 接收 RegExp 对象
  errorText: { type: String, default: '' },
  clearable: { type: Boolean, default: true },
  disabled: Boolean,
  type: {
    type: String,
    default: 'text',
  },
  inputClass: { type: String, default: '' },
  inputLayout: { type: String, default: '' },
  options: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);
const errorMessage = ref('');
const showError = ref('');

const isSelect = computed(() => {
  return props.options.length > 0;
});

const validate = (trigger = 'input') => {
  errorMessage.value = '';
  showError.value = false;
  const value = inputValue.value;
  // 必填校验
  if (props.required && !value) {
    errorMessage.value = t('common.required');
    if (trigger === 'blur' || trigger === 'input') showError.value = true;
    return false;
  }
  // 正则校验
  if (props.pattern && value && !props.pattern.test(value)) {
    errorMessage.value = props.errorText;
    if (trigger === 'blur' || trigger === 'input') showError.value = true;
    return false;
  }
  return true;
};

const handleInput = () => {
  emit('update:modelValue', inputValue.value);
  validate('input');
};

const handleBlur = () => {
  validate('blur');
};

const clearInput = () => {
  inputValue.value = '';
  emit('update:modelValue', '');
};

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
    validate('input');
  },
  // { immediate: true },
);

watch(inputValue, (val) => {
  if (isSelect.value) {
    emit('update:modelValue', val);
  }
});

watch(locale, () => {
  if (showError.value) validate();
});

defineExpose({ validate });
</script>

<style lang="scss" scoped>
@media screen and (max-width: $max-width) {
  .text-input {
    display: flex;
    flex-direction: column;
    .label {
      font-size: 14px;
      color: #666;
      line-height: 18px;
      margin-bottom: 6px;
      .required {
        color: #ff4040;
        margin-right: 2px;
        vertical-align: baseline;
      }
    }
    .relative {
      position: relative;
      .input {
        width: 100%;
        padding: 8px 30px 8px 12px;
        border: 1px solid #e5e9ee;
        border-radius: 4px;
        font-size: 12px;
        line-height: 16px;
        color: #333;
      }
      .input:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
      .input-error {
        border: 1px solid #ff4040;
      }
      .clear-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #d6d6d6;
        font-size: 12px;
      }
    }
    .error {
      font-size: 12px;
      line-height: 16px;
      color: #ff4040;
      padding: 0 12.5px;
    }
  }
}
@media screen and (min-width: $min-width) {
  .text-input {
    display: flex;
    flex-direction: column;
    .label {
      /* prettier-ignore */
      font-size: 20PX;
      color: #666;
      /* prettier-ignore */
      line-height: 24PX;
      /* prettier-ignore */
      margin-bottom: 12PX;
      .required {
        color: #ff4040;
        /* prettier-ignore */
        margin-right: 2PX;
        vertical-align: baseline;
      }
    }
    .relative {
      position: relative;
      .input {
        width: 100%;
        /* prettier-ignore */
        padding: 12PX 40PX 12PX 14PX;
        /* prettier-ignore */
        border: 1PX solid #e5e9ee;
        /* prettier-ignore */
        border-radius: 4PX;
        /* prettier-ignore */
        font-size: 16PX;
        /* prettier-ignore */
        line-height: 20PX;
        color: #333;
      }
      .input:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
      .input-error {
        /* prettier-ignore */
        border: 1PX solid #ff4040;
      }
      .clear-btn {
        position: absolute;
        /* prettier-ignore */
        right: 16PX;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        /* prettier-ignore */
        font-size: 16PX;
        color: #d6d6d6;
      }
    }
    .error {
      /* prettier-ignore */
      font-size: 16PX;
      /* prettier-ignore */
      line-height: 20PX;
      color: #ff4040;
      /* prettier-ignore */
      padding: 0 14PX;
    }
  }
}
</style>
