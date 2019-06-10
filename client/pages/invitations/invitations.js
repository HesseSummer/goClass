const searchUrl = 'http://www.triple2.xyz:8081/invitation/search';
const app = getApp();

Page({
  data: {
    toptab: ['广场', '我的'],
    currentTab: 0,
    invitations: [],
    myinvs: [],
    reshow: 1,
    empty: 1
  },
  // 提交关键词搜索
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value.keyword;// 关键词
    console.log(formData);

    if (formData == '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '搜索中...',
        icon: 'Loading'
      });

      wx.request({
        url: 'http://www.triple2.xyz:8081/invitation/searchall',
        data: {
          key: formData
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.length == 0) {
            console.log("无结果")
            that.setData({
              reshow: 3
            })
            console.log("reshow:")
            console.log(that.data.reshow)
          } else {
            console.log("有结果")
            /*that.setData({
              invitations: []
            })*/
            that.getKeywords(res.data, "invitations");
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
  // 点击改变标签页
  changetab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    // 强制刷新
    if(e.currentTarget.dataset.id === "0") {
      this.showall()
    }
  },
  // 滑动改变标签页
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    // 强制刷新
    if(e.detail.current === 0){
      this.showall()
    }
  },
  // 点击“全部”
  showall: function () {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      icon: 'Loading'
    })
    wx.request({
      url: 'http://www.triple2.xyz:8081/invitation/findall',
      success: function (res) {
        console.log(res.data)
        that.getKeywords(res.data, "invitations")
        that.setData({
          reshow: 1
        })
        wx.hideLoading();
      }
    })

  },
  /*发送到invitations并改变keywords*/
  getKeywords: function (resdata, todo) {
    let cpy_invs = resdata && resdata.map(item => {
      item.key_words = item.key_words && item.key_words.split(',')
      return item
    })
    this.setData({
      [todo]: cpy_invs
    })
  },
  // 下拉刷新不知道做好了没呢
  scroll(event) {
    console.log(event)
  },
  reactBottom() {
    console.log('触底-加载更多')
  },
  getmyinvs: function(){
    let that = this;
    wx.showLoading({
      title: '加载中...',
      icon: 'Loading'
    })
    wx.request({
      url: 'http://www.triple2.xyz:8081/invitation/userinvitation',
      
      /*data: {
        user_id: app.globalData.user_id
      },*/
      // 先强制发送user_id为2，因为app.globalData.user_id还没有呢
      data: {
        user_id: 1
      },
      success(res) {
        console.log(res.data)
        if(res.data.length === 0){
          console.log("该用户还没有发送过自习邀约")
          that.setData({
            empty: 1
          })
          //this.getKeywords(res.data, "myinvs")
          wx.hideLoading()
        }else {
          
          that.getKeywords(res.data, "myinvs")
          that.setData({
            empty: 0
          })
          wx.hideLoading()
        }
        
      }
    })
  },
  // 后端有问题？响应头不对啊
  deleteinv: function(e) {
    let that = this;
    wx.request({
      url: 'http://www.triple2.xyz:8081/invitation/delete',
      data: {
        invitation_id: e.currentTarget.dataset.id
      },
      success: function(res){
        console.log("删除inviID为" + e.currentTarget.dataset.id + "index为" + e.currentTarget.dataset.index + "的元素")
        let c_myinvs = that.data.myinvs;
        console.log("原来")
        console.log(c_myinvs)
        // 不知道为什么没有效果
        c_myinvs.splice(e.currentTarget.dataset.index, 1);
        console.log("splice后")
        console.log(c_myinvs)
        that.setData({
          myinvs: c_myinvs
        })
        console.log("setData后")
        console.log(that.data.myinvs)
        console.log("删除成功")

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
      that.showall();
    
    
      that.getmyinvs();
    
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
    let that = this;
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