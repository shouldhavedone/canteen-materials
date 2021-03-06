'use strict';
const Controller = require('egg').Controller;

class FoodController extends Controller {
  async getFoodList() {
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
        model: ctx.model.Foodtype,
        attributes: ['name'],
      }, {
        model: ctx.model.Mealtime,
        attributes: ['name'],
      }],
      where: {
        name: {
          [Op.like]: '%' + params.queryName + '%'
        },
      }
    }
    const res = await ctx.model.Food.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async getFoodByType() {
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
        model: ctx.model.Foodtype,
        attributes: ['name'],
      }, {
        model: ctx.model.Mealtime,
        attributes: ['name'],
      }],
      where: {
        foodtype_id: params.foodType
      }
    }
    const res = await ctx.model.Food.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addOrUpdateFood() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const params = ctx.request.body;
    params.createtime = new Date();
    if (params.id) {
      const res = await ctx.model.Food.update(params, {
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

      console.log(params)
      const food = await ctx.model.Food.create(params)
      const stock = await ctx.model.Stock.findAll({
        where: {
          id: {
            [Op.in]: params.stock.split(',')
          }
        }
      })
      await food.addStock(stock);

      ctx.body = {
        total: 0,
        message: '新增成功',
        code: 200,
        isSucceed: true,
      }
      // const [res, created] = await ctx.model.Food.findOrCreate({
      //   where: {
      //     name: params.name,
      //   },
      //   defaults: params
      // })

      // if (created) {
      //   ctx.body = {
      //     total: 0,
      //     message: '新增成功',
      //     code: 200,
      //     isSucceed: true,
      //   }
      // } else {
      //   ctx.body = {
      //     total: 0,
      //     message: "失败",
      //     code: 250,
      //     isSucceed: false,
      //   }
      // }
    }
  }

  async delFood() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const params = ctx.request.body;
    const res = await ctx.model.Food.destroy({
      where: {
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

  async getAllFood() {
    const {
      ctx
    } = this;
    const res = await ctx.model.Food.findAndCountAll()
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async getFoodDetail() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;
    const res = await ctx.model.Food
      .findOne({
        include: [{
          model: ctx.model.Foodtype,
          attributes: ['id', 'name'],
        }, {
          model: ctx.model.Mealtime,
          attributes: ['id', 'name'],
        }],
        where: {
          id: params.id
        }
      })
    ctx.body = {
      total: 1,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = FoodController;