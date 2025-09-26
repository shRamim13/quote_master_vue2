<template>
  <div class="favorites-page">
    <div class="brutal-header">
      <h1 class="brutal-title">💀 BRUTAL COLLECTION</h1>
      <p class="brutal-subtitle">YOUR SAVAGE WISDOM VAULT</p>
      <div class="header-accent"></div>
    </div>
    
    <SearchComponent 
      v-model="searchQuery"
    />

    <div v-if="searchQuery && !filteredFavorites.length" class="no-results">
      <p>💀 NO BRUTAL QUOTES FOUND MATCHING "{{ searchQuery }}"</p>
    </div>

    <FavouriteList
      v-else
      :favouriteQuotes="filteredFavorites"
      @remove-favourite="removeFavorite"
    />

    <div class="navigation">
      <router-link to="/" class="brutal-back-btn">⚡ BACK TO BRUTALITY</router-link>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";
import FavouriteList from "@/components/FavouriteList.vue";

export default {
  name: 'FavoritesPage',
  components: { 
    SearchComponent,
    FavouriteList
  },
  data() {
    return {
      searchQuery: '',
      favouriteQuotes: []
    }
  },
  computed: {
    filteredFavorites() {
      if (!this.searchQuery) {
        return this.favouriteQuotes
      }
      
      const query = this.searchQuery.toLowerCase()
      return this.favouriteQuotes.filter(quote => 
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
      this.favouriteQuotes = saved ? JSON.parse(saved) : []
    },
    removeFavorite(index) {
      this.favouriteQuotes.splice(index, 1)
      localStorage.setItem('favoriteQuotes', JSON.stringify(this.favouriteQuotes))
    }
  }
}
</script>

<style scoped>
.favorites-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.2);
}

.brutal-header {
  background: linear-gradient(135deg, #ff0040 0%, #990025 50%, #000000 100%);
  color: #ffffff;
  padding: 50px 30px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.brutal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
  animation: sweep 3s infinite;
}

@keyframes sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.brutal-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 15px;
  text-shadow: 
    0 0 10px rgba(255, 0, 64, 0.8),
    0 0 20px rgba(255, 0, 64, 0.6),
    0 0 30px rgba(255, 0, 64, 0.4);
  letter-spacing: 3px;
  text-transform: uppercase;
}

.brutal-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.header-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff0040, #00ff80, #0080ff, #ff0040);
  background-size: 400% 100%;
  animation: rainbow 2s linear infinite;
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

.no-results {
  margin: 60px 0;
  color: #ff0040;
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
  text-align: center;
}

.navigation {
  margin-top: 50px;
}

.brutal-back-btn {
  display: inline-block;
  padding: 18px 35px;
  background: linear-gradient(135deg, #ff0040 0%, #990025 50%, #660016 100%);
  color: #ffffff;
  text-decoration: none;
  border: 2px solid #ff0040;
  font-weight: 900;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.brutal-back-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.brutal-back-btn:hover::before {
  left: 100%;
}

.brutal-back-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 0 50px rgba(255, 0, 64, 0.6),
    0 10px 30px rgba(255, 0, 64, 0.3);
  border-color: #ff3366;
}

@media (max-width: 768px) {
  .brutal-title {
    font-size: 2.2rem;
  }
}
</style>
