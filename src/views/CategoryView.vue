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
          categoryData: {}
      }
    },
    methods:{
          getCategory: async function(){
            const res = await fetch("https://comp3421-project-api.azurewebsites.net/api/category")
            const data = await res.text();
            this.categoryData = JSON.parse(data);
            
          }
    },
    mounted(){
        this.getCategory();
    }
  }
</script>
<template>
  <main class="container">
      <Header/>
      <div class="separator"></div>
      <span id="hint">Select a category to continue!</span>
      <div class="separator"></div>
        <ul>
            <li v-for="category in categoryData" :key="category.id" class="link-list">
                <a v-bind:href="'/COMP3421-project-frontend/#/category/'+category.id+'/page/1'">
                    {{category.name}}
                </a>
            </li>

        </ul>
  </main>
</template>
