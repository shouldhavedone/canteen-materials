'use strict';
const Controller = require('egg').Controller;
const qiniu = require('qiniu')

class QiniuController extends Controller {
  async getToken() {
    const { ctx, config } = this;
    const qiniuConfig = config.qiniuConfig
    let options = {
      scope: qiniuConfig.dataDucket,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };

    let mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uptoken = putPolicy.uploadToken(mac);

    ctx.body = {
      total: 0,
      uptoken,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = QiniuController;