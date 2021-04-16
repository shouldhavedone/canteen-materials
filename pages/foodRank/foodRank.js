// pages/foodRank/foodRank.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    foodName: '',
    noneData: false,
    lists: [],
    focus: false,
    foodTypeList: [],
    foodType: '',
  },

  contentFocus(){
    this.setData({
      focus: true
    })
  },

  searchName(e) {
    this.setData({
      foodName: e.detail.value
    })
  },

  clearSearchName() {
    this.setData({
      foodName: '',
      focus: false,
    })
    this.getFoodData()
  },

  showPopup() {
    wx.navigateTo({
      url: '../foodDetail/foodDetail',
    })
  },

  getFoodData() {
    this.setData({
      focus: false,
    })
  },

  getFoodTypeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllFoodType}`,
    }).then(res => {
      if(!that.data.foodType) {
        this.setData({
          foodType: res.data ? res.data[0].id : ''
        })
        this.getFoodByType()
      }
      that.setData({
        foodTypeList: res.data
      })
      wx.stopPullDownRefresh()
    })
  },

  changeType(e) {
    let that = this
    this.setData({
      foodType: this.data.foodTypeList[e.detail].id,
      noneData: false,
    })
    setTimeout(() => {
      that.getFoodByType()
    })
  },

  getFoodByType() {
    app.showLoading('', '')
    let that = this;
    app.requestNoToken({
      url: `${apiAddress.default.getFoodByType}`,
      data: {
        foodType: that.data.foodType,
      }
    }).then(res => {
      let total =  res.total;
      if(!total) {
        that.setData({
          noneData: true,
        })
      }
      that.setData({
        lists: res.data
      })
      wx.stopPullDownRefresh({})
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