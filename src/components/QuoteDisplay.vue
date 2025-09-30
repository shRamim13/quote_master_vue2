<template>
  <div>
    <div>
      <blockquote>
        "{{ currentQuote.quote.body }}"
      </blockquote>
      <cite>— {{ currentQuote.quote.author }}</cite>
    </div>

    <div>
      <QuoteButton
        label="Add to Favorites"
        @buttonClicked="$emit('add-to-favorite')"
      />

      <div>
        <p
          v-if="
            isQuoteInserted ||
            (quoteInsertCount === 1 && addToFavoriteTrigger === 1)
          "
        >
          Added to Favorites!
        </p>
        <p v-if="addToFavoriteTrigger > 1">
          Already in Favorites
        </p>
      </div>
    </div>
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
    addToFavoriteTrigger: Number,
  },
};
</script>

