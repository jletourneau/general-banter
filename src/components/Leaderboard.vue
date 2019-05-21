<template>
  <div>
    <table class="table is-narrow is-striped is-fullwidth">
      <col width="50" />
      <col />
      <col width="100" />
      <tbody>
        <tr
          v-for="leader in leaders"
          :key="leader.member"
        >
          <td>
            {{ leader.rank }}.
          </td>
          <td v-text="leader.object.owner.account.identity.username" />
          <td v-text="leader.object.data.reaction.counter" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Leaderboard',
    props: {
      objectTypeSlug: { type: String, default: '' },
      leaderboardSlug: { type: String, default: '' },
      grouping: { type: Object, default: () => {} },
    },
    computed: {
      ...mapGetters({
        leaderboard: 'leaderboards/get',
      }),
      leaderboardParams() {
        return {
          objectTypeSlug: this.objectTypeSlug,
          leaderboard: this.leaderboardSlug,
          grouping: this.grouping,
        };
      },
      leaders() {
        return this.leaderboard(this.leaderboardParams);
      },
    },
    mounted() {
      this.fetch();
    },
    methods: {
      ...mapActions({
        fetchLeaderboard: 'leaderboards/lazyFetchPage',
      }),
      fetch() {
        this.fetchLeaderboard(this.leaderboardParams);
      },
    },
  };
</script>
