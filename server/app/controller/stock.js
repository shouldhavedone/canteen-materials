'use strict';
const Controller = require('egg').Controller;

class StockController extends Controller {
  async getStockList() {
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
        attributes: ['name', 'price'],
      }],
      // where: {
      //   name: {
      //     [Op.like]: '%' + params.queryName + '%'
      //   },
      // }
    }
    const res = await ctx.model.Stock.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addStock() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;
    params.createtime = new Date();
    const findMaterial = await ctx.model.Stock.findOne({
      where: {
        material_id: params.material_id
      }
    })
    if (findMaterial) { // 如果已有物资，就更新
      let count = parseInt(findMaterial.dataValues.count) + parseInt(params.count);
      params.count = count;
      await ctx.model.Stock.update(params, {
        where: {
          material_id: params.material_id
        }
      })
    } else { // 不存在就创建
      await ctx.model.Stock.create(params)
    }


    const data = {
      name: params.supplier + ' - ' + params.material,
      material_id: params.material_id,
      count: params.count,
      total_price: params.total_price,
      createtime: params.createtime,
    }
    await ctx.model.Order.create(data);

    ctx.body = {
      data: '加购成功',
      code: 200,
      isSucceed: true,
      total: 0,
    }
  }

  async getAllStock() {
    const { ctx } = this;
    const res = await ctx.model.Stock.findAndCountAll({
      include: [{
        model: ctx.model.Material,
        attributes: ['name'],
      }],
    })
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }
}
module.exports = StockController;