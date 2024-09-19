<template>
    <div class="font-weight-black text-h4 tital">維修清單</div>
    <Table  :columns="titalColumn" :data="datas" class="ml-7 mr-7 tablecss"></Table>
</template>
    
  <style> 
.tital{
    display:flex;
    justify-content: center;
    color: white;
    margin-top: 7%;
}
.tablecss{
    margin-top: 5%;
}
  </style>

<script>
    export default {
      data: () => ({
        titalColumn:[
                    {
                        title: 'UID',
                        key: 'id',
                    },
                    {
                        title: '狀態',
                        key: 'active',
                    },
                    {
                        title: '版本',
                        key: 'version'
                    },
                    {
                        title: '資料更新時間',
                        key: 'time',
                    },
            ],
        datas: [
              {
                id: "1",
                version: "2",
                time: "3",
                active: "4",
              }
            ],
      }),
      created(){
      },
      methods: {
        
      }
    }
  </script>