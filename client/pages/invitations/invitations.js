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

    lookInv: {
      user_name: '',
      major: '',
      contact_information: '',
      key1: '',
      key2: '',
      key3: '',
      illustration: '',
      inputContent: '',

      sex: 0,
      opposite_sex: 0,

    },

    addInv: {
      user_name: '',
      major: '',
      contact_information: '',
      key1: '',
      key2: '',
      key3: '',
      illustration: '',
      inputContent: '',

      sex: 0,
      opposite_sex: 0,
    },

    upInv: {
      illustration: '',
      key1: '',
      key2: '',
      key3: '',
      user_name: '',
      major: '',
      contact_information: '',
      sex: 0,
      opposite_sex:0,
      invitation_id: ''
    }

  },
  // 提交关键词搜索
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value.keyword; // 关键词
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
          if (res.data.length == 0) {
            that.setData({
              reshow: 3
            })
          } else {
            that.getKeywords(res.data, "invitations");
            that.setData({
              reshow: 2
            })
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
      console.log('广场页面强制刷新：')
      console.log('广场的所有邀约是：')
      console.log(this.data.invitations)
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
      item.key_words = item.key_words && item.key_words.split(',')
      return item
    })
    this.setData({
      [todo]: cpy_invs
    }) 
    if(todo === 'invitations'){
      console.log('广场所有邀约是')
      console.log(this.data.invitations)
    }
    else{
      console.log('我的所有邀约是')
      console.log(this.data.myinvs)
    }
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
      data: {
        user_id: app.globalData.user_id
      },
      success(res) {
        if (res.data.length === 0) {
          console.log("该用户还没有发送过自习邀约")
          that.setData({
            empty: 1
          })
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
  },
  _success() {
    let that = this;
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
        let c_myinvs = that.data.myinvs;
        c_myinvs.splice(index, 1);
        that.setData({
          myinvs: c_myinvs
        })
        wx.showToast({
          title: '删除成功',
          duration: 2000,
          icon: 'success'
        })

      }
    })
  },
  // 查看
  runlookInv(e) {
    let sex = (e.currentTarget.dataset.sex === '男') ? 0 : 1;
    let osex = (e.currentTarget.dataset.osex === '男') ? 0 : 1;
    this.setData({
      lookInv: {
        illustration: e.currentTarget.dataset.illu,
        key1: e.currentTarget.dataset.keywords[0],
        key2: e.currentTarget.dataset.keywords[1],
        key3: e.currentTarget.dataset.keywords[2],
        user_name: e.currentTarget.dataset.uname,
        major: e.currentTarget.dataset.major,
        contact_information: e.currentTarget.dataset.contact,
        sex,
        opposite_sex: osex,
      }
    })
    this.setData({
      lookHidden: false
    })
  },
  // 关闭
  closeInv() {
    this.setData({
      lookHidden: true
    })
    //this.clearInputEvent();
  },
  // 编辑
  editinv(e) {
    let sex = e.currentTarget.dataset.sex;
    sex = ( sex === '男') ? 0 : 1;
    let osex = e.currentTarget.dataset.osex;
    osex = (osex === '男') ? 0: 1
    this.setData({
      upInv: {
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
      }
    })
    console.log("更新--待更新的该条原邀约是：")
    console.log(this.data.upInv)
    this.setData({
      editHidden: false
    })
  },
  // 编辑邀约
  edit_no(){
    this.setData({
      editHidden: true
    })
  },
  rerelease(invitation_id) {
    if (!this.data.upInv.illustration ||
      !this.data.upInv.user_name ||
      !this.data.upInv.major ||
      !this.data.upInv.contact_information) {
      wx.showToast({
        title: '除关键词外，其余不能为空',
        icon: 'none'
      })
    } else {
      let sex = (this.data.upInv.sex==0)?'男':'女';
      let opposite_sex = (this.data.upInv.opposite_sex) ? '男' :'女';
      wx.request({
        url: 'http://www.triple2.xyz:8081/invitation/updata',
        data: {
          invitation_id: this.data.upInv.invitation_id,
          user_name: this.data.upInv.user_name,
          sex,
          major: this.data.upInv.major,
          opposite_sex,
          illustration: this.data.upInv.illustration,
          key_words: this.joinkeywords(this.data.upInv),
          contact_information: this.data.upInv.contact_information
        },
        success: (res) => {
          console.log("更新--更新成功后我的所有邀约是")
          this.getmyinvs();
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
          this.setData({
            editHidden: true
          });
        }
      })
    }
  },
  // 添加邀约
  myadd: function() {

    this.setData({
      addHidden: false
    });
  },
  add_yes: function(event) {
    this.release();
  },
  add_no: function() {
    this.setData({
      addHidden: true
    });
  },


  get_words: function(event) {
    let key = 'addInv.illustration'
    this.setData({
      [key]: event.detail.value
    })
  },
  _get_words: function (event) {
    let key = 'upInv.illustration'
    this.setData({
      [key]: event.detail.value
    })
  },

  get_key1: function(event) {
    let key = 'addInv.key1'
    this.setData({
      [key]: event.detail.value
    })
  },
  _get_key1: function (event) {
    let key = 'upInv.key1'
    this.setData({
      [key]: event.detail.value
    })
  },

  get_key2: function(event) {
    let key = 'addInv.key2'
    this.setData({
      [key]: event.detail.value
    })
  },
  _get_key2: function (event) {
    let key = 'upInv.key2'
    this.setData({
      [key]: event.detail.value
    })
  },

  get_key3: function(event) {
    let key = 'addInv.key3'
    this.setData({
      [key]: event.detail.value
    })
  },
  _get_key3: function (event) {
    let key = 'upInv.key3'
    this.setData({
      [key]: event.detail.value
    })
  },

  get_user_name: function(event) {
    let key = 'addInv.user_name'
    this.setData({
      [key]: event.detail.value
    })
  },
  _get_user_name: function (event) {
    let key = 'upInv.user_name'
    this.setData({
      [key]: event.detail.value
    })
  },

  get_major: function(event) {
    let key = 'addInv.major'
    this.setData({
      [key]: event.detail.value
    })
  },

  _get_major: function (event) {
    let key = 'upInv.major'
    this.setData({
      [key]: event.detail.value
    })
  },

  get_contact: function(event) {
    let key = 'addInv.contact_information'
    this.setData({
      [key]: event.detail.value
    })
  },
  _get_contact: function (event) {
    let key = 'upInv.contact_information'
    this.setData({
      [key]: event.detail.value
    })
  },

  check_opposite_sex: function(event) {
    var that = this;
    let key = 'addInv.opposite_sex'
    that.setData({
      [key]: event.detail.value
    })
  },
  _check_opposite_sex: function (event) {
    var that = this;
    var sex = event.detail.value
    let key = 'upInv.opposite_sex'
    that.setData({
      [key]: sex
    })
  },

  check_sex: function(event) {
    var that = this; 
    let key = 'addInv.sex'
    that.setData({
      [key]: event.detail.value
    })
  },
  _check_sex: function (event) {
    var that = this;
    var sex = event.detail.value
    let key = 'upInv.sex'
    that.setData({
      [key]: sex
    })
  },

  //清除所填数据
  clearInputEvent: function() {
    this.setData({
      addInv: {
        illustration: '',
        key1: '',
        key2: '',
        key3: '',
        user_name: '',
        major: '',
        contact_information: '',
        sex: 0,
        opposite_sex: 0,
      }
    })
  },
  joinkeywords(obj) {
    let key_words = [];
    if (obj.key1) {
      key_words.push(obj.key1)
    }
    if (obj.key2) {
      key_words.push(obj.key2)
    }
    if (obj.key3) {
      key_words.push(obj.key3)
    }
    key_words = key_words.join(',');
    return key_words;
  },
  //提交信息到后台
  release: function() {
    if (!this.data.addInv.illustration ||
      !this.data.addInv.user_name ||
      !this.data.addInv.major ||
      !this.data.addInv.contact_information) {
      wx.showToast({
        title: '除关键词外，其余不能为空',
        icon: 'none'
      })
    } else {
      let key_words = this.joinkeywords(this.data.addInv);

      let sex = this.data.addInv.sex ? '女' : '男'

      let opposite_sex = this.data.addInv.opposite_sex
      opposite_sex = (opposite_sex == 0) ? '男' : '女'


      wx.request({
        url: 'http://www.triple2.xyz:8081/invitation/setinvitation',
        data: {
          user_id: app.globalData.user_id,
          user_name: this.data.addInv.user_name,
          sex,
          major: this.data.addInv.major,
          opposite_sex,
          illustration: this.data.addInv.illustration,
          key_words,
          contact_information: this.data.addInv.contact_information
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
          console.log('发布后：')
          this.showall();
          
          this.getmyinvs();
          
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  checkLogin() {
    if (!app.globalData.logined) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
      console.log('未登录，跳转页面')
    }
  },
  onLoad: function(options) {
    var that = this;
    // 检查登录与否
    that.checkLogin();
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
    console.log('onshow时：')
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