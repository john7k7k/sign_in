<template>
  <v-container>
    <div class="d-flex justify-center"><h2>仿生魚清單</h2></div>
    
    
    </v-container>
    
        <div style="display: grid; grid-template-columns: 1fr auto;">
      <v-text-field
        v-model="searchId"
        append-icon="mdi-magnify"
        label="搜尋ID"
        hide-details
        class="mb-2 mt-4"
        style="width: 200px;"
      ></v-text-field>
    
      <v-dialog
    v-model="dialognew"
    width="1024"
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <Button class="mr-8 mt-6"
        color="light-blue-darken-4 mr-1"
        size="large"
        v-bind="props" type="primary"  >新增</Button>
    </template>
    <v-card>
      <v-toolbar dark color="blue-accent-1">
        <v-btn icon dark @click="dialognew = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增仿生魚</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="newdatas"> 新增 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-subheader class="mx-4">基本資料</v-list-subheader>

      <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="ID">
            <v-text-field
              v-model="NewId"
              title="ID:"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="電量(%):">
            <v-text-field v-model="NewBc" ></v-text-field>
          </v-list-item>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="區域:">
            <v-select v-model="SelectSection" :items="sectionword"></v-select>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="狀態:">
            <v-select v-model="SelectActive" :items="activeword"></v-select>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog> 
</div> 
      <div class="mt-4"><h3>北科</h3></div>
    <Table  :border="true" :columns="columns" :data="filteredData">
    <template #id="{ row }">
      <strong>{{ row.id }}</strong>
    </template>
    <template #action="{ row: { id },index }">
    <Button  type="primary" size="small" @click="fishdatas[id].show = true" class="mr-2">編輯</Button>
    <v-dialog v-model="fishdatas[id].show" width="auto">
      <v-card>
        <div class="d-flex justify-center mt-2"><h3>歷史資料</h3></div>
        <v-card-text v-for="fish in fishdatas[id]" :key="fish">
          
          <div>
            版本: {{ fish.version }} &nbsp; 時間: {{ formatDate(fish.time) }}
            &nbsp; 錯誤:{{ fish.err }} &nbsp; 狀態:{{fish.active}}
          </div>
          <v-divider class="ma-2"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="fishdatas[id].show = false"
            >關閉</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Button  type="error" size="small" @click="remove(id,index)">刪除</Button>
    </template>
  </Table>
  </template>
  
  <script>
import axios from 'axios';
function TranActive(active) {
  if (active == "功能正常-待機中") {
    return 0;
  } else if (active === "活動中") {
    return 1;
  } else if (active === "維修中") {
    return 2;
  } else {
    return -1;
  }
}
    export default {
      data() {
        return {
            userdatas:[],
            token:localStorage.getItem('token'),
            show: false,
            FishId: [],
            fishdatas:[],
            version:[],
            lastdatas:[],
            time:[],
            columns: [
                    {
                        title: 'ID',
                        slot: 'id'
                    },
                    {
                        title: '版本',
                        key: 'version'
                    },
                    {
                        title: '更新時間',
                        key: 'time'
                    },
                    {
                        title: '編輯',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            data: [],
            searchId:'',
            dialog: false,
            IP:process.env.VUE_APP_IP,
            fallbackRow: {
            id: '',
            version: '無資料',
            time: '',
            },
            dialognew:false,
            NewId:null,
            NewBc:null,
            NewErro:null,
            SelectSection:null,
            SelectActive:null,
            activeword:[
            "功能正常-待機中",
            "活動中",
            "維修中"
        ],
            sectionword:[
              "北科","海科"
            ]
        }
      },
      computed: {
    filteredData() {
        if (!this.searchId) {
          return this.data;
        } else {
          return this.data.filter(item => {
            const itemId = item.id.toString(); 
            return itemId.includes(this.searchId.toLowerCase());
          });
        }
      }
  },
      methods: {
        newdatas () {
        let sectioncode = "";
        if(this.SelectSection === "北科"){
          sectioncode = "002";
        }else{
          sectioncode = "002";
        }
        axios.post(
            "/api/v1/fish/data/?section="+sectioncode,{
              "fishData": {
                [this.NewId] : {"bc": this.NewBc, "err": 0,"active":TranActive(this.SelectActive)},
    }
            },{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              if(res.status == 200){
                this.dialognew = false
                alert("新增成功")
                location.reload();
              }
              else{
                this.dialog = false
              alert("新增失敗")
              }
              
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              alert('新增失敗');
          })

        },
      processData(ids, data) {
        ids.forEach((id) => {
        const { version,time } = data[id];
        this.version.push(version);
        this.time.push(time);
            });
        },
      accountdata(){
        this.loadnewdata();
        const fish1Data = localStorage.getItem("fish21");
        const parsedFish1Data = JSON.parse(fish1Data);
        this.FishId = parsedFish1Data
        const fish0Data = localStorage.getItem("fish20");
        const parsedFish0Data = JSON.parse(fish0Data);
        this.FishId.push(...parsedFish0Data)
        this.FishId2num = this.FishId.length
        const fish2Data = localStorage.getItem("fish22");
        const parsedFish2Data = JSON.parse(fish2Data);
        this.FishId.push(...parsedFish2Data)
        this.FishId = this.FishId.map((str) => {
                const num = parseInt(str, 10);
                return isNaN(num) ? 0 : num; 
                });
        this.FishId.sort((a, b) => a - b);
                axios.get(
            "/api/v1/fish/table/?section=002&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
            console.log(res);
            this.fishdatas = {};
            for (const id in res.data['002']) {
            const dataArray = res.data['002'][id];
            if (!this.fishdatas[id]) {
                this.fishdatas[id] = [];
            }
            const lastFiveObjects = dataArray.slice(-5);
            const reversedLastFive = lastFiveObjects.reverse();
            this.fishdatas[id] = reversedLastFive;
            this.fishdatas[id].show = false;
            }
            for (const id in res.data['002']) {
              const dataArray = res.data['002'][id];
              const { version,time } = dataArray[dataArray.length-1];
              this.version.push(version);
              this.time.push(time);
            }
            this.data = this.FishId.map((item,index) => ({
              id: this.FishId[index],
              version: this.version[index],
              time: this.formatDate(this.time[index])
            }));
          })
          .catch(err=> {
              console.log(err);
          })
        
      },
    toggleShow(index) {
      this.fishdatas[index].show = !this.fishdatas[index].show
    },
    formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}-${month}-${day}`;
  },
  loadnewdata(){
      axios.get(
        "/api/v1/account",{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              this.loading = false;
              if(res.status == 200){
                const fish001Data = res.data.fishesID["002"];
                const fish20Values = [];
                const fish21Values = [];
                const fish22Values = [];
                if( Object.hasOwn(res.data.fishesID,"002")){
                  Object.entries(fish001Data).forEach(([key, value]) => {
                    if (value === 1) {
                      fish21Values.push(key);
                    } else if (value === 2) {
                      fish22Values.push(key)
                    } else {
                      fish20Values.push(key)
                    }
                  });
                }
                localStorage.setItem("fish20", JSON.stringify(fish20Values));
                localStorage.setItem("fish21", JSON.stringify(fish21Values));
                localStorage.setItem("fish22", JSON.stringify(fish22Values));
              }
          })
          .catch(err=> {
              console.log(err);
          })
    },
    remove(id,index){
        axios.post(
          "/api/v1/fish/delete/?section=002",
            {
              "fishesID":[id.toString()],
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(res=> {
              console.log(res);
              alert('刪除成功');
              this.data.splice(index, 1);
              location.reload();
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              alert('刪除失敗');
          })
      },
    },
    
    
    mounted() {
      this.accountdata();
    },
    }
  </script>
  
  <style>
  .section1{
    padding-left: 290px;
  }

  @media screen and (max-width: 600px){
    .section1{
    padding-left: 10px;
  }
  }
  </style>
  