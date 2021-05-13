<template>
  <div
    class="tab-bar-nav-item"
    @click="itemClick"
    :class="{ active: isActive }"
  >
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarLeftNav",
  props: {
    path: {
      type: String,
      default: "",
    },
    idx: {
      type: String,
      default: "0",
    },
    currentIdx: {
      type: String,
      default: "0",
    },
  },
  computed: {
    isActive() {
      return this.currentIdx === this.idx;
    },
  },
  components: {},
  methods: {
    itemClick() {
      this.$emit("idxChanged", this.idx);
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-nav-item {
  user-select: none;
  flex: 1;
  text-align: center;
  height: 44px;
  font-size: 14px;
}
.tab-bar-nav-item img {
  width: 24px;
  height: 24px;
  margin-top: 2px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: #7179ae;
  border-bottom: solid 2px #7179ae;
}
</style>