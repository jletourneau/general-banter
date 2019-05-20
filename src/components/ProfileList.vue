<template>
  <div>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>User</th>
          <th>Shields</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(profile, accountId) in profiles"
          :key="accountId"
        >
          <td v-text="profile.account.identity.username" />
          <td>
            {{ shieldCount(accountId) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ProfileList',
    computed: {
      ...mapGetters({
        profiles: 'profiles/all',
        itemCount: 'inventory/get',
      }),
    },
    watch: {
      profiles() {
        Object.keys(this.profiles).forEach(
          accountId => this.fetchShields(accountId),
        );
      },
    },
    mounted() {
      this.getProfiles({ page_size: 100 });
    },
    methods: {
      ...mapActions({
        getProfiles: 'profiles/lazyList',
        getItems: 'inventory/fetch',
      }),
      fetchShields(accountId) {
        this.getItems({ accountId, slug: 'shields' });
      },
      shieldCount(accountId) {
        const inventory = this.itemCount({ accountId, slug: 'shields' });
        return inventory.count || 0;
      },
    },
  };
</script>
