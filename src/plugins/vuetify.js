import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

import ptBr from 'vuetify/es5/locale/pt'


export default new Vuetify({
    lang: {
        locales: { ptBr },
        current: 'ptBr',
      },
});
