<template>
    <v-container>
    <div class="d-flex justify-center mt-3"><h2>帳號清單</h2></div>
    
    
    </v-container>
    <div class="mt-4 mb-2"><h4>全區</h4></div>
    <Table :columns="isMobileScreen ? mobileColumns : columns" :data="dataWithFallback">
      <template #level="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="row.showbtn"  icon="md-create"  size="small" @click="row.modal = true"></Button></p>
            <Modal
              v-model="row.modal"
              title="請選擇要變更的權限:"
              :closable="false"
              @on-ok="changelevel(row.selectedlevel,row.name)"
              @on-cancel="cancel">
              <RadioGroup v-model="row.selectedlevel">
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
              </RadioGroup>
          </Modal>
        </template>
      <template #action="{row, index }">
            <Button v-show="row.showbtn" type="error" size="small" @click="remove(row.name,index,1)">刪除</Button>
        </template>
    </Table>

    <div class="mt-4 mb-2"><h4>北科</h4></div>
  <Table :columns="isMobileScreen ? mobileColumns : columns" :data="dataWithFallback2">
    <template #level="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="fallbackRow2.showbtn" icon="md-create"  size="small" @click="row.modal = true"></Button></p>
            <Modal
              v-model="row.modal"
              title="請選擇要變更的權限:"
              :closable="false"
              @on-ok="changelevel(row.selectedlevel,row.name)"
              @on-cancel="cancel">
              <RadioGroup v-model="row.selectedlevel">
                <Radio label="分區總管"></Radio>
                <Radio label="分區管理員"></Radio>
                <Radio label="分區工程師"></Radio>
                <Radio label="作業員"></Radio>
                <Radio label="用戶"></Radio>
              </RadioGroup>
          </Modal>
        </template>
        <template #section="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.section }}<Button v-show="fallbackRow2.showbtn" icon="md-create" size="small" @click="row.sectionmodal = true"></Button></p>
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
              </RadioGroup>
          </Modal>
        </template>
    <template #action="{row, index }">
            <Button v-show="fallbackRow2.showbtn" type="error" size="small" @click="remove(row.name,index,2)">刪除</Button>
        </template>
  </Table>

  <div class="mt-4 mb-2"><h4>海科</h4></div>
  <Table :columns="isMobileScreen ? mobileColumns : columns" :data="dataWithFallback3">
    <template #level="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="fallbackRow3.showbtn" icon="md-create" size="small" @click="row.modal = true"></Button></p>
            <Modal
              v-model="row.modal"
              title="請選擇要變更的權限:"
              :closable="false"
              @on-ok="changelevel(row.selectedlevel,row.name)"
              @on-cancel="cancel">
              <RadioGroup v-model="row.selectedlevel">
                <Radio label="分區總管"></Radio>
                <Radio label="分區管理員"></Radio>
                <Radio label="分區工程師"></Radio>
                <Radio label="作業員"></Radio>
                <Radio label="用戶"></Radio>
              </RadioGroup>
          </Modal>
        </template>
        <template #section="{row}">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.section }}<Button v-show="fallbackRow3.showbtn" icon="md-create" size="small" @click="row.sectionmodal = true"></Button></p>
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
              </RadioGroup>
          </Modal>
        </template>
    <template #action="{row, index }">
            <Button v-show="fallbackRow3.showbtn" type="error" size="small" @click="remove(row.name,index,3)">刪除</Button>
        </template>
  </Table>
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
                data2: [],
                data3: [],
                IP:process.env.VUE_APP_IP,
                sectionOrigin:localStorage.getItem('UserSection'),
                fallbackRow: {
              name: '',
              level: '無資料',
              section: '',
              showbtn:false,
            },
            fallbackRow2: {
              name: '',
              level: '無資料',
              section: '',
              showbtn:false,
            },
            fallbackRow3: {
              name: '',
              level: '無資料',
              section: '',
              showbtn:false,
            },
            modal:false,
            
        }
      },
      computed: {
        dataWithFallback() {
          return this.data.length > 0 ? this.data : [this.fallbackRow];
        },
        dataWithFallback2() {
          return this.data2.length > 0 ? this.data2 : [this.fallbackRow2];
        },
        dataWithFallback3() {
          return this.data3.length > 0 ? this.data3 : [this.fallbackRow3];
        },
        
  },
  mounted() {
    this.accountdata();
    window.addEventListener('resize', this.updateScreenSize);
    this.updateScreenSize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
  methods: {
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
                const sectionResult = this.TranSection(item.section);
                const usernameResult = item.username
                let showbtn = true;
                if (sectionResult === "全區") {
                  if(usernameResult === "123") showbtn = false
                  this.data.push({
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
                } else if (sectionResult === "北科") {
                  this.data2.push({
                    email: item.email,
                    level: this.Tranlevel(item.level,item.username,1),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username,
                    modal:false,
                    sectionmodal:false,
                    selectedlevel:this.Tranlevel(item.level,item.username,1),
                    selectsection:sectionResult,
                  });
                } else if (sectionResult === "海科") {
                  this.data3.push({
                    email: item.email,
                    level: this.Tranlevel(item.level,item.username,2),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username,
                    modal:false,
                    sectionmodal:false,
                    selectedlevel:this.Tranlevel(item.level,item.username,2),
                    selectsection:sectionResult,
                  });
                }
                const index = this.data.findIndex(item => item.name === "123");
                if (index !== -1) {
                    const itemToMove = this.data.splice(index, 1)[0];
                    this.data.unshift(itemToMove);
                }
                
                if(this.data2.length > 0){
                  this.fallbackRow2.showbtn = true
                }
                if(this.data3.length > 0){
                  this.fallbackRow3.showbtn = true
                }
              });
              })
          .catch(err=> {
              console.log(err);
          })
        
      },
      toggleShow(index) {
      this.userdatas[index].show = !this.userdatas[index].show
    },
    formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}-${month}-${day}`;
  },
  TranSection(section) {
        if (section == "001") {
          return "全區";
        } else if(section == "002"){
          return "北科";
        } 
        else if(section == "003"){
          return "海科";
        }else{
          return section
        }
      },
      Tranlevel(level,name,section){
        if(name === "123" && level === 10){
          return "最高管理員"
        }else if (level === 10 && section === 0) {
          return "總管理員"
        }else if (level === 20 && section === 0) {
          return "全區管理員"
        }else if (level === 30 && section === 0) {
          return "全區工程師"
        }else if (level === 10 ) {
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
      remove(username,index,num){
        axios.post(
          "/api/v1/account/remove_user",
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
              if(num === 1){
                this.data.splice(index, 1);
              }else if (num === 2){
                this.data2.splice(index, 1);
              }else{
                this.data3.splice(index, 1);
              }
              location.reload();
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
        if(newsection === "全區"){
          section = "001"
        }else if(newsection === "北科"){
          section = "002"
        }else{
          section = "003"
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
  