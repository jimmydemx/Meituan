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
                      <dd v-for="(item, index) in $store.state.home.hotPlace.slice(0,5)" :key="index">{{item.name}}</dd>
                      
                  </dl>
                  <dl class="searchList" v-if="isSearchplace">
                      <dd v-for="(item, index) in searchList" :key="index">{{item.name}}</dd>
                      
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
import _ from 'lodash'
export default {
    data(){
        return {
            search:"",
            isFocus:false,
            searchList:[],
            HotList:[]

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
        input:_.debounce(
            async function(){
                var self=this
                // get city first
                var city=self.$store.state.geo.position.city
                this.searchList=[]
                let {status,data:{top}}=await self.$axios.get("http://localhost:3338/search/top",{
                    params:{
                        input:self.search,
                        city:"上海"
                    },headers:{
                        "Access-Control-Allow-Origin": "http://localhost:3338"
                    }
                })
                self.searchList=top.slice(0,10)

        },400)
            
        
    }

}
</script>

<style>

</style>