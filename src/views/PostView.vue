<style scoped>
    @import '../assets/base.css';
    @import '../assets/shared.css';

    #hint{
        margin: 15px;
        font-size: 22px;
    }

    .link-list{
        list-style-type: none; 
        padding: 20px; 
        margin: 0; 
        background-color: white;
        width: 80%;
        font-size: 20px;
    }

    .link-list:hover{
        background-color: rgba(0,0,0,0.1);
        cursor: pointer;
    }
    a{
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: block;
        color: black;
    }
</style>

<script setup>
    import Header from '../components/Header.vue';
</script>
<script>
  export default{
    data(){
      return{
          page: this.$route.params.page,
          postID: this.$route.params.postID,
          fetchURL: "https://comp3421-project-api.azurewebsites.net/api/post/"+this.$route.params.postID+"/page/"+this.$route.params.page,
          postData: {}
      }
    },
    methods:{
          getPost: async function(){
            const res = await fetch(fetchURL)
            const data = await res.text();
            this.postData = JSON.parse(data);
            alert(this.fetchURL);
          }
    },
    mounted(){
        this.getPost();
    }
  }
</script>
<template>
  <main class="container">
      <Header/>
      {{postData}}
  </main>
</template>
