<template>
  <div v-if="currentQuote">
    <p><strong>Quote:</strong> {{ currentQuote.content }}</p>
    <p><strong>Author:</strong> {{ currentQuote.author }}</p>
    <QuoteButton
      label="Add to Favourite"
      @buttonClicked="$emit('add-to-favourite')"
    />
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
import QuoteButton from "./QuoteButton.vue";

export default {
  name: "QuoteDisplay",
  components: { QuoteButton },
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
