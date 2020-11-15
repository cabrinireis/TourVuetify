// import firebase from 'firebase/app'
const mutations = {
    VERIFICA (state,{token,usuario}) {
        state.token = token
        state.usuario = usuario
    },
    USER_LOGIN (state,{token,usuario}) {
        state.token = token
        state.usuario = usuario
    },
    SET_USER(state, payload) {
        state.email = payload.email,
        state.token = payload.token
    },
    setError(state, payload){
        if(payload.erro != undefined){
            state.mserro = 'senha errada'
        }
    },
    CLEAR_ERROR(state){
        state.mserro = null
    },
    SET_LOADING(state,payload){
        state.loading = payload
    }
}

export default mutations