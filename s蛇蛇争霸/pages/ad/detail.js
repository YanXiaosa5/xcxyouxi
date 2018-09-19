/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 *  *Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 * 
 */


const txvContext = requirePlugin("tencentvideo");
import config from '../../utils/config.js'
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var auth = require('../../utils/auth.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js')
var app = getApp();
let isFocusing = false

// pages/ad/index.js
const TRADIS = require('../../tradis/tradis.js');
var CID = config.CID;

Page({
    data: {

        title: '文章内容',
        detail: {},
        BHeight: 0,
        pageIn:'detail',


    },
    onLoad: function (options) {
      let openid = wx.getStorageSync('openid');
      if (openid) {
        TRADIS.tradis(this);
        this.fetchDetailData(options.id);
      } else {
        app.getToken().then(res => {
          TRADIS.tradis(this);
          this.fetchDetailData(options.id);
        })
      }
       
    },
    //获取文章内容
    fetchDetailData: function (id) {
      var self = this;
      var getPostDetailRequest = wxRequest.getRequest(Api.getPostByID2(id));
      var res;
      getPostDetailRequest
        .then(response => {
          res = response;
          WxParse.wxParse('article1', 'html', response.data.data.content.rendered, self, 5);
          self.setData({
            detail: response.data.data,
          });
        })
        .then(response => {
          wx.setNavigationBarTitle({
            title: res.data.title.rendered
          });

        })
        .catch(function (response) {

        }).finally(function (response) {

        });
    },
    copyLink: function (url) {
      //this.ShowHideMenu();
      wx.setClipboardData({
        data: url,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '链接已复制',
                image: '../../images/link.png',
                duration: 2000
              })
            }
          })
        }
      })
    },
    //给a标签添加跳转和复制链接事件
    wxParseTagATap: function (e) {
      var self = this;
      var href = e.currentTarget.dataset.src;
      console.log(href);
      wx.setClipboardData({
        data: href,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '链接已复制',
                //icon: 'success',
                image: '../../images/link.png',
                duration: 2000
              })
            }
          })
        }
      })
    },
    // 跳转至查看文章详情
    redictDetail: function (e) {
      console.log(e);
      if (e.currentTarget.dataset.linktype == 'h5') {
        wx.navigateTo({
          url: '/tradis/h5/h5?url=' + encodeURIComponent(e.currentTarget.dataset.path)
        })
      }
      else if (e.currentTarget.dataset.linktype == 'wxa') {
        wx.navigateToMiniProgram({
          appId: e.currentTarget.dataset.appid,
          path: e.currentTarget.dataset.path,
          success: function (res) {

          }
        })
      }
      else if (e.currentTarget.dataset.linktype == 'article') {
        wx.navigateTo({
          url: e.currentTarget.dataset.path
        })
      }
      else {
        wx.navigateTo({
          url: '/pages/ad/detail?id=' + e.currentTarget.id,
        })
      }
    },
})