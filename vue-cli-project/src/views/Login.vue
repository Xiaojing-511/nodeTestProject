<template>
  <div>
    <h4 style="margin-bottom:50px;">欢迎进入学生综合管理系统</h4>
    <el-select v-model="info" placeholder="请选择身份">
      <el-option label="管理员" value="system"></el-option>
      <el-option label="教师" value="teacher"></el-option>
      <el-option label="学生" value="student"></el-option>
    </el-select>
    <div v-show="info === 'student'">
      学号:
      <el-input
        id="student"
        class="c-input"
        v-model="ssn"
        placeholder="请输入学号登陆"
        label="学号"
      ></el-input>
      <el-input
        type="password"
        class="c-input"
        v-model="userpwd"
        placeholder="输入密码"
      ></el-input>
      <el-button @click="login" type="primary">登陆</el-button>
    </div>
    <div v-show="info === 'teacher'">
      教师编号:
      <el-input
        id="teacher"
        class="c-input"
        v-model="tssn"
        placeholder="请输入教师编号登陆"
        label="教师编号"
      ></el-input>
      <el-input
        type="password"
        class="c-input"
        v-model="userpwd"
        placeholder="输入密码"
      ></el-input>
      <el-button @click="login" type="primary">登陆</el-button>
    </div>
  </div>
</template>
<script>
import { getUserLogin } from "@/api/communication";
export default {
  data() {
    return {
      info: "",
      ssn: "",
      tssn: "",
      userpwd: ""
    };
  },
  watch: {
    info() {
      this.$store.dispatch("setInfo", this.info);
      if (this.info === "system") {
        this.$router.push("/system");
      } else if (this.info === "student") {
        this.type = "student";
      } else if (this.info === "teacher") {
        this.type = "teacher";
      }
    }
  },
  methods: {
    login() {
      if (this.info === "student") {
        if (this.ssn) {
          getUserLogin({
            userid: this.ssn,
            userpwd: this.userpwd
          }).then(res => {
            if (res.data.pwdIsTrue) {
              this.$router.push(`/student/${this.ssn}`);
            } else {
              this.$message({
                message: "密码错误，请重试！",
                type: "error"
              });
              this.ssn = this.tssn = this.userpwd = "";
            }
          });
        }
      } else if (this.info === "teacher") {
        if (this.tssn) {
          getUserLogin({
            userid: this.tssn,
            userpwd: this.userpwd
          }).then(res => {
            if (res.data.pwdIsTrue) {
              this.$router.push(`/teacher/${this.tssn}`);
            } else {
              this.$message({
                message: "密码错误，请重试！",
                type: "error"
              });
              this.ssn = this.tssn = this.userpwd = "";
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.c-input {
  width: 150px;
  margin: 10px 15px 0 10px;
}
</style>