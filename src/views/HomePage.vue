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
      :isQuoteInserted="isQuoteInserted"
      :quoteInsertCount="quoteInsertCount"
      :addToFavouriteTrigger="addToFavouriteTrigger"
      @add-to-favourite="addToFavouriteCart"
    />

    <router-link to="/favourites" class="favourites-link">
      View Favourites ({{ favouriteQuotes.length }})
    </router-link>
  </div>
</template>

<script>
import QuoteDisplay from "@/components/QuoteDisplay.vue";

export default {
  components: { QuoteDisplay },
  data() {
    return {
      currentQuote: null,
      favouriteQuotes: [],
      spinner: false,
      error: null,
      isQuoteInserted: false,
      quoteInsertCount: 0,
      addToFavouriteTrigger: 0,
    };
  },
  created() {
    this.loadFavourites();
  },
  methods: {
    loadFavourites() {
      const saved = localStorage.getItem('favouriteQuotes');
      this.favouriteQuotes = saved ? JSON.parse(saved) : [];
    },
    saveFavourites() {
      localStorage.setItem('favouriteQuotes', JSON.stringify(this.favouriteQuotes));
    },
    async fetchRandomQuote() {
      this.error = null;
      this.spinner = true;
      this.quoteInsertCount = 0;
      this.addToFavouriteTrigger = 0;
      try {
        this.currentQuote = null;
        const response = await fetch("https://favqs.com/api/qotd");
        this.currentQuote = await response.json();
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
          this.currentQuote.body == quote.body
        ) {
          this.isQuoteInserted = true;
          break;
        }
      }
      if (!this.isQuoteInserted && this.quoteInsertCount == 0) {
        this.favouriteQuotes.push({
          // id: this.currentQuote._id,
          author: this.currentQuote.author,
          quote: this.currentQuote.body,
        });
        this.quoteInsertCount++;
        this.isQuoteInserted = false;
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
