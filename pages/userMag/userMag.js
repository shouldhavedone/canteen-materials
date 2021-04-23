// pages/userMag/userMag.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    focus: false,
    noneData: false,
    lists: [],
    selectQuery: {
      name: '',
      tel: '',
      department_id: '',
      position_id: '',
    },
    selectItem: {
      name: '',
      laebl: '',
    },
    showSelectPicker: false,
    hiddenSelectDetail: false,
    selectList: [{
        name: '姓名',
        label: 'name',
      },
      {
        name: '电话',
        label: 'tel',
      },
      {
        name: '部门',
        label: 'department_id',
      },
      {
        name: '职位',
        label: 'position_id',
      },
    ]
  },

  showPick: function () {
    this.setData({
      showSelectPicker: true,
      hiddenSelectDetail: true,
    })
  },

  selectCancel: function () {
    this.setData({
      showSelectPicker: false
    })
    let that = this
    setTimeout(function () {
      that.setData({
        hiddenSelectDetail: false
      })
    }, 350)
  },

  resetQueryData() {
    this.setData({
      selectQuery: {
        name: '',
        tel: '',
        department_id: '',
        position_id: '',
      },
    })
  },

  selectSure: function (e) {
    let choosedData = e.detail.choosedData
    this.setData({
      'selectItem.name': choosedData[0].name,
      'selectItem.label': choosedData[0].label,
      showSelectPicker: false,
      searchValue: '',
    })
    this.resetQueryData()
  },

  searchInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  clearSearch() {
    this.setData({
      searchValue: '',
      focus: false,
    })
    this.getUserData()
  },

  contentFocus() {
    this.setData({
      focus: true
    })
  },

  getUserData() {
    const val = 'selectQuery.' + this.data.selectItem.label;
    this.setData({
      [val]: this.data.searchValue
    })

    app.showLoading('', '')
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getUserList}`,
      data: this.data.selectQuery,
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

  deleteUser(e) {
    let that = this;
    wx.showModal({
      'content': '确定要删除该人员吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        if (res.confirm) {
          app.requestNoToken({
            url: `${apiAddress.default.delUser}`,
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
                that.getUserData();
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
    this.setData({
      'selectItem.name': this.data.selectList[0].name,
      'selectItem.label': this.data.selectList[0].label,
    })
    this.getUserData()
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