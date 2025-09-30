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
        <p>{{ favoriteQuotes.length }} Saved Quotes</p>
      </div>

      <QuoteButton
        :label="
          favoriteQuotes.length > 0
            ? 'View Favorites'
            : 'No Quotes Yet'
        "
        :disabled="spinner || favoriteQuotes.length === 0"
        @buttonClicked="goToFavorites"
      />
    </div>
  </div>
</template>

<script>
import QuoteDisplay from "@/components/QuoteDisplay.vue";
import QuoteButton from "@/components/QuoteButton.vue";

export default {
  components: { QuoteDisplay, QuoteButton },
  data() {
    return {
      currentQuote: null,
      favoriteQuotes: [],
      spinner: false,
      error: null,
      isQuoteInserted: false,
      quoteInsertCount: 0,
      showFavorites: false,
      addToFavoriteTrigger: 0,
    };
  },
  created() {
    this.loadFavorites();
  },
  methods: {
    async fetchRandomQuote() {
      this.error = null;
      this.spinner = true;
      this.quoteInsertCount = 0;
      this.addToFavoriteTrigger = 0;
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
    addToFavoriteCart: function () {
      this.addToFavoriteTrigger++;
      for (const quote in this.favoriteQuotes) {
        if (
          this.currentQuote.quote.author == quote.author &&
          this.currentQuote.quote.body == quote.quote
        ) {
          this.isQuoteInserted = true;
          break;
        }
      }
      if (!this.isQuoteInserted && this.quoteInsertCount == 0) {
        this.favoriteQuotes.push({
          id: this.currentQuote.quote.id,
          author: this.currentQuote.quote.author,
          quote: this.currentQuote.quote.body,
        });
        this.quoteInsertCount++;
        this.isQuoteInserted = false;
        this.saveFavorites();
      }
    },
    toggleFavorites() {
      this.showFavorites = !this.showFavorites;
    },
    deleteFavoriteQuote(index) {
      this.favoriteQuotes.splice(index, 1);
    },
    goToFavorites() {
      this.$router.push("/favorites");
    },
    loadFavorites() {
      const saved = localStorage.getItem("favoriteQuotes");
      this.favoriteQuotes = saved ? JSON.parse(saved) : [];
    },
    saveFavorites() {
      localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(this.favoriteQuotes)
      );
    },
  },
};
</script>

