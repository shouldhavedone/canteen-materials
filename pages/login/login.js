// pages/login/login.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    errTip: '',
  },

  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  getPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  toRegister() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  // 登录接口
  logInInterFace() {
    app.requestNoToken({
      url: `${apiAddress.default.getUserInfo}`,
      data: {
        name: this.data.name,
        password: this.data.password,
      },
    }).then(res => {
      vt.setStorage('userInfo', JSON.stringify(res.data))
      wx.navigateBack({
        delta: 1
      })
    })
  },

  submit() {
    if (!this.data.name) {
      this.setData({
        errTip: '请输入用户名'
      })
      return;
    }

    if (!this.data.password) {
      this.setData({
        errTip: '请输入用户密码'
      })
      return;
    }
    this.logInInterFace()
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