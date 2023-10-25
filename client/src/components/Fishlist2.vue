<template>
  <v-container>
    <div class="font-weight-black d-flex justify-center text-white text-h4">仿生魚清單</div>
    
    
    </v-container>
    
        <div class="searchdisplay">
      <v-text-field
        v-model="searchId"
        append-icon="mdi-magnify"
        label="搜尋ID"
        hide-details
        class="mb-2 mt-4 ml-7 text-white"
        style="width: 200px;"
        bg-color="rgba(255, 255, 255, 0.15)"
      ></v-text-field>
      <v-btn v-if="showBurnBtn" @click="fetchBin" size="large" class=" mr-8 mt-6 " >查看版本</v-btn>
      <v-dialog v-model="SearchBinmodal"  width="40%">
        <v-card>
          <v-card-text>
            <div class="text-h6 ma-2">當前版本: {{BinName}}</div>
            <div class="text-h6 ma-2" >上傳日期: {{BinTime}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="SearchBinmodal = false"
              >關閉</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn v-if="showBurnBtn" @click="Binmodal = true" size="large" class="ml-7 mr-8 mt-6" color="green-darken-3">上傳更新檔</v-btn>
      <Modal
          v-model="Binmodal"
          title="仿生魚更新檔"
          :closable="false"
          @on-ok="uploadBin"
          @on-cancel="cancel">
          <v-text-field
            v-model="NewversionFileName"
            label="輸入更新版本名稱"
            style="width: 300px;"
          ></v-text-field>
          <input type="file" ref="fileInput" @change="select" />
          </Modal>
          <v-btn v-if="showBurnBtn" @click="Burnmodal = true" size="large" class="ml-7 mr-8 mt-6" color="orange-darken-3">燒錄</v-btn>
      <Modal
          v-model="Burnmodal"
          title="燒錄更新檔"
          :closable="false"
          ok-text="燒錄"
          @on-ok="burnBin"
          @on-cancel="cancel">
          <Checkbox
            :indeterminate="indeterminate"
            :model-value="checkAll"
            @click.prevent="handleCheckAll">全部</Checkbox>
          <CheckboxGroup v-model="BurnFishId">
            <div v-for="(poolname,i) in poolsCode" :key="poolname" class="mt-4 mb-2 text-black text-h8" ><h3 class="mb-2 ">{{ processSectionName(poolname) }}</h3>
                <Checkbox v-for="id in FishId[i]" :key="id" :label="id"></Checkbox>
              </div>
        </CheckboxGroup>
          </Modal>
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
      <v-btn class="ml-7 mr-8 mt-6"
        color="light-blue-darken-4 "
        size="large"
        v-bind="props" type="primary"  v-if="showBurnBtn">新增</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="blue-accent-1">
        <v-btn icon dark @click="dialognew = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增仿生魚</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn  variant="text" @click="newdatas" :disabled="AddButtonDisabled"> 新增 </v-btn>
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
    <div v-for="(poolname,i) in poolsCode" :key="poolname" class="mt-4 mb-2 text-white text-h6" ><h3 class="mb-2 ml-7">{{ processSectionName(poolname) }}</h3>
    <Table v-show="Tableshow[i]" :border="true" :columns="isMobileScreen ? mobileColumns : columns" :data="filteredData(i)" class="ml-7 mr-7">
    <template #id="{ row }">
      <p class="d-flex flex-no-wrap justify-space-between "><strong>{{ row.id.slice(-4) }}</strong><Button  icon="md-images" size="small" @click="row.modal = true"></Button></p>
      <Modal v-model="row.modal" :title="'變更' + row.id + '照片'" :closable="false" @on-ok="changeFishPhoto(row.id,row.photo)" @on-cancel="cancel">
        <RadioGroup class="radio-group" v-model="row.photo">
          <Radio class="radio" label="0">紅色<div style=" background-color: black; border: 2px solid grey;"><v-img class="" src="../assets/fishimage5.png" width="100%" height="100%" style="transform: scale(1.4);"></v-img></div></Radio>
          <Radio class="radio" label="1">橘色<div style=" background-color: black; border: 2px solid grey;"><v-img class="" src="../assets/fishimage2.png" width="100%" height="100%" style="transform: scale(1.4);"></v-img></div></Radio>
          <Radio class="radio" label="2">藍色<div style=" background-color: black; border: 2px solid grey;"><v-img class="" src="../assets/fishimage3.png" width="100%" height="100%" style="transform: scale(1.4);"></v-img></div></Radio>
          <Radio class="radio" label="3">黃色<div style=" background-color: black; border: 2px solid grey;"><v-img class="" src="../assets/fishimage4.png" width="100%" height="100%" style="transform: scale(1.4);"></v-img></div></Radio>
        </RadioGroup>     
        
                 
            </Modal>
   </template>
   <template #active="{ row}">
    <p class="d-flex flex-no-wrap justify-space-between">{{ row.active }}<Button  icon="md-create" size="small" @click="row.ActiveModal = true"></Button></p>
    <Modal v-model="row.ActiveModal" :title="'變更 ' + row.id + ' 狀態'" :closable="false" @on-ok="changeFishActive(row,row.selectActive)" @on-cancel="cancel">
        <RadioGroup class="radio-group" v-model="row.selectActive">
          <Radio class="radio" label="游動中">游動中</Radio>
          <Radio class="radio" label="待機中">待機中</Radio>
          <Radio class="radio" label="維修中">維修中</Radio>
        </RadioGroup>           
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
  <Table  v-if="!Tableshow[i]"  :columns="isMobileScreen? nodatamobileColumns:nodatacolumns" :data="fallbackRow" class="ml-7 mr-7"></Table>
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
            bc:[],
            error:[],
            photoCode:[],
            columns: [
                    {
                        title: 'ID',
                        slot: 'id'
                    },
                    {
                        title: '狀態',
                        slot: 'active',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '版本',
                        key: 'version'
                    },
                    {
                        title: '資料更新時間',
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
                        title: 'ID',
                        slot: 'id',
                        width:100,
                        fixed: 'left'
                    },
                    {
                        title: '狀態',
                        width:82,
                        key: 'active'
                    },
                    {
                        title: '版本',
                        width:70,
                        key: 'version'
                    },
                    {
                        title: '資料更新時間',
                        width:100,
                        key: 'time'
                    },
                    {
                        title: '編輯',
                        slot: 'action',
                        width: 78,
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
                        title: '資料更新時間',
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
                        title: '資料更新時間',
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
            Binmodal:false,
            Burnmodal:false,
            SearchBinmodal:false,
            NewversionFileName:"",
            BinName:"",
            BinTime:"",
            BurnFishId:[],
            indeterminate: true,
            checkAll: false,
            showBurnBtn:false,
            showNewfishBtn:false,
            level: localStorage.getItem('UserLevel'),
        }
      },
      async created() {
        this.formNameMapping(this.instructionCode,this.InstructionName);
        this.formNameMapping(this.poolsCode,this.poolName);
        this.RefreshDatas2();
        if(this.level < 10) this.showBurnBtn = true;
        if(this.level <= 30) this.showNewfishBtn = true;
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
        handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.BurnFishId = [];
                    for (var i = 0; i < this.FishId.length; i++) {
                      var subArray = this.FishId[i];
                      for (var j = 0; j < subArray.length; j++) {
                        this.BurnFishId.push(subArray[j]);
                      }
                    }
                } else {
                    this.BurnFishId = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
        burnBin () {
        axios.post(
          "/api/v1/ota/burn",{
            "fishesUID": this.BurnFishId,
                        },{
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
          )
          .then(async res=> {
              console.log(res);
              if(res.status == 200){
                this.$Message.success('燒錄成功');
                
              }
              else{
                this.$Message.error('燒錄失敗');
              }
              
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              this.$Message.error('燒錄失敗');
          })

        },
        fetchBin() {
          axios.get(
            "https://pre.aifish.cc"+"/api/v1/ota/bin",{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              if(res.status == 200){
                this.BinName = res.data[0].version;
                this.BinTime = this.formatDate(res.data[0].time);
                this.SearchBinmodal = true;
              }
              else
              this.$Message.error('查看失敗');
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('查看失敗');
          })
      },
        uploadBin() {
          if (!this.NewversionFileName.trim()) {
          this.$Message.error('尚未輸入更新檔名稱');
          return;
        }
          if (typeof this.selectFile === 'undefined') {
          this.$Message.error('尚未選擇更新Bin檔');
          return;
        }
        const formData = new FormData()
        formData.append('version', this.NewversionFileName)
        formData.append('bin',this.selectFile)
        axios.post(
          "/api/v1/ota/bin",formData,{
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
                  "https://pre.aifish.cc"+"/api/v1/fish/table/?fishesUID=" + this.FishId[i],
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
                let bcarray = [];
                let errarray = [];
                let photoarray = [];
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
                    const { version, time, active, bc, err, photoCode } = dataArray[dataArray.length - 1];
                    vertionarray.push(version);
                    timearray.push(time);
                    activearray.push(active);
                    bcarray.push(bc);
                    errarray.push(err);
                    photoarray.push(photoCode);
                }
                this.version.push(vertionarray);
                this.time.push(timearray);
                this.active.push(activearray);
                this.bc.push(bcarray);
                this.error.push(errarray);
                this.photoCode.push(photoarray);

                let datas = this.FishId[i].map((item, index) => ({
                    id: this.FishId[i][index],
                    bc: this.bc[i][index],
                    err: this.error[i][index],
                    version: this.version[i][index],
                    photo: this.photoCode[i][index].toString(),
                    time: this.fishformatDate(this.time[i][index]),
                    active: this.proccesactive(this.active[i][index]),
                    modal:false,
                    ActiveModal:false,
                    selectActive: this.proccesactive(this.active[i][index]),
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
    fishformatDate(timestamp) {
      const dateObj = new Date(timestamp * 1000); 
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
      const day = String(dateObj.getDate()).padStart(2, '0'); 
      const hours = dateObj.getHours().toString().padStart(2, '0'); 
      const minutes = dateObj.getMinutes().toString().padStart(2, '0'); 
      const seconds = dateObj.getSeconds().toString().padStart(2, '0'); 
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
          "https://pre.aifish.cc"+"/api/v1/account",
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
    changeFishActive(fishdata,newActive){
      if(newActive == "游動中"){
        newActive = 1;
      }else if(newActive == "維修中"){
        newActive = 2;
      }else newActive = 0;
      axios.post(
        "https://pre.aifish.cc"+"/api/v1/fish/data/",
            {
              "fishData": {
                          [fishdata.id]: {"bc": fishdata.bc, "err": fishdata.err,"active":newActive,"version":fishdata.version}
                      }
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(async res=> {
              console.log(res);
              this.$Message.success('變更狀態成功');
              await this.loadnewdata();
              location.reload();
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('變更狀態失敗');
          })
    },
    changeFishPhoto(id,photonum){
      const photoCode = parseInt(photonum, 10);
      axios.post(
        "https://pre.aifish.cc"+"/api/v1/fish/photo/change",
            {
              "fishUID": id,
              "photoCode": photoCode
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(async res=> {
              console.log(res);
              this.$Message.success('變更照片成功');
              await this.loadnewdata();
              location.reload();
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('變更照片失敗');
          })
    },
      
        
    },
    }
  </script>
  
  <style>
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
  }

  .radio {
    flex-basis: calc(50% - 10px); 
    margin: 5px; 
    width: 45%;
  }
  .searchdisplay{
    display: grid; 
    grid-template-columns: 1fr auto auto auto auto;
  }
  @media screen and (max-width: 600px) {
    .searchdisplay {
      grid-template-columns: 2fr 1fr; 
    grid-auto-rows: auto; 
  }

  .searchdisplay > *:nth-child(n + 3) {
    grid-column: span 3; 
  }
  }
  </style>




  