<template>
  <div
    class="box"
  >
    <h2
      class="title is-flex is-4"
    >
      <span
        v-if="emojiFor(reaction.reaction)"
        class="react default"
      >
        {{ emojiFor(reaction.reaction) }}
      </span>
      <img
        v-else-if="imageFor(reaction.reaction)"
        :src="imageFor(reaction.reaction)"
        class="react custom"
        alt=""
      />
      <span>{{ reaction.reaction }}</span>
    </h2>
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

  import DEFAULT_REACTS from '@/data/emoji-mapping';
  import CUSTOM_REACTS from '@/data/custom-mapping';

  export default {
    name: 'Leaderboard',
    props: {
      objectTypeSlug: { type: String, default: '' },
      leaderboardSlug: { type: String, default: '' },
      season: { type: Object, default: () => {} },
      reaction: { type: Object, default: () => {} },
    },
    computed: {
      ...mapGetters({
        leaderboard: 'leaderboards/get',
      }),
      leaders() {
        return this.leaderboard(this.leaderboardParams);
      },
      leaderboardParams() {
        return {
          objectTypeSlug: this.objectTypeSlug,
          leaderboard: this.leaderboardSlug,
          grouping: {
            channel: this.season.data.channel.id,
            season: this.season.id,
            reaction: this.reaction.reaction,
          },
        };
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
      emojiFor(reaction) {
        return DEFAULT_REACTS[reaction] || null;
      },
      imageFor(reaction) {
        return CUSTOM_REACTS[reaction] || null;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    align-items: center;
  }
  .react {
    margin-right: 0.5rem;
    font-size: 3rem;
  }
  .react.custom {
    height: 3rem;
  }
</style>
