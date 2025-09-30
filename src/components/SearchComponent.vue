<template>
  <div>
    <input
      :value="searchQuery"
      @input="handleInput"
      type="text"
      placeholder="Search quotes..."
    />
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: { type: String, default: "" },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value); //  emit input event
    },
  },
};
</script>

