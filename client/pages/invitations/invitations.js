const searchUrl = 'http://www.triple2.xyz:8081/invitation/search';
const app = getApp();

Page({
  data: {
    toptab: ['广场', '我的'],
    currentTab: 0,
    invitations: [],
    myinvs: [],
    reshow: 1,
    empty: 1,

    addHidden: true,
    editHidden: true,
    lookHidden: true,

    user_name: '',
    major: '',
    contact_information: '',
    key1: '',
    key2: '',
    key3: '',
    illustration: '',
    inputContent: '',
    opposite_sex: 0,
    sex: 0,
    sex_check: [{
        label: '男',
        value: '男'
      },
      {
        label: '女',
        value: '女'
      }
    ]

  },
  // 提交关键词搜索
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value.keyword; // 关键词
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
        success: function(res) {
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
  changetab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    // 强制刷新
    if (e.currentTarget.dataset.id === "0") {
      this.showall()
    }
  },
  // 滑动改变标签页
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    // 强制刷新
    if (e.detail.current === 0) {
      this.showall()
    }
  },
  // 点击“全部”
  showall: function() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      icon: 'Loading'
    })
    wx.request({
      url: 'http://www.triple2.xyz:8081/invitation/findall',
      success: function(res) {
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
  getKeywords: function(resdata, todo) {
    let cpy_invs = resdata && resdata.map(item => {
      console.log('item.key_words')
      console.log(item.key_words)
      
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
  getmyinvs: function() {
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
        user_id: app.globalData.user_id
      },
      success(res) {
        console.log(res.data)
        if (res.data.length === 0) {
          console.log("该用户还没有发送过自习邀约")
          that.setData({
            empty: 1
          })
          //this.getKeywords(res.data, "myinvs")
          wx.hideLoading()
        } else {

          that.getKeywords(res.data, "myinvs")
          that.setData({
            empty: 0
          })
          wx.hideLoading()
        }

      }
    })
  },
  deleteinv: function(e) {
    let that = this;
    console.log('点击了删除')
    wx.showModal({
      title: '删除邀约',
      content: '确定删除该邀约？',
      showCancel: true,
      cancelColor: '#00c777',
      confirmColor: 'gray',
      success: function(res) {
        if (res.cancel) {

        } else {
          that._deleteinv(e.currentTarget.dataset.id,
            e.currentTarget.dataset.index)
        }
      },
    })
  },
  _error() {
    let that = this;
    console.log('点击了取消')

  },
  _success() {
    let that = this;
    console.log('点击了确定')
    // 这里的函数还没完善
    that._deleteinv();

  },
  _deleteinv: function(invitation_id, index) {
    let that = this;
    wx.request({
      url: 'http://www.triple2.xyz:8081/invitation/delete',
      data: {
        invitation_id: invitation_id
      },
      success: function(res) {
        console.log("删除inviID为" + invitation_id + "index为" + index + "的元素")
        let c_myinvs = that.data.myinvs;
        console.log("原来")
        console.log(c_myinvs)

        c_myinvs.splice(index, 1);
        console.log("splice后")
        console.log(c_myinvs)
        that.setData({
          myinvs: c_myinvs
        })
        console.log("setData后")
        console.log(that.data.myinvs)
        wx.showToast({
          title: '删除成功',
          duration: 2000,
          icon: 'success'
        })

      }
    })
  },
  // 查看
  lookInv(e) {
    console.log('点击了查看')
    let sex = (e.currentTarget.dataset.sex === '男') ? (sex = 0) : (sex = 1);
    let osex = (e.currentTarget.dataset.osex === '男') ? (osex = 0) : (osex = 1);
    this.setData({
      illustration: e.currentTarget.dataset.illu,
      key1: e.currentTarget.dataset.keywords[0],
      key2: e.currentTarget.dataset.keywords[1],
      key3: e.currentTarget.dataset.keywords[2],
      user_name: e.currentTarget.dataset.uname,
      major: e.currentTarget.dataset.major,
      contact_information: e.currentTarget.dataset.contact,
      sex: sex,
      opposite_sex: osex,
      invitation_id: e.currentTarget.dataset.id
    })
    this.setData({
      lookHidden: false
    })
  },
  // 关闭
  closeInv(){
    console.log('点击了关闭')
    this.setData({
      lookHidden: true
    })
    //this.clearInputEvent();
  },
  // 编辑
  editinv(e) {
    
    let sex = (e.currentTarget.dataset.sex === '男') ? (sex=0) : (sex=1);
    let osex = (e.currentTarget.dataset.osex === '男') ? (osex = 0) : (osex = 1);
    this.setData({
      illustration: e.currentTarget.dataset.illu,
      key1: e.currentTarget.dataset.keywords[0],
      key2: e.currentTarget.dataset.keywords[1],
      key3: e.currentTarget.dataset.keywords[2],
      user_name: e.currentTarget.dataset.uname,
      major: e.currentTarget.dataset.major,
      contact_information: e.currentTarget.dataset.contact,
      sex: sex,
      opposite_sex: osex,
      invitation_id: e.currentTarget.dataset.id
    })
    this.setData({
      editHidden: false
    })
  },
  // 编辑邀约
  rerelease(invitation_id){
    if (!this.data.illustration ||
      !this.data.user_name ||
      !this.data.major ||
      !this.data.contact_information) {
      console.log('if里')
      wx.showToast({
        title: '除关键词外，其余不能为空',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'http://www.triple2.xyz:8081/invitation/updata',
        data: {
          invitation_id: this.data.invitation_id,
          user_name: this.data.user_name,
          sex: this.data.sex,
          major: this.data.major,
          opposite_sex: this.data.opposite_sex,
          illustration: this.data.illustration,
          key_words: this.joinkeywords(),
          contact_information: this.data.contact_information
        },
        success: (res) => {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
          this.setData({
            editHidden: true
          });
          this.clearInputEvent();
          this.showall();
          this.getmyinvs();
        }
      })

    }
  },
  // 添加邀约
  myadd: function () {
    this.setData({
      addHidden: false
    });
  },
  add_yes: function(event) {
    /*console.log("姓名：" + this.data.user_name + "专业：" + this.data.user_major + "联系方式：" + user_phoneNumber);*/
    console.log("点了发布");
    this.release();
  },
  add_no: function() {
    console.log("点了取消");
    this.setData({
      addHidden: true
    });
  },
  

  get_words: function(event) {
    this.setData({
      illustration: event.detail.value
    })
  },
  get_user_name: function(event) {
    this.setData({
      user_name: event.detail.value
    })
  },
  get_major: function(event) {
    this.setData({
      major: event.detail.value
    })
  },
  get_contact: function(event) {
    this.setData({
      contact_information: event.detail.value
    })
  },
  get_key1: function(event) {
    this.setData({
      key1: event.detail.value
    })
  },
  get_key2: function(event) {
    this.setData({
      key2: event.detail.value
    })
  },
  get_key3: function(event) {
    this.setData({
      key3: event.detail.value
    })
  },
  check_opposite_sex: function(event) {
    var that = this;
    var sex = event.currentTarget.dataset.index
    that.setData({
      opposite_sex: sex
    })
  },
  check_sex: function(event) {
    var that = this;
    var sex = event.currentTarget.dataset.index
    that.setData({
      sex: sex
    })
  },

  //清除所填数据
  clearInputEvent: function(res) {
    this.setData({
      illustration: '',
      key1:'',
      key2: '',
      key3: '',
      user_name: '',
      major: '',
      contact_information: '',
      sex: 0,
      opposite_sex: 0
    })
  },
  joinkeywords(){
    let key_words = [];
    if (this.data.key1) {
      key_words.push(this.data.key1)
    }
    if (this.data.key2) {
      key_words.push(this.data.key2)
    }
    if (this.data.key3) {
      key_words.push(this.data.key3)
    }
    key_words = key_words.join(',');
    return key_words;
  },
  //提交信息到后台
  release: function() {
    if (!this.data.illustration ||
      !this.data.user_name ||
      !this.data.major ||
      !this.data.contact_information) {
        console.log('if里')
        wx.showToast({
          title: '除关键词外，其余不能为空',
          icon: 'none'
        })
    } else {
      console.log('else里')
      let key_words = this.joinkeywords();

      let sex = this.data.sex ? '女' : '男'
      let opposite_sex = this.data.opposite_sex ? '女' : '男'
      wx.request({
        url: 'http://www.triple2.xyz:8081/invitation/setinvitation',
        data: {
          user_id: app.globalData.user_id,
          user_name: this.data.user_name,
          sex,
          major: this.data.major,
          opposite_sex,
          illustration: this.data.illustration,
          key_words,
          contact_information: this.data.contact_information
        },
        success: () => {
          wx.showToast({
            title: '发布成功',
            icon: 'success'
          });
          this.setData({
            addHidden: true
          });
          this.clearInputEvent();
          this.showall();
          this.getmyinvs();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
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
  onReady: function() {
    let that = this;
    let tbodyHeight = app.globalData.windowHeight;
    that.setData({
      tbodyHeight: tbodyHeight.toFixed(0)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(this.data.reshow)
    this.showall();
    this.getmyinvs();
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
    var that = this;
    that.setData({
      currentTab: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
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
});