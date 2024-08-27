<template>
    <div class="font-weight-black text-h4 tital">維修清單</div>
    <div class="box1">
      <v-text-field v-model="searchId" append-icon="mdi-magnify" label="搜尋ID" 
        class="searchCss"  bg-color="rgba(255, 255, 255, 0.15)"></v-text-field>
      <v-spacer class="spacer"></v-spacer>
      <v-select class="selectCss" :items="selectTital" variant="solo" v-model="selectedList"></v-select>
    </div>
    <Table v-if="selectedList == '仿生魚清單'" :columns="FishColumn" :data="Fishdatas" class=" tablecss"></Table>
    <div v-for="name in toolsTital" :key="name" >
      <div v-if="selectedList == '零件清單'" class="toolsName">{{ name }}</div>
    <Table v-if="selectedList == '零件清單'" :columns="ToolColumn" :data="Tooldatas" class=" tablecss"></Table>
    </div>
    
</template>
    
  <style> 
.tital{
    display:flex;
    justify-content: center;
    color: white;
    margin-top: 7%;
}
.tablecss{
    margin-left: 2.5%;
    margin-right: 2.5%;
    margin-top: 2%;
}
.box1{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 95%;
  height: 5%;
  margin-top: 3%;
}
.spacer{
  width: 80%;
}
.searchCss{
  width: 200px;
  height: auto;
  color: white;
}
.selectCss{
  width: 200px;
}
.toolsName{
  display: flex;
  width: 95%;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
  </style>

<script>
    export default {
      data: () => ({
        FishColumn:[
                    {title: '仿生魚UID', key: 'id', fixed: 'left',width:150},
                    {title: '電路板',key: 'active',width:100},
                    {title: '魚眼',key: 'active',width:100},
                    {title: 'LED燈串',key: 'active',width:100},
                    {title: '光遮斷開關',key: 'active',width:130},
                    {title: '紅外線感測器',key: 'active',width:130},
                    {title: '重心馬達',key: 'active',width:100},
                    {title: '電池',key: 'active',width:100},
                    {title: 'XM馬達',key: 'active',width:100},
                    {title: 'LORA',key: 'active',width:100},
                    {title: '無線充電',key: 'active',width:100},
                    {title: '魚嘴',key: 'active',width:100},
                    {title: '魚頭',key: 'active',width:100},
                    {title: '第一關節L',key: 'active',width:120},
                    {title: '第一關節馬達外殼',key: 'active',width:150},
                    {title: '第二關節L',key: 'active',width:120},
                    {title: '第二關節馬達外殼',key: 'active',width:150},
                    {title: '魚尾蓋',key: 'active',fixed: 'right',width:100},
            ],
        ToolColumn:[
                    {title: '編號', key: 'id'},
                    {title: '位置',key: 'active'},
                    {title: '時數',key: 'active'},
                    {title: '故障原因',key: 'active'},
        ],
        Fishdatas: [
              {
                id: "1",
                version: "2",
                time: "3",
                active: "4",
              }
            ],
        Tooldatas:[
              {
                id: "1",
                version: "2",
                time: "3",
                active: "4",
              }
        ],
        selectTital:['仿生魚表單','零件清單'],
        selectedList:"仿生魚清單",
        toolsTital:['電路板','魚眼']
      }),
      created(){
      },
      methods: {
        
        
      }
    }
  </script>