import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登陆者身份
    info: ''
  },
  mutations: {
    set_info(state, value) {
      state.info = value;
    }
  },
  actions: {
    setInfo({ commit }, value) {
      commit("set_info", value)
    }
  },
  modules: {
  },
  getters,
})
