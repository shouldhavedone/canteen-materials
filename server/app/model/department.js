'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  const Department = app.model.define('Department', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    sort: {
      type: INTEGER(2),
      allowNull: false
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
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'department'
  })

  Department.associate = function () {
    app.model.Department.hasMany(app.model.User, {
      foreignKey: 'department_id',
    })
    app.model.Department.hasMany(app.model.Position, {
      foreignKey: 'department_id',
    })
  }

  return Department
}