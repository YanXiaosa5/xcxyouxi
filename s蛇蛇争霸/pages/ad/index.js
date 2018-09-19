// pages/ad/index.js
const TRADIS = require('../../tradis/tradis.js');
var Api = require('../../utils/api.js');
var wxRequest = require('../../utils/wxRequest.js');
import config from '../../utils/config.js'
var CID=config.CID;

var pageCount = config.getPageCount;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postsList:[],
    isLastPage: false,
    page: 1,
    floatDisplay: "none",
    postsShowSwiperList: [],
    BHeight:0,
    pageIn:'index',
    show_sc: false,
    device: 0,
    isSH:false,
    issc: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setInterval(() => {
      this.setData({
        show_sc: true
      })
    }, 5000)
    this.setData({
      device: app.globalData.device
    })
    let openid = wx.getStorageSync('openid');
    if (openid) {
      this.fetchPostsData(this.data);
      this.fetchTopFivePosts();
    } else {
      app.getToken().then(res => {
        this.fetchPostsData(this.data);
        this.fetchTopFivePosts();
      })
    }
    wx.request({
      url: 'https://wxa.zhuyuce.com/hddzz/sszbv3.json',
      success: (res) => {
        if (res.data.code == 200) {
          this.setData({
            isSH: true,
          })
        }
        console.log(res);

      }
    })

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
    TRADIS.tradis(this);
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
    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 1
      });
      //console.log('当前页' + self.data.page);
      this.fetchPostsData(self.data);
    }
    else {
      wx.showToast({
        title: '没有更多内容',
        mask: false,
        icon:'none',
        duration: 1000
      });
    }
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'推荐您一个超级好玩的游戏'
    }
  },
  //获取文章列表数据
  fetchPostsData: function (data) {
    var self = this;
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    };
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    var getPostsRequest = wxRequest.getRequest(Api.getPosts2(data));
    getPostsRequest
      .then(response => {
        if (response.statusCode === 200) {

          // if (response.data.data.length < pageCount) {
          //   self.setData({
          //     isLastPage: true
          //   });
          // }
          if (response.data.data.length>0){
          self.setData({
            floatDisplay: "block",
            postsList: self.data.postsList.concat(response.data.data),

          });
          }
          else{
            self.setData({
              isLastPage: true
            });
          }
          setTimeout(function () {
            wx.hideLoading();
          }, 900);
        }
        else {
          if (response.data.code == "rest_post_invalid_page_number") {
            self.setData({
              isLastPage: true
            });
            wx.showToast({
              title: '没有更多内容',
              mask: false,
              duration: 1500
            });
          }
          else {
            wx.showToast({
              title: response.data.message,
              duration: 1500
            })
          }
        }


      })
      .catch(function (response) {
        if (data.page == 1) {

          self.setData({
            showerror: "block",
            floatDisplay: "none"
          });

        }
        else {
          wx.showModal({
            title: '加载失败',
            content: '加载数据失败,请重试.',
            showCancel: false,
          });
          self.setData({
            page: data.page - 1
          });
        }

      })
      .finally(function (response) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      });
  },
  fetchTopFivePosts: function () {
    var self = this;
    //取置顶的文章
    var getPostsRequest = wxRequest.getRequest(Api.getSwiperPosts2());
    getPostsRequest.then(response => {
      if (response.data.code == '1' && response.data.data.length > 0) {
        self.setData({
          postsShowSwiperList: response.data.data,
          showallDisplay: "block",
          displaySwiper: "block"
        });

      }
      else {
        self.setData({
          displaySwiper: "none",
          displayHeader: "block",
          showallDisplay: "block",

        });

      }

    })
      .catch(function (response) {
        console.log(response);
        self.setData({
          showerror: "block",
          floatDisplay: "none"
        });

      })
      .finally(function () {

      });

  },
  //加载分页
  loadMore: function (e) {

    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 1
      });
      //console.log('当前页' + self.data.page);
      this.fetchPostsData(self.data);
    }
    else {
      wx.showToast({
        title: '没有更多内容',
        mask: false,
        duration: 1000
      });
    }
  },
  // 跳转至查看文章详情
  redictDetail: function(e){
    console.log(e);
    this.postFormID(e);
    if (e.currentTarget.dataset.linktype == 'h5') {
      wx.navigateTo({
        url: '/tradis/h5/h5?url=' + encodeURIComponent(e.currentTarget.dataset.path)
      })
    }
    else if (e.currentTarget.dataset.linktype == 'wxa') {
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.appid,
        path: e.currentTarget.dataset.path,
        success:function(res){

        }
      })
    }
    else if (e.currentTarget.dataset.linktype == 'article') {
      wx.navigateTo({
        url: e.currentTarget.dataset.path
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/ad/detail?id=' +e.currentTarget.id,
      })
    }
  },
  postFormID:function(e){
    wx.request({ 
      // 发送formID
      url: app.globalData.api + '/api.php?s=/User/formid&app_id=' + CID,
      method: 'POST',
      data: {
        openid: wx.getStorageSync('openid'),
        formid: e.detail.formId
      },
      success:function(){

      }
    })
  },
  play:function(){
    wx.navigateTo({
      url: '/tradis/h5/h5?url=' + encodeURIComponent("	https://weapp.taihulv.com/h5/snakebattle/?from=sszb"),
      success: function () {

      }
    })
  },
  moreGame: function () {
    wx.navigateToMiniProgram({
      appId: 'wx5ccf73a5edb50795',
      path: '/pages/ad/index',
      success: function (res) {
        wx.request({
          url: 'https://r.d1fm.com/r.gif?appid=wxbf9a08d37b4ac77d&path=' + encodeURIComponent('/pages/ad/index') + '&openid=' + wx.getStorageSync('openid') + '&action=click&xsl_from=sheshezhengba&xsl_position=moregame',
        })

      }
    })
  },
  collect: function () {
    this.setData({
      issc: false,
    })

  },
  closeSC: function () {
    this.setData({
      issc: true,
    })
  },
  
})