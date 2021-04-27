<template>
  <div class="container">
    <el-form :model="formData">
      <el-form-item label="学号">
        <el-input v-model="formData.ssn" placeholder="请填入学号">{{
          formData.ssn
        }}</el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.name" placeholder="请填入姓名">{{
          formData.name
        }}</el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男" value="男">男</el-radio>
          <el-radio label="女" value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input v-model="formData.bdate" placeholder="请填写xxxx-xx-xx形式">{{
          formData.bdate
        }}</el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formData.sphone" placeholder="请填写手机号码">{{
          formData.sphone
        }}</el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="formData.grade" placeholder="请填写年级（如2018）">{{
          formData.grade
        }}</el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="formData.sacademy" placeholder="选择所属学院">
          <el-option
            v-for="item in academyArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="submit" :disabled="isAllWrite()"
        >添加</el-button
      >
    </el-form>
    <!-- <button @click="logFormData">查看表单数据</button> -->
  </div>
</template>
<script>
import { sqlNoReturn ,getTable } from "@/api/communication.js";
export default {
  data() {
    return {
      formData: {
        tableName: 'student',
        ssn: "",
        name: "",
        sex: "",
        bdate: "",
        sphone: "",
        grade: "",
        sacademy: ""
      },
      academyArr: [
        {
          label: "计软学院",
          value: "计软学院"
        },
        {
          label: "西语学院",
          value: "西语学院"
        }
      ]
    };
  },
  created(){
    // 获取学院名字列表
    getTable({
      tableName:'academy'
    }).then(res=>{
      console.log(res);
      this.academyArr = [];
      let academyInfoArr = res.data;
      academyInfoArr.forEach((item)=>{
        this.academyArr.push({
          label: item.aname,
          value: item.aname
        }) 
      })
      console.log(this.academyArr);
    })
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
        }else{
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
          if(key !== 'tableName'){
              this.formData[key] = "";
          }
      }
      console.log(this.formData);
    },
    // 是否全部填写
    isAllWrite() {
      return (
        this.formData.ssn == "" ||
        this.formData.name == "" ||
        this.formData.sex == "" ||
        this.formData.bdate == "" ||
        this.formData.sphone == "" ||
        this.formData.grade == "" ||
        this.formData.sacademy == ""
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