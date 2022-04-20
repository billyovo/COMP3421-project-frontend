<script>
export default {
  data() {
    
  },
  props: {
      data:{
          type: Object
      },
  },
  computed:{
      formattedDate: function(){
          const date = new Date(this.data.created_at);
          return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+(date.getHours()+1)+":"+date.getMinutes();
    }
  },
  methods:{
      test: function(){
          alert("HI");
      },
      postVote: async function(replyID, type){
          const res = await fetch("https://comp3421-project-api.azurewebsites.net/api/vote_post",{
              method: "POST",
              credentials: 'include',
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                },
              body: JSON.stringify({
                  userID: parseInt(localStorage.getItem("userID")),
                  replyID: parseInt(replyID), 
                  voteType: type
              }),        
          });
          if(!res.ok){
              alert("You already voted!")
          } 
          else{
              data.voteType += type === "like" ? 1 : -1;
          }   
      }
  }
}
</script>

<style scoped>
@import '../assets/shared.css';
    .post-container{
        height: 50px;
        width: 90%;
        border-bottom: 1px solid rgba(0,0,0,0.1);

    }
    .post-list-container{
        text-align: left;

    }
    .author{
        margin-right: 10px;
    }
    .title{
        padding: 5px;
    }

    a{
        cursor: pointer;
    }

</style>
<template>
    <main class="post-container center" >
        <div class="post-list-container">
            <span style="margin-right: 5px">#{{data.order_in_post}}</span>
            <span style="font-weight: bold" class="author">{{data.user_name}}</span>
            
            <img src="../assets/like.png" height="20" width="20" style="margin-right:5px">
            <span class="author">{{data.vote_count}}</span>
            <img src="../assets/chat.png" height="20" width="20" style="margin-right:5px">
            <span class="author">{{data.comment_count}}</span>
            <span style="color: rgba(0,0,0,0.9); margin-right: 15px">{{formattedDate}}</span>
            <span>
                {{data.reply_to_order ? "Reply to #"+data.reply_to_order : ""}}
            </span>
            <div class="title">
                <span>{{data.content}}</span>
            </div>
            <div>
                <button @click="postVote(data.replyID, 'like')">
                    like
                </button>
                <span> | </span>
                <button @click="postVote(data.replyID, 'dislike')">
                    dislike
                </button>
                <span> | </span>
                <button>comment</button>
            </div>
        </div>
        
    </main>
</template>