<template>
    <div>
      <button @click="fetchImage">Fetch Image</button>
      <img v-if="imageUrl" :src="imageUrl" alt="Fetched Image" />
      <input type="file" ref="fileInput" @change="select" />
      <button @click="uploadImage">Upload Image</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsImlhdCI6MTY5Mzc1NTc3OCwiZXhwIjoxNjkzNzY0Nzc4fQ.6xtO-HaXPdhxjLizGSLOOvNTjM7tdjD1hJ_PLO--zKM'
  export default {
    data() {
      return {
        imageUrl: null,
      };
    },
    methods: {
      fetchImage() {
        // 替換為您的後端API端點
        const apiUrl = `http://localhost:3000/api/v1/fish/photos/?fishUID=0023001&time=1693756727322.jpg`;
  
        axios.get(apiUrl, { responseType: 'blob', headers: {
          Authorization: Bearer ${token}
        }}) // 假設您的API返回圖片數據
          .then((response) => {
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            this.imageUrl = imageUrl;
          })
          .catch((error) => {
            console.error('Error fetching image:', error);
          });
      },
      select(e){
        this.selectFile = e.target.files[0]
      },
      uploadImage() {
        const apiUrl = `http://localhost:3000/api/v1/fish/photos/?fishUID=0023001`;
        const formData = new FormData()
        formData.append('image',this.selectFile)
        axios.post(apiUrl, formData, {
          headers: {
            Authorization: Bearer ${token}
           }
          }) // 假設您的API返回圖片數據
          
          .catch((error) => {
            console.error('Error fetching image:', error);
          });
      }
    },
  }
  </script>