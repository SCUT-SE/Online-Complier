<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form :rules="loginRules" :model="loginForm" ref="loginFormRef" label-width="0px" class="login_form">
                <p v-show="loginForm.errorTip" style="color: red;">用户密码错误</p>
                <el-form-item prop='username'>
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                    </el-form-item>

                    <el-row class='btns'>
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>

                    </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            // 登录表单数据绑定对象
            loginForm:{
                username:'test1@mail.com',
                password:'123456',
                errorTip:false,
            },
            loginRules: {
            //   用户名验证
                username: [
                    { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
                    { min: 3,  message: '长度在 3 个字符以上', trigger: 'blur' }
                ],
            //   密码验证
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6,  message: '长度在 6 个字符以上', trigger: 'blur' }
                ]
        
            },
        
    };
},
    methods:{
        // 重置表单
        resetLoginForm(){
            // console.log(this)
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate(valid=>{
                // console.log(valid);
                if(!valid)return;
                // this.$http.post('login',this.loginForm);
                axios.post('/reqLogin',{
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                    type: 1,
                })
                .then(response=>{
                    // this.items = response.data.result.list;
                    console.log(response.data.result);
                    let res = response.data;
                    if(res.status=="0"){
                        // 登录成功
                        this.loginForm.errorTip=false;
                        this.$message.success('登录成功');
                        // to do
                        // 1.将登录成功后的username(token)保存到客户端 sessionStorage
                        //  1.1 项目的其他api接口只有拥有token才能访问
                        //  1.2 sessionStorage而不是localStorage哦
                        //  1.3 token加密需要后端实现，比较复杂，这里暂时用username代替hhh
                        window.sessionStorage.setItem('username',res.result.username);
                        // 2. push to Home
                        
                        this.$router.push('/Home');
                        
                    }else{
                        this.loginForm.errorTip=true;
                        window.sessionStorage.clear();
                        this.$message.error('登录失败');
                    }
                },error=>{
                    console.log(error);
                });
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
.login_form{
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    justify-content: flex-end;
}

.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
/* 盒子居中 */
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position:absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);

    .avatar_box{
        height: 130px;
        width:130px;
        border:1px solid #eee;
        border-radius:50%;
        overflow: hidden;
        padding:10px;
        box-shadow:0 0 5px #ddd;
        position: absolute;
        left:50%;
        background-color:#fff;
        transform: translate(-50%,-50%);
        img{
            border-radius:50%;
            width: 100%;
            height: 100%;
            background-color: #eee;
        }
    }
}


</style>