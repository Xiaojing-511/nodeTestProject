<template>
  <div class="container">
    <el-table class="table" v-if="tableData" :data="tableData">
      <el-table-column
        v-for="(item, index) in tableColProp"
        :key="index"
        :prop="item"
        :label="tableColLabel[index]"
        width="width"
      >
      </el-table-column>
    </el-table>
    <el-button class="btn" @click="updateCourseInfo" type="primary"
      >刷新</el-button
    >
  </div>
</template>
<script>
import { getTeacherCourse } from "@/api/communication";
export default {
  data() {
    return {
      tableData: [],
      tableColProp: [
        "cssn",
        "cname",
        "startdate",
        "enddate",
        "begintime",
        "overtime",
        "clocation",
        "studentcount"
      ],
      tableColLabel: [
        "课程编号",
        "课程名",
        "开课日期",
        "结课日期",
        "上课时间",
        "下课时间",
        "上课地址",
        "选课人数"
      ]
    };
  },
  created(){
      this.updateCourseInfo();
  },
  methods:{
      updateCourseInfo(){
          getTeacherCourse({
              tssn: this.$route.params.tssn
          }).then(res=>{
              console.log(res);
              this.tableData = res.data
          })
      }
  }
};
</script>
<style>
.el-table::before {
  display: none;
}
</style>
<style lang="scss" scoped>
.container {
  .table {
    height: 550px;
    overflow-y: scroll;
  }
  .btn {
    height: 40px;
    display: block;
    margin-top: 20px;
  }
}
</style>