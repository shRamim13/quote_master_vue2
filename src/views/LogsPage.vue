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
import { mapState} from 'vuex';

export default {
  name: "LogsPage",
  components: { QuoteButton },
  computed: {
    ...mapState(['logs'])
  },
  methods: {
    clearLogs() {
      this.$store.commit("CLEAR_LOGS");
      this.$store.commit("ADD_LOG", "Logs cleared");
    }
  },
  created() {
    this.$store.commit("ADD_LOG", "Logs page loaded");
  }
};
</script>
