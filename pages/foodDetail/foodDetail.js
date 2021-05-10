// pages/foodDetail/foodDetail.js
const vt = require("../../utils/vt.js")
const apiAddress = require("../../api/lcy.js")
const app = getApp()
const qiniuUploader = require("../../utils/qiniuUploader");

// 初始化七牛云相关配置
function initQiniu() {
  var options = {
    region: 'SCN',
    uptoken: '',
    uptokenURL: `${vt.ip}${apiAddress.default.uploadToken}`,
    uptokenFunc: function () {},
    domain: 'http://qrldwoyz2.hn-bkt.clouddn.com',
    shouldUseQiniuFileName: true
  };
  qiniuUploader.init(options);
}

function didPressChooesImage(that) {
  initQiniu();
  that.setData({
    'imageObject': {},
  });
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          imageObject: res
        });
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      }, );
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    imageObject: {},
    reqData: {
      id: '',
      name: '',
      price: 0,
      pre_count: 0,
      introduce: '',
      foodtype: '',
      foodtype_id: '',
      mealtime: '',
      mealtime_id: '',
    },
    isEdit: false,
    showAddrPciker: false,
    showTimePciker: false,
    hiddenAddDetail: false,
    hiddenTimeDetail: false,
    foodtypeList: [],
    mealtimeList: [],
    showMaterial: false,
    materialList: [],
    stockList: [],
    stockResult: []
  },

  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  },

  getFoodtypeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllFoodType}`,
    }).then(res => {
      that.setData({
        foodtypeList: res.data
      })
    })
  },

  getMealTimeData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllMealTime}`,
    }).then(res => {
      that.setData({
        mealtimeList: res.data
      })
    })
  },

  chooseType: function () {
    this.setData({
      showAddrPciker: true,
      hiddenAddDetail: true
    })
  },

  chooseTime: function () {
    this.setData({
      showTimePciker: true,
      hiddenTimeDetail: true
    })
  },

  typeCancel: function () {
    this.setData({
      showAddrPciker: false
    })
    let that = this
    setTimeout(function () {
      that.setData({
        hiddenAddDetail: false
      })
    }, 350)
    this.checkData()
  },

  timeCancel: function () {
    this.setData({
      showTimePciker: false
    })
    let that = this
    setTimeout(function () {
      that.setData({
        hiddenTimeDetail: false
      })
    }, 350)
    this.checkData()
  },

  inputName(e) {
    this.setData({
      ["reqData.name"]: e.detail
    })
    this.checkData()
  },

  inputPrice(e) {
    this.setData({
      ["reqData.price"]: e.detail
    })
    this.checkData()
  },

  inputPreCount(e) {
    this.setData({
      ["reqData.pre_count"]: e.detail
    })
    this.checkData()
  },

  inputIntroduce(e) {
    this.setData({
      ["reqData.introduce"]: e.detail
    })
    this.checkData()
  },

  typeSure: function (e) {
    let choosedData = e.detail.choosedData
    this.setData({
      'reqData.foodtype': choosedData[0].name,
      'reqData.foodtype_id': choosedData[0].id,
      showAddrPciker: false
    })
    this.checkData()
  },

  timeSure: function (e) {
    let choosedData = e.detail.choosedData
    this.setData({
      'reqData.mealtime': choosedData[0].name,
      'reqData.mealtime_id': choosedData[0].id,
      showTimePciker: false
    })
    this.checkData()
  },

  checkData() {
    if (this.data.reqData.name && this.data.reqData.price && this.data.reqData.pre_count && this.data.reqData.introduce && this.data.reqData.foodtype && this.data.reqData.mealtime) {
      this.setData({
        disabled: false,
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  addFood() {
    app.showLoading('', '')
    let that = this
    const params = {
      ...that.data.reqData,
      image: that.data.imageObject.imageURL,
      stock: that.data.stockResult.join(',')
    }
    app.requestNoToken({
      url: `${apiAddress.default.addOrUpdateFood}`,
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

  showMaterialList() {
    this.setData({
      showMaterial: true,
    })
  },

  closeMaterial() {
    this.setData({
      showMaterial: false,
    })
  },

  onChange(event) {
    this.setData({
      stockResult: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  getStockData() {
    let that = this
    app.requestNoToken({
      url: `${apiAddress.default.getAllStock}`,
    }).then(res => {
      that.setData({
        stockList: res.data
      })
    })
  },

  getFoodDetail(id) {
    app.requestNoToken({
      url: `${apiAddress.default.getFoodDetail}`,
      data: {
        id
      },
      method: 'post'
    }).then(res => {
      this.setData({
        disabled: false,
        'reqData.id': res.data.id,
        'reqData.name': res.data.name,
        'reqData.price': res.data.price,
        'reqData.pre_count': res.data.pre_count,
        'reqData.introduce': res.data.introduce,
        'reqData.foodtype': res.data.Foodtype.name,
        'reqData.foodtype_id': res.data.Foodtype.id,
        'reqData.mealtime': res.data.Mealtime.name,
        'reqData.mealtime_id': res.data.Mealtime.id,
        'imageObject.fileURL': res.data.image,
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
      this.getFoodDetail(options.id)
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
    this.getFoodtypeData()
    this.getMealTimeData()
    this.getStockData()
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