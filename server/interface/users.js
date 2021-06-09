// signup
// login 
// exit/logout
// verify
// getUser

const Router=require('koa-router')
const Redis=require('koa-redis')
const nodeMailer=require('nodemailer')
const Email = require("../models/config")
const axios=require("./utils/axios")
const User= require('../models/schema')
const Passport=require('./utils/passport')



 const router = new Router({
     prefix:'/users'
 })


 let Store =new Redis().client


router.post('/verify', async (ctx, next) => {
    let username = ctx.request.body.username
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    //block the frequent request
    console.log('saveExpire=',saveExpire)
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
      ctx.body = {
        code: -1,
        msg: '验证请求过于频繁，1分钟内1次'
      }
      return false
    }
    //send email
    let transporter = nodeMailer.createTransport({
      service: 'qq',
      auth: {
        user: Email.smtp.user,
        pass: Email.smtp.pass
      }
    })
    //set 
    let ko = {
      code: Email.smtp.code(),
      expire: Email.smtp.expire(),
      email: ctx.request.body.email,
      user: ctx.request.body.username
    }
    //
    let mailOptions = {
      from: `"认证邮件" <${Email.smtp.user}>`,
      to: ko.email,
      subject: 'Verification code for register in Meituan',
      html: `You are registering in Meituan.com, the verification code is ${ko.code}`
    }
    //发送邮件
    console.log(mailOptions)
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      } else {
        //存储注册方信息
        Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
      }
    })
    // var a=  Store.hget(`nodemail:${ko.user}`,"code")
    // console.log(a)
    ctx.body = {
      code: 0,
      msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
  })

router.post("/signup",async (ctx)=>{
    const {username,password,email,code}=ctx.request.body
    // too long signup after verification
    const saveExpire=await Store.hget(`nodemail:${username}`,'expire')
    const saveCode=await Store.hget(`nodemail:${username}`,'code')
    console.log("saveExpire,saveCode",saveExpire,saveCode)
    if(code){
        if(code===saveCode){
            if(new Date().getTime()- saveExpire>0){
                ctx.body={
                    code:-1,
                    msg:'验证码已过期，请重新尝试'
                }
                return false
            }
        } else {
                ctx.body={
                    code:-1,
                    msg:'请填入正确的验证码'
                }
        }
    } else {

                ctx.body={
                    code:-1,
                    msg:"验证码不能为空"
                }
    }
    
    // compare vc with redis/mongoodb
    let nuser= await User.create({
        username,
        password,
        email
    })
    if(nuser){
        let res=await axios.post('http://localhost:3338/users/signin',{username,password})
        if (res.data && res.data.code===0){
            console.log("res.data",res.data)
            ctx.body={
                code:0,
                msg:'注册成功',
                user:'res.data.user'
                }
            }else{
                ctx.body={
                    code:-1,
                    msg:"axios get signin info wrong"
                }
        }
    }else{
        ctx.body={
            code:-1,
            msg:"注册失败"
        
        }
    }

})

router.post('/signin', async(ctx,next)=>{
    return Passport.authenticate("local", function(err,user,info,status){
        if(err){
            ctx.body={
                code:-1,
                msg:err
            }
        }else {
            if(user){
                ctx.body={
                    code:0,
                    msg:'登陆成功',
                    user
                }
                return ctx.login(user)
            }else{
                ctx.body={
                    code:1,
                    msg:info
            }
            }  
        }   
    })(ctx,next)

})


router.get('/getUser', async (ctx)=>{
    if(ctx.isAuthenticated()){
        const {username,email}=ctx.session.passport.user
    
    ctx.body={
        user:username,
        email:email
        }
    }else{
        ctx.body={
            user:"",
            email:""
        }
    }    
})

router.get('/exit',async(ctx)=>{

    await ctx.logout()
    if(!ctx.isAuthenticated()){
        ctx.body={
            code:0
        }
    }else{
        ctx.body={
            code:-1
        }
    }





})

 module.exports = router