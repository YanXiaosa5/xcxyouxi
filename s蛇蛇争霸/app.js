//app.js
const Promise = require('utils/bluebird.min.js');
var Base64 = require("./utils/base64.js");
import config from './utils/config.js'
var HOST_DOMAIN = config.hostDomain;
var CID = config.CID;


App({
  onLaunch: function (ops) {
    //调用API从本地缓存中获取数据
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })

    }
  },
  onShow: function (ops) {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.system);
        if (res.system.indexOf("Android") != -1) {
          console.log('安卓');
          this.globalData.device = 2;
        }
        if (res.system.indexOf("iOS") != -1) {
          console.log('IOS');
          this.globalData.device = 1;
        }
      }
    })
  },


  globalData: {
    userInfo: null,
    api: HOST_DOMAIN,
    headers: {},
    device:'',
  },

  getToken() {
    return new Promise((resolve, reject) => {

      wx.login({   // 获取code
        success: res => {
          if (res.code) {
            wx.request({ // 获取openid
              url: this.globalData.api + '/api.php?s=user&app_id=' + CID,
              method: 'GET',
              data: {
                code: res.code
              },
              success: res => {
                if (res.data.code == 200) {
                  console.log('res===', res.data)
                  wx.setStorageSync('openid', res.data.data.openid);
                  wx.setStorageSync('session_key', res.data.data.session_key);
                  resolve(res)
                }
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
            reject('error');
          }
        }
      })
    })
  },
})