<template>
    <div class="configureBackdrop" v-show="showBackdrop">
        <div class="startBox">
            <div class="startBoxItem1">
                <div class="startTital" :style="{ fontSize: languageIndex === 1 ? '40px' : '50px' }">{{ titalWord[languageIndex] }}</div>
            </div>
            <div class="startBoxItem2">
                <div class="startWordCSS">
                    <p>{{ starttitalWord[languageIndex][0] }}</p>
                    <p>{{ starttitalWord[languageIndex][1] }}</p>
                </div>
                <v-btn class="startBtnCSS " @click="toggleMenu" variant="flat">
                    <div class="startBtnCSScontainer" :style="{ fontSize: languageIndex === 1 ? '16px' : '19px' }">{{languageWord[languageIndex]}}</div>
                    </v-btn>
                    <div v-if="isMenuVisible" class="menu-container">
                    <v-list>
                        <v-list-item @click="selectLanguage('zh')">中文</v-list-item>
                        <v-list-item @click="selectLanguage('en')">English</v-list-item>
                    </v-list>
                    </div>
                <v-btn class="startBtnCSS"  @click="showBackdrop = false" variant="flat"  >
                    <div class="startBtnCSScontainer" :style="{ fontSize: languageIndex === 1 ? '16px' : '19px' }">{{ChooseFishWord[languageIndex]}}</div></v-btn>
                <v-btn class="startBtnCSS"  @click="showBackdrop = false" variant="flat"  >
                    <div class="startBtnCSScontainer" :style="{ fontSize: languageIndex === 1 ? '16px' : '19px' }">{{ startBtnWord[languageIndex] }}</div></v-btn>
            </div>
        </div>
    </div>
    <div class="box">
        <v-btn variant="text" class="changeLan" @click="changeLangWord">繁中/En</v-btn>
        <div class="tital">{{ titalWord[languageIndex] }}</div>
        
    <div>
      <label for="dropdown" style="color: white;" v-show="false">選擇控制魚的ID:</label>
      <select id="dropdown" v-model="selectedfishUID" @change="handleChange">
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
    <label for="languageSelect" style="color: white;" v-show="false">選擇語言:</label>
    <select id="languageSelect" v-model="selectedLanguage" @change="changeLanguage" class="changeLanCSS" v-show="false">
      <option value="en-US" style="color: white;">英文</option>
      <option value="zh-CN" style="color: white;">中文</option>
      <!-- 其他語言選項 -->
    </select>
    <br/>
    
    
    <v-card class="resultcard">
        <p  class="resultTital">{{ resultWord[languageIndex] }}</p>
        <div class="Resultsword">{{ command }}</div>
    </v-card>
    <p  class="failresultWord" v-show="isFail">{{ failword[languageIndex] }}</p>
    <v-btn class="btn-bg text-white" @click="toggleSpeechRecognition"  :icon="icon" size="80"></v-btn>
    <div v-show="!isListening" style="color: white;" class="beginWord">{{ startWord[languageIndex] }}</div>
    <div v-show="isListening" style="color: white;" class="beginWord">{{ endWord[languageIndex] }}</div>
    </div>
</template>
<style scoped>
.configureBackdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1; 
}
.startBox{
    width: 35%;
    height: 75%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(0px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    padding: 3%;
    display: flex;
    flex-direction: column;
}
.startImg{
    margin: auto;
    width: 65%;
}
.startWordCSS{
    width: 100%;
    height: 35%;
    color: #29B6F6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bolder;
}
.startBtnCSS {
    position: relative; 
    display: inline-block; 
    background-image: linear-gradient(to right, #add8e6, #ffffff, #ffcccc); 
    border-radius: 20px; 
    height: auto; 
    width: auto; 
    padding: 5px; 
    margin: auto;
    cursor: pointer;
    height: 8%;
    width: 40%;
    transition: background 0.3s, border 0.3s;
}

.startBtnCSScontainer {
    background-image: linear-gradient(to right, #ccc7c7, #000000, #ccc7c7); 
    border-radius: 20px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: white;
    font-size: 18px;
    font-weight:600;
    letter-spacing: 4px;
    padding: 10px 20px; 
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 2px; 
}
.box{
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
}
.changeLanCSS{
    color: white;
}
.failresultWord{
    color: #EF5350;
    font-size: 18px;
    font-weight: 600;
    margin-top: 2%;
}
.menu-container{
    position: absolute;
    width: 65%;
    top: 75%;
    z-index: 99;
    
}
.startBtnCSS {
    position: relative; 
    display: inline-block; 
    background-image: linear-gradient(to right, #91d1e6, #ffffff, #f8a3a3); 
    border-radius: 25px; 
    padding: 5px; 
    margin: auto;
    cursor: pointer;
    height: 14.5%;
    width: 65%;
    margin: auto;
    transition: background 0.3s, border 0.3s;
}
@media screen and  (min-width: 1681px){
.configureBackdrop{
    z-index: 1;
    background-image: url('../../assets/speechBackground.jpg');
    background-size: cover;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
}
    .startBoxItem1{
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
.startBoxItem2{
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
}
.menu-container{
    position: absolute;
    width: 65%;
    top: 77%;
    z-index: 99;
}
    .tital{
    font-weight: bold;
    margin-top: 8%;
    font-size: 60px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 45px;
    font-weight: 600;
}
.resultcard{
    width: 60%;
    height: 30%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.3));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-top: 1%;
}
.Resultsword{
    font-size: 55px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 60%;
    margin-top: 2%;
    background-color: rgba(255, 255, 255, 0.1);
}
.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 6%;
  }
.beginWord{
    font-size:25px;
    margin-top: 1%;
}
}
@media screen and  (min-width: 1025px) and (max-width: 1680px){
    .startBoxItem1{
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
.startBoxItem2{
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
}
.menu-container{
    position: absolute;
    width: 65%;
    top: 77%;
    z-index: 99;
}
.configureBackdrop{
    z-index: 1;
    background-image: url('../../assets/speechBackground.jpg');
    background-size: cover;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
}
    .tital{
    font-weight: bold;
    margin-top: 8%;
    font-size: 45px;
    color: white;
}
.changeLan{
    color: white;
    font-size: 18px;
    font-weight: bold;
    position: fixed;
    right: 1%;
    top: 11.5%;
}
.resultTital{
    color: white;
    font-size: 30px;
    font-weight: 600;
}
.resultcard{
    width: 60%;
    height: 30%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-top: 1%;
}
.Resultsword{
    font-size: 35px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 50%;
    margin-top: 5%;
    background-color: rgba(255, 255, 255, 0.1);
}
.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 4%;
  }
.beginWord{
    font-size:20px;
    margin-top: 1%;
}
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
.startBox{
    width: 60%;
    height: 65%;
    background-color: white;
    border-radius: 20px;
    padding: 3%;
    display: flex;
    flex-direction: column;
    align-items: end;
}
    .tital{
    font-weight: bold;
    margin-top: 18%;
    font-size: 60px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 35px;
    font-weight: 600;
}

.resultcard{
    width: 75%;
    height: 30%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-top: 1%;
}
.Resultsword{
    font-size: 45px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 60%;
    margin-top: 3%;
    background-color: rgba(255, 255, 255, 0.1);
}
.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    transform: scale(1.2);
    margin-top: 15%;
  }
.beginWord{
    font-size:25px;
    margin-top: 3%;
}
}
@media screen and (min-width: 401px) and (max-width: 600px){
.startBtnCSS {
    position: relative; 
    display: inline-block; 
    background-image: linear-gradient(to right, #91d1e6, #ffffff, #f8a3a3); 
    border-radius: 25px; 
    padding: 5px; 
    margin: auto;
    cursor: pointer;
    height: 14.5%;
    width: 65%;
    margin: auto;
    transition: background 0.3s, border 0.3s;
}
.startBtnCSScontainer {
    background-image: linear-gradient(to right, #868383, #000000, #868383); 
    border-radius: 25px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: white;
    font-weight:500;
    letter-spacing: 2px;
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 2.5px;
}
.configureBackdrop {
background-image: url('../../assets/speechBackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: hidden;
  z-index: 1; 
}
.startBox{
    width: 85%;
    height: 80%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(0px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    padding: 4%;
    display: flex;
    margin-top: 10%;
    flex-direction: column;
}
.startBoxItem1{
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.startBoxItem2{
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.startTital{
    color: white;
    font-weight: bold;
    font-size: 50px;
    margin: 10%;
}
.startImg{
    margin: auto;
    width: 65%;
    position: relative;
    bottom: 5%;
}
.startWordCSS{
    width: 100%;
    height: 20%;
    font-size: 20px;
}
    .tital{
    font-weight: bold;
    margin-top: 30%;
    font-size: 45px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 25px;
    font-weight: 600;
}
.failresultWord{
    color: #EF5350;
    font-size: 18px;
    font-weight: 600;
    margin-top: 2%;
}
.resultcard{
    width: 90%;
    height: 15%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-top: 3%;
}
.Resultsword{
    font-size: 35px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 50%;
    margin-top: 2%;
    background-color: rgba(255, 255, 255, 0.1);
}


.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 20%;
  }
.beginWord{
    font-size:20px;
    margin-top: 3%;
}
}
@media screen and (max-width: 400px) {
    .startBtnCSS {
    position: relative; 
    display: inline-block; 
    background-image: linear-gradient(to right, #91d1e6, #ffffff, #f8a3a3); 
    border-radius: 25px; 
    padding: 5px; 
    margin: auto;
    cursor: pointer;
    height: 13%;
    width: 60%;
    margin: auto;
    transition: background 0.3s, border 0.3s;
}
.startBtnCSScontainer {
    background-image: linear-gradient(to right, #868383, #000000, #868383); 
    border-radius: 22px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    color: white;
    font-weight:500;
    letter-spacing: 2px;
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 2.5px;
}
.configureBackdrop {
background-image: url('../../assets/speechBackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: hidden;
  z-index: 1; 
}
.startBox{
    width: 85%;
    height: 80%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(0px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    padding: 4%;
    display: flex;
    margin-top: 10%;
    flex-direction: column;
}
.startBoxItem1{
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.startBoxItem2{
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.startTital{
    color: white;
    font-weight: bold;
    font-size: 25px;
    margin: 1%;
}
.startImg{
    margin: auto;
    width: 65%;
    position: relative;
    bottom: 5%;
}
.startWordCSS{
    width: 100%;
    height: 20%;
    font-size: 18px;
}
    .tital{
    font-weight: bold;
    margin-top: 30%;
    font-size: 45px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 25px;
    font-weight: 600;
}
.failresultWord{
    color: #EF5350;
    font-size: 18px;
    font-weight: 600;
    margin-top: 2%;
}
.resultcard{
    width: 90%;
    height: 15%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-top: 3%;
}
.Resultsword{
    font-size: 35px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 50%;
    margin-top: 2%;
    background-color: rgba(255, 255, 255, 0.1);
}


.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 20%;
  }
.beginWord{
    font-size:20px;
    margin-top: 3%;
}
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            showBackdrop:true,
            starttitalWord:[["體驗語音操控的樂趣","讓聲音引導機器魚游動！"],["Start experiencing your voice","guiding the robotic fish to swim!"]],
            startBtnWord:["開始體驗","Start"],
            selectedfishUID: null,
            options: [
                { value: 'option1', label: '選項 1' },
                { value: 'option2', label: '選項 2' },
                { value: 'option3', label: '選項 3' }
            ],
            recognition: null,
            selectedLanguage: ['zh-CN',"en-US"], // 預設語言為中文
            recognitionResult: '',
            command:"",
            isListening:false,
            icon : "mdi mdi-microphone",
            English: "en-US",
            languageIndex: 0,
            titalWord:["語音控制","Voice Control"],
            resultWord:["辨識結果","Identification results"],
            startWord: ["開始辨識","Start recognition"],
            endWord: ["結束辨識","End recognition"],
            commandWord: ["辨識中","Identifying"],
            failword:["辨識失敗，請再說一次","Recognition failed, please say again"],
            isFail:false,
            isMenuVisible: false,
            languageWord:["選擇語言▼","Language▼"],
            ChooseFishWord:["選擇魚▼","Choose fish▼"]
        };
    },
    mounted() {
        // 初始化語音辨
        this.fetchOptions();
        this.recognition = new window.webkitSpeechRecognition();
        //this.recognition.continuous = true;
        // this.recognition.interimResults = true;
        this.recognition.maxSpeechTime = 1000;
        this.recognition.lang = this.selectedLanguage[this.languageIndex]; // 使用使用者選擇的語言
        // 設定辨識事件的處理函數
        this.recognition.onresult = event => {
            this.recognitionResult = event.results[event.results.length - 1][0].transcript;
            console.log( this.recognitionResult);
            this.submit();
        };
        this.recognition.onend = () => {
            if(this.isListening) setTimeout(this.startSpeechRecognition.bind(this), 500);
        }
    },
    methods: {
        toggleSpeechRecognition() {
            if (this.isListening) {
                // 如果正在聽，則停止
                
            this.icon = "mdi mdi-microphone";
                this.endSpeechRecognition();
            } else {
                // 如果未聽，則開始mdi mdi-microphone-off
                this.icon = "mdi mdi-stop";
                this.startSpeechRecognition();
            }
            },
        startSpeechRecognition() {
        this.isListening = true;
        
        // 開始語音辨識
        this.recognition.start();
            this.recognitionResult = this.commandWord[this.languageIndex];
            this.command = this.commandWord[this.languageIndex];
            this.isFail = false;
        },
        endSpeechRecognition(){
            this.isListening = false;
            this.recognition.stop();
            this.recognition.onresult;

        },
        changeLanguage() {
        // 使用者改變語言時更新辨識的語言設定
        this.recognition.lang = this.selectedLanguage;
        },
        submit(){
            axios.post(
                process.env.VUE_APP_SEVER+"/api/v1/fish/voice",
                {
                    text:this.recognitionResult,
                    fishUID: this.selectedfishUID
                },
                { headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }}
            ).then(({ data }) => {
                if (data.includes("辨識失敗")) {
                    this.isFail = true;
                    this.command = "";
                } else {
                    this.command = data;
                    this.isFail = false;
                }
            }).catch(error => {
                console.error("Error submitting voice data:", error);
            });
        },
        handleChange() {
            this.$emit('change', this.selectedOption);
        },
        async fetchOptions() {
            this.options = Object.keys(this.flatten((await axios.get(
            process.env.VUE_APP_SEVER+"/api/v1/account", { headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            )).data.fishesID)).map(id => ({value: id.slice(-7), label: id.slice(-4)}));
            console.log(this.options);
        },
        traverseAndFlatten(currentNode, target, flattenedKey) {
            for (var key in currentNode) {
                if (Object.prototype.hasOwnProperty.call(currentNode, key)) {
                    var newKey;
                    if (flattenedKey === undefined) {
                        newKey = key;
                    } else {
                        newKey = flattenedKey + '.' + key;
                    }

                    var value = currentNode[key];
                    if (typeof value === "object") {
                        this.traverseAndFlatten(value, target, newKey);
                    } else {
                        target[newKey] = value;
                    }
                }
            }
        },
        flatten(obj) {
            var flattenedObject = {};
            this.traverseAndFlatten(obj, flattenedObject);
            return flattenedObject;
        },
        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },
    selectLanguage(language) {
        this.isMenuVisible = false; 
        if(language == 'zh'){
            this.languageIndex = 0;
          }else if(language == 'en'){
            this.languageIndex = 1;
          }
    },
    // changeLangWord(){
    //       if(this.languageIndex == 0){
    //         this.languageIndex = 1;
    //       }else this.languageIndex = 0;
    //     }
    }
};
</script>

 