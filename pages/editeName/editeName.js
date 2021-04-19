const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    inputVal: "",
    color: true,
    focus: true,
    userInfo: {},
  },
  // input输入事件
  changeName(e) {
    let name = e.detail.value;
    this.setData({
      inputVal: name
    })
  },
  // 清除名字
  clearInput() {
    let that=this
    this.setData({
      disabled: true,
      inputVal: ""
    })
    setTimeout(function() {
      that.setData({
        focus: true
      })
    }, 1)
  },
  // 保存名字
  saveName() {
    // 验证输入的字符是否为空格
    let reg = /\s/;
    if (!vt.isEmojiCharacter(this.data.inputVal) && !reg.test(this.data.inputVal)) {
      if (this.data.inputVal.length == 2 || this.data.inputVal.length > 2) {
        this.setData({
          disabled: false,
          color: true
        })
        this.changeNameApi()
      } else {
        this.setData({
          disabled: true,
          color: false
        })
      }
    } else {
      this.setData({
        disabled: true,
        color: false
      })
    }
  },
  // 修改名字api
  changeNameApi() {
    let that = this
    app.showLoading('', '保存中')
    app.requestNoToken({
      url: apiAddress.default.modifyUser,
      data: {
        "id": this.data.userInfo.id,
        "name": this.data.inputVal
      },
      method: 'POST'
    }).then(res => {
      if (res.isSucceed) {
        app.showLoading('success', '修改成功')
        app.hiddLoading(1, wx.navigateBack)
        let temp = this.data.userInfo;
        temp.name = this.data.inputVal;
        vt.setStorage('userInfo', JSON.stringify(temp))
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      inputVal: JSON.parse(vt.getStorage('userInfo')).name,
      userInfo: JSON.parse(vt.getStorage('userInfo')),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.hiddLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.hiddLoading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {

  // }
})