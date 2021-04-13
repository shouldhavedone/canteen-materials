// pages/addDepartment/addDepartment.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    sort: 1,
    disabled: false,
    focus: true,
  },

  deleteNumber() {
    this.setData({
      name: '',
      sort: 1,
      disabled: false,
    })
    setTimeout(function () {
      that.setData({
        focus: true
      })
    }, 1)
  },

  inputName(e) {
    this.setData({
      name: e.detail.value
    })
    this.isInput()
  },
  inputSort(e) {
    this.setData({
      sort: e.detail.value
    })
    this.isInput()
  },

  // 判断是否填写内容
  isInput() {
    if (this.data.name && this.data.sort) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  addDepartment() {
    app.showLoading('', '')
    let that = this
    const params = {
      name: that.data.name,
      sort: that.data.sort,
    }
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateDepartment}`,
      data: params
    }).then(res => {
      if (res && res.isSucceed) {
        wx.navigateBack({
          delta: 1
        })
      }
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