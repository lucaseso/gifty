<template>
  <v-layout justify-center class="grey lighten-5">
    <v-flex xs12 sm10 md8 offset-xs0>
      <h1 class="headline">Editar Presente {{ gift.name }}</h1>
      <form class="form" @submit.prevent="submit">
        <v-text-field
          v-model="$v.form.name.$model"
          :error-messages="nameErrors"
          label="Nome"
          @input="$v.form.name.$touch()"
          @blur="$v.form.name.$touch()"
        ></v-text-field>
        <v-text-field
          type="number"
          v-model="$v.form.quantity.$model"
          :error-messages="quantityErrors"
          label="Quantidade"
          @input="$v.form.quantity.$touch()"
          @blur="$v.form.quantity.$touch()"
        ></v-text-field>
        <v-textarea v-model="form.description" auto-grow label="Descrição" rows="1"></v-textarea>

        <input-image label="Foto" v-model="photo"></input-image>

        <v-btn block color="primary" type="submit">Salvar</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import GiftService from '@/services/gifts.service.js';
import InputImage from '@/components/InputImage';

export default {
  name: 'GiftEdit',
  components: {
    InputImage,
  },
  validations: {
    form: {
      name: {
        required,
      },
      quantity: {
        required,
        minValue: minValue(1),
      },
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      gift: {},
      form: {
        name: '',
        quantity: 0,
        description: '',
      },
      photo: {
        url: '',
        base64: '',
      },
    };
  },
  computed: {
    ...mapGetters(['gifts']),
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      if (!this.$v.form.name.required) errors.push('Nome é um campo obrigatório.');
      return errors;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.form.quantity.$dirty) return errors;
      if (!this.$v.form.quantity.required) errors.push('Quantidade é um campo obrigatório.');
      if (!this.$v.form.quantity.minValue) errors.push('Quantidade deve ser maior que 0');
      return errors;
    },
  },
  mounted() {
    this.gift = GiftService.find(this.id).then(res => {
      this.gift = {
        id: this.id,
        ...res.data,
      };
      this.form = { ...this.gift };
      this.photo = { url: this.gift.photoUrl, base64: this.gift.photoBase64 };
    });
  },
  beforeRouteLeave(to, from, next) {
    if (
      !this.$v.form.$dirty ||
      this.submited ||
      confirm('Tem certeza? Suas alterações não foram salvas!')
    ) {
      next();
    }
  },
  methods: {
    ...mapActions(['editGift']),
    submit() {
      this.editGift({ ...this.form, photoUrl: this.photo.url, photoBase64: this.photo.base64 });
      this.submited = true;
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
