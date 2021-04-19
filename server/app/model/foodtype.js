'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Foodtype = app.model.define('Foodtype', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'foodtype'
  })

  Foodtype.associate = function () {
    app.model.Foodtype.hasMany(app.model.Food, {
      foreignKey: 'foodtype_id',
    })
  }

  return Foodtype
}