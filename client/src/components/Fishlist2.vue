<template>
  <v-container>
    <div class="d-flex justify-center text-white"><h2>仿生魚清單</h2></div>
    
    
    </v-container>
    
        <div style="display: grid; grid-template-columns: 1fr auto auto;">
      <v-text-field
        v-model="searchId"
        append-icon="mdi-magnify"
        label="搜尋ID"
        hide-details
        class="mb-2 mt-4 mr-4 text-white"
        style="width: 200px;  "
      ></v-text-field>
      <v-dialog
    v-model="dialognewSection"
    width="1024"
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    
  </v-dialog>
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
          <v-btn variant="text" @click="newdatas" :disabled="AddButtonDisabled"> 新增 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-subheader class="mx-4">基本資料</v-list-subheader>

      <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="ID">
            <v-text-field
              v-model="NewId"
              title="ID:"
              :rules="[required, numericRule]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="區域:">
            <v-select v-model="SelectSection" :items="poolsCode" :rules="[required]"></v-select>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog> 
</div> 
    <div v-for="(poolname,i) in poolsCode" :key="poolname" class="mt-4 mb-2 text-white text-h6" ><h3 class="mb-2">{{ processSectionName(poolname) }}</h3>
    <Table v-show="Tableshow[i]" :border="true" :columns="isMobileScreen ? mobileColumns : columns" :data="filteredData(i)">
    <template #id="{ row }">
      <p class="d-flex flex-no-wrap justify-space-between"><strong>{{ row.id }}</strong><Button  icon="md-create" size="small" @click="row.modal = true"></Button></p>
      <Modal
              v-model="row.modal"
              title="上傳仿生魚照片"
              :closable="false"
              @on-ok="uploadImage(row.id)"
              @on-cancel="cancel">
              <input type="file" ref="fileInput" @change="selectfile" />
          </Modal>
   </template>
    <template #action="{ row: { id } }">
    <Button  type="primary" size="small" @click="fishdatas[i][id].show = true" class="mr-2">查看</Button>
    <v-dialog v-model="fishdatas[i][id].show" width="auto">
      <v-card>
        <div class="d-flex justify-center mt-2"><h3>歷史資料</h3></div>
        <v-card-text v-for="fish in fishdatas[i][id]" :key="fish">
          
          <div>
            版本: {{ fish.version }} &nbsp; 時間: {{ formatDate(fish.time) }}
            &nbsp; 錯誤:{{ fish.err }} &nbsp; 狀態:{{fish.active}}
          </div>
          <v-divider class="ma-2"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="fishdatas[i][id].show = false"
            >關閉</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Button  type="error" size="small" @click="confirm(id)">刪除</Button>
    </template>
  </Table>
  <Table  v-show="!Tableshow[i]"  :columns="isMobileScreen? nodatamobileColumns:nodatacolumns" :data="fallbackRow"></Table>
  </div>
  </template>
  
  <script>
import axios from 'axios';
/*function TranActive(active) {
  if (active == "功能正常-待機中") {
    return 0;
  } else if (active === "活動中") {
    return 1;
  } else if (active === "維修中") {
    return 2;
  } else {
    return -1;
  }
}*/
    export default {
      data() {
        return {
            userdatas:[],
            token:localStorage.getItem('token'),
            Tableshow:[],
            show: false,
            FishId: [],
            fishdatas:[],
            version:[],
            lastdatas:[],
            time:[],
            active:[],
            columns: [
                    {
                        title: 'UID',
                        slot: 'id'
                    },
                    {
                        title: '狀態',
                        key: 'active'
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
            mobileColumns:[
                    {
                        title: 'UID',
                        slot: 'id',
                        width:92,
                        fixed: 'left'
                    },
                    {
                        title: '狀態',
                        width:80,
                        key: 'active'
                    },
                    {
                        title: '版本',
                        width:70,
                        key: 'version'
                    },
                    {
                        title: '更新時間',
                        width:100,
                        key: 'time'
                    },
                    {
                        title: '編輯',
                        slot: 'action',
                        width: 80,
                        align: 'center',
                        fixed: 'right'
                    }
            ],
            nodatacolumns: [
                    {
                        title: 'UID',
                        key: 'id'
                    },
                    {
                        title: '狀態',
                        key: 'active'
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
                        key: 'time',
                        width: 150,
                    }
                ],
                nodatamobileColumns:[
                    {
                        title: 'UID',
                        key: 'id',
                        fixed: 'left'
                    },
                    {
                        title: '狀態',
                        key: 'active'
                    },
                    {
                        title: '版本',
                        width:80,
                        key: 'version'
                    },
                    {
                        title: '更新時間',
                        key: 'time'
                    },
                    {
                        title: '編輯',
                        key: 'time',
                        width: 80,
                        align: 'center',
                        fixed: 'right'
                    }
            ],
            data: [],
            searchId:'',
            dialog: false,
            IP:process.env.VUE_APP_IP,
            fallbackRow: [
              {
                id: " ",
                version: '無資料',
                time: " ",
                active: " "
              }
            ],
            dialognew:false,
            dialognewSection:false,
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
            poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
            poolName: JSON.parse(localStorage.getItem("PoolsName")),
            instructionCode:JSON.parse(localStorage.getItem("InstructionCode")),
            InstructionName:JSON.parse(localStorage.getItem("InstructionName")),
            keyvalueMapping :[],
        }
      },
      async created() {
        this.formNameMapping(this.instructionCode,this.InstructionName);
        this.formNameMapping(this.poolsCode,this.poolName);
        this.RefreshDatas2();
        await this.accountdata();
      },
      mounted() {
        window.addEventListener('resize', this.updateScreenSize);
        this.updateScreenSize();
      },
      beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenSize);
      },
      computed: {
        filteredData() {
          return (index) => {
            if (!this.searchId) {
              return this.data[index];
            } else if(this.data[index]){
              return this.data[index].filter(item => {
                const itemId = item.id.toString(); 
                return itemId.includes(this.searchId.toLowerCase());
              });
            }else{
              return [];
            }
          };
        },
      AddButtonDisabled() {
        const numericRegex = /^\d+$/;
        const isNewIdValid = numericRegex.test(this.NewId);
        return !(isNewIdValid && this.SelectSection);
      },
      numericRule() {
        return (v) => /^\d+$/.test(v) || '只能输入数字'; 
      },
  },
      methods: {
        formNameMapping(code,name,){
          const keyValueMapping = {};
          for (let i = 0; i < code.length; i++) {
            const key = code[i];
            const value = name[i];
            
            keyValueMapping[key] = value;
          }
          this.keyvalueMapping.push(keyValueMapping);
        },
        processSectionName(str) {
        var section = str.substring(0, 3);
        return  this.keyvalueMapping[0][section]+"-"+this.keyvalueMapping[1][str] || "";
    },
        newdatas () {
        axios.post(
          "/api/v1/fish/?section="+this.SelectSection,{
            "fishUID": this.NewId,
                        },{
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
          )
          .then(async res=> {
              console.log(res);
              if(res.status == 200){
                this.dialognew = false
                this.$Message.success('新增成功');
                await this.loadnewdata();
                
              }
              else{
                this.dialog = false
                this.$Message.error('新增失敗');
              }
              
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              this.$Message.error('新增失敗');
          })

        },
      processData(ids, data) {
        ids.forEach((id) => {
        const { version,time } = data[id];
        this.version.push(version);
        this.time.push(time);
            });
        },
        RefreshDatas2() {
          for (var i = 0; i < this.poolsCode.length; i++) {
            const fish0 = "fish0" + this.poolsCode[i];
            const fish1 = "fish1" + this.poolsCode[i];
            const fish2 = "fish2" + this.poolsCode[i];

            const fish1Data = localStorage.getItem(fish1);
            const parsedFish1Data = JSON.parse(fish1Data);
            const fish0Data = localStorage.getItem(fish0);
            const parsedFish0Data = JSON.parse(fish0Data);
            const fish2Data = localStorage.getItem(fish2);
            const parsedFish2Data = JSON.parse(fish2Data);
            const combinedFishIds = [...parsedFish1Data, ...parsedFish0Data, ...parsedFish2Data];
            const parsedFishIds = combinedFishIds.map((str) => {
              const num = parseInt(str, 10);
              const paddedNum = num.toString().padStart(7, '0'); 
              return paddedNum;

            });
            this.FishId.push(parsedFishIds); 
          }
      },
      async accountdata() {
        try {
            for (var i = 0; i < this.poolsCode.length; i++) {
                if(this.FishId[i].length === 0) {
                  this.Tableshow.push(false);
                  continue;
                }
                this.FishId[i].sort((a, b) => a - b);
                const response = await axios.get(
                    "/api/v1/fish/table/?fishesUID=" + this.FishId[i],
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                );

                console.log(response);

                let vertionarray = [];
                let timearray = [];
                let activearray = [];
                for (const id in response.data[this.poolsCode[i]]) {
                    if (!Array.isArray(response.data[this.poolsCode[i]][id])) continue;
                    const dataArray = response.data[this.poolsCode[i]][id];
                    if (!this.fishdatas[i]) {
                        this.fishdatas[i] = {};
                    }
                    if (!this.fishdatas[i][id]) {
                        this.fishdatas[i][id] = [];
                    }
                    const lastFiveObjects = dataArray.slice(-5);
                    const reversedLastFive = lastFiveObjects.reverse();
                    this.fishdatas[i][id] = reversedLastFive;
                    this.fishdatas[i][id].show = false;
                    const { version, time, active } = dataArray[dataArray.length - 1];
                    vertionarray.push(version);
                    timearray.push(time);
                    activearray.push(active);
                }
                this.version.push(vertionarray);
                this.time.push(timearray);
                this.active.push(activearray);

                let datas = this.FishId[i].map((item, index) => ({
                    id: this.FishId[i][index],
                    version: this.version[i][index],
                    time: this.formatDate(this.time[i][index]),
                    active: this.proccesactive(this.active[i][index]),
                    modal:false,
                }));
                datas.sort((a, b) => {
                    const order = { "游動中": 1, "待機中": 2, "維修中": 3 };
                    return order[a.active] - order[b.active];
                });
                this.data.push(datas);
                this.Tableshow.push(true);
            }
        } catch (error) {
            console.log(error);
        }
    },
    toggleShow(index) {
      this.fishdatas[index].show = !this.fishdatas[index].show
    },
    formatDate(timestamp) {
      const dateObj = new Date(timestamp * 1000); 
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
      const day = String(dateObj.getDate()).padStart(2, '0'); 

      return `${year}-${month}-${day}`;
    },
    async loadnewdata() {
      try {
        const response = await axios.get(
          "/api/v1/account",
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        );

        console.log(response);
        if (response.status === 200) {
          for (var i = 0; i < this.poolsCode.length; i++) {
            const fishData = response.data.fishesID[this.poolsCode[i]];
            const fish0Values = [];
            const fish1Values = [];
            const fish2Values = [];

            if (Object.prototype.hasOwnProperty.call(response.data.fishesID, this.poolsCode[i])) {
              Object.entries(fishData).forEach(([key, value]) => {
                if (value === 1) {
                  fish1Values.push(key);
                } else if (value === 2) {
                  fish2Values.push(key);
                } else {
                  fish0Values.push(key);
                }
              });
            }
            const poolactivenum = fish1Values.length.toString() + fish0Values.length.toString() + fish2Values.length.toString() 
            const num = "activeNum"+this.poolsCode[i]
            const fish0ids = "fish0"+this.poolsCode[i]
            const fish1ids = "fish1"+this.poolsCode[i]
            const fish2ids = "fish2"+this.poolsCode[i]
            localStorage.setItem(num, poolactivenum);
            localStorage.setItem(fish0ids, JSON.stringify(fish0Values));
            localStorage.setItem(fish1ids, JSON.stringify(fish1Values));
            localStorage.setItem(fish2ids, JSON.stringify(fish2Values));
          }
          
        }
      } catch (error) {
        console.log(error);
      }
    },
    confirm (id) {
                this.$Modal.confirm({
                    title: `確定要刪除UID: ${id} 嗎?`,
                    onOk: () => {
                        this.remove(id);
                    },
                    onCancel: () => {
                        
                    }
                });
            },
    remove(id){
        axios.post(
          "/api/v1/fish/delete/",
            {
              "fishesUID":[id.toString()],
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(async res=> {
              console.log(res);
              this.$Message.success('刪除成功');
              await this.loadnewdata();
              location.reload();
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('刪除失敗');
          })
      },
      required (v) {
          return v !== null && v.trim() !== '' || '此區為必填區域'
        },
      updateScreenSize() {
        this.isMobileScreen = window.innerWidth <= 768; 
      },
      proccesactive(num){
        if(num === 1){
          return "游動中"
        }else if(num === 2){
          return "維修中"
        }else{
          return "待機中"
        }

      },
      select(e){
        this.selectFile = e.target.files[0]
      },
      selectfile(e){
        this.selectFile = e.target.files[0]
      },
      uploadImage(UID) {
        if (typeof this.selectFile === 'undefined') {
          this.$Message.error('尚未選擇圖片');
          return;
        }
        const formData = new FormData()
        formData.append('image',this.selectFile)
        axios.post(
            "/api/v1/fish/photos/?fishUID="+UID.toString(),formData,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              
              if(res.status == 200){
                this.$Message.success('上傳成功');
              }
              else
              this.$Message.error('上傳失敗');
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('上傳失敗');
          })
      },
      
        
    },
    }
  </script>
  
  <style>
  </style>




  