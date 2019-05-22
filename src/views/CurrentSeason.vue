<template>
  <div>
    <season-leaderboards
      :season="currentSeason"
      heading="Current season’s leaderboards"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import SeasonLeaderboards from '@/components/SeasonLeaderboards.vue';

  const NOW = new Date();

  export default {
    name: 'CurrentSeason',
    components: {
      SeasonLeaderboards,
    },
    computed: {
      ...mapGetters({
        objects: 'objects/all',
      }),
      currentSeason() {
        return Object
          .values(this.objects('season') || {})
          .filter(season => NOW >= this.$toDate(season.data.start))
          .filter(season => NOW < this.$toDate(season.data.end))
          .reverse()[0];
      },
    },
    mounted() {
      this.getSeasons();
    },
    methods: {
      ...mapActions({
        getObjects: 'objects/lazyList',
      }),
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
