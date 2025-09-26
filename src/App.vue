<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/favourites">Favourites</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: center;
}

</style>
.
. 
. 
. 
. 
. 
. 
. 
. 
. 
. 
. 
. 
. 
.
. 
. 
. . 
. 
. 
. 
. 

<!-- <template>
  <div id="app">
    <h1>Quote Manager</h1>
    <button v-bind:disabled="spinner" @click="fecthRandomQuote">
      generate new quote
    </button>
    
    <div v-if="spinner">Loading ......</div>
    <div v-if="error">{{ error }}</div>
    
    <div v-if="currentQuote">
      <p>Quote :</p>
      <p>{{ currentQuote.content }}</p>
      <p>Author:</p>
      <p>{{ currentQuote.author }}</p>
      <button @click="addToFavouriteCart">add to Favourite</button>
      <p v-if="isInserted || (insertCount == 1 && trigger == 1)">Inserted</p>
      <p v-if="trigger > 1">Already Inserted</p>
    </div>

    <p>Show all favourite</p>
    <button  @click="show">
      {{ ishowFavouriteQuote ? "Hide" : "Show" }}
    </button>
    <div v-if="currentQuote && ishowFavouriteQuote">
      <ul>
        <li v-for="value in favouriteQuotes" :key="value.id">{{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      currentQuote: null,
      favouriteQuotes: [],
      spinner: false,
      error: null,
      isInserted: false,
      insertCount: 0,
      ishowFavouriteQuote: false,
      trigger: 0,
    };
  },
  methods: {
    async fecthRandomQuote() {
      this.error = null;
      this.spinner = true;
      // this. ishowFavouriteQuote = false;
      this.insertCount = 0;
      this.trigger = 0;
      try {
        this.currentQuote = null;
        const response = await fetch("https://api.quotable.io/random");
        const polisedResponse = await response.json();
        this.currentQuote = polisedResponse;
      } catch (error) {
        this.error = "Try Again";
        console.log("Try again");
      } finally {
        this.spinner = false;
      }
    },
    addToFavouriteCart: function () {
      this.trigger++;
      for (const quote in this.favouriteQuotes) {
        if (
          this.currentQuote.author == quote.author &&
          this.currentQuote.content == quote.content
        ) {
          this.isInserted = true;
          break;
        }
      }
      if (!this.isInserted && this.insertCount == 0) {
        this.favouriteQuotes.push({
          author: this.currentQuote.author,
          quote: this.currentQuote.content,
        });
        this.insertCount++;
        this.isInserted = false;
      }
    },
    show: function () {
      this.ishowFavouriteQuote = !this.ishowFavouriteQuote;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
