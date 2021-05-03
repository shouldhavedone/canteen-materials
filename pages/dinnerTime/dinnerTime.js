const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mealTimeName: '',
    checked: true,
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
      mealTimeName: e.detail.value
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: '../addMealTime/addMealTime?id=' + e.currentTarget.dataset.id,
    })
  },

  clearSearchName() {
    this.setData({
      mealTimeName: '',
      focus: false,
    })
    this.getMealTimeData()
  },

  showPopup() {
    wx.navigateTo({
      url: '../addMealTime/addMealTime'
    })
  },

  getMealTimeData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getMealTimeList}`,
      data: {
        queryName: that.data.mealTimeName
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

  deleteMealTime(e) {
    let that = this;
    wx.showModal({
      'content': '确定要删除该用餐时段吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          app.requestNoToken({
            url: `${apiAddress.default.delMealTime}`,
            data: {
              ids: e.currentTarget.dataset.id
            },
            method: 'post'
          }).then(res => {
            wx.showModal({
              'showCancel': false,
              'content': res.message,
              'confirmColor': '#0076FF',
              success: function () {
                that.getMealTimeData();
              }
            })
          })
        }
        
      }
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