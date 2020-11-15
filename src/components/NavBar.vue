<template>
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
      <router-link v-if="!currentUser" to="/login">
          <span class="login_text mr-2">Login</span>
          <v-icon >mdi-account</v-icon> 
      </router-link> 
        <div v-if="currentUser">
          <span v-if="currentUser" class="login_text mr-2">{{currentUser}}</span>
          <v-icon @click="signOut" >mdi-logout-variant</v-icon>
        </div>
    </v-app-bar>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            currentPage: null
        }
    },
    methods: {
        signOut() {
            this.signOutAction;
            this.$router.push({ name: 'login' })
        }
    },
    computed: {
        
        ...mapActions(["signOutAction"]),
        ...mapGetters(["currentUser"]),

        pageac() {
            
            return  console.log(this.$router.currentRoute.path)
        }
    },
}
</script>

<style>

</style>