'use strict';
const Controller = require('egg').Controller;

class DepartmentController extends Controller {
  async getDepartmentList() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.query
    const option = {
      where: {
        name: {
          [Op.like]: '%' + params.queryName + '%'
        },
      }
    }
    const res = await ctx.model.Department.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addOrUpdateDepartment() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.createtime = new Date();
    if (params.id) {
      const res = await ctx.model.Department.update(params, {
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
      const [res, created] = await ctx.model.Department.findOrCreate({
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

  async delDepartment() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.model.Department.destroy({
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

  async getAllDepartment() {
    const { ctx } = this;
    const res = await ctx.model.Department.findAndCountAll()
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = DepartmentController;