<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import * as yup from 'yup';
import axios from "axios";
import handleValidationErrors from "@/forms/helper";
import {showSuccessSnackbar, showErrorSnackbar} from "@/stores/snackbar";

const page = ref({title: 'Yeni Marka'});
const breadcrumbs = ref([
  {
    title: 'Ecommerce',
    disabled: false,
    href: '#'
  },
  {
    title: 'Marka',
    disabled: true,
    href: '#'
  }
]);

const status = ref(['Yayında', 'Taslak']);

const brand = reactive({
  name: '',
  description: '',
  seoUrl: '',
  seoMetaTitle: '',
  seoMetaDescription: '',
  status: '',
  logo: '',
  banner: ''
});

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Marka adı zorunludur.'),
  logo: yup.string().url('Geçerli bir URL giriniz.').required('Logo zorunludur.'),
});

async function sendForm() {

  const result = handleValidationErrors(schema, brand);

  if (result !== true) {
    showErrorSnackbar(result);
    return;
  }

  const response = await axios.post('/api/brands', result);

  if (response.status === 201) {
    showSuccessSnackbar('Marka başarıyla eklendi.');
    return;
  }

  showErrorSnackbar('Marka eklenirken bir hata oluştu.');
}

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col>
      <v-card variant="outlined" class="bg-surface" rounded="lg">
        <v-card-text>
          <v-row>
            <v-col md="6" cols="12">
              <v-card variant="outlined" rounded="lg">
                <v-card-text>
                  <div>
                    <v-label class="mb-2"><span class="text-error">* </span>Marka Adı</v-label>
                    <v-text-field single-line density="comfortable" variant="outlined" placeholder="Marka Adı"
                                  v-model="brand.name"></v-text-field>
                  </div>
                  <div>
                    <v-label class="mb-2">Açıklama</v-label>
                    <v-textarea single-line density="comfortable" variant="outlined" rows="3"
                                placeholder="Açıklama" v-model="brand.description"></v-textarea>
                  </div>
                  <div>
                    <v-label class="mb-2">Seo Meta Başlık</v-label>
                    <v-text-field single-line density="comfortable" variant="outlined"
                                  placeholder="Seo Meta Başlık"
                                  v-model="brand.seoMetaTitle"></v-text-field>
                  </div>
                  <div>
                    <v-label class="mb-2">Seo Meta Açıklama</v-label>
                    <v-textarea single-line density="comfortable" variant="outlined" rows="3"
                                placeholder="Seo Meta Açıklama"
                                v-model="brand.seoMetaDescription"></v-textarea>
                  </div>
                  <div class="mb-5">
                    <v-label class="mb-2">Durum</v-label>
                    <v-autocomplete
                        aria-label="autocomplete"
                        model-value="Yayında"
                        :items="status"
                        color="primary"
                        variant="outlined"
                        hide-details
                        density="comfortable"
                    >
                    </v-autocomplete>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col md="6" cols="12">
              <v-card variant="outlined" rounded="lg">
                <v-card-text>
                  <div>
                    <v-label class="mb-2"><span class="text-error">* </span>Logo</v-label>
                    <v-text-field single-line density="comfortable" variant="outlined" placeholder="Logo"
                                  v-model="brand.logo"></v-text-field>
                  </div>
                  <div>
                    <v-label class="mb-2">Banner</v-label>
                    <v-text-field single-line density="comfortable" variant="outlined" placeholder="Banner"
                                  v-model="brand.banner"></v-text-field>
                  </div>
                  <div class="d-flex justify-end ga-4 mt-16 pt-8">
                    <v-btn variant="outlined" color="secondary" rounded="md" to="/brands/"> İptal</v-btn>
                    <v-btn variant="flat" color="primary" rounded="md" @click="sendForm();"> Kaydet</v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
