<template>
  <div class="home">
    <totaldata></totaldata>
    <totaldata3 ></totaldata3>
  </div>

</template>

<script>
  import axios from 'axios';
  import totaldata from '@/components/totaldata.vue';
  import totaldata3 from '@/components/totaldata-3.vue';

  export default {
    name: 'home',
    components: { totaldata, totaldata3 },
    data() {
      return {
        sectionvalue: localStorage.getItem('UserSection'),
        SeaSections: true,
        FishId2:[],
        bc2:[],
        err2:[],
        active2:[],
      };
    },
    methods: {
      section() {
        if (this.sectionvalue == "001" || this.sectionvalue == "003") {
          this.SeaSections = true;
        } else {
          this.SeaSections = false;
        }
      },
      loadnewdata(){
      axios.get(
        "http://"+this.IP+"/api/v1/account",{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
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
                const fish002Data = res.data.fishesID["003"];
                  const fish30Values = [];
                  const fish31Values = [];
                  const fish32Values = [];
                  if(Object.hasOwn(res.data.fishesID,"003")){
                    
                    Object.entries(fish002Data).forEach(([key, value]) => {
                      if (value === 1) {
                        fish31Values.push(key)
                      } else if (value === 2) {
                        fish32Values.push(key)
                      } else {
                        fish30Values.push(key)
                      }
                    });
                  }
                localStorage.setItem("fish20", JSON.stringify(fish20Values));
                localStorage.setItem("fish21", JSON.stringify(fish21Values));
                localStorage.setItem("fish22", JSON.stringify(fish22Values));
                localStorage.setItem("fish30", JSON.stringify(fish30Values));
                localStorage.setItem("fish31", JSON.stringify(fish31Values));
                localStorage.setItem("fish32", JSON.stringify(fish32Values));
                this.RefreshDatas()
              }
          })
          .catch(err=> {
              console.log(err);
          })
      },
      RefreshDatas() {
      const fish21Data = localStorage.getItem("fish21");
      const parsedFish21Data = JSON.parse(fish21Data);
      this.FishId2 = parsedFish21Data
      const fish20Data = localStorage.getItem("fish20");
      const parsedFish20Data = JSON.parse(fish20Data);
      this.FishId2.push(...parsedFish20Data)
      const fish22Data = localStorage.getItem("fish22");
      const parsedFish22Data = JSON.parse(fish22Data);
      this.FishId2.push(...parsedFish22Data)
      this.FishId2 = this.FishId2.map((str) => {
              const num = parseInt(str, 10);
              return isNaN(num) ? 0 : num; 
            });
      
      if (this.FishId2 != null) {
        this.bc2 = [];
        this.err2 = [];
        this.active2 = [];
        axios.get(
          "http://"+this.IP+"/api/v1/fish/data/?section=002&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              const responseData = JSON.stringify(res.data["002"]);
              const parsedResponseData = JSON.parse(responseData);
              const currentTime = new Date();
              const year = currentTime.getFullYear();
              const month = String(currentTime.getMonth() + 1).padStart(2, '0');
              const day = String(currentTime.getDate()).padStart(2, '0');
              const hours = String(currentTime.getHours()).padStart(2, '0');
              const minutes = String(currentTime.getMinutes()).padStart(2, '0');
              const seconds = String(currentTime.getSeconds()).padStart(2, '0');
              const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              this.time = formattedDate
              localStorage.setItem("NewTime",formattedDate)
              this.processData(this.FishId2, parsedResponseData);
              localStorage.setItem("totalBc2", this.bc);
              localStorage.setItem("totalErro2", this.err);
              localStorage.setItem("totalActive2", this.active);
          })
          .catch(err=> {
              console.log(err);
          })
        
      } else {
        alert("無資料");
      }
    },
    RefreshDatas3() {
      const fish21Data = localStorage.getItem("fish21");
      const parsedFish21Data = JSON.parse(fish21Data);
      this.FishId2 = parsedFish21Data
      const fish20Data = localStorage.getItem("fish20");
      const parsedFish20Data = JSON.parse(fish20Data);
      this.FishId2.push(...parsedFish20Data)
      const fish22Data = localStorage.getItem("fish22");
      const parsedFish22Data = JSON.parse(fish22Data);
      this.FishId2.push(...parsedFish22Data)
      this.FishId2 = this.FishId2.map((str) => {
              const num = parseInt(str, 10);
              return isNaN(num) ? 0 : num; 
            });
      
      if (this.FishId2 != null) {
        this.bc2 = [];
        this.err2 = [];
        this.active2 = [];
        axios.get(
          "http://"+this.IP+"/api/v1/fish/data/?section=002&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              const responseData = JSON.stringify(res.data["002"]);
              const parsedResponseData = JSON.parse(responseData);
              const currentTime = new Date();
              const year = currentTime.getFullYear();
              const month = String(currentTime.getMonth() + 1).padStart(2, '0');
              const day = String(currentTime.getDate()).padStart(2, '0');
              const hours = String(currentTime.getHours()).padStart(2, '0');
              const minutes = String(currentTime.getMinutes()).padStart(2, '0');
              const seconds = String(currentTime.getSeconds()).padStart(2, '0');
              const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              this.time = formattedDate
              localStorage.setItem("NewTime",formattedDate)
              this.processData(this.FishId2, parsedResponseData);
              localStorage.setItem("totalBc2", this.bc2);
              localStorage.setItem("totalErro2", this.err2);
              localStorage.setItem("totalActive2", this.active2);
          })
          .catch(err=> {
              console.log(err);
          })
        
      } else {
        alert("無資料");
      }
    },
    processData(ids, data) {
      ids.forEach((id) => {
      const { bc, err, active } = data[id];
      this.bc2.push(bc);
      this.err2.push(err);
      this.active2.push(active);
        });
    },
    },
  };
</script>




<style>


</style>
