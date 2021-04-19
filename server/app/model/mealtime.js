'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Mealtime = app.model.define('Mealtime', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    count: {
      type: INTEGER(4),
      defaultValue: 0,
    },
    starttime: {
      type: STRING(8),
      allowNull: false,
    },
    endtime: {
      type: STRING(8),
      allowNull: false,
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'mealtime'
  })

  Mealtime.associate = function () {
    app.model.Mealtime.hasMany(app.model.Food, {
      foreignKey: 'mealtime_id',
    })
  }

  return Mealtime
}