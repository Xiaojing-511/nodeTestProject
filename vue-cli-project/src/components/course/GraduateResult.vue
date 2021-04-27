<template>
  <div class="container">
    <div class="flex-box">
      <h4>是否符合毕业条件:</h4>
      <p v-if="type">必修课程门数：{{type.compulsory}}</p>
      <p v-if="type">选修课程门数：{{type.take}}</p>
      <span v-if="type.compulsory>=5 && type.take>=3">符合</span>
      <span v-else>不符合</span>
    </div>
  </div>
</template>
<script>
import {getStudentGraduate} from '@/api/communication'
export default {
  data() {
    return {
        type:{}
    };
  },
  created(){
      getStudentGraduate({ssn:this.$route.params.ssn}).then(res=>{
          this.type = res.data;
          console.log(res);
      })
  }
};
</script>
<style lang="scss" scoped>
.container {
    .flex-box{
        display: flex;
    }
    p{
        margin: 0 10px;
    }
  span {
    color: red;
    border-bottom: 1px solid #bbb;
    display: inline-block;
    height: 30px;
    width: 100px;
    margin-left: 10px;
  }
}
</style>