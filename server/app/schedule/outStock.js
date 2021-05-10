const Substription = require('egg').Subscription;
const sd = require('silly-datetime');

class OutStock extends Substription {
  static get schedule() {
    return {
      // 执行时间间隔
      interval: '86400s',
      type: 'all',
    }
  }
  // 定时执行的操作
  async subscribe() {
    const {
      ctx,
    } = this;
    const nexttime = new Date(new Date()).getTime() + 24 * 60 * 60 * 1000 // 第二天
    const time = sd.format(nexttime, 'YYYY-MM-DD')
    // 获取第二天的菜单
    const menu = await ctx.model.Dailymenu.findOne({
      include: [{
        model: ctx.model.Food,
        attributes: ['id', 'name'],
        include: [{
          model: ctx.model.Stock,
          include: [{
            model: ctx.model.Material,
            attributes: ['id', 'name'],
          }]
        }]
      }],
      where: {
        time: time,
      }
    })
    // 统计物资数量
    const map = [];
    menu.dataValues.Food.forEach(f => {
      let count = f.MenuFood.count;
      f.dataValues.Stocks.forEach(s => {
        let id = s.dataValues.id
        let name = s.dataValues.Material.dataValues.name;
        let obj = map.find(i => i.name == name)
        if (obj) {
          let index = map.findIndex(val => val.name == obj.name)
          map[index].count += count;
        } else {
          map.push({
            id,
            name,
            count: count,
          })
        }
      })
      // map.forEach(item => item.count *= count)
    })
    // 出库操作
    map.forEach(async item => {
      let stock = await ctx.model.Stock.findOne({
        where: {
          id: item.id,
        }
      })
      stock.decrement({
        count: item.count
      })
    })
  }
}

module.exports = OutStock;