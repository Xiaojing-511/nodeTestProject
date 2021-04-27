<template>
  <div class="container">
    <el-form :model="formData">
      <el-form-item label="学院号">
        <el-input v-model="formData.assn" placeholder="请填入学院号">{{
          formData.assn
        }}</el-input>
      </el-form-item>
      <el-form-item label="学院名">
        <el-input v-model="formData.aname" placeholder="请填入学院名">{{
          formData.aname
        }}</el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.location" placeholder="请填入学院地址">{{
          formData.location
        }}</el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formData.aphone" placeholder="请填写学院联系电话">{{
          formData.aphone
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
        tableName: "academy",
        assn: "",
        aname: "",
        location: "",
        aphone: ""
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
        this.formData.aname == "" ||
        this.formData.location == "" ||
        this.formData.aphone == "" 
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