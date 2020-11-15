<template>
<v-container>
  <v-card>
    <v-card-title>
      <modal />
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Procurar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      item-key="name"
      disable-sort
      :footer-props="footerProps"
    >
    <template  v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-if="currentTOken === item.id"
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <!-- <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon> -->
    </template>

    </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import {mapGetters } from 'vuex'
import modal from '../components/Modal_pedidos';
import 'vuetify/lib/locale/'
// import { bus } from '@/event-bus'

  export default {
    components: {
      modal,
    },
    props: {
      active: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        footerProps: {
        'items-per-page-text': 'Items'
        },
        btnactive: true,
        dialogo: true,
        search: '',
        editedIndex: -1,
        editedItem: {
          name: '',
          description: '',
          location: '',
          contact: '',
        },
        headers: [
          {
            text: 'Nome',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Presente', value: 'description' },
          // { text: 'Valor', value: 'protein' },
          { text: 'Local de Compra', value: 'location' },
          { text: 'Contato', value: 'contact' },
          { text: 'editar', value: 'actions', sortable: false },
        ],
        dessert: [
          {
            name: 'Frederico',
            presente: 'thing given willingly to someone without payment',
            fat: 'Americanas av. aguanguera',
            carbs: 6299999999,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ana Lidia',
            presente: 'thing given willingly to someone without payment',
            fat: 'Americanas av. aguanguera',
            carbs: 6299999999,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Hosanita',
            presente: 'thing given willingly to someone without payment',
            fat: 'Americanas av. aguanguera',
            carbs: 6299999999,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Solon',
            presente: 'thing given willingly to someone without payment',
            fat: 'Americanas av. aguanguera',
            carbs: 6299999999,
            protein: 4.3,
            iron: '8%',
          },
        ],
        desserts:[]
      }
    },
    methods: {
        editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$root.$emit('showdata',  this.editedItem )     
        // this.$root.$emit('editindex',  this.editedIndex )     
        this.$root.$emit('diaglogo')   
      },
    },
    mounted () {
      const ref = this.$firebase.database().ref('/pedidos')

      ref.on('value', snapshot => {
          const values = snapshot.val()
          this.desserts = Object.keys(values).map(i => values[i])
      })
    },
    computed: {
    ...mapGetters(["isUserAuth"]),
    ...mapGetters(["currentTOken"]),
  },
  }
</script>
<style>
td.text-start:nth-child(1) {
  text-transform: uppercase;
}
td.v-data-table__mobile-row:nth-child(1){
  text-transform: uppercase;
  background-color: rgba(128, 128, 128, 0.637);
}
</style>