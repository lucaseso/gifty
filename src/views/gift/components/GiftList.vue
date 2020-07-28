<template>
  <v-list class="list" subheader three-lines>
    <v-subheader class="headline black--text">
      <slot name="listTitle">Presentes Cadastrados</slot>
    </v-subheader>
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
          <router-link :to="`/gift/${item.id}/edit`" v-if="editable" class="normalize-link">
            <v-btn icon title="Editar">
              <v-icon color="grey darken-1">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
          <v-btn icon title="Deletar" v-if="deleteAction" @click.stop="deleteId = item.id">
            <v-icon color="red lighten-2">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider v-if="index + 1 < gifts.length" :key="index"></v-divider>
    </template>

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
  </v-list>
</template>

<script>
export default {
  name: 'GiftList',
  props: {
    gifts: {
      type: Array,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    deleteAction: {
      type: Function,
    },
  },
  data() {
    return {
      deleteId: '',
    };
  },
  computed: {
    dialog() {
      return !!this.deleteId;
    },
  },
  methods: {
    deleteGift() {
      this.deleteAction(this.deleteId);
      this.deleteId = '';
    },
  },
};
</script>

<style></style>
