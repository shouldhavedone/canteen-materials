// index.js
// 获取应用实例
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({
  data: {
    userId: '',
    text: '',
  },
  toLogIn() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 事件处理函数
  toNoticeList() {
    wx.navigateTo({
      url: '../noticeList/noticeList'
    })
  },

  toUserMag() {
    wx.navigateTo({
      url: '../userMag/userMag',
    })
  },

  toSupplier() {
    wx.navigateTo({
      url: '../supplier/supplier',
    })
  },

  toInput() {
    wx.navigateTo({
      url: '../input/input',
    })
  },

  toStock() {
    wx.navigateTo({
      url: '../stock/stock',
    })
  },

  toMaterial() {
    wx.navigateTo({
      url: '../material/material',
    })
  },

  toFoodType() {
    wx.navigateTo({
      url: '../foodType/foodType',
    })
  },

  toUPostSetup() {
    wx.navigateTo({
      url: '../postSetup/postSetup',
    })
  },

  toFoodRank() {
    wx.navigateTo({
      url: '../foodRank/foodRank',
    })
  },

  toDeptSetup() {
    wx.navigateTo({
      url: '../departmentSetup/departmentSetup',
    })
  },

  toDailyMenu() {
    wx.navigateTo({
      url: '../dailyMenu/dailyMenu',
    })
  },

  toDinnerTime() {
    wx.navigateTo({
      url: '../dinnerTime/dinnerTime',
    })
  },

  toMealOpenTime() {
    wx.navigateTo({
      url: '../mealOpeningTime/mealOpeningTime',
    })
  },

  getNoticeData() {
    const that = this;
    app.requestNoToken({
      url: `${apiAddress.default.getNoticeOne}`,
    }).then(res => {
      that.setData({
        text: res.data.text
      })
    })
  },

  onLoad: function () {

  },

  onShow: function () {
    if (vt.getStorage('userInfo')) {
      this.setData({
        userId: JSON.parse(vt.getStorage('userInfo')).id
      })
      this.getNoticeData()
    }
    
  },
})