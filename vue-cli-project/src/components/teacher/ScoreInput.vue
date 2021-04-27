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
    <div style="display: flex;text-align: bottom;align-items: baseline;">
      <h4>录入成绩</h4>
      <el-input v-model="score[0]" placeholder="请输入学号"></el-input>
      <el-input v-model="score[1]" placeholder="请输入课程号"></el-input>
      <el-input v-model="score[2]" placeholder="考试成绩"></el-input>
      <el-button @click="postScore" type="primary" :disabled="isScoreAllWrite()"
        >录入</el-button
      >
    </div>
  </div>
</template>
<script>
import { getTeacherScore,updateRecordValue } from "@/api/communication";
export default {
  data() {
    return {
      tableData: [],
      tableColProp: ["cssn", "cname", "ssn", "name", "score"],
      tableColLabel: ["课程编号", "课程名", "学号", "学生姓名", "得分"],
      score: []
    };
  },
  created() {
    this.updateCourseInfo();
  },
  methods: {
    updateCourseInfo() {
      getTeacherScore({
        tssn: this.$route.params.tssn
      })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    isScoreAllWrite() {
      return (
        this.score.length != 3 ||
        this.score[0] == "" ||
        this.score[1] == "" ||
        this.score[2] == ""
      );
    },
    postScore() {
      let updateVal = {};
      updateVal.tableName = 'study';
      updateVal.primary = {};
      updateVal.primary.ssn = this.score[0];
      updateVal.primary.cssn = this.score[1];
      updateVal.primary.tssn = this.$route.params.tssn;
      updateVal.updateProp = 'score';
      updateVal.updateValue = this.score[2];
      console.log(updateVal);
      updateRecordValue(updateVal).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.$message({
            message: "录入成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: "录入失败！",
            type: "error"
          });
        }

      }).catch(err=>{
        console.log(err);
      });
      this.score = [];
    }
  }
};
</script>
<style>
.el-table::before {
  display: none;
}
.el-input {
  width: 120px;
  margin: 0 20px;
}
</style>
<style lang="scss" scoped>
.container {
  .table {
    height: 450px;
    overflow-y: scroll;
  }
  .btn {
    height: 40px;
    display: block;
    margin: 20px 0;
  }
}
</style>