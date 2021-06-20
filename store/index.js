// const Vue= require("vue")
// const Vuex=require("vuex")
// const geo =require("./modules/geo")

// import Vue from "vue"
// import Vuex from "vuex"
//import geo from  "./modules/geo"

// Vue.use(Vuex)
// console.log(new Vuex.Store({
//     state:{
//         a:1
//     },
//     mutations:{
//         aa(){
//             console.log("aa")

//         }
//     }

//  }))

// var store=new Vuex.Store({

    // modules: {geo},

    // actions:({
    //     async nuxtServerInit(
    //         {commit},{req,app}){
    //             const {status,data:{regionName,city}}= await app.$axios.get("http://localhost:3338/geo/getPosition")
    //             console.log(regionName,city)
    //         }
    // })

// })
 
export const actions = {
  async nuxtServerInit({
    commit
  },{req,app}) {
    const {status,data: {regionName,city}} = await app.$axios.get("http://localhost:3338/geo/getPosition")
    console.log(regionName,city)
    commit('geo/setPosition',status===200?{city,regionName}:{city:'',regionName:''}) 
    const {status:status2, data: {menu}} = await app.$axios.get('http://localhost:3338/geo/menu') 
    commit('home/setMenu',status2===200?menu:[])
    const {status:status3, data: {result}} = await app.$axios.get('http://localhost:3338/search/hotPlace',{params:{
      city:app.store.state.geo.position.city //上海，北京
      }
    }) 
    commit("home/setHotPlace",status3===200?result:[])
  }

}



    // const {status:status2, data: {menu}} = await app.$axios.get('/geo/menu')
    // commit('home/setMenu',status2===200?menu:[])
    // const {status:status3,data:{result}}=await app.$axios.get('/search/hotPlace',{
    //   params:{
    //     city:app.store.state.geo.position.city.replace('市','')
    //   }
    // })
    // commit('home/setHotPlace',status3===200?result:[])