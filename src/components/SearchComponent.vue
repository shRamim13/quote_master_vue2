<template>
    <div class="search-section">
      <input 
        :value="searchQuery"
        @input="handleInput"
        type="text" 
        placeholder="🔍 SEARCH BRUTAL QUOTES..."
        class="brutal-search"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      searchQuery: { type: String, default: '' }
    },
    methods: {
      handleInput(event) {
        const value = event.target.value
        this.$emit('input', value)  // 👈 Emit 'input' event in Vue 2
      }
    }
  }
  </script>
  

<style scoped>
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

@media (max-width: 768px) {
  .brutal-search {
    font-size: 1rem;
    padding: 12px 20px;
  }
}
</style>
