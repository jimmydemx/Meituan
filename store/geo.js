const state=()=>({position:{}})


const mutations={
    setPosition(state,val){

        state.position=val

    }

}


const actions={
    setPosition:({commit},postion)=>{
        commit("setPosition",postion)

    }

}

export default{
    namespaced: true,
    state,
    mutations,
    actions,

}