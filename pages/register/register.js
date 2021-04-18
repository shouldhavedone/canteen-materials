const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    tel: '',
    department: '',
    department_id: '',
    departList: [],
    nameCheck: false,
    pwdCheck: false,
    rePwd: '',
    errTip: '',
    showDepartPciker: false,
    hiddenDepartDetail: false,
  },

  departCancel: function () {
    this.setData({
      showDepartPciker: false
    })
    let that = this
    setTimeout(function () {
      that.setData({
        hiddenDepartDetail: false
      })
    }, 350)
  },

  departSure: function (e) {
    let choosedData = e.detail.choosedData
    let str = "department"
    this.setData({
      [str]: choosedData[0].name,
      'department_id': choosedData[0].id,
      showDepartPciker: false
    })
  },

  getDepartmentData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllDepartment}`,
    }).then(res => {
      that.setData({
        departList: res.data
      })
    })
  },

  chooseDepart: function () {
    this.setData({
      showDepartPciker: true,
      hiddenDepartDetail: true,
    })
  },

  getName(e) {
    this.setData({
      name: e.detail.value
    })
    this.checkName()
  },
  getTel(e) {
    this.setData({
      tel: e.detail.value
    })
  },

  getPassword(e) {
    this.setData({
      password: e.detail.value
    })
    this.checkPwd()
  },

  getRePwd(e) {
    this.setData({
      rePwd: e.detail.value
    })
    this.checkRePwd()
  },

  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  registerInterface() {
    app.requestNoToken({
      url: `${apiAddress.default.register}`,
      data: {
        name: this.data.name,
        password: this.data.password,
        tel: this.data.tel,
        department_id: this.data.department_id,
      },
      method: "POST",
    }).then(res => {
      if (res && res.isSucceed) {
        wx.navigateBack({
          delta: 1
        })
        app.showLoading('success', '注册成功，请登录！')
      } else {
        app.showLoading('error', '注册失败，请稍后重试')
      }
    })
  },

  checkName() {
    if (!this.data.name) {
      this.setData({
        errTip: '请输入用户名',
        nameCheck: false,
      })
      return;
    }

    let reg = /\s/;
    if (!vt.isEmojiCharacter(this.data.name) && !reg.test(this.data.name) && (this.data.name.length > 20 || this.data.name.length < 2)) {
      this.setData({
        errTip: '用户名2-20个字符,不能有空格,不能有表情等特殊字符',
        nameCheck: false,
      })
      return;
    } else {
      this.setData({
        nameCheck: true,
      })
    }
  },

  checkPwd() {
    if (!this.data.password) {
      this.setData({
        errTip: '请输入用户密码',
        pwdCheck: false,
      })
      return;
    }
    let reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
    if (reg.test(this.data.password)) {
      this.setData({
        errTip: '密码必须至少包含1个数字、2个小写字母、2个大写字母、1个特殊字符，可以使用特殊字符，长度在8-16之间，不能有空格、表情',
        pwdCheck: false,
      })
    } else {
      this.setData({
        pwdCheck: true,
      })
    }
  },

  checkRePwd() {
    if (!this.data.rePwd) {
      this.setData({
        errTip: '请再次输入用户密码',
        pwdCheck: false,
      })
      return;
    }
    if (this.data.password != this.data.rePwd) {
      this.setData({
        errTip: '两次输入密码不一致',
        pwdCheck: false,
      })
    } else {
      this.setData({
        pwdCheck: true,
      })
    }
  },

  submit() {
    console.log('1')
    if (this.data.nameCheck && this.data.pwdCheck) {
      this.registerInterface()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepartmentData();
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