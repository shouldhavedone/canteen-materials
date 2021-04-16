const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    oldPwd: "",
    newPwd: "",
    reNewPwd: "",
    color: true,
    focus: true,
    userInfo: {},
  },
  // input输入事件
  changeOldPwd(e) {
    this.setData({
      oldPwd: e.detail.value
    })
    this.inputCheck();
  },
  changeNewPwd(e) {
    this.setData({
      newPwd: e.detail.value
    })
    this.inputCheck();
  },
  changeRePwd(e) {
    this.setData({
      reNewPwd: e.detail.value
    })
    this.inputCheck();
  },
  // 清除名字
  clearOldPwd() {
    let that = this
    this.setData({
      disabled: true,
      oldPwd: ""
    })
    setTimeout(function () {
      that.setData({
        focus: true
      })
    }, 1)
  },
  clearNewPwd() {
    this.setData({
      disabled: true,
      newPwd: ""
    })
  },
  clearRePwd() {
    this.setData({
      disabled: true,
      reNewPwd: ""
    })
  },

  inputCheck() {
    if (this.data.oldPwd && this.data.newPwd && this.data.reNewPwd) {
      this.setData({
        disabled: false,
      })
    }
  },
  // 保存名字
  savePwd() {
    // 验证输入的字符是否为空格
    let reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
    if (reg.test(this.data.newPwd) && this.data.newPwd == this.data.reNewPwd) {
      this.setData({
        disabled: false,
        color: true
      })
      this.changePwdApi()
    } else {
      this.setData({
        disabled: true,
        color: false
      })
    }
  },
  // 修改密码api
  changePwdApi() {
    let that = this
    app.showLoading('', '保存中')
    app.requestNoToken({
      url: apiAddress.default.modifyPwd,
      data: {
        "id": this.data.userInfo.id,
        "oldPwd": this.data.oldPwd,
        "newPwd": this.data.newPwd
      },
      method: 'POST'
    }).then(res => {
      if (res.isSucceed) {
        app.showLoading('success', '修改成功')
        vt.removeStorage('userInfo');
        wx.navigateTo({
          url: '../login/login'
        })
      } else {
        app.showLoading('error', '修改失败')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: JSON.parse(vt.getStorage('userInfo')),
    })
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
    app.hiddLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.hiddLoading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {

  // }
})