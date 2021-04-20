'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE, DOUBLE } = app.Sequelize
  const Stock = app.model.define('Stock', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    count: {
      type: INTEGER(4),
      defaultValue: 0,
    },
    supplier: {
      type: STRING(32),
      defaultValue: 0,
    },
    material_id: {
      type: INTEGER(8),
      references: {
        model: 'Material',
      }
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'stock'
  })

  Stock.associate = function () {
    app.model.Stock.belongsTo(app.model.Material)
    app.model.Stock.belongsToMany(app.model.Food, { through: 'FoodStock' });

  }

  return Stock
}