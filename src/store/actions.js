import firebase from 'firebase/app'
import {vm } from '../main'

const actions = {
    signInAction({ commit }, payload) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
            commit('SET_LOADING', false)
            localStorage.setItem('token', response.user.uid)
            commit("SET_USER", {
              token: response.user.uid,
              email: response.user.email
            });
            vm.$router.push({name: 'gift'})
          })
          .catch(error => {
            commit('SET_LOADING', false)
            commit("setError", {erro : error.code});
          });
      },

      signOutAction({ commit }, data) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            localStorage.removeItem('token');
            data = null
            commit("SET_USER", {token : data, email: ""});
          })
      }
  };

  export default actions ;