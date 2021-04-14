const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplierName: '',
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
      supplierName: e.detail.value
    })
  },

  clearSearchName() {
    this.setData({
      supplierName: '',
      focus: false,
    })
    this.getSupplierData()
  },

  showPopup() {
    wx.navigateTo({
      url: '../addSupplier/addSupplier'
    })
  },

  toDetail(e) {
    console.log(e.currentTarget.dataset.id)
  },

  getSupplierData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getSupplierList}`,
      data: {
        queryName: that.data.supplierName
      }
    }).then(res => {
      let total = res.total;
      if (!total) {
        that.setData({
          noneData: true,
        })
      }
      that.setData({
        lists: res.data
      })
      wx.stopPullDownRefresh()
    })
  },

  deleteSupplier(e) {
    let that = this;
    wx.showModal({
      'content': '确定要删除该供应商吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          app.requestNoToken({
            url: `${apiAddress.default.delSupplier}`,
            data: {
              ids: e.currentTarget.dataset.id
            }
          }).then(res => {
            wx.showModal({
              'showCancel': false,
              'content': res.message,
              'confirmColor': '#0076FF',
              success: function () {
                that.getSupplierData();
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
    this.getSupplierData()
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