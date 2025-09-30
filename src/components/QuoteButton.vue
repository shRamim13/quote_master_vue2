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

