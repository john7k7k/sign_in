<template>
  <div class="mt-4 mb-2"><h4>北科</h4></div>
  <Table :columns="columns" :data="dataWithFallback"></Table>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
          userdatas:[],
          token:localStorage.getItem('token'),
          show: false,
          columns: [
                      {
                    type: 'expand',
                    width: 50,
                    render: (h, { row: { email, registrationTime } }) => {
                      if (this.data.length > 0) {
                          return h('div', [
                          h('div', 'email: ' + email),
                          h('div', '註冊時間: ' + registrationTime)
                        ]);
                        } else {
                          return null;
                        }
                    }
                  },
                  {
                      title: '使用者名稱',
                      key: 'name'
                  },
                  {
                      title: '權限等級',
                      key: 'level',
        
                  },
                  {
                      title: '所屬區域',
                      key: 'section'
                  },
              ],
              data: [],
              IP:process.env.VUE_APP_IP,
              fallbackRow: {
            name: '',
            level: '無資料',
            section: '',
          }
      }
    },
    computed: {
      dataWithFallback() {
        return this.data.length > 0 ? this.data : [this.fallbackRow];
      }
},
    methods: {
    accountdata(){
      axios.get(
          "/api/v1/account/list/?section=002",{
  headers: {
    Authorization: `Bearer ${this.token}`
  }
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
          this.data = res.data.map(item => ({
            email: item.email,
            level: item.level,
            passcode: item.passcode,
            registrationTime: this.formatDate(item.registrationTime),
            section: this.TranSection(item.section),
            userID: item.userID,
            name: item.username
          }));
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
