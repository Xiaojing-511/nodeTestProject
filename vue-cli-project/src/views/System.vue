<template>
  <div class="container">
    <el-menu default-active="1" @select="menuSelect">
      <el-menu-item index="1">
        <span>学生信息</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span>学院信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span>教师信息</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>课程信息</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span>学院开设课程</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span>学生修读课程</span>
      </el-menu-item>
    </el-menu>
    <div style="width:400px;">
      <form-student v-if="menuIndex == 1"></form-student>
      <form-academy v-if="menuIndex == 2"></form-academy>
      <form-teacher v-if="menuIndex == 3"></form-teacher>
      <form-course v-if="menuIndex == 4"></form-course>
      <form-found-course v-if="menuIndex == 5"></form-found-course>
      <form-study v-if="menuIndex == 6"></form-study>
    </div>

    <show-table-values
      :tableName="tableNameArr[menuIndex - 1]"
      :menuIndex = "menuIndex-1"
    ></show-table-values>
  </div>
</template>
<script>
import FormStudent from "@/components/FormStudent";
import ShowTableValues from "@/components/ShowTableValues";
import FormAcademy from "@/components/FormAcademy";
import FormTeacher from "@/components/FormTeacher";
import FormCourse from "@/components/FormCourse";
import FormFoundCourse from '@/components/FormFoundCourse';
import FormStudy from '@/components/FormStudy';
export default {
  components: {
    ShowTableValues,
    FormStudent,
    FormAcademy,
    FormTeacher,
    FormCourse,
    FormFoundCourse,
    FormStudy
  },
  data() {
    return {
      menuIndex: 1,
      tableNameArr: [
        "student",
        "academy",
        "teacher",
        "course",
        "found_course",
        "study"
      ],
    };
  },
  methods: {
    menuSelect(index) {
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
  background-color: #eee;
}
</style>
<style lang="scss" scoped>
.container {
  display: flex;
}
</style>