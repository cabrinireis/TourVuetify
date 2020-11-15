<template>
<v-container class="containerlogin">
    <v-card elevation='0' max-width="80%" class="ma-auto">
    <validation-observer
        ref="observer"
    >
        <form @submit.prevent="submit">
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

        <v-btn
            class="mr-4"
            type="submit"
        >
            Cadastrar
        </v-btn>
        </form>
    </validation-observer>
    </v-card>
</v-container>
</template>

<script>
  import { required, email, alpha, max } from 'vee-validate/dist/rules'
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
  extend('alpha', {
    ...alpha,
    message: 'nome inválido',
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
      user :{
        email: '',
        password: '',
      }
    }),
    methods: {
      submit () {
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(
            res => {
              console.log(res);
              this.user = ''
              this.$router.push({ name: 'login' })
            },
            err => {
              alert(err)
            }
          )
        
      },
      writeUserData() {
        
      },
      clear () {
        this.name = ''
        this.email = ''
        this.$refs.observer.reset()
      },
    }
  }
</script>

<style lang="css" scoped>
@media screen and (min-width: 450px){
.containerlogin {
    max-width: 40%;
}
    
}
</style>
