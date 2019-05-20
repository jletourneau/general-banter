<template>
  <div>
    <h1>Hello world</h1>
    <ul>
      <li
        v-for="profile in profiles"
        :key="profile.account.id"
      >
        {{ profile.account.identity.username }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ProfileList',
    computed: {
      ...mapGetters({
        profiles: 'profiles/all',
      }),
    },
    mounted() {
      this.getProfiles();
    },
    methods: {
      ...mapActions({
        getProfiles: 'profiles/lazyList',
      }),
    },
  };
</script>
