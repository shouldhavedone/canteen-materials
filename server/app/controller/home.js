'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    ctx.body = {
      data: '测试',
      res: 200,
      isSucceed: true,
      code: 200,
    }
  }
}

module.exports = HomeController;
