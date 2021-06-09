<template>
  
</template>

<script>
export default {
    layout:"blank",
    middleware: async(ctx)=>{
        let{status,
            data
        }=await ctx.$axios.get("http://localhost:3338/users/exit")
        if(status===200 &&data &&data.code===0){
            window.location.href="http://localhost:3338/"
        }
    }
}
</script>

<style>

</style>