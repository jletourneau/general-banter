<template>
  <div class="content">
    <shields-leaderboard
      v-if="isLoggedIn"
    />
    <login-form
      v-else
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  const ShieldsLeaderboard = () => import('@/components/ShieldsLeaderboard.vue');
  const LoginForm = () => import('@/components/LoginForm.vue');

  export default {
    name: 'Home',
    components: {
      LoginForm,
      ShieldsLeaderboard,
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'devAuth/isLoggedIn',
      }),
    },
  };
</script>
