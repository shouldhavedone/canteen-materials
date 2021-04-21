// pages/dailyMenu/dailyMenu.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    typeActive: 0,
    foodTypeList: [],
    foodtype_id: '',
    noneData: false,
    mealtimeList: [],
    mealtime_id: '',
    lists: [],
    time: new Date().getTime(),
    date: '',
    dataShow: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date(2022, 11, 31).getTime(),
  },

  datePiclerShow() {
    this.setData({ dataShow: true });
  },

  datePickerClose() {
    this.setData({ dataShow: false })
  },

  datePickerSure() {
    this.setData({ dataShow: false })
    this.getDailyMenuData();
  },

  inputTime(event) {
    this.setData({
      time: event.detail,
    });
    this.changeDate();
  },

  changeDate() {
    this.setData({
      date: vt.dateFormat(new Date(this.data.time), 'yy-MM-dd')
    });
  },

  previousday() {
    this.setData({
      // time: vt.dateFormat(new Date(), 'yy-MM-dd'),
      time: new Date(this.data.time).getTime() - 24 * 60 * 60 * 1000,
    })
    this.changeDate()
    setTimeout(() => {
      this.getDailyMenuData()
    }, 1)
  },

  nextDay() {
    this.setData({
      time: new Date(this.data.time).getTime() + 24 * 60 * 60 * 1000,
    })
    this.changeDate()
    setTimeout(() => {
      this.getDailyMenuData()
    }, 1)
  },

  getFoodTypeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllFoodType}`,
    }).then(res => {
      if (!that.data.foodtype_id) {
        that.setData({
          foodtype_id: res.data ? res.data[0].id : ''
        })
      }
      that.setData({
        foodTypeList: res.data
      })
      setTimeout(() => {
        if(this.data.foodtype_id && this.data.mealtime_id) {
          this.getDailyMenuData()
        }
      })
    })
  },

  getMealTimeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllMealTime}`,
    }).then(res => {
      if (!that.data.mealtime_id) {
        that.setData({
          mealtime_id: res.data ? res.data[0].id : ''
        })
      }
      that.setData({
        mealtimeList: res.data
      })

      setTimeout(() => {
        if(this.data.foodtype_id && this.data.mealtime_id) {
          this.getDailyMenuData()
        }
      })
    })
  },

  changeType(e) {
    this.setData({
      foodtype_id: this.data.foodTypeList[e.detail].id,
      noneData: false,
    })
    setTimeout(() => {
      this.getDailyMenuData()
    }, 1)
  },

  changeMealtime(e) {
    this.setData({
      mealtime_id: e.currentTarget.dataset.item,
      noneData: false,
    })
    setTimeout(() => {
      this.getDailyMenuData()
    }, 1)
  },

  addDailyMenu() {
    wx.navigateTo({
      url: '../addDailyMenu/addDailyMenu?time=' + this.data.date,
    })
  },

  getDailyMenuData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getDailyMenuList}`,
      data: {
        foodtype_id: that.data.foodtype_id,
        mealtime_id: that.data.mealtime_id,
        time: that.data.date,
      },
    }).then(res => {
      that.setData({
        lists: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: vt.dateFormat(new Date(), 'yy-MM-dd'),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.setData({
    //   time: new Date().getTime(),
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFoodTypeData()
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