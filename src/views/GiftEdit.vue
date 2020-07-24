<template>
  <v-container class="grey lighten-5 pa-10" col-md-4>
    <v-row>
      <h1 class="headline">Editar Presente {{ gift.name }}</h1>
    </v-row>
    <v-row>
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
        <v-btn block color="primary" type="submit">Salvar</v-btn>
      </form>
    </v-row>
  </v-container>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
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
  computed: {
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
    gifts() {
      return [
        {
          id: 1,
          name: 'Doritos',
          description: 'description',
          avatar: '../assets/logo.png',
          quantity: 2,
        },
        {
          id: 2,
          name: 'Monster',
          description: 'description',
          avatar: '../assets/logo.png',
          quantity: 2,
        },
      ];
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
    };
  },
  mounted() {
    this.gift = this.gifts.find(item => item.id == this.id);
    this.form = { ...this.gift };
  },
  methods: {
    submit() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
