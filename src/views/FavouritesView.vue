<template>
  <div class="favourites-page">
    <h1>Favourite Quotes</h1>
    <router-link to="/" class="back-link">← Back to Home</router-link>
    
    <FavouriteList :favouriteQuotes="favouriteQuotes" />
  </div>
</template>

<script>
import FavouriteList from '@/components/FavouriteList.vue'

export default {
  name: 'FavouritesView',
  components: { FavouriteList },
  data() {
    return {
      favouriteQuotes: []
    }
  },
  created() {
    this.loadFavourites()
  },
  methods: {
    loadFavourites() {
      const saved = localStorage.getItem('favouriteQuotes')
      this.favouriteQuotes = saved ? JSON.parse(saved) : []
    }
  }
}
</script>

<style scoped>
.favourites-page {
  text-align: center;
  margin-top: 50px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-link:hover {
  background: #0056b3;
}
</style>
