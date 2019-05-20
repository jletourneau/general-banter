<template>
  <footer
    class="footer"
  >
    <div class="container">
      <b-button
        v-if="isLoggedIn"
        @click="logOut"
      >
        Log out
      </b-button>
    </div>
  </footer>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'devAuth/isLoggedIn',
      }),
    },
    methods: {
      ...mapActions({
        logOut: 'devAuth/logOut',
      }),
    },
  };
</script>
