<template>
<section class="m-istyle">
    <dl @mouseover="over">
        <dt>推荐民宿</dt>
        <dd  :class="{active:kind==='nanjing'}" kind="nanjing">南京</dd>
        <dd :class="{active:kind==='hanghzou'}" kind="hangzhou">杭州</dd>
        <dd :class="{active:kind==='suzhou'}" kind="suzhou">苏州</dd>

    </dl>
    <ul class="ibody">
        <li v-for="item in cur" :key="item">
            <el-card :body-style="{padding: '0px'}"
            shadow="never">
            <img :src="item.img" class="image" alt="">
            <ul class="cbody">
                <li class="title">{{item.title}}</li>
                <li class="pos"><span>{{item.pos}}</span></li>
                <li class="price">¥<em>{{item.price}}</em></li>
            </ul>
            </el-card>
        </li>

    </ul>




</section>
  

</template>

<script>
export default {
    data:()=>{
        return{
                kind:"nanjing",
                list:{
                    nanjing:[],
                    hangzhou:[],
                    suzhou:[1]

                }
        }

    },
    computed:{
        cur(){
            return this.list[this.kind]

        }



    },
    methods:{
        over: async function(e){
            var self=this
            var dom=e.target
            var tag= dom.tagName.toLowerCase()
            if(tag==="dd"){
                this.kind=dom.getAttribute("kind")
                // send kind to backend and retrieve data,fill in body
                let{status, data:{result}}=await this.$axios.get("http://localhost:3338/search/resultsByKeywords",{
                    params:{
                        kind:this.kind,
                        city: this.$store.state.geo.position.city
                    }
                })
                if(status===200){
                    let r=result.filter(item=>item.photos.length).map(item=>{
                        return{
                            title:item.name,
                            pos:item.type.split(";")[0],
                            price:item.biz_ext.cost || '暂无',
                            img:item.photos[0].url
                        } 

                    })
                    this.list[this.kind]=r.slice(0,9)
                    console.log(r.slice(0,9)) 
                }else{
                    this.list[this.kind]=[]
                }
            }
        }

    }

}
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss"

</style>