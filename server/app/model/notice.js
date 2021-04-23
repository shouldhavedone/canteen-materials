'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Notice = app.model.define('Notice', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: STRING(255),
      allowNull: false
    },
    state: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'notice'
  })

  Notice.associate = function () {
    
  }

  return Notice
}