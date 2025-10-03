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
import { mapState } from 'vuex';

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
    ...mapState(['favoriteQuotes']),
    filteredFavorites() {
      if (!this.searchQuery) {
        return this.favoriteQuotes
      }
      
      const query = this.searchQuery.toLowerCase()
      const filtered = this.favoriteQuotes.filter(quote => 
        quote.quote.toLowerCase().includes(query) ||
        quote.author.toLowerCase().includes(query)
      )
      this.$store.commit('ADD_LOG', `Search query: ${this.searchQuery}`);
      return filtered
    }
  },
  created() {
    this.$store.commit('ADD_LOG', 'Favorites page loaded');
  },
  methods: {
    
    removeFavorite(index) {
      if (this.searchQuery) {
        const filteredQuote = this.filteredFavorites[index]
        this.$store.commit('ADD_LOG', `Deleting quote: ${filteredQuote.quote}`);
        const originalIndex = this.favoriteQuotes.findIndex(quote => 
          quote.id === filteredQuote.id
        )
        this.$store.commit('REMOVE_FAVORITE', originalIndex)
      } else {
        const quoteToDelete = this.favoriteQuotes[index];
        this.$store.commit('ADD_LOG', `Deleting quote: ${quoteToDelete.quote}`);
        this.$store.commit('REMOVE_FAVORITE', index)
      }
    }
  }
}
</script>

