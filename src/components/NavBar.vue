<template>
  <nav
    class="navbar has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link
            :to="{ name: 'home' }"
            class="navbar-item is-tab"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'about' }"
            class="navbar-item is-tab"
          >
            About
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'devAuth/isLoggedIn',
      }),
    },
  };
</script>
