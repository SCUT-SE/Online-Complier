<template>
  <el-row>
    <el-col>
      <el-row class="header">
        <el-col :span="2"><el-tag>#</el-tag></el-col>
        <el-col :span="10"><el-tag>题目</el-tag></el-col>
        <el-col :span="4"><el-tag>难度</el-tag></el-col>
      </el-row>
      <el-row
        class="content"
        v-for="(problem, index) in problemSet"
        :key="index"
      >
        <el-col :span="2">{{ index }}</el-col>
        <el-col :span="10">
          <el-tooltip
            class="item"
            effect="dark"
            :content="problem.title"
            placement="top"
          >
            <el-link :underline="false" type="primary">
              {{ problem.title }}
            </el-link>
          </el-tooltip>
        </el-col>
        <el-col :span="4">{{ problem.difficulty }}</el-col>
      </el-row>
      <el-row class="footer">
        <el-col :span="12" :offset="12">
          <el-pagination
            background
            layout="prev, pager, next"
            :pager-count="5"
            :total="1000"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  name: "ProblemSet",
  components: {},
  data() {
    return {
      problemSet: [],
    };
  },
  created: function () {
    axios.get("/api/problem/public").then((response) => {
      this.problemSet = response.data.result.problemSet;
      console.log(this.problemSet);
    });
  },
};
</script>

<style scoped>
.el-col {
  padding: 10px 10px;
}
.el-row {
  display: flex;
  justify-content: center;
  margin: 5px 0;
  background-color: #f9fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-row.header,
.el-row.footer {
  background-color: #99a9bf;
}
.content:nth-child(2n) {
  background-color: #d3dce6;
}
.content:nth-child(2n + 1) {
  background-color: #f9fafc;
}
</style>