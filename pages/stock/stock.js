// pages/materialSetup/materialSetup.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    materialName: '',
    checked: true,
    show: false,
    noneData: false,
    lists: [],
    focus: false,
  },

  contentFocus(){
    this.setData({
      focus: true
    })
  },

  searchName(e) {
    this.setData({
      materialName: e.detail.value
    })
  },
  showPopup() {
    wx.navigateTo({
      url: '../addStock/addStock'
    })
  },

  clearSearchName() {
    this.setData({
      materialName: '',
      focus: false,
    })
    this.getOrderData()
  },

  getOrderData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getStockList}`,
      // data: {
      //   queryName: that.data.materialName
      // }
    }).then(res => {
      let total = res.total;
      if (!total) {
        that.setData({
          noneData: true,
        })
      } else {
        that.setData({
          noneData: false,
        })
      }
      that.setData({
        lists: res.data,
      })
      wx.stopPullDownRefresh()
    })
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
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
    this.getOrderData();
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