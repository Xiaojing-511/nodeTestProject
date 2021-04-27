<template>
  <div class="container">
    <el-form :model="formData">
      <el-form-item label="学生号">
        <el-input v-model="formData.ssn" placeholder="请填入学生号">{{
          formData.ssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="课程号">
        <el-input v-model="formData.cssn" placeholder="请填入所修课程号">{{
          formData.cssn
        }}</el-input>
      </el-form-item>
        <el-form-item label="授课教师编号">
        <el-input v-model="formData.tssn" placeholder="请填入授课教师编号">{{
          formData.tssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="考试成绩">
        <el-input v-model="formData.score" placeholder="请填入本课程考试成绩">{{
          formData.score
        }}</el-input>
      </el-form-item>

      <el-button type="primary" @click="submit" :disabled="isAllWrite()"
        >添加</el-button
      >
    </el-form>
  </div>
</template>
<script>
import { sqlNoReturn } from "@/api/communication.js";
export default {
  data() {
    return {
      formData: {
        tableName: "study",
        ssn: "",
        cssn: "",
        tssn:'',
        score: "",
      }
    };
  },
  methods: {
    submit() {
      sqlNoReturn(this.formData).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          this.formatterFormData();
        } else {
          this.$message({
            message: "添加失败！",
            type: "error"
          });
        }
      });
    },
    // 格式化数据
    formatterFormData() {
      for (var key of Object.keys(this.formData)) {
        if (key !== "tableName") {
          this.formData[key] = "";
        }
      }
      console.log(this.formData);
    },
    // 是否全部填写
    isAllWrite() {
      return (
        this.formData.ssn == "" ||
        this.formData.cssn == "" ||
        this.formData.score == "" 
      );
    }
  }
};
</script>
<style>
  .el-form-item{
    margin-bottom: 5px;
  }
</style>
<style lang="scss" scoped>
.container {
  width: 300px;
  margin-left: 100px ;
}
</style>