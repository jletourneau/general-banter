<template>
  <nav
    class="navbar has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <template v-if="isLoggedIn">
            <router-link
              :to="{ name: 'home' }"
              class="navbar-item is-tab"
            >
              Users
            </router-link>
            <router-link
              :to="{ name: 'current-season' }"
              class="navbar-item is-tab"
            >
              Current season
            </router-link>
            <router-link
              :to="{ name: 'last-season' }"
              class="navbar-item is-tab"
            >
              Last season
            </router-link>
          </template>
          <router-link
            v-else
            :to="{ name: 'home' }"
            class="navbar-item is-tab"
          >
            Home
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
