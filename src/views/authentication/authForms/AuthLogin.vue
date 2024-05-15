<script setup lang="ts">
import { reactive, ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { Form } from 'vee-validate';
import handleValidationErrors from "@/forms/helper";
import * as yup from 'yup';
import { showErrorSnackbar, showSuccessSnackbar } from "@/stores/snackbar";
import axios from "@/utils/axios";

const data = reactive({
  email: '',
  password: ''
});

const show1 = ref(false);
const loading = ref(false);

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const errorMessages = (await axios.get("http://localhost:3000/api/error-message")).data;

console.log(errorMessages);

async function sendForm() {
  const result = handleValidationErrors(loginSchema, data);

  if (result !== true) {
    showErrorSnackbar(result);
    return;
  }

  const response = await (await axios.post('http://localhost:3000/api/auth/token/refresh', data)).data;

  console.log(response.status, response.errors);

  if (response.status.toString() === "success") {
    showSuccessSnackbar('Giriş başarılı.');
    return;
  }


  showErrorSnackbar('Marka eklenirken bir hata oluştu.');
}

</script>

<template>
  <div class="d-flex justify-space-between align-center mt-4">
    <h3 class="text-h3 text-center mb-0">Giriş</h3>
  </div>
  <Form @submit="sendForm" class="mt-7 loginForm">
    <div class="mb-6">
      <v-label>E-posta</v-label>
      <v-text-field aria-label="email address" v-model="data.email" class="mt-2" density="comfortable" hide-details="auto" variant="outlined"
        color="primary" required />
    </div>
    <div>
      <v-label>Parola</v-label>
      <v-text-field aria-label="password" v-model="data.password" variant="outlined" density="comfortable" color="primary" hide-details="auto"
        :type="show1 ? 'text' : 'password'" class="mt-2" required>
        <template v-slot:append-inner>
          <v-btn color="secondary" aria-label="icon" icon="" rounded variant="text">
            <SvgSprite name="custom-eye-invisible" style="width: 20px; height: 20px" v-if="show1 == false" @click="show1 = !show1" />
            <SvgSprite name="custom-eye" style="width: 20px; height: 20px" v-if="show1" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <div class="ml-auto">
        <router-link to="/auth/forgot-pwd1" class="text-darkText link-hover">Şifreni mi Unuttun?</router-link>
      </div>
    </div>
    <v-btn color="primary" :loading="loading" :disabled="loading" block class="mt-5" variant="flat" size="large" rounded="md" type="submit">
      Giriş
    </v-btn>
  </Form>
</template>
