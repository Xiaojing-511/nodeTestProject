<template>
  <div class="box">
    <span class="info-label">欢迎老师：{{ tssn }}</span>
    <div class="flex-box">
      <el-menu default-active="1" @select="menuSelect">
        <el-menu-item index="1">
          <span>授课信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>成绩录入</span>
        </el-menu-item>
      </el-menu>
      <teacher-course class="menu-right" v-if="menuIndex == 1"></teacher-course>
      <score-input class="menu-right" v-if="menuIndex == 2"></score-input>
    </div>
  </div>
</template>
<script>
import TeacherCourse from '@/components/teacher/TeacherCourse'
import ScoreInput from '@/components/teacher/ScoreInput'
export default {
    components:{
        TeacherCourse,
        ScoreInput
    },
  data() {
    return {
      tssn: "",
      menuIndex: 1,
    };
  },
  created() {
    this.tssn = this.$route.params.tssn;
  },
  methods: {
    menuSelect(index) {
      console.log(index);
      this.menuIndex = index;
    }
  }
};
</script>
<style>
.el-menu {
  width: 130px;
  height: 600px;
  margin-left: 50px;
}
</style>
<style lang="scss" scoped>
.box {
  .info-label {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #aaa;
  }
  .flex-box {
    display: flex;
    .menu-right {
      margin-left: 250px;
      width: 900px;
    }
  }
}
</style>