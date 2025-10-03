<template>
  <div>
    <h1>Activity Logs</h1>

    <div>
      <QuoteButton label="Clear Logs" @buttonClicked="clearLogs" />
    </div>

    <div>
      <div v-for="(log, index) in logs" :key="index">
        {{ log }}
      </div>

      <div v-if="logs.length === 0">
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
import { mapState, mapActions } from 'vuex';

export default {
  name: "LogsPage",
  components: { QuoteButton },
  computed: {
    ...mapState(['logs'])
  },
  methods: {
    ...mapActions(['addLog', 'clearLogs'])
  },
  created() {
    this.addLog("Logs page loaded");
  }
};
</script>
