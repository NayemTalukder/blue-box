import Vue from 'vue'
import Vuex from 'vuex'
import Main from './Main/index'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Main
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug,
  plugins: [createPersistedState()]
})
