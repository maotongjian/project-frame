<template>
  <Header v-if="!isErrorPage" />
  <RouterView />
  <Footer v-if="!isErrorPage" />
</template>

<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import Header from './Header.vue';
import Footer from './Footer.vue';

const route = useRoute();

const isErrorPage = computed(() => route.meta.hideLayout);
</script>
