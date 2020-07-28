<template>
  <v-flex>
    <v-file-input
      :label="label"
      prepend-icon="mdi-camera"
      accept="image/*"
      :rules="photoRules"
      :placeholder="value.url"
      @change="fileInput"
      class="mb-4"
    ></v-file-input>
    <v-row justify="center" v-if="value.base64" class="mb-4 form-image">
      <img :src="value.base64" alt="Foto" />
    </v-row>
  </v-flex>
</template>

<script>
export default {
  name: 'InputImage',
  props: {
    label: {
      type: String,
    },
    value: {
      type: Object,
    },
  },
  data() {
    return {
      photoRules: [
        value => !value || value.size < 2000000 || 'O tamanho da foto não pode ser maior que 2 MB!',
        value => !value || value.type.indexOf('image/') >= 0 || 'Formato inválido',
      ],
    };
  },
  methods: {
    fileInput(file) {
      if (file) {
        this.createImage(file);
      } else {
        this.value.base64 = '';
        this.value.url = '';
      }
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.value.base64 = e.target.result;
        vm.value.url = file.name;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style></style>
