const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodTypeName: '',
    checked: true,
    noneData: false,
    lists: [],
    focus: false,
    dialogShow: false,
    reqData: {
      id: '',
      name: '',
    }
  },

  contentFocus() {
    this.setData({
      focus: true
    })
  },

  searchName(e) {
    this.setData({
      foodTypeName: e.detail.value
    })
  },

  clearSearchName() {
    this.setData({
      foodTypeName: '',
      focus: false,
    })
    this.getFoodTypeData()
  },

  showPopup() {
    this.setData({
      dialogShow: true,
    })
  },

  dialogOnClose() {
    this.setData({
      dialogShow: false,
    })
  },

  toDetail(e) {
    console.log(e.currentTarget.dataset.id)
  },

  inputName(e) {
    let str = "reqData.name"
    this.setData({
      [str]: e.detail.value
    })
  },

  getFoodTypeData() {
    this.setData({
      focus: false,
    })
    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getFoodTypeList}`,
      data: {
        queryName: that.data.foodTypeName
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

  addFoodType() {
    app.showLoading('', '')
    let that = this
    const params = that.data.reqData
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateFoodType}`,
      data: params,
      method: 'post'
    }).then(res => {
      this.setData({
        dialogShow: false,
        reqData: {
          id: '',
          name: ''
        }
      })
      this.getFoodTypeData()  
      wx.stopPullDownRefresh()
    })
  },

  deleteFoodType(e) {
    let that = this;
    wx.showModal({
      'content': '确定要删除该类型吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          app.requestNoToken({
            url: `${apiAddress.default.delFoodType}`,
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
                that.getFoodTypeData();
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