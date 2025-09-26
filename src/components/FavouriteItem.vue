<template>
  <div class="brutal-quote-item">
    <div class="quote-content">
      <p class="brutal-quote-text">"{{ quote.quote }}"</p>
      <p class="brutal-quote-author">— {{ quote.author }}</p>
    </div>
    <QuoteButton 
      label="⚡ DESTROY" 
      @buttonClicked="$emit('delete-item')" 
      class="brutal-delete-btn"
    />
  </div>
</template>

<script>
import QuoteButton from "./QuoteButton.vue";

export default {
  name: "FavouriteItem",
  components: { QuoteButton },
  props: { quote: Object },
};
</script>

<style scoped>
.brutal-quote-item {
  background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 30px;
  border: 2px solid #00ff80;
  position: relative;
  overflow: hidden;
  animation: slideIn 0.5s ease-out;
  margin-bottom: 30px;
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

@media (max-width: 768px) {
  .brutal-quote-item {
    padding: 20px;
  }
  
  .brutal-quote-text {
    font-size: 1.1rem;
  }
}
</style>
