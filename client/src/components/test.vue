<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card class="mx-auto" width="1200">
        <v-img
          class="align-end text-white"
          height="100"
          src="https://news-data.pts.org.tw/media/125928/cover.jpg"
          cover
        >
        <v-card-title class="d-flex align-center justify-space-between">北科魚池
              <v-btn   color="green" icon="mdi-refresh" size="small"></v-btn>
            </v-card-title>
        </v-img>
        <v-card-subtitle class="pt-1 pb-1"> 紀錄時間: </v-card-subtitle>
        
      </v-card>
    </v-row>
  </v-container>
  <div>
    <v-container class="mb-6">
      <v-row  no-gutters style="height: 80px" class="d-flex align-content-start  flex-wrap ">
        <v-col v-for="fish in datas" :key="fish" :cols="cols" class="d-flex align-content-start  flex-wrap ">
          <v-card
            class="pa-2 ma-2 mx-auto "
            cover
            
            image="https://img.freepik.com/premium-vector/seamless-ocean-bottom-underwater-coral-reef-silhouette-with-sea-plants-fish-seaweed-flat-seascape-with-undersea-life-vector-pattern-landscape-with-sand-deep-water-nature_102902-4648.jpg?size=626&ext=jpg&ga=GA1.1.688371840.1688498556&semt=sph"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">ID:{{fish.id}}</v-card-title>
                <v-card-actions>
                <div class="text-black mx-1">電量:</div>
                
                  <div class="ma-1 pa-1  bg-deep-orange-lighten-2">
                    <div class="font-weight-medium text-grey-darken-5">
                      {{fish.bc}}
                    </div>
                  </div></v-card-actions>
                  <v-card-actions> 
                <div class="text-black mx-1 ">Erro:</div>
                <div class="ma-1 pa-1  bg-deep-orange-lighten-2">
                    <div class="font-weight-medium text-grey-darken-5">
                      {{fish.erro}}
                    </div>
                  </div></v-card-actions
                >

                <v-card-actions>
                  
                  <v-dialog
        v-model="dialog"
        width="1024"
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn prepend-icon="mdi-square-edit-outline"
                    class="ms-2 bg-black"
                    variant="outlined"
                    size="small" v-bind="props"> 開始編輯 </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="blue-accent-1">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>編輯魚訊息</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn variant="text" @click="dialog = false"> Save </v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <v-list-subheader>基本資料</v-list-subheader>
            
            <v-row class="d-flex justify-space-around">
               <v-col>
                  <v-list-item title="ID">
                    <v-text-field title="ID:" label="25" placeholder="25"></v-text-field>
                  </v-list-item>
               </v-col>
               <v-col>
                  <v-list-item title="電量:" >
                    <v-text-field  label="100%" placeholder="25"></v-text-field>
                  </v-list-item>
               </v-col>
            </v-row>
            
            
            
            <v-row class="d-flex justify-space-around">
               <v-col>
                  <v-list-item title="錯誤:" >
                      <v-text-field  label="無錯誤" placeholder="25"></v-text-field>
                  </v-list-item>
               </v-col>
               <v-col>
                  <v-list-item title="狀態:" >
                    <v-select
        v-model="selectactive"
        :items="active"
      ></v-select>
                  </v-list-item>
               </v-col>
            </v-row>
        </v-card>
      </v-dialog>
                  

                </v-card-actions>
              </div>

              <v-avatar class="ma-3 " size="150" rounded="0">
                <v-img
                  class="my-5"
                  
                  src="https://t3.ftcdn.net/jpg/00/71/02/24/240_F_71022472_M9XPlS6kDU47NSLM7gXX2XEwRAuV8CtK.jpg"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
        selectcolor:null,
        selectactive:null,
        active:[
            "功能正常-待機中",
            "活動中",
            "維修中"
        ],
        items:[
          "c洪",
          "as"
        ]
      }
    },
    methods:{
      editcolor () {
          

        },
        
        
      
    },
    
    computed: {
      state() {
        if (this.datas[4].active === 2) return '維修中'
        return '45'
      },
      cols() {
        const { lg, sm } = this.$vuetify.display
        return lg ? 4 : sm ? 12 :12
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
