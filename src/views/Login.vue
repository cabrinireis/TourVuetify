<template>
<v-container class="containerlogin">
    <v-card elevation='0' max-width="80%" class="ma-auto">
      
      <v-alert
        v-if="error"
        dense
        dismissible
        outlined
        type="error"
        transition="scale-transition"
      >
      {{message}}
      </v-alert>
    <validation-observer
        ref="observer"
    >
        <form @submit.prevent="valid">

        <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
        >
            <v-text-field
            v-model="user.email"
            :error-messages="errors"
            label="E-mail"
            required
            ></v-text-field>
        </validation-provider>

        <validation-provider
            v-slot="{ errors }"
            name="Senha"
            rules="required|max:10"
        >
            <v-text-field
            v-model="user.password"
            :counter="10"
            :error-messages="errors"
            label="Senha"
            type="password"
            required
            ></v-text-field>
        </validation-provider>
        <v-spacer></v-spacer>
        <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="primary"
      @click="valid"
    >
      Login
    </v-btn>
        <router-link class="cadastrar" to="/cadastro">
        <span> Cadastre-se aqui! </span> 
        </router-link>
        </form>
    </validation-observer>
    </v-card>
    
</v-container>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  setInteractionMode('eager')
  extend('required', {
    ...required,
    message: '{_field_} está em branco',
  })
  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })
  extend('email', {
    ...email,
    message: 'Email inválido',
  })
  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      messageError: '',
      loader:null,
      user :{
        email: '',
        password: '',
      }
    }),
    methods: {
      async Login () {
      try {
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password)
        window.uid = res.user.uid
        this.$store.commit('USER_LOGIN', {
          token: res.user.uid,
          usuario: this.user.email
        })
        this.$router.push({ name: 'gift' })
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário.'
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível fazer login, tente novamente'
        }
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
      },
        ...mapActions(["signInAction"]),
      valid(){
          this.signInAction({ email: this.user.email, password: this.user.password })
      },
      clear () {
        this.password = ''
        this.email = ''
        this.$refs.observer.reset()
      },
    },
    mounted () {
          this.messageError = this.$store.state.mserro
    },
    computed: {
      loading(){
        return this.$store.getters.loading
      },
      error(){
        return this.$store.getters.error
      },
      message(){
        return this.error
      },
      ...mapMutations(['setError'])
    },
  }
</script>

<style lang="css" scoped>
@media screen and (min-width: 450px){
  .containerlogin {
      max-width: 40%;
  }
  .cadastrar{
    text-decoration: none;
    font-size: .8rem;
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
