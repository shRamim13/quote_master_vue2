import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteQuotes: [],
    logs: [],
    currentQuote: null,
    spinner: false,
    error: null
  },
  
  mutations: {
    ADD_LOG(state, message) {
      const logEntry = `${new Date().toLocaleTimeString()}: ${message}`;
      state.logs.unshift(logEntry);
    },
    
    CLEAR_LOGS(state) {
      state.logs = [];
    },
    
    ADD_FAVORITE(state, quote) {
      state.favoriteQuotes.push(quote);
    },
    
    REMOVE_FAVORITE(state, index) {
      state.favoriteQuotes.splice(index, 1);
    },
    
    SET_CURRENT_QUOTE(state, quote) {
      state.currentQuote = quote;
    },
    
    SET_SPINNER(state, loading) {
      state.spinner = loading;
    },
    
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  
  actions: {
    async fetchRandomQuote({ commit }) {
      commit('SET_ERROR', null);
      commit('SET_SPINNER', true);
      commit('SET_CURRENT_QUOTE', null);
      commit('ADD_LOG', 'Generating new quote...');
      
      try {
        const response = await fetch("https://favqs.com/api/qotd");
        const polishedResponse = await response.json();
        commit('SET_CURRENT_QUOTE', polishedResponse);
        commit('ADD_LOG', `Quote generated: ${polishedResponse.quote.body}`);
      } catch (error) {
        commit('SET_ERROR', 'Try Again');
        commit('ADD_LOG', `Error generating quote: ${error.message}`);
      } finally {
        commit('SET_SPINNER', false);
      }
    }
  }
})
