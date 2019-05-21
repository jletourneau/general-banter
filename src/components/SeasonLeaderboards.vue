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
      <leaderboard
        :grouping="groupingFor(reaction)"
        :season="season"
        object-type-slug="season-participant"
        leaderboard-slug="season-leaderboard"
      />
    </div>
  </div>
</template>

<script>
  import Leaderboard from '@/components/Leaderboard.vue';

  import DEFAULT_REACTS from '@/data/emoji-mapping';
  import CUSTOM_REACTS from '@/data/custom-mapping';

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
      emojiFor(reaction) {
        return DEFAULT_REACTS[reaction] || null;
      },
      imageFor(reaction) {
        return CUSTOM_REACTS[reaction] || null;
      },
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
  .title {
    display: flex;
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
