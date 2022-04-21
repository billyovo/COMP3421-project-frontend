<style scoped>
    @import '../assets/base.css';
    @import '../assets/shared.css';

    .title{
        padding: 10px;
        font-size: 30px;
    }
    .title-container{
        display: flex;
        justify-content: space-between;
        width: 80%;
        padding: 20px;
    }
    .input-container{
        margin: 10px;
    }
    .title-input{
        width: 100%;
        font-size: 18px;
    }
    .return{
        width: 100px;
    }
    #submit{
        width: 100%;
        height: 50px;
        background-color: greenyellow;
    }
    #submit:hover{
        background: green;
        color: white;
        cursor: pointer;
    }
</style>

<script setup>
    import Header from '../components/Header.vue';
    import PostPreview from '../components/PostPreview.vue';
    
</script>
<script>
  export default{
    data(){
        return{
            title: "",
            content: "",
            category: this.$route.params.category,
        }
    },
    methods:{
        returnLast: function(){
            history.go(-1);
        },
        newPost: async function(){
            const res = await fetch("https://comp3421-project-api.azurewebsites.net/api/create_post",{
              method: "POST",
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                },
              body: JSON.stringify({
                  userID: parseInt(localStorage.getItem("userID")),
                  category: parseInt(this.category), 
                  title: this.title,
                  content: this.content
              }),        
          });
          if(!res.ok){
              alert("An error occured");
          }
          else{
              alert("Successfully posted!");
              history.go(-1);
          }
        }
    }
  }
</script>
<template>
  <main class="container">
      <div class="title-container center">
        <h1 class="title">Create a new post!</h1>
        <button class="return" @click="returnLast">Return</button>
      </div>
      <div class="input-container">
        <span style="font-size:18px">Title:</span>
        <input v-model="title" placeholder="Post title" class="title-input">
        <span style="font-size:18px">Content</span>
        <textarea v-model="content" placeholder="Post content" class="title-input"></textarea>
        <button id="submit" @click="newPost()">Submit</button>
      </div>
  </main>
</template>
