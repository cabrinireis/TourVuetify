<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-icon 
          large
          dark
          >
          mdi-gift-outline
          </v-icon>
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <router-link v-if="currentPage === 'Home'" to="/login">
        <span class="login_text mr-2">Login</span>
        <v-icon >mdi-account</v-icon> 
      </router-link> 
      <div v-if="currentUser">
        <span class="login_text mr-2">{{currentUser}}</span>
        <v-icon @click="signOut" >mdi-logout-variant</v-icon>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'App',

  data: () => ({
    currentPage: null
  }),
  computed: {
    ...mapGetters(["currentUser"]),
    ...mapMutations(["setUser"]),
    ...mapActions(["signOutAction"]),
  },
  methods: {
    signOut() {
      this.signOutAction;
      this.$router.push({ name: 'login' })
    }
  },
  mounted () {
    console.log(this.currentUser)
    this.currentPage = this.$router.currentRoute.name
  },
};
</script>
<style>
  .login_text{
    color: #ffff;
  }
  .text_welcome{
    color: #cd0102;
  }
  .v-application a{
    text-decoration: none;
  }
  @media screen and (max-width: 450px){
    #welcome{
      font-size: 1.5rem !important;
    }
  }
</style>
