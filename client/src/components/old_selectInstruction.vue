<template>
    <div class="font-weight-black text-white titel-Name">{{ titel }}</div>
    <div class=" text-white en-titelName" style="white-space: pre-wrap;">{{ entitel }}</div>
    <v-btn variant="elevated" class="mb-10 loginbuttom"  width="150" @click="gotohomepage(this.titel)"></v-btn>
     <div class="Swiper" @mouseenter="showButtons = true"
          @mouseleave="showButtons = false">
        <v-btn class="upbutton " v-if="showButtons"  @click="leftSwipe" icon="mdi mdi-chevron-up"></v-btn>
        <v-btn class="downbutton " v-if="showButtons"  @click="rightSwipe" icon="mdi mdi-chevron-down"></v-btn>
        <div class="Swiper-content" >  
          <v-card v-for="name in instructionName" :key="name" class="Swiper-item" width="400" height="250px" variant="elevated">
              <v-img
              :src="name.imageurl"
              class="align-end"
              
              cover>
              <div class="text-white  ml-5 text-h5 font-weight-black">{{ name.instruction }}</div>
              <div class="text-white mb-16 ml-5 text-h6 font-weight-black" style="white-space: pre-wrap; width: 60%;"> {{name.Eninstruction}} </div>
              </v-img>
          </v-card>   
        </div>
    </div>
    </template>
    
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
                process.env.VUE_APP_SEVER+"/api/v1/account",
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
  
    <style scoped>
  .one{
        z-index: 2;
        position: absolute;
        transform: scale(1) ;
        top: 5.9%;
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
    .forIpadcenter{
      margin-top: -30%;
      margin-left: 55%;
        position: relative;
        transform: scale(1);
        width: 100%;
    }
    .forIpadcenter + .forIpadcenter {
        margin-top: 1.5%; 
    }
    .upbutton {
        z-index: 10; 
        position: fixed; 
        left: 71%;
        top: 3%; 
    }
    
    .downbutton{
        z-index: 9; 
        position: fixed; 
        left: 71%;
        bottom: 2%;
    }
    .titel-Name{
      font-size: 60px;
      position: absolute;
      left: 2.3%;
      top: 45%;
      letter-spacing: 7px;
    }
    .en-titelName{
      font-size: 35px;
      position: absolute;
      left: 2.5%;
      top: 58%;
      width: 30%;
    }
    .loginbuttom{
      border-radius: 80px;
      background-image: url('../assets/查看鈕改.png');
      background-position: center;
      background-size: 101% 101%;
      transform: scale(1.1);
      left: 3.5%;
      top: 22%;
  }
  @media screen and (max-width: 600px){
    .one {
        display: none;
    }
    .two {
        margin-top: -10%;
        position: relative;
        transform: scale(0.8) translateX(-74%);
        width: 100%;
    }
  
    .two + .two {
        margin-top: -10%; 
    }
    .three{
      margin-top: -5%;
        position: relative;
        transform: scale(0.8);
        width: 100%;
    }
    .upbutton {
        display: none;
    }
    
    .downbutton{
        display: none;
    }
    .titel-Name{
      display: none;
    }
    .en-titelName{
      display: none;
    }
    .loginbuttom{
      border-radius: 80px;
      background-image: url('../assets/查看鈕改.png');
      background-position: center;
      background-size: 101% 101%;
      left: 30%;
      top: -2%;
      transform: scale(1);
  }
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){
    .titel-Name{
      font-size: 60px;
      position: absolute;
      left: 2.3%;
      top: 40%;
      letter-spacing: 7px;
    }
    .en-titelName{
      font-size: 35px;
      position: absolute;
      left: 2.5%;
      top: 52%;
      width: 50%;
    }
    .loginbuttom{
      border-radius: 80px;
      background-image: url('../assets/查看鈕改.png');
      background-position: center;
      background-size: 101% 101%;
      left: 3.5%;
      top: 40%;
      transform: scale(1.1);
  }
  }
  </style>
  
  