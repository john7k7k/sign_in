<template>
    <v-container>
    <div class="d-flex justify-center mt-3"><h2>帳號清單</h2></div>
    
    
    </v-container>
    <div v-for="(name,index) in sectionName" :key="name">
    <div   class="mt-4 mb-2"><h4>{{ name }}</h4></div>
    <Table  :columns="isMobileScreen ? mobileColumns : columns" :data="data[index] || fallbackRow" class="mb-8">
      <template #level="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="row.showbtn"  icon="md-create"  size="small" @click="row.modal = true"></Button></p>
            <Modal
              v-model="row.modal"
              title="請選擇要變更的權限:"
              :closable="false"
              @on-ok="changelevel(row.selectedlevel,row.name)"
              @on-cancel="cancel">
              <RadioGroup v-model="row.selectedlevel">
                <Radio label="測試管理員"></Radio>
                <Radio label="總管理員"></Radio>
                <Radio label="全區管理員"></Radio>
                <Radio label="全區工程師"></Radio>
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
                <Radio label="北科"></Radio>
                <Radio label="海科"></Radio>
                <Radio label="先鋒"></Radio>
                <Radio v-for="poolname in poolsCode" :key="poolname" :label="TranSection(poolname)"></Radio>
              </RadioGroup>
          </Modal>
        </template>
      <template #action="{row}">
            <Button v-show="row.showbtn" type="error" size="small" @click="confirm(row.name)">刪除</Button>
        </template>
    </Table>
    </div>
    
  </template>
  
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
                        width: 100,
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
                data: [],
                IP:process.env.VUE_APP_IP,
                sectionOrigin:localStorage.getItem('UserSection'),
                sectionshow:false,
                fallbackRow: {
              name: '無資料',
              level: '',
              section: '',
              showbtn:false,
            },
            modal:false,
            poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
            sectionName:[],
        }
      },
      computed: {
        dataWithFallback(index) {
          return this.data[index].length > 0 ? this.data[index] : [this.fallbackRow];
        },
        
  },
  created() {
    this.sectionsShow();
    this.accountdata();
    window.addEventListener('resize', this.updateScreenSize);
    this.updateScreenSize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
  methods: {
    processSectionName(str) {
        var section = str.substring(0, 3);
        if(section === "001") section = "全區"
        if(section === "002") section = "北科"
        if(section === "003") section = "海科"
        if(section === "004") section = "先鋒"
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
          "/api/v1/account/list/?section="+this.sectionOrigin,{
    headers: {
      Authorization: `Bearer ${this.token}`
    },
    
  }
          )
          .then(res=> {
              console.log(res);
              for(const obj of res.data){
                const {email,level,registrationTime,section,username,userID} = obj;
                const newData = {
                    username,
                    email,
                    level,
                    registrationTime,
                    section,
                    userID,
                    show:false,
                }
                this.userdatas.push(newData)
            }
              res.data.forEach(item => {
                this.processSectionName(item.section)
              });
              for(let i = 0 ; i<this.sectionName.length;i++){
                let datas = [];
                res.data.forEach(item => {
                const sectionResult = this.TranSection(item.section);
                const usernameResult = item.username
                let showbtn = true;
                if (sectionResult.startsWith(this.sectionName[i])) {
                  if(usernameResult === "123") showbtn = false
                  datas.push({
                    email: item.email,
                    level: this.Tranlevel(item.level,item.username,0),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username,
                    showbtn,
                    modal:false,
                    sectionmodal:false,
                    selectedlevel:this.Tranlevel(item.level,item.username,0),
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
              this.data.push(datas);
            }
            
              })
          .catch(err=> {
              console.log(err);
          })
        
      },
      toggleShow(index) {
      this.userdatas[index].show = !this.userdatas[index].show
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
        }else if (level === 10 && section === 0) {
          return "總管理員"
        }else if (level === 20 && section === 0) {
          return "全區管理員"
        }else if (level === 30 && section === 0) {
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
          "/api/v1/account/remove_user/",
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
          "/api/v1/account/revise/level",
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
      changesection(newsection,name){
        let section = "";
        if (newsection.startsWith("全區")) {
          section = "001" + newsection.substring(2);
        }else if (newsection.startsWith("北科")) {
          section = "002" + newsection.substring(2);
        }else if (newsection.startsWith("海科")) {
          section = "003" + newsection.substring(2);
        }else{
          section = "004" + newsection.substring(2);
        }
        axios.post(
          "/api/v1/account/revise/section",
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
  