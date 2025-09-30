<template>
  <div>
    <h1>Favorites</h1>
    <p>Your Saved Quotes</p>
    
    <SearchComponent 
      v-model="searchQuery"
    />

    <div v-if="searchQuery && !filteredFavorites.length">
      <p>No quotes found matching "{{ searchQuery }}"</p>
    </div>

    <FavoriteList
      v-else
      :favoriteQuotes="filteredFavorites"
      @remove-favorite="removeFavorite"
    />

    <div>
      <router-link to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";
import FavoriteList from "@/components/FavoriteList.vue";
import { store } from "@/store.js";

export default {
  name: 'FavoritesPage',
  components: { 
    SearchComponent,
    FavoriteList
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    store() {
      return store;
    },
    filteredFavorites() {
      if (!this.searchQuery) {
        return store.favoriteQuotes
      }
      
      const query = this.searchQuery.toLowerCase()
      const filtered = store.favoriteQuotes.filter(quote => 
        quote.quote.toLowerCase().includes(query) ||
        quote.author.toLowerCase().includes(query)
      )
      store.addLog(`Search query: ${this.searchQuery}`);
      store.addLog(`Filtered results: ${filtered.length}`);
      return filtered
    }
  },
  created() {
    store.addLog('Favorites page loaded');
    store.addLog(`Current favorites: ${store.favoriteQuotes.length}`);
  },
  methods: {
    removeFavorite(index) {
      if (this.searchQuery) {
        const filteredQuote = this.filteredFavorites[index]
        store.addLog(`Deleting quote: ${filteredQuote.quote}`);
        const originalIndex = store.favoriteQuotes.findIndex(quote => 
          quote.id === filteredQuote.id
        )
        store.favoriteQuotes.splice(originalIndex, 1)
      } else {
        const quoteToDelete = store.favoriteQuotes[index];
        store.addLog(`Deleting quote: ${quoteToDelete.quote}`);
        store.favoriteQuotes.splice(index, 1)
      }
    }
  }
}
</script>

