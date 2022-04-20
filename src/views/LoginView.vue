<style scoped>
  @import '../assets/base.css';
  @import '../assets/shared.css';

  .container{
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgb(240,240,240);
  }


  #fill-area{
    height: 50%;
    width: 30%;
    background-color: white;
    border-radius: 5%;
  }

  #fill-content{
    margin: 0px 0px;
    padding: 30px;
    text-align: left;
    font-size: 20px;
  }

  .fill-style{
    display: block;
    height: 40px;
    width: 100%;
  }

  .fill-field{
    border: none;
    border-bottom: 1px solid black;
    font-size: 17px;
  }

  .buttons{
    width: 40%;
    height: 50px;
    border: none;
    font-size: 16px
  }

  #login{
    background-color: rgb(92, 184, 92);
    color: white;
  }

  #login:hover{
    background-color: rgba(92, 184, 92, 0.2);
    color: rgb(92, 184, 92);
  }

  #register{
    background: white;
    border: 1px solid rgb(92, 184, 92);
  }

  #register:hover{
    background: rgb(92, 184, 92);
    border: 1px solid white;
    color: white;
  }

  .warning{
    color: red;
    font-size: 12px;
  }

</style>

<script setup></script>
<script>
  export default{
    data(){
      return{
        username: "",
        password: "",
        isUserNameError: false,
        isLoginError: false
      }
    },
    watch:{
      password: function(){
        this.isLoginError = false;
      },
      username: function(){
        this.isUserNameError = false;
      }
    },
    methods:{
      login: async function(){
        const loginRes = await fetch("https://comp3421-project-api.azurewebsites.net/auth/login",{
                            method: "POST",
                            body: JSON.stringify({
                              user_name: this.username,
                              password: this.password
                            }),
                            headers: {
                              'Content-Type': 'application/json'
                            },        
                            credentials: 'include'
                          })
        if(!loginRes.ok){
          this.isLoginError = true;
        }
        else{
          let data = await loginRes.text();
          data = JSON.parse(data);
          localStorage.setItem("user_name",data.user_name);
          localStorage.setItem("userID",data.userID);
          localStorage.setItem("token", data.token);
          this.$router.push("category");
        }
      },
      register: async function(){
        const available = await fetch("https://comp3421-project-api.azurewebsites.net/auth/name_availability",{
                            method: "POST",
                            body: JSON.stringify({
                              name: this.username
                            }),
                            headers: {
                              'Content-Type': 'application/json'
                            },        
                          })
        if(!available.ok){
          this.isUserNameError = true;
        }
        else{
          const reg = await fetch("https://comp3421-project-api.azurewebsites.net/auth/register",{
            method: "POST",
            body: JSON.stringify({
              user_name: this.username,
              password: this.password
            }),
            headers: {
              'Content-Type': 'application/json'
            },    
          })

          if(!reg.ok){
            this.isUserNameError = true;
          }
          else{
            this.login(this.username, this.password);
          }
        }
        
      }
    },
  }
</script>
<template>
  <main class="container">
    <div class="separator"></div>
      <div class="center">
        <img src="../assets/logo.png" height="100" width="100">
      </div>
      <h1 class="center">Welcome Back</h1>
      <div id="fill-area" class="center">
        <div id="fill-content">
          <span class="fill-style">User name:</span>
          <input v-model="username" placeholder="Enter User Name" class="fill-style fill-field">
          <span class="warning" v-if="this.isUserNameError">Your username is not available!</span>
          <div class="small-separator"></div>
          <span class="fill-style">Password:</span>
          <input v-model="password" placeholder="Enter Password" class="fill-style fill-field" type="password">
          <span class="warning" v-if="this.isLoginError">Incorret password or username!</span>
          <div class="small-separator"></div>
        </div>
      <div>
        <button @click="login" class="buttons" id="login" >Log in</button>
        <button @click="register" class="buttons" id="register">Register</button>
      </div>
      
      </div>
  </main>
</template>
