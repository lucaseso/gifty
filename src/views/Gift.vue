<template>
  <v-layout>
    <v-list class="gifty-list" subheader three-lines>
      <v-subheader class="headline black--text">Presentes Cadastrados</v-subheader>
      <template v-for="(item, index) in gift">
        <v-list-item :key="item.id">
          <v-list-item-avatar>
            <v-img src="../assets/logo.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.nome"></v-list-item-title>
            <v-list-item-subtitle v-text="item.descricao"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.quantidade"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <router-link :to="`/gift/${item.id}/edit`" class="normalize-link">
              <v-btn icon title="Editar">
                <v-icon color="grey darken-1">mdi-pencil</v-icon>
              </v-btn>
            </router-link>
            <v-btn icon title="Deletar">
              <v-icon color="red lighten-2">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-divider v-if="index + 1 < gift.length" :key="index"></v-divider>
      </template>
      <!-- <v-list-item-icon>
          <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-chat_bubble</v-icon>
      </v-list-item-icon>-->
    </v-list>
    <router-link to="/gift/add">
      <v-btn fab large color="primary" dark small absolute bottom left class="mb-3">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </v-layout>
</template>

<script>
export default {
  name: 'Presente',
  data() {
    return {
      gift: [
        {
          id: 1,
          nome: 'Doritos',
          descricao: 'descricao',
          avatar: '../assets/logo.png',
          quantidade: 2,
        },
        {
          id: 2,
          nome: 'Monster',
          descricao: 'descricao',
          avatar: '../assets/logo.png',
          quantidade: 2,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.gifty-list {
  width: 100%;
}
</style>
