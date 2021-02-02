// pages/noticeList/noticeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [
      {
        id: '1',
        title: '充值提醒',
        endtime: '2021/1/31',
        createtime: '2021-01-31 10:00:00',
      },
      {
        id: '2',
        title: '充值提醒',
        endtime: '2021/1/31',
        createtime: '2021-01-31 10:00:00',
      },
      {
        id: '3',
        title: '充值提醒',
        endtime: '2021/1/31',
        createtime: '2021-01-31 10:00:00',
      },
    ]
  },

  toNoticeContent() {
    wx.navigateTo({
      url: '../noticeContent/noticeContent',
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