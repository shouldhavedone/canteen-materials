'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const DailyMenu = app.model.define('DailyMenu', {
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
    time: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'dailymenu'
  })
  return DailyMenu
}