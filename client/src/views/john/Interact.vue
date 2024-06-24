<template>
    <div class="Speech">
    <navbar></navbar>
    <Speech />
</div>
</template>
  
<script>
    import Speech from '@/components/interact/speech-client.vue';
    import navbar from '@/components/Navbar.vue'
    export default {
        name: 'speech',
        components: { Speech,navbar},
        data(){
            return {
                fishUID: ''
            };
        },
        methods: {
            update(fishUID) {
                this.fishUID = fishUID;
            }
        }
    }
</script>
  
  <style scoped>
  .Speech{
  background-image: url('../../assets/編輯魚bg.jpg');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-attachment: fixed;
}
  </style>
  