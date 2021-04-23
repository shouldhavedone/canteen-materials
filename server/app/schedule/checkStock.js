const Substription = require('egg').Subscription;

class CheckStock extends Substription {
  static get schedule() {
    return {
      // 执行时间间隔
      interval: '86400s',
      // interval: '86400s',
      // 指定所有的worker（进程）都需要执行
      type: 'all',
      // 是否禁用
      // disable: false
    }
  }
  // 定时执行的操作
  async subscribe() {
    const {
      ctx,
      app
    } = this;
    const {
      Op
    } = app.Sequelize;
    const res = await ctx.model.Stock.findAll({
      include: [{
        model: ctx.model.Material,
        attributes: ['name'],
      }],
      attributes: ['Material.name'],
      where: {
        count: {
          [Op.lte]: 10,
        }
      }
    })
    const text = res.map(item => {
      return item.dataValues.Material.dataValues.name
    }).join(',')

    if (text) {
      const params = {
        title: text,
        createtime: new Date(),
        state: 0,
      }
      await ctx.model.Notice.create(params)
    }
  }
}

module.exports = CheckStock;