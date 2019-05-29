<template>
  <div>
    <season-leaderboards
      :season="lastSeason"
      :awardable-only="true"
      heading="Last season’s leaderboards"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import SeasonLeaderboards from '@/components/SeasonLeaderboards.vue';

  const NOW = new Date();

  export default {
    name: 'LastSeason',
    components: {
      SeasonLeaderboards,
    },
    computed: {
      ...mapGetters({
        objects: 'objects/all',
      }),
      seasons() {
        return Object.values(this.objects('season') || {});
      },
      lastSeason() {
        return this
          .seasons
          .filter(season => NOW >= this.$toDate(season.data.end))
          .sort((a, b) => {
            if (a.data.end < b.data.end) return -1;
            if (a.data.end > b.data.end) return 1;
            return 0;
          })
          .sort((a, b) => {
            if (a.data.start < b.data.start) return -1;
            if (a.data.start > b.data.start) return 1;
            return 0;
          })
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
