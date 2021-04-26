<template>
  <div id="app">
    <!-- <h1>app</h1>
    <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- 路由占位符 -->
    <router-view></router-view>
    <router-view name='problem'></router-view>
    <router-view name='question'></router-view>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
