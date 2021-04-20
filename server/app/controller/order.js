'use strict';
const Controller = require('egg').Controller;

class OrderController extends Controller {
  async getOrderList() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const params = ctx.request.query
    const option = {
      include: [{
        model: ctx.model.Material,
        attributes: ['name'],
      }],
      where: {
        name: {
          [Op.like]: '%' + params.queryName + '%'
        },
      }
    }
    const res = await ctx.model.Order.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addOrder() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;
    params.createtime = new Date();
    const [res, created] = await ctx.model.Order.findOrCreate({
      where: {
        name: params.name,
      },
      defaults: params
    })
    if (created) {

      const data = {
        id: params.material_id,
        count: params.count,
      }

      ctx.body = {
        total: 0,
        message: '新增成功',
        code: 200,
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        message: "订单已存在",
        code: 250,
        isSucceed: false,
      }
    }
  }

  async addOrUpdateOrder() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;
    params.createtime = new Date();
    if (params.id) {
      const res = await ctx.model.Order.update(params, {
        where: {
          id: params.id
        }
      })
      ctx.body = {
        total: 0,
        message: '修改成功',
        code: 200,
        isSucceed: true,
      }
    } else {
      const [res, created] = await ctx.model.Order.findOrCreate({
        where: {
          name: params.name,
        },
        defaults: params
      })

      
    }
  }
}

module.exports = OrderController;