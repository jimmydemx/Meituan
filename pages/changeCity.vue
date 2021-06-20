<template>
  <div class="page-changeCity">
      <el-row>
          <el-col :span="24">
              <iselect/>
          </el-col>
      </el-row>

      <el-row>
          <el-col :span="24">
              <hot/>
          </el-col>
      </el-row>

      <el-row>
          <el-col :span="24">
            <category/>
          </el-col>
      </el-row>    
  </div>
</template>

<script>
import iselect from "@/components/changeCity/iselect.vue"
import hot from "@/components/changeCity/hot.vue"
import category from  "@/components/changeCity/category.vue"
export default {
    components:{
        iselect,hot,category
        
    }
    

}
</script>

<style>


</style>