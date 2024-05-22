<template>
    <div class="configureBackdrop" v-show="showBackdrop">
        <div class="startBox">
            <v-btn   @click="changeLangWord" variant="flat" color="blue-darken-1" >繁中/En</v-btn>
            <v-img src="../../assets/Fishbowl.png"  class="startImg"></v-img>
            <div class="startWordCSS">
                <p>{{ starttitalWord[languageIndex][0] }}</p>
                <p>{{ starttitalWord[languageIndex][1] }}</p>
            </div>
            <v-btn class="startBtnCSS" @click="showBackdrop = false" variant="flat" color="teal-lighten-2"  >{{ startBtnWord[languageIndex] }}</v-btn>
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
    
    <p  class="resultTital">{{ resultWord[languageIndex] }}</p>
    <v-card class="resultcard"><div class="Resultsword">{{ command }}</div></v-card>
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
    background-color: white;
    border-radius: 20px;
    padding: 3%;
    display: flex;
    flex-direction: column;
    align-items: end;
}

.startImg{
    margin: auto;
    width: 65%;
}
.startWordCSS{
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bolder;
}
.startBtnCSS{
    height: 10%;
    width: 80%;
    font-size: 25px;
    margin: auto;
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

@media screen and  (min-width: 1681px){
    .tital{
    font-weight: bold;
    margin-top: 8%;
    font-size: 60px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 40px;
    margin-top: 6%;
}
.resultcard{
    width: 60%;
    height: 30%;
    border-radius: 20px;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
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
    height: 100%;
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
    font-size: 25px;
    margin-top: 3%;
}
.resultcard{
    width: 60%;
    height: 30%;
    border-radius: 20px;
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
    height: 100%;
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
    font-size: 30px;
    margin-top: 10%;
}

.resultcard{
    width: 75%;
    height: 30%;
    border-radius: 20px;
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
    height: 100%;
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
.startBox{
    width: 75%;
    height: 60%;
    background-color: white;
    border-radius: 20px;
    padding: 4%;
    display: flex;
    flex-direction: column;
    align-items: end;
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
    position: relative;
    bottom: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
}
.startBtnCSS{
    height: 10%;
    width: 80%;
    font-size: 25px;
    margin: auto;
    position: relative;
    bottom: 5%;
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
    margin-top: 20%;
}
.resultcard{
    width: 90%;
    height: 20%;
    border-radius: 20px;
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
    height: 100%;
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
    .startBox{
    width: 75%;
    height: 60%;
    background-color: white;
    border-radius: 20px;
    padding: 4%;
    display: flex;
    flex-direction: column;
    align-items: end;
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
    position: relative;
    bottom: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
}
.startBtnCSS{
    height: 10%;
    width: 80%;
    font-size: 25px;
    margin: auto;
    position: relative;
    bottom: 5%;
}
    .tital{
    font-weight: bold;
    margin-top: 30%;
    font-size: 40px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 20px;
    margin-top: 20%;
}
.resultcard{
    width: 90%;
    height: 20%;
    border-radius: 20px;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    margin-top: 3%;
}
.Resultsword{
    font-size: 30px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
}


.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 20%;
    transform: scale(0.9);
  }
.beginWord{
    font-size:15px;
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
            starttitalWord:[["體驗語音操控的樂趣","讓你的聲音引導機器魚游動！"],["Start experiencing your voice","guiding the robotic fish to swim!"]],
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
        };
    },
    mounted() {
        // 初始化語音辨
        this.fetchOptions();
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.lang = this.selectedLanguage[this.languageIndex]; // 使用使用者選擇的語言

        // 設定辨識事件的處理函數
        this.recognition.onresult = event => {
            this.recognitionResult = event.results[0][0].transcript;
            this.submit();
        };
    },
    methods: {
        toggleSpeechRecognition() {
            if (this.isListening) {
                // 如果正在聽，則停止
                
            this.icon = "mdi mdi-microphone";
                this.endSpeechRecognition();
            } else {
                // 如果未聽，則開始
                this.icon = "mdi mdi-microphone-off";
                this.startSpeechRecognition();
            }
            },
        startSpeechRecognition() {
        this.isListening = true;
        
        // 開始語音辨識
        this.recognition.start();
            this.recognitionResult = this.commandWord[this.languageIndex];
            this.command = this.commandWord[this.languageIndex];
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
            ).then(
                ({data}) => this.command = data
            )
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
        changeLangWord(){
          if(this.languageIndex == 0){
            this.languageIndex = 1;
          }else this.languageIndex = 0;
        }
    }
};
</script>

 