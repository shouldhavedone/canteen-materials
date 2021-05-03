// pages/departmentSetup/departmentSetup.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    departName: '',
    checked: true,
    noneData: false,
    lists: [],
    focus: false,
    dialogShow: false,
    reqData: {
      id: '',
      name: '',
      sort: 0,
    },
  },

  showDialog(e) {
    this.resetData();
    const record = e.currentTarget.dataset.item;
    this.setData({
      dialogShow: true,
      'reqData.id': record.id,
      'reqData.name': record.name,
      'reqData.sort': record.sort,
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
        name: '',
        sort: 0,
      }
    })
  },

  inputName(e) {
    this.setData({
      'reqData.name': e.detail.value,
    })
  },

  inputSort(e) {
    this.setData({
      'reqData.sort': e.detail.value,
    })
  },

  modifyDepart() {
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateDepartment}`,
      data: that.data.reqData,
      method: 'post'
    }).then(res => {
      wx.showToast({
        title: res.message,
      })
      this.getDepartmentData()
    })
  },

  contentFocus() {
    this.setData({
      focus: true
    })
  },

  searchName(e) {
    this.setData({
      departName: e.detail.value
    })
  },

  clearSearchName() {
    this.setData({
      departName: '',
      focus: false,
    })
    this.getDepartmentData()
  },

  showPopup() {
    wx.navigateTo({
      url: '../addDepartment/addDepartment'
    })
  },

  getDepartmentData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getDepartmentList}`,
      data: {
        queryName: that.data.departName
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

  deleteDepart(e) {
    let that = this;
    wx.showModal({
      'content': '确定要删除该部门吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          app.requestNoToken({
            url: `${apiAddress.default.delDepartment}`,
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
                that.getDepartmentData();
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
    this.getDepartmentData()
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