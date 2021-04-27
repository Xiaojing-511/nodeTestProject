<template>
  <div class="container">
    <span class="info-label">欢迎同学：{{ ssn }}</span>
    <div class="flex-box">
      <el-menu default-active="1" @select="menuSelect">
        <el-menu-item index="1">
          <span>选课信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>考试成绩信息</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>毕业信息</span>
        </el-menu-item>
      </el-menu>
      <select-course class="menu-right" v-if="menuIndex == 1"></select-course>
      <exam-info class="menu-right" v-if="menuIndex == 2"></exam-info>
      <graduate-result class="menu-right" v-if="menuIndex == 3"></graduate-result>
    </div>
  </div>
</template>
<script>
import SelectCourse from "@/components/course/SelectCourse";
import ExamInfo from "@/components/course/ExamInfo";
import GraduateResult from '@/components/course/GraduateResult'
export default {
  components: {
    SelectCourse,
    ExamInfo,
    GraduateResult
  },
  data() {
    return {
      menuIndex: 1,
      ssn: ""
    };
  },
  created() {
    this.ssn = this.$route.params.ssn;
  },
  methods: {
    menuSelect(index) {
      this.menuIndex = index;
      console.log(index, this.menuIndex);
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
.container {
  .info-label {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #aaa;
  }
  .flex-box {
    display: flex;
    .menu-right{
        margin-left: 250px;
    }
  }
}
</style>