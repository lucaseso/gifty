<template>
  <v-layout justify-center class="grey lighten-5">
    <v-flex xs12 sm10 md8 offset-xs0>
      <h1 class="headline">Cadastrar Presente</h1>
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
          v-model.number="$v.form.quantity.$model"
          :error-messages="quantityErrors"
          label="Quantidade"
          @input="$v.form.quantity.$touch()"
          @blur="$v.form.quantity.$touch()"
        ></v-text-field>
        <v-textarea v-model="form.description" auto-grow label="Descrição" rows="1"></v-textarea>
        <v-file-input
          label="Foto"
          prepend-icon="mdi-camera"
          accept="image/*"
          :rules="photoRules"
          @change="fileInput"
        ></v-file-input>
        <v-row justify="center" v-if="form.photoBase64" class="mb-4 form-image">
          <img :src="form.photoBase64" alt="Photo" />
        </v-row>
        <v-btn block color="primary" type="submit">Salvar</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

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
  data: function() {
    return {
      form: {
        name: '',
        quantity: 0,
        description: '',
        photoUrl: '',
        photoBase64: '',
      },
      photoRules: [
        value => !value || value.size < 2000000 || 'O tamanho da foto não pode ser maior que 2 MB!',
        value => !value || value.type.indexOf('image/') >= 0 || 'Formato inválido',
      ],
    };
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
  },
  methods: {
    ...mapActions(['addGift']),
    submit() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
      } else {
        this.addGift(this.form);
        this.$router.push('/gifts');
      }
    },
    fileInput(file) {
      if (file) {
        this.createImage(file);
      } else {
        this.form.photoBase64 = '';
        this.form.photoUrl = '';
      }
    },
    createImage(file) {
      console.log(file);

      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.form.photoBase64 = e.target.result;
        vm.form.photoUrl = file.name;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style></style>
