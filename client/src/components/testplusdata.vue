<template>
    <v-dialog
    v-model="dialog"
    width="1024"
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="purple-darken-2 mr-2"
        icon="mdi mdi-plus-thick"
        size="small"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="blue-accent-1">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增魚資料</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="dialog = false"> 新增 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-subheader class="mx-4">基本資料</v-list-subheader>

      <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="ID">
            <v-text-field
              title="ID:"
              label="25"
              placeholder="25"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="電量:">
            <v-text-field label="100%" placeholder="25"></v-text-field>
          </v-list-item>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="錯誤:">
            <v-text-field label="無錯誤" placeholder="25"></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="狀態:">
            <v-select v-model="selectactive" :items="active"></v-select>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  </template>
  <script>
    export default {
      data() {
        return {
          datas: [
            { id: '20', bc: '100' + '%', erro: '無錯誤', active: 1 },
            { id: '21', bc: '90' + '%', erro: '無錯誤', active: 1 },
            { id: '22', bc: '100' + '%', erro: '無錯誤', active: 1 },
            { id: '23', bc: '' + '%', erro: '', active: 2 },
            { id: '24', bc: '' + '%', erro: '', active: 2 },
          ],
          dialog: false,
          notifications: false,
          sound: true,
          widgets: false,
          selectcolor: null,
          selectactive: null,
          active: ['功能正常-待機中', '活動中', '維修中'],
          items: ['c洪', 'as'],
        }
      },
      methods: {
        editcolor() {},
      },
  
      computed: {
        state() {
          if (this.datas[4].active === 2) return '維修中'
          return '45'
        },
        cols() {
          const { lg, sm } = this.$vuetify.display
          return lg ? 4 : sm ? 12 : 12
        },
      },
    }
  </script>
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
  </style>
  