<template>
  <v-app>
    <navBAR/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import navBAR from './components/NavBar'
import { mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    navBAR,
  },

  data: () => ({
    currentPage: null
  }),
  computed: {
    
    ...mapMutations(["setUser"]),
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
