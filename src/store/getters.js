
  const getters = {
    isUserAuth(state) {
        return !!state.email;
      },
      currentUser(state){
          return state.email
      },
      currentTOken(state){
          return state.token
      },
      error(state){
        return state.mserro
      },
      loading(state){
        return state.loading
      }
  }

  export default getters;