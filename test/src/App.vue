<template>
  <div id="app">
    <tab-bar> </tab-bar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TabBar from "components/tabbar/TabBar";
export default {
  name: "App",
  components: { TabBar },
};
</script>

<style scoped>
@import "~assets/css/base.css";
.content {
  margin-top: 44px;
}
</style>
