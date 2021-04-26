<template>
    <div>
        <h1>OJ List</h1>
        <span>{{$route.params.id}}</span>
        <!-- 需要写绝对地址 -->
        <router-link to="/ojdata/Problem">显示题目1</router-link>
        <router-link to="/ojdata/Question">显示题目2</router-link>

        <div>
            <router-view></router-view>
        </div>
        <button @click="jump">button-To Home</button>
        <router-link v-bind:to="{name:'Home'}">link-To Home</router-link>
        <br>
        <router-link v-bind:to="{name:'Solved',params:{SovledId:123456}}">link-To Solved</router-link>
    </div>

</template>

<style>

</style>

<script>
export default{
    methods:{
        jump(){
            this.$router.push('/Home');
        }
    }
}
</script>