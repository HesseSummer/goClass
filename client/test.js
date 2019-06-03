// pages/freeroom/freeroom.js
var util = require('../../utils/util.js');
var touchDot = 0; //触摸时的原点
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = ""; // 记录/清理时间记录
var kecheng = 0;
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        roomli: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
        colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
        b1list: ['一教', '三教', '四教'],
        b2list: ['A座', 'B座', 'C座'],
        b3list: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'],
        courseli: [[1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0]]
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function () {
            var date = util.formatDate(new Date());
            this.setData({
                date: date
            });
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {
            /**调用函数时，传入new Date()参数，返回值是日期和时间
             var time = util.formatTime(new Date());
             // 再通过setData更改Page()里面的data，动态更新页面的数据
             this.setData({
      time: time
    });**/
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

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

        },
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        },
        changeContext: function (e) {
            console.log(e.detail.value);
            var that = this;
            that.setData({
                details: e.detail.value
            });
        }
    })