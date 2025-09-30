<template>
  <div>
    <h1>Quote Master</h1>
    <p>Daily Wisdom</p>

    <div>
      <div v-if="!error">
        <QuoteButton
          @click.native="fetchRandomQuote"
          :disabled="spinner"
          label="Generate Quote"
        />
      </div>

      <div v-if="spinner">
        <p>Loading...</p>
      </div>

      <div v-if="error">
        <p>{{ error }}</p>
        <QuoteButton
          @buttonClicked="fetchRandomQuote"
          label="Retry"
        />
      </div>
      <div v-if="currentQuote">
        <QuoteDisplay
          :currentQuote="currentQuote"
          :isQuoteInserted="isQuoteInserted"
          :quoteInsertCount="quoteInsertCount"
          :addToFavoriteTrigger="addToFavoriteTrigger"
          @add-to-favorite="addToFavoriteCart"
        />
      </div>
    </div>

    <div>
      <div>
        <h3>Favorites</h3>
        <p>{{ store.favoriteQuotes.length }} Saved Quotes</p>
      </div>

      <QuoteButton
        :label="
          store.favoriteQuotes.length > 0
            ? 'View Favorites'
            : 'No Quotes Yet'
        "
        :disabled="spinner || store.favoriteQuotes.length === 0"
        @buttonClicked="goToFavorites"
      />
      
      <div>
        <router-link to="/logs">View Activity Logs</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteDisplay from "@/components/QuoteDisplay.vue";
import QuoteButton from "@/components/QuoteButton.vue";
import { store } from "@/store.js";

export default {
  components: { QuoteDisplay, QuoteButton },
  data() {
    return {
      currentQuote: null,
      spinner: false,
      error: null,
      isQuoteInserted: false,
      quoteInsertCount: 0,
      showFavorites: false,
      addToFavoriteTrigger: 0,
    };
  },
  computed: {
    store() {
      return store;
    }
  },
  methods: {
    async fetchRandomQuote() {
      this.error = null;
      this.spinner = true;
      this.quoteInsertCount = 0;
      this.addToFavoriteTrigger = 0;
      store.addLog('Generating new quote...');
      try {
        this.currentQuote = null;
        const response = await fetch("/api/qotd");
        const polishedResponse = await response.json();
        store.addLog(`Quote generated: ${polishedResponse.quote.body}`);
        this.currentQuote = polishedResponse;
      } catch (error) {
        store.addLog(`Error generating quote: ${error.message}`);
        this.error = "Try Again";
      } finally {
        this.spinner = false;
      }
    },
    addToFavoriteCart: function () {
      this.addToFavoriteTrigger++;
      for (const quote in store.favoriteQuotes) {
        if (
          this.currentQuote.quote.author == quote.author &&
          this.currentQuote.quote.body == quote.quote
        ) {
          this.isQuoteInserted = true;
          break;
        }
      }
      if (!this.isQuoteInserted && this.quoteInsertCount == 0) {
        const newFavorite = {
          id: this.currentQuote.quote.id,
          author: this.currentQuote.quote.author,
          quote: this.currentQuote.quote.body,
        };
        store.favoriteQuotes.push(newFavorite);
        store.addLog(`Quote added to favorites: ${newFavorite.quote}`);
        store.addLog(`Total favorites: ${store.favoriteQuotes.length}`);
        this.quoteInsertCount++;
        this.isQuoteInserted = false;
      } else {
        store.addLog('Quote already in favorites or already added');
      }
    },
    toggleFavorites() {
      this.showFavorites = !this.showFavorites;
    },
    deleteFavoriteQuote(index) {
      store.favoriteQuotes.splice(index, 1);
    },
    goToFavorites() {
      store.addLog('Going to favorites page');
      store.addLog(`Current favorites count: ${store.favoriteQuotes.length}`);
      this.$router.push("/favorites");
    }
  },
};
</script>

