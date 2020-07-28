<template>
  <v-layout justify-center>
    <v-flex xs12 sm12 md10 class="fill-height">
      <GiftList :gifts="gifts" :delete-action="deleteGiftAction" :editable="true">
        <template #listTitle>
          <p>Presentes Cadastrados</p>
        </template>
      </GiftList>
    </v-flex>

    <v-flex class="absolute-bottom">
      <router-link to="/gift/add">
        <v-btn fab color="primary" large bottom left>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GiftList from '../components/GiftList';

export default {
  name: 'Gift',
  components: {
    GiftList,
  },
  computed: {
    ...mapGetters(['gifts']),
  },
  methods: {
    ...mapActions({ deleteGiftAction: 'deleteGift' }),
  },
};
</script>
