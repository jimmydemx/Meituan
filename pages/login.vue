<template>
  <div class="page-login">
      <div class="login-header">
          <a href="/" class="logo"/>
       </div>       
      <div class="login-panel">
          <div class="banner">
                <img src="https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="美团网">
           </div>  

           <div class="form">
                <h4 v-if="error" class="tips"><i/>{{error}}</h4>
                <p><span>账号登陆</span></p>
                <el-input v-model="username" 
                prefix-icon='profile'/>

                <el-input v-model="password"
                prefix-icon='password' 
                type="password"/>

                <div class="foot">
                    <el-checkbox v-model="checked">7天内自动登陆</el-checkbox>
                    <b>忘记密码</b>
                </div>
                <el-button
                class="btn-login"
                type="success"
                size="mini"
                @click="login">登陆</el-button>
           </div>  
      </div> 
    </div>      
</template>

<script>
import CryptoJS from "crypto-js"
export default {
    layout: "blank",
    data(){
        return{
            error:"",
            username:"",
            password:"",
            checked:""
        }
    },
    methods:{
        login(){
            var self=this
            this.$axios.post('http://localhost:3338/users/signin',{
                username:window.encodeURIComponent(this.username),
                password:CryptoJS.MD5(self.password).toString()
            }).then(({status,data})=>{
                if(status===200){
                    if(data&&data.code===0){
                        location.href="http://localhost:3338"
                    }else{
                        elf.error=data.msg     
                    }   
                }else{
                    self.error="服务器错误"
                }
            })
            setTimeout(() => {
                self.error=""
            }, 2000);

        }


    }


}
</script>

<style lang="scss">
    @import "@/assets/css/login/index.scss";
</style>