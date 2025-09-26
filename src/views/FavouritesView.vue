<template>
  <div class="ssd">
    <h1>Favourite Quotes</h1>
    <router-link to="/" >← Back to Home</router-link>
    
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
.ssd{
  text-align: center;
  margin-top: 50px;
}


</style>
