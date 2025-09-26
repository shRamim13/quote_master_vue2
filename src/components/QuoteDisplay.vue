<template>
  <div class="quote-display">
    <div class="quote-card">
      <div class="quote-content">
        <div class="quote-icon">⚡</div>
        <blockquote class="quote-text">
          "{{ currentQuote.quote.body }}"
        </blockquote>
        <cite class="quote-author">— {{ currentQuote.quote.author }}</cite>
      </div>

      <div class="quote-actions">
        <QuoteButton
          label="💀 ADD TO BRUTAL COLLECTION"
          @buttonClicked="$emit('add-to-favourite')"
          class="favorite-btn"
        />

        <div class="status-messages">
          <p
            v-if="
              isQuoteInserted ||
              (quoteInsertCount === 1 && addToFavouriteTrigger === 1)
            "
            class="success-message"
          >
            ⚡ ADDED TO BRUTAL COLLECTION!
          </p>
          <p v-if="addToFavouriteTrigger > 1" class="warning-message">
            💀 ALREADY IN BRUTAL COLLECTION
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteButton from "./QuoteButton.vue";

export default {
  name: "QuoteDisplay",
  components: { QuoteButton },
  props: {
    currentQuote: Object,
    isQuoteInserted: Boolean,
    quoteInsertCount: Number,
    addToFavouriteTrigger: Number,
  },
};
</script>

<style scoped>
.quote-display {
  margin: 30px 0;
  animation: brutalFadeIn 0.6s ease-out;
}

@keyframes brutalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.quote-card {
  background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 0;
  padding: 40px;
  box-shadow: 0 0 40px rgba(255, 0, 64, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 2px solid #ff0040;
  position: relative;
  overflow: hidden;
}

.quote-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #ff0040, #00ff80, #0080ff, #ff0040);
  background-size: 400% 100%;
  animation: brutRainbow 3s linear infinite;
}

@keyframes brutRainbow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

.quote-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 0, 64, 0.02) 50%,
    transparent 70%
  );
  pointer-events: none;
}

.quote-content {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.quote-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #ff0040;
  text-shadow: 0 0 20px rgba(255, 0, 64, 0.8), 0 0 40px rgba(255, 0, 64, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.quote-text {
  font-size: 1.5rem;
  line-height: 1.7;
  color: #ffffff;
  font-style: italic;
  margin-bottom: 25px;
  font-weight: 500;
  quotes: none;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
}

.quote-text::before,
.quote-text::after {
  content: "";
}

.quote-text::before {
  content: '"';
  position: absolute;
  left: -30px;
  top: -10px;
  font-size: 4rem;
  color: #ff0040;
  opacity: 0.3;
}

.quote-text::after {
  content: '"';
  position: absolute;
  right: -30px;
  bottom: -30px;
  font-size: 4rem;
  color: #ff0040;
  opacity: 0.3;
}

.quote-author {
  font-size: 1.2rem;
  color: #00ff80;
  font-weight: 700;
  font-style: normal;
  display: block;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.8), 0 0 20px rgba(0, 255, 128, 0.6);
}

.quote-actions {
  text-align: center;
  position: relative;
  z-index: 1;
}

.favorite-btn {
  background: linear-gradient(135deg, #ff0040 0%, #990025 50%, #660016 100%);
  color: #ffffff;
  border: 2px solid #ff0040;
  padding: 15px 30px;
  border-radius: 0;
  font-size: 1.1rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 30px rgba(255, 0, 64, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.favorite-btn::before {
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

.favorite-btn:hover::before {
  left: 100%;
}

.favorite-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 50px rgba(255, 0, 64, 0.6), 0 10px 30px rgba(255, 0, 64, 0.3);
  border-color: #ff3366;
}

.status-messages {
  margin-top: 20px;
}

.success-message {
  color: #00ff80;
  font-weight: 800;
  font-size: 1.1rem;
  margin: 10px 0;
  animation: brutalSlideIn 0.5s ease-out;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.8), 0 0 20px rgba(0, 255, 128, 0.6);
}

.warning-message {
  color: #ff6600;
  font-weight: 800;
  font-size: 1.1rem;
  margin: 10px 0;
  animation: brutalSlideIn 0.5s ease-out;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.8), 0 0 20px rgba(255, 102, 0, 0.6);
}

@keyframes brutalSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
    filter: blur(1px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@media (max-width: 768px) {
  .quote-card {
    padding: 25px;
  }

  .quote-text {
    font-size: 1.2rem;
  }

  .quote-text::before,
  .quote-text::after {
    display: none;
  }

  .quote-author {
    font-size: 1rem;
  }

  .quote-icon {
    font-size: 2.5rem;
  }

  .favorite-btn {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>
