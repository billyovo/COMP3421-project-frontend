<script>
export default {
  data() {
    return {
      user_name: localStorage.getItem("user_name") ? "Hello "+localStorage.getItem("user_name") : "Who"
    }
  }
}
</script>

<style scoped>
@import '../assets/shared.css';

    .message{
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        font-size: 20px;
    }
    .banner-container{
        height: 150px;
        width: 100%;
        display: block;
        background-image: url("../assets/campus.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-blend-mode: lighten;
        background-color: rgba(255,255,255,0.6);
    }
    
    #header-title{
        font-size: 50px;
        font-weight: 900 !important;
    }
    a{
        text-decoration: none;
        color: black;
    }
</style>
<template>
    <header>
        <div class="banner-container">
            <div class="message">
                <div><a href="/category"><span>Return to Home Page</span></a> </div>
                <span>{{user_name}}</span>
            </div>
            <div class="small-separator"></div>
            <h1 class="center" id="header-title">Welcome to Polyu forum</h1>
            <div class="small-separator"></div>
        </div>
    </header>
</template>