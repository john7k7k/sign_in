<template>
    
    <Speech />
    
</template>
  
<script>
    import Speech from '@/components/interact/speech.vue';
    export default {
        name: 'speech',
        components: { Speech},
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
  
  <style>
  .container {
  background-color: white;
}
  </style>
  