<template>
  <div class="home-container">
    <div class="card">
      <header class="header">
        <h1 class="title">⚡ QUOTE MASTER ⚡</h1>
        <p class="subtitle">BRUTAL WISDOM FROM THE DEPTHS</p>
        <div class="header-accent"></div>
      </header>

      <div class="main-content">
        <div class="quote-section">
          <div v-if="!error">
            <QuoteButton
              @click.native="fetchRandomQuote"
              :disabled="spinner"
              label="🔥 GENERATE BRUTAL QUOTE"
              class="generate-btn"
            />
          </div>

          <div v-if="spinner" class="loading">
            <div class="spinner"></div>
            <p>LOADING BRUTAL WISDOM...</p>
          </div>

          <div v-if="error" class="error-message">
            <p>💀 {{ error }}</p>
            <QuoteButton
              @buttonClicked="fetchRandomQuote"
              label="⚡ RETRY"
              class="retry-btn"
            />
          </div>
          <div v-if="currentQuote">
            <QuoteDisplay
              :currentQuote="currentQuote"
              :isQuoteInserted="isQuoteInserted"
              :quoteInsertCount="quoteInsertCount"
              :addToFavouriteTrigger="addToFavouriteTrigger"
              @add-to-favourite="addToFavouriteCart"
            />
          </div>
        </div>

        <div class="favorites-section">
          <div class="favorites-header">
            <h3>💀 BRUTAL COLLECTION</h3>
            <p class="favorites-count">
              {{ favouriteQuotes.length }} SAVED QUOTES
            </p>
          </div>

          <QuoteButton
            :label="
              favouriteQuotes.length > 0
                ? '⚡ VIEW BRUTAL COLLECTION'
                : '💀 NO BRUTAL QUOTES YET'
            "
            :disabled="spinner || favouriteQuotes.length === 0"
            @buttonClicked="goToFavorites"
            class="favorites-btn"
          />
        </div>
      </div>
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
      favouriteQuotes: [],
      spinner: false,
      error: null,
      isQuoteInserted: false,
      quoteInsertCount: 0,
      showFavourites: false,
      addToFavouriteTrigger: 0,
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
      this.addToFavouriteTrigger = 0;
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
    addToFavouriteCart: function () {
      this.addToFavouriteTrigger++;
      for (const quote in this.favouriteQuotes) {
        if (
          this.currentQuote.quote.author == quote.author &&
          this.currentQuote.quote.body == quote.quote
        ) {
          this.isQuoteInserted = true;
          break;
        }
      }
      if (!this.isQuoteInserted && this.quoteInsertCount == 0) {
        this.favouriteQuotes.push({
          id: this.currentQuote.quote.id,
          author: this.currentQuote.quote.author,
          quote: this.currentQuote.quote.body,
        });
        this.quoteInsertCount++;
        this.isQuoteInserted = false;
        this.saveFavorites();
      }
    },
    toggleFavourites() {
      this.showFavourites = !this.showFavourites;
    },
    deleteFavouriteQuote(index) {
      this.favouriteQuotes.splice(index, 1);
    },
    goToFavorites() {
      this.$router.push("/favorites");
    },
    loadFavorites() {
      const saved = localStorage.getItem("favoriteQuotes");
      this.favouriteQuotes = saved ? JSON.parse(saved) : [];
    },
    saveFavorites() {
      localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(this.favouriteQuotes)
      );
    },
  },
};
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
  backdrop-filter: blur(20px);
  border-radius: 0;
  border: 2px solid #ff0040;
  box-shadow: 0 0 50px rgba(255, 0, 64, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 0, 64, 0.03) 50%,
    transparent 70%
  );
  pointer-events: none;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

.header {
  background: linear-gradient(135deg, #ff0040 0%, #990025 50%, #000000 100%);
  color: #ffffff;
  padding: 50px 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 60%
  );
  animation: sweep 3s infinite;
}

@keyframes sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(255, 0, 64, 0.8), 0 0 20px rgba(255, 0, 64, 0.6),
    0 0 30px rgba(255, 0, 64, 0.4);
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
}

.subtitle {
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
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

.main-content {
  padding: 50px 40px;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
}

.quote-section {
  margin-bottom: 50px;
}

.generate-btn {
  background: linear-gradient(135deg, #ff0040 0%, #990025 50%, #660016 100%);
  color: #ffffff;
  border: 2px solid #ff0040;
  padding: 18px 40px;
  border-radius: 0;
  font-size: 1.3rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 30px rgba(255, 0, 64, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.generate-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.generate-btn:hover:not(:disabled)::before {
  left: 100%;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 50px rgba(255, 0, 64, 0.6), 0 10px 30px rgba(255, 0, 64, 0.3);
  border-color: #ff3366;
}

.generate-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  filter: grayscale(100%);
}

.loading {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 0, 64, 0.1);
  border: 1px solid #ff0040;
  margin: 20px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #333;
  border-top: 4px solid #ff0040;
  border-right: 4px solid #00ff80;
  border-radius: 50%;
  animation: brutalSpin 0.8s linear infinite;
  margin: 0 auto 25px;
}

@keyframes brutalSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading p {
  color: #ff0040;
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
}

.error-message {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #330000 0%, #660000 100%);
  border: 2px solid #ff0040;
  margin-bottom: 30px;
  position: relative;
}

.error-message::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 0, 64, 0.1) 10px,
    rgba(255, 0, 64, 0.1) 20px
  );
  pointer-events: none;
}

.error-message p {
  color: #ff0040;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
}

.retry-btn {
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
}

.retry-btn:hover {
  background: linear-gradient(135deg, #ff8833 0%, #ff3300 100%);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.5);
}

.favorites-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border: 2px solid #00ff80;
  border-radius: 0;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.favorites-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(0, 255, 128, 0.03) 50%,
    transparent 70%
  );
  pointer-events: none;
}

.favorites-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.favorites-header h3 {
  color: #00ff80;
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.8), 0 0 20px rgba(0, 255, 128, 0.6);
}

.favorites-count {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}

.favorites-btn {
  width: 100%;
  background: linear-gradient(135deg, #00ff80 0%, #00cc66 50%, #009944 100%);
  color: #000000;
  border: 2px solid #00ff80;
  padding: 20px 30px;
  border-radius: 0;
  font-size: 1.2rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 30px rgba(0, 255, 128, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.favorites-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.favorites-btn:hover:not(:disabled)::before {
  left: 100%;
}

.favorites-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 50px rgba(0, 255, 128, 0.6),
    0 10px 30px rgba(0, 255, 128, 0.3);
  border-color: #33ff99;
}

.favorites-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
  filter: grayscale(100%);
}

@media (max-width: 768px) {
  .home-container {
    padding: 10px;
  }

  .card {
    border-radius: 15px;
  }

  .header {
    padding: 30px 20px;
  }

  .title {
    font-size: 2rem;
  }

  .main-content {
    padding: 30px 20px;
  }

  .favorites-section {
    padding: 20px;
  }
}
</style>
