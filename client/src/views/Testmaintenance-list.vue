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
        <!-- 零件使用清單選擇欄 -->
      </div>
      <!-- 零件使用頻率選擇欄 -->
      <div v-if="searchandlistshow[3]" class="elementlist">
        <div style="color: aliceblue;">
          <v-select 
            v-model="elementuseitem"
            :items='elements'
            shaped
          >
          </v-select>
        </div>
      <!-- 零件使用選擇欄 -->
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
      <Table v-if = 'Tableshow[0]' :columns="fishcolumns" :data="searchfishidfunction()" >
      </Table>
      <div v-if = "Tableshow[1]">
        <div class = "stitle">
          <div v-for = "(item,index) in element" :key="index">
            <div v-if="selectelementlist(item)">
              {{ item }}
              <Table :columns= "elementcolumns" :data="searchelementidfunction(index)"></Table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Tableshow[2]">
        <div v-for="(item,index) in element " :key = 'index'  style="display: flex; align-items: center;" >
          <div v-if="selectelementuselist(item)" class="stitle2" style=" width: 50%; flex: none; " >
            {{ item }}
            <Bar :data="chartDatalist[index]" :options="chartoption"/>
          </div>
          <div v-if="selectelementuselist(item)" class="stitle2" style=" width: 50%; flex: none; ">
            <p>最大值:{{ maxfunction(index) }}</p>
            <p>最小值:{{ minifunction(index) }}</p>
            <p>平均數:{{ averagefunction(index) }}</p>
            <p>中位數:{{ medianfunction(index) }}</p>
            <!-- {{ getChartData() }} -->
          </div>
        </div>
      </div>
    </div>
    <!-- 表格選擇 -->
  </v-container>
</template>
<script>
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    export default {
    name: 'testmaintenance',
    components:{ Bar },
    data()  {
      return {
        chartDatalist: require('../assets/test_data/maintain/chartlist'),
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            title: {
              display: true,
              text: 'Bar Chart Example'
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        },
        location:null,
        elementitem:null,
        elementuseitem:null,
        searchfishid:null,
        searchelementid:null ,
        searchandlistshow:[true,false,false,false],
        Tableshow:[true,false,false],
        element:[
          '電路板','魚眼','LED燈串','光遮斷開關','紅外線感測器','重心馬達','電池','XM馬達',
          'LORA','無線充電','魚嘴','魚頭','第一關節L','第一關節馬達外殼', '第二關節L',
          '第二關節馬達外殼','樹梅派','SG90馬達','POGO','魚尾蓋'
        ],
        elements:[
          '全部零件','電路板','魚眼','LED燈串','光遮斷開關','紅外線感測器','重心馬達','電池','XM馬達',
          'LORA','無線充電','魚嘴','魚頭','第一關節L','第一關節馬達外殼', '第二關節L',
          '第二關節馬達外殼','樹梅派','SG90馬達','POGO','魚尾蓋'
        ],
        fishcolumns: [
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
          { title: '樹梅派', key: 'rasberrypizero', width: 110 },
          { title: 'SG90馬達', key: 'SG90', width: 100 },
          { title: 'POGO', key: 'POGO', width: 120 },
          { title: '魚尾蓋', key: 'fishtail', fixed: 'right', width: 100 },
        ],
        fishlist: require('../assets/test_data/maintain/fishlist.js'),
        elementcolumns:[
          {title: '編號',key:'elementid'},
          {title: '位置',key:'fishid'},
          {title: '時數',key:'active'},
          {title: '故障原因',key:'active'}
        ],
        elementlist: require('../assets/test_data/maintain/elementlist.js')
    }
  },
  created(){
    this.location = '仿生魚表單'
    this.elementitem = '全部零件'
    this.elementuseitem = '全部零件'
    this.sectionshow();
    this.searchandlistdisplay();
    this.searchfishidfunction();
    this.searchelementidfunction();
    this.selectelementlist();
    this.selectelementuselist();
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
        this.searchandlistshow = [true,false,false,false];
      }
      else if (this.location === '零件清單'){
        this.searchandlistshow = [false,true,true,false];
      }
      else if (this.location === '零件使用頻率清單'){
        this.searchandlistshow = [false,false,false,true];
      }
    },
    searchfishidfunction(){
      if(!this.searchfishid){
        return this.fishlist;
      }
      else{
        return this.fishlist.filter(
          item => {
            const itemId = item.id.toString(); 
            return itemId.includes(this.searchfishid.toLowerCase());
          }
        )
      }
    },
    searchelementidfunction(index){
      if(!this.searchelementid){
        return this.elementlist[index]
      }
      else{
        return this.elementlist[index].filter(
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
    selectelementuselist(item){
      if(this.elementuseitem === '全部零件'){
        return true;
      }
      else if(this.elementuseitem === item){
        return true;
      }
    },
    maxfunction(index){
      let array = this.chartDatalist[index].datasets[0].data;
      return Math.max(...array);
    },
    minifunction(index){
      let array = this.chartDatalist[index].datasets[0].data;
      return Math.min(...array);
    },
    averagefunction(index){
      let array = this.chartDatalist[index].datasets[0].data;
      let sum = 0;
      for(let i = 0;i < array.length;i++){
        sum += array[i];
      }
      return Math.round(sum/array.length);
    },
    medianfunction(index){
      let array = Array.from(this.chartDatalist[index].datasets[0].data);
      array.sort((a,b) => a-b)
      if(array.length % 2 == 1){
        return array[array.length/2]
      }
      else{
        return (array[array.length/2]+array[(array.length/2)-1])/2
      }
    },
  },
  watch:{
    location(){
      this.sectionshow();
      this.searchandlistdisplay();
    },
  },
}

</script>
<style scoped>
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
  }
  .stitle{
    color: aliceblue;
    font-size: 150%;
    font-weight: bold;
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: center;
  }
  .stitle2{
    color: aliceblue;
    font-size: 150%;
    font-weight: bold;
    text-align: center; 
  }
  </style>