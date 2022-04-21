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
    .post-title{
        font-size: 30px;
        padding: 30px;
    }
    li{
        padding: 20px;
    }
    .comment-container{
        position: absolute;
        height: 50vh;
        width: 100vw;
        top: 50vh;
        background-color: white;
        box-shadow: 5px black;
    } 
    .input-field{
        height: 300px;
        width: 100%;
    }  
    .modal-topic{
        display: flex;
        justify-content: space-between;
    }
    .close{
        height: 40px;
        width: 40px;
        margin-right: 30px
    }
    .send{
        background: green;
        color: white;
        width: 100%;
        height: 30px;
    }
</style>

<script setup>
    import Header from '../components/Header.vue';
    import PostSingleView from '../components/PostSingleView.vue';
    import Comment from '../components/Comment.vue';
</script>
<script>
  export default{
    data(){
      return{
          page: this.$route.params.page,
          postID: this.$route.params.postID,
          fetchURL: "https://comp3421-project-api.azurewebsites.net/api/post/"+this.$route.params.postID+"/page/"+this.$route.params.page,
          postData: {},
          title: localStorage.getItem("title"),
          isShown: false,
          replyNum: 1,
          replyContent: ""
      }
    },
    methods:{
          getPost: async function(){
            const res = await fetch(this.fetchURL);
            const data = await res.text();
            this.postData = JSON.parse(data);
          },
          onClickComment: function(event, data){
              if(event.target.innerHTML === 'comment'){
                  this.toggleModal();
                  this.replyNum = data;
              }

              if(event.target.innerHTML === 'like' || event.target.innerHTML === 'dislike'){
                  this.getPost();
              }
          },
          toggleModal: function(){
              this.isShown = !this.isShown;
          },
          sendReply: async function(){
              const res = await fetch("https://comp3421-project-api.azurewebsites.net/api/reply_post",{
                  method: "POST",
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                  body: JSON.stringify({
                      content: this.replyContent,
                      userID: parseInt(localStorage.getItem("userID")),
                      postID: parseInt(this.postID),
                      reply_to_order: parseInt(this.replyNum)
                  })
              })
              if(!res.ok){
                  alert("An error occured!");
              }
              else{
                  this.getPost();
              }
              
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
      <h1 class="post-title">{{title}}</h1>
      <ul>
            <li v-for="comment in postData" :key="comment.id">
                <PostSingleView v-bind:data="comment" @click="onClickComment($event, comment.order_in_post)"/>
            </li>

        </ul>
    <div class="comment-container" v-if="isShown">
        <div class="small-separator"></div>
        <div class="modal-topic">
            <span style="margin: 10px">Replying to #{{replyNum}}</span>
            <button class="close" @click="toggleModal">X</button>
        </div>
        <div class="small-separator"></div>
        <div>
            <textarea v-model="replyContent" placeholder="Enter content" class="input-field"></textarea>
        </div>
        <button class="send" @click="sendReply">
            send
        </button>
    </div>
  </main>
</template>
