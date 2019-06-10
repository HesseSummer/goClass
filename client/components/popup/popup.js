// components/popup/popup.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '内容'
    },
    inv_id: {
      type: String,
      value: ''
    },
    index: {
      type: Number,
    },
    btn_no: {
      type: String,
      value: '取消'
    },
    btn_ok: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*hidePopup: function() {
      this.setData({
        flag: true
      })
    },
    showPopup: function() {
      this.setData({
        flag: false
      })
    },*/
    _error(){
      this.triggerEvent("error")
    },
    _success(){
      this.triggerEvent('success')
    },
    /*setdata(obj) {
      this.setdata(obj)
      console.log(obj)
      console.log(this.data.invitation_id)
      console.log("end popup setdata")
    }*/
  }
})
