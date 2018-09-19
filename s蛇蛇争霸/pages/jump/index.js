// pages/jump/index.js
import config from '../../utils/config.js';
var CID = config.CID;
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var auth = require('../../utils/auth.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js')
const TRADIS = require('../../tradis/tradis.js');
var app = getApp();
// var article =`<div style="width: 100%; height: auto; background:url('http://ww4.sinaimg.cn/large/87c01ec7gy1fpi4ttdexej20ku112juh.jpg') center top; min-height: 100vh; background-size: 100% auto; background-repeat: no-repeat; margin: 0; padding: 0;"><div style="position: absolute;left: 0; right: 0; width: 60%; margin: 0 auto; top: 644rpx"><p style="text-align: center; font-size: 16px; color: #ffffff; height: 35px; line-height: 35px; display: block;">如何进入游戏</p><p style="text-align: left;font-size: 16px; color: #FFFFFF;height: 30px; line-height: 30px;display: block;">1.<a href="https://xz.2bai.org/url/19096881" style="display: inline-block;width: 75px; height: 25px; line-height: 25px; text-align: center; background: #82d4d9; border-radius: 5px; vertical-align: middle;">点此复制</a>损友圈链接</p><p style="text-align: left;font-size: 16px; color: #FFFFFF;height: 30px; line-height: 30px;display: block;">2.发送至任意对话框</p><p style="text-align: left;font-size: 16px; color: #FFFFFF;height: 30px; line-height: 30px;display: block;">3.点击发送的链接，进入游戏</p><button open-type='contact' style="width: 698rpx;height: 232rpx;line-height: 232rpx;position: fixed;left: 0;right:0;margin:0 auto; bottom: 0;background:url('http://ww3.sinaimg.cn/large/87c01ec7gy1fpi6ev2f2aj20je06gaav.jpg');background-size:100% 100%;"></button></div></div></div>`;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '文章内容',
    detail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchDetailData(CID);
    TRADIS.tradis(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //获取文章内容
  fetchDetailData: function (id) {
    var self = this;
    var getPostDetailRequest = wxRequest.getRequest(Api.getJumpByID(id));
    var res;
    getPostDetailRequest
      .then(response => {
        res = response;
       // WxParse.wxParse('article1', 'html', article, self, 5);
        WxParse.wxParse('article1', 'html', response.data.data.page, self, 5);
        self.setData({
          detail: response.data,
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
})