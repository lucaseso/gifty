<template>
  <v-layout>
    <v-list class="gifty-list" subheader>
      <v-subheader class="headline black--text">Presentes Cadastrados</v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.nome">
          <v-list-item-avatar>
            <v-img src="../assets/logo.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.nome"></v-list-item-title>
            <v-list-item-subtitle v-text="item.descricao"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.quantidade"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
      <!-- <v-list-item-icon>
          <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-chat_bubble</v-icon>
        </v-list-item-icon> -->
    </v-list>
  </v-layout>
</template>

<script>
export default {
  name: 'Presente',
  data() {
    return {
      items: [
        {
          nome: 'Doritos',
          descricao: 'descricao',
          avatar: '../assets/logo.png',
          quantidade: 2,
        },
        {
          nome: 'Monster',
          descricao: 'descricao',
          avatar: '../assets/logo.png',
          quantidade: 2,
        },
      ],
    };
  },
};
</script>

<style scoped>
.gifty-list {
  width: 100%;
}
</style>
