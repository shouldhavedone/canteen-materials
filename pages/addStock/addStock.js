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
    dialogShow: false,
    reqData: {
      supplier: '',
      material: '',
      material_id: '',
      price: 0,
      total_price: 0,
      count: 0,
    }
  },

  showMaterial(e) {
    this.resetData();
    const record = e.currentTarget.dataset.item;
    this.setData({
      dialogShow: true,
      'reqData.supplier': record.Supplier.name,
      'reqData.material': record.name,
      'reqData.price': record.price,
      'reqData.material_id': record.id,
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
        supplier: '',
        material: '',
        material_id: '',
        price: 0,
        total_price: 0,
        count: '',
      }
    })
  },

  inputCount(e) {
    this.setData({
      'reqData.count': e.detail.value,
      'reqData.total_price': e.detail.value * this.data.reqData.price
    })
  },

  contentFocus() {
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
      url: '../addMaterial/addMaterial'
    })
  },

  clearSearchName() {
    this.setData({
      materialName: '',
      focus: false,
    })
    this.getMaterialData()
  },

  getMaterialData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getMaterialList}`,
      data: {
        queryName: that.data.materialName
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

  deleteMaterial(e) {
    let that = this;
    wx.showModal({
      'content': '确定要删除该物资吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          app.requestNoToken({
            url: `${apiAddress.default.delMaterial}`,
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
                that.getMaterialData();
              }
            })
          })
        }

      }
    })
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  addMaterial() {
    const params = {
      ...this.data.reqData
    }
    console.log(params)

    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.addStock}`,
      data: params,
      method: 'post'
    }).then(res => {
      console.log(res)
    })
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
    this.getMaterialData();
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