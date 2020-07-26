<template>
  <v-app id="inspire">
    <!-- blue darken-1 -->
    <v-app-bar app clipped-left color="primary" dense>
      <!-- <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-icon class="mr-4" color="white">mdi-gift</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title white--text">Gifty</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" style="max-width: 650px"></v-row>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    items: [
      { icon: 'mdi-trending-up', text: 'Most Popular' },
      { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
      { icon: 'mdi-history', text: 'History' },
      { icon: 'mdi-playlist-play', text: 'Playlists' },
      { icon: 'mdi-clock', text: 'Watch Later' },
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' },
    ],
  }),
  mounted() {
    this.initGifts();
  },
  methods: {
    ...mapActions(['initGifts', 'deleteGift']),
  },
};
</script>
