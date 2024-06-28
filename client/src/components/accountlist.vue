<template>
    <v-container>
    <div class="font-weight-black d-flex justify-center text-h4 accountList">帳號清單</div>
    
    
    </v-container>
    <div v-for="(name,index) in sectionName" :key="name">
    <div   class="mt-4 mb-2 ml-8 text-white text-h6"><h4>{{ name }}</h4></div>
    <Table v-if="Tableshow[index]"  :columns="isMobileScreen ? mobileColumns : columns" :data="data[index]" class="mb-8 ml-8 mr-8">
      <template #level="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="row.showbtn"  icon="md-create"  size="small" @click="row.modal = true"></Button></p>
            <Modal
              v-model="row.modal"
              title="請選擇要變更的權限:"
              :closable="false"
              @on-ok="changelevel(row.selectedlevel,row.name)"
              @on-cancel="cancel">
              <RadioGroup v-if="name == '全區'" v-model="row.selectedlevel">
                <Radio label="總管理員"></Radio>
                <Radio label="全區管理員"></Radio>
                <Radio label="全區工程師"></Radio>
                <Radio label="作業員"></Radio>
                <Radio label="用戶"></Radio>
              </RadioGroup>
              <RadioGroup v-if="name != '全區'" v-model="row.selectedlevel">
                <Radio label="分區總管"></Radio>
                <Radio label="分區管理員"></Radio>
                <Radio label="分區工程師"></Radio>
                <Radio label="作業員"></Radio>
                <Radio label="用戶"></Radio>
              </RadioGroup>
          </Modal>
        </template>
        <template #section="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.section }}<Button v-show="row.showbtn" icon="md-create" size="small" @click="row.sectionmodal = true"></Button></p>
            <Modal
              v-model="row.sectionmodal"
              title="請選擇要變更的區域:"
              :closable="false"
              @on-ok="changesection(row.selectsection,row.name)"
              @on-cancel="cancel">
              <RadioGroup v-model="row.selectsection">
                <Radio label="全區"></Radio>
                <Radio v-for="InsName in InstructionName" :key="InsName" :label="InsName"></Radio>
                <Radio v-for="poolname in poolsCode" :key="poolname" :label="processSectionName(poolname)"></Radio>
              </RadioGroup>
          </Modal>
        </template>
      <template #action="{row}">
        <Button v-show="false" type="primary" size="small" @click="Assignmodal = true" class="mr-2">分配</Button>
        <Modal
          v-model="Assignmodal"
          title="分配此帳戶仿生魚UID權限"
          :closable="false"
          ok-text="分配"
          @on-ok="cancel"
          @on-cancel="cancel">
          <CheckboxGroup v-model="AssignFishId">
            <div v-for="(poolname,i) in poolsCode" :key="poolname" class="mt-4 mb-2 text-black text-h8" ><h3 class="mb-2 ">{{ processSectionName(poolname) }}</h3>
                <Checkbox v-for="id in FishId[i]" :key="id" :label="id"></Checkbox>
              </div>
        </CheckboxGroup>
          </Modal>
          
          <Button v-show="row.showbtn" type="error" size="small" @click="confirm(row.name)">刪除</Button>
        </template>
    </Table>
    <Table v-if="!Tableshow[index]"  :columns="isMobileScreen? nodatamobileColumns:nodatacolumns" :data="fallbackRow" class="mb-8 ml-8 mr-8"></Table>
    </div>
    
  </template>

<style>
.accountList{
  color: white;
  margin-top: 7%;
}
.section1{
  padding-left: 290px;
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
  .accountList{
  margin-top: 10%;
}
}

@media screen and (max-width: 600px){
  .accountList{
  margin-top: 15%;
}
  .section1{
  padding-left: 10px;
}
}
</style>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            userdatas:[],
            token:localStorage.getItem('token'),
            show: false,
            isMobileScreen: false,
            columns: [
                    {
                        title: '使用者名稱',
                        key: 'name',
                    },
                    {
                        title: 'Email',
                        key: 'email',
          
                    },
                    {
                        title: '權限',
                        slot: 'level',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '所屬區域',
                        slot: 'section',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '註冊時間',
                        key: 'registrationTime'
                    },
                    {
                        title: ' ',
                        slot: 'action',
                        width: 150,
                        align: 'center',
                    }
                ],
                mobileColumns:[
                    {
                        title: '使用者名稱',
                        key: 'name',
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: 'Email',
                        width: 120,
                        key: 'email',
          
                    },
                    {
                        title: '權限',
                        slot: 'level',
                        width: 150,
                        align: 'left'
                    },
                    {
                        title: '所屬區域',
                        slot: 'section',
                        width: 150,
                        align: 'left'
                    },
                    {
                        title: '註冊時間',
                        width: 120,
                        key: 'registrationTime'
                    },
                    {
                        title: ' ',
                        slot: 'action',
                        width: 70,
                        align: 'center',
                        fixed: 'right',
                    }
                ],
                nodatacolumns: [
                    {
                        title: '使用者名稱',
                        key: 'name',
                    },
                    {
                        title: 'Email',
                        key: 'email',
          
                    },
                    {
                        title: '權限',
                        key: 'level',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '所屬區域',
                        key: 'section',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '註冊時間',
                        key: 'registrationTime'
                    },
                    {
                        title: ' ',
                        key: 'registrationTime',
                        width: 100,
                        align: 'center',
                    }
                ],
                nodatamobileColumns:[
                {
                        title: '使用者名稱',
                        key: 'name',
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: 'Email',
                        width: 120,
                        key: 'email',
          
                    },
                    {
                        title: '權限',
                        key: 'level',
                        width: 150,
                        align: 'left'
                    },
                    {
                        title: '所屬區域',
                        key: 'section',
                        width: 150,
                        align: 'left'
                    },
                    {
                        title: '註冊時間',
                        width: 120,
                        key: 'registrationTime'
                    },
                    {
                        title: ' ',
                        key: 'action',
                        width: 70,
                        align: 'center',
                        fixed: 'right',
                    }
            ],
            data: [],
            IP:process.env.VUE_APP_IP,
            sectionOrigin:localStorage.getItem('UserSection'),
            sectionshow:false,
            fallbackRow: [
              {
                name: '',
                level: "",
                email: "無資料",
                section: "",
                registrationTime: "",
                action: "",
              }
            ],
            modal:false,
            Username: localStorage.getItem('UserName'),
            poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
            poolName: JSON.parse(localStorage.getItem("PoolsName")),
            instructionCode:JSON.parse(localStorage.getItem("InstructionCode")),
            InstructionName:JSON.parse(localStorage.getItem("InstructionName")),
            sectionName:[],
            keyvalueMapping :[],
            Tableshow:[],
            Assignmodal:false,
            FishId:[],
            AssignFishId:[],
        }
      },
      computed: {
        dataWithFallback() {
          return (index) => {
            if (this.data[index].length > 0) {
              return this.data[index];
            }else{
              return this.fallbackRow;
            }
          };
        },
        
  },
  created() {
    this.sectionsShow(); //決定該顯示的區域
    this.formNameMapping(this.instructionCode,this.InstructionName); //產生機構代碼跟名稱對照表 ex:"001":全區
    this.formNameMapping(this.poolsCode,this.poolName);  //產生部門代碼跟名稱對照表   
    this.accountdata();
    this.RefreshDatas2();
    window.addEventListener('resize', this.updateScreenSize);
    this.updateScreenSize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
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
    processSectionName(str) {  //產生用戶的所屬機構-部門名稱
          var section = str.substring(0, 3);
        if(str === "001") return "全區"
        
        else if (str.length === 3) {
          return this.keyvalueMapping[0][section] || "機構";
        } else {
          return this.keyvalueMapping[0][section] + "-" + (this.keyvalueMapping[1][str] || "");
        }
      },
    processSectionNameold(str) {
        var section = str.substring(0, 3);
        if(section === "001") section = "全區"
        else section = this.keyvalueMapping[0][section];
        if (!this.sectionName.includes(section)) {
            this.sectionName.push(section);
        }
    },
    sectionsShow(){
      if(this.sectionOrigin === "001"){
        this.sectionshow = true;
        this.sectionshow2 = true;
        this.sectionshow3 = true;
      }else if(this.sectionOrigin.startsWith("002")){
        this.sectionshow2 = true;
      }else{
        this.sectionshow3 = true;
      }
    },
    accountdata(){
        axios.get(
          process.env.VUE_APP_SEVER+"/api/v1/account/list/?section="+this.sectionOrigin,{
    headers: {
      Authorization: `Bearer ${this.token}`
    },
    
  }
          )
          .then(res=> {
              console.log(res);
              if(this.sectionOrigin === "001"){//產生所有機構的標題
                this.sectionName.push("全區")
                for(let i=0 ; i<Object.keys(this.keyvalueMapping[0]).length ;i++){
                  this.sectionName.push(this.keyvalueMapping[0][this.instructionCode[i]])
                }
              }else{
                res.data.forEach(item => {
                this.processSectionNameold(item.section) //只產生該用戶能收到的帳號機構的標題
              });
              }
              for(let i = 0 ; i<this.sectionName.length;i++){  //產生每個標題中的資料內容
                let datas = [];
                res.data.forEach(item => {
                const sectionResult = this.processSectionName(item.section); //產生用戶所屬區域名稱
                var firstThreeChars = item.section.substring(0, 3);
                let showbtn = true;
                if (sectionResult.startsWith(this.sectionName[i])) {
                  if(item.username === "123" || item.username == this.Username) showbtn = false //使123帳號不能被更改
                  datas.push({
                    email: item.email,
                    level: this.Tranlevel(item.level,item.username,firstThreeChars), //用戶權限名稱
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username,
                    showbtn,
                    modal:false,
                    sectionmodal:false,
                    selectedlevel:this.Tranlevel(item.level,item.username,firstThreeChars),
                    selectsection:sectionResult,
                  });
                }
                
                /*const index = this.data.findIndex(item => item.name === "123");
                if (index !== -1) {
                    const itemToMove = this.data.splice(index, 1)[0];
                    this.data.unshift(itemToMove);
                }
                
                if(this.data2.length > 0){
                  this.fallbackRow2.showbtn = true
                }
                if(this.data3.length > 0){
                  this.fallbackRow3.showbtn = true
                }*/
                
              });
              if(datas.length !== 0){
                this.Tableshow.push(true)
              }else{
                this.Tableshow.push(false)
              }
              this.data.push(datas);
            }
              })
          .catch(err=> {
              console.log(err);
          })
        
      },
    formatDate(timestamp) {
      const dateObj = new Date(timestamp * 1000); 
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
      const day = String(dateObj.getDate()).padStart(2, '0'); 

      return `${year}-${month}-${day}`;
    },
  TranSection(section) {
        if (section == "001") {
          return "全區";
        }else if (section.startsWith("002")) {
            return "北科" + section.substring(3);
        }else if (section.startsWith("003")) {
            return "海科" + section.substring(3);
        }else if (section.startsWith("004")) {
            return "先鋒" + section.substring(3);
        }else{
          return section
        }
      },
      Tranlevel(level,name,section){
        if(name === "123" || level === 5){
          return "最高管理員"
        }else if (level === 10 && section === "001") {
          return "總管理員"
        }else if (level === 20 && section === "001") {
          return "全區管理員"
        }else if (level === 30 && section === "001") {
          return "全區工程師"
        }else if (level === 10 || level === 5) {
          return "分區總管"
        }else if (level === 20 ) {
          return "分區管理員"
        }else if (level === 30 ) {
          return "分區工程師"
        }else if (level === 40 ) {
          return "作業員"
        } else {
          return "用戶"
        }
      },
      remove(username){
        axios.post(
          process.env.VUE_APP_SEVER+"/api/v1/account/remove_user/",
            {
              "username":username,
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(res=> {
              console.log(res);
              this.$Message.success('刪除成功');
              setTimeout(() => {
                location.reload();
              }, 1000);
              
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('刪除失敗');
          })
      },
      changelevel(newlevel,name){
        let level = '';
        if(newlevel === "總管理員" || newlevel === "分區總管"){
          level = 10;
        }else if(newlevel === "測試管理員"){
          level = 5;
        }else if(newlevel === "全區管理員" || newlevel === "分區管理員"){
          level = 20;
        }else if(newlevel === "全區工程師" || newlevel === "分區工程師"){
          level = 30;
        }else if(newlevel === "作業員"){
          level = 40;
        }else{
          level = 80;
        }
        axios.post(
          process.env.VUE_APP_SEVER+"/api/v1/account/revise/level",
            {
              "username":name,
              "newLevel":level
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(res=> {
              console.log(res);
              this.$Message.success('變更權限成功');
              setTimeout(() => {
                location.reload();
              }, 1500);
              
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('變更權限失敗');
          })
      },
      findKey(input) {
        if (input.includes('-')) {
          const [part1, part2] = input.split('-');
          let firstKey = null;
          for (const [key, value] of Object.entries(this.keyvalueMapping[0])) {
            if (value === part1) {
              firstKey = key;
              break;
            }
          }

          if (!firstKey) {
            return "找不到Key";
          }
          let finalKey = null;
          for (const [key, value] of Object.entries(this.keyvalueMapping[1])) {
            if (value === part2 && key.startsWith(firstKey)) {
              finalKey = key;
              break;
            }
          }

          if (!finalKey) {
            return "找不到Key";
          }

          return finalKey;
        } else {
          for (const [key, value] of Object.entries(this.keyvalueMapping[0])) {
            if (value === input) {
              return key;
            }
          }
          return "找不到Key";
        }
      },
      changesection(newsection,name){
        let section = "";
        if (newsection.startsWith("全區")) {
          section = "001" + newsection.substring(2);
        }else {
          section = this.findKey(newsection)
        }
        if(section !== "找不到Key"){
        axios.post(
          process.env.VUE_APP_SEVER+"/api/v1/account/revise/section",
            {
              "username":name,
              "newSection":section
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(res=> {
              console.log(res);
              this.$Message.success('變更權限成功');
              setTimeout(() => {
                location.reload();
              }, 1500);
              
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('變更權限失敗');
          })
        }else{
          this.$Message.error('變更權限失敗');
        }
        
      },
      confirm (name,index,num) {
                this.$Modal.confirm({
                    title: '確定要刪除此帳號嗎?',
                    onOk: () => {
                        this.remove(name,index,num);
                    },
                    onCancel: () => {
                        
                    }
                });
            },
      required (v) {
          return v !== null && v.trim() !== '' || '此區為必填區域'
        },
      updateScreenSize() {
        this.isMobileScreen = window.innerWidth <= 768; 
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
      AssignfishFunction(){
        alert(this.AssignFishId)
      }

    },
    }
    /*分配功能待開發:<Button v-show="row.showbtn && row.level != '總管理員'" type="primary" size="small" @click="Assignmodal = true" class="mr-2">分配</Button> */
  </script>
  
  
  