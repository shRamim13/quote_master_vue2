<template>
  <div>
    <h1>Activity Logs</h1>

    <div>
      <QuoteButton label="Clear Logs" @buttonClicked="clearLogs" />
    </div>

    <div>
      <div v-for="(log, index) in store.logs" :key="index">
        {{ log }}
      </div>

      <div v-if="store.logs.length === 0">
        <p>No logs yet</p>
      </div>
    </div>

    <div>
      <router-link to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import QuoteButton from "@/components/QuoteButton.vue";
import { store } from "@/store.js";

export default {
  name: "LogsPage",
  components: { QuoteButton },
  computed: {
    store() {
      return store;
    },
  },
  created() {
    store.addLog("Logs page loaded");
  },
  methods: {
    clearLogs() {
      store.clearLogs();
      store.addLog("Logs cleared");
    },
  },
};
</script>
