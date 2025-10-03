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
      
      <div>
        <router-link to="/logs">View Activity Logs</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteDisplay from "@/components/QuoteDisplay.vue";
import QuoteButton from "@/components/QuoteButton.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: { QuoteDisplay, QuoteButton },
  data() {
    return {
      isQuoteInserted: false,
      quoteInsertCount: 0,
      showFavorites: false,
      addToFavoriteTrigger: 0,
    };
  },
  computed: {
    ...mapState(['favoriteQuotes', 'currentQuote', 'spinner', 'error'])
  },
  methods: {
    ...mapActions(['fetchRandomQuote']),
    
    async fetchRandomQuote() {
      this.quoteInsertCount = 0;
      this.addToFavoriteTrigger = 0;
      this.isQuoteInserted = false;
      await this.$store.dispatch('fetchRandomQuote');
    },
    
    addToFavoriteCart: function () {
      this.addToFavoriteTrigger++;
      this.isQuoteInserted = false;
      
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
        const newFavorite = {
          id: this.currentQuote.quote.id,
          author: this.currentQuote.quote.author,
          quote: this.currentQuote.quote.body,
        };
        this.$store.commit('ADD_FAVORITE', newFavorite);
        this.$store.commit('ADD_LOG', `Quote added to favorites: ${newFavorite.quote}`);
        this.$store.commit('ADD_LOG', `Total favorites: ${this.favoriteQuotes.length + 1}`);
        this.quoteInsertCount++;
      } else {
        this.$store.commit('ADD_LOG', 'Quote already in favorites or already added');
      }
    },
    toggleFavorites() {
      this.showFavorites = !this.showFavorites;
    },
    deleteFavoriteQuote(index) {
      this.$store.commit('REMOVE_FAVORITE', index);
    },
    goToFavorites() {
      this.$store.commit('ADD_LOG', 'Going to favorites page');
      this.$store.commit('ADD_LOG', `Current favorites count: ${this.favoriteQuotes.length}`);
      this.$router.push("/favorites");
    }
  },
};
</script>

