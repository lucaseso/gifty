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
        <v-file-input
          label="Foto"
          prepend-icon="mdi-camera"
          accept="image/*"
          :rules="photoRules"
          :placeholder="form.photoUrl"
          @change="fileInput"
          class="mb-4"
        ></v-file-input>
        <v-row justify="center" v-if="form.photoBase64" class="mb-4 form-image">
          <img :src="form.photoBase64" alt="Photo" />
        </v-row>
        <v-btn block color="primary" type="submit">Salvar</v-btn>
      </form>
    </v-row>
  </v-container>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

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
  data() {
    return {
      gift: {},
      form: {
        name: '',
        quantity: 0,
        description: '',
        photoUrl: '',
        photoBase64: '',
      },
      photoRules: [
        value =>
          !value ||
          value.size < 2000000 ||
          'O tamanho da foto não pode ser maior que 2 MB!',
        value =>
          !value || value.type.indexOf('image/') >= 0 || 'Formato inválido',
      ],
    };
  },
  computed: {
    ...mapGetters(['gifts']),
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      if (!this.$v.form.name.required)
        errors.push('Nome é um campo obrigatório.');
      return errors;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.form.quantity.$dirty) return errors;
      if (!this.$v.form.quantity.required)
        errors.push('Quantidade é um campo obrigatório.');
      if (!this.$v.form.quantity.minValue)
        errors.push('Quantidade deve ser maior que 0');
      return errors;
    },
  },
  mounted() {
    this.gift = this.gifts.find(item => item.id == this.id);
    this.form = { ...this.gift };
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
    ...mapActions(['editGift', 'findGift']),
    submit() {
      this.editGift(this.form);
      this.submited = true;
      this.$router.go(-1);
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
