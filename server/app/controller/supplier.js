'use strict';
const Controller = require('egg').Controller;

class SupplierController extends Controller {
  async getSupplierList() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.query
    const option = {
      // limit: parseInt(params.rows),
      // offset: (parseInt(params.page) - 1) * parseInt(params.rows),
      // include: [
      //   { 
      //     model: ctx.model.Supplier, 
      //     attributes: ['name'],
      //   }
      // ],
      where: {
        name: {
          [Op.like]: '%' + params.queryName + '%'
        },
        // Supplier_id: {
        //   [Op.like]: '%' + params.Supplier_id + '%'
        // },
      }
    }
    const res = await ctx.model.Supplier.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addOrUpdateSupplier() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.createtime = new Date();
    if (params.id) {
      const res = await ctx.model.Supplier.update(params, {
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
      const [res, created] = await ctx.model.Supplier.findOrCreate({
        where: {
          name: params.name,
        },
        defaults: params
      })

      if (created) {
        ctx.body = {
          total: 0,
          message: '新增成功',
          code: 200,
          isSucceed: true,
        }
      } else {
        ctx.body = {
          total: 0,
          message: "失败",
          code: 250,
          isSucceed: false,
        }
      }
    }
  }

  async delSupplier() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.body;
    // const ids = params.ids.split(',').map(c => +c);
    const res = await ctx.model.Supplier.destroy({
      where: {
        // id: {
        //   [Op.in]: ids
        // }
        id: params.ids
      }
    })
    if (res) {
      ctx.body = {
        total: 0,
        message: "删除成功",
        code: 200,
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        message: "删除失败",
        code: 250,
        isSucceed: false,
      }
    }
  }

  async getAllSupplier() {
    const { ctx } = this;
    const res = await ctx.model.Supplier.findAndCountAll()
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = SupplierController;