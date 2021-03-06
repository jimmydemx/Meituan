const koa=require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose =require ('mongoose')
const bodyParser =require ('koa-bodyparser')
const session =require ('koa-generic-session')
const redis =require ('koa-redis')
const json =require ('koa-json')
const dbConfig =require ('./server/models/config')
const router =require ('./server/interface/users')
const passport =require ('./server/interface/utils/passport.js')
const geo =require ('./server/interface/geo.js')
const search=require('./server/interface/search.js')

const app = new koa()
const host = process.env.HOST || '127.0.0.1' 
const port = process.env.PORT || 3338


// 
app.keys=["mt",'keyskeys']
app.proxy=true
app.use(session({
  key:'mt',
  prefix:'mt:uid',
  store: new redis()}
))


app.use(bodyParser({
  extendTypes:['json','form','text']
}))

app.use(json())

// initiate mongoose 
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser: true,
  //useUnifiedTopology: true
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
 

app
  .use(router.routes())
  .use(router.allowedMethods());

app
  .use(geo.routes())
  .use(geo.allowedMethods());


  app
  .use(search.routes())
  .use(search.allowedMethods());  

app.use(ctx => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port, host)
consola.ready({message: `Server listening on http://${host}:${port}`, badge: true})
}
start()

