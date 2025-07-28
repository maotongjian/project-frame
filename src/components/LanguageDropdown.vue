<template>
  <div v-click-outside="() => toggle(langs[0], true)" class="dropdown-container">
    <div ref="dropdownRef" class="dropdown">
      <ul class="dropdown-list">
        <li v-for="(lang, index) in langs" :key="lang" :class="[{ selected: index === 0 }]" @click="toggle(lang)">
          {{ lang }}
          <span v-if="index === 0" class="arrow" :class="{ rotated: isExpanded }"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useLocaleRouter } from '@/composables/useLocaleRouter';

import { SUPPORT_LOCALES, DEFAULT_LOCALE, changeLocale } from '@/i18n';

const route = useRoute();
const router = useRouter();
const { targetLocalePath } = useLocaleRouter();

const locale = route.params.locale || DEFAULT_LOCALE;

const dropdownRef = ref(null);
const langs = ref([locale.toUpperCase()]);
const isExpanded = ref(false);

const toggle = async (lang, isOutside) => {
  const locale = lang.toLowerCase();
  const locales = SUPPORT_LOCALES.map((locale) => locale.toUpperCase());
  const el = dropdownRef.value;
  if (!isExpanded.value && !isOutside) {
    isExpanded.value = true;
    el.style.height = el.scrollHeight + 'px';
    el.style.transition = 'height .2s ease';
    el.style.overflow = 'hidden';
    langs.value = [...new Set([...langs.value, ...locales])];
    await nextTick();
    el.style.height = el.scrollHeight + 'px';
  } else {
    isExpanded.value = false;
    setTimeout(() => {
      changeLocale(locale);
      langs.value = [lang];
      el.style.height = 'auto';
      const newPath = targetLocalePath(route.fullPath, locale);
      router.replace({ path: newPath, query: route.query });
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $max-width) {
  .dropdown-container {
    position: relative;
    .dropdown {
      z-index: 1000;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 15px;
      border: 1px solid #e5e9ee;
      padding: 2px;
      background-color: #fff;
      .dropdown-list {
        font-size: 12px;
        line-height: 12px;
        & > li {
          padding: 4px 5px;
          border-bottom: solid 1px #d8d8d8;
          color: #696d6d;
        }
        .selected {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2px;
          color: #3f4242;
          .arrow {
            border: solid 4px transparent;
            border-top-color: #3f4242;
            transition: all 0.3s ease;
            margin-top: 2px;
            &.rotated {
              transform: rotate(180deg);
              margin-top: -6px;
              border-top-color: $main-color;
            }
          }
        }
        & > li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
@media screen and (min-width: $min-width) {
  .dropdown-container {
    position: relative;
    .dropdown {
      z-index: 1000;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 14px;
      border: 1px solid #e5e9ee;
      padding: 2px;
      background-color: #fff;
      .dropdown-list {
        font-size: 18px;
        line-height: 20px;
        & > li {
          padding: 6px 12px;
          border-bottom: solid 1px #d8d8d8;
          color: #696d6d;
          cursor: pointer;
        }
        .selected {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4px;
          color: #3f4242;
          .arrow {
            border: solid 6px transparent;
            border-top-color: #3f4242;
            transition: all 0.3s ease;
            margin-top: 6px;
            &.rotated {
              transform: rotate(180deg);
              margin-top: -6px;
              border-top-color: $main-color;
            }
          }
        }
        & > li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
