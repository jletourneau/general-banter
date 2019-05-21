<template>
  <div class="content">
    <h1 class="title">
      Current Season
    </h1>
    <ul>
      <li
        v-for="season in currentSeasons"
        :key="season.id"
      >
        <div>
          {{ new Date(season.data.start) }} —
          {{ new Date(season.data.end) }}
        </div>
        <div>
          Season ID: {{ season.id }}
        </div>
        <div>
          Channel ID: {{ season.data.channel.id }}
        </div>
        <ul>
          <li
            v-for="reaction in sortedReactions(season)"
            :key="reaction.reaction"
          >
            {{ reaction.reaction }}: {{ reaction.count }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Seasons',
    computed: {
      ...mapGetters({
        objects: 'objects/all',
      }),
      seasons() {
        return Object.values(this.objects('season') || {});
      },
      currentSeasons() {
        return this.seasons.filter(season => this.isCurrent(season));
      },
    },
    mounted() {
      this.getSeasons();
    },
    methods: {
      ...mapActions({
        getObjects: 'objects/lazyList',
      }),
      isCurrent(season) {
        const seasonStart = new Date(season.data.start);
        const seasonEnd = new Date(season.data.end);
        const now = new Date();
        return (seasonStart <= now) && (seasonEnd > now);
      },
      sortedReactions(season) {
        const reactions = season.aggregates.reactions.values;
        return Object.keys(reactions).reduce((memo, reaction) => {
          memo.push({ reaction, count: reactions[reaction] });
          return memo;
        }, []).sort((a, b) => {
          if (a.reaction < b.reaction) return -1;
          if (b.reaction < a.reaction) return 1;
          return 0;
        }).sort((a, b) => {
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
