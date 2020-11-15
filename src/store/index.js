import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'

Vue.use(Vuex)



export default new Vuex.Store({
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
})