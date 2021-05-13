<template>
  <div>
    <h2>Problem views</h2>
    <el-row>
      <el-container>
        <el-main>
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>广告位{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <el-row id="problem_level">
            <el-col :span="12">
              <div class="label">已解决</div>
              <div class="label">简单</div>
              <div class="label">中等</div>
              <div class="label">困难</div>
            </el-col>
            <el-col :span="12">
              <el-button style="float: right" round>随机开始</el-button>
            </el-col>
          </el-row>
          <problem-set></problem-set>
        </el-main>
        <el-aside width="400px">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 2" :key="item">
              <h3>广告位{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-aside>
      </el-container>
    </el-row>
  </div>
</template>

<script>
import ProblemSet from "@/components/ProblemSet.vue";
export default {
  components: { ProblemSet },
  name: "Problem",
};
</script>

<style scoped>
div.label {
  width: auto;
  display: inline-block;
  color: #f9fafc;
  background-color: #409eff;
  border-radius: 30px;
  padding: 5px;
  margin-left: 10px;
}
.el-main,
.el-aside {
  padding: 20px;
}
.el-col {
  padding: 5px 5px;
}
.el-row {
  display: flex;
  justify-content: center;
  margin: 5px 0;
  background-color: #f9fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-carousel__item h3 {
  color: #475669;
  text-align: center;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>