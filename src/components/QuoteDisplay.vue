<template>
  <div v-if="currentQuote">
    <p><strong>Quote:</strong> {{ currentQuote.content }}</p>
    <p><strong>Author:</strong> {{ currentQuote.author }}</p>
    <button @click="$emit('add-to-favourite')">Add to Favourite</button>

    <p
      v-if="
        isQuoteInserted ||
        (quoteInsertCount === 1 && addToFavouriteTrigger === 1)
      "
    >
      Inserted
    </p>
    <p v-if="addToFavouriteTrigger > 1">Already Inserted</p>
  </div>
</template>

<script>
export default {
  name: "QuoteDisplay",
  props: {
    currentQuote: Object,
    isQuoteInserted: Boolean,
    quoteInsertCount: Number,
    addToFavouriteTrigger: Number,
  },
};
</script>

<style scoped>
p {
  margin: 5px 0;
}
</style>
