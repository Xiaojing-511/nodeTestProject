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
import { getStudentCourse } from "@/api/communication";
export default {
  data() {
    return {
      tableData: [],
      tableColProp: [
        "cssn",
        "cname",
        "tname",
        "startdate",
        "enddate",
        "begintime",
        "overtime",
        "clocation",
        "type",
        "aname"
      ],
      tableColLabel: [
        "课程编号",
        "课程名",
        "授课教师",
        "开课日期",
        "结课日期",
        "上课时间",
        "下课时间",
        "上课地址",
        "课程类型",
        "开设学院"
      ]
    };
  },
  created() {
    this.updateCourseInfo();
  },
  methods: {
    updateCourseInfo() {
      getStudentCourse({ ssn: this.$route.params.ssn })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
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
    width: 1000px;
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