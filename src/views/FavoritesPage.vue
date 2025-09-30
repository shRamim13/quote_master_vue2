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

export default {
  name: 'FavoritesPage',
  components: { 
    SearchComponent,
    FavoriteList
  },
  data() {
    return {
      searchQuery: '',
      favoriteQuotes: []
    }
  },
  computed: {
    filteredFavorites() {
      if (!this.searchQuery) {
        return this.favoriteQuotes
      }
      
      const query = this.searchQuery.toLowerCase()
      return this.favoriteQuotes.filter(quote => 
        quote.quote.toLowerCase().includes(query) ||
        quote.author.toLowerCase().includes(query)
      )
    }
  },
  created() {
    this.loadFavorites()
  },
  methods: {
    loadFavorites() {
      const saved = localStorage.getItem('favoriteQuotes')
      this.favoriteQuotes = saved ? JSON.parse(saved) : []
    },
    removeFavorite(index) {
      if (this.searchQuery) {
        const filteredQuote = this.filteredFavorites[index]
        const originalIndex = this.favoriteQuotes.findIndex(quote => 
          quote.id === filteredQuote.id
        )
        this.favoriteQuotes.splice(originalIndex, 1)
      } else {
        this.favoriteQuotes.splice(index, 1)
      }
      localStorage.setItem('favoriteQuotes', JSON.stringify(this.favoriteQuotes))
    }
  }
}
</script>

