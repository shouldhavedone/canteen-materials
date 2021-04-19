let httpNum = 0; // 开发服: 0, 测试服: 1，正式服: 2
let appId = 1;
let VT = {};
VT = {
  tokenName: 'token',
  ip: null, // api的ip地址
  setIp: function (httpNum) {
    switch (httpNum) {
      case 0: // 开发接口
        this.ip = 'http://127.0.0.1:7001';
        break;
      case 1: // 测试接口
        this.ip = '';
        break;
      case 2: // 正式接口
        this.ip = '';
        break;
    }
  },

  appId: null,

  setAppId: function () {
    if (appId == 0) {
      this.appId = 'wxde7a72f3e4b6c22b';
    } else {
      this.appId = 'wxde7a72f3e4b6c22b';
    }
  },

  getToken: function (callback) {
    wx.getStorage({
      key: VT.tokenName,
      success: function (res) {
        callback.call(this, res.data);
      },
      fail: function (res) {
        wx.showModal({
          content: '你的登录已过期',
          showCancel: false,
          success: function () {
            VT.url('login');
          }
        })
      }
    })
  },

  setStorage: function(key, data) {
    wx.setStorageSync(key, data);
  },
  getStorage: function(key) {
    return wx.getStorageSync(key);
  },

  isSkipUrl: false,

  url: function (name, obj) {
    if (!VT.isSkipUrl) {
      VT.isSkipUrl = true;
      let lastName = namel
      lastName += VT.getParams(obj);
      wx.navigateTo({
        url: '../' + name + '/' + lastName,
      });
      setTimeout(function () {
        VT.isSkipUrl = false;
      }, 1000)
    }
  },

  urlR: function (name, obj) {
    let lastName = name;
    lastName += VT.getParams(obj);
    wx.redirectTo({
      url: '../' + name + '/' + lastName,
    })
  },

  tabUrl: function (name, obj) {
    let lastName = name;
    lastName += VT.getParams(obj);
    wx.switchTab({
      url: '../' + name + '/' + lastName,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  getParams: function (obj) {
    let params = '';
    if (obj !== undefined) {
      let i = 0;
      for (let key in obj) {
        if (obj[key] !== undefined) {
          if (i === 0) {
            params += '?' + key + '=' + obj[key];
          } else {
            params += '&' + key + '=' + obj[key];
          }
          i++;
        }
      }
    }
    return params;
  },
  clearToken: function() {
    VT.removeStorage(VT.tokenName);
  },
  setToken: function(data) {
    VT.setStorage(VT.tokenName, data);
  },
  isEmpty: function(text) {
    if (text === undefined || text === null || text === '' || text === 'null') return true;
    else {
      if (typeof(text) === 'object') {
        for (var key in text) return false;
        return true;
      }
      return false;
    }
  },
  getArrayIndex: function(array, type, value) {
    var index = -1;
    if (value === undefined) {
      array.forEach(function(v, i) {
        if (v === value) index = i;
      });
    } else {
      array.forEach(function(v, i) {
        if (v[type] === value) index = i;
      });
    }
    return index;
  },
  loadingShow: function(title) {
    wx.showLoading({
      title: title || '玩命加载中...',
      mask: true
    });
  },
  loadingHide: function() {
    wx.hideLoading();
  },
  dateFormat: function(date, fmt) { //author: meizz 
    var o = {
      "yy+": date.getFullYear(), //月份
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ""));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  clearStorage: function() {
    wx.clearStorage()
  },
  removeStorage: function(key) {
    wx.removeStorageSync(key);
  },
  clearShow: function() {
    VT.setStorage('pageShow', [false, false, false]);
  },
  isNum: function(str) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
  search: function(search, name) {
    var search = search;
    if (name) {
      var index = search.indexOf(name);
      if (index !== -1) {
        if (search.substring(index + name.length, index + name.length + 1) !== '=') return undefined;
        search = search.substring(search.indexOf(name) + name.length + 1);
        if (search.indexOf('&') !== -1) search = search.substring(0, search.indexOf('&'));
      } else return undefined;
    }
    return search;
  },
  trim: function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  dateDiff: function(startDate, endDate) {
    let _dt1 = new Date(startDate);
    let _dt2 = new Date(endDate);
    let dt1 = _dt1.getTime();
    let dt2 = _dt2.getTime();
    return parseInt((dt2 - dt1) / 1000 / 60 / 60 / 24);
  },
  getDate: function() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month <= 9) {
      month = "0" + month;
    }

    let day = date.getDate();
    if (day <= 9) {
      day = "0" + day;
    }

    let hour = date.getHours();
    if (hour <= 9) {
      hour = "0" + hour;
    }

    let minutes = date.getMinutes();
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }
    let seconds = date.getSeconds();
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }
    let time = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    return time;
  },
  getMonth() {
    let date = new Date();
    let month = date.getMonth() + 1;
    if (month <= 9) {
      month = "0" + month;
    }
    return month;
  },
  getDay() {
    let date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    if (day <= 9) {
      day = "0" + day;
    }
    return day;
  },
  diffTime: function(today, time) {
    var dateTime = new Date(time);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    if (month <= 9) {
      month = "0" + month;
    }
    if (day <= 9) {
      day = "0" + day;
    }
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    if (hour <= 9) {
      hour = "0" + hour;
    }
    if (minute <= 9) {
      minute = "0" + minute;
    }
    if (second <= 9) {
      second = "0" + second;
    }
    var now = new Date();
    var now_new = now.getTime(); //typescript转换写法
    var milliseconds = 0;
    var timeSpanStr;
    milliseconds = now_new - time;
    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    } else {
      timeSpanStr = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
  },
  isEmojiCharacter(substring) {
    for (var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          return true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
          hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
          hs == 0x2b50) {
          return true;
        }
      }
    }
  },
  isGetId(func) {
    if (!VT.isEmpty(VT.getStorage("id"))) {
      func();
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  // 判断token是否过期,过期刷新token
  isOutOfDayToken() {
    return new Promise((relove, reject) => {
      let tokenTime = VT.getStorage("expires")
      let nowTime = VT.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
      let isreFresh = false
      isreFresh = tokenTime < nowTime ? true : false
      if (isreFresh) {
        wx.request({
          url: VT.ip + '/wechatapp/canteen-service/login/getToken',
          data: {
            id: VT.getStorage("id")
          },
          success(res) {
            if (res.data.isSucceed) {
              VT.setStorage("token", res.data.rows[0].accessToken)
              VT.setStorage("expires", res.data.rows[0].expiresDate)
              relove()
            } else {
              VT.setStorage('id', '')
              reject();
            }
          }
        })
      } else {
        relove();
      }
    })
  },
  formateDate(date) {
    let tt = new Date(parseInt(date))
    let days = parseInt((new Date().getTime() - date) / 86400000)
    let today = new Date().getDate()
    let year = tt.getFullYear()
    var mouth = tt.getMonth() + 1 < 10 ? `0${tt.getMonth() + 1}` : tt.getMonth() + 1
    var day = tt.getDate() < 10 ? `0${tt.getDate()}` : tt.getDate()
    var time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours()
    var min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes()
    var result = '',
      offset = ''
    offset = Math.abs(today - day)
    if (days < 4 && offset < 4) {
      if (offset === 0) {
        result = "今天 " + time + ":" + min
      } else if (offset === 1) {
        result = "昨天 " + time + ":" + min
      } else if (offset === 2) {
        result = "前天 " + time + ":" + min
      } else {
        // result = year + "-" + mouth + "-" + day + " " + time + ":" + min
        result = mouth + "-" + day + " " + time + ":" + min
      }
    } else {
      result = mouth + "-" + day + " " + time + ":" + min
    }
    return result  
  }
}
VT.setIp(httpNum); // 服务器ip地址
VT.setAppId(); // 设置appid

module.exports = {
  setIP: VT.setIP,
  httpNum: httpNum, // 开发、测试、正式
  ip: VT.ip, // ip地址
  projectId: 'canteenMaterials',
  appId: VT.appId, // appId
  userInfo: VT.userInfo, // 用户信息
  getUserInfo: VT.getUserInfo, // 获取用户信息
  isEmpty: VT.isEmpty, //检测变量、对象或数组是否为空，示例：vt.isEmpry(变量)
  getToken: VT.getToken, //获取token方法，示例：vt.getToken(function(token){ //这里是获取后的执行  })
  setToken: VT.setToken, //设置token，示例：vt.setToken(token值)
  getParams: VT.getParams, //把对象转换成请求字符串，示例，var params = vt.getParams({a:123,b:456})
  url: VT.url, //跳转页面，示例：vt.url('login'); ，页面传参示例：vt.url('login', {userID:1313, id:1})
  urlR: VT.urlR, //重定向跳转页面，跳转后，没有返回上一页，和url的使用方式一样
  tabUrl: VT.tabUrl, //跳转到tab页面的方式
  setStorage: VT.setStorage, //设置本地存储，示例：vt.setStorage(key, value);
  getStorage: VT.getStorage, //获取本地存储，示例：var card_id = vt.getStorage("card_id");
  getArrayIndex: VT.getArrayIndex, //获取对象在数组中的下标，示例：vt.getArrayIndex(array, key, value);
  loadingShow: VT.loadingShow, //加载中：示例：vt.loadingShow(title); title为内容，默认 “玩命加载中...”
  loadingHide: VT.loadingHide, //隐藏加载中
  dateFormat: VT.dateFormat, //获取日期格式转换，示例：(vt.dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss.SS")      ==> 2006-7-2 8:9:4.18 
  clearStorage: VT.clearStorage, //清除本地缓存，示例：vt.clearStorage()
  removeStorage: VT.removeStorage, //移除本地缓存，示例：vt.clearStorage('token')
  clearToken: VT.clearToken, //移除token，示例：vt.clearToken()
  isShow: VT.isShow, //判断页面是否已经显示过，示例：vt.isShow(0)，赋值：vt.isShow(0,true)，
  clearShow: VT.clearShow, //清除所有页面缓存，示例：vt.clearShow()
  isNum: VT.isNum, //检查值是否为数字
  search: VT.search, //获取指定url中的请求参数值，示例：vt.search(url, name)
  trim: VT.trim, //去除字符串两边空格，示例：var str = vt.trim(str)
  dateDiff: VT.dateDiff, //计算两个日期相差的天数，示例：var diffDay = vt.dateDiff('2017-1-1', '2017-1-4');
  getDate: VT.getDate, //获取当天时间，格式： "2018-05-01"
  getMonth: VT.getMonth, //获取当前月份
  getDay: VT.getDay, //获取今天的多少号
  diffTime: VT.diffTime, // 根据不同需求显示不同的时间内容
  sendMould: VT.sendMould, //支付完成发送模板方法，示例：vt.sendMould(touser, orderNumber, form_id,  successCallback, errorCallback)
  isEmojiCharacter: VT.isEmojiCharacter, //判断用户是否输入了表情，是则返回true
  isGetId: VT.isGetId, //判断用户是否登陆过
  isOutOfDayToken: VT.isOutOfDayToken,
  formateDate: VT.formateDate
}