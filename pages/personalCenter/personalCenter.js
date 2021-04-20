// pages/personalCenter/personalCenter.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogIn: false,
    name: '',
    headPic: '',
    isChangePic: false,
    tel: ''
  },

  editeName() {
    wx.navigateTo({
      url: '../editeName/editeName',
    })
  },

  toModifyPwd() {
    wx.navigateTo({
      url: '../modifyPwd/modifyPwd',
    })
  },

  toLogIn() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  logout() {
    vt.removeStorage('userInfo');
    wx.navigateTo({
      url: '../login/login'
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
    if (!vt.isEmpty(vt.getStorage('userInfo'))) {
      this.setData({
        isLogIn: true,
        // headPic: this.data.$state.userInfo.headpicture,
        name: JSON.parse(vt.getStorage('userInfo')).name,
        tel: JSON.parse(vt.getStorage('userInfo')).tel,
      })
      if (!this.data.isChangePic) {
        // this.getPhoneLists()
      }
    } else {
      this.setData({
        isLogIn: false,
        headPic: '../../images/img_default @2x.png',
        name: '未登录',
        tel: '',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.hiddLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.hiddLoading()
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