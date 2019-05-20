<template>
  <div class="content">
    <profile-list
      v-if="isLoggedIn"
    />
    <login-form
      v-else
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  const ProfileList = () => import('@/components/ProfileList.vue');
  const LoginForm = () => import('@/components/LoginForm.vue');

  export default {
    name: 'Home',
    components: {
      LoginForm,
      ProfileList,
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'devAuth/isLoggedIn',
      }),
    },
  };
</script>
