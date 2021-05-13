<template>
  <div id="tab-bar">
    <tab-bar-left-nav />
    <div style="border: solid 2px #000">tab-bar-left-nav</div>
  </div>
</template>

<script>
import TabBarLeftNav from "./TabBarLeftNav.vue";
export default {
  name: "TabBar",
  components: { TabBarLeftNav },
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #f6f6f6;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
  justify-content: space-between;
  height: 44px;
  min-width: 920px;
}
</style>
