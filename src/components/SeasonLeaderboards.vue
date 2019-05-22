<template>
  <div v-if="season">
    <div class="season-header is-flex">
      <h1
        class="title is-3"
        v-text="heading"
      />
      <div>
        {{ formatDate(season.data.start) }}
        —
        {{ formatDate(season.data.end) }}
      </div>
    </div>
    <leaderboard
      v-for="reaction in sortedReactions(season)"
      :key="reaction.reaction"
      :season="season"
      :reaction="reaction"
      :awardable-only="awardableOnly"
      object-type-slug="season-participant"
      leaderboard-slug="season-leaderboard"
    />
  </div>
</template>

<script>
  import Leaderboard from '@/components/Leaderboard.vue';

  export default {
    name: 'SeasonLeaderboards',
    components: {
      Leaderboard,
    },
    props: {
      heading: { type: String, default: '' },
      season: { type: Object, default: () => null },
      awardableOnly: { type: Boolean, default: false },
    },
    methods: {
      formatDate(dateString) {
        const d = this.$toDate(dateString);
        return [
          d.toLocaleDateString(),
          d.toLocaleTimeString(),
        ].join(' ');
      },
      sortedReactions() {
        let reactions = {};
        let minPopularity = 0;
        try {
          reactions = this.season.aggregates.reactions.values;
          minPopularity = this.season.data.config.min_popularity;
        } catch (err) {
          return [];
        }
        return Object
          .keys(reactions)
          .reduce((memo, reaction) => {
            memo.push({ reaction, count: reactions[reaction] });
            return memo;
          }, [])
          .filter(reaction => reaction.count >= (minPopularity - 2))
          .sort((a, b) => {
            if (a.reaction < b.reaction) return -1;
            if (b.reaction < a.reaction) return 1;
            return 0;
          })
          .sort((a, b) => {
            if (a.count < b.count) return 1;
            if (b.count < a.count) return -1;
            return 0;
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .season-header {
    align-items: baseline;
    justify-content: space-between;
  }
</style>
