<template>
<v-container >
  <div class="font-weight-black d-flex justify-center text-h4 accountList">維修清單</div>
  <div class="searchandlistblock">
    <!-- 搜尋仿生魚ID搜尋框 -->
    <div v-if="searchandlistshow[0]" class="searchandlist">
      <v-text-field
        v-model = "searchfishid"
        append-icon="mdi-magnify"
        label="搜尋仿生魚ID"
        hide-details
        class=" text-white"
        style="width: 200px;"
        bg-color="rgba(255, 255, 255, 0.15)">
      </v-text-field>
    </div>
    <!-- 搜尋仿生魚ID搜尋框 -->
    <!-- 搜尋零件ID搜尋框 -->
    <div v-if = "searchandlistshow[1]" class="searchandlist">
      <v-text-field
        v-model = "searchelementid"
        append-icon="mdi-magnify"
        label="搜尋零件ID"
        hide-details
        class=" text-white"
        style="width: 200px;"
        bg-color="rgba(255, 255, 255, 0.15)">
      </v-text-field>
    </div>
    <!-- 搜尋零件ID搜尋框 -->
    <!-- 零件表單選擇欄 -->
    <div v-if="searchandlistshow[2]" class="elementlist">
      <div style="color: aliceblue;">
        <v-select 
          v-model="elementitem"
          :items='elements'
          shaped
      >
      </v-select>
      </div>
      <!-- 零件表單選擇欄 -->
    </div>
    <!-- 大表單選擇欄 -->
    <div class="searchandlistautoend">
      <div style="color: aliceblue">
        <v-select 
          v-model="location"
          :items="['仿生魚清單','零件清單','零件使用頻率清單']"
          shaped
        >
        </v-select>
      </div>
    </div>
    <!-- 大表單選擇欄 -->
  </div>
  <!-- 表格選擇 -->
  <div> 
    <Table v-if = 'Tableshow[0]' :columns="columns1" :data="searchfishidfunction()" >
    </Table>
    <div v-if = "Tableshow[1]">
      <div>
        <div class = "stitle">
          <div v-for = "(item,index) in element" :key="index" ref="elementref">
            <div v-if="selectelementlist(item)">
              {{ item }}
              <Table :columns= "columns2" :data="searchelementidfunction(index)"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="Tableshow[2]">
      <canvas ref="myChart" width="600" height="400"></canvas>
    </div>
  </div>
  <!-- 表格選擇 -->
</v-container>
<itext></itext>
</template>
  <script>
  import itext from '@/components/itext.vue';
  import Chart from 'chart.js/auto';
  export default {
    name: 'testmaintenance',
    components: {itext},
    data()  {
    return {
      location:null,
      elementitem:null,
      searchfishid:null,
      searchelementid:null ,
      searchandlistshow:[true,false,false],
      Tableshow:[true,false,false],
      element:[
        '電路板','魚眼','LED燈串','光遮斷開關','紅外線感測器','重心馬達','電池','XM馬達',
        'LORA','無線充電','魚嘴','魚頭','第一關節L','第一關節馬達外殼', '第二關節L',
        '第二關節馬達外殼','魚尾蓋'
      ],
      elements:[
        '全部零件','電路板','魚眼','LED燈串','光遮斷開關','紅外線感測器','重心馬達','電池','XM馬達',
        'LORA','無線充電','魚嘴','魚頭','第一關節L','第一關節馬達外殼', '第二關節L',
        '第二關節馬達外殼','魚尾蓋'
      ],
      columns1: [
        { title: '仿生魚UID', key: 'id', fixed: 'left', width: 110 },
        { title: '電路板', key: 'wireboard', width: 100 },
        { title: '魚眼', key: 'fisheyes', width: 100 },
        { title: 'LED燈串', key: 'LED', width: 100 },
        { title: '光遮斷開關', key: 'photointerrupter', width: 110 },
        { title: '紅外線感測器', key: 'infraredsensor', width: 120 },
        { title: '重心馬達', key: 'gravitymotor', width: 100 },
        { title: '電池', key: 'battery', width: 100 },
        { title: 'XM馬達', key: 'XMmotor', width: 100 },
        { title: 'LORA', key: 'LORA', width: 110 },
        { title: '無線充電', key: 'wirelesscharge', width: 100 },
        { title: '魚嘴', key: 'fishmouth', width: 100 },
        { title: '魚頭', key: 'fishhead', width: 100 },
        { title: '第一關節L', key: 'firstjoint', width: 110 },
        { title: '第一關節馬達外殼', key: 'firstshell', width: 150 },
        { title: '第二關節L', key: 'secondjoint', width: 110 },
        { title: '第二關節馬達外殼', key: 'secondshell', width: 150 },
        { title: '魚尾蓋', key: 'fishtail', fixed: 'right', width: 100 }
      ],
      data1: require('../assets/test_data/maintain/fishlist.js'),
      columns2:[
        {title: '編號',key:'elementid'},
        {title: '位置',key:'fishid'},
        {title: '時數',key:'active'},
        {title: '故障原因',key:'active'}
      ],
      data2: require('../assets/test_data/maintain/elementlist.js')
    };
  },
  created(){
    this.location = '仿生魚表單'
    this.elementitem = '全部零件'
    this.sectionshow();
    this.searchandlistdisplay();
    this.searchfishidfunction();
    this.searchelementidfunction();
    this.selectelementlist();
  },
  methods:{
    sectionshow(){
      if(this.location === '仿生魚清單'){
        this.Tableshow = [true,false,false];
      }
      else if (this.location === '零件清單'){
        this.Tableshow = [false,true,false];
      }
      else if (this.location === '零件使用頻率清單'){
        this.Tableshow = [false,false,true];
      }
    },
    searchandlistdisplay(){
      if(this.location === '仿生魚清單'){
        this.searchandlistshow = [true,false,false];
      }
      else if (this.location === '零件清單'){
        this.searchandlistshow = [false,true,true];
      }
      else if (this.location === '零件使用頻率清單'){
        this.searchandlistshow = [false,false,false]
      }
    },
    searchfishidfunction(){
      if(!this.searchfishid){
        return this.data1;
      }
      else{
        return this.data1.filter(
          item => {
            const itemId = item.id.toString(); 
            return itemId.includes(this.searchfishid.toLowerCase());
          }
        )
      }
    },
    searchelementidfunction(index){
      if(!this.searchelementid){
        return this.data2[index]
      }
      else{
        return this.data2[index].filter(
          item => {
            const itemId = item.elementid; 
            return itemId.includes(this.searchelementid.toUpperCase());
          }
        )
      }
    },
    selectelementlist(item){
      if(this.elementitem === '全部零件'){
        return true;
      }
      else if(this.elementitem === item){
        return true;
      }
    },
  },
  watch:{
    location(){
      this.sectionshow();
      this.searchandlistdisplay();
    },
  },
  mounted() {
    const ctx = this.$refs.myChart;
    const labels = ['一月份', '二月份', '三月份','四月份', '五月份', '六月份', '七月份'];  // 设置 X 轴上对应的标签
    const data3 = {
      labels: labels,
      datasets: [{
        label: '我的第一个折线图',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)', // 设置线的颜色
        backgroundColor: 'rgba(75,0, 0, 0.2)', // 设置填充区域的颜色
        tension: 0.1
      }]
    };
    const config = {
      type: 'line', // 设置图表类型
      data: data3,
    };
    this.myChart = new Chart(ctx, config);
  }
}
</script>
<style>
  .show{
    font-weight: bold;
    font-size: 30px;
    text-align: center;
  }
  .space{
    height: 50px;
    }
  .searchandlistblock{
    display:flex;
    justify-content: center;
  }
  .searchandlist{
    flex: none; 
    color: aliceblue;
  }
  .searchandlistautoend{
    display:flex;
    justify-content:flex-end;
    flex:auto;
    text-align : center;
  }
  .elementlist{
    flex: none; 
    color: aliceblue;
    padding-left: 50px;
  }
  .stitle{
    color: aliceblue;
    font-size: 150%;
    font-weight: bold;
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: center;
  }
  </style>