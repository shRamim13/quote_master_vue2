<template>
  <button :disabled="disabled" @click="$emit('buttonClicked')">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "QuoteButton",
  props: {
    label: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
