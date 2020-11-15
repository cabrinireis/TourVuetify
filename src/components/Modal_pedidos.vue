<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Cadastrar sugestão
        </v-btn>
      </template>
      <v-card 
      max-height="80%"
      max-width="100%"

      >
        <v-card-title>
          <span class="headline text-center">Sugestão de Presente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                class="pa-0"
              >
                <v-text-field
                  label="Nome*"
                  v-model="pedido.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-textarea
                v-model="pedido.description"
                name="input-7-4"
                label="Descrição do presente*"
                >
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field
                v-model="pedido.location"
                  label="Local de Compra*"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field
                v-model="pedido.contact"
                  label="Contato*"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Sair
          </v-btn>
          <v-btn
            color="blue darken-1"
            type="submit"
            @click="save"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
// import { bus } from '@/event-bus'

  export default {
    data: () => ({
      dialog: false,
      editeditem: -1,
      pedido: {
        name: "",
        description: "",
        location: "",
        contact: ""
      }
    }),
    methods: {
      async save() {
        if (this.editeditem === -1) {
          console.log(this.editeditem)
          console.log('salva')
            //verificar se há registros // 
            this.$firebase.database().ref('/pedidos').on('value', snapshot => {
              const values = snapshot.val()
              this.desserts = Object.keys(values).map(i => {
                var usuarioativo = this.$firebase.auth().currentUser
                if( usuarioativo.uid === i){
                  console.log(i)
                }
              })
            })
            //end//

          try {
            const ref = this.$firebase.database().ref('/pedidos')
            var user = this.$firebase.auth().currentUser;
            if (user != null) {
              var id = user.uid
            }
            const payload = {
                id,
                ...this.pedido,
                createdAt: new Date().getTime()
            }
              ref.child(id).set(payload, err => {
                  if(err) {
                      alert('não foi possivel cadastrar ...')
                  } else {
                      alert('Cadastro efetuado com sucesso!')
                      this.pedido = ''
                      this.dialog = false
                  }
                })
          } catch (err) {
          alert('Não foi possível inserir o gasto, tente novamente.')
        }
      }else{
        //editar
        console.log(this.pedido)
        const refedit = this.$firebase.database().ref('/pedidos')
         refedit.child(this.pedido.id).update(this.pedido)
         this.dialog = false
      }
      },
    },
    created() {
      this.$root.$on('diaglogo', () => {this.dialog = true})
      this.$root.$on('showdata', (value) => {this.pedido = value})
      // this.$root.$on('editindex', (value) => {this.editeditem = value})
    },
  }
</script>

<style scoped>
.headline{
    color: #625f5f;
}
tbody tr td{
    background: gray;
}
</style>