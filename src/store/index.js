import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchText: null,
    apiKey: "effbb9ab767247a5b57b4ac8650b01e7"
  },
  mutations: {
    setsearchText: (state, newText) => {
      state.searchText = newText;
    }
  },
  actions: {},
  modules: {}
});
