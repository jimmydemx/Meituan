<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号</em>
          <a href="/login">
            <el-button type="primary" size="small">登陆</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="">
        </el-input>
        <el-button size="mini" round 
        @click="sendMsg">发送验证码
        </el-button>
        <span class='status'>{{statusMsg}}</span>
      </el-form-item>

    <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code" maxlength="4"/>
    </el-form-item>

    <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" type='password'/>
    </el-form-item>

    <el-form-item label="重新输入" prop="cpwd">
        <el-input v-model="ruleForm.cpwd" type='password'/>
    </el-form-item>

    <el-form-item>
        <el-button type='primary' @click='register'>同意以下条款并注册</el-button>
        <div  v-if="error" class='error'>{{error}}</div>
    </el-form-item>
    </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: "blank",
  data(){ 
    return {
        statusMsg:"",
        error:"",
        ruleForm: {
            name: "",
            email:'',
            code:"",
            pwd:"",
        },
        rules: {
            name:[{
                required:true, type:"string", message:'请输入昵称',trigger:"blur"
            }],
            email:[{
                required:true,type:"email" , message:"请输入邮箱",trigger:"blur"
                }],
           pwd:[{
               required:true, message:"创建密码",trigger:"blur"
           }],
           cpwd:[{
               required:true,message:"确认密码",trigger:"blur"
           },
           {
               validator:(rule,value,callback)=>{
                   if(value===""){
                       callback(new Error('请再次输入密码'))
                   }else if(value!==this.ruleForm.pwd){
                       callback(new Error("两次输入密码不一致"))
                   }else{
                       callback()
                   }
               },
               trigger:"blur"
           }]     
        
        }
    }
  },
  methods:{
    sendMsg:function(){
      var self=this
      console.log(123)
      var namePass
      var emailPass
      if(this.timerid){
        return false
      }
      this.$refs['ruleForm'].validateField('name',(invalid)=>{
      namePass=invalid})
      this.statusMsg=""
      if(namePass){
        return false
      }
      this.$refs['ruleForm'].validateField('email',(invalid)=>{
        emailPass=invalid
      })
      if (emailPass){
        return false
      }
      console.log(self.ruleForm.name,self.ruleForm.email)
      this.$axios.post('http://localhost:3338/users/verify',{
        username:encodeURIComponent(self.ruleForm.name),
        email:self.ruleForm.email
      }).then(({status,data})=>{
            if(status=200 && data && data.code===0){
              var count=60;
              self.statusMsg=`验证码已经发送，剩余${count--}秒`
              self.timerid=setInterval(() => {
                self.statusMsg=`验证码已经发送，剩余${count--}秒`
                if(count===0){
                  self.timerid=null;
                }
              }, 1000);
            }else {
              self.statusMsg=data.msg
            }

      })


    },
    register:function(){
      var self=this
      console.log("password",CryptoJS.MD5(self.ruleForm.pwd).toString())
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          self.$axios.post('http://localhost:3338/users/signup',{
            username: window.encodeURIComponent(self.ruleForm.name),
            password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
            email: self.ruleForm.email,
            code:self.ruleForm.code
          }).then(({
            status,
            data
          })=>{
            if(status===200){
                console.log("data.code",data.code)
              if(data &&data.code===0){
                //跳转到login页面
                location.href="http://localhost:3338/login"
              }else{
                self.error=data.msg 
              }
            }else{
              self.error=`服务器错误，错误码:${status}`
            }
            setTimeout(() => {
              self.error=''
            }, 1500);

          })
        }

      })







    },
  },
}
</script>

<style lang="scss">
 @import "@/assets/css/register/index.scss";
</style>