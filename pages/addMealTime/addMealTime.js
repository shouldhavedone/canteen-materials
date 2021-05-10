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
    isEdit: false,
    reqData: {
      id: '',
      name: '',
      starttime: '12:00',
      endtime: '12:00',
      count: 0,
    },
    minHour: 0,
    maxHour: 23,
    starttimeShow: false,
    endtimeShow: false,
  },

  starttimeHShow() {
    this.setData({ starttimeShow: true });
  },

  endtimeHShow() {
    this.setData({ endtimeShow: true });
  },

  starttimeClose() {
    this.setData({ starttimeShow: false });
  },

  endtimeClose() {
    this.setData({ endtimeShow: false });
  },

  deleteNumber() {
    let that = this;
    that.setData({
      reqData: {
        name: '',
        starttime: '',
        endtime: '',
        count: 0,
        id: '',
      },
      disabled: false,
    })
    setTimeout(function () {
      that.setData({
        focus: true
      })
    }, 1)
  },

  inputName(e) {
    let val = 'reqData.name'
    this.setData({
      [val]: e.detail.value
    })
    this.isInput()
  },
  inputCount(e) {
    let val = 'reqData.count'
    this.setData({
      [val]: e.detail.value
    })
    this.isInput()
  },
  inputStarttime(e) {
    let val = 'reqData.starttime'
    this.setData({
      [val]: e.detail
    })
    this.isInput()
  },
  inputEndTime(e) {
    let val = 'reqData.endtime'
    this.setData({
      [val]: e.detail
    })
    this.isInput()
  },

  // 判断是否填写内容
  isInput() {
    if (this.data.reqData.name && this.data.reqData.starttime && this.data.reqData.endtime && this.data.reqData.count) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  addMealTime() {
    app.showLoading('', '')
    let that = this
    const params = that.data.reqData
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateMealTime}`,
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

  getMealtimeDetail(id) {
    app.requestNoToken({
      url: `${apiAddress.default.getMealtimeDetail}`,
      data: {
        id
      },
      method: 'post'
    }).then(res => {
      this.setData({
        disabled: false,
        'reqData.id': res.data.id,
        'reqData.name': res.data.name,
        // 'reqData.starttime': res.data.starttime,
        // 'reqData.endtime': res.data.endtime,
        'reqData.count': res.data.count,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id) {
      this.setData({
        isEdit: true,
      })
      this.getMealtimeDetail(options.id)
    }
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