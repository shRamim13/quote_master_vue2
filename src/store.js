import { reactive } from 'vue'

export const store = reactive({
  favoriteQuotes: [],
  logs: [],
  
  addLog(message) {
    const logEntry = `${new Date().toLocaleTimeString()}: ${message}`;
    this.logs.unshift(logEntry);
  },
  
  clearLogs() {
    this.logs = [];
  }
})
