'use strict';
const Controller = require('egg').Controller;

class DailyMenuController extends Controller {
  async getDailyMenuList() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const params = ctx.request.query
    const menu = await ctx.model.Dailymenu.findOne({
      where: {
        time: params.time
      }
    })
    if (menu) {
      const option = {
        include: [{
          model: ctx.model.Food,
          where: {
            foodtype_id: params.foodtype_id,
            mealtime_id: params.mealtime_id,
          }
        }],
        where: {
          time: params.time,
        }
      }
      const res = await ctx.model.Dailymenu.findOne(option)
      ctx.body = {
        total: 1,
        data: res,
        code: 200,
        isSucceed: true,
      }
    } else {
      await ctx.model.Dailymenu.create(params);
      ctx.body = {
        total: 0,
        data: [],
        code: 200,
        isSucceed: true,
      }
    }
  }

  async addDailyMenu() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;
    const [res, created] = await ctx.model.Dailymenu.findOrCreate({
      where: {
        time: params.time,
      },
      defaults: params
    })
    if (res) {
      if (created) { // 当日菜谱不存在，创建，并添加菜品
        const food = await ctx.model.Food.findAll({
          where: {
            id: params.food_id,
          }
        })
        await res.addFood(food, {
          through: {
            count: params.count
          }
        })

      } else { // 当日菜谱存在，添加菜品
        const food = await ctx.model.Food.findAll({
          where: {
            id: params.food_id,
          }
        })
        await res.addFood(food, {
          through: {
            count: params.count
          }
        })
      }
      ctx.body = {
        total: 0,
        message: '添加成功',
        code: 200,
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        message: '添加失败',
        code: 250,
        isSucceed: false,
      }
    }
  }
}
module.exports = DailyMenuController;