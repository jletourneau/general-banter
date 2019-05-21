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
    <div
      v-for="reaction in sortedReactions(season)"
      :key="reaction.reaction"
      class="box"
    >
      <h2
        class="title is-4"
        v-text="reaction.reaction"
      />
      <leaderboard
        :grouping="groupingFor(reaction)"
        object-type-slug="season-participant"
        leaderboard-slug="season-leaderboard"
      />
    </div>
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
    },
    methods: {
      formatDate(dateString) {
        const d = new Date(dateString);
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
          .filter(reaction => reaction.count >= minPopularity)
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
      groupingFor(reaction) {
        return {
          channel: this.season.data.channel.id,
          season: this.season.id,
          reaction: reaction.reaction,
        };
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
