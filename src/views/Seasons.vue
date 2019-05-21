<template>
  <div class="content">
    <h1 class="title">
      Seasons
    </h1>
    <ul>
      <li
        v-for="season in seasons"
        :key="season.id"
      >
        <pre>{{ season }}</pre>
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
        return this.objects('season');
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
