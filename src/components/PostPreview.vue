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

    .post-container:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
</style>
<template>
    <main class="post-container center" >
        <div class="post-list-container">
            <span style="font-weight: bold" class="author">{{data.user_name}}</span>
            
            <img src="../assets/like.png" height="20" width="20" style="margin-right:5px">
            <span class="author">{{data.vote_count}}</span>
            <span style="color: rgba(0,0,0,0.9)">{{formattedDate}}</span>
            <div class="title">
                <span>{{data.title}}</span>
            </div>
        </div>
        
    </main>
</template>