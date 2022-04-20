<script>
export default {
  data() {
    return {
      user_name: localStorage.getItem("user_name") ? "Hello "+localStorage.getItem("user_name") : "Who",
        
    }
  },
  methods:{
        showModal: function(){
            this.$emit('clicked', true);
        }    
    }
}
</script>

<style scoped>
@import '../assets/shared.css';

.comment-container{
    position: absolute;
    height: 50vh;
    width: 100vw;
    top: 50vh;
    background-color: white;
    box-shadow: 30px black;
}
</style>
<template>
    <div class="comment-container">
        <span>Replying to {{commentTarget}}</span>
    </div>
</template>