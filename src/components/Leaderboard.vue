<template>
  <div
    v-if="showLeaderboard"
    :class="{ 'is-success': isAwardable }"
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
      <span>
        {{ reaction.reaction }}
      </span>
    </h2>
    <table class="table is-narrow is-striped is-fullwidth">
      <col width="50" />
      <col width="200" />
      <col />
      <col width="100" />
      <col width="100" />
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Tagline</th>
          <th>Count</th>
          <th>Rewards</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(leader, index) in leaders"
          :key="leader.member"
          :class="{ 'reward': rewardsFor(index) }"
        >
          <td>
            {{ leader.rank }}.
          </td>
          <td v-text="leader.object.owner.account.identity.username" />
          <td v-text="taglineFor(leader)" />
          <td v-text="leader.object.data.reaction.counter" />
          <td>
            <template v-if="rewardsFor(index)">
              ⭐{{ rewardsFor(index) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!enoughLeaders">
      Not enough members of this leaderboard for rewards.
    </div>
    <div v-else-if="!enoughReacts">
      Leader has not accumulated enough reactions for rewards.
    </div>
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
      awardableOnly: { type: Boolean, default: false },
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
      showLeaderboard() {
        if (this.awardableOnly) return this.isAwardable;
        return true;
      },
      enoughLeaders() {
        try {
          return this.leaders.length >= this.season.data.config.min_popularity;
        } catch (err) {
          return false;
        }
      },
      enoughReacts() {
        try {
          const { counter } = this.leaders[0].object.data.reaction;
          const { min_activity: minActivity } = this.season.data.config;
          return counter >= minActivity;
        } catch (err) {
          return false;
        }
      },
      isAwardable() {
        return this.enoughLeaders && this.enoughReacts;
      },
      rewardCount() {
        try {
          return this.season.data.config.rewards.length;
        } catch (err) {
          return 0;
        }
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
      taglineFor(leader) {
        try {
          return leader.object.owner.account.server_data.tag_data.tagline;
        } catch (err) {
          return '';
        }
      },
      emojiFor(reaction) {
        const modifierStripped = reaction.split('::')[0];
        return DEFAULT_REACTS[modifierStripped] || null;
      },
      imageFor(reaction) {
        return CUSTOM_REACTS[reaction] || null;
      },
      rewardsFor(index) {
        if (!this.isAwardable) return 0;
        try {
          return this.season.data.config.rewards[index].currency;
        } catch (err) {
          return 0;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .title {
    align-items: center;
    margin-bottom: 1rem;
  }
  .react {
    margin-right: 0.5rem;
    font-size: 3rem;
  }
  .react.custom {
    height: 3rem;
  }
  .reward td {
    background: transparentize($green, 0.8);
  }
</style>
