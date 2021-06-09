<template>
  <el-row 
  :gutter="0"
  >
  <el-col :span="4">
      <Geo/>
  </el-col>
  <el-col :span="4">
      <user/>
  </el-col>
  <el-col :span="16">
      <navp/>
  </el-col>
  
</el-row>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'
import Navp from './nav.vue'
export default {
    components:{
        Geo,User,Navp
    }
}
</script>

<style>

</style>