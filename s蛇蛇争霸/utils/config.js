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



//配置域名,域名只修改此处。
//如果wordpress没有安装在网站根目录请加上目录路径,例如："www.watch-life.net/blog"
var DOMAIN = "weapp.zhuyuce.com";
var HOST_DOMAIN = 'https://wxa.zhuyuce.com';
var MINAPPTYPE="0";//小程序的类型，如果是企业小程序请填：0 ，如果是个人小程序请填：1
var WEBSITENAME ="蛇蛇争霸"; //网站名称
var ABOUTID = 1040; //wordpress网站"页面"的id,注意这个"页面"是wordpress的"页面"，不是"文章"
var PAGECOUNT='10'; //每页文章数目
var CID = "136";
//var CATEGORIESID='all'  //显示全部的分类
var CATEGORIESID = '136';//指定显示的分类的id
var PAYTEMPPLATEID = 'fPMLhOFgZKUI1R-WxHkJ-bObExwka6ulwdSiaT3iOv0';//赞赏消息模版id
var REPLAYTEMPPLATEID = 'OEtKo3QoAEYvCG9ZMRCg0F6Q_oZeXibBWBP_3TB-RSg';//回复评论消息模版id
 //首页图标导航
 //参数说明：'name'为名称，'image'为图标路径，'redirectlink'为跳转的页面，'redirecttype'为跳转的类型，page为本小程序的页面，app为其他微信小程序
 //        'appid' 当redirecttype为app时，这个值为其他微信小程序的appid，如果redirecttype为page时，这个值设置为空。
var INDEXNAV = [
    { id: '1', name: '微店', image: '../../images/shop.png', redirectlink: 'pages/shelf/shelf', redirecttype: 'app', appid:'wx55ea6098e41af5c4' },
    { id: '2', name: '排行', image: '../../images/ranking.png', redirectlink: '../hot/hot', redirecttype: 'page', appid: ''},
    { id: '3', name: '专题', image: '../../images/tar-topic.png', redirectlink: '../topic/topic', redirecttype: 'page', appid: ''},
    ]

var Appid = 'wxf18a628c51861d5f';
var shortName = 'sszb';

export default {
  getDomain: DOMAIN,
  hostDomain: HOST_DOMAIN,
  getWebsiteName: WEBSITENAME,
  getAboutId: ABOUTID,
  getPayTemplateId: PAYTEMPPLATEID,
  getPageCount: PAGECOUNT,
  getCategoriesID: CATEGORIESID,
  getIndexNav: INDEXNAV,
  getReplayTemplateId: REPLAYTEMPPLATEID,
  getMinAppType: MINAPPTYPE,
  CID: CID,
  Appid: Appid,
  shortName: shortName,
}