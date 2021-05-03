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
    hiddenAddDetail: false,
    showAddrPciker: false,
    departList: [],
    reqData: {
      id: '',
      name: '',
      sort: 1,
      department_id: '',
      department: '',
    }
  },

  chooseDepart: function () {
    this.setData({
      showAddrPciker: true,
      hiddenAddDetail: true
    })
  },

  departCancel: function () {
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
        name: '',
        sort: 1,
        department_id: '',
        department: '',
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
  inputSort(e) {
    let str = "reqData.sort"
    this.setData({
      [str]: e.detail.value
    })
    this.isInput()
  },

  departSure: function (e) {
    let choosedData = e.detail.choosedData
    console.log(choosedData)
    let str = "reqData.department"
    this.setData({
      [str]: choosedData[0].name,
      'reqData.department_id': choosedData[0].id,
      showAddrPciker: false
    })
    this.isInput()
  },

  // 判断是否填写内容
  isInput() {
    if (this.data.reqData.name && this.data.reqData.sort && this.data.reqData.department) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  addPost() {
    app.showLoading('', '')
    let that = this
    const params = that.data.reqData
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdatePosition}`,
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

  getPositionDetail(id) {
    app.requestNoToken({
      url: `${apiAddress.default.getPositionDetail}`,
      data: {
        id
      },
      method: 'post'
    }).then(res => {
      this.setData({
        disabled: false,
        'reqData.id': res.data.id,
        'reqData.name': res.data.name,
        'reqData.sort': res.data.sort,
        'reqData.department_id': res.data.Department.id,
        'reqData.department': res.data.Department.name,
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
      this.getPositionDetail(options.id)
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
    this.getDepartmentData();
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