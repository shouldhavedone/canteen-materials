// pages/foodRank/foodRank.js
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
    console.log('---------')
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