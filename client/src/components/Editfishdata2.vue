<template>
  <v-btn  class="  mt-5 ml-6 text-white btn-bg "   icon="mdi mdi-chevron-left" size="45" @click="goBack" ></v-btn>
  <div class="father0">
    <div class="son1">
      <v-avatar class="fishimage" size="450" rounded="0" style="">
        <v-img  :src="fishurl[0]" :style="{ transform: imageScale(FishId,FishPhoto) }"></v-img>
      </v-avatar>
    </div>
    <div class="son2">
      <div  class="text-white ml-3 idtext   font-weight-medium mb-4" >ID</div>
  <div class="d-flex">
    <div class="text-white  font-weight-medium fishIDtext">{{ FishId }}</div>
  <div  class="activetext text-grey font-weight-medium ml-10 mt-16"><h3>[{{ selectactive }}]</h3></div>
  </div>
  <div class="titelbctext text-grey font-weight-medium" v-if="usersection != '003'">電量</div>
  <div class="d-flex" v-if="usersection != '003'">
    <v-btn icon="mdi-numeric-null" height="9" width="9" class="mt-3 mr-5 bcdisplay" :style="{ backgroundColor: getbccolor(FishBc,1) }"></v-btn>
    <v-btn icon="mdi-numeric-null" height="9" width="9" class="mt-3 mx-5 bcdisplay" :style="{ backgroundColor: getbccolor(FishBc,2) }"></v-btn>
    <v-btn icon="mdi-numeric-null" height="9" width="9" class="mt-3 mx-5 bcdisplay" :style="{ backgroundColor: getbccolor(FishBc,3) }"></v-btn>
    <v-btn icon="mdi-numeric-null" height="9" width="9" class="mt-3 mx-5 bcdisplay" :style="{ backgroundColor: getbccolor(FishBc,4) }"></v-btn>
    <v-btn icon="mdi-numeric-null" height="9" width="9" class="mt-3 mx-5 bcdisplay" :style="{ backgroundColor: getbccolor(FishBc,5) }"></v-btn>
    <div class="  text-h5 text-white fishbc-bg mb-1 pb-1 mt-1" >{{FishBc}}%</div>
  </div>
  
  <div  class="titelerrortext  text-grey font-weight-medium bcdisplay">錯誤</div>
  <div>
    <v-card  class="errorcard pa-3 pt-3 pl-4 text-white mt-2">{{ errorcode(FishErr) }}</v-card>
  <div  class="titelcolortext text-grey mt-3 font-weight-medium ">LED顏色設定</div>
  <div class="colorsetfather">
    <v-card  class="colorcard pa-5 pb-7 pl-8 text-grey mt-2">
      <RadioGroup v-model="chooseColor">
     <v-row>
      <v-col>
        <t3> <Radio label="紅色" ></Radio>  
                      <v-btn
                        flat
                        class="mt-2"
                        color="#E53935FF"
                        size="small"
                      ></v-btn>
        </t3>
      </v-col>
      
      <v-col>
        <t3> <Radio label="綠色" ></Radio>  
                      <v-btn
                        flat
                        class="mt-2"
                        color="#00E676"
                        size="small"
                      ></v-btn>
        </t3>
      </v-col>
      <v-col>
        <t3> <Radio label="藍色" ></Radio>  
                      <v-btn
                        flat
                        class="mt-2"
                        color="#00B0FF"
                        size="small"
                      ></v-btn>
        </t3>
      </v-col>
      <v-col>
        <t3> <Radio label="紫色" ></Radio>  
                      <v-btn
                        flat
                        class="mt-2"
                        color="#7E57C2"
                        size="small"
                      ></v-btn>
        </t3>
      </v-col>
      <v-col>
        <t3> <Radio label="白色" ></Radio>  
                      <v-btn
                        flat
                        class="mt-2"
                        color="#FAFAFA"
                        size="small"
                      ></v-btn>
        </t3>
      </v-col>
  </v-row>
</RadioGroup>
  </v-card>
  </div>
  </div >
  <div class="d-flex">
    <v-btn 
            class=" ml-1 cancelcolorfather mt-5"
            variant="outlined"
            width="130"
            @click="editColor(0)" >顏色設定完成</v-btn>
      <v-btn 
            class=" ml-8 cancelcolorbuttom mt-5 text-white"
            variant="outlined"
            width="130"
            @click="editColor(1)" >取消顏色設定  </v-btn>
  
  </div>
    </div>
      
  </div>
  
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
        FishId: localStorage.getItem("EditId"),
        FishBc: localStorage.getItem("EditBc"),
        FishErr: localStorage.getItem("EditErr"),
        FishActive: localStorage.getItem("EditActive"),
        FishPhoto: localStorage.getItem("EditPhoto"),
        usersection:localStorage.getItem('UserSection'),
        token:localStorage.getItem('token'),
        selectcolor:null,
        selectactive:localStorage.getItem("EditActive"),
        afterEditId:null,
        afterEditBc:null,
        afterEditErr:null,
        dialogs: [false, false, false, false, false],
        active:[
            "功能正常-待機中",
            "活動中",
            "維修中"
        ],
        IP:process.env.VUE_APP_IP,
        poolname:localStorage.getItem('Poolname'),
        route:localStorage.getItem('route'),
        dialogControl:false,
        models:[
          "自動",
          "急速",
          "急速悠游",
          "沿牆",
        ],
        chooseColor:"",
        fishurl:[],
        poolcode:localStorage.getItem("Poolcode")
        }
      },
      methods:{
      goBack() {
        window.history.back();
      },
      getImageSource(id, photonum) {
        const idNumber = parseInt(id, 10);
        const photonumNumber = parseInt(photonum, 10);

        if (idNumber === 3002 || idNumber === 3009 || idNumber === 3013) {
          return require("../assets/新花色" + idNumber + ".png");
        } else if (idNumber <= 4000) {
          return require("../assets/fishimage" + (photonumNumber + 1) + ".png");
        } else {
          return require("../assets/海龜.png");
        }
      },
      /*getImageSource(id) {
        return id <= 4000 ? require("../assets/fishimage1.png") : require("../assets/海龜.png");
      },
      imageScale(id,photonum) {
        const photoCode = parseInt(photonum, 10);
        if (photoCode === 0 && id <= 4000) {
            return "scale(1)";
          } else if (photoCode > 0 && id <= 4000) {
            return "scale(1.3) translateY(20px)";
          } else {
            return "scale(0.7)";
          }
      },*/
      imageScale(id, photonum) {
        const photonumNumber = parseInt(photonum, 10);
        return id <= 4000 ? photonumNumber ==1 ? "scale(1)":"scale(0.9)" : "scale(0.7)";
      },
      errorcode(err){
        const errorMapping = {
            "0" : "無錯誤",
            "1" : "AGUE電量傳送異常 量測",
            "2" : "GAGUE電量接收異常",
            "3" : "GAGUE電流傳送異常",
            "4" : "GAGUE電流接收異常",
            "5" : "CHARGER電流上限設置失敗 充電",
            "6" : "CHARGER看門狗鎖定失敗",
            "7" : "CHARGER看門狗解鎖失敗",
            "8" : "PMIC設置錯誤 供電",
            "9" : "重心馬達做動異常 重心",
            "10" : "第一關節輸入電壓異常 關節",
            "11" : "第一關節溫度過高",
            "12" : "第一關節編碼器異常",
            "13" : "第一關節電擊異常",
            "14" : "第一關節過載",
            "15" : "第二關節輸入電壓異常",
            "16" : "第二關節溫度過高",
            "17" : "第二關節編碼器異常",
            "18" : "第二關節電擊異常",
            "19" : "第二關節過載",
            "20" : "第一關節通訊中斷",
            "21" : "第二關節通訊中斷",
            "22" : "雙關節通訊中斷",
            "23" : "第一關節電源線不穩",
            "24" : "第二關節電源線不穩"
        };
        return errorMapping[err];
      },
      editColor (type) {
        let choseColor = ""
        if(type == 1) choseColor = "K0"
        else if(this.chooseColor == "紅色") choseColor = "K1"
        else if(this.chooseColor == "白色") choseColor = "K2"
        else if(this.chooseColor == "綠色") choseColor = "K3"
        else if(this.chooseColor == "藍色") choseColor = "K4"
        else choseColor = "K5"
        if(this.chooseColor !== "" || choseColor == "K0"){
          axios.post(
            /**/"/api/v1/fish/control/?section="+this.poolcode,{
              "fishControl":{
        "led":{
            [this.FishId]:
              choseColor
        },
        "motion":{
            
        },
        "mode":{
            
        }
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
                if(type == 1) {
                  this.$Message.success('取消顏色成功');
                  this.chooseColor = ""
                }
                else this.$Message.success('變更顏色成功');
              }
              else{
                if(type == 1) this.$Message.error('取消顏色失敗');
                else this.$Message.error('變更顏色失敗');
              }
              
          })
          .catch(err=> {
              console.log(err);
              if(type == 1) this.$Message.error('取消顏色失敗');
                else this.$Message.error('變更顏色失敗');
          })
        }else{
          this.$Message.error('請選擇顏色');
        }
        
        },
        ChangeDatas(){
          if(this.afterEditBc == null){
            this.afterEditBc = this.FishBc
          }
          if(this.afterEditErr == null){
            this.afterEditErr = this.FishErr
          }
          axios.post(
            /**/"/api/v1/fish/data/?section=001",{
              "fishData": {
                [this.FishId] : {"bc": this.afterEditBc, "err": this.afterEditErr,"active":TranActive(this.selectactive)},
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
                this.dialog = false
                alert("編輯成功")
              }
              else{
                this.dialog = false
              alert("編輯失敗")
              }
              
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              alert('編輯失敗');
          })
    },
    getbccolor(bc,num){
    bc = parseFloat(bc);
    if(bc >= 80){
      return '#B2FF59'
    }else if(bc >= 60 && num<5 || bc >= 40 && num<4 || bc >= 20 && num<3){
      return '#B2FF59';//綠
    }else if(bc <20 && num<2){
      return '#EF5350';//red
    }else{
      return '#616161';//灰
    }
  },
    ControlFish(move) {
        axios.post(
                /**/"/api/v1/fish/control/?section="+this.poolname,{
                  "fishControl":{
            "led":{
            },
            "motion":{
              "id": this.FishId,
              "motion": move
            },
            "mode":{
              "id": this.FishId,
              "mode": 0
            }
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
                this.$Message.success('可以開始控制');
              }
              else
              this.$Message.error('控制失敗');
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('控制失敗');
          })
        },
        async fetchImageSource(id) {
    try {
        const res = await axios.get(
            /**/"/api/v1/fish/photos/?fishUID=002"+id, { responseType: 'blob', headers: {
                Authorization: `Bearer ${this.token}`
            }}
        );

        console.log(res);

        if (res.data !== undefined) {
            this.fishurl.push(URL.createObjectURL(res.data));
        }else{
          id = parseInt(id.toString().slice(-4))
        if (id === 3002 || id === 3009 || id === 3013) {
            this.fishurl.push(require("../assets/新花色" + id + ".png"));
        } else if (id <= 4000) {
            this.fishurl.push(require("../assets/fishimage1.png"));
        } else {
            this.fishurl.push(require("../assets/海龜.png"));
        }
        }
    } catch (err) {
        id = parseInt(id.toString().slice(-4))
        if (id === 3002 || id === 3009 || id === 3013) {
            this.fishurl.push(require("../assets/新花色" + id + ".png"));
        } else if (id <= 4000) {
            this.fishurl.push(require("../assets/fishimage1.png"));
        } else {
            this.fishurl.push(require("../assets/海龜.png"));
        }
    }
},
        
      
    },
    async created() {
        await this.fetchImageSource(this.FishId);
    },
    }
  </script>
  
  <style scoped>
  .btn-bg{
  position: absolute;
  font-size: 23px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
}
.idtext{
  font-size: 35px;
  transform: scale(1.7);
}
.fishIDtext{
  font-size: 80px;
  letter-spacing: 5px;
}
.activetext{
    letter-spacing: 3px;
    font-size: 18px;
  }
.titelbctext{
    letter-spacing: 3px;
    font-size: 18px;
  }
.titelerrortext{
    letter-spacing: 3px;
    font-size: 18px;
  }
.errorcard{
  border-radius: 20px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  font-size: 25px;
  width:530px;
}
.titelcolortext{
  letter-spacing: 3px;
  font-size: 18px;
}
.colorcard{
  border-radius: 20px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
  width: 530px;
}
.setcolorbuttom{
    border-radius: 80px;
    background-image: url('../assets/顏色設定鈕.png');
    background-position: center;
    background-size: 100% 100%;
    transform: scale(1.2);
}
.cancelcolorfather{
  height: 40px;
  border-radius: 100px;
  background-image: linear-gradient(to right, red, blue);
}
.cancelcolorbuttom{
  border-radius: 100px;
  border-color: aqua;
    background-image: linear-gradient(to right , rgba(255, 255, 255, 0.3), rgba(16, 12, 12, 1), rgba(255, 255, 255, 0.3));
    background-position: center;
    background-size: 100% 100%;
    transform: scale(1.1);
}


@media screen and (min-width: 1601px) {
  .idtext{
  font-size: 40px;
  transform: scale(2);
}
.fishIDtext{
  font-size: 100px;
  letter-spacing: 5px;
}
.activetext{
    letter-spacing: 3px;
    font-size: 28px;
  }
.titelbctext{
    letter-spacing: 3px;
    font-size: 28px;
  }
.titelerrortext{
    letter-spacing: 3px;
    font-size: 28px;
  }
  .titelcolortext{
  letter-spacing: 3px;
  font-size: 28px;
}
  .bcdisplay{
    margin-top: 20px;
  }
  .btn-bg{
  position: relative;
  font-size: 23px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
}
.father0{
  display: flex;
  width: 100%;
}
.son1{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 55%;
  height: 50%;
  align-items: center;
}
.son2{
  display: flex;
  flex-direction: column;
  width: 43%;
  align-items: flex-start;
}
.fishimage{
  transform: scale(1.4);
  margin-top: 6%;
}
}
@media screen and (min-width: 1200px) and (max-width: 1600px){
.father0{
  display: flex;
  width: 100%;
}
.son1{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 55%;
  height: 50%;
  align-items: center;
}
.son2{
  display: flex;
  flex-direction: column;
  width: 43%;
  align-items: flex-start;
}
.fishimage{
  transform: scale(1.4);
  margin-top: 6%;
}
}
@media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){

}
@media screen and (min-width: 601px) and (max-width: 1024px){
}
@media screen and (max-width: 600px){
  .btn-bg{
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.father0{
  display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
}
.son1{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 30%;
  align-items: center;
  margin-top: -15%;
}
.son2{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 15%;
  margin-right: 5%;
  margin-top: -15%;
}
.fishimage{
  transform: scale(1);
}
.errorcard{
  border-radius: 20px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  font-size: 25px;
  width:80%;
}
.colorcard{
  border-radius: 20px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
  width: 530px;
  transform: scale(0.9) ;
}
.titelerrortext{
    letter-spacing: 3px;
    font-size: 18px;
  }
.errorcard{
  border-radius: 20px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  font-size: 25px;
  transform: scale(0.7);
  transform-origin: left top;
  width: 420px;
}
  .titelcolortext{
    letter-spacing: 3px;
    font-size: 18px;
}
.colorcard{
  transform: scale(0.55);
  transform-origin: left top;
}
.idtext{
  font-size: 30px;
}
.fishIDtext{
  font-size: 65px;
}
.activetext{
    letter-spacing: 0.5px;
    font-size: 15px;
    margin-top: -20px;
  }
}
  </style>



  

  