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
    .category-hint{
        display: flex;
        justify-content: space-between;
    }
    .new-post{
        background-color: rgb(173, 219, 230);
        border: none;
    }
    .new-post:hover{
        background-color: rgba(173, 219, 230,0.4);
        border: 1px solid grey;
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
            page: this.$route.params.page,
            category: this.$route.params.categoryID,
            fetchURL: "https://comp3421-project-api.azurewebsites.net/api/category/"+this.$route.params.categoryID+"/page/"+this.$route.params.page,
            postData: {},
        }
    },
    methods:{
        getPostTitles: async function(){
            const res = await fetch(this.fetchURL);
            const data = await res.text();
            this.postData = JSON.parse(data);
        },
        setStorage: function(title){
            localStorage.setItem("title", title);
        }
    },
    mounted(){
        this.getPostTitles();
    }
  }
</script>
<template>
  <main class="container">
      <Header></Header>
      <div class="category-hint">
          <span id="hint">Current posts:</span>
          <button class="new-post">
              <a v-bind:href="'/post/create/category/'+category">
                 Create a new post?
              </a>
            </button>
      </div>
      
      <ul>
          <li v-for="post in postData" :key="post.postID" style="padding: 10px">
            <a v-bind:href="'/post/'+post.postID+'/page/1'" v-on:click="setStorage(post.title)">
                <PostPreview v-bind:data="post"/>
            </a>
          </li>
       </ul>
  </main>
</template>
