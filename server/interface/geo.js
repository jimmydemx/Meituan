const Router=require('koa-router')
const axios=require('./utils/axios')
const Menu=require("../models/menu")
const Province=require("../models/province")
const City=require("../models/city")
let router= new Router({prefix:'/geo'})


router.get('/getPosition', async(ctx)=> {
    var {
        status,
        data:{ regionName,
            city
             }
         }=await axios.get(`http://ip-api.com/json/`)
    if(status===200){
        ctx.body={
            regionName,
            city
        }
    }else{
        ctx.body={
            regionName:"",
            city:"",
        }

    }

})


router.get('/menu',async(ctx)=>{
    const result= await Menu.findOne()
    // console.log("menu=",result.menu)
    ctx.body={

        menu:result.menu
    }


})

router.get('/province',async(ctx)=>{
    if(ctx.query.np){
        var result=await City.find({"value.province":ctx.query.np})
        ctx.body={
            code:0,
            result
        }
    }else{ 
        var result=await Province.find() //return array
        ctx.body={
        province: result.map(item=>{
            return{
                id:item.id,
                name:item.value
                }
            })
        }
    }    
})


router.get('/province/:id', async(ctx)=>{
  try{ 
        var city= await City.findOne({id:ctx.params.id})
        ctx.body={
            code:0,
            city:city.value.map(item=>{
                return {province:item.province,id:item.id,name:item.name}
            })
        }
    }catch(e){
        ctx.body={
            code:-1,
            
        }
    }
})



router.get('/city', async (ctx)=>{
    var city=[]
    var result= await City.find()
    result.forEach(item => {
        city=city.concat(item.value)
    });
    ctx.body={
        code:0,
        city: city.map(item=>{
            return {
                province:item.province,
                id:item.id,
                name:item.name==="市辖区" || item.name==="省直辖县级行政区划"
                ? item.province
                :item.name
            }
        })
    }
})



router.get('/hotCity', async (ctx)=>{
    var list=[
        "北京市",
        "上海市",
        "广州市",
        "深圳市",
        "天津市",
        "西安市",
        "杭州市",
        "南京市",
        "武汉市",
        "成都市",
    ]
    
    var result= await City.find()
    var nList=[]
    result.forEach(item=>{
        nList=nList.concat(item.value.filter(k=>list.includes(k.name)|| list.includes(k.province)))
    })
    ctx.body={
        hots:nList
    }

})



module.exports= router


