// pages/materialSetup/materialSetup.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodName: '',
    checked: true,
    show: false,
    noneData: false,
    lists: [],
    focus: false,
    dialogShow: false,
    count: 0,
    reqData: {
      food_id: '',
      count: 0,
    },
    time: '',
  },

  showFood(e) {
    this.resetData();
    const record = e.currentTarget.dataset.item;
    console.log(record)
    this.setData({
      dialogShow: true,
      'reqData.food_id': record.id
    })
  },

  dialogOnClose() {
    this.setData({
      dialogShow: false,
    })
  },

  resetData() {
    this.setData({
      reqData: {
        id: '',
        food_id: '',
        count: 0,
      }
    })
  },

  inputCount(e) {
    this.setData({
      'reqData.count': e.detail.value,
    })
  },

  contentFocus() {
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

  getFoodData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getFoodList}`,
      data: {
        queryName: that.data.foodName
      }
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
      that.setData({
        lists: res.data
      })
      wx.stopPullDownRefresh()
    })
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  addFood() {
    const params = {
      ...this.data.reqData,
      time: this.data.time,
    }
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.addDailyMenu}`,
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
    this.setData({
      time: options.time
    })
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
    this.getFoodData();
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