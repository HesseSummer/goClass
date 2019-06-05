const searchUrl ='http://www.triple2.xyz:8081/invitation/search';
let mock = [{ user_name: "祈年大魔王", sex: "男", major: "计算机", illustration: "是兄弟就来砍我", keywords: ["约自习", "打游戏"]},
            { user_name: "开酒楼的十六公子", sex: "男", major: "计算机", illustration: "是兄弟就来砍我", keywords: ["装B怪", "雷电法王"]}];
const app = getApp()

Page({
  data: {
    toptab: ['广场', '我的'],
    currentTab: 0,
    invitations: [],
    reshow: 1
  },

  formSubmit: function(e) {
    var that=this;
    var formData = e.detail.value.keyword;
    console.log(formData);

    if(formData == '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '搜索中...',
        icon: 'Loading'
      })

      wx.request({
        url: searchUrl,
        data: {
          key_words: formData
        },
        success: function(res) {
          console.log(res.data)
          if(res.data.length == 0){
            console.log("无结果")
            that.setData({
              reshow: 3
            })
            console.log("reshow:")
            console.log(that.data.reshow)
          }else {
            console.log("有结果")
            /*that.setData({
              invitations: []
            })*/
            that.getDeparts(res.data)
            that.setData({
              reshow: 2
            })
            console.log("reshow:")
            console.log(that.data.reshow)
          }
          wx.hideLoading();
        }
      })
    }
  },
  changetab: function(e) {
    this.setData({
        currentTab: e.currentTarget.dataset.id
    })
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  showall: function(){
    let that = this;
    wx.showLoading({
      title: '加载中...',
      icon: 'Loading'
    })
    wx.request({
      url: 'http://www.triple2.xyz:8081/invitation/findall',
      success: function(res){
        console.log(res.data)
        that.getDeparts(res.data)
        that.setData({
          reshow: 1
        })
        wx.hideLoading();
      }
    })
    
  },
  /*获取user_name、sex、major、illustration、key_words*/
  getDeparts: function(resdata) {
    let that=this;
    that.setData({
      invitations: []
    })
    let invs = that.data.invitations; // 这一步

    for(let item of resdata) {
      let user_name = item.user_name;
      let sex = item.sex;
      let major = item.major;
      let illustration = item.illustration;
      let keywords = [];
      keywords = item.key_words.split(',');
      let inv = {
        user_name,
        sex,
        major,
        illustration,
        keywords
      }
      invs.push(inv);// 这一步
    }
    that.setData({
      invitations: invs
    })// 这一步
    console.log("invitations")
    console.log(that.data.invitations)
  },
  scroll(event) {
    console.log(event)
  },
  reactBottom() {
    console.log('触底-加载更多')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.showall();
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    console.log(that.data.winHeight)
    console.log(that.data.winWidth)
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    let tbodyHeight = app.globalData.windowHeight;
    that.setData({
      tbodyHeight: tbodyHeight.toFixed(0)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.reshow)
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
    var that = this;
    that.setData({
      currentTab: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
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

  }
});