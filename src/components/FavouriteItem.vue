<template>
  <li>
    "{{ quote.quote }}" — <em>{{ quote.author }}</em>
    <QuoteButton label="Delete Favourite" @buttonClicked="$emit('delete-item')" />
  </li>
</template>

<script>
import QuoteButton from "./QuoteButton.vue";

export default {
  name: "FavouriteItem",
  components: { QuoteButton },
  props: { quote: Object },
};
</script>

<style scoped>
li {
  margin: 5px 0;
}
</style>
