<template>
  <div class="app">
    <nav-bar />
    <main class="section">
      <div class="container">
        <router-view />
      </div>
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
  .section {
    flex: 1;
  }
</style>
