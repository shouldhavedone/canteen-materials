'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUserInfo() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;

    const res = await ctx.model.User.findOne({
      where: {
        name: params.name
      }
    });

    if (res === null) {
      ctx.body = {
        total: 0,
        message: '用户不存在',
        code: 200,
        isSucceed: false,
      }
    } else if (res.password === params.password) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        message: '密码错误',
        code: 200,
        isSucceed: false,
      }
    }
  }

  async getUserList() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const params = ctx.request.query
    const option = {
      // limit: parseInt(params.rows),
      // offset: (parseInt(params.page) - 1) * parseInt(params.rows),
      // include: [
      //   { 
      //     model: ctx.model.Role, 
      //     attributes: ['name'],
      //   },
      // ],
      where: {
        name: {
          [Op.like]: '%' + params.name + '%'
        },
        tel: {
          [Op.like]: '%' + params.tel + '%'
        },
      }
    }
    const res = await ctx.model.User.findAndCountAll(option)
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async getAllUser() {
    const {
      ctx
    } = this;
    const res = await ctx.model.User.findAndCountAll()
    ctx.body = {
      total: res.count,
      data: res.rows,
      code: 200,
      isSucceed: true,
    }
  }

  async addOrUpdateUser() {
    const {
      ctx
    } = this;
    const params = ctx.request.body;
    if (params.id) {
      const res = await ctx.model.User.update(params, {
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
      const [res, created] = await ctx.model.User.findOrCreate({
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
          message: "用户名已存在",
          code: 250,
          isSucceed: false,
        }
      }
    }
  }

  async delUser() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const params = ctx.request.body;
    const ids = params.ids.split(',').map(c => +c);
    const res = ctx.model.User.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
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

  async modifyPwd() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const user = await ctx.model.User.findOne({
      where: {
        id: params.id
      }
    })
    if(user.password !== params.oldPwd) {
      ctx.body = {
        total: 0,
        message: "原始密码错误，无法修改",
        code: 200,
        isSucceed: false,
      }
    } else {
      await ctx.model.User.update({
        password: params.newPwd,
      }, {
        where: {
          id: params.id
        }
      })

      ctx.body = {
        total: 0,
        message: "修改成功",
        code: 200,
        isSucceed: true,
      }
    }
  }
}

module.exports = UserController;