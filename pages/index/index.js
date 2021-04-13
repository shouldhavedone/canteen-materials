// index.js
// 获取应用实例
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()

Page({
  data: {
    userId: '',
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

  toMaterial() {
    wx.navigateTo({
      url: '../material/material',
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
  onLoad: function() {
    
  },

  onShow: function() {
    console.log(vt.getStorage('userInfo'))
    if (vt.getStorage('userInfo')) {
      this.setData({
        userId: JSON.parse(vt.getStorage('userInfo')).id
      })
    }
  },
})