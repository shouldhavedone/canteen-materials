// pages/dailyMenu/dailyMenu.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    typeActive: 0,
    foodTypeList: [],
    foodType: '',
    noneData: false,
    mealtimeList: [],
    mealtime: '',

  },

  onClickLeft() {
    wx.showToast({
      title: '前一天',
      icon: 'none'
    });
  },

  onClickRight() {
    wx.showToast({
      title: '后一天',
      icon: 'none'
    });
  },

  getFoodTypeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllFoodType}`,
    }).then(res => {
      if(!that.data.foodType) {
        that.setData({
          foodType: res.data ? res.data[0].id : ''
        })
      }
      that.setData({
        foodTypeList: res.data
      })
      wx.stopPullDownRefresh()
    })
  },

  getMealTimeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllMealTime}`,
    }).then(res => {
      if(!that.data.mealtime) {
        that.setData({
          mealtime: res.data ? res.data[0].id : ''
        })
      }
      that.setData({
        mealtimeList: res.data
      })
    })
  },

  changeType(e) {
    this.setData({
      foodType: this.data.foodTypeList[e.detail].id,
      noneData: false,
    })
    // setTimeout(() => {
    //   that.getFoodByType()
    // })
  },

  changeMealtime(e) {
    this.setData({
      mealtime: e.currentTarget.dataset.item,
      noneData: false,
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
    this.getFoodTypeData()
    this.getMealTimeData()
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