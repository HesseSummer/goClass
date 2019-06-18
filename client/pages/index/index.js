let app = getApp();
let util = require('../../utils/util.js');

// pages/index/index.js
const urltmp = 'http://www.triple2.xyz:8081/login/wxlogin';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    windowHeight: app.globalData.windowHeight
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   /* let that = this;
    wx.getSetting({
      success: function(res) {
        // 如果用户已经授权过，此时global里已存有user_id，只需GET到用户的所有信息
        if (res.authSetting['scope.userInfo'] && app.globalData.user_id) {
          console.log("已得到user_id，user_id为" + app.globalData.user_id);
          wx.switchTab({
            url: '/pages/freeroom/freeroom',
          })
        }
        //跳转
        else {
          console.log("尚未得到user_id")
        }
      }
    })*/
  },
  bindGetUserInfo: function(e) {
    wx.showLoading({
      title: '加载中...',
    })
    if (e.detail.userInfo) {
      let that = this;
      /*user_name*/
      console.log("nickName: " + e.detail.userInfo.nickName);
      /*user_id*/
      wx.login({
        success: res => {
          console.log("用户的code: " + res.code)
          wx.request({
            url: urltmp,
            data: util.json2Form({
              code: res.code,
              user_name: e.detail.userInfo.nickName
            }),
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              console.log("success")
              if(res.statusCode == 200){
                console.log(res)
                app.globalData.user_id = res.data.user_id;
                app.globalData.user_name = e.detail.userInfo.nickName;
                wx.setStorageSync('user_id', res.data.user_id);
                wx.setStorageSync('user_name', e.detail.userInfo.nickName);
                wx.setStorageSync('loginFlag', res.data.skey)
                let loginFlag = wx.getStorageSync('loginFlag')
                console.log(loginFlag)
                app.globalData.logined = true;

                console.log("用户的user_id: ");
                console.log(app.globalData.user_id)
                wx.switchTab({
                  url: '/pages/invitations/invitations',
                })
                wx.hideLoading();
              }
              
            }
          })
        }
      })
    } else { // 用户拒绝授权
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了返回授权')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})