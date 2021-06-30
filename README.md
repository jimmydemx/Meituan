# Meituan 

<font size="6" color="red">Note:</font>
For a more detailed overview of this project, please [download](http://storage.live.com/items/AEAB165A07B2199B!6090:/Full Stack Project- Meituan.pdf?authkey=AObJPJqOP6HGXy0) the PDF.


# 1. Introduction
This project is intended to realize the functionality of the most popular takeout/coupon platform in china:[Meituan.com](https://sh.meituan.com/). 


**Vue | ElementUI | Nuxt | Koa | Redis | Mongodb**
As a full stack project, It has utilized `Vue.js` as the framework for frontend coding, `Axios` as the way to asynchronosly communicate with the server. For the layout, `SASS` is adopted, along with [Element UI](https://element.eleme.io/#/en-US),an efficient `Vue Component` for the fast layout of webpage.
 At the backend, `Nuxt` Framework and  `Koa` in the backend,  features the Koa . `Redis` is for the storage of the session and verification code (generated in the registration process). Mongodb takes care of the storage of user info and all the data in the website.
[![22K5CV.png](https://z3.ax1x.com/2021/06/10/22K5CV.png)](https://imgtu.com/i/22K5CV)


# 2. Functionality
The #TODO List of  functionality is shown as below:
**Registration**
- [x] Registration Logic:check the validity of the user-input info.
- [x] Registration Logic: send verification code via email
- [x] Registration Logic: finish Registration
- [x] Registration Logic: storage of info. of User in Mongodb

**Login/Exit**
- [x] generation of Session and use session for the login and exit.

**Search and Location**
- [x] Search bar data fetching in Mongodb
- [x] Recommendation bar 
- [x] Geograpic Serice check the location based on IP.
- [x] city/disctrict based Search

**Map**
- [ ] embed the Map for reference of the direction of shops

**Comercial**
- [ ] creation of Shopping Cart
- [ ] creation of Checkout Logic
- [ ] Integration of the 3rd-party based Payment (Credit card, Alipay and Wechat) 

# 3. Installation 

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```


# 4. Notes

As for the privacy of data of Meituan, the database is `not` uploaded to
github, Please contact the author for the database only for the non-commercial purpose. 


There are some pitfall that need to dodge,
1, In order to use SASS, the compatibility shall be considered,since `node-sass@4.14.1` is only compatibale with `node@14.x`, node shall shift to/downgrade to `node@14.x`:

```bash
npm install sass-loader@10 node-sass@4.14.1 

```




