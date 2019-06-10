<template>
  <div>
    <h1 class="title">
      Shields leaderboard
    </h1>
    <table class="table is-narrow is-striped">
      <thead>
        <tr>
          <th>User</th>
          <th>Tagline</th>
          <th>Shields</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="profile in rankedProfiles"
          :key="profile.account_id"
        >
          <td v-text="profile.account.identity.username" />
          <td v-text="taglineFor(profile)" />
          <td v-text="shieldCount(profile)" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ShieldsLeaderboard',
    computed: {
      ...mapGetters({
        profiles: 'profiles/all',
        itemCount: 'inventory/get',
      }),
      rankedProfiles() {
        const profiles = Object.values(this.profiles);
        return profiles.sort((a, b) => {
          const shieldsA = this.shieldCount(a) || 0;
          const shieldsB = this.shieldCount(b) || 0;
          if (shieldsA > shieldsB) return -1;
          if (shieldsB < shieldsA) return 1;
          return 0;
        });
      },
    },
    watch: {
      profiles() {
        Object.keys(this.profiles).forEach(
          accountId => this.fetchShields(accountId),
        );
      },
    },
    mounted() {
      this.getProfiles({
        page_size: 100,
        account_fields: ['server_data'],
      });
    },
    methods: {
      ...mapActions({
        getProfiles: 'profiles/lazyList',
        getItems: 'inventory/fetch',
      }),
      fetchShields(accountId) {
        this.getItems({ accountId, slug: 'shields' });
      },
      taglineFor(profile) {
        try {
          return profile.account.server_data.tag_data.tagline;
        } catch (err) {
          return '';
        }
      },
      shieldCount(profile) {
        const inventory = this.itemCount({
          accountId: profile.account_id,
          slug: 'shields',
        });
        return inventory.count;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    margin: 0 0 $margin-md;
  }
</style>
