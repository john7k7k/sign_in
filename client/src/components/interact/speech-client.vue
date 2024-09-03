<template>
    <div class="ChoseFishBox" v-show="isChoseFish">
        <div  class="ChoseFishItem1">
            <label class="ChoseFishLabel">{{ ChosefishWord[languageIndex] }}</label>
            <v-btn color="white" class="ChoseFishLabel" icon="mdi mdi-close-thick" variant="text" @click="isChoseFish = false"></v-btn>
        </div>
        <div class="ChoseFishItem2">
            <v-card v-show="this.languageIndex == 0" v-for="(fishName,index) in this.Chfishnicknames" :key="fishName" :class="fishStates[index]==false ?  'ChoseFishcard':'ControledFishcard'" @click="selectFish(fishName)">
                <v-img class="ChoseFishImg" height="80%" :src="fishurl[index]" ></v-img>
                <v-card-title >{{ fishName }}</v-card-title>
            </v-card>
            <v-card v-show="this.languageIndex == 1" v-for="(fishName,index) in this.Enfishnicknames" :key="fishName" :class="fishStates[index]==false ?  'ChoseFishcard':'ControledFishcard'" @click="selectFish(fishName)">
                <v-img class="ChoseFishImg" height="80%" :src="fishurl[index]" ></v-img>
                <v-card-title >{{ fishName }}</v-card-title>
            </v-card>
        </div>
    </div>
    <div class="configureBackdrop" v-show="showBackdrop">
        <div class="startBox">
            <div class="startBoxItem1">
                <div class="startTital" :style="{ fontSize: languageIndex === 1 ? '30px' : '40px' }">{{ titalWord[languageIndex] }}</div>
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
                <v-btn class="startBtnCSS" @click="isChoseFish = true"  variant="flat"  >
                    <div class="startBtnCSScontainer" :style="{ fontSize: languageIndex === 1 ? '16px' : '19px' }">{{ChooseFishWord[languageIndex]}}</div></v-btn>
                <v-btn class="startBtnCSS"  @click="startVoiceRecognition" variant="flat"  >
                    <div class="startBtnCSScontainer" :style="{ fontSize: languageIndex === 1 ? '16px' : '19px' }">{{ startBtnWord[languageIndex] }}</div></v-btn>
            </div>
        </div>
    </div>
    
    <div class="box" >
        <v-btn variant="text" class="exitBtn mdi mdi-exit-to-app" @click="EndVoiceRecognition">{{ExitWord[languageIndex]}}</v-btn>
        
        <div class="tital">{{ChooseFishWord[languageIndex]}}</div>
        
        <v-card class="fishImgSize">
            <v-img class="ChoseFishImg"  height="100%" :src="fishurl[fishImgIndex(ChooseFishWord[languageIndex])]" ></v-img>
        </v-card>
        <v-card class="resultcard">
            <p  class="resultTital">{{ resultWord[languageIndex] }}</p>
            <div class="Resultsword">{{ command }}</div>
        </v-card>
        <p  class="failresultWord" v-show="isFail">{{ failword[languageIndex] }}</p>
        <p class="failresultWord" v-if="isSafari">臨時結果：{{ resultTem }}</p>
        <p class="failresultWord" v-if="isSafari">最終結果:{{ resultwordFinal }}</p>
        <p class="failresultWord" v-if="!isSafari">最終:{{ recognitionResult }}</p>
        <p class="instructionWordCss" v-if="languageIndex === 0">指令表:</p>
        <p class="instructionWordCss" v-if="languageIndex === 0">前進、左轉、右轉、停止</p>
        <p class="instructionWordCss" v-if="languageIndex === 0">往上、往下、平衡</p>
        <p class="instructionWordCss" v-if="languageIndex === 1">Commands:</p>
        <p class="instructionWordCss" v-if="languageIndex === 1">Forward/Go、Turn left、Turn right</p>
        <p class="instructionWordCss" v-if="languageIndex === 1">Stop、Up、Down、Balance</p>
        <!-- <v-btn
        class="btn-bg text-white"
        @mousedown="startSpeechRecognition"
        @mouseup="endSpeechRecognition"
        @mouseleave="endSpeechRecognition"
        @touchstart="startSpeechRecognition"
        @touchend="endSpeechRecognition"
        :class="{ 'ripple-active': isListening }"
        :icon="icon"
        size="80"
        ></v-btn> -->
        
        <v-btn class="btn-bg text-white" @click="toggleSpeechRecognition" :class="{ 'ripple-active': isListening }"
        :icon="icon" size="80"></v-btn>
        <!-- 輝光效果<button class="btn-bg text-white"
        @click="toggleSpeechRecognition"
        :class="[ isListening ? 'ripple-active' : 'glow-on-hover' ]" type="button"><v-icon :icon="icon"></v-icon></button> -->
        <div v-show="!isListening" style="color: white;" class="beginWord">{{ startWord[languageIndex] }}</div>
        <div v-show="isListening" style="color: white;" class="beginWord">{{ endWord[languageIndex] }}</div>
    </div>
</template>



<style scoped>

.glow-on-hover {
    width: 80px; /* 調整為與 <v-btn> 相同的寬度 */
    height: 80px; /* 調整為與 <v-btn> 相同的高度 */
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 50%; /* 確保按鈕是圓形 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 1; /* 持續顯示輝光效果 */
    transition: opacity .3s ease-in-out;
    border-radius: 50%; /* 確保輝光效果是圓形 */
}

.glow-on-hover:active {
    color: #000;
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 50%; /* 確保陰影是圓形 */
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}





.ripple-active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  border: 30px solid #FF5252;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: warn 1.3s ease-out infinite;
  pointer-events: none;
}

@keyframes warn {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.0;
  }
  25% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0.3;
  }
  75% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.0;
  }
}
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
    margin-top: 1%;
    margin-bottom: 1%;
}
.instructionWordCss{
    color:white;
    font-size: 19px;
    font-weight: 600;
    margin-top: 0.3%;
}
.menu-container{
    position: absolute;
    width: 65%;
    top: 75%;
    z-index: 2;
    
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
.ChoseFishBox {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/編輯魚畫面手機背景2.png');
    background-size: cover;
    background-position: top;
    z-index: 5;
}
.ChoseFishItem1{
    width: 100%;
    height: 10%;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    padding: 5%;
    justify-content: space-between;
    align-items: center;
}
.ChoseFishItem2{
    width: 100%;
    height: 90%;
    padding: 0 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y: auto;
}
.ChoseFishcard{
    width: 44%;
    height: 35%;
    margin: 1.5% 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.1); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    color: white;
}
.ControledFishcard{
    width: 44%;
    height: 35%;
    margin: 1.5% 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background-image: linear-gradient(to right bottom, rgba(255,0 , 0, 0.15), rgba(255,0 , 0, 0.01), rgba(255,0 , 0, 0.15));
    background-color: rgba(255, 255, 255, 0.1); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    color: grey;
}
.ChoseFishImg{
    object-fit: cover;
}
@media screen and  (min-width: 1681px){
.ChoseFishLabel{
    font-size: 30px;
}
.ChoseFishBox {
    background-image: url('../../assets/編輯魚bg.jpg');
}
    .configureBackdrop{
    z-index: 1;
    background-image: url('../../assets/語音互動電腦背景.jpg');
    background-size: cover;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
}
.startBox{
    width: 80%;
    height: 75%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(0px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    padding: 3%;
    display: flex;
}
    .startBoxItem1{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
.startBoxItem2{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;

    justify-content: center;
}
.startBtnCSS {
    height: 8%;
    width: 35%;
}
.startTital{
    display: none;
}

.menu-container{
    position: absolute;
    width: 65%;
    top: 77%;
    z-index: 2;
}
    .tital{
    font-weight: bold;
    margin-top: 6%;
    font-size: 60px;
    color: white;
}
.resultTital{
    color: white;
    font-size: 40px;
    font-weight: 600;
}
.fishImgSize{
    background-color: rgba(0, 0, 0, 0); 
    width: 15%;
}
.resultcard{
    width: 40%;
    height: 20%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.3));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
}
.Resultsword{
    font-size: 45px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 50%;
    margin-top: 1%;
    background-color: rgba(255, 255, 255, 0.1);
}
.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 1%;
  }
.beginWord{
    font-size:25px;
    margin-top: 0.5%;
}
}
@media screen and  (min-width: 1025px) and (max-width: 1680px){
    .ChoseFishBox {
    background-image: url('../../assets/編輯魚bg.jpg');
}
.startBox{
    width: 85%;
    height: 75%;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(0px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    padding: 3%;
    display: flex;
}
    .startBoxItem1{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
.startBoxItem2{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;

    justify-content: center;
}
.startBtnCSS {
    height: 8%;
    width: 35%;
}
.startTital{
    display: none;
}
.menu-container{
    position: absolute;
    width: 45%;
    top: 57%;
    z-index: 2;
}
.configureBackdrop{
    z-index: 1;
    background-image: url('../../assets/語音互動電腦背景.jpg');
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
    margin-top: 6%;
    font-size: 45px;
    color: white;
}
.exitBtn{
    color: white;
    /* font-size: 18px; */
    font-size: 22px;
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
.fishImgSize{
    background-color: rgba(0, 0, 0, 0); 
    width: 15%;
}
.resultcard{
    width: 35%;
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
}
.Resultsword{
    font-size: 30px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 70%;
    background-color: rgba(255, 255, 255, 0.1);
}
.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 2%;
  }
.beginWord{
    font-size:20px;
    margin-top: 0.5%;
}
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
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
.exitBtn{
    color: white;
    font-size: 20px;
    font-weight: bold;
    position: fixed;
    right: 1%;
    top: 9%;
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
    font-size: 55px;
    position: relative;
    bottom: 5%;
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
    font-size: 25px;
}
    .tital{
    font-weight: bold;
    margin-top: 18%;
    font-size: 60px;
    color: white;
}
.fishImgSize{
    background-color: rgba(0, 0, 0, 0); 
    width: 30%;
}
.resultTital{
    color: white;
    font-size: 30px;
    font-weight: 600;
}

.resultcard{
    width: 75%;
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
    margin-top: 1%;
}
.Resultsword{
    font-size: 40px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 60%;
    margin-top: 1%;
    background-color: rgba(255, 255, 255, 0.1);
}
.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    transform: scale(1.2);
    margin-top: 14%;
  }
.beginWord{
    font-size:25px;
    margin-top: 3%;
}
}
@media screen and (min-width: 401px) and (max-width: 600px){
.exitBtn{
    color: white;
    font-size: 20px;
    font-weight: bold;
    position: fixed;
    right: 1%;
    top: 9%;
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
.fishImgSize{
    background-color: rgba(0, 0, 0, 0); 
    width: 40%;
}
.resultTital{
    color: white;
    font-size: 25px;
    font-weight: 600;
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
    margin-top: 7%;
}
.Resultsword{
    font-size: 30px;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 90%;
    height: 45%;
    margin-top: 2%;
    background-color: rgba(255, 255, 255, 0.1);
}


.btn-bg{
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: black; 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 30px;
    margin-top: 7%;
  }
.beginWord{
    font-size:20px;
    margin-top: 3%;
}
}
@media screen and (max-width: 400px) {
.exitBtn{
    color: white;
    font-size: 17px;
    font-weight: bold;
    position: fixed;
    right: 1%;
    top: 9%;
}
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
    margin: 0%;
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
.fishImgSize{
    background-color: rgba(0, 0, 0, 0); 
    width: 40%;
}
.resultTital{
    color: white;
    font-size: 20px;
    font-weight: 600;
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
    margin-top: 7%;
}
.Resultsword{
    font-size: 30px;
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
    margin-top: 7%;
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
            failword:["辨識失敗，請再說一次","Recognition failed,please say again"],
            isFail:false,
            isMenuVisible: false,
            languageWord:["選擇語言▼","Language▼"],
            ChooseFishWord:["選擇魚▼","Choose fish▼"],
            ExitWord:["退出","Exit"],
            initialChooseFishWord: ["選擇魚▼", "Choose fish▼"],
            isChoseFish:false,
            fishurl:[],
            fishUIDs:[],
            fishStates:[],
            Chfishnicknames:[],
            Enfishnicknames:[],
            ChosefishWord:["選擇想要控制的魚:","Select the fish you want to control:"],
            countdownTime: 30,
            currentTime: 30,
            timer: null,
            lang:["ch","eng"],
            test:true,
            resultwordFinal:"",
            resultTem:"",
            isSafari:false,

        };
    },
    mounted() {
        // 初始化語音辨
        this.fetchOptions();
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.lang = this.selectedLanguage[this.languageIndex]; // 使用使用者選擇的語言
        
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        //this.recognition.continuous = true;
        if (this.isSafari) {
            this.recognition.interimResults = true;
            
        } else {
          this.recognition.maxSpeechTime = 1000; 
        }
        // 設定辨識事件的處理函數
        this.recognition.onresult = event => {
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    console.log('最終結果：', event.results[i][0].transcript);
                    this.resultwordFinal = event.results[i][0].transcript;
                } else {
                    console.log('臨時結果：', event.results[i][0].transcript);
                    this.resultTem = event.results[i][0].transcript;
                }
                this.recognitionResult = event.results[i][0].transcript;
            }
            if(!this.test) this.submit();
        };
        this.recognition.onend = () => {
            if(this.isListening) this.startSpeechRecognition()
        };
        this.startSpeechRecognition();
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
            this.command = this.commandWord[this.languageIndex];
        },
        endSpeechRecognition(){
            this.isListening = false;
            this.command = "";
            this.recognition.stop();

        },
        submit(){
            axios.post(
                process.env.VUE_APP_SEVER+"/api/v1/fish/voice",
                {
                    text:this.recognitionResult,
                    fishUID: this.selectedfishUID,
                    lang: this.lang[this.languageIndex]
                }
            ).then(({ data }) => {
                this.resetTimer();
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
        // async fetchOptions() {
        //     this.options = Object.keys(this.flatten((await axios.get(
        //     process.env.VUE_APP_SEVER+"/api/v1/alivefish", {"location": "002001001"}
        //     )).data.fishesID)).map(id => ({value: id.slice(-7), label: id.slice(-4)}));
        //     console.log(this.options);
        // },
        async fetchOptions() {
            try {
                const response = await axios.get(
                    process.env.VUE_APP_SEVER+"/api/v1/alivefish?location=002001001",
                    {
                    
                }
                );
                console.log(response);
                if (response.status === 200) {
                    for (var i = 0; i < response.data.length; i++){
                        this.fishStates.push(response.data[i].controlled);
                        this.fishUIDs.push(response.data[i].fishUID);
                        let parts = response.data[i].nickName.split(":");
                        this.Chfishnicknames.push(parts[0]);
                        this.Enfishnicknames.push(parts[1]);
                    }
                    for (var j = 0; j < this.fishUIDs.length; j++) {
                        (function(j) {
                            setTimeout(function() {
                                this.fetchImageSource(this.fishUIDs[j]);
                            }.bind(this), j * 200);
                        }).call(this, j);
                    }
                }
                    

            } catch (error) {
                console.log(error);
            }
        },
        selectFish(fishName){
            let index = null;
            if(this.languageIndex == 0){
                index = this.Chfishnicknames.indexOf(fishName);
            }else{
                index = this.Enfishnicknames.indexOf(fishName);
            }
            if(this.fishStates[index] == false){
                this.selectedfishUID = this.fishUIDs[index];
                this.ChooseFishWord[this.languageIndex] = fishName;
                this.isChoseFish = false;
            }else{
                if(this.languageIndex == 0){
                    this.$Message.error('此魚已被控制，不可選擇');
                }else{
                    this.$Message.error('This fish has been controlled and cannot be selected');
                }
            }
            
        },
        fishImgIndex(fishName){
            let index = null;
            if(this.languageIndex == 0){
                index = this.Chfishnicknames.indexOf(fishName);
            }else{
                index = this.Enfishnicknames.indexOf(fishName);
            }
            return index;
        },
        async fetchImageSource(id) {
            try {
                const res = await axios.get(
                    process.env.VUE_APP_SEVER+"/api/v1/fish/photos/?fishUID="+id, { responseType: 'blob'}
                );
                console.log(res);

                if (res.data !== undefined) {
                    this.fishurl.push(URL.createObjectURL(res.data));
                }else{
                id = parseInt(id.toString().slice(-4))
                if (id === 3002 || id === 3009 || id === 3013) {
                    this.fishurl.push(require("../../assets/新花色" + id + ".png"));
                } else if (id <= 4000) {
                    this.fishurl.push(require("../../assets/fishimage1.png"));
                } else {
                    this.fishurl.push(require("../../assets/海龜.png"));
                }
                }
            } catch (err) {
                id = parseInt(id.toString().slice(-4))
                if (id === 3002 || id === 3009 || id === 3013) {
                    this.fishurl.push(require("../../assets/新花色" + id + ".png"));
                } else if (id <= 4000) {
                    this.fishurl.push(require("../../assets/fishimage1.png"));
                } else {
                    this.fishurl.push(require("../../assets/海龜.png"));
                }
            }
        },
        startVoiceRecognition() {
            if ((this.languageIndex == 0 && this.ChooseFishWord[0] !== "選擇魚▼") || (this.languageIndex == 1 && this.ChooseFishWord[1] !== "Choose fish▼")) {
                this.test = false;
                this.showBackdrop = false;
                axios.post(
                    process.env.VUE_APP_SEVER+"/api/v1/fish/voicestart",
                    {
                        "fishUID": this.selectedfishUID,
                        "section": "002001001"
                        //,"end": true
                    },
                        {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                    }
                    )
                    .then(async res=> {
                        console.log(res);
                        
                    })
                    .catch(err=> {
                        console.log(err);
                    })
                this.startTimer();
            } else {
                if (this.languageIndex == 0) {
                    this.$Message.error('請先選擇要控制的魚');
                } else {
                    this.$Message.error('Please select the fish you want to control first');
                }
            }
        },
        EndVoiceRecognition() {
                axios.post(
                    process.env.VUE_APP_SEVER+"/api/v1/fish/voicestart",
                    {
                        "fishUID": this.selectedfishUID,
                        "section": "002001001",
                        "end": true
                    },
                        {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                    }
                    )
                    .then(async res=> {
                        console.log(res);
                        location.reload();
                    })
                    .catch(err=> {
                        console.log(err);
                    })
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
            this.languageWord[this.languageIndex] = "中文";
          }else if(language == 'en'){
            this.languageIndex = 1;
            this.languageWord[this.languageIndex] = "English";
          }
        this.recognition.lang = this.selectedLanguage[this.languageIndex];
    },
    startTimer() {
                    this.timer = setInterval(() => {
                        if (this.currentTime > 0) {
                            this.currentTime--;
                        } else {
                            location.reload();
                        }
                    }, 1000); 
                },
    resetTimer() {
                    this.stopTimer();
                    this.currentTime = this.countdownTime;
                    this.startTimer();
                },
    stopTimer() {
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }
    }
};
</script>

 