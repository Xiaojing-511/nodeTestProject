<template>
  <div class="container">
    <el-form :model="formData">
      
      <el-form-item label="学院编号">
        <el-input v-model="formData.assn" placeholder="请填入学院编号">{{
          formData.assn
        }}</el-input>
      </el-form-item>
      <el-form-item label="课程号">
        <el-input v-model="formData.cssn" placeholder="请填入开设的课程号">{{
          formData.cssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="开设学期数">
        <el-input v-model="formData.times" placeholder="请填入学院开设该课程的学期数">{{
          formData.times
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
        tableName: "found_course",
        assn: "",
        cssn: "",
        times: "",
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
        this.formData.assn == "" ||
        this.formData.cssn == "" ||
        this.formData.times == "" 
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