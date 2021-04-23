'use strict';
const Controller = require('egg').Controller;

class NoticeController extends Controller {
  async getNoticeList() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.query
    const option = {
      where: {
        title: {
          [Op.like]: '%' + params.queryName + '%'
        },
      }
    }
    const res = await ctx.model.Notice.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async getNoticeOne() {
    const { ctx } = this;
    const res = await ctx.model.Notice.findAll({
      order: [[ 'createtime', 'DESC' ]],
    })
    ctx.body = {
      data: res[0],
      code: 200,
      isSucceed: true,
    }

  }

  async getAllNotice() {
    const { ctx } = this;
    const res = await ctx.model.Notice.findAndCountAll({
      order: [[ 'createtime', 'DESC' ]],
    })
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async updateNotice() {
    const {ctx } = this;
    const params = ctx.request.body;
    await ctx.model.Notice.update(params, {
      where: {
        id: params.id
      }
    })

    ctx.body = {
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = NoticeController;