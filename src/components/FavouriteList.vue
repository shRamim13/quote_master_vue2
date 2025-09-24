<template>
  <div v-if="favouriteQuotes && favouriteQuotes.length > 0">
    <h3>Favourite Quotes</h3>
    <ul>
      <li v-for="quote in favouriteQuotes" :key="id">
        "{{ quote.content }}" ------ {{ quote.author }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No favourites yet.</p>
  </div>
</template>

<script>
export default {
  props: {
    favouriteQuotes: Array,
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>
