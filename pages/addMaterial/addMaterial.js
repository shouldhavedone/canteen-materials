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
    hiddenAddDetail: false,
    showAddrPciker: false,
    supplierList: [],
    reqData: {
      id: '',
      name: '',
      price: 0,
      supplier_id: '',
      supplier: '',
    }
  },

  chooseDepart: function () {
    this.setData({
      showAddrPciker: true,
      hiddenAddDetail: true
    })
  },

  supplierCancel: function () {
    this.setData({
      showAddrPciker: false
    })
    let that = this
    setTimeout(function () {
      that.setData({
        hiddenAddDetail: false
      })
    }, 350)
    this.isInput()
  },

  deleteNumber() {
    let that = this;
    that.setData({
      reqData: {
        id: '',
        name: '',
        price: 0,
        supplier_id: '',
        supplier: '',
      },
      disabled: false,
    })
    setTimeout(function () {
      this.setData({
        focus: true
      })
    }, 1)
  },

  inputName(e) {
    let str = "reqData.name"
    this.setData({
      [str]: e.detail.value
    })
    this.isInput()
  },

  inputPrice(e) {
    let str = "reqData.price"
    this.setData({
      [str]: e.detail.value
    })
    this.isInput()
  },

  supplierSure: function (e) {
    let choosedData = e.detail.choosedData
    let str = "reqData.supplier"
    this.setData({
      [str]: choosedData[0].name,
      'reqData.supplier_id': choosedData[0].id,
      showAddrPciker: false
    })
    this.isInput()
  },

  // 判断是否填写内容
  isInput() {
    if (this.data.reqData.name && this.data.reqData.price && this.data.reqData.name) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  addMaterial() {
    app.showLoading('', '')
    let that = this
    const params = that.data.reqData
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateMaterial}`,
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

  getSupplierData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllSupplier}`,
    }).then(res => {
      that.setData({
        supplierList: res.data
      })
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
    this.getSupplierData();
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