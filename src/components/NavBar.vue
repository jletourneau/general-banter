<template>
  <nav
    role="navigation"
    aria-label="main navigation"
  >
    <div class="tabs">
      <div class="container">
        <ul>
          <template v-if="isLoggedIn">
            <router-link
              :to="{ name: 'home' }"
              tag="li"
            >
              <a>Shields leaderboard</a>
            </router-link>
            <router-link
              :to="{ name: 'current-season' }"
              tag="li"
            >
              <a>Current season</a>
            </router-link>
            <router-link
              :to="{ name: 'last-season' }"
              tag="li"
            >
              <a>Last season</a>
            </router-link>
          </template>
          <template v-else>
            <router-link
              :to="{ name: 'home' }"
              tag="li"
            >
              <a>Home</a>
            </router-link>
          </template>
        </ul>
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
