'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const MenuFood = app.model.define('MenuFood', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    count: {
      type: INTEGER(6),
      allowNull: false
    },
    food_id: {
      type: INTEGER(8),
      references: {
        model: 'Food',
      }
    },
    dailymenu_id: {
      type: INTEGER(8),
      references: {
        model: 'Dailymenu',
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'menufood'
  })

  return MenuFood
}