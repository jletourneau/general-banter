<template>
  <div class="content">
    <h1 class="title">
      Current season
    </h1>
    <template v-if="currentSeason">
      <div>
        {{ (new Date(currentSeason.data.start)).toLocaleDateString() }}
        {{ (new Date(currentSeason.data.start)).toLocaleTimeString() }}
        —
        {{ (new Date(currentSeason.data.end)).toLocaleDateString() }}
        {{ (new Date(currentSeason.data.end)).toLocaleTimeString() }}
      </div>
      <div
        v-for="reaction in sortedReactions(currentSeason)"
        :key="reaction.reaction"
      >
        <h3
          class="is-h3"
          v-text="reaction.reaction"
        />
        <leaderboard
          :grouping="groupingFor(currentSeason, reaction)"
          object-type-slug="season-participant"
          leaderboard-slug="season-leaderboard"
        />
      </div>
    </template>
    <h2 class="subtitle">
      Last season
    </h2>
    <template v-if="lastSeason">
      <div>
        {{ (new Date(lastSeason.data.start)).toLocaleDateString() }}
        {{ (new Date(lastSeason.data.start)).toLocaleTimeString() }}
        —
        {{ (new Date(lastSeason.data.end)).toLocaleDateString() }}
        {{ (new Date(lastSeason.data.end)).toLocaleTimeString() }}
      </div>
      <div
        v-for="reaction in sortedReactions(lastSeason)"
        :key="reaction.reaction"
      >
        <h3
          class="is-h3"
          v-text="reaction.reaction"
        />
        <leaderboard
          :grouping="groupingFor(lastSeason, reaction)"
          object-type-slug="season-participant"
          leaderboard-slug="season-leaderboard"
        />
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Leaderboard from '@/components/Leaderboard.vue';

  export default {
    name: 'Seasons',
    components: {
      Leaderboard,
    },
    computed: {
      ...mapGetters({
        objects: 'objects/all',
      }),
      seasons() {
        return Object.values(this.objects('season') || {});
      },
      currentSeasons() {
        return this.seasons.filter(season => this.isCurrent(season)).reverse();
      },
      currentSeason() {
        return this.currentSeasons[0];
      },
      pastSeasons() {
        return this.seasons.filter(season => this.isPast(season)).reverse();
      },
      lastSeason() {
        return this.pastSeasons[0];
      },
    },
    mounted() {
      this.getSeasons();
    },
    methods: {
      ...mapActions({
        getObjects: 'objects/lazyList',
      }),
      groupingFor(season, reaction) {
        return {
          channel: season.data.channel.id,
          season: season.id,
          reaction: reaction.reaction,
        };
      },
      isCurrent(season) {
        const seasonStart = new Date(season.data.start);
        const seasonEnd = new Date(season.data.end);
        const now = new Date();
        return (seasonStart <= now) && (seasonEnd > now);
      },
      isPast(season) {
        const seasonEnd = new Date(season.data.end);
        const now = new Date();
        return (seasonEnd <= now);
      },
      sortedReactions(season) {
        let reactions = {};
        let minPopularity = 0;
        try {
          reactions = season.aggregates.reactions.values;
          minPopularity = season.data.config.min_popularity;
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
      getSeasons() {
        this.getObjects({
          slug: 'season',
          params: {
            count: 100,
            fields: ['data', 'aggregates'],
          },
        });
      },
    },
  };
</script>
