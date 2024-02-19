<template>
  <div>
    <div>
      <label for="dropdown">選擇控制魚的ID:</label>
      <select id="dropdown" v-model="selectedfishUID" @change="handleChange">
        <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
    <label for="languageSelect">選擇語言:</label>
    <select id="languageSelect" v-model="selectedLanguage" @change="changeLanguage">
      <option value="en-US">英文</option>
      <option value="zh-CN">中文</option>
      <!-- 其他語言選項 -->
    </select>
    <br/>
    <button @click="startSpeechRecognition">開始辨識</button>
    <p>{{ "辨識結果: " +  recognitionResult}}</p>
    <button @click=" submit">提交結果</button>
  </div>
</template>

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
            selectedLanguage: 'en-US', // 預設語言為英文
            recognitionResult: ''
        };
    },
    mounted() {
        // 初始化語音辨
        this.fetchOptions();
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.lang = this.selectedLanguage; // 使用使用者選擇的語言

        // 設定辨識事件的處理函數
        this.recognition.onresult = event => {
        this.recognitionResult = event.results[0][0].transcript;
        
        };
    },
    methods: {
        startSpeechRecognition() {
        // 開始語音辨識
        this.recognition.start();
            this.recognitionResult = "辨識中";
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

  <style>
  div {
  background-color: white;
}
  </style>