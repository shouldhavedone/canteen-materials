'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Dailymenu = app.model.define('Dailymenu', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    time: {
      type: STRING(10),
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'dailymenu'
  })

  Dailymenu.associate = function () {
    app.model.Dailymenu.belongsToMany(app.model.Food, { through: 'MenuFood' });
  }

  return Dailymenu
}