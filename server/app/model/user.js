'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const User = app.model.define('User', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    password: {
      type: STRING(64),
      allowNull: false,
      defaultValue: '123456'
    },
    tel: {
      type: STRING(11),
      allowNull: false,
    },
    state: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    createtime: {
      type: DATE,
      allowNull: false
    },
    department_id: {
      type: INTEGER(8),
      references: {
        model: 'Department',
      }
    },
    position_id: {
      type: INTEGER(8),
      references: {
        model: 'Position',
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user'
  })

  User.associate = function () {
    app.model.User.belongsTo(app.model.Department)
    app.model.User.belongsTo(app.model.Position)
  }

  return User
}