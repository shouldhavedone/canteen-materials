'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const FoodStock = app.model.define('FoodStock', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    food_id: {
      type: INTEGER(8),
      references: {
        model: 'Food',
      }
    },
    stock_id: {
      type: INTEGER(8),
      references: {
        model: 'Stock',
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'foodstock'
  })

  return FoodStock
}