'use strict';
const Controller = require('egg').Controller;

class FoodtypeController extends Controller {
  async getFoodtypeList() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.query
    const option = {
      // limit: parseInt(params.rows),
      // offset: (parseInt(params.page) - 1) * parseInt(params.rows),
      // include: [
      //   { 
      //     model: ctx.model.Foodtype, 
      //     attributes: ['name'],
      //   }
      // ],
      where: {
        name: {
          [Op.like]: '%' + params.queryName + '%'
        },
        // Foodtype_id: {
        //   [Op.like]: '%' + params.Foodtype_id + '%'
        // },
      }
    }
    const res = await ctx.model.Foodtype.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addOrUpdateFoodtype() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.createtime = new Date();
    if (params.id) {
      const res = await ctx.model.Foodtype.update(params, {
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
      const [res, created] = await ctx.model.Foodtype.findOrCreate({
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

  async delFoodtype() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.body;
    // const ids = params.ids.split(',').map(c => +c);
    const res = await ctx.model.Foodtype.destroy({
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

  async getAllFoodtype() {
    const { ctx } = this;
    const res = await ctx.model.Foodtype.findAndCountAll()
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = FoodtypeController;