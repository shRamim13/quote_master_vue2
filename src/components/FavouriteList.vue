<template>
  <div v-if="favouriteQuotes.length">
    <h3>Favourite Quotes</h3>
    <ul>
      <FavouriteItem
        v-for="(item, index) in favouriteQuotes"
        :key="index"
        :quote="item"
        @delete-item="$emit('remove-favourite', index)"
      />
    </ul>
  </div>
  <div v-else>
    <p>No favourites yet.</p>
  </div>
</template>

<script>
import FavouriteItem from "./FavouriteItem.vue";

export default {
  name: "FavouriteList",
  props: { favouriteQuotes: Array },
  components: { FavouriteItem },
};
</script>
