// app.js
const vt = require("./utils/vt.js")
const apiAddress = require("./api/lcy.js")
// 小程序状态机
const Store = require('./utils/store.js')
let wxStore = new Store({
  state: {
    isShowLoading: false,
    loadingIcon: '',
    loadingText: '加载中'
  },
  methods: {},
  pageLisener: {
    onLoad(options) {},
    onHide() {}
  },
  //开启了局部模式
  // openPart: true
})

App({
  onLaunch() {
    // 打开调试     
    wx.setEnableDebug({
      enableDebug: true
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(options) {
    // wx.getSystemInfo({
    //   success: (res) => {
    //     let platform = res.platform
    //     if (platform.includes('windows') || platform.includes('mac')) {
    //       wx.reLaunch({
    //         url: '/pages/tipPage/tipPage',
    //       })
    //     }
    //   }
    // })
    if (vt.getStorage('tel')) {
      this.getInfo()
    }
    // if (vt.getStorage('userInfo')) {
    //   this.getDynamic_comment()
    // }
  },
  globalData: {
    userInfo: null,
    readId: '',
  },
  // 根据用户id获取用户信息接口
  getInfo() {
    let that = this
    // this.showLoading('', '')
    this.requestNoToken({
      url: apiAddress.default.getUserInfo,
      unCloseLoading: true,
      data: {
        tel: vt.getStorage('tel')
      }
    }).then(res => {
      vt.setStorage('userInfo', JSON.stringify(res.data))
    })
  },
  // 隐藏loading
  hiddLoading(time, cb) {
    if (time) {
      setTimeout(() => {
        wxStore.setState({
          isShowLoading: false,
          loadingIcon: '',
          loadingText: '加载中'
        })
        if (cb) cb()
      }, time * 1000)
    } else {
      wxStore.setState({
        isShowLoading: false,
        loadingIcon: '',
        loadingText: '加载中'
      })
    }
  },
  // 显示loading
  showLoading(icon, text) {
    wxStore.setState({
      isShowLoading: true,
      loadingIcon: icon ? icon : '',
      loadingText: text ? text : '加载中'
    })
  },
  //需要token的get、post方法封装
  requestWithToken: function (options = {}) {
    return new Promise((relove, reject) => {
      vt.isOutOfDayToken().then((res) => {
        wx.request({
          url: options.ip ? `${options.ip}${options.url}` : `${vt.ip}${options.url}`,
          data: options.data || {},
          method: options.method ? options.method : 'GET',
          dataType: "json",
          header: {
            "Content-Type": options.content_type ? options.content_type : "application/json",
            Authorization: vt.getStorage("token") ? "bearer " + vt.getStorage("token") : '',
            cId: vt.getStorage('communityId') || 1
          },
          success: (res) => {
            if (res.data.isSucceed) {
              relove(res.data)
              // 当前接口调完不需要关闭loading图标时，需在options里传参unCloseLoading:true
              if (wxStore.$state.isShowLoading && options.unCloseLoading ? false : true) {
                this.hiddLoading()
              }
            } else {
              let title = '系统错误'
              switch (res.statusCode) {
                case 200:
                  // title = res.data.message.length > 7 ? '系统错误' : res.data.message
                  title = res.data.message
                  break;
                case 400:
                  title = '错误请求'
                  break;
                case 401:
                  title = '未授权'
                  break;
                case 403:
                  title = '拒绝访问'
                  break;
                case 404:
                  title = '未找到该资源'
                  break;
                case 408:
                  title = '请求超时'
                  break;
                case 500:
                  title = '服务器忙，请重试'
                  break;
                case 502:
                  title = '网络错误'
                  break;
                case 503:
                  title = '服务不可用'
                  break;
                default:
                  break;
              }
              // this.showLoading('warning', title)
              if (options.cb) {
                options.cb()
              }
              this.hiddLoading()
              wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          },
          fail: (res) => {
            // this.showLoading('warning', '系统错误')
            if (options.cb) {
              options.cb()
            }
            this.hiddLoading()
            wx.showToast({
              title: '系统错误',
              icon: 'none',
              duration: 2000,
              mask: true
            })
            reject(res)
          },
          complete: (res) => {

          }
        });
      })
    })
  },
  //不需要token的get、post方法封装
  requestNoToken: function (options = {}) {
    return new Promise((relove, reject) => {
      wx.request({
        url: options.ip ? `${options.ip}${options.url}` : `${vt.ip}${options.url}`,
        data: options.data || {},
        method: options.method ? options.method : 'GET',
        dataType: "json",
        header: {
          "Content-Type": options.content_type ? options.content_type : "application/json"
        },
        success: (res) => {
          if (res.data.isSucceed) {
            relove(res.data)
            // 当前接口调完不需要关闭loading图标时，需在options里传参unCloseLoading:true
            if (wxStore.$state.isShowLoading && options.unCloseLoading ? false : true) {
              this.hiddLoading()
            }
          } else {
            // if (res.data.code == 10000 && options.url.includes('/vito-sys/vitoservice/serviceniniappuser/getByMobile')) {
            //   wx.removeStorageSync('userInfo')
            //   wx.removeStorageSync('tel')
            //   wx.switchTab({
            //     url: '/pages/index/index',
            //   })
            // }
            // // 检测用户是否具有邀请权限
            // if (res.data.code == 10000 && options.url.includes('/vito-sys/vitoservice/serviceinvite/detect')) {
            //   relove(res.data)
            //   return
            // }
            // // 检测是否参与积分
            // if (res.data.code == 10000 && options.url.includes('/vito-sys/vitoservice/serviceniniappuser/detectIntegral')) {
            //   relove(res.data)
            //   return
            // }
            // // 产品动态
            // if (options.url.includes('/vito-sys/sys/sysuser/getUserToalAsMonth')) {
            //   relove(res.data)
            //   return
            // }
            // // 功能使用频率
            // if (options.url.includes('/vito-sys/service_project/service_project/getFunctionUseRank')) {
            //   relove(res.data)
            //   return
            // }
            let title = '系统错误'
            switch (res.statusCode) {
              case 200:
                // title = res.data.message.length > 7 ? '系统错误' : res.data.message
                title = res.data.message
                break;
              case 400:
                title = '错误请求'
                break;
              case 401:
                title = '未授权'
                break;
              case 403:
                title = '拒绝访问'
                break;
              case 404:
                title = '未找到该资源'
                break;
              case 408:
                title = '请求超时'
                break;
              case 500:
                title = '服务器忙，请重试'
                break;
              case 502:
                title = '网络错误'
                break;
              case 503:
                title = '服务不可用'
                break;
              default:
                break;
            }
            // this.showLoading('warning', title)
            if (options.cb) {
              options.cb()
            }
            this.hiddLoading()
            wx.showToast({
              title: title,
              icon: 'none',
              duration: 2000,
              mask: true
            })
          }
        },
        fail: (res) => {
          // this.showLoading('warning', '系统错误')
          if (options.cb) {
            options.cb()
          }
          this.hiddLoading()
          wx.showToast({
            title: '系统错误',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          reject(res)
        },
        complete: (res) => {

        }
      })
    })
  },
  // 小程序状态机
  wxStore: wxStore
})