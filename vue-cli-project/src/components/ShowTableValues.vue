<template>
  <div class="tableShow">
    <el-table class="table" v-if="tableData" :data="tableData">
      <el-table-column
        v-for="(item, index) in tableColLabel"
        :key="index"
        :prop="item"
        :label="tableColLabel[index]"
        width="width"
      >
      </el-table-column>
    </el-table>
    
    <el-button class="btn" @click="updateTableShow" type="primary"
      >刷新</el-button
    >
    <div class="flex-box">
      <h4>删除一条记录</h4>
      <el-input
        v-model="primary[0]"
        :placeholder="'请输入' + tablePrimary[menuIndex][0]"
      ></el-input>

      <el-input
        v-if="menuIndex > 2"
        v-model="primary[1]"
        :placeholder="'请输入' + tablePrimary[menuIndex][1]"
      ></el-input>
      <el-button
        class="btn"
        @click="deleteHandle"
        type="danger"
        :disabled="isDeleteAllWrite()"
        >删除</el-button
      >
    </div>

    <div class="flex-box" style="width:750px">
      <h4>修改一条记录的值</h4>
      <el-input
        v-model="update[0]"
        :placeholder="'请输入' + tablePrimary[menuIndex][0]"
      ></el-input>
      <el-input
        v-if="menuIndex > 2"
        v-model="update[1]"
        :placeholder="'请输入' + tablePrimary[menuIndex][1]"
      ></el-input>
      <el-input v-model="update[2]" placeholder="要修改的属性"></el-input>
      <el-input v-model="update[3]" placeholder="要修改的值"></el-input>

      <el-button
        class="btn"
        @click="updateHandle"
        type="danger"
        :disabled="isUpdateAllWrite()"
        >修改</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  getTable,
  deleteRecord,
  updateRecordValue
} from "../api/communication";
export default {
  props: {
    tableName: {
      type: String,
      default: () => ""
    },
    menuIndex: {
      type: Number,
      default: () => {}
    }
  },
  data() {
    return {
      tableData: [],
      tableColLabel: [],
      tablePrimary: [
        ["ssn"],
        ["assn"],
        ["tssn"],
        ["cssn", "tssn"],
        ["assn", "cssn"],
        ["ssn", "cssn"]
      ],
      primary: [],
      update: []
    };
  },
  watch: {
    tableName() {
      this.updateTableShow();
      this.primary = [];
      this.update = [];
    }
  },
  created() {
    this.updateTableShow();
  },
  methods: {
    // 获取表信息
    updateTableShow() {
      this.tableColLabel = [];
      getTable({ tableName: this.tableName }).then(res => {
        // console.log(res.data);
        // !res.data不可以作为判断
        if (res.data.length) {
          let temp = res.data;
          for (var key of Object.keys(temp[0])) {
            this.tableColLabel.push(key);
          }
          this.tableData = res.data;
        }
        //  展示表数据
        console.log( this.tableColLabel,this.tableData);
      });
    },
    isDeleteAllWrite() {
      if (!this.primary.length) {
        return true;
      } else {
        if (this.menuIndex > 2) {
          return this.primary.length != 2;
        } else {
          console.log(this.primary[0] == "");
          return this.primary.length != 1;
        }
      }
    },
    // 删除记录
    deleteHandle() {
      let deleteVal = {};
      deleteVal.tableName = this.tableName;
      deleteVal[this.tablePrimary[this.menuIndex][0]] = this.primary[0];
      if (this.menuIndex > 2) {
        deleteVal[this.tablePrimary[this.menuIndex][1]] = this.primary[1];
      }
      deleteRecord(deleteVal).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: "删除失败！",
            type: "error"
          });
        }
        this.primary = [];
      });
      console.log(deleteVal);
    },
    isUpdateAllWrite() {
      if (!this.update.length) {
        return true;
      } else {
        if (this.menuIndex > 2) {
          return (
            this.update.length != 4 ||
            this.update[0] == "" ||
            this.update[1] == "" ||
            this.update[2] == "" ||
            this.update[3] == ""
          );
        } else {
          return (
            this.update.length != 4 ||
            this.update[0] == "" ||
            this.update[2] == "" ||
            this.update[3] == ""
          );
        }
      }
    },
    // 修改记录属性值
    updateHandle() {
      let updateVal = {};
      updateVal.tableName = this.tableName;
      updateVal.primary = {};
      updateVal.primary[this.tablePrimary[this.menuIndex][0]] = this.update[0];
      if (this.update[1]) {
        updateVal.primary[
          this.tablePrimary[this.menuIndex][1]
        ] = this.update[1];
      }
      updateVal.updateProp = this.update[2];
      updateVal.updateValue = this.update[3];
      console.log(updateVal);
      updateRecordValue(updateVal).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.$message({
            message: "更新成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: "更新失败！",
            type: "error"
          });
        }

      }).catch(err=>{
        console.log(err);
      });
      this.update = [];
    }
  }
};
</script>
<style>
.el-input {
  width: 120px;
}
.el-table::before{
  display: none;
}
</style>
<style lang="scss" scoped>
.tableShow {
  width: 850px;
  margin-left: 50px;
  .table {
    height: 450px;
    overflow-y: scroll;
  }
  .btn {
    height: 40px;
    display: block;
    margin-top: 20px;
  }
  .flex-box {
    width: 500px;

    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
}
</style>