const Router=require('koa-router')
const axios=require('./utils/axios')
const Poi=require("../models/poi.js")
const topsearches=require("../models/topsearches.js")

let router= new Router({prefix:"/search"})

router.get('/top', async (ctx)=>{
    try{
        let top= await Poi.find({
            // fuzzy search using regulate expression
            // "name": new RegExp(ctx.query.input)
            // city:ctx.query.city  
            // NOTE: to be modified, due to inadequent database
            "city" : "三亚",
            "type": '丽人'
        })
        ctx.body={
            code:0,
            top: top.map(item=>{
               return {
                name:item.name,
                type:item.type
               }     
            }),
            type:top.length?top[0].type:""   

        } 
    }catch(e){
        ctx.body={
            code:-1,
            top:[]
        }

    }

})




router.get('/hotPlace',async (ctx)=>{
 var city=ctx.store? ctx.store.geo.position.city:ctx.query.city
try{
    let result= await topsearches.find()

        // NOTE: to be modified, due to inadequent database

    ctx.body={
        code:0,
        result:result.map(item=>{
            return{
                name:item.value
            }

        })

    }
}catch(e){
    ctx.body={
        code:-1,
        result:[]
    }
}
    
})




router.get('/resultsByKeywords',async(ctx)=>{
    var {city,keyword}=ctx.query;
    try{
        // NOTE: to be modified, due to inadequent database
        let result= await Poi.find({
            city : "三亚",
        })
        ctx.body={
            code:0,
            result,


        }
    }catch(e){
        ctx.body={
            code:-1,
            result:[]
        }

    }


 })
module.exports=router