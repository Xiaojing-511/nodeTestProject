<template>
  <div class="container">
    <el-form :model="formData">
      <el-form-item label="课程号">
        <el-input v-model="formData.cssn" placeholder="请填入课程号">{{
          formData.cssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="授课教师编号">
        <el-input v-model="formData.tssn" placeholder="请填入授课教师编号">{{
          formData.tssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="formData.cname" placeholder="请填入课程名">{{
          formData.cname
        }}</el-input>
      </el-form-item>
      <el-form-item label="课程开始日期">
        <el-input v-model="formData.startdate" placeholder="请填写课程开始日期">{{
          formData.startdate
        }}</el-input>
      </el-form-item>
      <el-form-item label="课程结束日期">
        <el-input v-model="formData.enddate" placeholder="请填写课程结束日期">{{
          formData.enddate
        }}</el-input>
      </el-form-item>
      <el-form-item label="课程类型">
        <el-input v-model="formData.type" placeholder="请填写课程类型（选修、必修）">{{
          formData.type
        }}</el-input>
      </el-form-item>
      <el-form-item label="上课地点">
        <el-input v-model="formData.clocation" placeholder="请填写上课地点 x-xxx">{{
          formData.clocation
        }}</el-input>
      </el-form-item>
      <el-form-item label="上课时间">
        <el-input v-model="formData.begintime" placeholder="请填写上课时间xx:xx">{{
          formData.begintime
        }}</el-input>
      </el-form-item>
      <el-form-item label="下课时间">
        <el-input v-model="formData.overtime" placeholder="请填写下课时间xx:xx">{{
          formData.overtime
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
        tableName: "course",
        cssn: "",
        tssn: "",
        cname: "",
        startdate: "",
        enddate: "",
        type: "",
        clocation: "",
        begintime: "",
        overtime: ""
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
        this.formData.cssn == "" ||
        this.formData.tssn == "" ||
        this.formData.cname == "" ||
        this.formData.starttime == "" ||
        this.formData.endtime == "" ||
        this.formData.type == "" ||
        this.formData.clocation == "" ||
        this.formData.begintime == "" ||
        this.formData.overtime == "" 
      );
    }
  }
};
</script>
<style>
.el-form-item {
  margin-bottom: 5px;
}
</style>
<style lang="scss" scoped>
.container {
  width: 300px;
  margin-left: 100px;
}
</style>