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
    <div style="float:left">
      <el-button class="btn" @click="updateStudentExamInfo" type="primary"
        >刷新</el-button
      >
      <el-button class="btn" @click="getAvgScore">查看平均成绩</el-button>
      <span v-show="avgScore" class="avg">{{ avgScore }}</span>
    </div>
  </div>
</template>
<script>
import { getStudentExam, getStudentAvgExam } from "@/api/communication";
export default {
  data() {
    return {
      tableData: [],
      tableColProp: ["cssn", "cname", "tname", "score"],
      tableColLabel: ["课程编号", "课程名", "授课教师", "考试成绩"],
      avgScore: ""
    };
  },
  created() {
    this.updateStudentExamInfo();
  },
  methods: {
    updateStudentExamInfo() {
      getStudentExam({ ssn: this.$route.params.ssn })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAvgScore() {
      getStudentAvgExam({ ssn: this.$route.params.ssn })
        .then(res => {
          this.avgScore = Number(res.data).toFixed(2);
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
    margin: 20px 30px 0 0;
  }
  .avg {
    color: red;
    border-bottom: 1px solid #bbb;
    display: inline-block;
    height: 30px;
    width: 100px;
  }
}
</style>