<template>
<div class="m-life">
    <el-row type="flex">
        <el-col class="modify3">
            <slider/>
        </el-col>
        <el-col class="modify">
            <div class="m-life-pic"/>
        </el-col>
        <el-col class="modify1">
            <div  class="m-life-login">
                <p><img src="https://s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg" alt=""></p>
                <p class="m-life-login-name">Hi! 你好</p>
                <p><nuxt-link to="/register"/><el-button round size="medium">注册</el-button></p>
                <p><nuxt-link to="/login"/><el-button round size="medium">立即登陆</el-button></p>
                
            </div>
        </el-col>
  </el-row>

  <el-row type="flex" justify="left"> 
      <el-col class="modify4">
          <div class="m-life-hotel"/>
      </el-col>
       <el-col  class="modify4">
          <div class="m-life-music"/>
      </el-col>
       <el-col  class="modify5">
          <div class="m-life-coop"/>
      </el-col>
       <el-col class="modify6">
          <div class="m-life-downapp">
            <img src="https://s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载App">
            <p>美团APP手机版</p>
            <h4><span>1元起</span><em>吃喝玩乐</em></h4>
          </div>
      </el-col>
  </el-row>
</div>
  
</template>

<script>
import slider from "./slider.vue"
export default {
    components:{
        slider
    }
    

}
</script>

<style lang="scss">
@import "@/assets/css/index/life.scss"



</style>