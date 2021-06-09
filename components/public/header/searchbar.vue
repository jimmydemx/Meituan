<template>
  <div class="search-panel">
      <el-row class="m-header-searchbar">
          <el-col :span="3" class="left">
              <img src="https://s0.meituan.net/bs/fe-web-meituan/10afbf1/img/logo.png" alt="美团">
          </el-col>
          <el-col :span="15" class="center">
              <div class="wrapper">
                  <el-input v-model="search" placeholder="搜索商家或地点" 
                  @focus="focus"
                  @blur="blur"
                  @input="input"></el-input>
                  <button class="el-button el-button-primary">
                      <i class="el-icon-search"/>
                  </button>
                  <dl class="hotPlace" v-if="isHotplace">
                      <dt>热门搜索</dt>
                      <dd v-for="(item, index) in HotList" :key="index">{{item}}</dd>
                      
                  </dl>
                  <dl class="searchList" v-if="isSearchplace">
                      <dd v-for="(item, index) in searchList" :key="index">{{item}}</dd>
                      
                  </dl>
                <ul class="nav">
                    <li>
                       <nuxt-link to='/' class="takeout">美团外卖</nuxt-link> 
                    </li>
                    <li>
                        <nuxt-link to='/' class="moive">猫眼电影</nuxt-link> 
                    </li>
                    <li>
                        <nuxt-link to='/' class="hotel">美团酒店</nuxt-link> 
                    </li>
                    <li>
                        <nuxt-link to='/' class="apartment">民宿/公寓</nuxt-link> 
                    </li>
                    <li>
                        <nuxt-link to='/' class="business">商家入驻</nuxt-link> 
                    </li>
                    <li>
                        <nuxt-link to='/' class="public">美团公益</nuxt-link> 
                    </li>
                </ul>

              </div>
          </el-col>
          <el-col :span="6" class="right">
          </el-col>


      </el-row>



  </div>
</template>

<script>
export default {
    data(){
        return {
            search:"",
            isFocus:false,
            searchList:["火锅","火锅","火锅"],
            HotList:["奶茶",'奶茶','奶茶']

        }
    },
    computed:{
        isHotplace:function(){
            return this.isFocus&&!this.search
        },
        isSearchplace:function(){
            return this.isFocus&&this.search 
        }

    },
    methods:{
        focus(){
            this.isFocus=true
        },
        blur(){
            setTimeout(()=>{
            this.isFocus=false
            },200)
            
        },
        input(){
            console.log(this.search)
        }
    }

}
</script>

<style>

</style>