<template>
  <div class="akm">
    <h1>Quote Manager</h1>

    <QuoteButton
      @click.native="fetchRandomQuote"
      :disabled="spinner"
      label="Generate New Quote"
    />

    <div v-if="spinner">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <QuoteDisplay
      v-if="currentQuote"
      :currentQuote="currentQuote"
      :isQuoteInserted="isQuoteInserted"
      :quoteInsertCount="quoteInsertCount"
      :addToFavouriteTrigger="addToFavouriteTrigger"
      @add-to-favourite="addToFavouriteCart"
    />

    <h3>Show all favourites</h3>

    <QuoteButton
      :label="showFavourites ? 'Hide' : 'Show'"
      :disabled="spinner"
      @click.native="toggleFavourites"
    />

    <FavouriteList
      v-if="showFavourites"
      :favouriteQuotes="favouriteQuotes"
      @remove-favourite="deleteFavouriteQuote"
    />
  </div>
</template>

<script>
import QuoteDisplay from "@/components/QuoteDisplay.vue";
import FavouriteList from "@/components/FavouriteList.vue";
import QuoteButton from "@/components/QuoteButton.vue";

export default {
  components: { QuoteDisplay, FavouriteList, QuoteButton },
  data() {
    return {
      currentQuote: null,
      favouriteQuotes: [],
      spinner: false,
      error: null,
      isQuoteInserted: false,
      quoteInsertCount: 0,
      showFavourites: false,
      addToFavouriteTrigger: 0,
    };
  },
  methods: {
    async fetchRandomQuote() {
      this.error = null;
      this.spinner = true;
      this.quoteInsertCount = 0;
      this.addToFavouriteTrigger = 0;
      try {
        this.currentQuote = null;
        const response = await fetch("/api/qotd");
        const polishedResponse = await response.json();
        console.log(polishedResponse);
        this.currentQuote = polishedResponse;
      } catch (error) {
        this.error = "Try Again";
      } finally {
        this.spinner = false;
      }
    },
    addToFavouriteCart: function () {
      this.addToFavouriteTrigger++;
      for (const quote in this.favouriteQuotes) {
        if (
          this.currentQuote.quote.author == quote.author &&
          this.currentQuote.quote.body == quote.quote
        ) {
          this.isQuoteInserted = true;
          break;
        }
      }
      if (!this.isQuoteInserted && this.quoteInsertCount == 0) {
        this.favouriteQuotes.push({
          id: this.currentQuote.quote.id,
          author: this.currentQuote.quote.author,
          quote: this.currentQuote.quote.body,
        });
        this.quoteInsertCount++;
        this.isQuoteInserted = false;
      }
    },
    toggleFavourites() {
      this.showFavourites = !this.showFavourites;
    },
    deleteFavouriteQuote(index) {
      this.favouriteQuotes.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.akm {
  text-align: center;
  margin-top: 50px;
}
</style>



