<template>
   <div class="m-menu">
       <dl class="nav"  @mouseleave="mouseleave">
           <dt style="padding:30px 0 28px 0">全部分类</dt>
           <dd v-for="(item,index) in menu" 
           :key=index
           @mouseenter="mouseenter">
               <i :class="item.type"/>{{item.title}}
               <span class="arrow"/>
               </dd>
       </dl>
       <div class="detail" v-if='kind' @mouseenter="sover" @mouseleave="sout">
           <template v-for="(item,index) in curdtail.child">
               <h4 :key="index">{{item.title}}</h4>
               <span v-for="v in item.child" :key=v>
                   {{v}}
               </span>
           </template>
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return {
            kind:'',
            menu:[{
                type:'food',
                title:'美食',
                child:[{
                    title:'美食',
                    child:['代金券','甜品饮料','火锅','自助餐','小吃快餐']  
                }] 
            },{
                type:'takeout',
                title:'外卖',
                 child:[{
                    title:'外卖',
                    child:['美团外卖']  
                }]

            },{
                type:'hotel',
                title:'酒店',
                 child:[{
                    title:'外卖',
                    child:['经济型','舒适/三星','高档/四星']  
                }]
            }
            ]    
        }

    },
    computed:{
        curdtail: function(){
            return this.menu.filter((item)=>item.type===this.kind)[0]
        }
    },
    methods:{
        mouseleave:function(){
            this._timer=setTimeout(()=>{this.kind=""},150)

        },
        mouseenter:function(e){
            this.kind=e.target.querySelector("i").className
        },
        sover:function(){
            clearTimeout(this._timer)
        },
        sout:function(){
            this.kind=""
        }
    }

}
</script>

<style>

</style>