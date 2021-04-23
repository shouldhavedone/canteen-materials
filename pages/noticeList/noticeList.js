// pages/noticeList/noticeList.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noneData: false,
    lists: [],
  },

  // toNoticeContent(event) {
  //   wx.navigateTo({
  //     url: '../noticeContent/noticeContent?id=' + event.currentTarget.dataset.item.id,
  //   })
  // },

  getNoticeData() {
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllNotice}`,
    }).then(res => {
      let total = res.total;
      if (!total) {
        that.setData({
          noneData: true,
        })
      } else {
        that.setData({
          noneData: false
        })
      }
      for (let item of res.data) {
        item.createtime = vt.dateFormat(new Date(item.createtime), 'yy-MM-dd hh:mm:ss')
      }
      that.setData({
        lists: res.data
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getNoticeData()
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

  }
})