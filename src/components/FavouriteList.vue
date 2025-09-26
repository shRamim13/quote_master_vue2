<template>
  <div class="favourites-container">
    <div v-if="favouriteQuotes.length" class="favorites-list">
      <FavouriteItem
        v-for="(item, index) in favouriteQuotes"
        :key="item.id"
        :quote="item"
        @delete-item="$emit('remove-favourite', index)"
      />
      
    </div>
    <div v-else class="no-favorites">
      <p>⚡ NO BRUTAL QUOTES IN COLLECTION YET</p>
    </div>
  </div>
</template>

<script>
import FavouriteItem from "./FavouriteItem.vue";

export default {
  name: "FavouriteList",
  props: { favouriteQuotes: Array },
  components: { FavouriteItem },
  emits: ['remove-favourite']
};
</script>

<style scoped>
.favourites-container {
  margin: 40px 0;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.no-favorites {
  margin: 60px 0;
  color: #ff0040;
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
  text-align: center;
}
</style>
