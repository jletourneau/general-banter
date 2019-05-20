<template>
  <div class="columns">
    <section class="column">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            Profile data
          </div>
        </div>
        <div class="card-content">
          <pre>{{ profileData }}</pre>
          <b-button
            @click="incCount"
          >
            Increment click count
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'WelcomeMessage',
    computed: {
      ...mapGetters({
        getProfile: 'profiles/get',
      }),
      profileData() {
        return (this.getProfile('me') || {}).data;
      },
    },
    mounted() {
      this.lazyFetch('me');
    },
    methods: {
      ...mapActions({
        logOut: 'devAuth/logOut',
        lazyFetch: 'profiles/lazyFetch',
        updateOps: 'profiles/updateOps',
      }),
      incCount() {
        this.updateOps({
          accountId: 'me',
          operations: [['inc', 'data.count', 1]],
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  aside {
    background: $grey-lighter;
  }
  section {
    background: $white;
  }
</style>
