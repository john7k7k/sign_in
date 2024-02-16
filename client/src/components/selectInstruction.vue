<template>
  <div class="box">
    <div class="item1">
      <div><v-img src="../assets/過渡頁面字.png" class="titelword"></v-img></div>
      <div class="font-weight-black titel-Name">{{ titel }}</div>
      <div class="en-titelName">{{entitel}}</div>
      <v-btn variant="elevated" class=" loginbuttom"  width="150" @click="gotohomepage(this.titel)"></v-btn>
    </div>
    <div class="item2">
      <div class="Swiper" @mouseenter="showButtons = true" @mouseleave="showButtons = false">
      <v-btn class="upbutton " v-if="showButtons"  @click="leftSwipe" icon="mdi mdi-chevron-up"></v-btn>
      <v-btn class="downbutton " v-if="showButtons"  @click="rightSwipe" icon="mdi mdi-chevron-down"></v-btn>
      <div class="wordbox"><v-btn @click="leftSwipe" class="changepool font-weight-bold text-white">切換水池</v-btn></div>
      <div class="Swiper-content" >  
        <v-card v-for="name in instructionName" :key="name" class="Swiper-item" width="400" height="250px" variant="elevated">
            <v-img :src="name.imageurl" class="align-end" cover>
            <div class="text-white  ml-5 text-h5 font-weight-black">{{ name.instruction }}</div>
            <div class="text-white mb-16 ml-5 text-h6 font-weight-black" style="white-space: pre-wrap; width: 60%;"> {{name.Eninstruction}} </div>
            </v-img>
        </v-card>   
      </div>
  </div>
    </div>
  </div>
  
</template>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  display: flex;
}
.item1{
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 0 5%;
}
.item2{
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-top: 5%;
}
.titelword{
    width: 70%;
    position: relative;
    bottom: 30%;
    right:1%
    
  }
  .titel-Name{
    color: white;
    font-size: 60px;
    letter-spacing: 7px;
    position: relative;
    top:2%;
  }
  .en-titelName{
    width: 70%;
    color: white;
    font-size: 35px;
    position: relative;
    top:2%;
    left: 1%;
  }
  .loginbuttom{
    border-radius: 80px;
    background-image: url('../assets/查看鈕改.png');
    background-position: center;
    background-size: 101% 101%;
    margin-top: 15%;
    position: relative;
    left: 2%;
    transform: scale(1.1);
}
  .upbutton {
      z-index: 10; 
      position: fixed; 
      left: 71%;
      top: 10%; 
  }
  
  .downbutton{
      z-index: 10; 
      position: fixed; 
      left: 71%;
      bottom: 2%;
  }
@media screen and  (min-width: 1681px){
  .titelword{
    width: 75%;
    
  }
  .titel-Name{
    font-size: 65px;
    letter-spacing: 8px;
  }
  .en-titelName{
    font-size: 40px;
  }
  .one{
        z-index: 2;
        position: absolute;
        transform: scale(1.2) ;
        top: 9%;
        left: 65%;
        width: 50%;
    }
    .two{
        z-index: 9;
        position: absolute;
        transform: scale(1.4) ;
        top: 42.5%;
        left: 65%;
        width: 50%;
    }
    .three{
        z-index: 2;
        position: absolute;
        transform: scale(1.2) ;
        left: 65%;
        top: 79%;
        width: 50%;
    
    }
    .upbutton {
      left: 74%;
  }
  
  .downbutton{
      left: 74%;
  }
}
@media screen and  (min-width: 1025px) and (max-width: 1680px){
.one{
  z-index: 2;
  position: absolute;
  transform: scale(1) ;
  top: 7%;
  left: 60%;
  width: 50%;
}
.two{
  z-index: 9;
  position: absolute;
  transform: scale(1.2) ;
  top: 42.5%;
  left: 60%;
  width: 50%;
}
.three{
  z-index: 2;
  position: absolute;
  transform: scale(1) ;
  top: 79%;
  left: 60%;
  width: 50%;
}
.wordbox,.changepool{
  display: none;
}
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
  .box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
  .item1{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5% 0% 0;
}
.item2{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.titelword{
    width: 70%;
    margin: 0 auto;
    position: relative;
    top:2%;
  }
  .titel-Name{
    color: white;
    font-size: 45px;
    letter-spacing: 5px;
    position: relative;
    top:1%;
  }
  .en-titelName{
    width: auto;
    color: white;
    font-size: 25px;
    
  }
  .loginbuttom{
    border-radius: 80px;
    background-image: url('../assets/查看鈕改.png');
    background-position: center;
    background-size: 101% 101%;
    margin-top: 15%;
    position: relative;
    left: 0%;
    margin-top: 5%;
    transform: scale(1);
}
.wordbox{
  transform: scale(1.2);
  width: 400px;
  position: absolute;
  top:50%;
  bottom: 0;
  left: 0%;
  right:0;
  margin: auto;
  display: flex;
  justify-content: end;
  z-index: 555;
}
.changepool{
  background-color: rgba(0, 0, 0, 0);
  text-decoration: underline;
  font-size: 20px;
}
.one{
  transform: scale(1.2);
  position: absolute;
  top:126%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
}
.two{
  transform: scale(1.2);
  position: absolute;
  top:33%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
}
.three{
  transform: scale(1.2);
  position: absolute;
  top:93%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
}
.upbutton,.downbutton{
    display: none;
  }
}
@media screen and (min-width: 401px) and (max-width: 600px){
.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.item1{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0% 0% 0;
}
.item2{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.titelword{
  width: 70%;
  margin: 0 auto;
  position: relative;
}
.titel-Name{
  color: white;
  font-size: 40px;
  letter-spacing: 5px;
  position: relative;
  top:1%;
}
.en-titelName{
  width: auto;
  color: white;
  font-size: 20px;
    
}
.loginbuttom{
  border-radius: 80px;
  background-image: url('../assets/查看鈕改.png');
  background-position: center;
  background-size: 101% 101%;
  margin-top: 15%;
  position: relative;
  left: 0%;
  margin-top: 10%;
  transform: scale(1);
}
.wordbox{
  transform: scale(0.9);
  width: 400px;
  position: absolute;
  top:35%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
  display: flex;
  justify-content: end;
  z-index: 555;
}
.changepool{
  background-color: rgba(0, 0, 0, 0);
  text-decoration: underline;
  font-size: 20px;
}
.one{
  transform: scale(0.9);
  position: absolute;
  top:106%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
}
.two{
  transform: scale(0.9);
  position: absolute;
  top:13%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
}
.three{
  transform: scale(0.9);
  position: absolute;
  top:63%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
}
.upbutton,.downbutton{
  display: none;
}
}
@media screen and (max-width: 400px) {
  .box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
  .item1{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 8% 0% 0;
}
.item2{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
.titelword{
    width: 60%;
    margin: 0 auto;
    position: relative;
  }
  .titel-Name{
    color: white;
    font-size: 28px;
    letter-spacing: 5px;
    position: relative;
    top:1%;
  }
  .en-titelName{
    width: auto;
    color: white;
    font-size: 15px;
    
  }
.loginbuttom{
  border-radius: 80px;
  background-image: url('../assets/查看鈕改.png');
  background-position: center;
  background-size: 101% 101%;
  margin-top: 15%;
  position: relative;
  left: 0%;
  margin-top: 10%;
  transform: scale(1);
}
.wordbox{
  transform: scale(0.7);
  width: 400px;
  position: absolute;
  top:30%;
  bottom: 0;
  left: -2.5%;
  right:0;
  margin: auto;
  display: flex;
  justify-content: end;
  z-index: 555;
}
.changepool{
  background-color: rgba(0, 0, 0, 0);
  text-decoration: underline;
  font-size: 20px;
}
.one{
  transform: scale(0.7);
        position: absolute;
        top:103%;
        bottom: 0;
        left: -2.5%;
        right:0;
        margin: auto;
}
.two{
  transform: scale(0.7);
  position: absolute;
  top:15%;
  bottom: 0;
  left: -2.5%;
  right:0%;
  margin: auto;
}
.three{
  transform: scale(0.7);
  position: absolute;
  top:60%;
  bottom: 0;
  left: -2.5%;
  right:0;
  margin: auto;
}
.upbutton,.downbutton{
  display: none;
}
}
</style>
  
  <script>
  import axios from 'axios';
  import { Swiper } from '@/swiper/Swiper';
    export default {
      data: () => ({
        classlist:["two","three","one",],
        showButtons:false,
        instructionName:[
            {
                instruction:"台北科技大學",
                Eninstruction:"National Taipei University of Technology",
                imageurl: require("../assets/機構北科.png")
            },
            {
                instruction:"海科館",
                Eninstruction:"Museum of Marine Science and Technology",
                imageurl: require("../assets/機構海科.png")
            },
            {
                instruction:"世貿一館",
                Eninstruction:"Taipei World Trade Center Exhibition Hall 1",
                imageurl: require("../assets/世貿電腦圖2.png")
            },
        ],
        titel:"",
        entitel:"",
        centercardNum:0,
        poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
        poolName: JSON.parse(localStorage.getItem("PoolsName")),
        instructionCode:JSON.parse(localStorage.getItem("InstructionCode")),
        InstructionName:JSON.parse(localStorage.getItem("InstructionName")),
        DepartCode:JSON.parse(localStorage.getItem("DepartCode")),
        DepartName:JSON.parse(localStorage.getItem("DepartName")),
        keyvalueMapping :[],  //keyvalueMapping[0]代表機構對照表，keyvalueMapping[1]代表部門對照表，keyvalueMapping[2]代表水池對照表
        //對照表形式為 "code":"code對應的名稱"
        token:localStorage.getItem('token'),
      }),
      mounted(){
          this.swiper();
          this.leftSwipe();
          this.leftSwipe();
          this.leftSwipe();
      },
      created() {
        this.formNameMapping(this.instructionCode,this.InstructionName);
        this.formNameMapping(this.DepartCode,this.DepartName);
        this.formNameMapping(this.poolsCode,this.poolName);
        
    },
      methods: {
        swiper(){
              this.swiperInstance = new Swiper({
              classList: this.classlist,
              SwiperContent: ".Swiper-content",
          });
          this.titel = this.instructionName[this.centercardNum].instruction;
          this.entitel = this.instructionName[this.centercardNum].Eninstruction;
          },
        leftSwipe() {
          if(this.centercardNum !== this.instructionName.length-1)this.centercardNum += 1;
              else this.centercardNum = 0;
              
              this.titel = this.instructionName[this.centercardNum].instruction;
              this.entitel = this.instructionName[this.centercardNum].Eninstruction;
              this.swiperInstance.__leftMove();
          },
        rightSwipe() {
          if(this.centercardNum !== 0)this.centercardNum -= 1;
              else this.centercardNum = this.instructionName.length-1;
              this.titel = this.instructionName[this.centercardNum].instruction;
              this.entitel = this.instructionName[this.centercardNum].Eninstruction;
              this.swiperInstance.__rightMove();
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
        getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        },
        filterAndSaveToLocalStorage(prefix) {
            const poolLocations = [];
            const poolnames = [];
            for (const key in this.keyvalueMapping[2]) {
              if (key.startsWith(prefix)) {
                poolLocations.push(key);
                poolnames.push(this.keyvalueMapping[2][key]);
              }
            }
            localStorage.setItem("PoolsCode", JSON.stringify(poolLocations));
            localStorage.setItem("PoolsName", JSON.stringify(poolnames));
            window.location.replace(`/home`);
          },
          gotohomepage(selectsection){
            if(selectsection == this.instructionName[0].instruction) selectsection = "002"
            else if(selectsection == this.instructionName[1].instruction) selectsection = "003"
            if(selectsection == "002"){
              localStorage.setItem("chooseSectionname", "北科");
            }else if(selectsection == "003"){
              localStorage.setItem("chooseSectionname", "海科");
            }
            if(selectsection == "002" || selectsection == "003"){
              this.filterAndSaveToLocalStorage(selectsection);
            }
            
          },
          async loadnewdata() {
          try {
            const response = await axios.get(
              /**/"/api/v1/account",
              {
                headers: {
                  Authorization: `Bearer ${this.usertoken}`
                }
              }
            );

            console.log(response);
            if (response.status === 200) {
              window.location.replace(`/home`);
            }
          } catch (error) {
            //console.log(error);
          }
          },
          
      }
    }
  </script>

  

