<script setup lang="ts">
import {RouterView} from 'vue-router';
import LoaderWrapper from './LoaderWrapper.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import FooterPanel from './footer/FooterPanel.vue';
import {useCustomizerStore} from '@/stores/customizer';
import {snackbarStatus, snackbarType, closeSnackbar, snackbarMessage} from "@/stores/snackbar";

const customizer = useCustomizerStore();

</script>

<template>
  <v-locale-provider>
    <v-app :theme="customizer.actTheme"
           :class="[customizer.actTheme,customizer.fontTheme,customizer.mini_sidebar ? 'mini-sidebar' : '',customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',customizer.inputBg ? 'inputWithbg' : '']">
      <VerticalSidebarVue/>
      <VerticalHeaderVue/>

      <v-main class="page-wrapper">
        <v-container fluid>
          <div class="maxWidth">
            <!-- Loader start -->
            <LoaderWrapper/>
            <!-- Loader end -->
            <!-- snackbar start -->
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <v-snackbar :color="snackbarType" variant="flat" elevation-1 rounded="md" location="top right"
                              v-model="snackbarStatus">
                    <p v-html="snackbarMessage"/>
                    <template v-slot:actions>
                      <v-btn color="white" aria-label="close" variant="text" @click="closeSnackbar">
                        <svg class="pc-icon" style="width: 20px; height: 20px; transform: rotate(45deg)">
                          <use xlink:href="/assets/svg/sprite.svg#custom-close"></use>
                        </svg>
                      </v-btn>
                    </template>
                  </v-snackbar>
                </v-col>
              </v-row>
            </v-col>
            <!-- snackbar end -->
            <RouterView/>
          </div>
        </v-container>
        <v-container fluid class="pt-0">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <FooterPanel/>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
