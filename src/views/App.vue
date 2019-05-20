<template>
  <div class="app">
    <nav-bar />
    <main class="container">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  import AppFooter from '@/components/AppFooter.vue';

  export default {
    components: {
      NavBar,
      AppFooter,
    },
  };
</script>

<style lang="scss" scoped>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    flex: 1;
    margin: {
      top: $margin-md;
      bottom: $margin-md;
    }
  }
</style>
