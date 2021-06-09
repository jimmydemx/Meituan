const  axios =require('axios')

const instance= axios.create({
    baseURL: `http://${process.env.HOST || `localhost`}: ${process.env.PORT || 3338}`,
    timeout:1000,
    headers:{

    }
})

module.exports=instance