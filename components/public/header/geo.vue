<template>
    <div class="m-geo">
        <i class="el-icon-loaction"/>
            {{$store.state.geo.position.city}}
        <nuxt-link class="changCity" to="/changeCity">切换城市</nuxt-link>
        [彰化,太仓]
        
    </div>
  
</template>

<script>
export default {
    data(){
        return {
            city:""
        }
    },
    // mounted(){
    //     this.$axios.get("http://localhost:3338/geo/getPosition")
    //     .then((ctx)=>{
    //     if(ctx.status===200)
    //         {this.city=ctx.data.city}
    //     })


    // }

}
</script>

<style>

</style>