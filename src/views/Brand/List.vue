<script setup lang="ts">
import {ref, shallowRef} from 'vue';

import SvgSprite from '@/components/shared/SvgSprite.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import type {Header, Item} from "vue3-easy-data-table";
import 'vue3-easy-data-table/dist/style.css';
import {customers} from "@/stores/fake-data";

const page = ref({title: 'Marka listesi'});

const breadcrumbs = shallowRef([
  {
    title: 'Marka',
    disabled: false,
    href: '#'
  },
  {
    title: 'Liste',
    disabled: true,
    href: '#'
  }
]);

const searchField = ref('name');
const searchValue = ref('');

const headers: Header[] = [
  {text: 'Marka Adı', value: 'name', sortable: true},
  {text: 'Contact', value: 'date', sortable: true},
  {text: 'Age', value: 'orders', sortable: true},
  {text: 'Country', value: 'location', sortable: true},
  {text: 'Status', value: 'status', sortable: true},
  {text: 'Action', value: 'operation'}
];

const items = ref(customers);


const themeColor = ref('rgb(var(--v-theme-primary))');
const deleteCustomer = (name: string) => {
  items.value = items.value.filter((item) => item.name !== name);
};

const itemsSelected = ref<Item[]>([]);

const dialog = ref(false);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0" variant="outlined" class="bg-surface" rounded="lg">
        <v-card-item>
          <v-row justify="space-between" class="align-center">
            <v-col cols="12" md="3">
              <v-text-field
                  type="text"
                  variant="outlined"
                  persistent-placeholder
                  placeholder="mark ara..."
                  v-model="searchValue"
                  density="comfortable"
                  hide-details
              >
                <template v-slot:prepend-inner>
                  <SvgSprite name="custom-search" class="text-lightText" style="width: 14px; height: 14px"/>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <div class="d-flex ga-2 justify-end">
                <v-btn variant="flat" color="primary" rounded="md" to="/brands/create">
                  <template v-slot:prepend>
                    <SvgSprite name="custom-plus" style="width: 14px; height: 14px"/>
                  </template>
                  Add customer
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <EasyDataTable
              :headers="headers"
              :items="items"
              table-class-name="customize-table invoice-table"
              :theme-color="themeColor"
              :search-field="searchField"
              :search-value="searchValue"
              :rows-per-page="10"
              v-model:items-selected="itemsSelected"
          >
            <template #item-name="{ name, email }">
              <div class="player-wrapper">
                <h6 class="text-subtitle-1 mb-0">{{ name }}</h6>
                <small class="text-h6 text-lightText">{{ email }}</small>
              </div>
            </template>
            <template #item-status="{ status }">
              <v-chip :color="['success','error','info'][status]" size="small"
                      :text="['Relationship', 'Complicated', 'Single'][status]"/>
            </template>
            <template #item-operation="item">
              <div class="operation-wrapper">
                <v-btn icon color="secondary" aria-label="view" variant="text" rounded="md">
                  <SvgSprite name="custom-eye" style="width: 20px; height: 20px"/>
                </v-btn>
                <v-btn icon color="primary" aria-label="edit" variant="text" rounded="md">
                  <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px"/>
                </v-btn>
                <v-btn icon color="error" aria-label="trash" variant="text" @click="deleteCustomer(item.name)"
                       rounded="md">
                  <SvgSprite name="custom-trash" style="width: 20px; height: 20px"/>
                </v-btn>
              </div>
            </template>
          </EasyDataTable>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.customer-modal {
  width: calc(100% - 48px);
  min-width: 340px;
  max-width: 820px;
}
</style>
