<template>
  <div class="container">
    <el-form :model="formData">
      <el-form-item label="教师编号">
        <el-input v-model="formData.tssn" placeholder="请填入教师号">{{
          formData.tssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.tname" placeholder="请填入教师姓名">{{
          formData.tname
        }}</el-input>
      </el-form-item>
      <el-form-item label="教龄">
        <el-input v-model="formData.tage" placeholder="请填入教师教龄">{{
          formData.tage
        }}</el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formData.tphone" placeholder="请填写教师联系电话">{{
          formData.tphone
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
        tableName: "teacher",
        tssn: "",
        tname: "",
        tage: "",
        tphone: ""
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
        this.formData.tssn == "" ||
        this.formData.tname == "" ||
        this.formData.tage == "" ||
        this.formData.tphone == "" 
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