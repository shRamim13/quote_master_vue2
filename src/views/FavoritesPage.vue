<template>
  <div class="favorites-page">
    <div class="brutal-header">
      <h1 class="brutal-title">💀 BRUTAL COLLECTION</h1>
      <p class="brutal-subtitle">YOUR SAVAGE WISDOM VAULT</p>
      <div class="header-accent"></div>
    </div>
    
    <div class="search-section">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 SEARCH BRUTAL QUOTES..."
        class="brutal-search"
      />
    </div>

    <div v-if="filteredFavorites.length" class="favorites-list">
      <div 
        v-for="(quote, index) in filteredFavorites" 
        :key="quote.id" 
        class="brutal-quote-item"
      >
        <div class="quote-content">
          <p class="brutal-quote-text">"{{ quote.quote }}"</p>
          <p class="brutal-quote-author">— {{ quote.author }}</p>
        </div>
        <button @click="removeFavorite(index)" class="brutal-delete-btn">⚡ DESTROY</button>
      </div>
    </div>

    <div v-else-if="searchQuery" class="no-results">
      <p>💀 NO BRUTAL QUOTES FOUND MATCHING "{{ searchQuery }}"</p>
    </div>

    <div v-else class="no-favorites">
      <p>⚡ NO BRUTAL QUOTES IN COLLECTION YET</p>
    </div>

    <div class="navigation">
      <router-link to="/" class="brutal-back-btn">⚡ BACK TO BRUTALITY</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesPage',
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
      this.favoriteQuotes.splice(index, 1)
      localStorage.setItem('favoriteQuotes', JSON.stringify(this.favoriteQuotes))
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

.search-section {
  margin: 40px 0;
}

.brutal-search {
  width: 100%;
  max-width: 500px;
  padding: 15px 25px;
  border: 2px solid #ff0040;
  border-radius: 0;
  font-size: 1.1rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.brutal-search:focus {
  outline: none;
  border-color: #00ff80;
  box-shadow: 0 0 20px rgba(0, 255, 128, 0.4);
}

.brutal-search::placeholder {
  color: #666;
  text-transform: uppercase;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 40px 0;
}

.brutal-quote-item {
  background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 30px;
  border: 2px solid #00ff80;
  position: relative;
  overflow: hidden;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.brutal-quote-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 128, 0.03) 50%, transparent 70%);
  pointer-events: none;
}

.quote-content {
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.brutal-quote-text {
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 15px;
  color: #ffffff;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.brutal-quote-author {
  font-weight: 700;
  color: #00ff80;
  margin-bottom: 20px;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 
    0 0 10px rgba(0, 255, 128, 0.8),
    0 0 20px rgba(0, 255, 128, 0.6);
}

.brutal-delete-btn {
  background: linear-gradient(135deg, #ff6600 0%, #cc3300 100%);
  color: #ffffff;
  border: 2px solid #ff6600;
  padding: 12px 25px;
  border-radius: 0;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
}

.brutal-delete-btn:hover {
  background: linear-gradient(135deg, #ff8833 0%, #ff3300 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.5);
}

.no-results, .no-favorites {
  margin: 60px 0;
  color: #ff0040;
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
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
  
  .brutal-quote-item {
    padding: 20px;
  }
  
  .brutal-quote-text {
    font-size: 1.1rem;
  }
  
  .brutal-search {
    font-size: 1rem;
    padding: 12px 20px;
  }
}
</style>
