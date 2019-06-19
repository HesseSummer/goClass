//app.js
App({
  onLaunch: function () {
    let that = this;

    // 检查登录态
    that.checkLoginStatus();

    // 获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowHeight = res.windowHeight
        console.log(that.globalData.windowHeight)
      }
    })
  },

  /*将登录状态设置到globalData*/
  checkLoginStatus() {
    let that = this;
    let loginFlag = wx.getStorageSync('loginFlag')
    console.log(loginFlag)
    if (loginFlag) {
      wx.checkSession({
        success: () => {
          console.log('登录缓存--未过期')

          that.globalData.logined = true
          let user_id = wx.getStorageSync('user_id');
          let user_name = wx.getStorageSync('user_name');
          if (user_id) {
            that.globalData.user_id = user_id;
            that.globalData.user_name = user_name;
          } else {
            console.log('登录缓存--信息缺失');
          }
        },
        fail: () => {
          console.log('登录缓存--过期')
          that.globalData.logined = false
        }
      })
    } 
    else {
      console.log('登录缓存--无')
      that.globalData.logined = false
    }
  },
  globalData: {
    userInfo: null,
    windowHeight: null,
    logined: false,
    user_id: '',
    user_name: '',
    rawInfo: {},
  }
})