<template>
  <div id="tab-bar-left-nav">
    <tab-bar-nav-item
      path="/problem"
      v-on:idxChanged="updateCurrentIdx"
      idx="1"
      :currentIdx="currentIdx"
    >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/icons8_problem_32px_active.png"
        alt=""
      />
      <img
        slot="item-icon"
        src="~assets/img/tabbar/icons8_problem_32px.png"
        alt=""
      />
      <div slot="item-text">Problem</div></tab-bar-nav-item
    >
    <tab-bar-nav-item
      path="/interview"
      @idxChanged="updateCurrentIdx"
      idx="2"
      :current-idx="currentIdx"
    >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/icons8_interview_32px_active.png"
        alt=""
      />
      <img
        slot="item-icon"
        src="~assets/img/tabbar/icons8_interview_32px.png"
        alt=""
      />
      <div slot="item-text">Interview</div>
    </tab-bar-nav-item>

    <tab-bar-nav-item
      path="/interviewer"
      @idxChanged="updateCurrentIdx"
      idx="3"
      :current-idx="currentIdx"
    >
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/icons8_interviewer_32px_active.png"
        alt=""
      />
      <img
        slot="item-icon"
        src="~assets/img/tabbar/icons8_interviewer_32px.png"
        alt=""
      />
      <div slot="item-text">Interviewer</div>
    </tab-bar-nav-item>
    <tab-bar-nav-item
      path="/user"
      @idxChanged="updateCurrentIdx"
      idx="4"
      :currentIdx="currentIdx"
      ><img
        slot="item-icon-active"
        src="~assets/img/tabbar/icons8_user_32px_active.png"
        alt=""
      />
      <img
        slot="item-icon"
        src="~assets/img/tabbar/icons8_user_32px.png"
        alt=""
      />
      <div slot="item-text">User</div>
    </tab-bar-nav-item>
  </div>
</template>

<script>
import TabBarNavItem from "./TabBarNavItem.vue";
export default {
  name: "TabBarLeftNav",
  components: {
    TabBarNavItem,
  },
  data() {
    return {
      currentIdx: "1",
    };
  },
  methods: {
    updateCurrentIdx(idx) {
      this.currentIdx = idx;
    },
  },
  created: function () {
    this.$router.replace("/");
  },
};
</script>

<style scoped>
#tab-bar-left-nav {
  display: flex;
  flex: 0.25;
}
</style>