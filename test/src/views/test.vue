<template>
    <div><p>{{items}}</p>
        <ul>
            <div v-for="(item,index) in items" v-bind:key="item.problemId">
            <div>
                <a href="#"><img src="favicon.ico" alt=""></a>
            </div>
            <div>
                <div>{{index}}</div>
                <div>{{item.problemId}}</div>
                <div>{{item.author}}</div>
                <div>{{item.content}}</div>
            </div>
            <br>
        </div>
        </ul>
    </div>
</template>
<style></style>
<script>
// 使用axios前，要西安下载axios
import axios from "axios";
export default{
    data(){
    return{
            items:[]
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            //这块起的 名字，要与上面的对应
            axios.get('/demo_oj',{
                // headers: {"Access-Control-Allow-Origin": "*"}
            }).then(response=>{
                this.items = response.data.result.list;
                console.log(response.data.result);
            },error=>{
                console.log(error);
            });
        }
    }
}
</script>
