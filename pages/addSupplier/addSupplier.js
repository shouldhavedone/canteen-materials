// pages/addSupplier/addSupplier.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    focus: true,
    reqData: {
      name: '',
      address: '',
      user: '',
      tel: '',
      id: '',
    }
  },

  deleteNumber() {
    let that = this;
    that.setData({
      reqData: {
        name: '',
        address: '',
        user: '',
        tel: '',
        id: '',
      },
      disabled: false,
    })
    setTimeout(function () {
      that.setData({
        focus: true
      })
    }, 1)
  },

  inputName(e) {
    let val = 'reqData.name'
    this.setData({
      [val]: e.detail.value
    })
    this.isInput()
  },
  inputUser(e) {
    let val = 'reqData.user'
    this.setData({
      [val]: e.detail.value
    })
    this.isInput()
  },
  inputTel(e) {
    let val = 'reqData.tel'
    this.setData({
      [val]: e.detail.value
    })
    this.isInput()
  },
  inputAddr(e) {
    let val = 'reqData.address'
    this.setData({
      [val]: e.detail.value
    })
    this.isInput()
  },

  confirmAdd() {
    let myrega = /^[1][3,4,5,7,8,9,6][0-9]{9}$/
    let myregb = /^400[0-9]{7}/
    let myregc = /^800[0-9]{7}/
    let myregd = /^ 0[0 - 9]{ 2, 3}-[0 - 9]{ 8 }/
    if (myrega.test(this.data.reqData.tel) || myregb.test(this.data.reqData.tel) || myregc.test(this.data.reqData.tel) || myregd.test(this.data.reqData.tel)) {
      this.addSupplier()
    } else {
      app.showLoading('warning', '手机号格式错误')
      app.hiddLoading(1)
    }
  },

  // 判断是否填写内容
  isInput() {
    if (this.data.reqData.name && this.data.reqData.tel && this.data.reqData.user && this.data.reqData.address) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  addSupplier() {
    app.showLoading('', '')
    let that = this
    const params = that.data.reqData
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateSupplier}`,
      data: params,
      method: 'post'
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