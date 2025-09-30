<template>
  <div>
    <p>"{{ quote.quote }}"</p>
    <p>— {{ quote.author }}</p>
    <QuoteButton 
      label="Delete" 
      @buttonClicked="removeFavorite" 
    />
  </div>
</template>

<script>
import QuoteButton from "./QuoteButton.vue";

export default {
  name: "FavoriteItem",
  components: { QuoteButton },
  props: { 
    quote: Object
  },
  methods: {
    removeFavorite() {
      this.$emit('delete-item');
    }
  }
};
</script>