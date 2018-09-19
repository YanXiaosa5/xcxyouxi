/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 */


import config from 'config.js'

var domain = config.getDomain;
var pageCount = config.getPageCount;
var categoriesID = config.getCategoriesID;
var HOST_DOMAIN = config.hostDomain;
var HOST_URI_WATCH_LIFE_JSON = 'https://' + domain + '/wp-json/watch-life-net/v1/';
var CID = config.CID;
   
module.exports = {  
  // 获取文章列表数据

  getPosts2: function (obj) {
    var url = HOST_DOMAIN + '/api.php?s=Index/posts&page=' + obj.page + '&perpage=10&app_id=' + CID
    return url;

  },


 
  


  getSwiperPosts2: function () {
    var url = HOST_DOMAIN + '/api.php?s=Index/focus&id=' + CID;
    return url;
  },






  // 获取内容页数据
  getPostByID2: function (id) {

    return HOST_DOMAIN +'/api.php?s=Index/posts&id=' + id;
  },
  // 获取内容页数据
  getJumpByID: function (id) {

    return HOST_DOMAIN +'/api.php?s=Index/pages&id=' + id;
  },

  //获取用户openid
  getOpenidUrl(id) {
    var url = HOST_URI_WATCH_LIFE_JSON;
    url += "weixin/getopenid";
    return url;
  },















};