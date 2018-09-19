/**
 * 配置及公有属性
 **/
import config from '../utils/config.js'
var HOST_DOMAIN = config.hostDomain;
var CID = config.CID;
var Appid=config.Appid;
var shortName=config.shortName;
var realWindowWidth = 0;
var realWindowHeight = 0;

// var json = {
//   "code": 200,
//   "msg": "ok",
//   "data": [{
//     "type": "topBanner",
//     "status": true,
//     "width": "750rpx",
//     "height": "214rpx",
//     "style": "position:fixed;top:0rpx;right:0;width:750rpx;height:214rpx;",
//     "content": [{
//       "appid": "wx25bd16dee2ab6c5d",
//       "type": "wxa",
//       "path": "/pages/share/share?id=46313",
//       "image": "https://wxa.zhuyuce.com/Uploads/Picture/2018-03-16/5aab7611e7748.jpg",
//       "mode": "aspectFill"
//     }]
//   },
//   {
//     "type": "innerBanner",
//     "status": true,
//     "width": "650rpx",
//     "height": "200rpx",
//     "style": "position:static;width:650rpx;height:214rpx;",
//     "content": [{
//       "type": "ad",
//       "unit_id": "adunit-f131845960dadfc2"
//     }]
//   },
//   {
//     "type": "bottomBanner",
//     "status": true,
//     "width": "750rpx",
//     "height": "214rpx",
//     "style": "position:fixed;top:0rpx;right:0;width:750rpx;height:214rpx;",
//     "content": [{
//       "type": "ad",
//       "unit_id": "adunit-f131845960dadfc2"
//     }]
//   },
//   {
//     "type": "silderfloat",
//     "status": true,
//     "width": "100rpx",
//     "height": "100rpx",
//     "style": "position:fixed;top:550rpx;right:0;width:100rpx;height:100rpx;",
//     "content": [{
//       "type": "article",
//       "path": "/pages/ad/detail?id=11",
//       "image": "https://wxa.zhuyuce.com/Uploads/Picture/2018-03-16/5aab7611e7748.jpg",
//       "mode": "aspectFill"
//     }]
//   }
//   ]
// }

wx.getSystemInfo({
  success: function (res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})
/**
 * 主函数入口区
 **/
function tradis(target) {

  console.log(target)
  let bindData = {};
  wx.request({
    url: HOST_DOMAIN + '/api.php?s=Index/ads&id=' + CID,
    //url: 'http://10.0.0.77/wxapp/api.php?s=Index/ads&id=222', 
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data.code == 1) {
        bindData['openid'] = wx.getStorageSync('openid');
        bindData['tradisData'] = res.data.data;
        bindData['innerad'] = [];
        bindData['positionad'] = [];
        //bindData['tradisData']=json.data;
        bindData['tradisData'].forEach(function (v, i) {

          bindData['tradisData'][i].content.forEach(function (vvv, iii) {
            bindData['tradisData'][i].content[iii]._t = new Date().getTime();
            bindData['tradisData'][i].content[iii].openid = wx.getStorageSync('openid');
          });
          bindData['tradisData'][i].show = false;


          if (bindData["tradisData"][i].display.length == 0) {

            if (v.type == "topBanner") {
              bindData["BHeight"] = 0;
            }
            else if (v.type == "btmBanner") {
              bindData["BTHeight"] = 0;
            }
          }
          //截取当前页面显示的ad
          bindData["tradisData"][i].display.forEach(function (vv, ii) {
            if (target.data.pageIn == vv) {
              //截取innerBanner
              if (bindData['tradisData'][i].type == 'innerBanner') {
                bindData['innerad'].push(bindData['tradisData'][i]);
              }
              bindData['positionad'].push(bindData['tradisData'][i]);
              bindData['tradisData'][i].show = true;
              if (v.type == "topBanner") {
                bindData["BHeight"] = parseInt(v.height) + 15 + 'rpx';
                return;
              }
              else if (v.type == "btmBanner") {
                bindData["BTHeight"] = parseInt(v.height) + 15 + 'rpx';
              }
              // bindData['tradisData'][i].content.forEach(function(vvv,iii){
              //   var url = 'https://r.d1fm.com/r.gif?union_id=' + vvv.union_id + '&creative_id=' + vvv.creative_id + '&action=view';
              //   wx.request({
              //     url: url
              //   })

              // })
              return;
            }
          })
        })
        console.log(bindData);
        target.setData(bindData);
      }


    }
  })
  // var bindData = {};
  // bindData['tradisData'] = {};
  // that.setData(bindData)
  target.tradisTap = tradisTap;
  target.tradisError = tradisError;
  target.tradisLoad = tradisLoad;
}
function click_count(e) {
  var url = 'https://r.d1fm.com/r.gif?union_id=' + e.target.dataset.union_id + '&creative_id=' + e.target.dataset.creative_id + '&openid=' + wx.getStorageSync('openid') + '&action=click';
  console.log(url);
  wx.request({
    url: url
  })
}
function tradisTap(e) {
  var _this = this;

  console.log(e);
  if (e.target.dataset.linktype == 'h5') {
    console.log('click h5');
    wx.reportAnalytics('gaogao', {
      type: 'h5',
    });
    wx.navigateTo({
      url: '/tradis/h5/h5?url=' + encodeURIComponent(e.target.dataset.path),
      success: function () {
        click_count(e);
      }
    })
  }
  if (e.target.dataset.linktype == 'wxa') {
    console.log('wxa');
    wx.reportAnalytics('gaogao', {
      type: 'wxa',
    });
    console.log(e.target.dataset.path + encodeURIComponent('|xsl_from=' + Appid + '|xsl_position=' + shortName));
    debugger;
    wx.navigateToMiniProgram({
      appId: e.target.dataset.appid,
      path: e.target.dataset.path+ encodeURIComponent('|xsl_from='+Appid+'|xsl_position='+shortName),
      success: function () {
        
        click_count(e);
      }
    })
  }
  if (e.target.dataset.linktype == 'article') {
    console.log('article');
    wx.reportAnalytics('gaogao', {
      type: 'article',
    });
    wx.navigateTo({
      url: e.target.dataset.path,
      success: function () {
        click_count(e);
      }
    })
  }
  if (e.target.dataset.linktype == 'ad') {
    console.log('ad');
    wx.reportAnalytics('gaogao', {
      type: 'ad',
    });
    click_count(e);
  }
}
function tradisError(e){

  var _this = this;
    console.log('没有合适的广告显示');
    console.log(_this.data.positionad);
    console.log(_this.data.innerad);
    _this.data.positionad.forEach((v,i)=>{
      _this.data.positionad[i].content.forEach((vv,ii)=>{
        if (_this.data.positionad[i].content[ii].type == 'ad') {
          _this.data.positionad[i].content[ii].ad.show = true;
        }
      })

    });
    _this.data.innerad.forEach((v, i) => {
      _this.data.innerad[i].content.forEach((vv, ii) => {
        if (_this.data.innerad[i].content[ii].type == 'ad') {
          _this.data.innerad[i].content[ii].ad.show = true;
        }
      })
    });
    console.log(_this.data.positionad);
    console.log(_this.data.innerad);
    _this.setData({
      positionad: _this.data.positionad,
      innerad: _this.data.innerad
    })
}
function tradisLoad(e){
  console.log(e);
}

module.exports = {
  tradis: tradis,
  tradisTap: tradisTap,
  tradisError: tradisError,
  tradisLoad: tradisLoad,
}
