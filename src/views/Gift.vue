<template>
  <v-layout justify-center>
    <v-flex xs12 sm12 md10 class="fill-height">
      <v-list class="list" subheader three-lines>
        <v-subheader class="headline black--text">Presentes Cadastrados</v-subheader>
        <template v-for="(item, index) in gifts">
          <v-list-item :key="item.id">
            <v-list-item-avatar>
              <img :src="item.photoBase64" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
              <v-list-item-subtitle>Quantidade desejada: {{ item.quantity }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <router-link :to="`/gift/${item.id}/edit`" class="normalize-link">
                <v-btn icon title="Editar">
                  <v-icon color="grey darken-1">mdi-pencil</v-icon>
                </v-btn>
              </router-link>
              <v-btn icon title="Deletar" @click.stop="deleteId = item.id">
                <v-icon color="red lighten-2">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index + 1 < gifts.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>

    <v-flex class="absolute-bottom">
      <router-link to="/gift/add">
        <v-btn fab color="primary" large bottom left>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
    </v-flex>

    <v-dialog v-model="dialog" max-width="430">
      <v-card>
        <v-card-title>Por favor confirme</v-card-title>

        <v-card-text class="subtitle-1">Tem certeza que quer deletar o presente?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="deleteId = ''">
            <slot name="cancel-label">Cancelar</slot>
          </v-btn>

          <v-btn color="green darken-1" text @click="deleteGift">
            <slot name="confirm-label">Confirmar</slot>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Presente',
  data() {
    return {
      deleteId: '',
    };
  },
  computed: {
    ...mapGetters(['gifts']),
    dialog() {
      return !!this.deleteId;
    },
  },
  methods: {
    ...mapActions({ deleteGiftAction: 'deleteGift' }),
    deleteGift() {
      this.deleteGiftAction(this.deleteId);
      this.deleteId = '';
    },
  },
};
</script>
