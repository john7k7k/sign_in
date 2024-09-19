<template>
    <v-container>
        <div class="font-weight-black d-flex justify-center text-h4 accountList">照片影片清單</div>
    </v-container>
    <div><!-- 搜尋仿生魚ID搜尋框 -->
        <v-text-field
        v-model = "searchfishid"
        append-icon="mdi-magnify"
        label="搜尋仿生魚ID"
        hide-details
        class=" text-white "
        style="width: 200px; margin-top: 10; margin-bottom: 10px; margin-left: 28px;"
        bg-color="rgba(255, 255, 255, 0.15)">
        </v-text-field>
    </div><!-- 搜尋仿生魚ID搜尋框 -->
    <div class="main">
        <div class="fishdetail" >
            <div class="ID">ID:3030</div>
            <v-img src="../assets/fishimage2.png" @click="clickimg1 = true" @mouseover="mouse1 = true" @mouseout="mouse1 = false" :class="{img:mouse1}"/>
            <Modal
                v-model="clickimg1"
                title="儲存照片與影片"
                width = "80%"
                style="top: 5%"
                :closable = 'false'
                @on-ok = "ok"
            >
                <template #footer>
                    <transition name="transition-drop">
                        <Button v-show = "showbtn" type="success" :loading="loading1" @click="loading1 = true">下載</Button>
                    </transition>
                    <Button @click="instance('success')">下載成功畫面</Button>
                    <transition name="transition-drop">
                        <Button v-show = "showbtn" type="error" @click="confirm = true">刪除</Button>
                    </transition>
                    <Modal
                        v-model="confirm"
                        title="刪除確認"
                        width="50%"
                    >
                        <template #footer>
                            <Button type="primary" :loading="loading" @click="loading = true">
                                <span v-if="!loading">確認刪除</span>
                                <span v-else>刪除中</span>
                            </Button>
                            <Button @click="confirm = false">返回</Button>
                            <Button @click="instance('success')">刪除成功畫面</Button>
                        </template>
                        <div style="display: flex; align-items: center;">
                            <Icon type="md-warning" color="red" style="font-size: 25px; margin-right: 10px"/>
                            <h4>確認刪除勾選項目嗎?</h4>
                        </div>
                    </Modal>
                    <Button type="primary" @click="selectfunction()" >選擇</Button>
                    <Button @click="clickimg1 = false">返回</Button>
                </template> 
                <p>照片</p>
                <v-container style="display: flex;">
                    <div style="display: flex;">
                        <transition name="transition-drop">
                            <Checkbox v-model="check1" v-show="showsel"></Checkbox>
                        </transition>
                        <div class="pictures" @click="clickimg5 = true" @mouseover="mouse5 = true" @mouseout="mouse5 = false" :class="{img1:mouse5}">
                            <img :src="require('../assets/test_pictures/睡覺不要讓損友發現1.jpg')">
                            <div>睡覺不要讓損友發現1.jpg</div>
                            <Modal
                                v-model="clickimg5"
                                title="睡覺不要讓損友發現1.jpg"
                                width = "60%"
                                :closable = 'false'
                                style="top: 10px"
                            >
                                <div class="picturesdisplayer">
                                    <img :src="require('../assets/test_pictures/睡覺不要讓損友發現1.jpg')" class="img2">
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <transition name="transition-drop">
                            <Checkbox v-model="check2" v-show="showsel"></Checkbox>
                        </transition>
                        <div class="pictures" @click="clickimg6 = true" @mouseover="mouse6 = true" @mouseout="mouse6 = false" :class="{img1:mouse6}">
                            <img :src="require('../assets/test_pictures/睡覺不要讓損友發現2.jpg')">
                            <div>睡覺不要讓損友發現2.jpg</div>
                            <Modal
                                v-model="clickimg6"
                                title="睡覺不要讓損友發現2.jpg"
                                width = "60%"
                                :closable = 'false'
                                style="top: 10px"
                            >
                                <div class="picturesdisplayer">
                                    <img :src="require('../assets/test_pictures/睡覺不要讓損友發現2.jpg')" class="img2">
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <transition name="transition-drop">
                            <Checkbox v-model="check3" v-show="showsel"></Checkbox>
                        </transition>
                        <div class="pictures" @click="clickimg7 = true" @mouseover="mouse7 = true" @mouseout="mouse7 = false" :class="{img1:mouse7}">
                            <img :src="require('../assets/test_pictures/睡覺不要讓損友發現3.jpg')">
                            <div>睡覺不要讓損友發現3.jpg</div>
                            <Modal
                                v-model="clickimg7"
                                title="睡覺不要讓損友發現3.jpg"
                                width = "60%"
                                :closable = 'false'
                                style="top: 10px"
                            >
                                <div class="picturesdisplayer">
                                    <img :src="require('../assets/test_pictures/睡覺不要讓損友發現3.jpg')" class="img2">
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <transition name="transition-drop">
                            <Checkbox v-model="check4" v-show="showsel"></Checkbox>
                        </transition>
                        <div class="pictures" @click="clickimg8 = true" @mouseover="mouse8 = true" @mouseout="mouse8 = false" :class="{img1:mouse8}">
                            <img :src="require('../assets/test_pictures/損友本人.jpg')">
                            <div>損友本人.jpg</div>
                            <Modal
                                v-model="clickimg8"
                                title="損友本人.jpg"
                                width = "60%"
                                :closable = 'false'
                                style="top: 10px"
                            >
                                <div class="picturesdisplayer">
                                    <img :src="require('../assets/test_pictures/損友本人.jpg')" class="img2">
                                </div>
                            </Modal>
                        </div>
                    </div>
                </v-container>
                <p>影片</p>
                <v-container style="display: flex;">
                    <div style="display: flex;">
                        <transition name="transition-drop">
                            <Checkbox v-model="check5" v-show="showsel"></Checkbox>
                        </transition>
                        <div class="videos" @click="clickimg9 = true" @mouseover="mouse9 = true" @mouseout="mouse9 = false" :class="{img1:mouse9}">
                            <video :src="require('../assets/test_videos/兩個傻逼.mp4')"></video>
                            <div>兩個傻逼.mp4</div>
                            <Modal
                                v-model="clickimg9"
                                title="兩個傻逼.jpg"
                                width = "60%"
                                :closable = 'false'
                                style="top: 10px"
                            >
                                <div class="picturesdisplayer">
                                    <video :src="require('../assets/test_videos/兩個傻逼.mp4')" controls class="img2"></video>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <transition name="transition-drop">
                            <Checkbox v-model="check6" v-show="showsel"></Checkbox>
                        </transition>
                        <div class="videos" @click="clickimg10 = true" @mouseover="mouse10 = true" @mouseout="mouse10 = false" :class="{img1:mouse10}">
                            <video :src="require('../assets/test_videos/還敢睡阿柯組長.mp4')"></video>
                            <div>還敢睡阿柯組長.mp4</div>
                            <Modal
                                v-model="clickimg10"
                                title="還敢睡阿柯組長.jpg"
                                width = "60%"
                                :closable = 'false'
                                style="top: 10px"
                            >
                                <div class="picturesdisplayer">
                                    <video :src="require('../assets/test_videos/還敢睡阿柯組長.mp4')" controls class="img2"></video>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </v-container>
            </Modal>
            <div class="detail">
                <div class="red-dot"></div>
                <div class="status">離線中</div>
            </div>
        </div>
        <div class="fishdetail" >
            <div class="ID">ID:4321</div>
            <v-img src="../assets/fishimage3.png" @click="clickimg2 = true" @mouseover="mouse2 = true" @mouseout="mouse2 = false" :class="{img:mouse2}"/>
            <Modal
                v-model="clickimg2"
                title="儲存照片與影片"
                width = "80%"
            >    
            </Modal>
            <div class="detail">
                <div class="green-dot"></div>
                <div class="status">上線中</div>
            </div>
        </div>
        <div class="fishdetail">
            <div class="ID">ID:9907</div>
            <v-img src="../assets/fishimage4.png" @click="clickimg3 = true" @mouseover="mouse3 = true" @mouseout="mouse3 = false" :class="{img:mouse3}"/>
            <Modal
                v-model="clickimg3"
                title="儲存照片與影片"
                width = "80%"
            >    
            </Modal>
            <div class="detail">
                <div class="red-dot"></div>
                <div class="status">離線中</div>
            </div>
        </div>
        <div class="fishdetail">
            <div class="ID">ID:5532</div>
            <v-img src="../assets/fishimage3.png" @click="clickimg4 = true" @mouseover="mouse4 = true" @mouseout="mouse4 = false" :class="{img:mouse4}"/>
            <Modal
                v-model="clickimg4"
                title="儲存照片與影片"
                width = "80%"
            >    
            </Modal>
            <div class="detail">
                <div class="green-dot" ></div>
                <div class="status">上線中</div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            showbtn:false,
            showsel:false,
            mouse1:false,
            mouse2:false,
            mouse3:false,
            mouse4:false,
            mouse5:false,
            mouse6:false,
            mouse7:false,
            mouse8:false,
            mouse9:false,
            mouse10:false,
            clickimg1:false,
            check1:false,
            check2:false,
            check3:false,
            check4:false,
            check5:false,
            check6:false,
            confirm:false,
            loading:false,
            loading1:false,
        }
    },
    methods:{
        selectfunction(){
            this.showbtn = !this.showbtn;
            this.showsel = !this.showsel;
        },
        instance (type) {
                const title = 'Title';
                const content = '<p>Content of dialog</p><p>Content of dialog</p>';
                switch (type) {
                    case 'info':
                        this.$Modal.info({
                            title: title,
                            content: content
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: "刪除成功",
                            content: "已刪除"
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: content
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
    },
    watch:{
        check1(){
            
        }
    },
    computed:{
        
    },
}
</script>
<style scoped>
    .main{
        margin-right: 16px;
        margin-left: 16px;
        display: flex;
        margin-top: 25px;
        flex-wrap: wrap;
    }
    .detail,.ID{
        display: flex;
    }
    .ID{
        justify-content: center;
        color: aliceblue;
        font-size: large;
    }
    .status{
        flex: none;
        color: aliceblue;
        margin-left: 5px;
    }
    .fishdetail{
        flex: none;
        width: 23%;
        margin: 1%
    }
    .red-dot, .green-dot {
        flex: none;
        width: 21px;
        height: 21px;
        border-radius: 50%; /* 圓形 */
        display: inline-block; /* 保持內聯 */
        color: aliceblue
    }
    .red-dot {
        background-color: red; /* 紅色 */
    }
    .green-dot {
        background-color: green; /* 綠色 */
    }
    .img{
        cursor: pointer;
        background-color: grey;
        border-radius: 10%;
    }
    .img1{
        cursor: pointer;
        background-color: powderblue;
        border-radius: 5%;
    }
    .img2{
        object-fit: contain;
        max-width: 100%;
        height: 73vh;
        flex: none;
    }
    .pictures,.videos{
        height: 140px;
        width: 100px;
        margin-left: 1px;
        margin-right: 1px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .pictures img,.videos video{
        margin-top: 5px;
        max-width: 75%; 
        max-height: 100px; 
        flex: none;
        object-fit: contain;
        flex-grow: 1; /* 占據剩餘的垂直空間 */
    }
    .pictures div,.videos div {
        flex: none;
        width: 90%;
        height: 35px;
        font-size: 12px;
        text-align: center;
        display: -webkit-box; /* 必须加上这个属性以便兼容 Webkit 内核的浏览器 */
        -webkit-line-clamp: 2; /* 带前缀的 line-clamp 属性 */
        -webkit-box-orient: vertical; /* 必须加上这个属性以便兼容 Webkit 内核的浏览器 */
        overflow: hidden;
        line-clamp: 2; /* 标准的 line-clamp 属性 */
        word-wrap: break-word; /* 使長詞自動換行 */
        /* background-color: blue; */
    }
    .picturesdisplayer{
        display: flex; /* 使用 Flexbox 布局 */
        justify-content: center; /* 水平居中 */
        height: 100%; /* 占据模态框的整个高度 */
    }
    @media screen and (min-width: 601px) and (max-width: 1024px){
        .main{
            flex-wrap: wrap;
        }
        .fishdetail{
            width: 48%;
            flex: none;
            margin: 1%
        }
    }
    @media screen and (max-width: 600px){
        .main{
            justify-content: center;
        }
        .fishdetail{
            width: 100%;
        }
    }
</style>