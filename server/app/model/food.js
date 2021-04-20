'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Food = app.model.define('Food', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    price: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0,
    },
    pre_count: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    introduce: {
      type: STRING(255),
    },
    image: {
      type: STRING(255),
    },
    foodtype_id: {
      type: INTEGER(8),
      references: {
        model: 'Foodtype',
      }
    },
    mealtime_id: {
      type: INTEGER(8),
      references: {
        model: 'Mealtime',
      }
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'food'
  })

  Food.associate = function () {
    app.model.Food.belongsTo(app.model.Foodtype)
    app.model.Food.belongsTo(app.model.Mealtime)
    app.model.Food.belongsToMany(app.model.Stock, { through: 'FoodStock' });
  }

  return Food
}