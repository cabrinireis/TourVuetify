import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDLid9Scb_MWlgFNl-Nj2P1oHgZV0OuqlA",
    authDomain: "amigosecreto-aa186.firebaseapp.com",
    databaseURL: "https://amigosecreto-aa186.firebaseio.com",
    projectId: "amigosecreto-aa186",
    storageBucket: "amigosecreto-aa186.appspot.com",
    messagingSenderId: "968097086783",
    appId: "1:968097086783:web:faba7c2cc972856d78e78a"
})

export default function install(Vue){
    Object.defineProperty(Vue.prototype, '$firebase', {
        get (){
            return firebaseApp
        }
    })
}