<template>
    <div class="box">
        <div class="tital">語音控制</div>
    <div>
      <label for="dropdown" style="color: white;" v-show="false">選擇控制魚的ID:</label>
      <select id="dropdown" v-model="selectedfishUID" @change="handleChange">
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
    <label for="languageSelect" style="color: white;" v-show="false">選擇語言:</label>
    <select id="languageSelect" v-model="selectedLanguage" @change="changeLanguage" style="color: white;" v-show="false">
      <option value="en-US" style="color: white;">英文</option>
      <option value="zh-CN" style="color: white;">中文</option>
      <!-- 其他語言選項 -->
    </select>
    <br/>
    
    <p  class="resultTital">辨識結果</p>
    <v-card class="resultcard"><div class="Resultsword">{{ command }}</div></v-card>
    <v-btn class="btn-bg text-white" @click="toggleSpeechRecognition"  :icon="icon" size="80"></v-btn>
    <div v-show="!isListening" style="color: white;" class="beginWord">開始辨識</div>
    <div v-show="isListening" style="color: white;" class="beginWord">結束辨識</div>
    </div>
</template>
<style scoped>
.box{
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
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
            selectedfishUID: null,
            options: [
                { value: 'option1', label: '選項 1' },
                { value: 'option2', label: '選項 2' },
                { value: 'option3', label: '選項 3' }
            ],
            recognition: null,
            selectedLanguage: 'zh-CN', // 預設語言為中文
            recognitionResult: '',
            command:"",
            isListening:false,
            icon : "mdi mdi-microphone",
        };
    },
    mounted() {
        // 初始化語音辨
        this.fetchOptions();
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.lang = this.selectedLanguage; // 使用使用者選擇的語言
        //this.recognition.continuous = true;
        // 設定辨識事件的處理函數
        this.recognition.onresult = event => {
            this.recognitionResult = event.results[event.results.length - 1][0].transcript;
            this.submit();
            setTimeout(this.startSpeechRecognition.bind(this), 1000);
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
            this.recognitionResult = "辨識中";
            this.command = "辨識中";
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
        }
    }
};
</script>

 