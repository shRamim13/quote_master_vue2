<template>
  <div class="akm">
    <h1>Quote Manager</h1>

    <button :disabled="spinner" @click="fetchRandomQuote">
      Generate New Quote
    </button>

    <div v-if="spinner">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <QuoteDisplay
      v-if="currentQuote"
      :currentQuote="currentQuote"
      :isQouteInserted="isQouteInserted"
      :quoteInsertCount="quoteInsertCount"
      :addToFavouriteTrigger="addToFavouriteTrigger"
      @add-to-favourite="addToFavouriteCart"
    />

    <h3>Show all favourites</h3>
    <button @click="toggleFavourites">
      {{ showFavourites ? "Hide" : "Show" }}
    </button>

    <FavouriteList v-if="showFavourites" :favouriteQuotes="favouriteQuotes" />
  </div>
</template>

<script>
import QuoteDisplay from "@/components/QuoteDisplay.vue";
import FavouriteList from "@/components/FavouriteList.vue";

export default {
  components: { QuoteDisplay, FavouriteList },
  data() {
    return {
      currentQuote: null,
      favouriteQuotes: [],
      spinner: false,
      error: null,
      isQouteInserted: false,
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
      this.trigger = 0;
      try {
        this.currentQuote = null;
        const response = await fetch("https://api.quotable.io/random");
        const polisedResponse = await response.json();
        this.currentQuote = polisedResponse;
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
          this.currentQuote.author == quote.author &&
          this.currentQuote.content == quote.content
        ) {
          this.isQouteInserted = true;
          break;
        }
      }
      if (!this.isQouteInserted && this.quoteInsertCount == 0) {
        this.favouriteQuotes.push({
          author: this.currentQuote.author,
          content: this.currentQuote.content,
        });
        this.quoteInsertCount++;
        this.isQouteInserted = false;
      }
    },
    toggleFavourites() {
      this.showFavourites = !this.showFavourites;
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
