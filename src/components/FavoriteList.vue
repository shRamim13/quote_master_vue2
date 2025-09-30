<template>
  <div>
    <div v-if="favoriteQuotes.length">
      <FavoriteItem
        v-for="(item, index) in favoriteQuotes"
        :key="item.id"
        :quote="item"
        @delete-item="$emit('remove-favorite', index)"
      />
    </div>
    <div v-else>
      <p>No quotes in collection yet</p>
    </div>
  </div>
</template>

<script>
import FavoriteItem from "./FavoriteItem.vue";

export default {
  name: "FavoriteList",
  props: { favoriteQuotes: Array },
  components: { FavoriteItem },
  emits: ['remove-favorite']
};
</script>

