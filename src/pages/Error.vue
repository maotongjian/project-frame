<template>
  <div class="error-container">
    <div class="error-content">
      <img src="/error.png" alt="404" width="800" height="800" />
      <div class="button-container">
        <button @click="handleBackHome">{{ $t('common.backToHome') }}</button>
        <!-- <router-link :to="localePath({ path: routes.index.path })">{{ $t('common.backToHome') }}</router-link> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocaleRouter } from '@/composables/useLocaleRouter';
import routes from '@/routes';

const { routerPush } = useLocaleRouter();

const handleBackHome = () => {
  routerPush({ path: routes.index.path });
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $max-width) {
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    .error-content {
      & > img {
        width: 100%;
        height: auto;
      }
      .button-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        button {
          padding: 10px 20px;
          background-color: $main-color;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
      }
    }
  }
}
@media screen and (min-width: $min-width) {
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    .error-content {
      & > img {
        max-width: 600px;
        height: auto;
      }
      .button-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        button {
          padding: 12px 32px;
          background-color: $main-color;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 22px;
        }
      }
    }
  }
}
</style>
