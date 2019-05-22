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
      lastSeason() {
        return Object
          .values(this.objects('season') || {})
          .filter(season => NOW >= new Date(season.data.end))
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
